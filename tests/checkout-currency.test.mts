import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node runs this isolated test with TypeScript stripping.
import { getCurrency, isSupportedPaymentCurrency } from '../src/lib/shipping-zones.ts'

test('preserves current checkout currencies without converting amounts', () => {
  assert.equal(getCurrency('DE'), 'EUR')
  assert.equal(getCurrency('NL'), 'EUR')
  assert.equal(getCurrency('US'), 'USD')
  assert.equal(isSupportedPaymentCurrency('EUR'), true)
  assert.equal(isSupportedPaymentCurrency('USD'), true)
  assert.equal(isSupportedPaymentCurrency('JPY'), false)
  assert.equal(isSupportedPaymentCurrency(undefined), false)
})
