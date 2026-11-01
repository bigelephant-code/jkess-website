import assert from 'node:assert/strict'
import test from 'node:test'
import { dispositionAffiliateTask } from '../src/lib/affiliate-task-disposition'

const paid = { type: 'paid' as const, value: { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'goaffpro' as const } }
const refund = { type: 'refund' as const, value: { refundId: 'REFUND123', captureId: 'CAPTURE123', orderNumber: 'JKESS-ORDER123', action: 'cancel' as const } }

test('sends only canonical task data and valid keys to the atomic operation', async () => {
  let args: Array<string | number> = []
  const command = async (input: Array<string | number>) => { args = input; return 1 }
  assert.deepEqual(await dispositionAffiliateTask(command, paid, 'submitted'), { moved: true })
  assert.equal(args[3], 'jkess:affiliate:paid:task:JKESS-ORDER123')
  assert.equal(args[4], 'jkess:affiliate:paid:pending')
  assert.equal(args[8], JSON.stringify(paid.value))
  assert.equal(args[10], 'submitted')
  assert.equal(args[13], '0')
  assert.deepEqual(await dispositionAffiliateTask(command, refund, 'review'), { moved: true })
  assert.equal(args[3], 'jkess:affiliate:refund:REFUND123')
  assert.equal(args[10], 'review')
  assert.equal(args[13], '0')
  await dispositionAffiliateTask(command, { ...paid, value: { ...paid.value, provider: 'refersion' } }, 'review')
  assert.equal(args[13], '1')
})

test('refuses changed records or unknown store responses', async () => {
  await assert.rejects(dispositionAffiliateTask(async () => -1, paid, 'review'))
  await assert.rejects(dispositionAffiliateTask(async () => null, paid, 'review'))
  assert.deepEqual(await dispositionAffiliateTask(async () => 0, paid, 'review'), { moved: false })
})

test('rejects malformed IDs before touching the store', async () => {
  let calls = 0
  const command = async () => { calls++; return 1 }
  await assert.rejects(dispositionAffiliateTask(command, { ...paid, value: { ...paid.value, orderNumber: '../invalid' } }, 'review'))
  assert.equal(calls, 0)
})
