import { NextResponse } from 'next/server'
import { deliverPaidOrderEmails } from '@/lib/order-email-delivery'
import {
  acquireWebhookLock,
  getStoredOrder,
  markWebhookProcessed,
  releaseWebhookLock,
  savePaidOrder,
  webhookWasProcessed,
  type StoredOrderItem,
  type StoredOrderRecord,
} from '@/lib/order-store'
import { amountToCents, getPayPalOrder } from '@/lib/paypal-server'
import { verifyPayPalWebhookSignature } from '@/lib/paypal-webhook'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_WEBHOOK_BYTES = 256 * 1024

type CaptureCompletedEvent = {
  id?: string
  event_type?: string
  create_time?: string
  resource?: {
    id?: string
    status?: string
    amount?: {
      currency_code?: string
      value?: string
    }
    create_time?: string
    update_time?: string
    supplementary_data?: {
      related_ids?: {
        order_id?: string
      }
    }
  }
}

function clean(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function payerName(order: Awaited<ReturnType<typeof getPayPalOrder>>) {
  const givenName = clean(order.payer?.name?.given_name, 100)
  const surname = clean(order.payer?.name?.surname, 100)
  return (
    [givenName, surname].filter(Boolean).join(' ') ||
    clean(order.purchase_units?.[0]?.shipping?.name?.full_name, 200)
  )
}

function shippingAddress(order: Awaited<ReturnType<typeof getPayPalOrder>>) {
  const address = order.purchase_units?.[0]?.shipping?.address
  return {
    addressLine1: clean(address?.address_line_1, 300),
    addressLine2: clean(address?.address_line_2, 300),
    city: clean(address?.admin_area_2, 160),
    state: clean(address?.admin_area_1, 160),
    postalCode: clean(address?.postal_code, 40),
    countryCode: clean(address?.country_code, 8),
  }
}

function formattedShippingAddress(address: Record<string, string>) {
  return [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.countryCode,
  ]
    .filter(Boolean)
    .join(', ')
}

function orderItems(order: Awaited<ReturnType<typeof getPayPalOrder>>): StoredOrderItem[] {
  return (order.purchase_units?.[0]?.items || []).map((item) => ({
    name: clean(item.name, 300),
    sku: clean(item.sku, 180),
    quantity: Math.max(1, Number.parseInt(item.quantity || '1', 10) || 1),
    unitAmount: clean(item.unit_amount?.value, 40),
    currency: clean(item.unit_amount?.currency_code, 8),
  }))
}

export async function POST(request: Request) {
  const rawBody = await request.text()
  if (!rawBody || Buffer.byteLength(rawBody, 'utf8') > MAX_WEBHOOK_BYTES) {
    return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 413 })
  }

  let event: CaptureCompletedEvent
  try {
    event = JSON.parse(rawBody) as CaptureCompletedEvent
  } catch {
    return NextResponse.json({ error: 'Invalid webhook JSON.' }, { status: 400 })
  }

  try {
    await verifyPayPalWebhookSignature({ headers: request.headers, rawBody })
  } catch (error) {
    console.error('PayPal webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 })
  }

  const eventId = clean(event.id, 160)
  const eventType = clean(event.event_type, 100)
  if (!eventId || !eventType) {
    return NextResponse.json({ error: 'Webhook event is incomplete.' }, { status: 400 })
  }

  if (eventType !== 'PAYMENT.CAPTURE.COMPLETED') {
    return NextResponse.json({ received: true, ignored: true })
  }

  if (await webhookWasProcessed(eventId)) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  const lockAcquired = await acquireWebhookLock(eventId)
  if (!lockAcquired) {
    return NextResponse.json({ received: true, processing: true })
  }

  try {
    const paypalOrderId = clean(event.resource?.supplementary_data?.related_ids?.order_id, 160)
    const paypalCaptureId = clean(event.resource?.id, 160)
    const eventAmount = clean(event.resource?.amount?.value, 40)
    const eventCurrency = clean(event.resource?.amount?.currency_code, 8)

    if (
      !paypalOrderId ||
      !paypalCaptureId ||
      event.resource?.status?.toUpperCase() !== 'COMPLETED'
    ) {
      throw new Error('Capture webhook references are incomplete.')
    }

    const order = await getPayPalOrder(paypalOrderId)
    const purchaseUnit = order.purchase_units?.[0]
    const capture = purchaseUnit?.payments?.captures?.find(
      (entry) => entry.id === paypalCaptureId && entry.status?.toUpperCase() === 'COMPLETED'
    )
    const orderNumber = clean(purchaseUnit?.invoice_id || purchaseUnit?.reference_id, 160)
    const amount = clean(capture?.amount?.value || purchaseUnit?.amount?.value, 40)
    const currency = clean(capture?.amount?.currency_code || purchaseUnit?.amount?.currency_code, 8)

    if (
      !orderNumber ||
      order.id !== paypalOrderId ||
      order.status?.toUpperCase() !== 'COMPLETED' ||
      !capture
    ) {
      throw new Error('PayPal order verification failed.')
    }
    if (
      currency !== 'USD' ||
      eventCurrency !== currency ||
      amountToCents(eventAmount) !== amountToCents(amount)
    ) {
      throw new Error('PayPal capture amount mismatch.')
    }

    const existing = await getStoredOrder(orderNumber)
    const now = new Date().toISOString()
    const payerEmail = clean(order.payer?.email_address, 320).toLowerCase()
    const name = payerName(order)
    const address = shippingAddress(order)
    const record: StoredOrderRecord = {
      orderNumber,
      paypalOrderId,
      paypalCaptureId,
      paypalEventId: eventId,
      status: 'COMPLETED',
      amount,
      currency,
      payerEmail,
      payerName: name,
      customer: {
        name: existing?.customer.name || name,
        email: existing?.customer.email || payerEmail,
        phone: existing?.customer.phone || '',
        company: existing?.customer.company || '',
        address: existing?.customer.address || formattedShippingAddress(address),
        notes: existing?.customer.notes || '',
      },
      shippingAddress: address,
      items: orderItems(order),
      paypalCustomId: clean(purchaseUnit?.custom_id, 500),
      paypalDescription: clean(purchaseUnit?.description, 500),
      internalEmailStatus: existing?.internalEmailStatus || 'pending',
      customerEmailStatus: existing?.customerEmailStatus || 'pending',
      source: 'paypal-webhook',
      createdAt:
        existing?.createdAt ||
        clean(order.create_time, 80) ||
        clean(event.create_time, 80) ||
        now,
      paidAt:
        clean(capture.update_time, 80) ||
        clean(capture.create_time, 80) ||
        clean(event.resource?.update_time, 80) ||
        clean(event.resource?.create_time, 80) ||
        now,
      updatedAt: now,
    }

    await savePaidOrder(record)
    const delivery = await deliverPaidOrderEmails(orderNumber)
    if (delivery.processing) {
      throw new Error('Order email delivery is already in progress.')
    }

    await markWebhookProcessed(eventId)

    return NextResponse.json({
      received: true,
      stored: true,
      orderNumber,
      internalEmailStatus: delivery.internalEmailStatus,
      customerEmailStatus: delivery.customerEmailStatus,
    })
  } catch (error) {
    console.error('PayPal webhook processing failed:', error)
    await releaseWebhookLock(eventId).catch(() => undefined)
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 })
  }
}
