import assert from 'node:assert/strict'
import test from 'node:test'
import { processAffiliateRefundTask } from '../src/lib/affiliate-refund-processor'
import type { AffiliateReportClaim } from '../src/lib/affiliate-report-ledger'
import type { StoredOrderRecord } from '../src/lib/order-store'

const task = { refundId: 'REFUND123', captureId: 'CAPTURE123', orderNumber: 'JKESS-ORDER123', action: 'cancel' as const }
const stored = { orderNumber: task.orderNumber, paypalOrderId: 'PAYPAL123', paypalCaptureId: task.captureId, amount: '130.00', currency: 'USD' } as StoredOrderRecord
const attribution = { source: { status: 'attributed' as const, provider: 'goaffpro' as const, code: 'test', clickedAt: 1, expiresAt: 7776000001 }, cartId: 'a'.repeat(64) }
const money = { value: '130.00', currency_code: 'USD' }
const refund = { id: task.refundId, status: 'COMPLETED', amount: money, links: [{ rel: 'up', href: 'https://api-m.sandbox.paypal.com/v2/payments/captures/CAPTURE123' }] }
const claim: AffiliateReportClaim = { orderNumber: task.orderNumber, operation: 'full_refund', provider: 'goaffpro', claimId: 'b'.repeat(64), state: 'claimed', updatedAt: 1 }

function dependencies() {
  const events: string[] = []
  return {
    events,
    getStoredOrder: async () => stored,
    getAttribution: async () => attribution,
    getOrder: async () => ({}),
    getRefund: async () => refund,
    getCapture: async () => ({ id: task.captureId, status: 'REFUNDED', amount: money }),
    claim: async () => claim,
    finish: async (_claim: AffiliateReportClaim, state: 'submitted' | 'unknown') => { events.push(state) },
    cancelGoAffPro: async () => { events.push('goaffpro') },
    cancelRefersion: async () => { events.push('refersion') },
  }
}

test('fully refunded orders cancel only the selected platform', async () => {
  const deps = dependencies()
  assert.equal((await processAffiliateRefundTask(task, deps)).status, 'submitted')
  assert.deepEqual(deps.events, ['goaffpro', 'submitted'])
})

test('partial refunds and mismatched orders are not cancelled', async () => {
  const partial = dependencies()
  partial.getCapture = async () => ({ id: task.captureId, status: 'PARTIALLY_REFUNDED', amount: money })
  assert.equal((await processAffiliateRefundTask(task, partial)).status, 'review')
  assert.deepEqual(partial.events, [])
  const wrong = dependencies()
  wrong.getStoredOrder = async () => ({ ...stored, paypalCaptureId: 'OTHER' })
  assert.equal((await processAffiliateRefundTask(task, wrong)).status, 'review')
  assert.deepEqual(wrong.events, [])
})

test('a task marked for review cannot automatically cancel a commission', async () => {
  const deps = dependencies()
  let reads = 0
  deps.getStoredOrder = async () => { reads++; return stored }
  assert.equal((await processAffiliateRefundTask({ ...task, action: 'review' }, deps)).status, 'review')
  assert.equal(reads, 0)
  assert.deepEqual(deps.events, [])
})

test('ambiguous cancellations are marked for review without retrying', async () => {
  const deps = dependencies()
  deps.cancelGoAffPro = async () => { deps.events.push('attempt'); throw new Error('timeout') }
  assert.equal((await processAffiliateRefundTask(task, deps)).status, 'review')
  assert.deepEqual(deps.events, ['attempt', 'unknown'])
})

test('Refersion cancellation uses the verified refunded order and no GoAffPro call', async () => {
  const deps = dependencies()
  const refersion = { ...attribution, source: { ...attribution.source, provider: 'refersion' as const } }
  const unitAmount = { value: '100.00', currency_code: 'USD' }
  const refDeps = {
    ...deps,
    getAttribution: async () => refersion,
    getOrder: async () => ({ id: 'PAYPAL123', status: 'COMPLETED', purchase_units: [{
      invoice_id: task.orderNumber,
      amount: { ...money, breakdown: { item_total: unitAmount, shipping: { value: '30.00', currency_code: 'USD' } } },
      items: [{ sku: 'KIT', name: 'Kit', quantity: '1', unit_amount: unitAmount }],
      payments: { captures: [{ id: task.captureId, status: 'REFUNDED', amount: money }] },
    }] }),
    claim: async () => ({ ...claim, provider: 'refersion' as const }),
  }
  assert.equal((await processAffiliateRefundTask(task, refDeps)).status, 'submitted')
  assert.deepEqual(deps.events, ['refersion', 'submitted'])
})
