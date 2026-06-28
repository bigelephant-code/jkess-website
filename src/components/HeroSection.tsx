'use client'

import { ArrowRight } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

interface HeroData {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({ data }: { data?: HeroData }) {
  const { lang, t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          <span className="animate-gradient-text">{data?.title || t('hero.title.part1', 'Powering a')}</span>
          <br />
          <span className="animate-gradient-green">{t('hero.title.part2', 'Cleaner Future')}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {data?.subtitle ||
            t('hero.subtitle', 'JKBMS Electronic Technology Co.,Ltd — your trusted partner in energy storage solutions, from BMS to complete battery systems.')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={data?.ctaLink || '#products'}
            className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold text-black overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-300 to-green-600 animate-shimmer bg-[length:200%_100%]" />
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-300 to-emerald-600 opacity-0 group-hover:opacity-100 animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-200 group-hover:-translate-y-0.5">
              {data?.ctaText || t('hero.cta', 'Explore Products')}
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href={localizedPath(lang, '/about')}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full text-lg transition-all"
          >
            {t('hero.learnMore', 'Learn More')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-green-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
