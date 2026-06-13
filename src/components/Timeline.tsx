'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017 – 2019',
    title: 'Foundation',
    subtitle: 'Building the Foundation',
    content:
      'Established the team under Shandong Tunan, entering the new energy industry. Commenced R&D of energy storage products. Launched the first-generation products, earning positive customer feedback.',
    color: '#22c55e',
    bgLight: 'rgba(34, 197, 94, 0.04)',
    dotBg: 'rgba(34, 197, 94, 0.12)',
    index: 0,
  },
  {
    period: '2020 – 2022',
    title: 'Growth',
    subtitle: 'Rapid Expansion',
    content:
      'Established Hangzhou R&D center focusing on cutting-edge technology innovation. Founded Shenzhen Nengyi subsidiary. Technology capabilities and team scale grew rapidly. Successfully expanded into overseas markets, with international market share rising swiftly and attracting industry attention.',
    color: '#5b5bff',
    bgLight: 'rgba(91, 91, 255, 0.04)',
    dotBg: 'rgba(91, 91, 255, 0.12)',
    index: 1,
  },
  {
    period: '2023 – 2024',
    title: 'Breakthrough',
    subtitle: 'Global & Manufacturing Scale',
    content:
      'Launched the JKESS brand, covering over 30 countries worldwide. Completed construction and commissioning of a 5-hectare modern large-scale energy storage production base. Successfully developed high-voltage commercial & industrial energy storage systems featuring active balancing technology — helping customers improve returns by 2–5 years under peak-shaving policies.',
    color: '#f58a8a',
    bgLight: 'rgba(245, 138, 138, 0.04)',
    dotBg: 'rgba(245, 138, 138, 0.12)',
    index: 2,
  },
  {
    period: '2025 – Future',
    title: 'Expansion',
    subtitle: 'Full-Chain Integration',
    content:
      'From R&D and design to production integration, backend testing, and after-sales — JKESS now possesses full-chain capabilities in energy storage system development, manufacturing, and sales services. Current production lines reach 2.1 GWh/year capacity, emerging as a rising star in the energy storage industry. Going forward, we will focus on full industrial chain integration for C&I storage, large-scale project delivery, and technological innovation to establish a leading position in the new energy sector. Committed to driving the energy transition and sustainable development.',
    color: '#eab308',
    bgLight: 'rgba(234, 179, 8, 0.04)',
    dotBg: 'rgba(234, 179, 8, 0.12)',
    index: 3,
  },
]

export default function Timeline() {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
          <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
            From a startup team to a global player — tracing the key moments that shaped JKESS.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className={`md:flex items-start ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                    {/* Content card */}
                    <div className={`md:w-[calc(50%-40px)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group relative"
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute -inset-6 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse, ${item.color}15, transparent 70%)` }}
                        />

                        {/* Card */}
                        <div
                          className="relative rounded-2xl border border-gray-100 p-6 md:p-8 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"
                          style={{ background: item.bgLight }}
                        >
                          {/* Period badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                            style={{ background: item.dotBg, color: item.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                            {item.period}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-400 mb-3">{item.subtitle}</p>

                          {/* Content */}
                          <p className="text-gray-600 leading-relaxed text-sm md:text-[15px]">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center dot (desktop only) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center"
                      style={{ top: '2rem' }}
                    >
                      {/* Animated dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                        className="w-5 h-5 rounded-full border-[3px] bg-white z-10"
                        style={{ borderColor: item.color }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ background: item.color }}
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </motion.div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-[calc(50%-40px)]" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
