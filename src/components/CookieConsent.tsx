'use client'

import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

const CONSENT_KEY = 'jkess-cookie-consent'
type ConsentChoice = 'accepted' | 'declined'

function isConsentChoice(value: string | null): value is ConsentChoice {
  return value === 'accepted' || value === 'declined'
}

function readStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null

  try {
    const saved = window.localStorage.getItem(CONSENT_KEY)
    if (isConsentChoice(saved)) return saved
  } catch {
    // Continue to cookie fallback.
  }

  const cookieValue = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${CONSENT_KEY}=`))
    ?.split('=')
    .slice(1)
    .join('=')

  return isConsentChoice(cookieValue || null) ? cookieValue as ConsentChoice : null
}

function persistConsent(nextChoice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, nextChoice)
  } catch {
    // Some mobile privacy modes can block localStorage.
  }

  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${CONSENT_KEY}=${nextChoice}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
  } catch {
    // Cookie persistence is best effort; the UI still dismisses for this session.
  }
}

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
  const bannerRef = useRef<HTMLDivElement>(null)
  const [dismissed, setDismissed] = useState(false)
  const [choice, setChoice] = useState<ConsentChoice | null>(() => readStoredConsent())

  useEffect(() => {
    if (choice === 'accepted') loadGoogleAnalytics(gaId)
  }, [choice, gaId])

  const saveChoice = (nextChoice: ConsentChoice, event?: SyntheticEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    bannerRef.current?.setAttribute('hidden', 'true')
    bannerRef.current?.style.setProperty('display', 'none', 'important')
    setDismissed(true)
    setChoice(nextChoice)
    persistConsent(nextChoice)
    if (nextChoice === 'accepted') {
      try {
        loadGoogleAnalytics(gaId)
      } catch {
        // Consent dismissal must not depend on analytics script loading.
      }
    }
  }

  if (dismissed || choice || !gaId) return null

  return (
    <div ref={bannerRef} className="pointer-events-auto fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-[2147483647] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur md:bottom-5 md:p-5">
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
            onClick={(event) => saveChoice('declined', event)}
            onPointerUp={(event) => saveChoice('declined', event)}
            onTouchEnd={(event) => saveChoice('declined', event)}
            className="min-h-11 rounded-xl border border-white/15 px-4 py-2 text-xs font-bold text-gray-200 transition hover:bg-white/10 active:bg-white/15"
          >
            {t('cookies.decline', 'Decline')}
          </button>
          <button
            type="button"
            onClick={(event) => saveChoice('accepted', event)}
            onPointerUp={(event) => saveChoice('accepted', event)}
            onTouchEnd={(event) => saveChoice('accepted', event)}
            className="min-h-11 rounded-xl bg-green-500 px-4 py-2 text-xs font-bold text-black transition hover:bg-green-400 active:bg-green-300"
          >
            {t('cookies.accept', 'Accept analytics')}
          </button>
        </div>
      </div>
    </div>
  )
}
