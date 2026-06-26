'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

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
    <footer className="border-t border-white/5 bg-black py-6">
      <div className="mx-auto max-w-7xl px-6">
        <nav aria-label="Policies" className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {policyLinks.map(([label, path]) => (
            <Link
              key={path}
              href={localizedPath(lang, path)}
              className="text-xs text-gray-500 transition-colors hover:text-green-400"
            >
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
