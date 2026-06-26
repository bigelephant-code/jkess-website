import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/products'
import { sendPaidOrderEmail } from '@/lib/paid-order-email'
import { getStoredOrder, savePaidOrder, type StoredOrderRecord } from '@/lib/order-store'
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
    const customer = {
      name: clean(customerRaw.name, 120),
      email: clean(customerRaw.email, 200).toLowerCase(),
      phone: clean(customerRaw.phone, 80),
      company: clean(customerRaw.company, 160),
      address: clean(customerRaw.address, 800),
      notes: clean(customerRaw.notes, 1500),
    }

    if (!orderNumber || !paypalOrderId) {
      return NextResponse.json({ error: 'Order references are required.' }, { status: 400 })
    }
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      return NextResponse.json({ error: 'Customer information is incomplete.' }, { status: 400 })
    }
    if (rawItems.length === 0 || rawItems.length > 25) {
      return NextResponse.json({ error: 'Order items are invalid.' }, { status: 400 })
    }

    const items = rawItems.map((value, index) => {
      const item = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
      const slug = clean(item.slug, 100)
      const variantLabel = clean(item.variant, 160)
      const quantity = Number(item.quantity)
      const product = getProductBySlug(slug)
      const variant = product?.variants?.find((entry) => entry.label === variantLabel)
      const unitPriceCents = Math.round(Number.parseFloat((variant?.price || '').replace(/[$,]/g, '')) * 100)

      if (!product || product.type !== 'shop' || !variant || !Number.isInteger(quantity) || quantity < 1 || quantity > 50 || !Number.isInteger(unitPriceCents) || unitPriceCents <= 0) {
        throw new Error(`Invalid order item ${index + 1}.`)
      }

      return {
        slug,
        name: product.name,
        variant: variant.label,
        quantity,
        unitPriceCents,
        lineTotalCents: unitPriceCents * quantity,
      }
    })

    const expectedTotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0)
    const verified = await verifyCompletedPayPalOrder({ paypalOrderId, orderNumber, expectedTotalCents })
    const purchaseUnit = verified.order.purchase_units?.[0]
    const paypalAddress = purchaseUnit?.shipping?.address
    const existing = await getStoredOrder(orderNumber).catch(() => null)
    const now = new Date().toISOString()
    const payerName = [
      clean(verified.order.payer?.name?.given_name, 100),
      clean(verified.order.payer?.name?.surname, 100),
    ].filter(Boolean).join(' ')

    const baseRecord: StoredOrderRecord = {
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
      items: items.map((item) => ({
        name: `${item.name} - ${item.variant}`,
        sku: `${item.slug}-${item.variant}`.slice(0, 180),
        quantity: item.quantity,
        unitAmount: (item.unitPriceCents / 100).toFixed(2),
        currency: 'USD',
      })),
      paypalCustomId: clean(purchaseUnit?.custom_id, 500),
      paypalDescription: clean(purchaseUnit?.description, 500),
      internalEmailStatus: 'pending',
      customerEmailStatus: existing?.customerEmailStatus || 'pending',
      source: existing?.source || 'browser-verified',
      createdAt: existing?.createdAt || clean(verified.order.create_time, 80) || now,
      paidAt:
        clean(verified.capture.update_time, 80) ||
        clean(verified.capture.create_time, 80) ||
        now,
      updatedAt: now,
    }

    await savePaidOrder(baseRecord).catch((error) => {
      console.error('Unable to save the pending paid order record:', error)
    })

    try {
      await sendPaidOrderEmail({
        orderNumber,
        paypalOrderId: verified.paypalOrderId,
        paypalCaptureId: verified.paypalCaptureId,
        payerEmail: verified.payerEmail,
        customer,
        items: items.map((item) => ({
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          lineTotal: item.lineTotalCents / 100,
        })),
        total: expectedTotalCents / 100,
      })
    } catch (error) {
      await savePaidOrder({
        ...baseRecord,
        internalEmailStatus: 'failed',
        updatedAt: new Date().toISOString(),
      }).catch(() => undefined)
      throw error
    }

    await savePaidOrder({
      ...baseRecord,
      internalEmailStatus: 'sent',
      updatedAt: new Date().toISOString(),
    }).catch((error) => {
      console.error('Unable to mark the order email as sent:', error)
    })

    return NextResponse.json({ sent: true, verified: true, stored: true })
  } catch (error) {
    console.error('Order verification or email failed:', error)
    return NextResponse.json({ error: 'Unable to verify and email this order.' }, { status: 409 })
  }
}
