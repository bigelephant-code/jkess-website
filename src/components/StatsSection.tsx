'use client'

import { useEffect, useState, useRef } from 'react'
import { Factory, Globe, Users, Building2 } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'
import { motion } from 'framer-motion'

interface StatsData {
  yearsEstablished?: number
  manufacturingBase?: string
  countriesCovered?: number
  employees?: string
}

/* ─── Per-character stagger text ─── */
function StaggerText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`flex ${className || ''}`}
      initial="rest"
      animate="rest"
      variants={{
        rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
        hover: { transition: { staggerChildren: 0.025 } }
      }}
      whileHover="hover"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            rest: { y: 0, color: 'inherit', transition: { duration: 0.2 } },
            hover: { y: -2, color: '#22c55e', transition: { duration: 0.2 } }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)

  const rawNum = parseFloat(value.replace(/[+,]/g, ''))
  const hasPlus = value.includes('+')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now()
          const duration = 2000

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * rawNum)
            setDisplay(current.toString())
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplay(hasPlus ? value : rawNum.toString())
            }
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rawNum, hasPlus, value])

  const displayText = display

  return (
    <span ref={ref}>
      <StaggerText text={displayText} />
    </span>
  )
}

const iconMap: Record<string, { icon: React.ReactNode; label: string }> = {
  years: { icon: <Building2 size={28} />, label: 'Years of Innovation' },
  base: { icon: <Factory size={28} />, label: 'Manufacturing Base' },
  countries: { icon: <Globe size={28} />, label: 'Countries & Regions' },
  employees: { icon: <Users size={28} />, label: 'Employees' },
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const stats = [
    {
      key: 'years',
      value: data?.yearsEstablished ? `${data.yearsEstablished}` : '4',
      suffix: undefined as string | undefined,
      label: 'Years of Innovation',
    },
    {
      key: 'base',
      value: data?.manufacturingBase || '30,000',
      suffix: '㎡' as string | undefined,
      label: 'Manufacturing Base',
    },
    {
      key: 'countries',
      value: data?.countriesCovered ? `${data.countriesCovered}+` : '30+',
      suffix: undefined as string | undefined,
      label: 'Countries & Regions',
    },
    {
      key: 'employees',
      value: data?.employees || '100+',
      suffix: undefined as string | undefined,
      label: 'Employees',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <StaggerReveal staggerDelay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    className="text-center space-y-3 group cursor-default"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="flex justify-center text-gray-400 group-hover:text-green-500 transition-colors duration-200"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {iconMap[stat.key]?.icon || iconMap.years.icon}
                    </motion.div>

                    {/* Number */}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </span>
                      {stat.suffix && (
                        <span className="text-lg text-gray-400">{stat.suffix}</span>
                      )}
                    </div>

                    {/* Label */}
                    <StaggerText
                      text={stat.label}
                      className="justify-center text-sm uppercase tracking-wider text-gray-500"
                    />
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerReveal>
        </Reveal>
      </div>
    </section>
  )
}
