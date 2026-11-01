import {
  INITIAL_INVENTORY,
  inventorySlugFromSku,
  managedInventorySlugs,
  normalizedInventory,
  type InventorySnapshot,
  type ManagedInventorySlug,
} from '@/lib/inventory-catalog'
import { selectOrderStorageConfig } from '@/lib/checkout-environment'
import { validAffiliateSource, type AttributedAffiliateSource } from '@/lib/affiliate-link-source'
import { enqueueAffiliatePaid, type AffiliatePaidTask } from '@/lib/affiliate-report-queue'
import { enqueueAffiliateRefund, type AffiliateRefundTask } from '@/lib/affiliate-refund-queue'
import { randomBytes } from 'node:crypto'
import type { CheckoutFxQuote } from './checkout-fx-quote'
import type { RefundedOrderReference } from './paypal-refund-validation'

export class OrderStoreConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderStoreConfigurationError'
  }
}

export class AffiliateAttributionConflictError extends Error {
  constructor() {
    super('Affiliate attribution conflicts with the existing order.')
    this.name = 'AffiliateAttributionConflictError'
  }
}

export type StoredOrderItem = {
  name: string
  sku: string
  quantity: number
  unitAmount: string
  currency: string
}

export type StoredOrderCustomer = {
  name: string
  email: string
  phone: string
  company: string
  address: string
  notes: string
}

export type StoredOrderRecord = {
  orderNumber: string
  paypalOrderId: string
  paypalCaptureId: string
  paypalEventId: string
  status: 'COMPLETED'
  amount: string
  currency: string
  payerEmail: string
  payerName: string
  customer: StoredOrderCustomer
  shippingAddress: Record<string, string>
  items: StoredOrderItem[]
  paypalCustomId: string
  paypalDescription: string
  internalEmailStatus: 'pending' | 'sent' | 'failed'
  customerEmailStatus: 'pending' | 'sent' | 'failed'
  source: 'paypal-webhook' | 'browser-verified'
  createdAt: string
  paidAt: string
  updatedAt: string
}

type RedisResponse<T = unknown> = {
  result?: T
  error?: string
}

function redisConfiguration() {
  const config = selectOrderStorageConfig({
    paypalEnvironment: process.env.PAYPAL_ENVIRONMENT || process.env.PAYPAL_ENV,
    productionUrl: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    productionToken: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
    sandboxUrl: process.env.JKESS_SANDBOX_UPSTASH_REDIS_REST_URL,
    sandboxToken: process.env.JKESS_SANDBOX_UPSTASH_REDIS_REST_TOKEN,
  })
  if (!config) {
    throw new OrderStoreConfigurationError('Order storage is not configured.')
  }
  return config
}

async function redisCommand<T = unknown>(command: Array<string | number>) {
  const { url, token } = redisConfiguration()
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  })

  const payload = (await response.json().catch(() => null)) as RedisResponse<T> | null
  if (!response.ok || !payload || payload.error) {
    throw new Error(payload?.error || `Order storage failed with status ${response.status}.`)
  }

  return payload.result as T
}

async function redisPipeline(commands: Array<Array<string | number>>) {
  const { url, token } = redisConfiguration()
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })

  const payload = (await response.json().catch(() => null)) as RedisResponse[] | null
  if (!response.ok || !payload || payload.some((entry) => entry.error)) {
    const message = payload?.find((entry) => entry.error)?.error
    throw new Error(message || `Order storage pipeline failed with status ${response.status}.`)
  }
}

const key = {
  order: (orderNumber: string) => `jkess:order:${orderNumber}`,
  paypalOrder: (paypalOrderId: string) => `jkess:paypal-order:${paypalOrderId}`,
  capture: (captureId: string) => `jkess:paypal-capture:${captureId}`,
  webhookLock: (eventId: string) => `jkess:webhook-lock:${eventId}`,
  webhookProcessed: (eventId: string) => `jkess:webhook-processed:${eventId}`,
  emailLock: (orderNumber: string) => `jkess:email-lock:${orderNumber}`,
  inventory: (slug: ManagedInventorySlug) => `jkess:inventory:${slug}`,
  inventoryOrder: (orderNumber: string) => `jkess:inventory-order:${orderNumber}`,
  paidOrders: 'jkess:orders:paid',
  affiliateOrder: (paypalOrderId: string) => `jkess:affiliate:order:${paypalOrderId}`,
  checkoutQuote: (quoteId: string) => `jkess:checkout:fx-quote:${quoteId}`,
  checkoutOrderQuote: (orderId: string) => `jkess:checkout:fx-order:${orderId}`,
  dailyRate: (day: string) => `jkess:checkout:usd-eur:${day}`,
  refundOrderReference: (captureId: string) => `jkess:affiliate:refund-order:${captureId}`,
  refundOrderReview: 'jkess:affiliate:refund-order:review',
}

export async function dailyCheckoutRate(day: string, proposed?: { rateMicros: number; updatedAt: number }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw new Error('Invalid rate date')
  const redisKey = key.dailyRate(day)
  if (proposed) await redisCommand(['SET', redisKey, JSON.stringify(proposed), 'NX', 'EX', 60 * 60 * 72])
  const value = await redisCommand<string | null>(['GET', redisKey])
  if (!value) return null
  const rate: unknown = JSON.parse(value)
  if (!rate || typeof rate !== 'object' || !('rateMicros' in rate) || !('updatedAt' in rate) ||
      !Number.isSafeInteger(rate.rateMicros) || !Number.isSafeInteger(rate.updatedAt) ||
      (rate.rateMicros as number) < 100_000 || (rate.rateMicros as number) > 10_000_000) throw new Error('Invalid cached exchange rate')
  return rate as { rateMicros: number; updatedAt: number }
}

export async function getStoredOrderByCapture(captureId: string) {
  if (!/^[A-Z0-9]{1,120}$/i.test(captureId)) return null
  const orderNumber = await redisCommand<string | null>(['GET', key.capture(captureId)])
  return orderNumber ? getStoredOrder(orderNumber) : null
}

export async function saveRefundedOrderReference(reference: RefundedOrderReference) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(reference.orderNumber) ||
      !/^[A-Z0-9]{1,120}$/.test(reference.paypalOrderId) || !/^[A-Z0-9]{1,120}$/.test(reference.paypalCaptureId) ||
      !['USD', 'EUR'].includes(reference.currency) || !/^\d{1,10}(?:\.\d{1,2})?$/.test(reference.amount)) throw new Error('Invalid refunded order reference')
  const value = JSON.stringify(reference)
  const script = "local previous = redis.call('GET', KEYS[1]); if previous then if previous == ARGV[1] then return 0 else return -1 end end; redis.call('SET', KEYS[1], ARGV[1]); redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3]); return 1"
  const result = await redisCommand<number>(['EVAL', script, 2, key.refundOrderReference(reference.paypalCaptureId), key.refundOrderReview, value, Date.now(), reference.paypalCaptureId])
  if (result !== 0 && result !== 1) throw new Error('Refunded order reference conflicts with existing data')
}

export async function queueVerifiedRefund(input: AffiliateRefundTask) {
  return enqueueAffiliateRefund((command) => redisCommand(command), input)
}

export async function saveCheckoutFxQuote(quote: CheckoutFxQuote) {
  if (!/^[a-f0-9]{64}$/.test(quote.id)) throw new Error('Invalid quote ID')
  const saved = await redisCommand<string | null>(['SET', key.checkoutQuote(quote.id), JSON.stringify(quote), 'NX', 'EX', 3600])
  if (saved !== 'OK') throw new Error('Unable to save exchange quote')
}

export async function getCheckoutFxQuote(id: string) {
  if (!/^[a-f0-9]{64}$/.test(id)) return null
  const value = await redisCommand<string | null>(['GET', key.checkoutQuote(id)])
  if (!value) return null
  try { return JSON.parse(value) as CheckoutFxQuote } catch { return null }
}

export async function bindCheckoutFxQuote(orderId: string, quote: CheckoutFxQuote) {
  if (!/^[A-Z0-9]{1,120}$/.test(orderId)) throw new Error('Invalid PayPal order reference')
  const keyName = key.checkoutOrderQuote(orderId)
  const value = JSON.stringify(quote)
  const saved = await redisCommand<string | null>(['SET', keyName, value, 'NX'])
  if (saved === 'OK') return
  const existing = await redisCommand<string | null>(['GET', keyName])
  if (existing !== value) throw new Error('PayPal order already has a different exchange quote')
}

export async function getOrderCheckoutFxQuote(orderId: string) {
  if (!/^[A-Z0-9]{1,120}$/.test(orderId)) return null
  const value = await redisCommand<string | null>(['GET', key.checkoutOrderQuote(orderId)])
  if (!value) return null
  try { return JSON.parse(value) as CheckoutFxQuote } catch { return null }
}

export type StoredAffiliateAttribution = {
  source: AttributedAffiliateSource
  cartId: string
  orderNumber?: string
  withdrawalToken?: string
  withdrawn?: boolean
}

export async function bindAffiliateAttribution(paypalOrderId: string, source: AttributedAffiliateSource, orderNumber: string) {
  if (!/^[A-Z0-9]{1,120}$/.test(paypalOrderId)) throw new Error('Invalid PayPal order reference')
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber)) throw new Error('Invalid order number')
  const record: StoredAffiliateAttribution = { source, cartId: randomBytes(32).toString('hex'), orderNumber, withdrawalToken: randomBytes(32).toString('hex') }
  const keyName = key.affiliateOrder(paypalOrderId)
  const result = await redisCommand<string | null>(['SET', keyName, JSON.stringify(record), 'NX', 'EX', 60 * 60 * 24 * 180])
  if (result === 'OK') return record
  const existingValue = await redisCommand<string | null>(['GET', keyName])
  if (!existingValue) throw new Error('Unable to bind affiliate attribution')
  const existing = JSON.parse(existingValue) as StoredAffiliateAttribution
  if (existing.source?.provider !== source.provider || existing.source?.code !== source.code ||
      existing.source?.clickedAt !== source.clickedAt || existing.orderNumber !== orderNumber || existing.withdrawn ||
      !/^[a-f0-9]{64}$/.test(existing.cartId) || !/^[a-f0-9]{64}$/.test(existing.withdrawalToken || '')) {
    throw new AffiliateAttributionConflictError()
  }
  return existing
}

export async function getAffiliateAttribution(paypalOrderId: string) {
  if (!/^[A-Z0-9]{1,120}$/.test(paypalOrderId)) throw new Error('Invalid PayPal order reference')
  const raw = await redisCommand<string | null>(['GET', key.affiliateOrder(paypalOrderId)])
  if (!raw) return null
  let value: StoredAffiliateAttribution
  try { value = JSON.parse(raw) as StoredAffiliateAttribution } catch { throw new Error('Invalid affiliate attribution') }
  if (value.withdrawn === true) return null
  const clickedAt = value?.source?.clickedAt
  if (!Number.isSafeInteger(clickedAt) || clickedAt > Date.now() || !validAffiliateSource(value.source, clickedAt) ||
      !/^[a-f0-9]{64}$/.test(value.cartId)) throw new Error('Invalid affiliate attribution')
  return value
}

/** Refuse to mark withdrawal complete while an order report is in flight. */
export async function withdrawAffiliateAttribution(paypalOrderId: string, orderNumber: string, token: string) {
  if (!/^[A-Z0-9]{1,120}$/.test(paypalOrderId) || !/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber) || !/^[a-f0-9]{64}$/.test(token)) throw new Error('Invalid withdrawal request')
  const script = "local raw = redis.call('GET', KEYS[1]); if not raw then return 0 end; local ok, v = pcall(cjson.decode, raw); if not ok or type(v) ~= 'table' or v.orderNumber ~= ARGV[1] or v.withdrawalToken ~= ARGV[2] then return -1 end; if v.withdrawn == true then return 1 end; local paid = redis.call('GET', KEYS[2]); if paid then local valid, p = pcall(cjson.decode, paid); if not valid or type(p) ~= 'table' then return -1 end; if p.state == 'claimed' then return 2 end end; v.withdrawn = true; redis.call('SET', KEYS[1], cjson.encode(v), 'KEEPTTL'); return 1"
  const result = await redisCommand<number>(['EVAL', script, 2, key.affiliateOrder(paypalOrderId), `jkess:affiliate:report:paid:${orderNumber}`, orderNumber, token])
  if (result === 0 || result === 1) return 'withdrawn' as const
  if (result === 2) return 'busy' as const
  throw new Error('Withdrawal could not be verified')
}

export async function enqueueAffiliatePaidOrder(task: AffiliatePaidTask) {
  return enqueueAffiliatePaid((command) => redisCommand(command), task)
}

export async function affiliateStoreCommand(command: Array<string | number>) {
  return redisCommand(command)
}

async function ensureInventoryInitialized() {
  await Promise.all(
    managedInventorySlugs.map((slug) =>
      redisCommand<string | null>([
        'SET',
        key.inventory(slug),
        INITIAL_INVENTORY[slug],
        'NX',
      ])
    )
  )
}

export async function getInventorySnapshot(): Promise<InventorySnapshot> {
  await ensureInventoryInitialized()
  const values = await redisCommand<Array<string | number | null>>([
    'MGET',
    ...managedInventorySlugs.map((slug) => key.inventory(slug)),
  ])

  return Object.fromEntries(
    managedInventorySlugs.map((slug, index) => [
      slug,
      normalizedInventory(values?.[index], INITIAL_INVENTORY[slug]),
    ])
  ) as InventorySnapshot
}

export async function decrementInventoryForPaidOrder(
  orderNumber: string,
  items: Array<Pick<StoredOrderItem, 'sku' | 'quantity'>>
) {
  const requested = Object.fromEntries(
    managedInventorySlugs.map((slug) => [slug, 0])
  ) as Record<ManagedInventorySlug, number>

  for (const item of items) {
    const slug = inventorySlugFromSku(item.sku)
    if (!slug) continue
    requested[slug] += Math.max(0, Math.floor(item.quantity || 0))
  }

  const affectedSlugs = managedInventorySlugs.filter((slug) => requested[slug] > 0)
  if (!affectedSlugs.length) return { processed: false, duplicate: false }

  await ensureInventoryInitialized()

  const script = [
    "if redis.call('EXISTS', KEYS[1]) == 1 then return {0} end",
    'local result = {1}',
    'for i = 2, #KEYS do',
    "  local remaining = redis.call('DECRBY', KEYS[i], tonumber(ARGV[i - 1]) or 0)",
    '  table.insert(result, remaining)',
    'end',
    "redis.call('SET', KEYS[1], '1')",
    'return result',
  ].join('\n')

  const result = await redisCommand<number[]>([
    'EVAL',
    script,
    affectedSlugs.length + 1,
    key.inventoryOrder(orderNumber),
    ...affectedSlugs.map((slug) => key.inventory(slug)),
    ...affectedSlugs.map((slug) => requested[slug]),
  ])

  return {
    processed: result?.[0] === 1,
    duplicate: result?.[0] === 0,
    remaining: Object.fromEntries(
      affectedSlugs.map((slug, index) => [slug, Math.max(0, Number(result?.[index + 1] || 0))])
    ),
  }
}

export async function webhookWasProcessed(eventId: string) {
  return Boolean(await redisCommand<string | null>(['GET', key.webhookProcessed(eventId)]))
}

export async function acquireWebhookLock(eventId: string) {
  const result = await redisCommand<string | null>([
    'SET',
    key.webhookLock(eventId),
    '1',
    'NX',
    'EX',
    300,
  ])
  return result === 'OK'
}

export async function releaseWebhookLock(eventId: string) {
  await redisCommand<number>(['DEL', key.webhookLock(eventId)])
}

export async function markWebhookProcessed(eventId: string) {
  await redisPipeline([
    ['SET', key.webhookProcessed(eventId), '1', 'EX', 60 * 60 * 24 * 90],
    ['DEL', key.webhookLock(eventId)],
  ])
}

export async function acquireOrderEmailLock(orderNumber: string) {
  const result = await redisCommand<string | null>([
    'SET',
    key.emailLock(orderNumber),
    '1',
    'NX',
    'EX',
    300,
  ])
  return result === 'OK'
}

export async function releaseOrderEmailLock(orderNumber: string) {
  await redisCommand<number>(['DEL', key.emailLock(orderNumber)])
}

export async function savePaidOrder(record: StoredOrderRecord) {
  const paidScore = Number.isFinite(Date.parse(record.paidAt))
    ? Date.parse(record.paidAt)
    : Date.now()

  await redisPipeline([
    ['SET', key.order(record.orderNumber), JSON.stringify(record)],
    ['SET', key.paypalOrder(record.paypalOrderId), record.orderNumber],
    ['SET', key.capture(record.paypalCaptureId), record.orderNumber],
    ['ZADD', key.paidOrders, paidScore, record.orderNumber],
  ])
}

export async function getStoredOrder(orderNumber: string) {
  const value = await redisCommand<string | null>(['GET', key.order(orderNumber)])
  if (!value) return null

  try {
    return JSON.parse(value) as StoredOrderRecord
  } catch {
    return null
  }
}

export async function saveOrderHubDraft(id: string, payload: Record<string, unknown>) {
  await redisPipeline([['SET', `jkess:hub:${id}`, JSON.stringify(payload)], ['ZADD', 'jkess:hub:pending', Date.now(), id]])
}

export async function removeOrderHubDraft(id: string) {
  await redisPipeline([['DEL', `jkess:hub:${id}`], ['ZREM', 'jkess:hub:pending', id]])
}

export async function getOrderHubDrafts() {
  const ids = await redisCommand<string[]>(['ZRANGE', 'jkess:hub:pending', 0, 19])
  if (!ids.length) return []
  const values = await redisCommand<Array<string | null>>(['MGET', ...ids.map(id => `jkess:hub:${id}`)])
  return values.filter((value): value is string => !!value).map(value => JSON.parse(value) as Record<string, unknown> & { orderNumber: string; paypalOrderId: string })
}

export async function listStoredPaidOrders(offset: number, count: number) {
  const ids = await redisCommand<string[]>(['ZRANGE', key.paidOrders, offset, offset + count - 1])
  if (!ids.length) return []
  const values = await redisCommand<Array<string | null>>(['MGET', ...ids.map(key.order)])
  return values.filter((value): value is string => !!value).map(value => JSON.parse(value) as StoredOrderRecord)
}
