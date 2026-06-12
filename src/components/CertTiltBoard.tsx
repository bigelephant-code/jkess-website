'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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

const cardPositions = [
  { left: '10%', top: '15%' },
  { left: '38%', top: '8%' },
  { left: '66%', top: '12%' },
  { left: '15%', top: '52%' },
  { left: '42%', top: '58%' },
  { left: '68%', top: '55%' },
]

export default function CertTiltBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 })

  // The whole wall rotates as one
  const wallRotateX = useTransform(smoothY, [-1, 1], [15, -15])
  const wallRotateY = useTransform(smoothX, [-1, 1], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))))
    mouseY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative bg-white overflow-hidden py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ═══════ 3D TILT WALL ═══════ */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto cursor-default"
          style={{ perspective: 1200, maxWidth: 800, height: 520 }}
        >
          {/* ── The entire wall rotates as ONE solid object ── */}
          <motion.div
            className="absolute inset-0"
            style={{
              rotateX: wallRotateX,
              rotateY: wallRotateY,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
            }}
            transition={{ duration: 0.1 }}
          >
            {/* Wall background — solid board */}
            <div className="absolute inset-0 rounded-3xl border border-black/[0.06] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 50%, rgba(91,91,255,0.03) 100%)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Wall inner texture — subtle grid */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />
              {/* Wall glow center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />
            </div>

            {/* ── Certificates stuck ON the wall ── */}
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer group"
                style={{
                  left: cardPositions[i].left,
                  top: cardPositions[i].top,
                  // Small individual z-depth so they sit "on" the wall surface
                  transform: `translateZ(${i % 2 === 0 ? 8 : -8}px)`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ z: 30, transition: { duration: 0.3 } }}
                onClick={() => setExpandedIndex(i)}
              >
                {/* Card glow */}
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
                  style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }} />

                {/* Card */}
                <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden
                  border border-white/[0.15] bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a]
                  group-hover:border-white/[0.2] transition-all duration-300
                  shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }} />
                  <div className="flex flex-col items-center justify-center p-5 text-center h-[calc(100%-4px)]">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 border border-white/[0.06] group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${cert.color}15` }}>🏅</div>
                    <h3 className="text-white font-semibold text-sm mb-1.5 leading-snug">{cert.title}</h3>
                    <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2 mb-2">{cert.description}</p>
                    <span className="text-[9px] uppercase tracking-[0.12em] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${cert.color}15`, color: cert.color }}>{cert.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


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
            <button onClick={() => setExpandedIndex(-1)} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <X size={16} /> </button>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5 border border-white/[0.06]" style={{ background: `${certificates[expandedIndex].color}15` }}>🏅</div>
              <h3 className="text-2xl font-bold text-white mb-1">{certificates[expandedIndex].title}</h3>
              <span className="inline-block text-xs uppercase tracking-[0.12em] font-semibold px-3 py-0.5 rounded-full mb-4" style={{ background: `${certificates[expandedIndex].color}15`, color: certificates[expandedIndex].color }}>{certificates[expandedIndex].category}</span>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto text-sm">{certificates[expandedIndex].description}</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)} className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <ChevronLeft size={16} /> </button>
                <span className="text-xs text-gray-600">{expandedIndex + 1} / {certificates.length}</span>
                <button onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)} className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <ChevronRight size={16} /> </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
