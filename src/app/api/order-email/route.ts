import { NextResponse } from 'next/server'
import { deliverPaidOrderEmails } from '@/lib/order-email-delivery'
import { getStoredOrder, savePaidOrder, type StoredOrderRecord } from '@/lib/order-store'
import { validateCheckoutPayload } from '@/lib/paypal-checkout'
import { verifyCompletedPayPalOrder } from '@/lib/paypal-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const customerRaw = body.customer && typeof body.customer === 'object'
      ? (body.customer as Record<string, unknown>)
      : {}
    const rawItems = Array.isArray(body.items) ? body.items : []
    const orderNumber = clean(body.orderNumber, 80)
    const paypalOrderId = clean(body.paypalOrderId, 120)

    if (!paypalOrderId) {
      return NextResponse.json({ error: 'Order references are required.' }, { status: 400 })
    }
    const checkout = validateCheckoutPayload({
      orderNumber,
      customer: customerRaw,
      items: rawItems,
    })
    const customer = {
      name: checkout.customer.name,
      email: checkout.customer.email,
      phone: checkout.customer.phone,
      company: checkout.customer.company,
      address: checkout.customer.address,
      notes: checkout.customer.notes,
    }

    const expectedTotalCents = checkout.totalCents
    const verified = await verifyCompletedPayPalOrder({
      paypalOrderId,
      orderNumber,
      expectedTotalCents,
    })
    const purchaseUnit = verified.order.purchase_units?.[0]
    const paypalAddress = purchaseUnit?.shipping?.address
    const paypalCountryCode = clean(paypalAddress?.country_code, 8).toUpperCase()
    if (paypalCountryCode !== checkout.customer.countryCode) {
      throw new Error('PayPal shipping country does not match the checkout country.')
    }
    const existing = await getStoredOrder(orderNumber)
    const now = new Date().toISOString()
    const payerName = [
      clean(verified.order.payer?.name?.given_name, 100),
      clean(verified.order.payer?.name?.surname, 100),
    ]
      .filter(Boolean)
      .join(' ')

    const record: StoredOrderRecord = {
      orderNumber,
      paypalOrderId: verified.paypalOrderId,
      paypalCaptureId: verified.paypalCaptureId,
      paypalEventId: existing?.paypalEventId || '',
      status: 'COMPLETED',
      amount: (expectedTotalCents / 100).toFixed(2),
      currency: 'USD',
      payerEmail: verified.payerEmail.toLowerCase(),
      payerName,
      customer,
      shippingAddress: existing?.shippingAddress || {
        addressLine1: clean(paypalAddress?.address_line_1, 300),
        addressLine2: clean(paypalAddress?.address_line_2, 300),
        city: clean(paypalAddress?.admin_area_2, 160),
        state: clean(paypalAddress?.admin_area_1, 160),
        postalCode: clean(paypalAddress?.postal_code, 40),
        countryCode: clean(paypalAddress?.country_code, 8),
      },
      items: checkout.items.map((item) => ({
        name: `${item.name} - ${item.variant}`,
        sku: item.sku,
        quantity: item.quantity,
        unitAmount: (item.unitPriceCents / 100).toFixed(2),
        currency: 'USD',
      })),
      paypalCustomId: clean(purchaseUnit?.custom_id, 500),
      paypalDescription: clean(purchaseUnit?.description, 500),
      internalEmailStatus: existing?.internalEmailStatus || 'pending',
      customerEmailStatus: existing?.customerEmailStatus || 'pending',
      source: existing?.source || 'browser-verified',
      createdAt: existing?.createdAt || clean(verified.order.create_time, 80) || now,
      paidAt:
        clean(verified.capture.update_time, 80) ||
        clean(verified.capture.create_time, 80) ||
        now,
      updatedAt: now,
    }

    await savePaidOrder(record)
    const delivery = await deliverPaidOrderEmails(orderNumber)

    if (delivery.processing) {
      return NextResponse.json(
        { error: 'Order email delivery is already in progress.' },
        { status: 409 }
      )
    }

    return NextResponse.json({
      sent: delivery.internalEmailStatus === 'sent',
      customerConfirmationSent: delivery.customerEmailStatus === 'sent',
      verified: true,
      stored: true,
    })
  } catch (error) {
    console.error('Order verification, storage, or email failed:', error)
    return NextResponse.json({ error: 'Unable to process this paid order.' }, { status: 409 })
  }
}
