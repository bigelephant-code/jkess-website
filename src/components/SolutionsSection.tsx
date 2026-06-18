'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslate } from '@/i18n/client'

const scenarios = [
  {
    id: 'residential',
    title: 'Home Battery Storage Solution',
    desc: 'Complete residential energy storage system built with JKESS core components: Intelligent BMS protection boards with active balancing (2A~15A, 4S~32S), modular battery kits (15KWh/16KWh compatible) on heavy-duty casters, and optional HV kit for high-voltage applications. Supports rack-mount 6U or freestanding installation with LCD display, CAN/RS485 communication, and seamless solar integration for energy independence and bill savings.',
    image: '/images/scenario-2.jpg',
  },
  {
    id: 'ci-storage',
    title: 'C&I Energy Storage Solution',
    desc: 'Professional-grade commercial and industrial energy storage system ranging from 64KWh to 265KWh, built with JKESS core technology. Supports flexible split stacked configuration for modular expansion or integrated cabinet solution for space-saving deployment. Available with both air cooling and liquid cooling thermal management systems to match any operating environment. Equipped with intelligent JKESS BMS for active balancing, real-time monitoring via CAN/RS485, and seamless solar + grid integration. Ideal for factories, office buildings, EV charging stations, and commercial facilities seeking energy cost reduction, peak shaving, and backup power reliability.',
    image: '/images/scenario-1.png',
  },
  {
    id: 'special-vehicle',
    title: 'Special Vehicle Energy Solutions',
    desc: 'Custom energy storage and power supply solutions for electric vehicles, RVs, emergency vehicles, and mobile workstations. Reliable power on the move for any application.',
    image: '/images/scenario-3.png',
  },
  {
    id: 'special-equipment',
    title: 'Special Equipment Power Solutions',
    desc: 'Tailored energy storage solutions for specialized industrial equipment, medical devices, telecom base stations, and critical infrastructure requiring stable, uninterrupted power supply.',
    image: '/images/scenario-4.png',
  },
  {
    id: 'ground-station',
    title: 'Ground Power Station',
    desc: 'Large-scale ground-mounted solar and energy storage stations for utility-level power generation. Covers plain, mountain, hill, desert and water surface applications with stable and efficient operation under extreme environmental conditions.',
    image: '',
  },
]

const CIRCUMFERENCE = 2 * Math.PI * 28

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startled, setStartled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef(0)
  const startTimeRef = useRef(Date.now())

  const switchTab = useCallback((newIdx: number) => {
    const oldIdx = activeTabRef.current
    if (oldIdx === newIdx) return
    activeTabRef.current = newIdx
    setActiveTab(newIdx)

    // All circles do a startled bounce like little creatures
    setStartled(true)
    setTimeout(() => setStartled(false), 600)
  }, [])

  const activeTabRef = useRef(activeTab)
  activeTabRef.current = activeTab

  // Auto-rotation every 3 seconds
  useEffect(() => {
    startTimeRef.current = Date.now()
    progressRef.current = 0
    setProgress(0)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / 3000) * 100, 100)
      progressRef.current = newProgress
      setProgress(newProgress)

      if (newProgress >= 100) {
        const next = (activeTabRef.current + 1) % scenarios.length
        switchTab(next)
        startTimeRef.current = Date.now()
        progressRef.current = 0
        setProgress(0)
      }
    }, 30)

    timerRef.current = interval
    return () => clearInterval(interval)
  }, [switchTab])

  // Reset timer when tab is manually clicked
  const handleTabClick = (idx: number) => {
    switchTab(idx)
    startTimeRef.current = Date.now()
    progressRef.current = 0
    setProgress(0)
  }

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

  return (
    <section className="relative py-20 md:py-28">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            {t('solutions.title', 'Solutions')} &amp;{' '}
            <span className="text-green-600">{t('solutions.scenarios', 'Scenarios')}</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            C&I Storage · Residential · Special Vehicles · Special Equipment
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
          {/* Left: living circle sprites */}
          <div className="w-full md:w-[100px] flex-shrink-0 flex flex-row md:flex-col items-center md:justify-between overflow-visible">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                className="relative w-[72px] h-[72px] flex items-center justify-center rounded-full group flex-shrink-0 transition-all duration-300"
              >
                {/* 🌬️ Breathing glow - each circle breathes gently */}
                <div
                  className={`absolute inset-0 rounded-full pointer-events-none z-0 ${
                    startled
                      ? 'animate-startled'
                      : i === activeTab
                        ? 'animate-heartbeat'
                        : 'animate-breathe'
                  }`}
                  style={{
                    background: i === activeTab
                      ? 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
                    animationDelay: startled || i === activeTab ? '0s' : `${i * 0.2}s`,
                  }}
                />

                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="transparent"
                    stroke={i === activeTab ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.06)'}
                    strokeWidth="5" />
                  {i === activeTab && (
                    <circle cx="32" cy="32" r="28" fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px', transition: 'stroke-dashoffset 0.03s linear' }}
                    />
                  )}
                </svg>

                {/* Ripple wave: green ring expands outward from new active circle */}
                {startled && i === activeTab && (
                  <div className="absolute inset-0 rounded-full border-green-400 animate-ripple-wave pointer-events-none z-15" />
                )}

                {/* Icons */}
                {(() => {
                  const iconMap = ['1','5','3','4','2']
                  return (
                    <div
                      className={`relative z-20 transition-all duration-500 bg-gray-600 ${
                        i === 4 ? 'w-9 h-9' : 'w-7 h-7'
                      } ${
                        i === activeTab
                          ? 'bg-green-500 scale-110'
                          : 'group-hover:bg-gray-500'
                      } ${
                        startled ? 'animate-startled' : ''
                      }`}
                      style={{
                        mask: `url(/images/goodwe-icon-${iconMap[i]}${iconMap[i] === '2' ? '.svg' : '.png'}) center/contain no-repeat`,
                        WebkitMask: `url(/images/goodwe-icon-${iconMap[i]}${iconMap[i] === '2' ? '.svg' : '.png'}) center/contain no-repeat`,
                      }}
                    />
                  )
                })()}
              </button>
            ))}
          </div>

          {/* Right: Content + Photo */}
          <div className="flex-1 min-w-0 grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                {scenarios[activeTab].title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {scenarios[activeTab].desc}
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="relative w-full aspect-[4/3] bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
                {scenarios[activeTab].image ? (
                  <img
                    src={scenarios[activeTab].image}
                    alt={scenarios[activeTab].title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏗️</div>
                    <p className="text-xs text-gray-400">Image coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
