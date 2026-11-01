import { AFFILIATE_MARKETING_CONSENT_KEY, AFFILIATE_SOURCE_KEY } from './affiliate-link-source'

export const AFFILIATE_CONSENT_EVENT = 'jkess-affiliate-consent-change'
export const AFFILIATE_SETTINGS_EVENT = 'jkess-affiliate-settings-open'
export type AffiliateConsentChoice = 'accepted' | 'declined'

export function readAffiliateConsent(storage: Pick<Storage, 'getItem'>): AffiliateConsentChoice | null {
  try {
    const value = storage.getItem(AFFILIATE_MARKETING_CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch { return null }
}

/** Do not start tracking if the explicit choice could not be saved. */
export function saveAffiliateConsent(storage: Storage, choice: AffiliateConsentChoice) {
  if (choice === 'declined') {
    storage.removeItem(AFFILIATE_MARKETING_CONSENT_KEY)
    storage.removeItem(AFFILIATE_SOURCE_KEY)
    const keys: string[] = []
    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index)
      if (key?.startsWith('rfsn_v4_')) keys.push(key)
    }
    for (const key of keys) storage.removeItem(key)
  }
  storage.setItem(AFFILIATE_MARKETING_CONSENT_KEY, choice)
  if (readAffiliateConsent(storage) !== choice) throw new Error('Unable to save affiliate choice')
}
