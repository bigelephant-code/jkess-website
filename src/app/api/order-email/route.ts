import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/products'
import { sendPaidOrderEmail } from '@/lib/paid-order-email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const customerRaw =
      body.customer && typeof body.customer === 'object'
        ? (body.customer as Record<string, unknown>)
        : {}
    const rawItems = Array.isArray(body.items) ? body.items : []

    const orderNumber = clean(body.orderNumber, 80)
    const paypalOrderId = clean(body.paypalOrderId, 120)
    const paypalCaptureId = clean(body.paypalCaptureId, 120)
    const paypalStatus = clean(body.paypalStatus, 40).toUpperCase()
    const payerEmail = clean(body.payerEmail, 200)
    const customer = {
      name: clean(customerRaw.name, 120),
      email: clean(customerRaw.email, 200).toLowerCase(),
      phone: clean(customerRaw.phone, 80),
      company: clean(customerRaw.company, 160),
      address: clean(customerRaw.address, 800),
      notes: clean(customerRaw.notes, 1500),
    }

    if (!orderNumber || !paypalOrderId || paypalStatus !== 'COMPLETED') {
      return NextResponse.json({ error: 'Completed payment references are required.' }, { status: 400 })
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
      const unitPrice = Number.parseFloat((variant?.price || '').replace(/[$,]/g, ''))

      if (
        !product ||
        product.type !== 'shop' ||
        !variant ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 50 ||
        !Number.isFinite(unitPrice) ||
        unitPrice <= 0
      ) {
        throw new Error(`Invalid order item ${index + 1}.`)
      }

      return {
        name: product.name,
        variant: variant.label,
        quantity,
        lineTotal: unitPrice * quantity,
      }
    })

    await sendPaidOrderEmail({
      orderNumber,
      paypalOrderId,
      paypalCaptureId,
      payerEmail,
      customer,
      items,
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
    })

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('Order email endpoint error:', error)
    return NextResponse.json({ error: 'Unable to send the order email.' }, { status: 400 })
  }
}
