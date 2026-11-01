import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { checkoutPricingFingerprint } from '@/lib/checkout-fx-quote'
import { fetchUsdToEurRate } from '@/lib/exchange-rate-server'
import { saveCheckoutFxQuote } from '@/lib/order-store'
import { CheckoutValidationError, validateCheckoutPayload } from '@/lib/paypal-checkout'
import { getCurrency } from '@/lib/shipping-zones'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (process.env.CHECKOUT_FX_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Exchange quotes are unavailable.' }, { status: 503 })
  }
  try {
    const raw = await request.text()
    if (!raw || Buffer.byteLength(raw, 'utf8') > 64 * 1024) {
      return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 413 })
    }
    const body: unknown = JSON.parse(raw)
    const input = body && typeof body === 'object' ? body as Record<string, unknown> : {}
    const pricingInput = {
      orderNumber: input.orderNumber,
      items: input.items,
      customer: { name: 'Quote', email: 'quote@example.invalid', phone: '0', address: 'Quote', countryCode: input.countryCode },
    }
    const base = validateCheckoutPayload(pricingInput)
    if (getCurrency(base.customer.countryCode) !== 'EUR') {
      return NextResponse.json({ error: 'An EUR checkout is required.' }, { status: 400 })
    }
    const rate = await fetchUsdToEurRate()
    const checkout = validateCheckoutPayload(pricingInput, rate.rateMicros)
    const quote = {
      id: randomBytes(32).toString('hex'),
      orderNumber: base.orderNumber,
      fingerprint: checkoutPricingFingerprint(base),
      rateMicros: rate.rateMicros,
      rateUpdatedAt: rate.updatedAt,
      expiresAt: Date.now() + 15 * 60 * 1000,
    }
    await saveCheckoutFxQuote(quote)
    return NextResponse.json({
      id: quote.id,
      expiresAt: quote.expiresAt,
      rateUpdatedAt: quote.rateUpdatedAt,
      unitPricesCents: checkout.items.map((item) => item.unitPriceCents),
      subtotalCents: checkout.productSubtotalCents,
      shippingCents: checkout.shippingCents,
      totalCents: checkout.totalCents,
      currency: 'EUR',
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    if (error instanceof CheckoutValidationError || error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 400 })
    }
    console.error('Checkout exchange quote unavailable')
    return NextResponse.json({ error: 'Exchange quote unavailable. Please try again.' }, { status: 503 })
  }
}
