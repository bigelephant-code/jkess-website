'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: 'Foundation',
    color: '#22c55e',
    detail: 'Established team, launched first-gen products, earned positive customer feedback.',
  },
  {
    period: '2020-2022',
    title: 'Growth',
    color: '#5b5bff',
    detail: 'Hangzhou R&D center + Shenzhen Nengyi founded. Rapid overseas market expansion.',
  },
  {
    period: '2023-2024',
    title: 'Breakthrough',
    color: '#f58a8a',
    detail: 'JKESS brand launched, 5-hectare factory built, HV commercial storage developed.',
  },
  {
    period: '2025-Future',
    title: 'Expansion',
    color: '#eab308',
    detail: 'Full-chain capabilities, 2.1 GWh/year capacity, global market leadership.',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={sectionRef} className="relative bg-white py-20 md:py-24 overflow-hidden">
      {/* ─── Background animated gradient ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Company{' '}
            <span className="text-green-600">Milestones</span>
          </h2>
        </motion.div>

        {/* ─── Animated progress bar ─── */}
        <div className="relative h-1 bg-gray-100 rounded-full mb-14 max-w-4xl mx-auto overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: progressWidth, background: 'linear-gradient(90deg, #22c55e, #5b5bff, #f58a8a, #eab308)' }}
          />
        </div>

        {/* ─── Horizontal card grid ─── */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group relative"
            >
              {/* Hover glow */}
              <motion.div
                className="absolute -inset-2 rounded-2xl opacity-0 blur-xl group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse, ${item.color}20, transparent 70%)` }}
              />

              {/* Card */}
              <motion.div
                className="relative rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2"
                style={{ background: `linear-gradient(180deg, white, ${item.color}03)` }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Color accent bar - animated width */}
                <motion.div
                  className="h-1"
                  style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}44)` }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                />

                <div className="p-5">
                  {/* Year */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <span className="text-xs font-semibold tracking-wide" style={{ color: item.color }}>
                      {item.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>

                  {/* Detail (shorter) */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.detail}
                  </p>

                  {/* Bottom subtle indicator */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <motion.div
                      className="h-px flex-1"
                      style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
