import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node runs this isolated test with TypeScript stripping.
import { assertCheckoutFxQuote, checkoutPricingFingerprint } from '../src/lib/checkout-fx-quote.ts'

const checkout = {
  orderNumber: 'JKESS-TEST123', customer: { countryCode: 'DE' }, usdShippingCents: 0,
  items: [{ slug: '6u-battery-kit', variant: 'Enclosure Only', quantity: 1, usdUnitPriceCents: 28000 }],
}

test('binds a quote to checkout details and expiry', () => {
  const quote = { id: 'a'.repeat(64), orderNumber: checkout.orderNumber,
    fingerprint: checkoutPricingFingerprint(checkout), rateMicros: 895556,
    rateUpdatedAt: 1000, expiresAt: 2000 }
  assert.doesNotThrow(() => assertCheckoutFxQuote(quote, checkout, 1500, true))
  assert.throws(() => assertCheckoutFxQuote(quote, checkout, 2000, true))
  assert.doesNotThrow(() => assertCheckoutFxQuote(quote, checkout, 2000, false))
  assert.throws(() => assertCheckoutFxQuote(quote, { ...checkout, customer: { countryCode: 'NL' } }, 1500, true))
  assert.throws(() => assertCheckoutFxQuote(quote, { ...checkout, items: [{ ...checkout.items[0], quantity: 2 }] }, 1500, true))
  assert.throws(() => assertCheckoutFxQuote({ ...quote, rateMicros: 0 }, checkout, 1500, true))
})
