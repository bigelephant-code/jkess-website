import { NextResponse } from 'next/server'
import {
  assertPayPalOrderMatchesCheckout,
  CheckoutValidationError,
  validateCheckoutPayload,
} from '@/lib/paypal-checkout'
import {
  capturePayPalOrder,
  getPayPalOrder,
  PayPalConfigurationError,
  PayPalVerificationError,
  verifyCompletedPayPalOrder,
} from '@/lib/paypal-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_REQUEST_BYTES = 64 * 1024

type RouteContext = {
  params: Promise<{ orderId: string }>
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Checkout request is too large.' }, { status: 413 })
    }

    const { orderId: rawOrderId } = await context.params
    const orderId = rawOrderId.trim().slice(0, 120)
    if (!/^[A-Z0-9]+$/.test(orderId)) {
      return NextResponse.json({ error: 'PayPal order ID is invalid.' }, { status: 400 })
    }

    const checkout = validateCheckoutPayload(await request.json())
    const pendingOrder = await getPayPalOrder(orderId)
    if (pendingOrder.id !== orderId) {
      throw new CheckoutValidationError('PayPal returned a different order ID.')
    }

    assertPayPalOrderMatchesCheckout(pendingOrder, checkout)

    if (pendingOrder.status?.toUpperCase() !== 'COMPLETED') {
      if (pendingOrder.status?.toUpperCase() !== 'APPROVED') {
        throw new CheckoutValidationError('The PayPal order is not approved for capture.')
      }
      await capturePayPalOrder(orderId)
    }

    const verified = await verifyCompletedPayPalOrder({
      paypalOrderId: orderId,
      orderNumber: checkout.orderNumber,
      expectedTotalCents: checkout.totalCents,
    })

    return NextResponse.json({
      id: verified.paypalOrderId,
      captureId: verified.paypalCaptureId,
      status: 'COMPLETED',
    })
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof CheckoutValidationError) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Checkout request is invalid.' },
        { status: 400 }
      )
    }
    if (error instanceof PayPalConfigurationError) {
      console.error('PayPal capture is not configured:', error)
      return NextResponse.json({ error: 'PayPal checkout is unavailable.' }, { status: 503 })
    }
    if (error instanceof PayPalVerificationError) {
      console.error('Unable to capture PayPal order:', error)
      return NextResponse.json({ error: 'Unable to complete the PayPal payment.' }, { status: 409 })
    }

    console.error('Unexpected PayPal capture error:', error)
    return NextResponse.json({ error: 'Unable to complete checkout.' }, { status: 500 })
  }
}
