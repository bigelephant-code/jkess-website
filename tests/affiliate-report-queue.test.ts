import assert from 'node:assert/strict'
import test from 'node:test'
import { enqueueAffiliatePaid, listAffiliatePaidTasks } from '../src/lib/affiliate-report-queue'

function fakeRedis() {
  const records = new Map<string, string>()
  const queue: string[] = []
  return async (args: Array<string | number>): Promise<unknown> => {
    if (args[0] === 'EVAL') {
      const key = String(args[3])
      const previous = records.get(key)
      if (previous) return previous === args[5] ? 0 : -1
      records.set(key, String(args[5]))
      queue.push(String(args[7]))
      return 1
    }
    if (args[0] === 'ZRANGE') return queue.slice(Number(args[2]), Number(args[3]) + 1)
    if (args[0] === 'MGET') return args.slice(1).map((key) => records.get(String(key)) ?? null)
    throw new Error('Unexpected command')
  }
}

const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'ORDER123', captureId: 'CAPTURE123', provider: 'refersion' as const }

test('atomically persists one task for duplicate payment notifications', async () => {
  const redis = fakeRedis()
  const results = await Promise.all(Array.from({ length: 8 }, () => enqueueAffiliatePaid(redis, task)))
  assert.equal(results.filter((entry) => !entry.duplicate).length, 1)
  assert.deepEqual(await listAffiliatePaidTasks(redis), [task])
})

test('rejects a conflicting platform or payment for the same order', async () => {
  const redis = fakeRedis()
  await enqueueAffiliatePaid(redis, task)
  await assert.rejects(enqueueAffiliatePaid(redis, { ...task, provider: 'goaffpro' }))
  await assert.rejects(enqueueAffiliatePaid(redis, { ...task, captureId: 'OTHER' }))
  assert.deepEqual(await listAffiliatePaidTasks(redis), [task])
})

test('invalid task data never reaches storage', async () => {
  let calls = 0
  const redis = async () => { calls++; return null }
  await assert.rejects(enqueueAffiliatePaid(redis, { ...task, orderNumber: '../invalid' }))
  assert.equal(calls, 0)
})
