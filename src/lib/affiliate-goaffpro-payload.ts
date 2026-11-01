import { createHmac } from 'node:crypto'

export type GoAffProVerifiedOrder = {
  orderNumber: string
  captureId: string
  currency: string
  totalMinorUnits: number
  referralCode: string
}

/** Signs server-verified order data; caller must separately verify payment and attribution. */
export function signGoAffProOrder(order: GoAffProVerifiedOrder, secret: string): string {
  if (!secret || secret.length < 16) throw new Error('Invalid signing secret')
  if (!/^JKESS-[A-Z0-9-]{6,70}$/.test(order.orderNumber)) throw new Error('Invalid order number')
  if (!/^[A-Z0-9]{1,120}$/.test(order.captureId)) throw new Error('Invalid capture ID')
  if (order.currency !== 'USD' && order.currency !== 'EUR') throw new Error('Unsupported currency')
  if (!Number.isSafeInteger(order.totalMinorUnits) || order.totalMinorUnits <= 0) {
    throw new Error('Invalid order total')
  }
  if (!/^[A-Za-z0-9_-]{1,120}$/.test(order.referralCode)) throw new Error('Invalid referral code')

  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    id: order.captureId,
    number: order.orderNumber,
    total: order.totalMinorUnits / 100,
    currency: order.currency,
    ref: order.referralCode,
    forceSDK: true,
  })).toString('base64url')
  const body = `${header}.${payload}`
  const signature = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}
