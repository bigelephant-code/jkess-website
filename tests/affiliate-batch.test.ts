import assert from 'node:assert/strict'
import test from 'node:test'
import { runAffiliateBatch } from '../src/lib/affiliate-batch'
import type { AffiliateReportClaim } from '../src/lib/affiliate-report-ledger'

const paid = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'goaffpro' as const }
const refund = { refundId: 'REFUND123', captureId: 'CAPTURE123', orderNumber: paid.orderNumber, action: 'cancel' as const }
const claim: AffiliateReportClaim = { orderNumber: paid.orderNumber, operation: 'paid', provider: 'goaffpro', claimId: 'b'.repeat(64), state: 'claimed', updatedAt: 1000 }

function dependencies() {
  const decisions: string[] = []
  return {
    decisions,
    listPaid: async () => [paid],
    listRefund: async () => [refund],
    processPaid: async () => ({ status: 'submitted' as const }),
    processRefund: async (): Promise<{ status: 'review' | 'submitted' | 'already-claimed-or-unreported' }> => ({ status: 'review' }),
    readReport: async (): Promise<AffiliateReportClaim | null> => null,
    disposition: async (task: { type: string }, state: string) => { decisions.push(`${task.type}:${state}`) },
    now: () => 100_000,
  }
}

test('submitted reports and refund reviews are retained for confirmation', async () => {
  const deps = dependencies()
  assert.deepEqual(await runAffiliateBatch(deps), { submitted: 1, review: 1, deferred: 0, errors: 0 })
  assert.deepEqual(deps.decisions, ['paid:submitted', 'refund:review'])
})

test('in-flight and not-yet-reported tasks are deferred without resending', async () => {
  const deps = dependencies()
  const inFlight = { ...deps, processPaid: async () => ({ status: 'already-claimed' as const }), processRefund: async () => ({ status: 'already-claimed-or-unreported' as const }), readReport: async () => claim }
  assert.equal((await runAffiliateBatch(inFlight)).deferred, 2)
  assert.deepEqual(deps.decisions, ['paid:defer', 'refund:defer'])
})

test('stale claims and ambiguous outcomes are sent for review', async () => {
  const deps = dependencies()
  const stale = { ...deps, processPaid: async () => { throw new Error('timeout') }, processRefund: async () => ({ status: 'already-claimed-or-unreported' as const }), readReport: async () => claim, now: () => 400_000 }
  assert.equal((await runAffiliateBatch(stale)).review, 2)
  assert.deepEqual(deps.decisions, ['paid:review', 'refund:review'])
})

test('an unreported refund cannot remain silently pending forever', async () => {
  const deps = dependencies()
  const unreported = { ...deps, listPaid: async () => [], processRefund: async () => ({ status: 'already-claimed-or-unreported' as const }) }
  assert.deepEqual(await runAffiliateBatch(unreported), { submitted: 0, review: 1, deferred: 0, errors: 0 })
  assert.deepEqual(deps.decisions, ['refund:review'])
})

test('a refund waits for a currently claimed paid report', async () => {
  const deps = dependencies()
  const inFlight = { ...deps, listPaid: async () => [], processRefund: async () => ({ status: 'already-claimed-or-unreported' as const }), readReport: async (_order: string, operation: string) => operation === 'paid' ? claim : null }
  assert.deepEqual(await runAffiliateBatch(inFlight), { submitted: 0, review: 0, deferred: 1, errors: 0 })
  assert.deepEqual(deps.decisions, ['refund:defer'])
})

test('storage failure on one task does not prevent handling another', async () => {
  const deps = dependencies()
  const failed = { ...deps, disposition: async (task: { type: string }, state: string) => { if (task.type === 'paid') throw new Error('unavailable'); deps.decisions.push(`${task.type}:${state}`) } }
  assert.deepEqual(await runAffiliateBatch(failed), { submitted: 0, review: 1, deferred: 0, errors: 1 })
  assert.deepEqual(deps.decisions, ['refund:review'])
})

test('processing failures before a claim require review instead of indefinite deferral', async () => {
  const deps = dependencies()
  const failed = { ...deps, listRefund: async () => [], processPaid: async () => { throw new Error('storage or network unavailable') } }
  assert.deepEqual(await runAffiliateBatch(failed), { submitted: 0, review: 1, deferred: 0, errors: 0 })
  assert.deepEqual(deps.decisions, ['paid:review'])
})

test('a recent claim is deferred even when another worker reports an error', async () => {
  const deps = dependencies()
  const failed = { ...deps, listRefund: async () => [], processPaid: async () => { throw new Error('timeout') }, readReport: async () => claim }
  assert.deepEqual(await runAffiliateBatch(failed), { submitted: 0, review: 0, deferred: 1, errors: 0 })
  assert.deepEqual(deps.decisions, ['paid:defer'])
})

test('a temporarily busy verification lock defers without reading or changing a report', async () => {
  const deps = dependencies()
  let reads = 0
  const busy = { ...deps, listPaid: async () => [], processRefund: async () => ({ status: 'defer' as const }), readReport: async () => { reads++; return null } }
  assert.deepEqual(await runAffiliateBatch(busy), { submitted: 0, review: 0, deferred: 1, errors: 0 })
  assert.equal(reads, 0)
  assert.deepEqual(deps.decisions, ['refund:defer'])
})
