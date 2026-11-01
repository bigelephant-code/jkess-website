'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { affiliateConsentCopy, affiliatePrivacyLabel, affiliateWithdrawalError } from '@/lib/affiliate-consent-copy'
import { AFFILIATE_CONSENT_EVENT, AFFILIATE_SETTINGS_EVENT, readAffiliateConsent, saveAffiliateConsent, type AffiliateConsentChoice } from '@/lib/affiliate-consent'
import { withdrawPendingAffiliates } from '@/lib/affiliate-withdrawal'
import { sourceFromSearch } from '@/lib/affiliate-link-source'
import { localizedPath } from '@/lib/lang'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(AFFILIATE_CONSENT_EVENT, callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(AFFILIATE_CONSENT_EVENT, callback) }
}

function readChoice() {
  try { return readAffiliateConsent(window.localStorage) } catch { return null }
}

function subscribeReady() { return () => undefined }

export function AffiliateSettingsButton() {
  const { lang } = useI18n()
  return <button type="button" onClick={() => window.dispatchEvent(new Event(AFFILIATE_SETTINGS_EVENT))} className="text-xs text-gray-500 transition-colors hover:text-green-400">{affiliateConsentCopy[lang][4]}</button>
}

export default function AffiliateConsent({ search }: { search: string }) {
  const { lang } = useI18n()
  const [settings, setSettings] = useState(false)
  const [error, setError] = useState(false)
  const [withdrawError, setWithdrawError] = useState(false)
  const [busy, setBusy] = useState(false)
  const ready = useSyncExternalStore(subscribeReady, () => true, () => false)
  const choice = useSyncExternalStore(subscribe, readChoice, () => null)
  const copy = affiliateConsentCopy[lang]

  useEffect(() => {
    const open = () => setSettings(true)
    window.addEventListener(AFFILIATE_SETTINGS_EVENT, open)
    return () => window.removeEventListener(AFFILIATE_SETTINGS_EVENT, open)
  }, [])

  useEffect(() => {
    const retry = () => {
      try {
        if (readAffiliateConsent(window.localStorage) === 'declined') void withdrawPendingAffiliates(window.localStorage).catch(() => undefined)
      } catch { /* Storage is unavailable. */ }
    }
    window.addEventListener('storage', retry)
    retry()
    return () => window.removeEventListener('storage', retry)
  }, [])

  const referred = Boolean(sourceFromSearch(search, 0))
  if (!ready || (!settings && !busy && !withdrawError && (choice !== null || !referred))) return null

  const save = async (next: AffiliateConsentChoice) => {
    try {
      saveAffiliateConsent(window.localStorage, next)
      window.dispatchEvent(new Event(AFFILIATE_CONSENT_EVENT))
      setError(false)
      if (next === 'declined') {
        setBusy(true)
        const completed = await withdrawPendingAffiliates(window.localStorage)
        setBusy(false)
        if (!completed) { setWithdrawError(true); return }
      }
      setWithdrawError(false)
      setSettings(false)
      if (next === 'declined') window.location.reload()
    } catch { setBusy(false); setError(true) }
  }

  return (
    <section role="region" aria-label={copy[0]} className="fixed inset-x-3 top-24 z-[2147483646] mx-auto max-h-[calc(100dvh-8rem)] max-w-xl overflow-y-auto rounded-lg border border-white/15 bg-gray-950 p-4 text-white shadow-2xl sm:p-5">
      <p className="text-sm font-bold">{copy[0]}</p>
      <p className="mt-2 text-sm leading-6 text-gray-300">{copy[1]}{' '}<Link href={localizedPath(lang, '/privacy-policy')} className="text-green-300 underline underline-offset-4">{affiliatePrivacyLabel[lang]}</Link></p>
      {error && <p role="alert" className="mt-2 text-sm text-red-300">{copy[5].split(/[.!。]/u)[0]}.</p>}
      {withdrawError && <p role="alert" className="mt-2 text-sm text-red-300">{affiliateWithdrawalError[lang]}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex">
        <button type="button" disabled={busy} onClick={() => void save('declined')} className="min-h-11 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 disabled:opacity-50">{copy[3]}</button>
        <button type="button" disabled={busy || withdrawError} onClick={() => void save('accepted')} className="min-h-11 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 disabled:opacity-50">{copy[2]}</button>
      </div>
    </section>
  )
}
