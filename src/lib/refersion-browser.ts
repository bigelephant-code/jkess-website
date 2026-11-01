'use client'

import { AFFILIATE_MARKETING_CONSENT_KEY, readAffiliateSource } from './affiliate-link-source'

type RefersionSdk = {
  pubKey: string
  launchDefault: () => Promise<unknown>
  sendCheckoutEvent: (cart: string, id: string, url: string, aid: string, cs: string) => Promise<unknown>
}

type TrackingWindow = Window & { r?: RefersionSdk; TrackingSystemObject?: string }
let loading: Promise<RefersionSdk> | null = null
let trackingReady: Promise<boolean> | null = null

function hasConsent() {
  try { return window.localStorage.getItem(AFFILIATE_MARKETING_CONSENT_KEY) === 'accepted' } catch { return false }
}

function loadSdk(publicKey: string) {
  if (!/^pub_[A-Za-z0-9]+$/.test(publicKey) || !hasConsent()) return Promise.reject(new Error('Tracking unavailable'))
  if (loading) return loading
  loading = new Promise<RefersionSdk>((resolve, reject) => {
    const target = window as TrackingWindow
    target.TrackingSystemObject = 'r'
    const script = document.createElement('script')
    script.src = 'https://cdn.refersion.com/refersion.js'
    script.async = true
    script.dataset.jkessRefersion = 'true'
    script.onload = () => {
      if (!hasConsent() || !target.r) return reject(new Error('Tracking unavailable'))
      target.r.pubKey = publicKey
      resolve(target.r)
    }
    script.onerror = () => reject(new Error('Tracking unavailable'))
    document.head.appendChild(script)
  }).catch((error) => { loading = null; throw error })
  return loading
}

/** Call only after a separate, explicit affiliate-marketing consent. */
export async function startRefersionClick(publicKey: string) {
  const source = readAffiliateSource(window.localStorage, Date.now())
  if (!hasConsent() || source?.provider !== 'refersion') {
    trackingReady = null
    return false
  }
  const previous = trackingReady
  const pending = (async () => {
    if (previous) await previous.catch(() => false)
    const sdk = await loadSdk(publicKey)
    if (!hasConsent() || readAffiliateSource(window.localStorage, Date.now())?.provider !== 'refersion') return false
    // Keep attribution on this storefront origin; do not initialize cross-domain storage.
    await sdk.launchDefault()
    return true
  })()
  trackingReady = pending
  return pending
}

export async function sendRefersionCheckout(cartId: string) {
  if (!/^[a-f0-9]{64}$/.test(cartId) || !hasConsent() || !loading || !trackingReady) return false
  const source = readAffiliateSource(window.localStorage, Date.now())
  if (source?.provider !== 'refersion') return false
  if (!await trackingReady) return false
  const sdk = await loading
  if (!hasConsent()) return false
  const id = window.localStorage.getItem('rfsn_v4_id')
  const aid = window.localStorage.getItem('rfsn_v4_aid')
  const cs = window.localStorage.getItem('rfsn_v4_cs')
  if (!id || !aid || !cs) return false
  await sdk.sendCheckoutEvent(cartId, id, window.location.origin + window.location.pathname, aid, cs)
  return true
}
