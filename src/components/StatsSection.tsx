'use client'

import { useEffect, useState, useRef } from 'react'
import { Factory, Globe, Users, Building2 } from 'lucide-react'

interface StatsData {
  yearsEstablished?: number
  manufacturingBase?: string
  countriesCovered?: number
  employees?: string
}

function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const [suffixDisplay] = useState(suffix || '')
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  // Parse numeric value
  const rawNum = parseFloat(value.replace(/[+,]/g, ''))
  const hasPlus = value.includes('+')

  useEffect(() => {
    if (animated.current) return
    animated.current = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now()
          const duration = 2000

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic for smooth deceleration
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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rawNum, hasPlus, value])

  return (
    <span ref={ref}>
      {display}{suffixDisplay}
    </span>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  years: <Building2 size={28} />,
  base: <Factory size={28} />,
  countries: <Globe size={28} />,
  employees: <Users size={28} />,
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const stats = [
    {
      icon: iconMap.years,
      value: data?.yearsEstablished ? `${data.yearsEstablished}` : '4',
      label: 'Years of Innovation',
    },
    {
      icon: iconMap.base,
      value: data?.manufacturingBase || '30,000',
      suffix: '㎡',
      label: 'Manufacturing Base',
    },
    {
      icon: iconMap.countries,
      value: data?.countriesCovered ? `${data.countriesCovered}+` : '30+',
      label: 'Countries & Regions',
    },
    {
      icon: iconMap.employees,
      value: data?.employees || '100+',
      label: 'Employees',
    },
  ]

  return (
    <section className="bg-black py-20 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-3">
              <div className="flex justify-center text-green-400">{stat.icon}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                {stat.suffix && (
                  <span className="text-lg text-gray-400">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
