'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, Factory, Globe, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslate } from '@/i18n/client'
import { Reveal, StaggerItem, StaggerReveal } from './ScrollReveal'

interface StatsData {
  established?: string
  manufacturingBase?: string
  marketsReached?: string
  employees?: string
}

function StaggerText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`flex group cursor-default ${className || ''}`}
      initial="rest"
      animate="rest"
      variants={{
        rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
        hover: { transition: { staggerChildren: 0.025 } },
      }}
      whileHover="hover"
    >
      {(text || '').split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent group-hover:opacity-100 opacity-50"
          variants={{
            rest: { y: 0, transition: { duration: 0.2 } },
            hover: { y: -2, transition: { duration: 0.2 } },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function AnimatedNumber({ value }: { value: string }) {
  const numericValue = Number.parseFloat(value.replace(/[+,]|k/g, ''))
  const [display, setDisplay] = useState(Number.isNaN(numericValue) ? value : '0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (Number.isNaN(numericValue)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const steps = value.includes('+') ? 30 : 40
          let current = 0
          const increment = numericValue / steps
          const timer = window.setInterval(() => {
            current += increment
            if (current >= numericValue) {
              setDisplay(value)
              window.clearInterval(timer)
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
  }, [numericValue, value])

  return <span ref={ref}>{display}</span>
}

const iconMap: Record<string, React.ReactNode> = {
  established: <Building2 size={28} />,
  base: <Factory size={28} />,
  markets: <Globe size={28} />,
  employees: <Users size={28} />,
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const t = useTranslate()
  const stats = [
    {
      key: 'established',
      value: data?.established || '2017',
      suffix: undefined as string | undefined,
      label: t('stats.established', 'Team Established'),
    },
    {
      key: 'base',
      value: data?.manufacturingBase || '70000',
      suffix: '㎡' as string | undefined,
      label: t('stats.manufacturing', 'Factory Building Area'),
    },
    {
      key: 'markets',
      value: data?.marketsReached || '200+',
      suffix: undefined as string | undefined,
      label: t('stats.markets', 'Countries & Regions Served'),
    },
    {
      key: 'employees',
      value: data?.employees || '700+',
      suffix: undefined as string | undefined,
      label: t('stats.employees', 'Full-time Employees'),
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <StaggerReveal staggerDelay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StaggerItem key={stat.key}>
                  <motion.div
                    className="text-center space-y-3 group cursor-default"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex justify-center text-gray-400 transition-all duration-300 group-hover:text-blue-500"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {iconMap[stat.key] || iconMap.established}
                    </motion.div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent">
                        <AnimatedNumber value={stat.value} />
                      </span>
                      {stat.suffix && (
                        <span className="text-lg text-gray-400 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <StaggerText text={stat.label} className="justify-center text-sm uppercase tracking-wider text-gray-500" />
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
