'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: 'Foundation',
    pos: { left: '6%', top: '32%' },
    color: '#6b8f71',
    desc: 'Team established, first-gen products launched.',
  },
  {
    period: '2020-2022',
    title: 'Growth',
    pos: { left: '27%', top: '24%' },
    color: '#4a7c6f',
    desc: 'R&D center founded. Overseas market expansion.',
  },
  {
    period: '2023-2024',
    title: 'Breakthrough',
    pos: { left: '50%', top: '18%' },
    color: '#2d6a4f',
    desc: 'JKESS brand launched. 5-hectare factory built.',
  },
  {
    period: '2025-Future',
    title: 'Expansion',
    pos: { left: '73%', top: '12%' },
    color: '#1b4332',
    desc: 'Full-chain capabilities. 2.1 GWh/year capacity.',
  },
]

export default function Timeline() {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20L12 4l10 16"/>
            </svg>
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Development{' '}
            <span className="text-green-600">Milestones</span>
          </h2>
        </motion.div>

        {/* ─── Mountain landscape ─── */}
        <div className="relative w-full h-[520px] md:h-[580px] rounded-2xl overflow-hidden">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-white" />

          {/* Mist layers */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/60 via-white/20 to-transparent z-10" />
          <div className="absolute bottom-1/4 left-0 right-0 h-1/4 bg-gradient-to-t from-white/30 to-transparent z-20" />

          {/* ─── SVG Mountain range ─── */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full z-0"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMax meet"
            style={{ height: '85%' }}
          >
            {/* Far background mountains (misty) */}
            <path
              d="M0 320 Q60 280 120 300 Q200 250 280 270 Q340 220 400 240 Q480 180 560 200 Q620 160 680 180 Q740 140 800 160 Q860 200 920 220 Q980 240 1040 260 Q1100 280 1200 300 L1200 400 L0 400Z"
              fill="#d4e0d0"
              opacity="0.5"
            />
            <path
              d="M0 340 Q80 300 160 320 Q240 270 320 290 Q400 240 480 260 Q560 200 640 220 Q720 180 800 200 Q880 230 960 250 Q1040 270 1200 290 L1200 400 L0 400Z"
              fill="#b8c9b0"
              opacity="0.4"
            />

            {/* Mid mountains */}
            <path
              d="M0 360 Q50 330 100 340 Q180 290 260 310 Q340 260 420 280 Q500 230 580 250 Q640 210 700 230 Q760 200 820 220 Q900 250 980 270 Q1060 290 1200 310 L1200 400 L0 400Z"
              fill="#95b090"
              opacity="0.5"
            />

            {/* Main mountain ridge - the "path" the milestones follow */}
            <path
              d="M0 380 Q40 355 80 360 Q120 340 160 345 Q220 310 280 320 Q340 285 400 295 Q460 260 520 270 Q560 250 600 255 Q660 230 720 240 Q780 220 840 230 Q900 250 960 260 Q1020 270 1080 280 Q1140 290 1200 300 L1200 400 L0 400Z"
              fill="#6b8f71"
              opacity="0.35"
            />

            {/* Foreground ridge */}
            <path
              d="M0 400 L0 390 Q80 370 160 380 Q240 355 320 365 Q400 335 480 345 Q540 325 600 330 Q660 315 720 320 Q780 305 840 310 Q920 325 1000 335 Q1080 345 1200 360 L1200 400Z"
              fill="#4a7c6f"
              opacity="0.25"
            />

            {/* Path/trail connecting milestones */}
            <path
              d="M60 340 Q140 310 220 320 Q300 290 380 300 Q460 270 540 280 Q600 265 660 270 Q720 255 780 260 Q840 270 900 280 Q960 290 1020 300"
              stroke="#2d6a4f"
              strokeWidth="2"
              fill="none"
              opacity="0.15"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Sun (rising sun - symbol of growth) */}
          <motion.div
            className="absolute top-8 right-1/4 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, #fbbf24, #f59e0b, transparent)',
              boxShadow: '0 0 60px rgba(251, 191, 36, 0.3), 0 0 120px rgba(251, 191, 36, 0.1)',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ─── Milestone markers ─── */}
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.2, type: 'spring', stiffness: 150 }}
              className="absolute z-30 group"
              style={{ left: item.pos.left, top: item.pos.top }}
            >
              {/* Connecting line from dot up to card */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-transparent to-gray-300 opacity-30 group-hover:opacity-60 transition-opacity" style={{ height: i === 0 ? '2rem' : '1.5rem' }} />

              {/* Dot */}
              <motion.div
                className="relative w-4 h-4 rounded-full border-[3px] border-white shadow-md z-10 mx-auto cursor-pointer"
                style={{ background: item.color }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: item.color }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.div>

              {/* Label above dot */}
              <motion.div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                style={{ minWidth: '120px' }}
              >
                <div
                  className="text-center px-3 py-1.5 rounded-lg shadow-md"
                  style={{ background: `${item.color}E0`, color: '#fff' }}
                >
                  <p className="text-[10px] font-semibold">{item.period}</p>
                </div>
              </motion.div>

              {/* Card below dot (always visible) */}
              <div className="mt-2 text-center">
                <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 max-w-[130px] mx-auto leading-snug">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom legend ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
              <path d="M2 20L12 4l10 16"/>
            </svg>
            <span className="text-xs text-gray-500">
              Climbing higher — from foundation to full-chain energy leader
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
