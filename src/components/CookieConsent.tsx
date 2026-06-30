'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

const CONSENT_KEY = 'jkess-cookie-consent'

function loadGoogleAnalytics(gaId: string) {
  if (!gaId || typeof window === 'undefined') return
  if (document.querySelector(`script[data-jkess-ga="${gaId}"]`)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  script.dataset.jkessGa = gaId
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', gaId, { anonymize_ip: true })
}

export default function CookieConsent({ gaId }: { gaId: string }) {
  const { lang, t } = useI18n()
  const [choice, setChoice] = useState<'accepted' | 'declined' | null>(() => {
    if (typeof window === 'undefined') return null
    const saved = window.localStorage.getItem(CONSENT_KEY)
    return saved === 'accepted' || saved === 'declined' ? saved : null
  })

  useEffect(() => {
    if (choice === 'accepted') loadGoogleAnalytics(gaId)
  }, [choice, gaId])

  const saveChoice = (nextChoice: 'accepted' | 'declined') => {
    window.localStorage.setItem(CONSENT_KEY, nextChoice)
    setChoice(nextChoice)
    if (nextChoice === 'accepted') loadGoogleAnalytics(gaId)
  }

  if (choice || !gaId) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gray-950/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur md:bottom-5 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold">
            {t('cookies.title', 'Cookie and analytics preferences')}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-300">
            {t(
              'cookies.body',
              'We use essential storage for the cart. Analytics cookies are loaded only if you accept them.'
            )}{' '}
            <Link href={localizedPath(lang, '/privacy-policy')} className="font-semibold text-green-300 underline underline-offset-4">
              {t('cookies.privacy', 'Privacy Policy')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => saveChoice('declined')}
            className="rounded-xl border border-white/15 px-4 py-2 text-xs font-bold text-gray-200 transition hover:bg-white/10"
          >
            {t('cookies.decline', 'Decline')}
          </button>
          <button
            type="button"
            onClick={() => saveChoice('accepted')}
            className="rounded-xl bg-green-500 px-4 py-2 text-xs font-bold text-black transition hover:bg-green-400"
          >
            {t('cookies.accept', 'Accept analytics')}
          </button>
        </div>
      </div>
    </div>
  )
}
