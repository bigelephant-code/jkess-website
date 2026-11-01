import { createHash } from 'node:crypto'
import type { ValidatedCheckout } from './paypal-checkout'

type CheckoutPricing = Pick<ValidatedCheckout, 'orderNumber' | 'usdShippingCents'> & {
  customer: Pick<ValidatedCheckout['customer'], 'countryCode'>
  items: ReadonlyArray<Pick<ValidatedCheckout['items'][number], 'slug' | 'variant' | 'quantity' | 'usdUnitPriceCents'>>
}

export type CheckoutFxQuote = {
  id: string
  orderNumber: string
  fingerprint: string
  rateMicros: number
  rateUpdatedAt: number
  expiresAt: number
}

export function checkoutPricingFingerprint(checkout: CheckoutPricing): string {
  const pricing = {
    orderNumber: checkout.orderNumber,
    countryCode: checkout.customer.countryCode,
    shippingCents: checkout.usdShippingCents,
    items: checkout.items.map((item) => ({
      slug: item.slug,
      variant: item.variant,
      quantity: item.quantity,
      usdUnitPriceCents: item.usdUnitPriceCents,
    })),
  }
  return createHash('sha256').update(JSON.stringify(pricing)).digest('hex')
}

export function assertCheckoutFxQuote(quote: CheckoutFxQuote, checkout: CheckoutPricing, now: number, requireFresh: boolean) {
  if (!quote || !/^[a-f0-9]{64}$/.test(quote.id) ||
      quote.orderNumber !== checkout.orderNumber || quote.fingerprint !== checkoutPricingFingerprint(checkout) ||
      !Number.isSafeInteger(quote.rateMicros) || quote.rateMicros < 100_000 || quote.rateMicros > 10_000_000 ||
      !Number.isSafeInteger(quote.expiresAt) || (requireFresh && quote.expiresAt <= now)) {
    throw new Error('The checkout exchange-rate quote is invalid or expired')
  }
}
