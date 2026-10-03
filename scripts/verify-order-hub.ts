import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { syncOrderToHub, verifyReconcileRequest, OrderHubSyncError, checkoutHubPayload } from '../src/lib/order-hub'
import { validateCheckoutPayload } from '../src/lib/paypal-checkout'
import { products } from '../src/lib/products'

async function main() {
  const product = products.find(item => item.type === 'shop' && item.variants?.some(variant => variant.price))!
  const variant = product.variants!.find(item => item.price)!
  const checkout = validateCheckoutPayload({ orderNumber: 'JKESS-20261003-TEST', customer: { name: 'Test Buyer', email: 'buyer@example.test', phone: '12345678', company: '', countryCode: 'DE', address: 'Test Street', notes: '' }, items: [{ slug: product.slug, variant: variant.label, quantity: 2 }] })
  const payload = checkoutHubPayload(checkout, { id: 'TESTPAYPAL000001', status: 'CREATED' })
  assert.equal(payload.usdTotal, payload.paymentTotal)
  assert.equal(payload.policiesAcceptedAt, '')
  const secret = 'isolated-test-secret-'.repeat(3)
  process.env.JKBMS_ORDER_HUB_URL = 'https://www.jkbms.net/api/integrations/jkess/orders'
  process.env.JKBMS_ORDER_HUB_SECRET = secret
  process.env.JKBMS_ORDER_HUB_REQUIRED = 'true'
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async (_input, options) => {
    calls++
    const raw = String(options?.body), headers = new Headers(options?.headers)
    const expected = createHmac('sha256', secret).update(`${headers.get('x-jkess-timestamp')}.${raw}`).digest('hex')
    assert.equal(headers.get('x-jkess-signature'), expected)
    assert.equal(JSON.parse(raw).source, 'jkesstech.com')
    return Response.json({ ok: true, orderNumber: payload.orderNumber })
  }
  try {
    assert.equal(await syncOrderToHub(payload), true)
    const raw = '{}', timestamp = String(Date.now()), signature = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest('hex')
    verifyReconcileRequest(new Request('https://localhost', { headers: { 'x-jkess-timestamp': timestamp, 'x-jkess-signature': signature } }), raw)
    assert.throws(() => verifyReconcileRequest(new Request('https://localhost'), raw), OrderHubSyncError)
    globalThis.fetch = async () => Response.json({ ok: false }, { status: 409 })
    await assert.rejects(syncOrderToHub(payload), OrderHubSyncError)
    assert.equal(calls, 1)
    console.log('PASS JKESS canonical amounts, HMAC, source, acknowledgement and reconcile authorization; no external requests')
  } finally { globalThis.fetch = originalFetch }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
