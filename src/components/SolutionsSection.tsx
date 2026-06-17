'use client'

import { useTranslate } from '@/i18n/client'

const solutions = [
  {
    title: 'Solar and Wind Farm',
    desc: 'Large-scale renewable energy generation stations combining solar PV and wind turbines for utility-grade power supply.',
    icon: '🌬️',
    tag: 'Utility',
  },
  {
    title: 'Farm & Island',
    desc: 'Off-grid and hybrid energy solutions for remote farms and islands, providing reliable 24/7 power independence.',
    icon: '🏝️',
    tag: 'Off-grid',
  },
  {
    title: 'Business District & Community',
    desc: 'Commercial and community energy storage for peak shaving, load balancing, and emergency backup power.',
    icon: '🏢',
    tag: 'Commercial',
  },
  {
    title: 'Industrial Park & Factory',
    desc: 'High-capacity energy storage for industrial parks, factories, and manufacturing facilities to reduce demand charges.',
    icon: '🏭',
    tag: 'Industrial',
  },
  {
    title: 'Residential Rooftop Solar',
    desc: 'Home solar + battery solutions for energy independence, lower electricity bills, and backup power during outages.',
    icon: '🏠',
    tag: 'Residential',
  },
  {
    title: 'EV Charging Station',
    desc: 'Integrated PV-storage-charging solutions for EV charging hubs, enabling green mobility with lower operating costs.',
    icon: '🚗',
    tag: 'Charging',
  },
]

export default function SolutionsSection() {
  const t = useTranslate()

  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #22c55e 0%, transparent 50%), radial-gradient(circle at 70% 60%, #3b82f6 0%, transparent 50%)'
      }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t('solutions.title', 'Solutions')} &amp;{' '}
            <span className="text-green-400">{t('solutions.app', 'Applications')}</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base max-w-2xl mx-auto">
            Comprehensive energy storage solutions covering residential, commercial, industrial and utility-scale applications
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-green-500/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-xl mb-4 group-hover:bg-green-500/20 transition-colors">
                {sol.icon}
              </div>

              {/* Tag */}
              <span className="inline-block text-[10px] uppercase tracking-widest text-green-400/70 font-semibold mb-1.5">
                {sol.tag}
              </span>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                {sol.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {sol.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
