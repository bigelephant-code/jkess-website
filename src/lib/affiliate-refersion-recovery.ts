import { affiliateOrdersFromRefundedCapture, affiliateOrdersFromVerifiedPayment } from './affiliate-verified-payment'
import { classifyRefersionConversions, type RefersionConversionDetail } from './refersion-reconciliation'
import type { AffiliatePaidTask } from './affiliate-report-queue'
import type { AffiliateReportClaim } from './affiliate-report-ledger'
import type { PayPalOrderDetails } from './paypal-server'
import type { StoredAffiliateAttribution } from './order-store'

type Dependencies = {
  readReport: (order: string) => Promise<AffiliateReportClaim | null>
  getAttribution: (id: string) => Promise<StoredAffiliateAttribution | null>
  getOrder: (id: string) => Promise<PayPalOrderDetails>
  getConversions: (order: string) => Promise<RefersionConversionDetail[]>
  reconcile: (claim: AffiliateReportClaim, now: number) => Promise<boolean>
  now: () => number
  isTest: boolean
}

/** Recovers a recorded uncertain submission only; it never sends an order to the provider. */
export async function recoverRefersionPaidReport(task: AffiliatePaidTask, deps: Dependencies) {
  if (task.provider !== 'refersion') return 'review' as const
  const report = await deps.readReport(task.orderNumber)
  const now = deps.now()
  if (!report || report.orderNumber !== task.orderNumber || report.operation !== 'paid' || report.provider !== 'refersion') return 'review' as const
  if (!Number.isSafeInteger(now) || now < report.updatedAt || (report.state !== 'submitted' && now === report.updatedAt) ||
      (report.state !== 'submitted' && report.state !== 'unknown' && !(report.state === 'claimed' && now - report.updatedAt > 5 * 60_000))) return 'review' as const

  const attribution = await deps.getAttribution(task.paypalOrderId)
  if (!attribution || attribution.source.provider !== 'refersion') return 'review' as const
  const match = /^([1-9]\d{0,14})\.[A-Za-z0-9_-]+$/.exec(attribution.source.code)
  const affiliateId = match ? Number(match[1]) : 0
  if (!Number.isSafeInteger(affiliateId) || affiliateId <= 0) return 'review' as const

  const order = await deps.getOrder(task.paypalOrderId)
  let verified: ReturnType<typeof affiliateOrdersFromVerifiedPayment>
  try { verified = affiliateOrdersFromVerifiedPayment(task, order, attribution) } catch {
    try { verified = affiliateOrdersFromRefundedCapture(task, order, attribution) } catch { return 'review' as const }
  }
  const entries = await deps.getConversions(task.orderNumber)
  if (entries.some((entry) => entry.orderNumber !== task.orderNumber)) return 'review' as const
  const conversion = classifyRefersionConversions(entries, {
    affiliateId, paidMinorUnits: verified.refersion.paidMinorUnits,
    currency: verified.refersion.currency as 'USD' | 'EUR', isTest: deps.isTest,
  })
  if (conversion !== 'awaiting-refund' && conversion !== 'balanced') return 'review' as const
  if (conversion === 'balanced' && order.purchase_units?.[0]?.payments?.captures?.[0]?.status?.toUpperCase() !== 'REFUNDED') return 'review' as const
  if (report.state === 'submitted') return 'already-submitted' as const
  return await deps.reconcile(report, now) ? 'recovered' as const : 'changed' as const
}
