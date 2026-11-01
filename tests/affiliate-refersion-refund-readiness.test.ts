import assert from 'node:assert/strict'
import test from 'node:test'
import { refersionRefundReadiness } from '../src/lib/affiliate-refersion-refund-readiness'
import type { AffiliateReportClaim } from '../src/lib/affiliate-report-ledger'
import type { StoredOrderRecord } from '../src/lib/order-store'

const order = { orderNumber: 'JKESS-ORDER123', amount: '130.00', currency: 'USD' } as StoredOrderRecord
const attribution = { source: { status: 'attributed' as const, provider: 'refersion' as const, code: '99.testcode', clickedAt: 1, expiresAt: 7776000001 }, cartId: 'a'.repeat(64) }
const paid: AffiliateReportClaim = { orderNumber: order.orderNumber, operation: 'paid', provider: 'refersion', claimId: 'b'.repeat(64), state: 'submitted', updatedAt: 1000 }
const conversion = { id: 123, affiliateId: 99, orderNumber: order.orderNumber, paymentId: 0, status: 'PENDING', isTest: false, total: '130.00', commission: '13.00', currency: 'USD' as const }

test('waits for a recent order whose conversion or claim is still being processed', () => {
  assert.equal(refersionRefundReadiness(order, attribution, [], paid, 1000), 'defer')
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], { ...paid, state: 'unknown' }, 2000), 'defer')
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], { ...paid, state: 'claimed' }, 2000), 'defer')
  assert.equal(refersionRefundReadiness(order, attribution, [], paid, 1000 + 24 * 60 * 60_000 + 1), 'review')
})

test('only a verified unpaid matching conversion is eligible', () => {
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], paid, 2000), 'eligible')
  assert.equal(refersionRefundReadiness(order, attribution, [{ ...conversion, paymentId: 1 }], paid, 2000), 'review')
  assert.equal(refersionRefundReadiness(order, attribution, [{ ...conversion, commission: '1.00' }], paid, 2000), 'review')
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], null, 2000), 'review')
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], { ...paid, provider: 'goaffpro' }, 2000), 'review')
  assert.equal(refersionRefundReadiness(order, attribution, [conversion], paid, 999), 'review')
})
