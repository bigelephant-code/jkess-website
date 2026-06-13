'use client'

import { motion } from 'framer-motion'
import {
  Home,
  Building2,
  Car,
  Sun,
  Radio,
  Globe,
  Zap,
  Shield,
  Cpu,
  BatteryCharging,
} from 'lucide-react'

interface ProjectCase {
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgLight: string
  tags: string[]
}

const projects: ProjectCase[] = [
  {
    title: 'Residential Energy Storage',
    description:
      'Complete home battery solutions with smart BMS, LCD display, and CAN/RS485 communication. Seamlessly integrates with solar panels for 24/7 clean energy independence.',
    icon: Home,
    color: '#22c55e',
    bgLight: 'rgba(34, 197, 94, 0.06)',
    tags: ['Battery Kit', 'Home Backup', 'Smart BMS'],
  },
  {
    title: 'Commercial Backup Power',
    description:
      'Rack-mount 6U battery systems for offices, retail, and industrial applications. Modular expandable design supporting up to 30KWh+ with intelligent load management.',
    icon: Building2,
    color: '#5b5bff',
    bgLight: 'rgba(91, 91, 255, 0.06)',
    tags: ['6U Rack', 'Commercial', 'Modular'],
  },
  {
    title: 'EV Charging Infrastructure',
    description:
      'High-capacity storage feeding EV charging stations. Our battery systems buffer grid demand, reduce peak loads, and enable fast charging in low-infrastructure locations.',
    icon: Car,
    color: '#a66cd9',
    bgLight: 'rgba(166, 108, 217, 0.06)',
    tags: ['EV Charging', 'Peak Shaving', 'Fast Charge'],
  },
  {
    title: 'Solar + Storage Integration',
    description:
      'End-to-end solar-plus-storage systems combining PV arrays with JKESS battery kits. Advanced MPPT compatibility ensures maximum energy harvest from every panel.',
    icon: Sun,
    color: '#eab308',
    bgLight: 'rgba(234, 179, 8, 0.06)',
    tags: ['Solar PV', 'MPPT', 'Hybrid System'],
  },
  {
    title: 'Telecom Tower Backup',
    description:
      'Reliable backup power for remote telecom towers and base stations. High-voltage kits (up to 800V) provide uninterrupted service in challenging environments.',
    icon: Radio,
    color: '#06b6d4',
    bgLight: 'rgba(6, 182, 212, 0.06)',
    tags: ['HV Kit', 'Remote', 'Uninterrupted'],
  },
  {
    title: 'Off-Grid Power Systems',
    description:
      'Self-sufficient power solutions for remote cabins, farms, and island communities. Complete with battery storage, inverter, and solar/wind integration for total energy autonomy.',
    icon: Globe,
    color: '#f97316',
    bgLight: 'rgba(249, 115, 22, 0.06)',
    tags: ['Off-Grid', 'Autonomous', 'Hybrid'],
  },
]

function CaseCard({ project, index }: { project: ProjectCase; index: number }) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      {/* Card glow on hover */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${project.color}20, transparent 70%)` }}
      />

      {/* Card */}
      <div
        className="relative rounded-xl border border-gray-100 transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden"
        style={{ background: project.bgLight }}
      >
        {/* Color accent bar */}
        <div
          className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
          style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }}
        />

        <div className="p-6">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
              border: `1px solid ${project.color}20`,
            }}
          >
            <Icon size={22} style={{ color: project.color }} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: `${project.color}10`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectCases() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-4">
            <Zap size={14} />
            Case Studies
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Projects,{' '}
            <span className="text-green-600">Real Results</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From residential rooftops to industrial facilities — see how JKESS
            energy storage solutions power real-world applications across the globe.
          </p>
        </motion.div>

        {/* Card grid: 3 columns x 2 rows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <CaseCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors group"
          >
            <BatteryCharging size={16} />
            Explore All Products
            <Cpu size={14} className="transition-transform group-hover:rotate-12" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
