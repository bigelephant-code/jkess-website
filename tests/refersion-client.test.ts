import assert from 'node:assert/strict'
import test from 'node:test'
import { RefersionReportError, submitRefersionFullRefund, submitRefersionPaidOrder } from '../src/lib/refersion-client'

const order = {
  cartId: 'a'.repeat(64), orderId: 'JKESS-SANDBOX', currency: 'EUR',
  paidMinorUnits: 25053, shippingMinorUnits: 0, taxMinorUnits: 0, discountMinorUnits: 0,
  items: [{ sku: 'SKU', name: 'Kit', quantity: 1, unitMinorUnits: 25053 }],
}
const credentials = { publicKey: 'pub_test123', secretKey: 'sec_test123' }

test('submits only validated order data with server-side headers', async () => {
  let calls = 0
  const send: typeof fetch = async (url, init) => {
    calls++
    assert.equal(url, 'https://inbound-webhooks.refersion.com/tracker/orders/paid')
    assert.equal(init?.method, 'POST')
    assert.equal(init?.redirect, 'error')
    assert.equal((init?.headers as Record<string, string>)['Refersion-Secret-Key'], credentials.secretKey)
    assert.deepEqual(JSON.parse(String(init?.body)).items, [{ sku: 'SKU', name: 'Kit', quantity: 1, price: 250.53 }])
    return new Response('', { status: 200 })
  }
  assert.deepEqual(await submitRefersionPaidOrder(order, credentials, send), { status: 'submitted' })
  assert.equal(calls, 1)
})

test('failed or ambiguous deliveries are not automatically retried', async () => {
  for (const [status, outcome] of [[401, 'rejected'], [429, 'unknown'], [500, 'unknown']] as const) {
    let calls = 0
    const send: typeof fetch = async () => { calls++; return new Response('', { status }) }
    await assert.rejects(submitRefersionPaidOrder(order, credentials, send), (error: unknown) => error instanceof RefersionReportError && error.outcome === outcome)
    assert.equal(calls, 1)
  }
  await assert.rejects(submitRefersionPaidOrder(order, credentials, async () => { throw new Error('timeout') }), (error: unknown) => error instanceof RefersionReportError && error.outcome === 'unknown')
})

test('invalid credentials or amounts never send a request', async () => {
  let calls = 0
  const send: typeof fetch = async () => { calls++; return new Response('') }
  await assert.rejects(submitRefersionPaidOrder(order, { ...credentials, secretKey: '' }, send))
  await assert.rejects(submitRefersionPaidOrder({ ...order, paidMinorUnits: 1 }, credentials, send))
  assert.equal(calls, 0)
})

const refundVerification = {
  refundId: 'REFUND123',
  refund: {
    id: 'REFUND123', status: 'COMPLETED', amount: { value: '250.53', currency_code: 'EUR' },
    links: [{ rel: 'up', href: 'https://api-m.sandbox.paypal.com/v2/payments/captures/CAPTURE123' }],
  },
  capture: { id: 'CAPTURE123', status: 'REFUNDED', amount: { value: '250.53', currency_code: 'EUR' } },
  storedOrder: { orderNumber: 'JKESS-SANDBOX', paypalCaptureId: 'CAPTURE123', amount: '250.53', currency: 'EUR' },
}

test('submits a full refund only after matching trusted PayPal and order data', async () => {
  let calls = 0
  const send: typeof fetch = async (url, init) => {
    calls++
    assert.equal(url, 'https://api.refersion.com/v2/conversion/cancel')
    assert.equal(init?.method, 'POST')
    assert.equal(init?.redirect, 'error')
    assert.deepEqual(JSON.parse(String(init?.body)), {
      order_id: 'JKESS-SANDBOX', items: [{ sku: 'SKU', quantity: 1, price: 250.53 }],
    })
    return new Response('', { status: 200 })
  }
  assert.deepEqual(await submitRefersionFullRefund(order, refundVerification, credentials, send), { status: 'submitted' })
  assert.equal(calls, 1)
})

test('never sends partial, mismatched, or unverified refunds', async () => {
  let calls = 0
  const send: typeof fetch = async () => { calls++; return new Response('') }
  const bad = [
    { ...refundVerification, capture: { ...refundVerification.capture, status: 'PARTIALLY_REFUNDED' } },
    { ...refundVerification, storedOrder: { ...refundVerification.storedOrder, orderNumber: 'OTHER' } },
    { ...refundVerification, storedOrder: { ...refundVerification.storedOrder, amount: '250.52' } },
    { ...refundVerification, storedOrder: { ...refundVerification.storedOrder, currency: 'USD' } },
    { ...refundVerification, refundId: 'OTHER' },
    { ...refundVerification, refund: { ...refundVerification.refund, status: 'PENDING' } },
  ]
  for (const verification of bad) await assert.rejects(submitRefersionFullRefund(order, verification, credentials, send))
  assert.equal(calls, 0)
})

test('does not retry a refund whose provider outcome is unknown', async () => {
  let calls = 0
  await assert.rejects(submitRefersionFullRefund(order, refundVerification, credentials, async () => {
    calls++
    throw new Error('timeout')
  }), (error: unknown) => error instanceof RefersionReportError && error.outcome === 'unknown')
  assert.equal(calls, 1)
})

test('does not treat Refersion cancellation HTTP 204 as success', async () => {
  await assert.rejects(
    submitRefersionFullRefund(order, refundVerification, credentials, async () => new Response(null, { status: 204 })),
    (error: unknown) => error instanceof RefersionReportError && error.outcome === 'rejected' && error.status === 204,
  )
})
