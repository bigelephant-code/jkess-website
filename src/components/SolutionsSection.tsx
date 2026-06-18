'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
  {
    id: 'ground-station',
    title: 'Ground Power Station',
    desc: 'Large-scale ground-mounted solar and energy storage stations for utility-level power generation. Covers plain, mountain, hill, desert and water surface applications with stable and efficient operation under extreme environmental conditions.',
    image: '',
  },
]

const CIRCUMFERENCE = 2 * Math.PI * 28
const PATH_LENGTH = 500

function getFlowPath(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2
  // Arc offset: bigger when distance is bigger
  const dist = Math.abs(y2 - y1)
  const arcOffset = Math.min(40, 15 + dist * 0.05)
  return `M ${x1} ${y1} C ${x1 + arcOffset} ${midY} ${x2 + arcOffset} ${midY} ${x2} ${y2}`
}

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const [flow, setFlow] = useState<{
    fromIdx: number
    path: string
    vw: number
    vh: number
  } | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef(0)
  const startTimeRef = useRef(Date.now())
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const switchTab = useCallback((newIdx: number) => {
    const oldIdx = activeTabRef.current
    if (oldIdx === newIdx) return
    activeTabRef.current = newIdx
    setActiveTab(newIdx)

    // Measure positions and draw energy flow path
    const originEl = buttonRefs.current[oldIdx]
    const targetEl = buttonRefs.current[newIdx]
    const containerEl = containerRef.current

    if (originEl && targetEl && containerEl) {
      const cr = containerEl.getBoundingClientRect()
      const or = originEl.getBoundingClientRect()
      const tr = targetEl.getBoundingClientRect()

      const x1 = or.left + or.width / 2 - cr.left
      const y1 = or.top + or.height / 2 - cr.top
      const x2 = tr.left + tr.width / 2 - cr.left
      const y2 = tr.top + tr.height / 2 - cr.top

      const path = getFlowPath(x1, y1, x2, y2)
      setFlow({ fromIdx: oldIdx, path, vw: cr.width, vh: cr.height })
    } else {
      setFlow({ fromIdx: oldIdx, path: '', vw: 100, vh: 400 })
    }

    // Clear flow after animation
    setTimeout(() => setFlow(null), 600)
  }, [])

  // Need ref to activeTab for switchTab closure
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
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #22c55e 0%, transparent 50%), radial-gradient(circle at 70% 60%, #3b82f6 0%, transparent 50%)'
      }} />

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
          {/* Left: Vertical tab buttons with progress rings */}
          <div ref={containerRef} className="relative w-full md:w-[100px] flex-shrink-0 flex flex-row md:flex-col items-center md:justify-between">
            {/* Energy flow SVG overlay */}
            {flow && flow.path && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox={`0 0 ${flow.vw} ${flow.vh}`}
                style={{ overflow: 'visible' }}
              >
                {/* Faint track line */}
                <path
                  d={flow.path}
                  stroke="rgba(34,197,94,0.1)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Glowing energy flow - stroke draws in from source to destination */}
                <path
                  d={flow.path}
                  stroke="#22c55e"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={PATH_LENGTH}
                  className="animate-energy-flow"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.5))',
                  }}
                />
              </svg>
            )}

            {scenarios.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { buttonRefs.current[i] = el }}
                onClick={() => handleTabClick(i)}
                className="relative w-[72px] h-[72px] flex items-center justify-center rounded-full transition-all duration-300 group flex-shrink-0"
              >
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                  {/* Background circle */}
                  <circle cx="32" cy="32" r="28" fill="transparent"
                    stroke={i === activeTab ? 'rgba(34,197,94,0.2)' : 'rgba(0,0,0,0.08)'}
                    strokeWidth="6" />
                  {/* Progress circle */}
                  {i === activeTab && (
                    <circle cx="32" cy="32" r="28" fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px', transition: 'stroke-dashoffset 0.03s linear' }}
                    />
                  )}
                </svg>

                {/* Icons: all use CSS mask */}
                {(() => {
                  const iconMap = ['1','5','3','4','2']
                  return (
                    <div
                      className={`relative z-10 transition-all duration-300 bg-gray-600 ${i === 4 ? 'w-9 h-9' : 'w-7 h-7'} ${i === activeTab ? 'bg-green-500 scale-110' : 'group-hover:bg-gray-500'}`}
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
            {/* Text content */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                {scenarios[activeTab].title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {scenarios[activeTab].desc}
              </p>
            </div>

            {/* Photo */}
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
