import { NextResponse } from 'next/server'
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

    const checkout = validateCheckoutPayload(await request.json())
    const paypalOrder = await createPayPalOrder(
      buildPayPalOrderPayload(checkout),
      `create-${checkout.orderNumber}`
    )

    return NextResponse.json({
      id: paypalOrder.id,
      status: paypalOrder.status,
      currency: 'USD',
      total: moneyFromCents(checkout.totalCents),
    })
  } catch (error) {
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
