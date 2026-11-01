export type UsdToEurRate = {
  rateMicros: number
  updatedAt: number
}

const MAX_RATE_AGE_MS = 96 * 60 * 60 * 1000

export function assertFreshExchangeRate(rate: UsdToEurRate, now: number) {
  if (!Number.isSafeInteger(now) || !Number.isSafeInteger(rate.updatedAt) ||
      rate.updatedAt > now || now - rate.updatedAt > MAX_RATE_AGE_MS) {
    throw new Error('Exchange rate data is stale')
  }
  return rate
}

/** Parses a provider quote without trusting stale or malformed data. */
export function parseUsdToEurRate(value: unknown, now: number): UsdToEurRate {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const rate = data.rate
  const day = data.date
  if (data.base !== 'USD' || data.quote !== 'EUR' ||
      typeof rate !== 'number' || !Number.isFinite(rate) || rate < 0.1 || rate > 10 ||
      typeof day !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isSafeInteger(now)) {
    throw new Error('Invalid exchange rate data')
  }
  const updatedAt = Date.parse(`${day}T00:00:00.000Z`)
  if (!Number.isSafeInteger(updatedAt) || new Date(updatedAt).toISOString().slice(0, 10) !== day) {
    throw new Error('Exchange rate data is stale')
  }
  return assertFreshExchangeRate({ rateMicros: Math.round(rate * 1_000_000), updatedAt }, now)
}

/** Rounds a USD line-item unit price to EUR cents, without floating-point multiplication. */
export function usdCentsToEurCents(usdCents: number, rateMicros: number): number {
  if (!Number.isSafeInteger(usdCents) || usdCents < 0 ||
      !Number.isSafeInteger(rateMicros) || rateMicros < 100_000 || rateMicros > 10_000_000) {
    throw new Error('Invalid conversion amount or rate')
  }
  const cents = (BigInt(usdCents) * BigInt(rateMicros) + BigInt(500_000)) / BigInt(1_000_000)
  if (cents > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('Converted amount is too large')
  return Number(cents)
}

export function convertUsdPrices(
  items: ReadonlyArray<{ unitPriceCents: number; quantity: number }>,
  shippingCents: number,
  rateMicros: number,
) {
  if (!items.length || items.length > 25 || !Number.isSafeInteger(shippingCents) || shippingCents < 0) {
    throw new Error('Invalid order pricing')
  }
  let subtotalCents = 0
  const unitPricesCents = items.map((item) => {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 50 || item.unitPriceCents <= 0) {
      throw new Error('Invalid order item')
    }
    const unitPrice = usdCentsToEurCents(item.unitPriceCents, rateMicros)
    if (unitPrice <= 0) throw new Error('Converted item price is too small')
    subtotalCents += unitPrice * item.quantity
    if (!Number.isSafeInteger(subtotalCents)) throw new Error('Converted subtotal is too large')
    return unitPrice
  })
  const convertedShippingCents = usdCentsToEurCents(shippingCents, rateMicros)
  const totalCents = subtotalCents + convertedShippingCents
  if (!Number.isSafeInteger(totalCents)) throw new Error('Converted order total is too large')
  return { unitPricesCents, subtotalCents, shippingCents: convertedShippingCents, totalCents }
}
