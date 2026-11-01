import assert from 'node:assert/strict'
import test from 'node:test'
import { classifyGoAffProReconciliation, readGoAffProReconciliation } from '../src/lib/goaffpro-reconciliation'

const order = 'JKESS-ORDER123'
const affiliate = { id: 99, ref_code: 'testing', ref_codes: ['testing'] }
const sale = { id: 123, number: order, status: 'rejected', affiliate_id: 99, total: '280.58', commission: '28.058107' }
const original = { tx_id: 1, affiliate_id: 99, entity_type: 'orders', entity_id: 123, event_type: 'insert', amount: '28.058107', currency: 'USD', is_paid: 0 }
const reversal = { ...original, tx_id: 2, event_type: 'update', amount: '-28.058107' }
function response(data: unknown) { return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } }) }
function api(options: { affiliates?: unknown[]; orders?: unknown[]; transactions?: unknown[]; transactionCount?: number } = {}): typeof fetch {
  return async (input) => {
    const path = new URL(String(input)).pathname
    if (path.endsWith('/affiliates')) { const rows = options.affiliates ?? [affiliate]; return response({ affiliates: rows, total_results: rows.length }) }
    if (path.endsWith('/orders')) { const rows = options.orders ?? [sale]; return response({ orders: rows, count: rows.length }) }
    const rows = options.transactions ?? [original, reversal]
    return response({ transactions: rows, count: options.transactionCount ?? rows.length })
  }
}
const lookup = (send: typeof fetch) => readGoAffProReconciliation(order, 'testing', 'test-token', send)

test('read-only lookup verifies referral, order and exact unpaid reversal', async () => {
  const value = await lookup(api())
  assert.equal(value.saleId, 123)
  assert.equal(value.transactions.length, 2)
  assert.equal(classifyGoAffProReconciliation(value), 'balanced')
})

test('classifies unpaid original only as candidate, not authorization', async () => {
  const value = await lookup(api({ orders: [{ ...sale, status: 'approved' }], transactions: [original] }))
  assert.equal(classifyGoAffProReconciliation(value), 'unpaid-candidate')
})

test('paid, partial, duplicate or mismatched financial records require review', async () => {
  for (const transactions of [
    [{ ...original, is_paid: 1 }, reversal],
    [original, { ...reversal, amount: '-1.00' }],
    [original, reversal, { ...reversal, tx_id: 3 }],
    [original, { ...reversal, currency: 'EUR' }],
  ]) assert.equal(classifyGoAffProReconciliation(await lookup(api({ transactions }))), 'review')
  await assert.rejects(lookup(api({ transactions: [original, { ...reversal, tx_id: 1 }] })))
})

test('rejects mismatched affiliates, orders, incomplete pages and response errors', async () => {
  await assert.rejects(lookup(api({ affiliates: [{ ...affiliate, ref_code: 'other', ref_codes: ['other'] }] })))
  await assert.rejects(lookup(api({ orders: [{ ...sale, affiliate_id: 100 }] })))
  await assert.rejects(lookup(api({ transactionCount: 3 })))
  await assert.rejects(lookup(api({ transactionCount: 501 })))
  await assert.rejects(lookup(async () => response({ error: 'unavailable' })))
})
