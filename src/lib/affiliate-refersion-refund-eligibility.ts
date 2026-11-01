import { classifyRefersionConversions, type RefersionConversionDetail } from './refersion-reconciliation'
import type { StoredAffiliateAttribution, StoredOrderRecord } from './order-store'

/** A missing, paid, partial, mismatched or ambiguous conversion never permits cancellation. */
export function refersionRefundEligible(order: StoredOrderRecord, attribution: StoredAffiliateAttribution, entries: RefersionConversionDetail[]) {
  if (entries.some((entry) => entry.orderNumber !== order.orderNumber) ||
      attribution.source.provider !== 'refersion' || !/^[1-9]\d*\.[A-Za-z0-9]+(?:\.\d+)?$/.test(attribution.source.code) ||
      !['USD', 'EUR'].includes(order.currency) || !/^\d{1,10}(?:\.\d{1,2})?$/.test(order.amount)) return false
  const affiliateId = Number(attribution.source.code.split('.')[0])
  const [whole, fraction = ''] = order.amount.split('.')
  const paidMinorUnits = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  if (!Number.isSafeInteger(affiliateId) || !Number.isSafeInteger(paidMinorUnits) || paidMinorUnits <= 0) return false
  return classifyRefersionConversions(entries, { affiliateId, paidMinorUnits, currency: order.currency as 'USD' | 'EUR', isTest: false }) === 'awaiting-refund'
}
