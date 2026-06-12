'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Certificate {
  title: string
  description: string
  image: string
  category: string
  color: string
}

const certificates: Certificate[] = [
  { title: 'CE Certification', description: 'EU health, safety, and environmental compliance.', image: '/images/certifications/ce.jpg', category: 'European', color: '#5b5bff' },
  { title: 'RoHS Compliance', description: 'Hazardous substance restriction compliance.', image: '/images/certifications/rohs.jpg', category: 'European', color: '#a66cd9' },
  { title: 'ISO 9001:2025', description: 'Quality management system certification.', image: '/images/certifications/iso9001.jpg', category: 'Quality', color: '#f58a8a' },
  { title: 'UN38.3 Test Report', description: 'Lithium battery transportation safety test.', image: '/images/certifications/un383.jpg', category: 'Safety', color: '#22c55e' },
  { title: 'FCC Certification', description: 'EMI compliance for electronic products.', image: '/images/certifications/fcc.jpg', category: 'International', color: '#06b6d4' },
  { title: 'UL Recognition', description: 'Component safety recognition.', image: '/images/certifications/ul.jpg', category: 'Safety', color: '#eab308' },
]

/* ═══ Floating 3D certificate card ═══ */
function CertCard({
  cert,
  index,
  mouseX,
  mouseY,
  onClick,
}: {
  cert: Certificate
  index: number
  mouseX: any
  mouseY: any
  onClick: () => void
}) {
  // Different depth layers for parallax
  const depths = [40, -30, 60, -50, 35, -45]
  const rotOffsets = [8, -6, 10, -8, 5, -7]
  const xOffsets = [-80, 100, -130, 90, -50, 140]
  const yOffsets = [-60, -80, 20, 60, -30, 40]

  const depth = depths[index]
  const zTranslate = useTransform(mouseX, [-1, 1], [-depth * 0.5, depth * 0.5])

  const rotateX = useTransform(mouseY, [-1, 1], [rotOffsets[index], -rotOffsets[index]])
  const rotateY = useTransform(mouseX, [-1, 1], [-rotOffsets[index], rotOffsets[index]])

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `calc(50% + ${xOffsets[index]}px)`,
        top: `calc(50% + ${yOffsets[index]}px)`,
        x: zTranslate,
        perspective: 800,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <motion.div
        className="w-44 aspect-[3/4] rounded-xl overflow-hidden relative
          border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01]
          group-hover:border-white/[0.2] transition-all duration-300
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ rotateX, rotateY }}
        whileHover={{ z: 40, transition: { duration: 0.3 } }}
      >
        {/* Color accent */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }} />
        <div className="flex flex-col items-center justify-center p-5 text-center h-[calc(100%-4px)]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3
            border border-white/[0.06] group-hover:scale-110 transition-transform duration-300"
            style={{ background: `${cert.color}15` }}>
            🏅
          </div>
          <h3 className="text-white font-semibold text-sm mb-1.5 leading-snug">{cert.title}</h3>
          <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2 mb-2">{cert.description}</p>
          <span className="text-[9px] uppercase tracking-[0.12em] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${cert.color}15`, color: cert.color }}>
            {cert.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CertTiltBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState(-1)

  // Mouse position relative to container center (-1 to 1)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring for smooth animation
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Background board rotation
  const boardRotateX = useTransform(smoothY, [-1, 1], [12, -12])
  const boardRotateY = useTransform(smoothX, [-1, 1], [-12, 12])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    mouseX.set(dx)
    mouseY.set(dy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id="certifications" className="relative bg-[#010101] py-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-10 animate-float-slow"
          style={{ background: 'radial-gradient(circle, #5b5bff 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full opacity-8 animate-float-slower"
          style={{ background: 'radial-gradient(circle, #a66cd9 0%, transparent 70%)' }} />
        <div className="absolute bottom-[15%] left-[30%] w-[450px] h-[450px] rounded-full opacity-6 animate-float-slow"
          style={{ background: 'radial-gradient(circle, #f58a8a 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-4">
            <Sparkles size={12} className="text-[#a66cd9]" />
            <span>Certifications &amp; Compliance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Certified <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Move your mouse across the board to explore our certifications in 3D
          </p>
        </div>

        {/* ═══════ 3D TILT BOARD ═══════ */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto rounded-3xl overflow-hidden cursor-default"
          style={{ maxWidth: 760, height: 520, perspective: 1000 }}
        >
          {/* Background board */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-white/[0.04]"
            style={{
              rotateX: boardRotateX,
              rotateY: boardRotateY,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 50%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            {/* Board inner glow */}
            <div className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(91,91,255,0.03) 0%, transparent 60%)',
              }} />
          </motion.div>

          {/* Floating certificates */}
          <div className="absolute inset-0" style={{ perspective: 1000, transformStyle: 'preserve-3d' }}>
            {certificates.map((cert, i) => (
              <CertCard
                key={i}
                cert={cert}
                index={i}
                mouseX={smoothX}
                mouseY={smoothY}
                onClick={() => setExpandedIndex(i)}
              />
            ))}
          </div>

          {/* Hover hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 uppercase tracking-[0.15em] pointer-events-none">
            Move mouse to explore
          </div>
        </div>
      </div>

      {/* ═══════ LIGHTBOX ═══════ */}
      {expandedIndex >= 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setExpandedIndex(-1)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-md w-full bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedIndex(-1)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5 border border-white/[0.06]"
                style={{ background: `${certificates[expandedIndex].color}15` }}>🏅</div>
              <h3 className="text-2xl font-bold text-white mb-1">{certificates[expandedIndex].title}</h3>
              <span className="inline-block text-xs uppercase tracking-[0.12em] font-semibold px-3 py-0.5 rounded-full mb-4"
                style={{ background: `${certificates[expandedIndex].color}15`, color: certificates[expandedIndex].color }}>
                {certificates[expandedIndex].category}
              </span>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto text-sm">
                {certificates[expandedIndex].description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <ChevronLeft size={16} /> </button>
                <span className="text-xs text-gray-600">{expandedIndex + 1} / {certificates.length}</span>
                <button onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <ChevronRight size={16} /> </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
