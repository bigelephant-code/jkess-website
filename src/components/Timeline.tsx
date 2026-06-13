'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017 – 2019',
    title: 'Foundation',
    subtitle: 'Foundation Period',
    content: [
      'Established the team under Shandong Tunan, entering the new energy industry, and commenced R&D of energy storage products.',
      'The first generation of products was launched in the market and received positive feedback from customers.',
    ],
    color: '#22c55e',
    index: 0,
  },
  {
    period: '2020 – 2022',
    title: 'Growth',
    subtitle: 'Growth Period',
    content: [
      'Established the Hangzhou R&D center to focus on cutting-edge technology innovation. Founded Shenzhen Nengyi subsidiary, rapidly growing technical capabilities and team scale.',
      'Successfully expanded into overseas markets. International market share surged rapidly, attracting significant industry attention.',
    ],
    color: '#5b5bff',
    index: 1,
  },
  {
    period: '2023 – 2024',
    title: 'Breakthrough',
    subtitle: 'Breakthrough Period',
    content: [
      'Launched the JKESS brand covering more than 30 countries worldwide. A 5-hectare large-scale modern energy storage production base was officially completed and put into operation.',
      'Successfully developed high-voltage commercial & industrial energy storage systems featuring active balancing technology. Designed for peak-shaving policies, effectively helping customers improve returns by 2–5 years.',
    ],
    color: '#f58a8a',
    index: 2,
  },
  {
    period: '2025 – Future',
    title: 'Expansion',
    subtitle: 'Expansion Period',
    content: [
      'From R&D and design, production integration, to backend testing and after-sales — JKESS now possesses full-chain capabilities in energy storage system development, manufacturing, and sales services.',
      'Current production lines reach 2.1 GWh/year capacity, emerging as a rising star in the energy storage industry.',
      'Going forward, we will focus on full industrial chain integration for C&I storage and large-scale project delivery. Through technological innovation and global market expansion, we aim to establish a leading position in the new energy sector.',
      'Committed to driving the energy transition, practicing sustainable development, and actively fulfilling social responsibilities — contributing to a green energy future.',
    ],
    color: '#eab308',
    index: 3,
  },
]

export default function Timeline() {
  return (
    <section className="relative bg-white pb-0 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20L12 4l10 16" />
            </svg>
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Development{' '}
            <span className="text-green-600">History</span>
          </h2>
        </motion.div>

        {/* Timeline - vertical layout with full text */}
        <div className="max-w-3xl mx-auto">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-10 pb-10 last:pb-0"
            >
              {/* Vertical line */}
              {i < milestones.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200" />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-1.5">
                <motion.div
                  className="w-[30px] h-[30px] rounded-full border-[3px] bg-white flex items-center justify-center"
                  style={{ borderColor: item.color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15, type: 'spring', stiffness: 200 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                </motion.div>
              </div>

              {/* Content */}
              <div className="pl-6">
                {/* Period badge */}
                <motion.div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ background: `${item.color}12`, color: item.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15 + 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  {item.period}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {item.title}
                  <span className="text-sm font-normal text-gray-400 ml-2">/ {item.subtitle}</span>
                </h3>

                {/* Full content paragraphs */}
                <div className="space-y-2 mt-3">
                  {item.content.map((paragraph, pi) => (
                    <p key={pi} className="text-[15px] text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Mountain background image ─── */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <img
          src="/images/mountain-bg-transparent.png"
          alt="Mountain landscape"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Gradient fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </div>
    </section>
  )
}
