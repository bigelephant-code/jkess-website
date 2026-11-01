import assert from 'node:assert/strict'
import test from 'node:test'
import { affiliateOrdersFromVerifiedPayment } from '../src/lib/affiliate-verified-payment'
import type { PayPalOrderDetails } from '../src/lib/paypal-server'

const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'refersion' as const }
const attribution = {
  source: { status: 'attributed' as const, provider: 'refersion' as const, code: 'test', clickedAt: 1, expiresAt: 7776000001 },
  cartId: 'a'.repeat(64),
}
const money = (value: string) => ({ value, currency_code: 'USD' })
const order: PayPalOrderDetails = {
  id: 'PAYPAL123', status: 'COMPLETED', purchase_units: [{
    invoice_id: task.orderNumber,
    amount: { ...money('130.00'), breakdown: { item_total: money('100.00'), shipping: money('30.00') } },
    items: [{ sku: 'KIT', name: 'Kit', quantity: '1', unit_amount: money('100.00') }],
    payments: { captures: [{ id: 'CAPTURE123', status: 'COMPLETED', amount: money('130.00') }] },
  }],
}

test('builds both provider payloads from an independently verified payment', () => {
  const result = affiliateOrdersFromVerifiedPayment(task, order, attribution)
  assert.equal(result.refersion.paidMinorUnits, 13000)
  assert.equal(result.refersion.shippingMinorUnits, 3000)
  assert.equal(result.goaffpro.items[0].unitNetMinorUnits, 10000)
})

test('refuses mismatches, refunded captures, and unallocated tax', () => {
  assert.throws(() => affiliateOrdersFromVerifiedPayment({ ...task, provider: 'goaffpro' }, order, attribution))
  assert.throws(() => affiliateOrdersFromVerifiedPayment({ ...task, captureId: 'OTHER' }, order, attribution))
  const unit = order.purchase_units![0]
  const refunded = { ...order, purchase_units: [{ ...unit, payments: { captures: [{ ...unit.payments!.captures![0], status: 'REFUNDED' }] } }] }
  assert.throws(() => affiliateOrdersFromVerifiedPayment(task, refunded, attribution))
  const taxed = { ...order, purchase_units: [{ ...unit, amount: { ...unit.amount, breakdown: { ...unit.amount!.breakdown, tax_total: money('1.00') } } }] }
  assert.throws(() => affiliateOrdersFromVerifiedPayment(task, taxed, attribution))
})

test('refuses mismatched totals and unrecognized charges', () => {
  const unit = order.purchase_units![0]
  const wrong = { ...order, purchase_units: [{ ...unit, amount: { ...unit.amount, breakdown: { item_total: money('99.00'), shipping: money('31.00') } } }] }
  assert.throws(() => affiliateOrdersFromVerifiedPayment(task, wrong, attribution))
  const extra = { ...order, purchase_units: [{ ...unit, amount: { ...unit.amount, breakdown: { ...unit.amount!.breakdown, handling: money('5.00') } } }] }
  assert.throws(() => affiliateOrdersFromVerifiedPayment(task, extra, attribution))
})
