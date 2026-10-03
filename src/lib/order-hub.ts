import { createHmac, timingSafeEqual } from 'node:crypto'
import type { ValidatedCheckout } from './paypal-checkout'
import type { PayPalOrderDetails } from './paypal-server'
import { getPayPalOrder, verifyCompletedPayPalOrder } from './paypal-server'
import { getOrderHubDrafts, removeOrderHubDraft, listStoredPaidOrders, saveOrderHubDraft, type StoredOrderRecord } from './order-store'

export class OrderHubSyncError extends Error {
  constructor(public status = 503) { super('The shared order system is temporarily unavailable.'); this.name = 'OrderHubSyncError' }
}

export type HubPayload = Record<string, unknown> & { orderNumber: string; paypalOrderId: string }

export async function syncOrderToHub(payload: HubPayload) {
  const url = process.env.JKBMS_ORDER_HUB_URL || ''
  const secret = process.env.JKBMS_ORDER_HUB_SECRET || ''
  if (!url && !secret && process.env.JKBMS_ORDER_HUB_REQUIRED !== 'true') return false
  if (secret.length < 32 || url !== 'https://www.jkbms.net/api/integrations/jkess/orders') throw new OrderHubSyncError()
  const raw = JSON.stringify({ ...payload, version: 1, source: 'jkesstech.com' })
  let status = 503
  for (let attempt = 0; attempt < 3; attempt++) {
    const timestamp = String(Date.now())
    const signature = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest('hex')
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-jkess-timestamp': timestamp, 'x-jkess-signature': signature }, body: raw, cache: 'no-store', signal: AbortSignal.timeout(8000) })
      status = response.status
      if (response.ok) {
        const result = await response.json()
        if (result.ok === true && result.orderNumber === payload.orderNumber) return true
        status = 502
      }
      if (status < 500 && status !== 408 && status !== 429) break
    } catch { status = 503 }
  }
  throw new OrderHubSyncError(status)
}

export function checkoutHubPayload(checkout: ValidatedCheckout, order: PayPalOrderDetails): HubPayload {
  const total = checkout.totalCents / 100, subtotal = checkout.productSubtotalCents / 100, shipping = checkout.shippingCents / 100
  return { orderNumber: checkout.orderNumber, paypalOrderId: order.id || '', event: 'created', paypalStatus: order.status || 'CREATED', paymentSource: 'paypal', paymentCurrency: 'USD', paymentTotal: total, paymentSubtotal: subtotal, paymentShipping: shipping, usdTotal: total, usdSubtotal: subtotal, usdShipping: shipping, customer: { ...checkout.customer, country: checkout.shippingCountry }, shippingCountry: checkout.shippingCountry, items: checkout.items.map(item => ({ slug: item.slug, name: item.name, variant: item.variant, quantity: item.quantity, price: item.unitPriceCents / 100 })), policyVersion: '', policiesAcceptedAt: '', createdAt: order.create_time || new Date().toISOString(), serverVerified: false }
}

export async function fileCheckoutDraft(checkout: ValidatedCheckout, order: PayPalOrderDetails) {
  const payload = checkoutHubPayload(checkout, order)
  if (await syncOrderToHub(payload)) await saveOrderHubDraft(payload.paypalOrderId, payload)
}

export async function syncVerifiedPayment(order: PayPalOrderDetails) {
  const unit = order.purchase_units?.[0]
  const capture = unit?.payments?.captures?.find(entry => entry.status === 'COMPLETED')
  if (order.status !== 'COMPLETED' || !capture?.id || capture.amount?.currency_code !== 'USD') throw new OrderHubSyncError(409)
  const synced = await syncOrderToHub({ event: 'payment', orderNumber: unit?.invoice_id || unit?.reference_id || '', paypalOrderId: order.id || '', paypalCaptureId: capture.id, paypalStatus: 'COMPLETED', paymentCurrency: 'USD', paymentTotal: Number(capture.amount.value), serverVerified: true, paidAt: capture.create_time || order.update_time || new Date().toISOString() })
  if (synced) await removeOrderHubDraft(order.id || '')
}

export function verifyReconcileRequest(request: Request, raw: string) {
  const timestamp = request.headers.get('x-jkess-timestamp') || '', signature = request.headers.get('x-jkess-signature') || '', secret = process.env.JKBMS_ORDER_HUB_SECRET || ''
  if (secret.length < 32 || !/^\d{13}$/.test(timestamp) || Math.abs(Date.now() - Number(timestamp)) > 300000 || !/^[a-f0-9]{64}$/.test(signature)) throw new OrderHubSyncError(401)
  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest()
  if (!timingSafeEqual(expected, Buffer.from(signature, 'hex'))) throw new OrderHubSyncError(401)
}

export async function syncStoredOrder(record: StoredOrderRecord) {
  const verified = await verifyCompletedPayPalOrder({ paypalOrderId: record.paypalOrderId, orderNumber: record.orderNumber, expectedTotalCents: Math.round(Number(record.amount) * 100) })
  try { await syncVerifiedPayment(verified.order); return } catch (error) { if (!(error instanceof OrderHubSyncError) || error.status !== 404) throw error }
  const unit = verified.order.purchase_units?.[0]
  const subtotal = Math.round(record.items.reduce((sum, item) => sum + Number(item.unitAmount) * item.quantity, 0) * 100) / 100
  const total = Number(record.amount), shipping = Math.round((total - subtotal) * 100) / 100
  await syncOrderToHub({ event: 'captured', orderNumber: record.orderNumber, paypalOrderId: record.paypalOrderId, paypalCaptureId: verified.paypalCaptureId, paypalStatus: 'COMPLETED', paymentSource: 'paypal', paymentCurrency: 'USD', paymentSubtotal: subtotal, paymentShipping: shipping, paymentTotal: total, usdSubtotal: subtotal, usdShipping: shipping, usdTotal: total, customer: { ...record.customer, email: record.customer.email || record.payerEmail, name: record.customer.name || record.payerName, countryCode: unit?.shipping?.address?.country_code || record.shippingAddress.countryCode, country: '' }, shippingCountry: unit?.shipping?.address?.country_code || record.shippingAddress.countryCode, items: record.items.map(item => ({ slug: item.sku, name: item.name, variant: item.sku, quantity: item.quantity, price: Number(item.unitAmount) })), createdAt: record.createdAt, paidAt: record.paidAt, policyVersion: '', policiesAcceptedAt: '', serverVerified: true })
}

export async function reconcileHubOrders(offset: number) {
  let pending = 0, synced = 0, failed = 0
  const drafts = await getOrderHubDrafts()
  for (const draft of drafts) {
    try {
      const order = await getPayPalOrder(draft.paypalOrderId)
      if (order.status === 'COMPLETED') {
        const verified = await verifyCompletedPayPalOrder({ paypalOrderId: draft.paypalOrderId, orderNumber: draft.orderNumber, expectedTotalCents: Math.round(Number(draft.usdTotal) * 100) })
        await syncVerifiedPayment(verified.order); synced++
      } else { await saveOrderHubDraft(draft.paypalOrderId, draft); pending++ }
    } catch { failed++ }
  }
  const records = await listStoredPaidOrders(offset, 20)
  for (const record of records) { try { await syncStoredOrder(record); synced++ } catch { failed++ } }
  return { synced, pending, failed, nextOffset: records.length === 20 ? offset + 20 : 0 }
}
