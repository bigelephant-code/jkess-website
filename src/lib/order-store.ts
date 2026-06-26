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
  paidOrders: 'jkess:orders:paid',
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
