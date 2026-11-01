import { assertFreshExchangeRate, parseUsdToEurRate } from './exchange-rate'
import { dailyCheckoutRate } from './order-store'

const EXCHANGE_RATE_URL = 'https://api.frankfurter.dev/v2/rate/USD/EUR'

/** Retrieves an indicative rate; a caller must lock it to each order. */
export async function fetchUsdToEurRate() {
  const day = new Date().toISOString().slice(0, 10)
  const cached = await dailyCheckoutRate(day)
  if (cached) return assertFreshExchangeRate(cached, Date.now())
  const response = await fetch(EXCHANGE_RATE_URL, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('Exchange rate service unavailable')
  const parsed = parseUsdToEurRate(await response.json(), Date.now())
  const locked = await dailyCheckoutRate(day, parsed)
  if (!locked) throw new Error('Unable to lock daily exchange rate')
  return assertFreshExchangeRate(locked, Date.now())
}
