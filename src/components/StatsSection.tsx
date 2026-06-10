'use client'

import { Factory, Globe, Zap, Building2 } from 'lucide-react'

interface StatsData {
  yearsEstablished?: number
  manufacturingBase?: string
  countriesCovered?: number
  annualOutput?: string
}

const iconMap: Record<string, React.ReactNode> = {
  years: <Building2 size={28} />,
  base: <Factory size={28} />,
  countries: <Globe size={28} />,
  output: <Zap size={28} />,
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
      value: data?.countriesCovered ? `${data.countriesCovered}` : '30+',
      label: 'Countries & Regions',
    },
    {
      icon: iconMap.output,
      value: data?.annualOutput || '2.1',
      suffix: 'GWh',
      label: 'Annual Output',
    },
  ]

  return (
    <section className="bg-black py-20 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center space-y-3"
            >
              <div className="flex justify-center text-green-400">{stat.icon}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
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
