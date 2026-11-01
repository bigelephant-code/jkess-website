import { NextResponse } from 'next/server'
import { fileCheckoutDraft, OrderHubSyncError } from '@/lib/order-hub'
import { validAffiliateSource } from '@/lib/affiliate-link-source'
import { AffiliateAttributionConflictError, bindAffiliateAttribution, bindCheckoutFxQuote, getCheckoutFxQuote } from '@/lib/order-store'
import { getCurrency } from '@/lib/shipping-zones'
import { assertCheckoutFxQuote } from '@/lib/checkout-fx-quote'
import {
  buildPayPalOrderPayload,
  CheckoutValidationError,
  moneyFromCents,
  validateCheckoutPayload,
} from '@/lib/paypal-checkout'
import {
  createPayPalOrder,
  PayPalConfigurationError,
  PayPalVerificationError,
} from '@/lib/paypal-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_REQUEST_BYTES = 64 * 1024

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Checkout request is too large.' }, { status: 413 })
    }

    const body: unknown = await request.json()
    const baseCheckout = validateCheckoutPayload(body)
    const input = body && typeof body === 'object' ? body as Record<string, unknown> : {}
    let quote = null
    let checkout = baseCheckout
    if (process.env.CHECKOUT_FX_ENABLED === 'true' && getCurrency(baseCheckout.customer.countryCode) === 'EUR') {
      quote = await getCheckoutFxQuote(typeof input.fxQuoteId === 'string' ? input.fxQuoteId : '')
      if (!quote) throw new CheckoutValidationError('Exchange quote is missing. Please refresh checkout.')
      try { assertCheckoutFxQuote(quote, baseCheckout, Date.now(), true) } catch {
        throw new CheckoutValidationError('Exchange quote expired or checkout changed. Please refresh checkout.')
      }
      checkout = validateCheckoutPayload(body, quote.rateMicros)
    }
    const source = process.env.AFFILIATE_INTEGRATION_ENABLED === 'true'
      ? validAffiliateSource(input.affiliateSource, Date.now()) : null
    const paypalOrder = await createPayPalOrder(
      buildPayPalOrderPayload(checkout),
      `create-${checkout.orderNumber}`
    )
    if (quote) await bindCheckoutFxQuote(paypalOrder.id || '', quote)
    const attribution = source ? await bindAffiliateAttribution(paypalOrder.id || '', source, checkout.orderNumber) : null
    await fileCheckoutDraft(checkout, paypalOrder)

    return NextResponse.json({
      id: paypalOrder.id,
      status: paypalOrder.status,
      currency: getCurrency(checkout.customer.countryCode),
      total: moneyFromCents(checkout.totalCents),
      ...(attribution ? { affiliateWithdrawal: { orderNumber: checkout.orderNumber, paypalOrderId: paypalOrder.id, token: attribution.withdrawalToken } } : {}),
      ...(attribution?.source.provider === 'refersion' ? { affiliateCartId: attribution.cartId } : {}),
    })
  } catch (error) {
    if (error instanceof AffiliateAttributionConflictError) {
      return NextResponse.json({ error: 'Affiliate attribution changed. Please restart checkout.' }, { status: 409 })
    }
    if (error instanceof OrderHubSyncError) return NextResponse.json({ error: error.message }, { status: 503 })
    if (error instanceof SyntaxError || error instanceof CheckoutValidationError) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Checkout request is invalid.' },
        { status: 400 }
      )
    }
    if (error instanceof PayPalConfigurationError) {
      console.error('PayPal checkout is not configured:', error)
      return NextResponse.json({ error: 'PayPal checkout is unavailable.' }, { status: 503 })
    }
    if (error instanceof PayPalVerificationError) {
      console.error('Unable to create PayPal order:', error)
      return NextResponse.json({ error: 'Unable to create the PayPal order.' }, { status: 502 })
    }

    console.error('Unexpected PayPal order creation error:', error)
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 })
  }
}
