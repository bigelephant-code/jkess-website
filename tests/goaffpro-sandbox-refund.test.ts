import assert from 'node:assert/strict'
import test from 'node:test'
import { cancelGoAffProSandboxSale } from '../src/lib/goaffpro-sandbox-refund'

const order = 'JKESS-TESTORDER123'
const affiliateId = 21335892
const initial = { tx_id: 1, affiliate_id: affiliateId, entity_type: 'orders', entity_id: 123, event_type: 'insert', amount: '28.058107', currency: 'USD', is_paid: 0 }
const reversal = { ...initial, tx_id: 2, event_type: 'update', amount: '-28.058107' }

function withSandbox() {
  const names = ['PAYPAL_ENVIRONMENT', 'AFFILIATE_SANDBOX_AUTO_TEST_ENABLED', 'AFFILIATE_SANDBOX_AUTO_TEST_ORDER', 'JKESS_SANDBOX_UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL'] as const
  const previous = names.map((name) => process.env[name])
  Object.assign(process.env, { PAYPAL_ENVIRONMENT: 'sandbox', AFFILIATE_SANDBOX_AUTO_TEST_ENABLED: 'true', AFFILIATE_SANDBOX_AUTO_TEST_ORDER: order, JKESS_SANDBOX_UPSTASH_REDIS_REST_URL: 'https://test.invalid', UPSTASH_REDIS_REST_URL: 'https://live.invalid', KV_REST_API_URL: '' })
  return () => names.forEach((name, index) => { const value = previous[index]; if (value === undefined) delete process.env[name]; else process.env[name] = value })
}

function fakeApi(options: { paid?: boolean; balanced?: boolean; patchError?: boolean; missingReversal?: boolean } = {}) {
  let patched = false
  let patchCalls = 0
  const send: typeof fetch = async (input, init) => {
    const url = new URL(String(input))
    if (init?.method === 'PATCH') { patchCalls++; if (options.patchError) return new Response('{}', { status: 503 }); patched = true; return Response.json({ success: true }) }
    if (url.pathname.endsWith('/affiliates')) return Response.json({ affiliates: [{ id: affiliateId, ref_code: 'jkess-test-sandbox' }], total_results: 1 })
    if (url.pathname.endsWith('/orders')) return Response.json({ orders: [{ id: 123, number: order, status: patched || options.balanced ? 'rejected' : 'approved', affiliate_id: affiliateId, total: '280.58', commission: '28.058107' }], count: 1 })
    const tx = { ...initial, is_paid: options.paid ? 1 : 0 }
    const rows = (patched || options.balanced) && !options.missingReversal ? [tx, reversal] : [tx]
    return Response.json({ transactions: rows, count: rows.length })
  }
  return { send, calls: () => patchCalls }
}

test('sandbox cancellation requires an exact unpaid sale and a confirmed reversal', async () => {
  const restore = withSandbox()
  try { const api = fakeApi(); await cancelGoAffProSandboxSale(order, 'test-token', api.send); assert.equal(api.calls(), 1) } finally { restore() }
})

test('paid or already reversed sales are never patched again', async () => {
  const restore = withSandbox()
  try {
    for (const options of [{ paid: true }, { balanced: true }]) {
      const api = fakeApi(options)
      await assert.rejects(cancelGoAffProSandboxSale(order, 'test-token', api.send))
      assert.equal(api.calls(), 0)
    }
  } finally { restore() }
})

test('unconfirmed or failed reversals stay errors, not successful cancellations', async () => {
  const restore = withSandbox()
  try {
    for (const options of [{ patchError: true }, { missingReversal: true }]) {
      const api = fakeApi(options)
      await assert.rejects(cancelGoAffProSandboxSale(order, 'test-token', api.send))
      assert.equal(api.calls(), 1)
    }
  } finally { restore() }
})

test('never reaches provider without sandbox, isolated database and exact allowlist', async () => {
  const restore = withSandbox()
  try {
    const api = fakeApi()
    await assert.rejects(cancelGoAffProSandboxSale('JKESS-OTHER123', 'test-token', api.send))
    process.env.PAYPAL_ENVIRONMENT = 'live'
    await assert.rejects(cancelGoAffProSandboxSale(order, 'test-token', api.send))
    process.env.PAYPAL_ENVIRONMENT = 'sandbox'
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.invalid'
    await assert.rejects(cancelGoAffProSandboxSale(order, 'test-token', api.send))
    assert.equal(api.calls(), 0)
  } finally { restore() }
})
