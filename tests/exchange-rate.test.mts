import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node runs this isolated test with TypeScript stripping.
import { convertUsdPrices, parseUsdToEurRate, usdCentsToEurCents } from '../src/lib/exchange-rate.ts'

const now = Date.parse('2026-11-01T12:00:00Z')
const response = { base: 'USD', quote: 'EUR', date: '2026-11-01', rate: 0.895556 }

test('validates a fresh USD to EUR quote', () => {
  assert.deepEqual(parseUsdToEurRate(response, now), { rateMicros: 895556, updatedAt: Date.parse('2026-11-01T00:00:00Z') })
  assert.throws(() => parseUsdToEurRate({ ...response, base: 'EUR' }, now))
  assert.throws(() => parseUsdToEurRate({ ...response, quote: 'USD' }, now))
  assert.throws(() => parseUsdToEurRate({ ...response, date: '2026-10-27' }, now))
  assert.throws(() => parseUsdToEurRate({ ...response, date: '2026-11-02' }, now))
  assert.throws(() => parseUsdToEurRate({ ...response, date: '2026-02-30' }, now))
  assert.throws(() => parseUsdToEurRate({ ...response, rate: -1 }, now))
})

test('rounds unit prices to the nearest cent deterministically', () => {
  assert.equal(usdCentsToEurCents(28000, 895556), 25076)
  assert.equal(usdCentsToEurCents(1, 500000), 1)
  assert.equal(usdCentsToEurCents(0, 895556), 0)
  assert.throws(() => usdCentsToEurCents(-1, 895556))
  assert.throws(() => usdCentsToEurCents(100, 0))
  assert.throws(() => usdCentsToEurCents(Number.MAX_SAFE_INTEGER, 10_000_000))
})

test('calculates totals from rounded unit prices and shipping', () => {
  assert.deepEqual(convertUsdPrices([
    { unitPriceCents: 28000, quantity: 2 },
    { unitPriceCents: 49900, quantity: 1 },
  ], 0, 895556), {
    unitPricesCents: [25076, 44688], subtotalCents: 94840, shippingCents: 0, totalCents: 94840,
  })
  assert.throws(() => convertUsdPrices([{ unitPriceCents: 100, quantity: 0 }], 0, 895556))
  assert.throws(() => convertUsdPrices([], 0, 895556))
})
