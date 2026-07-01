'use client'

import Link from 'next/link'
import { ArrowRight, BadgeCheck, Globe2, Handshake, MessageCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n, useTranslate } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { trackEvent } from '@/lib/analytics'

const partnerSignals = [
  { icon: Globe2, label: 'Open territories', value: 'Europe, Americas, Middle East, Asia-Pacific, Africa' },
  { icon: PackageCheck, label: 'Product lines', value: 'Battery kits, high-voltage BMS, C&I ESS cabinets' },
  { icon: Truck, label: 'Commercial support', value: 'Delivery review, documentation, volume quote support' },
  { icon: ShieldCheck, label: 'Technical support', value: 'Product training, compatibility review, project input checks' },
]

const partnerProfiles = [
  'Solar and energy storage distributors',
  'Battery system integrators',
  'EPC and C&I project developers',
  'Local service and installation partners',
]

export default function GlobalDealerRecruitment() {
  const t = useTranslate()
  const { lang } = useI18n()
  const shouldReduceMotion = useReducedMotion()
  const contactHref = localizedPath(lang, '/contact')
  const emailHref = 'mailto:zhou@jkess.com?subject=JKESS%20Global%20Distributor%20Application&body=Company%20name%3A%0ACountry%20%2F%20region%3A%0AWebsite%3A%0AMain%20business%3A%0AInterested%20product%20lines%3A%0AExpected%20annual%20volume%3A%0AMessage%3A'

  return (
    <section className="relative overflow-hidden bg-[#f5f7f4] py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 border border-green-600/20 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
              <Handshake size={15} />
              {t('dealerRecruitment.eyebrow', 'Global partner recruitment')}
            </div>
            <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {t('dealerRecruitment.title', 'JKESS is recruiting distributors and local partners worldwide')}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              {t(
                'dealerRecruitment.desc',
                'We are opening cooperation opportunities for companies that can develop local battery storage channels, support installers, and serve residential, commercial, and industrial ESS projects.'
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={emailHref}
                onClick={() => trackEvent('dealer_application_click', { channel: 'email' })}
                className="inline-flex items-center justify-center gap-2 bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                {t('dealerRecruitment.apply', 'Apply to become a distributor')} <ArrowRight size={17} />
              </a>
              <a
                href="https://wa.me/8613162828868"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('dealer_application_click', { channel: 'whatsapp' })}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:border-green-500 hover:text-green-700"
              >
                <MessageCircle size={17} /> {t('dealerRecruitment.whatsapp', 'Talk on WhatsApp')}
              </a>
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
                  {t('dealerRecruitment.fitLabel', 'Partner fit')}
                </p>
              </div>
              <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
                {partnerProfiles.map((profile) => (
                  <div key={profile} className="flex min-h-[92px] items-center gap-3 bg-white px-5 py-5">
                    <BadgeCheck size={19} className="shrink-0 text-green-600" />
                    <span className="text-sm font-semibold leading-6 text-gray-800">{profile}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
                {partnerSignals.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#fbfcfb] px-5 py-5">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-green-600" />
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{label}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={contactHref}
              onClick={() => trackEvent('dealer_contact_page_click', { context: 'home_dealer_section' })}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-green-800 transition hover:border-green-500 hover:bg-green-100"
            >
              {t('dealerRecruitment.contactPage', 'Send a partnership inquiry')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
