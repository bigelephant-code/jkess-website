import assert from 'node:assert/strict'
import test from 'node:test'
import { runAffiliateRecoveryQueue } from '../src/lib/affiliate-recovery-queue'

const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'refersion' as const }
function redis() {
  let queued = true
  let score = 1
  return {
    command: async (args: Array<string | number>) => {
      if (args[0] === 'ZRANGEBYSCORE') return queued && score <= Number(args[3]) ? [task.orderNumber] : []
      if (args[0] === 'GET') return JSON.stringify(task)
      if (args[0] === 'ZREM') { const was = queued; queued = false; return was ? 1 : 0 }
      if (args[0] === 'ZADD') { if (queued) score = Number(args[3]); return 0 }
      throw new Error('Unexpected command')
    },
    queued: () => queued,
    score: () => score,
  }
}

test('confirmed recovery removes the automatic retry but leaves review audit untouched', async () => {
  const db = redis()
  assert.deepEqual(await runAffiliateRecoveryQueue(db.command, async (item) => { assert.deepEqual(item, task); return 'recovered' }, 1000), { attempted: 1, recovered: 1 })
  assert.equal(db.queued(), false)
  assert.deepEqual(await runAffiliateRecoveryQueue(db.command, async () => 'recovered', 1001), { attempted: 0, recovered: 0 })
})

test('unconfirmed or failed reads defer the task rather than resending a sale', async () => {
  for (const recover of [async () => 'review' as const, async () => { throw new Error('network') }]) {
    const db = redis()
    assert.deepEqual(await runAffiliateRecoveryQueue(db.command, recover, 1000), { attempted: 1, recovered: 0 })
    assert.equal(db.queued(), true)
    assert.equal(db.score(), 901000)
    assert.deepEqual(await runAffiliateRecoveryQueue(db.command, recover, 1001), { attempted: 0, recovered: 0 })
  }
})

test('rejects invalid queue data and never invokes recovery', async () => {
  let calls = 0
  await assert.rejects(runAffiliateRecoveryQueue(async () => ['../invalid'], async () => { calls++; return 'recovered' }, 1000))
  assert.equal(calls, 0)
})
