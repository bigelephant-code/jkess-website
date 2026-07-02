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
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY)
      return saved === 'accepted' || saved === 'declined' ? saved : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (choice === 'accepted') loadGoogleAnalytics(gaId)
  }, [choice, gaId])

  const saveChoice = (nextChoice: 'accepted' | 'declined') => {
    setChoice(nextChoice)
    try {
      window.localStorage.setItem(CONSENT_KEY, nextChoice)
    } catch {
      // Consent still applies for the current session even if persistence is blocked.
    }
    if (nextChoice === 'accepted') loadGoogleAnalytics(gaId)
  }

  if (choice || !gaId) return null

  return (
    <div className="pointer-events-auto fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-[2147483647] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur md:bottom-5 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
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
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => saveChoice('declined')}
            className="min-h-11 rounded-xl border border-white/15 px-4 py-2 text-xs font-bold text-gray-200 transition hover:bg-white/10 active:bg-white/15"
          >
            {t('cookies.decline', 'Decline')}
          </button>
          <button
            type="button"
            onClick={() => saveChoice('accepted')}
            className="min-h-11 rounded-xl bg-green-500 px-4 py-2 text-xs font-bold text-black transition hover:bg-green-400 active:bg-green-300"
          >
            {t('cookies.accept', 'Accept analytics')}
          </button>
        </div>
      </div>
    </div>
  )
}
