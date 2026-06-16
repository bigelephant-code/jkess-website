'use client'

import { useI18n } from '@/i18n/client'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-black border-t border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
          <p className="text-sm text-gray-400 text-center">
            {t('footer.copyright', '© {year} JKBMS Electronic Technology Co.,Ltd. All rights reserved.').replace('{year}', String(new Date().getFullYear()))}
          </p>
          <p className="text-sm text-gray-400 whitespace-nowrap">
            {t('footer.tagline', 'Powering a Cleaner Future')}
          </p>
        </div>
      </div>
    </footer>
  )
}
