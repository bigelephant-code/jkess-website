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

  return <span ref={ref} className="gradient-text">{display}{suffix || ''}</span>
}

const iconMap: Record<string, React.ReactNode> = {
  years: <Building2 size={24} />,
  base: <Factory size={24} />,
  countries: <Globe size={24} />,
  employees: <Users size={24} />,
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const stats = [
    {
      icon: 'years',
      value: data?.yearsEstablished ? `${data.yearsEstablished}` : '4',
      label: 'Years of Innovation',
    },
    {
      icon: 'base',
      value: data?.manufacturingBase || '30,000',
      suffix: '㎡',
      label: 'Manufacturing Base',
    },
    {
      icon: 'countries',
      value: data?.countriesCovered ? `${data.countriesCovered}+` : '30+',
      label: 'Countries & Regions',
    },
    {
      icon: 'employees',
      value: data?.employees || '100+',
      label: 'Employees',
    },
  ]

  return (
    <section className="relative bg-[#010101] py-20 border-t border-white/[0.03] overflow-hidden">
      {/* Subtle background orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #a66cd9, transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <StaggerReveal staggerDelay={0.12}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="text-center space-y-3 group"
                  >
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 group-hover:text-[#5b5bff] transition-colors duration-300">
                        {iconMap[stat.icon]}
                      </div>
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        <AnimatedNumber value={stat.value} />
                      </span>
                      {stat.suffix && (
                        <span className="text-lg text-gray-600">{stat.suffix}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-[0.15em] font-medium">
                      {stat.label}
                    </p>
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
