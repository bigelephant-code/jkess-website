export type AffiliateProvider = 'goaffpro' | 'refersion'

export type AffiliateTouch = {
  provider: AffiliateProvider
  occurredAt: number
  expiresAt: number
}

export type AffiliateDecision =
  | { status: 'credited'; provider: AffiliateProvider }
  | { status: 'none' }
  | { status: 'review'; reason: 'ambiguous-last-touch' }

export function selectLastAffiliateTouch(
  touches: readonly AffiliateTouch[],
  now: number,
): AffiliateDecision {
  if (!Number.isSafeInteger(now) || now < 0) return { status: 'none' }

  const eligible = touches.filter((touch) =>
    (touch.provider === 'goaffpro' || touch.provider === 'refersion') &&
    Number.isSafeInteger(touch.occurredAt) &&
    Number.isSafeInteger(touch.expiresAt) &&
    touch.occurredAt >= 0 && touch.occurredAt <= now &&
    touch.expiresAt >= touch.occurredAt && touch.expiresAt > now,
  )
  if (eligible.length === 0) return { status: 'none' }

  const latest = Math.max(...eligible.map((touch) => touch.occurredAt))
  const providers = new Set(eligible.filter((touch) => touch.occurredAt === latest).map((touch) => touch.provider))
  if (providers.size !== 1) return { status: 'review', reason: 'ambiguous-last-touch' }
  return { status: 'credited', provider: providers.values().next().value! }
}

export type RefundDecision = 'unchanged' | 'cancel' | 'review'

export function decideAffiliateRefund(
  paidMinorUnits: number,
  refundedMinorUnits: number,
): RefundDecision {
  if (!Number.isSafeInteger(paidMinorUnits) || paidMinorUnits <= 0 ||
      !Number.isSafeInteger(refundedMinorUnits) || refundedMinorUnits < 0 ||
      refundedMinorUnits > paidMinorUnits) return 'review'
  if (refundedMinorUnits === 0) return 'unchanged'
  return refundedMinorUnits === paidMinorUnits ? 'cancel' : 'review'
}
