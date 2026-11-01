import assert from 'node:assert/strict'
import test from 'node:test'
import { classifyRefersionConversions, readRefersionOrderConversions } from '../src/lib/refersion-reconciliation'

const order = 'JKESS-ORDER123'
const detail = { id: 123, affiliate: { id: 99 }, merchantUniqueId: order, paymentId: 0, status: 'PENDING', isTest: true, currency: 'EUR', total: '250.53', commissionTotal: '25.05' }
function response(data: unknown, status = 200) { return new Response(JSON.stringify({ data }), { status, headers: { 'content-type': 'application/json' } }) }

test('requests an exact order and independently checks conversion detail', async () => {
  const urls: string[] = []
  const send: typeof fetch = async (input) => {
    const url = String(input); urls.push(url)
    return url.includes('?') ? response([{ id: 123, orderId: order }]) : response(detail)
  }
  const result = await readRefersionOrderConversions(order, 'test-token', send)
  assert.equal(new URL(urls[0]).searchParams.get('orderId'), order)
  assert.equal(result[0].paymentId, 0)
  assert.equal(result[0].isTest, true)
  assert.equal(result[0].commission, '25.05')
})

test('only an exact unpaid full-refund pair is considered balanced', () => {
  const base = { id: 123, affiliateId: 99, orderNumber: order, paymentId: 0, status: 'PENDING', isTest: true, total: '250.53', commission: '25.05', currency: 'EUR' as const }
  const expected = { affiliateId: 99, paidMinorUnits: 25053, currency: 'EUR' as const, isTest: true }
  const refund = { ...base, id: 124, total: '-250.53', commission: '-25.05' }
  assert.equal(classifyRefersionConversions([], expected), 'unconfirmed')
  assert.equal(classifyRefersionConversions([base], expected), 'awaiting-refund')
  assert.equal(classifyRefersionConversions([base, refund], expected), 'balanced')
  assert.equal(classifyRefersionConversions([base, { ...refund, paymentId: 3 }], expected), 'review')
  assert.equal(classifyRefersionConversions([base, { ...refund, total: '-100.00' }], expected), 'review')
  assert.equal(classifyRefersionConversions([base, { ...refund, affiliateId: 100 }], expected), 'review')
  assert.equal(classifyRefersionConversions([base, refund, { ...refund, id: 125 }], expected), 'review')
})

test('rejects wrong orders, duplicate IDs and ambiguous capped results', async () => {
  await assert.rejects(readRefersionOrderConversions(order, 'token', async () => response([{ id: 123, orderId: 'OTHER' }])))
  await assert.rejects(readRefersionOrderConversions(order, 'token', async () => response([{ id: 123, orderId: order }, { id: 123, orderId: order }])))
  await assert.rejects(readRefersionOrderConversions(order, 'token', async () => response(Array.from({ length: 100 }, (_, i) => ({ id: i + 1, orderId: order })))))
})

test('rejects missing payment state, mismatched detail and HTTP errors', async () => {
  const send = (value: unknown): typeof fetch => async (input) => String(input).includes('?') ? response([{ id: 123, orderId: order }]) : response(value)
  await assert.rejects(readRefersionOrderConversions(order, 'token', send({ ...detail, paymentId: null })))
  await assert.rejects(readRefersionOrderConversions(order, 'token', send({ ...detail, merchantUniqueId: 'OTHER' })))
  await assert.rejects(readRefersionOrderConversions(order, 'token', async () => response({}, 401)))
})
