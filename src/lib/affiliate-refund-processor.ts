import { affiliateOrdersFromRefundedCapture } from './affiliate-verified-payment'
import { validateRefundForOrder, type CaptureDetails, type RefundDetails } from './paypal-refund-validation'
import type { AffiliateReportClaim } from './affiliate-report-ledger'
import type { PayPalOrderDetails } from './paypal-server'
import type { StoredAffiliateAttribution, StoredOrderRecord } from './order-store'
import type { VerifiedAffiliateOrder } from './affiliate-refersion-order'

type RefundTask = { refundId: string; captureId: string; orderNumber: string; action: 'cancel' | 'review' }
type Verification = { refundId: string; refund: RefundDetails; capture: CaptureDetails; storedOrder: StoredOrderRecord }
type Dependencies = {
  getStoredOrder: (number: string) => Promise<StoredOrderRecord | null>
  getAttribution: (id: string) => Promise<StoredAffiliateAttribution | null>
  getOrder: (id: string) => Promise<PayPalOrderDetails>
  getRefund: (id: string) => Promise<RefundDetails>
  getCapture: (id: string) => Promise<CaptureDetails>
  claim: (orderNumber: string, provider: 'goaffpro' | 'refersion') => Promise<AffiliateReportClaim | null>
  finish: (claim: AffiliateReportClaim, state: 'submitted' | 'unknown') => Promise<unknown>
  cancelGoAffPro: (orderNumber: string) => Promise<unknown>
  cancelRefersion: (order: VerifiedAffiliateOrder, verification: Verification) => Promise<unknown>
}

/** Full refunds only. Partial refunds and uncertain outcomes remain for review. */
export async function processAffiliateRefundTask(task: RefundTask, deps: Dependencies) {
  if (task.action !== 'cancel') return { status: 'review' as const }
  const stored = await deps.getStoredOrder(task.orderNumber)
  if (!stored || stored.orderNumber !== task.orderNumber || stored.paypalCaptureId !== task.captureId) return { status: 'review' as const }
  const attribution = await deps.getAttribution(stored.paypalOrderId)
  if (!attribution) return { status: 'review' as const }
  let verification: Verification
  let payload: VerifiedAffiliateOrder | null = null
  try {
    const refund = await deps.getRefund(task.refundId)
    const capture = await deps.getCapture(task.captureId)
    const decision = validateRefundForOrder({ eventRefundId: task.refundId, refund, capture, order: stored })
    if (decision.action !== 'cancel') return { status: 'review' as const }
    verification = { refundId: task.refundId, refund, capture, storedOrder: stored }
    if (attribution.source.provider === 'refersion') {
      const order = await deps.getOrder(stored.paypalOrderId)
      payload = affiliateOrdersFromRefundedCapture({ orderNumber: stored.orderNumber, paypalOrderId: stored.paypalOrderId, captureId: task.captureId, provider: 'refersion' }, order, attribution).refersion
    }
  } catch {
    return { status: 'review' as const }
  }
  const claim = await deps.claim(task.orderNumber, attribution.source.provider)
  if (!claim) return { status: 'already-claimed-or-unreported' as const }
  try {
    if (attribution.source.provider === 'goaffpro') await deps.cancelGoAffPro(task.orderNumber)
    else if (payload) await deps.cancelRefersion(payload, verification)
    else throw new Error('Refund payload is unavailable')
  } catch {
    await deps.finish(claim, 'unknown')
    return { status: 'review' as const }
  }
  await deps.finish(claim, 'submitted')
  return { status: 'submitted' as const }
}
