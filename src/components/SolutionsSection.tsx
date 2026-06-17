'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslate } from '@/i18n/client'

const scenarios = [
  {
    id: 'ci-storage',
    title: 'Industrial & Commercial Power Station Solution',
    desc: 'Large rooftop solar + energy storage for factories, office buildings, government facilities, schools and hospitals. Reduces electricity costs, ensures uninterrupted power, and maximizes return on investment through peak shaving and smart energy management.',
    image: '/images/scenario-1.png',
  },
  {
    id: 'residential',
    title: 'Residential Energy Storage Solution',
    desc: 'Home solar + battery systems for energy independence. Store excess solar energy for nighttime use, reduce electricity bills, and keep critical appliances running during power outages. Available in 3-50kW capacities.',
    image: '/images/scenario-2.jpg',
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
]

const CIRCUMFERENCE = 2 * Math.PI * 28

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef(0)
  const startTimeRef = useRef(Date.now())

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
        setActiveTab((prev) => (prev + 1) % scenarios.length)
        startTimeRef.current = Date.now()
        progressRef.current = 0
        setProgress(0)
      }
    }, 30)

    timerRef.current = interval
    return () => clearInterval(interval)
  }, [])

  // Reset timer when tab is manually clicked
  const handleTabClick = (idx: number) => {
    setActiveTab(idx)
    startTimeRef.current = Date.now()
    progressRef.current = 0
    setProgress(0)
  }

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

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
            <span className="text-green-400">{t('solutions.scenarios', 'Scenarios')}</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            C&I Storage · Residential · Special Vehicles · Special Equipment
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Left: Vertical tab buttons with progress rings */}
          <div className="w-full md:w-[100px] flex-shrink-0 flex flex-row md:flex-col items-center gap-5">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                className="relative w-[72px] h-[72px] flex items-center justify-center rounded-full transition-all duration-300 group flex-shrink-0"
              >
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                  {/* Background circle */}
                  <circle cx="32" cy="32" r="28" fill="transparent"
                    stroke={i === activeTab ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)'}
                    strokeWidth="5" />
                  {/* Progress circle */}
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

                {/* Icon inside circle */}
                <img src="/images/goodwe-icon-${i + 1}.png"
                  alt={s.title}
                  className={`relative z-10 w-6 h-6 transition-all duration-300 brightness-0 invert ${
                    i === activeTab ? 'opacity-100 scale-110 drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]' : 'opacity-60 group-hover:opacity-90'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Content + Photo */}
          <div className="flex-1 min-w-0 grid md:grid-cols-5 gap-8 items-center">
            {/* Text content */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg md:text-2xl font-bold text-white">
                {scenarios[activeTab].title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {scenarios[activeTab].desc}
              </p>
            </div>

            {/* Photo */}
            <div className="md:col-span-3">
              <div className="relative w-full aspect-[4/3] bg-gray-800/40 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                <img
                  src={scenarios[activeTab].image}
                  alt={scenarios[activeTab].title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
