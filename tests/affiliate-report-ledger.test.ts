import assert from 'node:assert/strict'
import test from 'node:test'
import { claimAffiliateReport, finishAffiliateReport, readAffiliateReport, reconcileSubmittedAffiliateReport } from '../src/lib/affiliate-report-ledger'

function fakeRedis() {
  const values = new Map<string, string>()
  return async (args: Array<string | number>): Promise<unknown> => {
    if (args[0] === 'GET') return values.get(String(args[1])) ?? null
    if (args[0] === 'SET') {
      const key = String(args[1])
      if (args[3] === 'NX' && values.has(key)) return null
      values.set(key, String(args[2]))
      return 'OK'
    }
    if (args[0] === 'EVAL') {
      if (args[2] === 2) {
        const paid = values.get(String(args[3]))
        const key = String(args[4])
        if (!paid) return 0
        let previous: { state?: string; provider?: string }
        try { previous = JSON.parse(paid) } catch { return 0 }
        if (previous?.state !== 'submitted' || previous.provider !== args[5] || values.has(key)) return 0
        values.set(key, String(args[6]))
        return 1
      }
      const key = String(args[3])
      if (values.get(key) !== args[4]) return 0
      values.set(key, String(args[5]))
      return 1
    }
    throw new Error('Unexpected Redis command')
  }
}

test('only one platform claims an order, even when requests race', async () => {
  const redis = fakeRedis()
  const [first, second] = await Promise.all([
    claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'goaffpro'),
    claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'refersion'),
  ])
  assert.equal([first, second].filter(Boolean).length, 1)
  assert.equal((await readAffiliateReport(redis, 'JKESS-TEST', 'paid'))?.provider, (first ?? second)?.provider)
})

test('an ambiguous or interrupted report cannot be blindly claimed again', async () => {
  const redis = fakeRedis()
  const paid = await claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'refersion')
  assert.ok(paid)
  await finishAffiliateReport(redis, paid, 'submitted')
  const claim = await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'refersion')
  assert.ok(claim)
  assert.equal(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'refersion'), null)
  await finishAffiliateReport(redis, claim, 'unknown')
  assert.equal((await readAffiliateReport(redis, 'JKESS-TEST', 'full_refund'))?.state, 'unknown')
  assert.equal(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'goaffpro'), null)
  await assert.rejects(finishAffiliateReport(redis, claim, 'submitted'))
})

test('refunds require a submitted paid report for the same provider', async () => {
  const redis = fakeRedis()
  assert.equal(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'refersion'), null)
  const paid = await claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'refersion')
  assert.ok(paid)
  assert.equal(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'refersion'), null)
  await finishAffiliateReport(redis, paid, 'submitted')
  assert.equal(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'goaffpro'), null)
  assert.ok(await claimAffiliateReport(redis, 'JKESS-TEST', 'full_refund', 'refersion'))
})

test('only the exact claim owner can finalize a report', async () => {
  const redis = fakeRedis()
  const claim = await claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'refersion')
  assert.ok(claim)
  await assert.rejects(finishAffiliateReport(redis, { ...claim, claimId: 'a'.repeat(64) }, 'submitted'))
  assert.equal((await finishAffiliateReport(redis, claim, 'submitted')).state, 'submitted')
  assert.equal((await readAffiliateReport(redis, 'JKESS-TEST', 'paid'))?.state, 'submitted')
})

test('invalid keys and malformed stored values fail closed', async () => {
  const redis = fakeRedis()
  await assert.rejects(claimAffiliateReport(redis, '../secret', 'paid', 'refersion'))
  await redis(['SET', 'jkess:affiliate:report:paid:JKESS-TEST', '{bad'])
  await assert.rejects(readAffiliateReport(redis, 'JKESS-TEST', 'paid'))
})

test('reconciliation cannot overwrite an in-flight or concurrently changed report', async () => {
  const redis = fakeRedis()
  const claim = await claimAffiliateReport(redis, 'JKESS-TEST', 'paid', 'refersion')
  assert.ok(claim)
  await assert.rejects(reconcileSubmittedAffiliateReport(redis, claim, claim.updatedAt + 100))
  const unknown = await finishAffiliateReport(redis, claim, 'unknown')
  assert.equal(await reconcileSubmittedAffiliateReport(redis, { ...unknown, claimId: 'a'.repeat(64) }, unknown.updatedAt + 1), false)
  assert.equal(await reconcileSubmittedAffiliateReport(redis, unknown, unknown.updatedAt + 1), true)
  assert.equal(await reconcileSubmittedAffiliateReport(redis, unknown, unknown.updatedAt + 2), false)
  assert.equal((await readAffiliateReport(redis, 'JKESS-TEST', 'paid'))?.state, 'submitted')
})
