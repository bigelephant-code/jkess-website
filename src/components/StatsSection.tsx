'use client'
import { useTranslate } from '@/i18n/client'

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

/* --- Per-character stagger text --- */
function StaggerText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`flex ${className || ''}`}
      initial="rest"
      animate="rest"
      variants={{
        rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
        hover: { transition: { staggerChildren: 0.025 } },
      }}
      whileHover="hover"
    >
      {(text || '').split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            rest: { y: 0, color: 'rgba(107,114,128,1)', transition: { duration: 0.2 } },
            hover: { y: -2, color: '#22c55e', transition: { duration: 0.2 } },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* --- Animated counting number --- */
function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const num = parseFloat(value.replace(/[+,]|k/g, ''))
    if (isNaN(num)) { setDisplay(value); return }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const isLarge = value.includes('+')
          const steps = isLarge ? 30 : 40
          let current = 0
          const increment = num / steps
          const timer = setInterval(() => {
            current += increment
            if (current >= num) {
              setDisplay(value)
              clearInterval(timer)
            } else {
              const rounded = Math.round(current)
              setDisplay(`${rounded}${value.includes('+') ? '+' : ''}`)
            }
          }, 30)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

const iconMap: Record<string, { icon: React.ReactNode; label: string }> = {
  years: { icon: <Building2 size={28} />, label: 'Years Established' },
  base: { icon: <Factory size={28} />, label: 'Manufacturing Base' },
  countries: { icon: <Globe size={28} />, label: 'Countries Covered' },
  employees: { icon: <Users size={28} />, label: 'Employees' },
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const t = useTranslate()
  const stats = [
    {
      key: 'years',
      value: data?.yearsEstablished ? `${data.yearsEstablished}` : '4',
      suffix: undefined as string | undefined,
      label: t('stats.years', 'Years Established'),
    },
    {
      key: 'base',
      value: data?.manufacturingBase || '30,000',
      suffix: '\u33A1' as string | undefined,
      label: t('stats.manufacturing', 'Manufacturing Base'),
    },
    {
      key: 'countries',
      value: data?.countriesCovered ? `${data.countriesCovered}+` : '30+',
      suffix: undefined as string | undefined,
      label: t('stats.countries', 'Countries Covered'),
    },
    {
      key: 'employees',
      value: data?.employees || '100+',
      suffix: undefined as string | undefined,
      label: t('stats.employees', 'Employees'),
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
                    <motion.div
                      className="flex justify-center text-gray-400 group-hover:text-green-500 transition-colors duration-200"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {iconMap[stat.key]?.icon || iconMap.years.icon}
                    </motion.div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </span>
                      {stat.suffix && (
                        <span className="text-lg text-gray-400">{stat.suffix}</span>
                      )}
                    </div>
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
