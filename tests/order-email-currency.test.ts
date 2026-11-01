import assert from 'node:assert/strict'
import test from 'node:test'
import { sendCustomerOrderConfirmation } from '../src/lib/customer-order-email'
import { sendPaidOrderEmail } from '../src/lib/paid-order-email'
import type { StoredOrderRecord } from '../src/lib/order-store'

test('customer and internal test messages identify the actual EUR currency', async () => {
  const originalFetch = globalThis.fetch
  const previousKey = process.env.RESEND_API_KEY
  const previousFrom = process.env.ORDER_EMAIL_FROM
  const messages: string[] = []
  process.env.RESEND_API_KEY = 'test-only'
  process.env.ORDER_EMAIL_FROM = 'test@example.invalid'
  globalThis.fetch = async (_input, init) => {
    messages.push(JSON.parse(String(init?.body)).html)
    return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
  }
  try {
    const customer = { name: 'Test', email: 'buyer@example.invalid', phone: '0', company: '', address: 'Test', notes: '' }
    await sendPaidOrderEmail({ orderNumber: 'JKESS-TEST123', paypalOrderId: 'ORDER', paypalCaptureId: 'CAPTURE', payerEmail: customer.email, currency: 'EUR', customer, items: [{ name: 'Test', variant: 'Kit', quantity: 1, lineTotal: 250.76 }], total: 250.76 })
    await sendCustomerOrderConfirmation({ orderNumber: 'JKESS-TEST123', paypalOrderId: 'ORDER', paypalCaptureId: 'CAPTURE', paypalEventId: '', status: 'COMPLETED', amount: '250.76', currency: 'EUR', payerEmail: customer.email, payerName: 'Test', customer, shippingAddress: {}, items: [{ name: 'Test', sku: 'Kit', quantity: 1, unitAmount: '250.76', currency: 'EUR' }], paypalCustomId: '', paypalDescription: '', internalEmailStatus: 'pending', customerEmailStatus: 'pending', source: 'paypal-webhook', createdAt: '', paidAt: '', updatedAt: '' } satisfies StoredOrderRecord)
    assert.equal(messages.length, 2)
    for (const html of messages) {
      assert.match(html, /EUR 250\.76/)
      assert.doesNotMatch(html, /\$250\.76|250\.76 USD/)
    }
  } finally {
    globalThis.fetch = originalFetch
    if (previousKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = previousKey
    if (previousFrom === undefined) delete process.env.ORDER_EMAIL_FROM
    else process.env.ORDER_EMAIL_FROM = previousFrom
  }
})
