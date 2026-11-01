import assert from 'node:assert/strict'
import test from 'node:test'
import { enqueueAffiliateRefund } from '../src/lib/affiliate-refund-queue'

const task = { refundId: 'REFUND123', captureId: 'CAPTURE123', orderNumber: 'JKESS-ORDER123', action: 'cancel' as const }

function fakeRedis() {
  const records = new Map<string, string>()
  const queue: string[] = []
  const command = async (args: Array<string | number>) => {
    assert.equal(args[0], 'EVAL')
    const key = String(args[3])
    const previous = records.get(key)
    if (previous) return previous === args[5] ? 0 : -1
    records.set(key, String(args[5]))
    queue.push(String(args[7]))
    return 1
  }
  return { command, records, queue }
}

test('repeated verified refund notifications enqueue exactly once', async () => {
  const redis = fakeRedis()
  const results = await Promise.all(Array.from({ length: 8 }, () => enqueueAffiliateRefund(redis.command, task)))
  assert.equal(results.filter((result) => !result.duplicate).length, 1)
  assert.deepEqual(redis.queue, [task.refundId])
})

test('conflicting refund replays preserve the original task', async () => {
  const redis = fakeRedis()
  await enqueueAffiliateRefund(redis.command, task)
  await assert.rejects(enqueueAffiliateRefund(redis.command, { ...task, captureId: 'OTHER' }))
  await assert.rejects(enqueueAffiliateRefund(redis.command, { ...task, action: 'review' }))
  assert.equal(redis.records.get(`jkess:affiliate:refund:${task.refundId}`), JSON.stringify(task))
  assert.deepEqual(redis.queue, [task.refundId])
})

test('invalid refund references never reach the store', async () => {
  let calls = 0
  const command = async () => { calls++; return null }
  await assert.rejects(enqueueAffiliateRefund(command, { ...task, orderNumber: '../invalid' }))
  await assert.rejects(enqueueAffiliateRefund(command, { ...task, action: 'invalid' as 'review' }))
  assert.equal(calls, 0)
})

test('unknown store replies fail closed', async () => {
  await assert.rejects(enqueueAffiliateRefund(async () => null, task))
})
