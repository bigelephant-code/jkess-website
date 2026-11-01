import assert from 'node:assert/strict'
import test from 'node:test'
import { refersionRefundEligible } from '../src/lib/affiliate-refersion-refund-eligibility'
import type { StoredAffiliateAttribution, StoredOrderRecord } from '../src/lib/order-store'
import type { RefersionConversionDetail } from '../src/lib/refersion-reconciliation'

const order = { orderNumber: 'JKESS-ORDER123', currency: 'EUR', amount: '250.53' } as StoredOrderRecord
const attribution = { source: { status: 'attributed', provider: 'refersion', code: '99.abc', clickedAt: 1, expiresAt: 7776000001 }, cartId: 'a'.repeat(64) } as StoredAffiliateAttribution
const conversion: RefersionConversionDetail = { id: 1, affiliateId: 99, orderNumber: order.orderNumber, paymentId: 0, status: 'PENDING', isTest: false, total: '250.53', commission: '25.05', currency: 'EUR' }

test('only a matching unpaid pending conversion can proceed to verified refund checks', () => {
  assert.equal(refersionRefundEligible(order, attribution, [conversion]), true)
  assert.equal(refersionRefundEligible(order, attribution, []), false)
  assert.equal(refersionRefundEligible(order, attribution, [{ ...conversion, paymentId: 5 }]), false)
  assert.equal(refersionRefundEligible(order, attribution, [{ ...conversion, affiliateId: 100 }]), false)
  assert.equal(refersionRefundEligible(order, attribution, [{ ...conversion, isTest: true }]), false)
  assert.equal(refersionRefundEligible(order, attribution, [{ ...conversion, orderNumber: 'JKESS-OTHER123' }]), false)
  assert.equal(refersionRefundEligible(order, attribution, [conversion, { ...conversion, id: 2, total: '-250.53', commission: '-25.05' }]), false)
})
