'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: 'Foundation',
    content: [
      'Established the team under Shandong Tunan, entering the new energy industry and commencing R&D of energy storage products.',
      'Launched the first-generation products, earning positive feedback from customers.',
    ],
    color: '#22c55e',
  },
  {
    period: '2020-2022',
    title: 'Growth',
    content: [
      'Established the Hangzhou R&D center for cutting-edge technology innovation. Founded Shenzhen Nengyi subsidiary, rapidly scaling technical capabilities and team size.',
      'Successfully expanded into overseas markets. International market share surged rapidly, attracting significant industry attention.',
    ],
    color: '#5b5bff',
  },
  {
    period: '2023-2024',
    title: 'Breakthrough',
    content: [
      'Launched the JKESS brand covering more than 30 countries worldwide. A 5-hectare large-scale modern energy storage production base was completed and put into operation.',
      'Successfully developed high-voltage commercial & industrial energy storage systems with active balancing technology, helping customers improve returns by 2-5 years.',
    ],
    color: '#f58a8a',
  },
  {
    period: '2025-Future',
    title: 'Expansion',
    content: [
      'From R&D design and production integration to backend testing and after-sales — JKESS now possesses full-chain capabilities in energy storage system development, manufacturing, and sales services.',
      'Current production lines reach 2.1 GWh/year capacity, rising as a fast-growing star in the energy storage industry.',
    ],
    color: '#eab308',
  },
]

export default function Timeline() {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Development <span className="text-green-600">History</span>
          </h2>
        </motion.div>

        {/* 4 columns horizontal */}
        <div className="grid md:grid-cols-4 gap-5 md:gap-6">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group relative"
            >
              <div
                className="absolute -inset-3 rounded-2xl opacity-0 blur-xl group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse, ${item.color}12, transparent 70%)` }}
              />

              <div
                className="relative rounded-2xl border border-gray-100 p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col"
                style={{ background: `${item.color}03` }}
              >
                {/* Number + period */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm"
                    style={{ background: item.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: item.color }}>
                    {item.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>

                {/* Color bar */}
                <div className="h-0.5 w-12 rounded-full mb-4" style={{ background: item.color, opacity: 0.3 }} />

                {/* Content */}
                <div className="space-y-3 flex-1">
                  {item.content.map((p, pi) => (
                    <p key={pi} className="text-[13px] text-gray-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
