'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { AFFILIATE_MARKETING_CONSENT_KEY, updateAffiliateSource } from '@/lib/affiliate-link-source'
import { startRefersionClick } from '@/lib/refersion-browser'
import AffiliateConsent from '@/components/AffiliateConsent'

export default function AffiliateLinkTracker({ refersionPublicKey }: { refersionPublicKey: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    const capture = () => {
      try {
        updateAffiliateSource(window.localStorage, window.location.search, Date.now())
        void startRefersionClick(refersionPublicKey).catch(() => undefined)
      } catch {
        // Optional attribution must not interfere with browsing or checkout.
      }
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== AFFILIATE_MARKETING_CONSENT_KEY) return
      if (event.oldValue === 'accepted' && event.newValue !== 'accepted') window.location.reload()
      else capture()
    }
    capture()
    window.addEventListener('jkess-affiliate-consent-change', capture)
    window.addEventListener('storage', onStorage)
    return () => { window.removeEventListener('jkess-affiliate-consent-change', capture); window.removeEventListener('storage', onStorage) }
  }, [pathname, search, refersionPublicKey])

  return <AffiliateConsent search={search} />
}
