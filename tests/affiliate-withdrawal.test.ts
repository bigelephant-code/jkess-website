import assert from 'node:assert/strict'
import test from 'node:test'
import { rememberAffiliateWithdrawal, withdrawPendingAffiliates } from '../src/lib/affiliate-withdrawal'

function storage(): Storage {
  const data = new Map<string, string>()
  return { get length() { return data.size }, clear: () => data.clear(), getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null, removeItem: (key) => { data.delete(key) }, setItem: (key, value) => { data.set(key, value) } }
}
const item = { paypalOrderId: 'TESTPAYPAL1', orderNumber: 'JKESS-TEST123', token: 'a'.repeat(64) }

test('withdrawal is removed only after server confirms it', async () => {
  const db = storage()
  rememberAffiliateWithdrawal(db, item)
  let payload = ''
  const send: typeof fetch = async (_url, init) => { payload = String(init?.body); return Response.json({ status: 'withdrawn' }) }
  assert.equal(await withdrawPendingAffiliates(db, send), true)
  assert.deepEqual(JSON.parse(payload), item)
  assert.equal(db.length, 0)
})

test('busy, failed, malformed and network outcomes keep pending withdrawal', async () => {
  for (const send of [
    async () => new Response('{}', { status: 409 }),
    async () => Response.json({ status: 'pending' }),
    async () => { throw new Error('offline') },
  ] as typeof fetch[]) {
    const db = storage()
    rememberAffiliateWithdrawal(db, item)
    assert.equal(await withdrawPendingAffiliates(db, send), false)
    assert.equal(db.length, 1)
  }
})

test('unrelated storage is not modified and invalid references are rejected', async () => {
  const db = storage()
  db.setItem('other', 'value')
  assert.throws(() => rememberAffiliateWithdrawal(db, { ...item, token: 'bad' }))
  assert.equal(await withdrawPendingAffiliates(db, async () => { throw new Error('unexpected') }), true)
  assert.equal(db.getItem('other'), 'value')
})
