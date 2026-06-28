import {
  INITIAL_INVENTORY,
  inventorySlugFromSku,
  managedInventorySlugs,
  normalizedInventory,
  type InventorySnapshot,
  type ManagedInventorySlug,
} from '@/lib/inventory-catalog'

export class OrderStoreConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderStoreConfigurationError'
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
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

  if (!url || !token) {
    throw new OrderStoreConfigurationError('Order storage is not configured.')
  }

  return { url: url.replace(/\/$/, ''), token }
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
