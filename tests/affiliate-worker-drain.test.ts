import assert from 'node:assert/strict'
import test from 'node:test'
import { drainAffiliateBatches } from '../src/lib/affiliate-worker-drain'

const empty = () => ({ submitted: 0, review: 0, deferred: 0, errors: 0, recovery: { attempted: 0, recovered: 0 } })

test('stops immediately when there is no work', async () => {
  let calls = 0
  const result = await drainAffiliateBatches(async () => { calls++; return empty() }, () => 100)
  assert.equal(calls, 1)
  assert.equal(result.batches.length, 1)
})

test('processes several queued tasks but never exceeds the batch cap', async () => {
  let calls = 0
  const result = await drainAffiliateBatches(async () => { calls++; return { ...empty(), submitted: 1 } }, () => 100)
  assert.equal(calls, 5)
  assert.equal(result.batches.length, 5)
})

test('stops after the time budget and propagates processing errors', async () => {
  let calls = 0
  const times = [100, 5100]
  await drainAffiliateBatches(async () => { calls++; return { ...empty(), deferred: 1 } }, () => times.shift() ?? 5100)
  assert.equal(calls, 1)
  await assert.rejects(drainAffiliateBatches(async () => ({ ...empty(), errors: 1 })))
  await assert.rejects(drainAffiliateBatches(async () => { throw new Error('storage unavailable') }))
})
