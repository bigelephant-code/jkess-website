import assert from 'node:assert/strict'
import test from 'node:test'
import { recoverRefersionPaidReport } from '../src/lib/affiliate-refersion-recovery'
import type { AffiliateReportClaim } from '../src/lib/affiliate-report-ledger'
import type { PayPalOrderDetails } from '../src/lib/paypal-server'

const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: 'refersion' as const }
const attribution = { source: { status: 'attributed' as const, provider: 'refersion' as const, code: '99.testcode', clickedAt: 1, expiresAt: 7776000001 }, cartId: 'a'.repeat(64) }
const report: AffiliateReportClaim = { orderNumber: task.orderNumber, operation: 'paid', provider: 'refersion', claimId: 'b'.repeat(64), state: 'unknown', updatedAt: 1000 }
const money = (value: string) => ({ value, currency_code: 'USD' })
const order: PayPalOrderDetails = { id: task.paypalOrderId, status: 'COMPLETED', purchase_units: [{
  invoice_id: task.orderNumber, amount: { ...money('130.00'), breakdown: { item_total: money('100.00'), shipping: money('30.00') } },
  items: [{ sku: 'KIT', name: 'Kit', quantity: '1', unit_amount: money('100.00') }],
  payments: { captures: [{ id: task.captureId, status: 'COMPLETED', amount: money('130.00') }] },
}] }
const conversion = { id: 123, affiliateId: 99, orderNumber: task.orderNumber, paymentId: 0, status: 'PENDING', isTest: true, total: '130.00', commission: '13.00', currency: 'USD' as const }

function dependencies() {
  let changes = 0
  return {
    readReport: async () => report as AffiliateReportClaim | null,
    getAttribution: async () => attribution,
    getOrder: async () => order,
    getConversions: async () => [conversion],
    reconcile: async () => { changes++; return true },
    now: () => 400_000,
    isTest: true,
    changes: () => changes,
  }
}

test('recovers only an independently verified exact conversion without resubmitting', async () => {
  const deps = dependencies()
  assert.equal(await recoverRefersionPaidReport(task, deps), 'recovered')
  assert.equal(deps.changes(), 1)
})

test('missing, mismatched, paid or duplicate conversions remain in review', async () => {
  for (const entries of [[], [{ ...conversion, orderNumber: 'JKESS-OTHER123' }], [{ ...conversion, affiliateId: 100 }], [{ ...conversion, commission: '1.00' }], [{ ...conversion, paymentId: 1 }], [conversion, { ...conversion, id: 124 }], [conversion, { ...conversion, id: 125, total: '-130.00', commission: '-13.00' }]]) {
    const deps = { ...dependencies(), getConversions: async () => entries }
    assert.equal(await recoverRefersionPaidReport(task, deps), 'review')
    assert.equal(deps.changes(), 0)
  }
})

test('respects test boundary, stale claim and concurrent state changes', async () => {
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), isTest: false }), 'review')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), readReport: async () => ({ ...report, state: 'claimed', updatedAt: 399_999 }) }), 'review')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), readReport: async () => ({ ...report, state: 'claimed' }) }), 'recovered')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), reconcile: async () => false }), 'changed')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), readReport: async () => ({ ...report, state: 'submitted' }), getConversions: async () => [] }), 'review')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), readReport: async () => ({ ...report, state: 'submitted' }) }), 'already-submitted')
})

test('refuses wrong PayPal data, source, or a different provider', async () => {
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), getOrder: async () => ({ ...order, id: 'OTHER' }) }), 'review')
  assert.equal(await recoverRefersionPaidReport(task, { ...dependencies(), getAttribution: async () => ({ ...attribution, source: { ...attribution.source, code: 'invalid' } }) }), 'review')
  assert.equal(await recoverRefersionPaidReport({ ...task, provider: 'goaffpro' }, dependencies()), 'review')
})
