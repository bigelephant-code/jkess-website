import test from 'node:test'
import assert from 'node:assert/strict'
// @ts-expect-error Node runs this isolated test with TypeScript stripping.
import { refundedOrderReference, refundCaptureId, validateRefundForOrder } from '../src/lib/paypal-refund-validation.ts'

const order = { paypalCaptureId: 'CAPTURE123', amount: '250.76', currency: 'EUR' }
const refund = { id: 'REFUND123', status: 'COMPLETED', amount: { value: '250.76', currency_code: 'EUR' }, links: [{ rel: 'up', href: 'https://api-m.sandbox.paypal.com/v2/payments/captures/CAPTURE123' }] }
const capture = { id: 'CAPTURE123', status: 'REFUNDED', amount: { value: '250.76', currency_code: 'EUR' } }

test('a verified full refund is queued for cancellation', () => {
  assert.deepEqual(validateRefundForOrder({ eventRefundId: 'REFUND123', refund, capture, order }), { captureId: 'CAPTURE123', action: 'cancel' })
})

test('a partial refund requires review', () => {
  const partial = { ...refund, amount: { value: '20.00', currency_code: 'EUR' } }
  assert.equal(validateRefundForOrder({ eventRefundId: 'REFUND123', refund: partial, capture: { ...capture, status: 'PARTIALLY_REFUNDED' }, order }).action, 'review')
})

test('capture links are parsed only from PayPal hosts and strict paths', () => {
  assert.equal(refundCaptureId({ links: [{ rel: 'up', href: 'https://api-m.sandbox.paypal.com.evil.test/v2/payments/captures/CAPTURE123' }] }), null)
  assert.equal(refundCaptureId({ links: [{ rel: 'up', href: 'https://api-m.paypal.com/v2/payments/captures/CAPTURE123/extra' }] }), null)
})

test('rejects mismatched order, currency, identifiers, amount or unfinished refund', () => {
  const base = { eventRefundId: 'REFUND123', refund, capture, order }
  for (const changed of [
    { eventRefundId: 'WRONG' },
    { order: { ...order, paypalCaptureId: 'OTHER' } },
    { order: { ...order, amount: '250.75' } },
    { refund: { ...refund, status: 'PENDING' } },
    { refund: { ...refund, amount: { value: '250.77', currency_code: 'EUR' } } },
    { refund: { ...refund, amount: { value: '250.76', currency_code: 'USD' } } },
    { capture: { ...capture, status: 'COMPLETED' } },
  ]) assert.throws(() => validateRefundForOrder({ ...base, ...changed }))
})

test('verifies a refund-first order without creating a paid-order record', () => {
  const linkedCapture = { ...capture, supplementary_data: { related_ids: { order_id: 'ORDER123' } } }
  const paypalOrder = { id: 'ORDER123', purchase_units: [{
    invoice_id: 'JKESS-ORDER123', amount: { value: '250.76', currency_code: 'EUR' },
    payments: { captures: [capture] },
  }] }
  assert.deepEqual(refundedOrderReference(linkedCapture, paypalOrder), {
    orderNumber: 'JKESS-ORDER123', paypalOrderId: 'ORDER123', paypalCaptureId: 'CAPTURE123', amount: '250.76', currency: 'EUR',
  })
  assert.throws(() => refundedOrderReference(linkedCapture, { ...paypalOrder, id: 'OTHER' }))
  assert.throws(() => refundedOrderReference({ ...linkedCapture, status: 'COMPLETED' }, paypalOrder))
  assert.throws(() => refundedOrderReference(linkedCapture, { ...paypalOrder, purchase_units: [{ ...paypalOrder.purchase_units[0], amount: { value: '250.75', currency_code: 'EUR' } }] }))
})
