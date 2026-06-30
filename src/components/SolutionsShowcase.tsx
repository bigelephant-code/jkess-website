'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

const scenarios = [
  { id: 'residential', image: '/images/scenario-2.webp', icon: '1' },
  { id: 'ci-storage', image: '/images/scenario-3.webp', icon: '5' },
  { id: 'solar-pv', image: '/images/scenario-1.webp', icon: '3' },
  { id: 'outdoor-emergency', image: '/images/scenario-4.webp', icon: '4' },
  { id: 'low-speed-vehicle', image: '/images/scenario-5.webp', icon: '2' },
]

const CIRCUMFERENCE = 2 * Math.PI * 28
const CYCLE_MS = 5000

export default function SolutionsShowcase() {
  const t = useTranslate()
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [impact, setImpact] = useState<{ index: number; id: number } | null>(null)
  const impactTimer = useRef<number | null>(null)

  useEffect(() => {
    if (shouldReduceMotion) return

    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % scenarios.length)
    }, CYCLE_MS)

    return () => window.clearTimeout(timer)
  }, [active, cycle, shouldReduceMotion])

  useEffect(() => {
    return () => {
      if (impactTimer.current !== null) window.clearTimeout(impactTimer.current)
    }
  }, [])

  const selectScenario = (index: number) => {
    setActive(index)
    setCycle((value) => value + 1)
    setImpact({ index, id: Date.now() })

    if (impactTimer.current !== null) window.clearTimeout(impactTimer.current)
    impactTimer.current = window.setTimeout(() => setImpact(null), 700)
  }

  const scenario = scenarios[active]
  const title = t(`scenarios.${scenario.id}.title`, scenario.id)
  const description = t(`scenarios.${scenario.id}.desc`, scenario.id)

  return (
    <section className="relative py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t('solutions.title', 'Solutions')} &amp;{' '}
            <span className="text-green-600">{t('solutions.scenarios', 'Scenarios')}</span>
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            {t('scenarios.subtitle', 'C&I Storage · Residential · Solar PV · Outdoor & Emergency · Low-Speed Vehicle')}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-8 md:flex-row md:gap-10">
          <div className="flex w-full flex-row items-center justify-between overflow-visible md:w-[100px] md:flex-shrink-0 md:flex-col" role="tablist" aria-label={t('solutions.title', 'Solutions')}>
            {scenarios.map((item, index) => {
              const isActive = index === active
              const isImpacted = impact?.index === index
              const iconExt = item.icon === '2' ? '.svg' : '.png'

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={t(`scenarios.${item.id}.title`, item.id)}
                  onClick={() => selectScenario(index)}
                  className="group relative flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-4"
                >
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-1 rounded-full bg-green-400/15"
                      animate={{ scale: [0.88, 1.16, 0.88], opacity: [0.35, 0.12, 0.35] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  {isImpacted && !shouldReduceMotion && (
                    <>
                      <motion.span
                        key={`wave-1-${impact.id}`}
                        aria-hidden="true"
                        className="absolute inset-1 rounded-full border-2 border-green-400"
                        initial={{ scale: 0.9, opacity: 0.7 }}
                        animate={{ scale: 2.6, opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                      />
                      <motion.span
                        key={`wave-2-${impact.id}`}
                        aria-hidden="true"
                        className="absolute inset-2 rounded-full border border-emerald-300"
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 2.1, opacity: 0 }}
                        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                      />
                    </>
                  )}

                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 64 64" aria-hidden="true">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke={isActive ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.07)'} strokeWidth="5" />
                    {isActive && (
                      <motion.circle
                        key={`${active}-${cycle}`}
                        cx="32"
                        cy="32"
                        r="28"
                        fill="transparent"
                        stroke="#22c55e"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        initial={{ strokeDashoffset: shouldReduceMotion ? 0 : CIRCUMFERENCE }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : CYCLE_MS / 1000, ease: 'linear' }}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }}
                      />
                    )}
                  </svg>

                  <motion.span
                    className={`relative z-10 block bg-gray-600 transition-colors duration-300 ${item.icon === '2' ? 'h-9 w-9' : 'h-7 w-7'} ${isActive ? 'bg-green-500' : 'group-hover:bg-gray-500'}`}
                    animate={isImpacted && !shouldReduceMotion
                      ? { scale: [1, 0.72, 1.26, 0.92, 1.1], rotate: [0, -8, 8, -3, 0] }
                      : { scale: isActive ? 1.1 : 1, rotate: 0 }}
                    transition={{ duration: isImpacted ? 0.55 : 0.25, ease: 'easeOut' }}
                    style={{
                      mask: `url(/images/goodwe-icon-${item.icon}${iconExt}) center/contain no-repeat`,
                      WebkitMask: `url(/images/goodwe-icon-${item.icon}${iconExt}) center/contain no-repeat`,
                    }}
                  />
                </button>
              )
            })}
          </div>

          <div className="grid min-w-0 flex-1 items-center gap-8 md:grid-cols-5">
            <div className="md:col-span-2" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={scenario.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <h3 className="text-lg font-bold text-gray-900 md:text-2xl">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">{description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/75 shadow-[0_24px_70px_rgba(15,23,42,0.09)] ring-1 ring-black/5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={scenario.image}
                    className="absolute inset-0"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.025, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Image src={scenario.image} alt={title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 60vw" />
                    </motion.div>
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_82%,rgba(34,197,94,0.13),transparent_36%)]" />
                    {!shouldReduceMotion && (
                      <motion.div
                        aria-hidden="true"
                        className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-green-300/25 to-transparent blur-xl"
                        animate={{ x: ['0%', '500%'] }}
                        transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
