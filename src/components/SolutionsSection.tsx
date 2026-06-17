'use client'

import { useState } from 'react'
import { useTranslate } from '@/i18n/client'

interface TabItem {
  id: string
  title: string
  desc: string
  video: string
}

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)

  const tabs: TabItem[] = [

    {
      id: 'residential',
      title: t('solutions.residential', 'Residential Solar Station'),
      desc: t('solutions.residentialDesc', 'Residential solar solutions mainly target house rooftops including rural houses, villas, sunrooms and communities. Common installed capacity ranges from 3~50kW, connected to the public grid at 220/380V.'),
      video: '/videos/ci-solution.mp4',
    },
    {
      id: 'c-i',
      title: t('solutions.ci', 'C&I Power Station'),
      desc: t('solutions.ciDesc', 'C&I rooftops include factory roofs, supermarkets, office buildings, government facilities, schools and hospitals. Large rooftop area means greater power generation and faster returns while enterprises use green electricity for energy saving and emission reduction.'),
      video: '/videos/ci-solution.mp4',
    },
    {
      id: 'ground',
      title: t('solutions.ground', 'Ground Power Station'),
      desc: t('solutions.groundDesc', 'Ground stations cover plain, mountain, hill, fishery-solar, desert treatment, soil restoration and water surface applications with capacity typically above 20MW. GoodWe equipment operates stably under extreme conditions.'),
      video: '/videos/ci-solution.mp4',
    },
    {
      id: 'energy-storage',
      title: t('solutions.storage', 'Energy Storage Solution'),
      desc: t('solutions.storageDesc', 'Our energy storage solutions include inverter+battery complete systems with multiple product options suitable for new PV + storage stations, existing grid-tied system retrofits, or off-grid areas.'),
      video: '/videos/ci-solution.mp4',
    },
    {
      id: 'pvbm',
      title: t('solutions.pvbm', 'PV Building Materials'),
      desc: t('solutions.pvbmDesc', 'Our PV building materials division is committed to providing integrated building solutions through PV building materials and their applications, making every building a solar building.'),
      video: '/videos/ci-solution.mp4',
    },
  ]

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
            <span className="text-green-400">{t('solutions.cases', 'Cases')}</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Tab navigation */}
          <div className="w-full md:w-[280px] flex-shrink-0 space-y-3">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-green-500/10 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'bg-transparent border border-transparent hover:bg-white/5'
                }`}
              >
                <div className="relative w-[78px] h-[78px] flex-shrink-0 flex items-center justify-center">
                  {/* SVG circle progress */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 78 78">
                    <circle cx="39" cy="39" r="35" fill="transparent"
                      stroke={activeTab === i ? '#22c55e' : 'rgba(255,255,255,0.1)'}
                      strokeWidth="3" />
                    <circle cx="39" cy="39" r="35" fill="transparent"
                      stroke="#22c55e" strokeWidth="3"
                      strokeDasharray={activeTab === i ? '220' : '0'}
                      strokeDashoffset="0"
                      style={{ transition: 'stroke-dasharray 0.8s ease-out' }} />
                  </svg>
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${
                    activeTab === i ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
                  }`}>
                    {['🏠', '🏭', '☀️', '🔋', '🏗️'][i]}
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium leading-tight ${activeTab === i ? 'text-green-400' : 'text-gray-300'}`}>
                    {tab.title.split(' ').slice(0, -1).join(' ')}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {tab.title.split(' ').slice(-1).join(' ')}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Content area */}
          <div className="flex-1 min-w-0">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Text */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tabs[activeTab].desc}
                </p>
                <a href="/products" className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors group">
                  {t('solutions.more', 'More')}
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Video/animation area */}
              <div className="md:col-span-3">
                <div className="relative w-full aspect-[4/3] bg-gray-800/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                  <video
                    key={activeTab}
                    src={tabs[activeTab].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
