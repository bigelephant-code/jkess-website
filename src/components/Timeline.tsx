'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: 'Foundation',
    height: 'h-32',
    scale: 0.8,
    color: '#22c55e',
    desc: 'Team established, first-gen products launched, customer trust earned.',
  },
  {
    period: '2020-2022',
    title: 'Growth',
    height: 'h-44',
    scale: 0.9,
    color: '#5b5bff',
    desc: 'R&D center + subsidiary founded. Overseas markets rapidly expanded.',
  },
  {
    period: '2023-2024',
    title: 'Breakthrough',
    height: 'h-56',
    scale: 1.0,
    color: '#f58a8a',
    desc: 'JKESS brand, 5-hectare factory, HV storage with active balancing tech.',
  },
  {
    period: '2025-Future',
    title: 'Expansion',
    height: 'h-68',
    scale: 1.1,
    color: '#eab308',
    desc: 'Full-chain capabilities, 2.1 GWh/year, leading the energy transition.',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // ─── Canvas particles ───
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []
    let animId: number
    let time = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < 35; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.15 - Math.random() * 0.4, // rising upward
          size: 0.8 + Math.random() * 1.8,
          alpha: 0.1 + Math.random() * 0.3,
        })
      }
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      for (const p of particles) {
        p.x += p.vx + Math.sin(time + p.x * 0.01) * 0.1
        p.y += p.vy
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const flicker = Math.sin(time * 1.5 + p.x * 0.02) * 0.3 + 0.5
        ctx.fillStyle = p.alpha > 0.2
          ? `rgba(255, 255, 255, ${p.alpha * flicker})`
          : `rgba(74, 222, 128, ${p.alpha * flicker})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 md:py-32 overflow-hidden">
      {/* ─── Canvas particles ─── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ─── Subtle glow orbs ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Rising Through the{' '}
            <span style={{ background: 'linear-gradient(135deg, #22c55e, #5b5bff, #f58a8a, #eab308)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Years
            </span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
            From a humble start to full-chain energy storage leadership — each step built on the last.
          </p>
        </motion.div>

        {/* ─── Rising steps cards ─── */}
        <div className="flex items-end justify-center gap-5 md:gap-6 max-w-5xl mx-auto">
          {milestones.map((item, i) => {
            const heightClasses = ['h-32', 'h-44', 'h-56', 'h-68'][i]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className={`flex-1 flex flex-col ${heightClasses} group relative cursor-pointer`}
                style={{ minWidth: 0 }}
              >
                {/* Card glow */}
                <motion.div
                  className="absolute -inset-3 rounded-2xl opacity-0 blur-2xl group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse, ${item.color}30, transparent 70%)` }}
                />

                {/* Card body - rising height represents growth */}
                <motion.div
                  className="relative flex-1 rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
                  style={{
                    background: `linear-gradient(180deg, ${item.color}12, ${item.color}04)`,
                    border: `1px solid ${item.color}20`,
                    boxShadow: `0 4px 20px ${item.color}08`,
                  }}
                  whileHover={{ boxShadow: `0 8px 40px ${item.color}20` }}
                >
                  {/* Top accent glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-16 opacity-30 blur-2xl"
                    style={{ background: `radial-gradient(ellipse at center, ${item.color}, transparent)` }}
                  />

                  {/* Color stripe - animated */}
                  <motion.div
                    className="h-1 w-full absolute top-0 left-0"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                  />

                  <div className="p-5 md:p-6 flex flex-col h-full justify-end">
                    {/* Year badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-3 w-fit"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: item.color }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      {item.period}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{item.title}</h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Growth indicator bar */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <motion.div
                        className="h-[2px] flex-1 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: item.color }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step number */}
                <div className="flex justify-center mt-3">
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border"
                    style={{ borderColor: `${item.color}40`, color: item.color, background: `${item.color}08` }}
                    whileHover={{ scale: 1.2, background: item.color, color: '#fff' }}
                    transition={{ duration: 0.2 }}
                  >
                    {i + 1}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ─── Bottom growth footer ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-1">
              {[22, 44, 72, 100].map((val, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-1 rounded-full"
                  style={{ background: [milestones[0].color, milestones[1].color, milestones[2].color, milestones[3].color][i], opacity: 0.4 + i * 0.2 }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 8 + i * 8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              From foundation to full-chain energy leader
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
