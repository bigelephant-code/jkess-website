'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslate } from '@/i18n/client'

const scenarios = [
  {
    id: 'residential',
    title: 'Home Battery Storage Solution',
    desc: 'Complete residential energy storage solution powered by JKESS core components — your one-stop system for true home energy independence. At its heart, JKESS intelligent BMS protection boards deliver active balancing from 2A to 15A across 4S to 32S configurations, ensuring every cell operates at peak performance and safety. Paired with our modular battery kits (compatible with both 15KWh and 16KWh LFP cells) mounted on heavy-duty caster wheels for effortless placement, plus an optional high-voltage kit for advanced applications requiring higher voltage stacks. Installation options include 6U rack-mount for tidy cabinet integration or freestanding setup with built-in LCD display for real-time system status. Communication via CAN bus and RS485 enables seamless integration with solar inverters, grid systems, and remote monitoring platforms. Designed for European homes seeking energy independence, the JKESS system stores excess solar energy for nighttime use, reduces grid dependency, lowers electricity bills, and keeps critical appliances running during power outages with automatic backup switching.',
    image: '/images/scenario-2.jpg',
  },
  {
    id: 'ci-storage',
    title: 'C&I Energy Storage Solution',
    desc: 'Professional-grade commercial and industrial energy storage system built with JKESS core technology, covering a flexible capacity range from 64KWh to 265KWh to suit projects of any scale. Supports two deployment modes: split stacked configuration for modular expansion as energy needs grow, and integrated cabinet solution for space-efficient all-in-one installation. Thermal management is fully covered with both air cooling and liquid cooling options — air cooling for cost-effective standard operation, liquid cooling for high-density environments requiring consistent temperature control and extended cycle life. At the system\'s core, JKESS intelligent BMS delivers active balancing across all cells with real-time voltage and temperature monitoring, ensuring safety, efficiency, and long battery lifespan. Communication via CAN bus and RS485 enables seamless integration with solar PV systems, grid infrastructure, diesel generators, and remote cloud monitoring platforms. Ideal for factories, office buildings, EV charging stations, supermarkets, hospitals, and commercial parks looking to reduce peak electricity costs, participate in demand response programs, ensure uninterruptible power supply, and maximize return on investment through intelligent energy management.',
    image: '/images/scenario-3.png',
  },
  {
    id: 'solar-pv',
    title: 'Solar PV & Energy Storage Solution',
    desc: 'Comprehensive solar photovoltaic power station solution — whether it\'s a residential rooftop PV system or a large-scale ground-mounted solar farm, JKESS has the right energy storage products to achieve perfect matching. For residential solar installations, JKESS battery kits (15KWh/16KWh compatible) paired with intelligent BMS protection boards and the optional HV kit create a seamless home energy storage system that stores daytime solar energy for nighttime use, maximizing self-consumption and energy independence. For commercial and utility-scale solar PV stations, JKESS offers scalable C&I energy storage solutions ranging from 64KWh to 265KWh with flexible split stacked or integrated cabinet configurations, supporting both air cooling and liquid cooling thermal management to suit any climate conditions. All JKESS storage systems feature active balancing BMS for optimal battery performance and lifespan, CAN/RS485 communication for seamless inverter integration, and remote cloud monitoring for real-time performance tracking. From residential rooftops to sprawling solar farms, JKESS core components ensure every watt of solar energy is captured, stored, and utilized efficiently.',
    image: '/images/scenario-1.png',
  },
  {
    id: 'outdoor-emergency',
    title: 'Outdoor & Emergency Power Solution',
    desc: 'Reliable and portable energy storage solutions designed for outdoor adventures, emergency response, and off-grid scenarios where mains power is unavailable or unstable. For outdoor travel and camping enthusiasts, JKESS compact battery kits paired with intelligent BMS protection boards deliver clean, quiet, and portable power for charging devices, running small appliances, and powering lighting — a clean alternative to noisy gas generators. For small clinics, medical stations, and field hospitals in remote or disaster-affected areas, JKESS storage systems provide stable and uninterrupted power supply for critical medical equipment, refrigeration of vaccines and medicines, lighting, and communication devices, ensuring life-saving operations continue even during grid outages. For construction sites, engineering maintenance crews, and temporary workstations in remote locations, JKESS modular battery solutions offer flexible and scalable power that can be transported and deployed on demand. All systems feature JKESS active balancing BMS for extended battery life, multiple output interfaces for versatile device connectivity, CAN/RS485 communication for monitoring, and rugged construction designed to withstand challenging outdoor conditions. Wherever there is no grid, JKESS delivers the power you need.',
    image: '/images/scenario-4.png',
  },
  {
    id: 'low-speed-vehicle',
    title: 'Low-Speed Vehicle Solution',
    desc: 'Complete battery and electronic control solution tailored for low-speed electric vehicles, covering two-wheelers, three-wheelers, and small four-wheel vehicles used in daily commuting, last-mile delivery, campus shuttles, and community mobility. At the core of each solution, JKESS intelligent BMS protection boards with active balancing (2A~15A, 4S~32S) ensure safe and efficient battery management across all cells, extending cycle life and preventing overcharge, over-discharge, and short circuits. Paired with JKESS modular battery packs, the system delivers reliable and consistent power output tailored to each vehicle type — from lightweight two-wheeler batteries for urban commuting to higher-capacity packs for three-wheeled cargo vehicles and small four-wheeled passenger vehicles. The integrated electronic control system provides smooth acceleration, regenerative braking support, and real-time status monitoring via CAN bus communication. Designed for durability and safety, JKESS low-speed vehicle solutions meet European market standards, offering affordable, clean, and efficient electrification for short-distance transportation needs. Whether it\'s an e-bike for city streets, a cargo trike for last-mile logistics, or a compact neighborhood EV, JKESS delivers the power and control system that keeps you moving.',
    image: '/images/scenario-5.png',
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
              <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
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
