import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node runs this test with built-in TypeScript stripping.
import { buildRefersionPaidOrder } from '../src/lib/affiliate-refersion-order.ts'

const order = {
  cartId: 'a'.repeat(32), orderId: 'TEST-123', currency: 'USD',
  paidMinorUnits: 11500, shippingMinorUnits: 2000, taxMinorUnits: 1000,
  discountMinorUnits: 1500,
  items: [{ sku: 'TEST-SKU', name: 'Test product', quantity: 1, unitMinorUnits: 10000 }],
}

test('constructs a minimized order only when payment and items reconcile', () => {
  assert.deepEqual(buildRefersionPaidOrder(order), {
    cart_id: order.cartId, order_id: order.orderId, currency_code: 'USD',
    shipping: 20, tax: 10, discount: 15,
    items: [{ sku: 'TEST-SKU', name: 'Test product', quantity: 1, price: 100 }],
  })
})

test('rejects mismatched payments, malformed identifiers and unsupported currency', () => {
  assert.throws(() => buildRefersionPaidOrder({ ...order, paidMinorUnits: 11499 }))
  assert.throws(() => buildRefersionPaidOrder({ ...order, cartId: 'guessable' }))
  assert.throws(() => buildRefersionPaidOrder({ ...order, currency: 'JPY' }))
  assert.throws(() => buildRefersionPaidOrder({ ...order, items: [] }))
  assert.throws(() => buildRefersionPaidOrder({ ...order, taxMinorUnits: -1 }))
})

test('retains the verified EUR currency without applying an exchange rate', () => {
  const result = buildRefersionPaidOrder({ ...order, currency: 'EUR' })
  assert.equal(result.currency_code, 'EUR')
  assert.equal(result.items[0].price, 100)
  assert.equal(result.shipping, 20)
  assert.equal(result.tax, 10)
})
