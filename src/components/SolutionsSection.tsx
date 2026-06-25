'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

const scenarios = [
  { id: 'residential',      image: '/images/scenario-2.webp' },
  { id: 'ci-storage',       image: '/images/scenario-3.webp' },
  { id: 'solar-pv',         image: '/images/scenario-1.webp' },
  { id: 'outdoor-emergency', image: '/images/scenario-4.webp' },
  { id: 'low-speed-vehicle', image: '/images/scenario-5.webp' },
]

const CIRCUMFERENCE = 2 * Math.PI * 28

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startled, setStartled] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const activeTabRef = useRef(0)

  const switchTab = useCallback((newIdx: number) => {
    const oldIdx = activeTabRef.current
    if (oldIdx === newIdx) return
    activeTabRef.current = newIdx
    setActiveTab(newIdx)

    setStartled(true)
    setTimeout(() => setStartled(false), 600)
  }, [])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setProgress((current) => {
        const nextProgress = Math.min(current + 1, 100)
        if (nextProgress >= 100) {
          switchTab((activeTabRef.current + 1) % scenarios.length)
          return 0
        }
        return nextProgress
      })
    }, 30)

    return () => clearInterval(interval)
  }, [autoPlay, switchTab])

  // Preload scenario images for smooth switching
  useEffect(() => {
    scenarios.forEach((s) => {
      if (s.image) {
        const img = new window.Image()
        img.src = s.image
      }
    })
  }, [])

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(false)
    setProgress(0)
  }, [])

  const handleTabClick = (idx: number) => {
    stopAutoPlay()
    switchTab(idx)
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
            {t('scenarios.subtitle', 'C&I Storage · Residential · Solar PV · Outdoor & Emergency · Low-Speed Vehicle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
          {/* Left: living circle sprites */}
          <div className="w-full md:w-[100px] flex-shrink-0 flex flex-row md:flex-col items-center md:justify-between overflow-visible">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                onFocus={stopAutoPlay}
                onPointerEnter={stopAutoPlay}
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
              <div key={activeTab} className="animate-content-fade">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                  {t(`scenarios.${scenarios[activeTab].id}.title`, scenarios[activeTab].id)}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-4">
                  {t(`scenarios.${scenarios[activeTab].id}.desc`, scenarios[activeTab].id)}
                </p>
              </div>
            </div>

            <div className="md:col-span-3">
              <div key={activeTab} className="relative w-full aspect-[4/3] overflow-hidden rounded-xl flex items-center justify-center animate-content-fade">
                {scenarios[activeTab].image ? (
                  <Image
                    src={scenarios[activeTab].image}
                    alt={t(`scenarios.${scenarios[activeTab].id}.title`, scenarios[activeTab].id)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
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
