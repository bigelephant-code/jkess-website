'use client'

import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

const brandLogos = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/brands-processed/brand-${i + 1}.png`,
}))

export default function BrandLogos() {
  const t = useTranslate()
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="space-y-0">
        <div className="relative">
          <div className="relative overflow-hidden py-4">
            <div className="flex gap-16 animate-scroll-left">
              {[...brandLogos, ...brandLogos].map((logo, i) => (
                <div
                  key={`row1-${i}`}
                  className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={`Partner ${(i % 15) + 1}`}
                      fill
                      className="object-contain"
                      sizes="144px"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="flex gap-16 animate-scroll-right">
              {[...brandLogos, ...brandLogos].map((logo, i) => (
                <div
                  key={`row2-${i}`}
                  className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={`Partner ${(i % 15) + 1}`}
                      fill
                      className="object-contain"
                      sizes="144px"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, white 35%, white 65%, transparent 100%)',
              }}
            />
            <div className="relative z-10 text-center px-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('brands.title')}
                <br />
                <span className="text-green-600">{t('brands.matching')}</span>
              </h2>
              <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
                {t('brands.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
