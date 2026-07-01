'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Copy, Globe2, MessageCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { trackEvent } from '@/lib/analytics'
import { getDealerRecruitmentCopy } from '@/lib/localized-ui'

const partnerEmail = 'zhou@jkess.com'
const partnerSignalIcons = [Globe2, PackageCheck, Truck, ShieldCheck]

export default function GlobalDealerRecruitment() {
  const { lang } = useI18n()
  const shouldReduceMotion = useReducedMotion()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const contactHref = localizedPath(lang, '/contact')
  const copy = getDealerRecruitmentCopy(lang)
  const emailHref = `mailto:${partnerEmail}?subject=${encodeURIComponent(copy.emailSubject)}`

  const copyEmail = async () => {
    await navigator.clipboard.writeText(partnerEmail)
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 1800)
    trackEvent('dealer_email_copy', { context: 'about_dealer_section' })
  }

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              {copy.desc}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={emailHref}
                onClick={() => trackEvent('dealer_application_click', { channel: 'email' })}
                className="inline-flex items-center justify-center gap-2 bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                {copy.apply} <ArrowRight size={17} />
              </a>
              <a
                href="https://wa.me/8613162828868"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('dealer_application_click', { channel: 'whatsapp' })}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:border-green-500 hover:text-green-700"
              >
                <MessageCircle size={17} /> {copy.whatsapp}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{partnerEmail}</span>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 font-semibold text-gray-800 transition hover:text-green-700"
                aria-label={copy.copyEmailAria}
              >
                <Copy size={15} />
                {copiedEmail
                  ? copy.copiedEmail
                  : copy.copyEmail}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative"
          >
            <div className="border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4 md:px-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {copy.fitLabel}
                </p>
              </div>
              <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
                {copy.profiles.map((profile) => (
                  <div key={profile} className="flex min-h-[92px] items-center gap-3 bg-white px-5 py-5">
                    <BadgeCheck size={19} className="shrink-0 text-green-600" />
                    <span className="text-sm font-semibold leading-6 text-gray-800">{profile}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
                {copy.signals.map(({ label, value }, index) => {
                  const Icon = partnerSignalIcons[index] || ShieldCheck
                  return (
                  <div key={label} className="bg-[#fbfcfb] px-5 py-5">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-green-600" />
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{label}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-700">{value}</p>
                  </div>
                  )
                })}
              </div>
            </div>
            <Link
              href={contactHref}
              onClick={() => trackEvent('dealer_contact_page_click', { context: 'about_dealer_section' })}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-green-800 transition hover:border-green-500 hover:bg-green-100"
            >
              {copy.contactPage} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
