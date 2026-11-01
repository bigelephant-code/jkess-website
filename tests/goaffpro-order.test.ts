import assert from 'node:assert/strict'
import test from 'node:test'
import { buildGoAffProOrder, type GoAffProOrderInput } from '../src/lib/goaffpro-order'

const base: GoAffProOrderInput = {
  orderNumber: 'JKESS-TEST123', captureId: 'CAPTURE123', currency: 'USD',
  paidMinorUnits: 13000, shippingMinorUnits: 2000, taxMinorUnits: 1000, discountMinorUnits: 0,
  items: [{ sku: 'KIT', name: 'Test kit', quantity: 1, unitNetMinorUnits: 10000, lineTaxMinorUnits: 1000, lineDiscountMinorUnits: 0 }],
}

test('uses the verified tax-inclusive line representation for GoAffPro', () => {
  const result = buildGoAffProOrder(base)
  assert.equal(result.total, 130)
  assert.equal(result.subtotal, 100)
  assert.deepEqual(result.line_items, [{ sku: 'KIT', name: 'Test kit', quantity: 1, price: 110, tax: 10, discount: 0 }])
})

test('includes an allocated discount and retains the payment currency', () => {
  const result = buildGoAffProOrder({
    ...base, currency: 'EUR', paidMinorUnits: 12000, discountMinorUnits: 1000,
    items: [{ ...base.items[0], lineDiscountMinorUnits: 1000 }],
  })
  assert.equal(result.total, 120)
  assert.equal(result.subtotal, 90)
  assert.equal(result.currency, 'EUR')
  assert.equal(result.line_items[0].discount, 10)
})

test('refuses unallocated tax, discounts, shipping tax, or incorrect payment amounts', () => {
  assert.throws(() => buildGoAffProOrder({ ...base, taxMinorUnits: 1100 }))
  assert.throws(() => buildGoAffProOrder({ ...base, discountMinorUnits: 100 }))
  assert.throws(() => buildGoAffProOrder({ ...base, paidMinorUnits: 13001 }))
  assert.throws(() => buildGoAffProOrder({ ...base, items: [{ ...base.items[0], quantity: 2 }] }))
})

test('accepts multiple untaxed units only with a reconciled total', () => {
  const result = buildGoAffProOrder({
    ...base, paidMinorUnits: 22000, taxMinorUnits: 0,
    items: [{ ...base.items[0], quantity: 2, lineTaxMinorUnits: 0 }],
  })
  assert.equal(result.line_items[0].price, 100)
  assert.equal(result.total, 220)
})
