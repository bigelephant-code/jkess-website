export type AffiliateLinkSource =
  | { status: 'attributed'; provider: 'goaffpro' | 'refersion'; code: string; clickedAt: number; expiresAt: number }
  | { status: 'review'; reason: 'multiple-providers' | 'invalid-source'; clickedAt: number; expiresAt: number }

export const AFFILIATE_SOURCE_KEY = 'jkess:affiliate:last-touch:v1'
export const AFFILIATE_MARKETING_CONSENT_KEY = 'jkess:affiliate:marketing-consent:v1'
export const AFFILIATE_WINDOW_MS = 90 * 24 * 60 * 60 * 1000

export type AttributedAffiliateSource = Extract<AffiliateLinkSource, { status: 'attributed' }>

export function validAffiliateSource(value: unknown, now: number): AttributedAffiliateSource | null {
  if (!value || typeof value !== 'object' || !Number.isSafeInteger(now)) return null
  const source = value as Record<string, unknown>
  if (source.status !== 'attributed' || (source.provider !== 'goaffpro' && source.provider !== 'refersion') ||
      typeof source.code !== 'string' || !/^[A-Za-z0-9_.-]{1,180}$/.test(source.code) ||
      !Number.isSafeInteger(source.clickedAt) || !Number.isSafeInteger(source.expiresAt)) return null
  const clickedAt = source.clickedAt as number
  const expiresAt = source.expiresAt as number
  if (clickedAt < 0 || clickedAt > now || expiresAt !== clickedAt + AFFILIATE_WINDOW_MS || expiresAt <= now) return null
  return { status: 'attributed', provider: source.provider, code: source.code, clickedAt, expiresAt }
}

export function readAffiliateSource(storage: Pick<Storage, 'getItem'>, now: number): AttributedAffiliateSource | null {
  if (storage.getItem(AFFILIATE_MARKETING_CONSENT_KEY) !== 'accepted') return null
  try {
    const stored = storage.getItem(AFFILIATE_SOURCE_KEY)
    return stored ? validAffiliateSource(JSON.parse(stored), now) : null
  } catch {
    return null
  }
}

export function sourceFromSearch(search: string, now: number): AffiliateLinkSource | null {
  if (!Number.isSafeInteger(now) || now < 0 || !Number.isSafeInteger(now + AFFILIATE_WINDOW_MS)) return null
  const params = new URLSearchParams(search)
  const go = params.getAll('ref').filter(Boolean)
  const refersion = params.getAll('rfsn').filter(Boolean)
  if (!go.length && !refersion.length) return null
  if (go.length > 1 || refersion.length > 1 || (go.length && refersion.length)) {
    return { status: 'review', reason: 'multiple-providers', clickedAt: now, expiresAt: now + AFFILIATE_WINDOW_MS }
  }
  const provider = go.length ? 'goaffpro' : 'refersion'
  const code = (go[0] || refersion[0]).trim()
  if (!/^[A-Za-z0-9_.-]{1,180}$/.test(code)) {
    return { status: 'review', reason: 'invalid-source', clickedAt: now, expiresAt: now + AFFILIATE_WINDOW_MS }
  }
  return { status: 'attributed', provider, code, clickedAt: now, expiresAt: now + AFFILIATE_WINDOW_MS }
}

// Never writes tracking data without a separate, explicit marketing choice.
export function updateAffiliateSource(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>, search: string, now: number): void {
  if (storage.getItem(AFFILIATE_MARKETING_CONSENT_KEY) !== 'accepted') {
    storage.removeItem(AFFILIATE_SOURCE_KEY)
    return
  }
  const source = sourceFromSearch(search, now)
  if (source) storage.setItem(AFFILIATE_SOURCE_KEY, JSON.stringify(source))
}
