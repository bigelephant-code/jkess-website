'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

const footerGroups = [
  {
    title: 'Products',
    links: [
      ['Battery Enclosures', '/battery-enclosures'],
      ['6U Rack Enclosures', '/rack-battery-enclosures'],
      ['High Voltage BMS', '/high-voltage-bms'],
      ['Commercial ESS', '/commercial-energy-storage'],
    ],
  },
  {
    title: 'Solutions & Guides',
    links: [
      ['Commercial Peak Shaving', '/solutions/commercial-peak-shaving'],
      ['Air vs Liquid Cooling', '/guides/air-cooled-vs-liquid-cooled-ess'],
      ['BCU vs BMU', '/guides/bcu-vs-bmu'],
      ['CAN vs RS485', '/guides/can-vs-rs485-battery-communication'],
    ],
  },
  {
    title: 'Company & Support',
    links: [
      ['Quality & Manufacturing', '/quality-and-manufacturing'],
      ['Shipping Quote', '/shipping-quote'],
      ['Technical Downloads', '/downloads'],
      ['Contact JKESS', '/contact'],
    ],
  },
] as const

const policyLinks = [
  ['Shipping', '/shipping-policy'],
  ['Returns', '/returns-refunds'],
  ['Warranty', '/warranty'],
  ['Terms', '/terms-of-sale'],
  ['Safety', '/safety'],
  ['Privacy', '/privacy-policy'],
] as const

export default function Footer() {
  const { lang, t } = useI18n()

  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-3">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-400">{group.title}</p>
              <div className="mt-4 grid gap-2">
                {group.links.map(([label, path]) => (
                  <Link key={path} href={localizedPath(lang, path)} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <nav aria-label="Policies" className="my-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {policyLinks.map(([label, path]) => (
            <Link key={path} href={localizedPath(lang, path)} className="text-xs text-gray-500 transition-colors hover:text-green-400">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-center gap-x-6 gap-y-2 sm:flex-row">
          <p className="text-center text-sm text-gray-400">
            {t('footer.copyright', '© {year} JKBMS Electronic Technology Co.,Ltd. All rights reserved.').replace('{year}', String(new Date().getFullYear()))}
          </p>
          <p className="whitespace-nowrap text-sm text-gray-400">
            {t('footer.tagline', 'Powering a Cleaner Future')}
          </p>
        </div>
      </div>
    </footer>
  )
}
