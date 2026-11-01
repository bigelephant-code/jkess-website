import assert from 'node:assert/strict'
import test from 'node:test'
import { processAffiliatePaidTask } from '../src/lib/affiliate-paid-processor'
import type { AffiliateReportClaim } from '../src/lib/affiliate-report-ledger'
import type { PayPalOrderDetails } from '../src/lib/paypal-server'

const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'refersion' as const }
const attribution = { source: { status: 'attributed' as const, provider: 'refersion' as const, code: 'test', clickedAt: 1, expiresAt: 7776000001 }, cartId: 'a'.repeat(64) }
const money = (value: string) => ({ value, currency_code: 'USD' })
const order: PayPalOrderDetails = { id: 'PAYPAL123', status: 'COMPLETED', purchase_units: [{
  invoice_id: task.orderNumber, amount: { ...money('130.00'), breakdown: { item_total: money('100.00'), shipping: money('30.00') } },
  items: [{ sku: 'KIT', name: 'Kit', quantity: '1', unit_amount: money('100.00') }],
  payments: { captures: [{ id: 'CAPTURE123', status: 'COMPLETED', amount: money('130.00') }] },
}] }
const claim: AffiliateReportClaim = { orderNumber: task.orderNumber, operation: 'paid', provider: 'refersion', claimId: 'b'.repeat(64), state: 'claimed', updatedAt: 1 }

function dependencies() {
  const events: string[] = []
  return {
    events,
    getOrder: async () => order,
    getAttribution: async () => attribution,
    claim: async () => claim,
    finish: async (_claim: AffiliateReportClaim, state: 'submitted' | 'unknown') => { events.push(state) },
    submitGoAffPro: async () => { events.push('goaffpro'); return { reportedCommissionMatchesReportedTotal: true } },
    submitRefersion: async () => { events.push('refersion') },
  }
}

test('submits a verified payment to its selected provider only', async () => {
  const deps = dependencies()
  assert.equal((await processAffiliatePaidTask(task, deps)).status, 'submitted')
  assert.deepEqual(deps.events, ['refersion', 'submitted'])
})

test('does not send a refunded or unverified payment', async () => {
  const deps = dependencies()
  deps.getOrder = async () => ({ ...order, status: 'VOIDED' })
  assert.equal((await processAffiliatePaidTask(task, deps)).status, 'review')
  assert.deepEqual(deps.events, [])
})

test('rechecks the capture after acquiring the claim', async () => {
  const deps = dependencies()
  let reads = 0
  deps.getOrder = async () => ++reads === 1 ? order : { ...order, status: 'VOIDED' }
  assert.equal((await processAffiliatePaidTask(task, deps)).status, 'review')
  assert.deepEqual(deps.events, ['unknown'])
})

test('does not resend a claimed order and records ambiguous delivery', async () => {
  const deps = dependencies()
  deps.claim = async () => null as unknown as AffiliateReportClaim
  assert.equal((await processAffiliatePaidTask(task, deps)).status, 'already-claimed')
  assert.deepEqual(deps.events, [])
  const uncertain = dependencies()
  uncertain.submitRefersion = async () => { throw new Error('timeout') }
  assert.equal((await processAffiliatePaidTask(task, uncertain)).status, 'review')
  assert.deepEqual(uncertain.events, ['unknown'])
})
