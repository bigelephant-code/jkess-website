'use client'

import { motion } from 'framer-motion'
import {
  Battery,
  Shield,
  Zap,
  Gauge,
  Thermometer,
  Cable,
  Cpu,
  RefreshCw,
  Wifi,
  Sun,
  BarChart3,
  Truck,
  Box,
  Container,
  Fan,
  Plug,
} from 'lucide-react'

const modules = [
  {
    icon: Battery,
    title: 'BMS Protection',
    desc: 'Real-time voltage & temperature monitoring',
    gradient: 'from-emerald-400 to-green-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Overcharge Protection',
    desc: 'Multi-layer safety shutdown mechanism',
    gradient: 'from-blue-400 to-indigo-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Gauge,
    title: 'Cell Balancing',
    desc: 'Active balancing for extended cycle life',
    gradient: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    icon: Thermometer,
    title: 'Thermal Management',
    desc: 'Intelligent cooling & heating control',
    gradient: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: Cable,
    title: 'CAN / RS485',
    desc: 'Dual communication interface support',
    gradient: 'from-cyan-400 to-teal-600',
    bg: 'bg-cyan-50',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Cpu,
    title: 'Smart LCD Display',
    desc: '4.3" touch screen with real-time data',
    gradient: 'from-pink-400 to-rose-600',
    bg: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    icon: RefreshCw,
    title: 'Modular Expandable',
    desc: 'Parallel up to 30KWh+ capacity',
    gradient: 'from-amber-400 to-yellow-600',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: Wifi,
    title: 'Remote Monitoring',
    desc: 'Cloud-based real-time system oversight',
    gradient: 'from-sky-400 to-blue-600',
    bg: 'bg-sky-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    icon: Container,
    title: 'IP54 Enclosure',
    desc: 'Dust & water-resistant sheet-metal case',
    gradient: 'from-lime-400 to-green-600',
    bg: 'bg-lime-50',
    iconBg: 'bg-lime-100',
    iconColor: 'text-lime-600',
  },
  {
    icon: Plug,
    title: 'Multi-Chemistry',
    desc: 'Compatible with LFP & NMC cells',
    gradient: 'from-fuchsia-400 to-purple-600',
    bg: 'bg-fuchsia-50',
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600',
  },
  {
    icon: Fan,
    title: 'Active Cooling',
    desc: 'Smart fan control for optimal temps',
    gradient: 'from-teal-400 to-emerald-600',
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    desc: 'Historical performance & trend reports',
    gradient: 'from-indigo-400 to-blue-600',
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.06 } as const,
  }),
}

function ModuleCard({
  mod,
  index,
}: {
  mod: (typeof modules)[0]
  index: number
}) {
  const Icon = mod.icon

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="group relative"
    >
      {/* Hover glow */}
      <div className="absolute -inset-3 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none bg-green-500/5" />

      {/* Card */}
      <div
        className={`relative rounded-xl border border-gray-100 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden ${mod.bg}`}
      >
        {/* Gradient bar */}
        <div
          className={`h-1 w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r ${mod.gradient}`}
        />

        <div className="p-5">
          {/* Icon */}
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${mod.iconBg}`}
          >
            <Icon size={20} className={mod.iconColor} />
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">
            {mod.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-gray-500 leading-relaxed">
            {mod.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductModules() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <Box size={14} />
            Product Modules
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built with{' '}
            <span className="text-green-600">JKESS</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Every JKESS system comes packed with intelligent modules — from
            advanced BMS protection to cloud-based monitoring.
          </p>
        </motion.div>

        {/* 4×3 Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.title} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
