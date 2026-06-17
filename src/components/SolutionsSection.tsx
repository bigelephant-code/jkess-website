'use client'

import { useState } from 'react'
import { useTranslate } from '@/i18n/client'

interface TabItem {
  id: string
  title: string
  desc: string
}

const icons = ['🏠', '🏭', '☀️', '🔋', '🏗️']

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)

  const tabs: TabItem[] = [
    {
      id: 'residential',
      title: t('solutions.residential', 'Residential Solar Station'),
      desc: t('solutions.residentialDesc', 'Residential solar solutions mainly target house rooftops including rural houses, villas, sunrooms and communities. Common installed capacity ranges from 3~50kW, connected to the public grid at 220/380V.'),
    },
    {
      id: 'c-i',
      title: t('solutions.ci', 'C&I Power Station'),
      desc: t('solutions.ciDesc', 'C&I rooftops include factory roofs, supermarkets, office buildings, government facilities, schools and hospitals. Large rooftop area means greater power generation and faster returns while enterprises use green electricity for energy saving and emission reduction.'),
    },
    {
      id: 'ground',
      title: t('solutions.ground', 'Ground Power Station'),
      desc: t('solutions.groundDesc', 'Ground stations cover plain, mountain, hill, fishery-solar, desert treatment, soil restoration and water surface applications with capacity typically above 20MW. GoodWe equipment operates stably under extreme conditions.'),
    },
    {
      id: 'energy-storage',
      title: t('solutions.storage', 'Energy Storage Solution'),
      desc: t('solutions.storageDesc', 'Our energy storage solutions include inverter+battery complete systems with multiple product options suitable for new PV + storage stations, existing grid-tied system retrofits, or off-grid areas.'),
    },
    {
      id: 'pvbm',
      title: t('solutions.pvbm', 'PV Building Materials'),
      desc: t('solutions.pvbmDesc', 'Our PV building materials division is committed to providing integrated building solutions through PV building materials and their applications, making every building a solar building.'),
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
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 78 78">
                    <circle cx="39" cy="39" r="35" fill="transparent"
                      stroke={activeTab === i ? '#22c55e' : 'rgba(255,255,255,0.1)'}
                      strokeWidth="3" />
                  </svg>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${
                    activeTab === i ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
                  }`}>
                    {icons[i]}
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

          {/* Right: Content + CSS animated visual */}
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

              {/* CSS Animated Visual */}
              <div className="md:col-span-3">
                <div className="relative w-full aspect-[4/3] bg-gray-800/40 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(0deg, transparent 49px, white 50px), linear-gradient(90deg, transparent 49px, white 50px)', backgroundSize: '50px 50px' }}
                  />
                  {/* Animated SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="glow"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>

                    {/* Solar panels */}
                    <g transform="translate(60,70)">
                      <rect x="0" y="0" width="50" height="28" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1" opacity="0.6"/>
                      <line x1="12" y1="0" x2="12" y2="28" stroke="#22c55e" strokeWidth="0.3" opacity="0.4"/>
                      <line x1="25" y1="0" x2="25" y2="28" stroke="#22c55e" strokeWidth="0.3" opacity="0.4"/>
                      <line x1="38" y1="0" x2="38" y2="28" stroke="#22c55e" strokeWidth="0.3" opacity="0.4"/>
                      <text x="25" y="38" textAnchor="middle" fill="#22c55e" fontSize="7" opacity="0.6">Solar PV</text>
                    </g>

                    {/* Factory */}
                    <g transform="translate(220,50)">
                      <rect x="0" y="20" width="70" height="60" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/>
                      <rect x="8" y="30" width="12" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="25" y="30" width="12" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="45" y="28" width="18" height="20" rx="1" fill="#22c55e" opacity="0.08"/>
                      <rect x="45" y="0" width="7" height="22" rx="1" fill="#1a1a2e" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5"/>
                    </g>

                    {/* Office */}
                    <g transform="translate(350,50)">
                      <rect x="0" y="15" width="50" height="65" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/>
                      <rect x="5" y="22" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="20" y="22" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="35" y="22" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="5" y="40" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="20" y="40" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                      <rect x="35" y="40" width="10" height="12" rx="1" fill="#22c55e" opacity="0.12"/>
                    </g>

                    {/* Wind turbine */}
                    <g transform="translate(140,40)">
                      <line x1="10" y1="0" x2="10" y2="50" stroke="rgba(34,197,94,0.3)" strokeWidth="0.8"/>
                      <g className="animate-spin" style={{ transformOrigin: '10px 10px', animation: 'spin 4s linear infinite' }}>
                        <line x1="10" y1="10" x2="0" y2="0" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5"/>
                        <line x1="10" y1="10" x2="20" y2="0" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5"/>
                        <line x1="10" y1="10" x2="10" y2="22" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5"/>
                      </g>
                      <text x="10" y="62" textAnchor="middle" fill="#22c55e" fontSize="7" opacity="0.6">Wind</text>
                    </g>

                    {/* Central JKESS Hub */}
                    <g transform="translate(250,150)">
                      <rect x="-12" y="-12" width="64" height="60" rx="6" fill="#0d2b1a" stroke="#22c55e" strokeWidth="2" filter="url(#glow)"/>
                      <text x="20" y="20" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">JKESS</text>
                      <text x="20" y="35" textAnchor="middle" fill="#22c55e" fontSize="8" opacity="0.8">Energy Hub</text>
                      <rect x="5" y="-5" width="6" height="5" rx="1" fill="#22c55e" opacity="0.5"/>
                      <rect x="15" y="-5" width="6" height="5" rx="1" fill="#22c55e" opacity="0.5"/>
                      <rect x="25" y="-5" width="6" height="5" rx="1" fill="#22c55e" opacity="0.5"/>
                    </g>

                    {/* Home (small) */}
                    <g transform="translate(370,140)">
                      <rect x="0" y="10" width="25" height="20" rx="1" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/>
                      <polygon points="0,10 12.5,0 25,10" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/>
                      <text x="12" y="42" textAnchor="middle" fill="#22c55e" fontSize="6" opacity="0.5">Home</text>
                    </g>

                    {/* EV charging */}
                    <g transform="translate(320,220)">
                      <rect x="0" y="0" width="18" height="14" rx="1" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/>
                      <text x="9" y="24" textAnchor="middle" fill="#22c55e" fontSize="6" opacity="0.5">EV</text>
                    </g>

                    {/* Grid */}
                    <g transform="translate(140,120)">
                      <rect x="0" y="0" width="16" height="16" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/>
                      <text x="8" y="26" textAnchor="middle" fill="#22c55e" fontSize="6" opacity="0.5">Grid</text>
                    </g>

                    {/* Animated energy flow lines */}
                    {/* Solar → JKESS */}
                    <line x1="110" y1="84" x2="238" y2="156" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
                    <circle r="3" fill="#22c55e" filter="url(#glow)">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M110,84 L238,156"/>
                    </circle>

                    {/* Wind → JKESS */}
                    <line x1="150" y1="90" x2="238" y2="156" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
                    <circle r="2.5" fill="#22c55e" filter="url(#glow)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M150,90 L238,156"/>
                    </circle>

                    {/* Factory → JKESS */}
                    <line x1="255" y1="110" x2="256" y2="140" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
                    <circle r="2" fill="#22c55e" filter="url(#glow)">
                      <animateMotion dur="2.5s" repeatCount="indefinite" path="M255,110 L256,140"/>
                    </circle>

                    {/* JKESS → Office (blue) */}
                    <line x1="290" y1="160" x2="370" y2="100" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
                    <circle r="2.5" fill="#3b82f6" filter="url(#glow)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M290,160 L370,100"/>
                    </circle>

                    {/* JKESS → Home (blue) */}
                    <line x1="290" y1="165" x2="370" y2="155" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="4,3"/>
                    <circle r="2" fill="#3b82f6" filter="url(#glow)">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M290,165 L370,155"/>
                    </circle>

                    {/* JKESS → EV (blue) */}
                    <line x1="280" y1="190" x2="320" y2="225" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="4,3"/>
                    <circle r="2" fill="#3b82f6" filter="url(#glow)">
                      <animateMotion dur="4.5s" repeatCount="indefinite" path="M280,190 L320,225"/>
                    </circle>

                    {/* Grid → Factory */}
                    <line x1="148" y1="128" x2="255" y2="110" stroke="#22c55e" strokeWidth="0.8" opacity="0.3"/>
                    <circle r="1.5" fill="#22c55e" opacity="0.5">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M148,128 L255,110"/>
                    </circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
