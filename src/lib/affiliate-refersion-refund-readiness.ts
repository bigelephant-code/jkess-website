import { refersionRefundEligible } from './affiliate-refersion-refund-eligibility'
import type { AffiliateReportClaim } from './affiliate-report-ledger'
import type { RefersionConversionDetail } from './refersion-reconciliation'
import type { StoredAffiliateAttribution, StoredOrderRecord } from './order-store'

const MAX_WAIT = 24 * 60 * 60_000

/** Delays only cases where provider attribution may still be arriving. */
export function refersionRefundReadiness(order: StoredOrderRecord, attribution: StoredAffiliateAttribution, entries: RefersionConversionDetail[], paid: AffiliateReportClaim | null, now: number) {
  if (!paid || paid.orderNumber !== order.orderNumber || paid.operation !== 'paid' || paid.provider !== 'refersion' || !Number.isSafeInteger(now) || now < paid.updatedAt) return 'review' as const
  const canWait = now - paid.updatedAt <= MAX_WAIT
  if (paid.state === 'claimed' || paid.state === 'unknown') return canWait ? 'defer' as const : 'review' as const
  if (paid.state !== 'submitted') return 'review' as const
  if (!entries.length) return canWait ? 'defer' as const : 'review' as const
  return refersionRefundEligible(order, attribution, entries) ? 'eligible' as const : 'review' as const
}
