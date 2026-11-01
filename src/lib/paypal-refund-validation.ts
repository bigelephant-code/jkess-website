import type { PayPalOrderDetails } from './paypal-server'
type Money = { value?: string; currency_code?: string }
type Link = { rel?: string; href?: string }

export type RefundDetails = {
  id?: string
  status?: string
  amount?: Money
  links?: Link[]
}

export type CaptureDetails = {
  id?: string
  status?: string
  amount?: Money
  supplementary_data?: { related_ids?: { order_id?: string } }
}

export type RefundedOrderReference = {
  orderNumber: string
  paypalOrderId: string
  paypalCaptureId: string
  amount: string
  currency: string
}

function cents(value: unknown) {
  if (typeof value !== 'string' || !/^\d{1,10}(?:\.\d{1,2})?$/.test(value)) return null
  const [whole, fractional = ''] = value.split('.')
  const result = Number(whole) * 100 + Number(fractional.padEnd(2, '0'))
  return Number.isSafeInteger(result) ? result : null
}

/** Preserve a minimal audit reference when PayPal delivers a refund first. */
export function refundedOrderReference(capture: CaptureDetails, order: PayPalOrderDetails): RefundedOrderReference {
  const orderId = capture.supplementary_data?.related_ids?.order_id
  if (!orderId || order.id !== orderId || !/^[A-Z0-9]{1,120}$/.test(orderId) ||
      !capture.id || !/^[A-Z0-9]{1,120}$/.test(capture.id) ||
      !['REFUNDED', 'PARTIALLY_REFUNDED'].includes(capture.status || '') || order.purchase_units?.length !== 1) {
    throw new Error('Refund order reference cannot be verified')
  }
  const unit = order.purchase_units[0]
  const orderNumber = unit.invoice_id || unit.reference_id || ''
  const currency = capture.amount?.currency_code || ''
  const amount = capture.amount?.value || ''
  const captures = unit.payments?.captures
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber) || !['USD', 'EUR'].includes(currency) ||
      unit.amount?.currency_code !== currency || cents(amount) === null || cents(amount) !== cents(unit.amount?.value) ||
      !captures || captures.length !== 1 || captures[0].id !== capture.id ||
      captures[0].amount?.currency_code !== currency || cents(captures[0].amount?.value) !== cents(amount)) {
    throw new Error('Refund order reference cannot be verified')
  }
  return { orderNumber, paypalOrderId: orderId, paypalCaptureId: capture.id, amount, currency }
}

export function refundCaptureId(refund: RefundDetails) {
  const link = refund.links?.find((item) => item.rel === 'up')?.href
  if (!link) return null
  try {
    const url = new URL(link)
    if (url.protocol !== 'https:' || !['api.paypal.com', 'api-m.paypal.com', 'api.sandbox.paypal.com', 'api-m.sandbox.paypal.com'].includes(url.hostname)) return null
    return /^\/v2\/payments\/captures\/([A-Z0-9]{1,120})$/i.exec(url.pathname)?.[1] || null
  } catch {
    return null
  }
}

export function validateRefundForOrder(input: {
  eventRefundId: string
  refund: RefundDetails
  capture: CaptureDetails
  order: { paypalCaptureId: string; amount: string; currency: string }
}) {
  const { refund, capture, order, eventRefundId } = input
  const captureId = refundCaptureId(refund)
  const paid = cents(order.amount)
  const captured = cents(capture.amount?.value)
  const refundAmount = cents(refund.amount?.value)
  if (!/^[A-Z0-9]{1,120}$/i.test(eventRefundId) || refund.id !== eventRefundId ||
      refund.status !== 'COMPLETED' || !captureId || capture.id !== captureId ||
      captureId !== order.paypalCaptureId || !['USD', 'EUR'].includes(order.currency) ||
      capture.amount?.currency_code !== order.currency || refund.amount?.currency_code !== order.currency ||
      paid === null || paid <= 0 || captured !== paid || refundAmount === null ||
      refundAmount <= 0 || refundAmount > paid) {
    throw new Error('Refund verification failed.')
  }
  if (capture.status === 'REFUNDED') return { captureId, action: 'cancel' as const }
  if (capture.status === 'PARTIALLY_REFUNDED') return { captureId, action: 'review' as const }
  throw new Error('Refunded capture is not yet verified.')
}
