import { affiliateOrdersFromVerifiedPayment } from './affiliate-verified-payment'
import type { AffiliatePaidTask } from './affiliate-report-queue'
import type { AffiliateReportClaim } from './affiliate-report-ledger'
import type { PayPalOrderDetails } from './paypal-server'
import type { StoredAffiliateAttribution } from './order-store'
import type { GoAffProOrderInput } from './goaffpro-order'
import type { VerifiedAffiliateOrder } from './affiliate-refersion-order'

type Dependencies = {
  getOrder: (id: string) => Promise<PayPalOrderDetails>
  getAttribution: (id: string) => Promise<StoredAffiliateAttribution | null>
  claim: (orderNumber: string, provider: 'goaffpro' | 'refersion') => Promise<AffiliateReportClaim | null>
  finish: (claim: AffiliateReportClaim, state: 'submitted' | 'unknown') => Promise<unknown>
  submitGoAffPro: (order: GoAffProOrderInput, referralCode: string) => Promise<{ reportedCommissionMatchesReportedTotal: boolean }>
  submitRefersion: (order: VerifiedAffiliateOrder) => Promise<unknown>
}

/** An ambiguous or interrupted provider request is never retried automatically. */
export async function processAffiliatePaidTask(task: AffiliatePaidTask, deps: Dependencies) {
  const attribution = await deps.getAttribution(task.paypalOrderId)
  if (!attribution) return { status: 'review' as const }
  try {
    affiliateOrdersFromVerifiedPayment(task, await deps.getOrder(task.paypalOrderId), attribution)
  } catch {
    return { status: 'review' as const }
  }
  const claim = await deps.claim(task.orderNumber, task.provider)
  if (!claim) {
    if (!await deps.getAttribution(task.paypalOrderId)) return { status: 'review' as const }
    return { status: 'already-claimed' as const }
  }

  // Re-fetch after the claim so a refund before processing cannot generate a sale.
  let payloads: ReturnType<typeof affiliateOrdersFromVerifiedPayment>
  try {
    payloads = affiliateOrdersFromVerifiedPayment(task, await deps.getOrder(task.paypalOrderId), attribution)
  } catch {
    await deps.finish(claim, 'unknown')
    return { status: 'review' as const }
  }
  try {
    if (task.provider === 'goaffpro') {
      const result = await deps.submitGoAffPro(payloads.goaffpro, attribution.source.code)
      if (!result.reportedCommissionMatchesReportedTotal) {
        await deps.finish(claim, 'unknown')
        return { status: 'review' as const }
      }
    } else {
      await deps.submitRefersion(payloads.refersion)
    }
  } catch {
    await deps.finish(claim, 'unknown')
    return { status: 'review' as const }
  }
  await deps.finish(claim, 'submitted')
  return { status: 'submitted' as const }
}
