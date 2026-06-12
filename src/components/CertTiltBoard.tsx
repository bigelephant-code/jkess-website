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
  { title: 'CE Certification', description: 'EU health, safety, and environmental compliance.', image: '/images/certifications/cert-1.jpg', category: 'European', color: '#5b5bff' },
  { title: 'RoHS Compliance', description: 'Hazardous substance restriction compliance.', image: '/images/certifications/cert-2.jpg', category: 'European', color: '#a66cd9' },
  { title: 'ISO 9001:2025', description: 'Quality management system certification.', image: '/images/certifications/cert-3.jpg', category: 'Quality', color: '#f58a8a' },
  { title: 'UN38.3 Test Report', description: 'Lithium battery transportation safety test.', image: '/images/certifications/cert-4.jpg', category: 'Safety', color: '#22c55e' },
  { title: 'FCC Certification', description: 'EMI compliance for electronic products.', image: '/images/certifications/cert-5.jpg', category: 'International', color: '#06b6d4' },
  { title: 'UL Recognition', description: 'Component safety recognition.', image: '/images/certifications/cert-6.jpg', category: 'Safety', color: '#eab308' },
  { title: 'IEC 62133', description: 'Secondary cells portable safety standard.', image: '/images/certifications/cert-7.jpg', category: 'Safety', color: '#ec4899' },
  { title: 'CB Scheme', description: 'IECEE global product certification.', image: '/images/certifications/cert-8.jpg', category: 'International', color: '#8b5cf6' },
  { title: 'WEEE Directive', description: 'Waste electrical equipment compliance.', image: '/images/certifications/cert-9.jpg', category: 'European', color: '#14b8a6' },
  { title: 'REACH Regulation', description: 'Chemical substance safety compliance.', image: '/images/certifications/cert-10.jpg', category: 'European', color: '#f97316' },
]

const cardPositions = [
  { left: '4%', top: '16%' },
  { left: '22%', top: '14%' },
  { left: '40%', top: '12%' },
  { left: '58%', top: '14%' },
  { left: '76%', top: '16%' },
  { left: '4%', top: '56%' },
  { left: '22%', top: '58%' },
  { left: '40%', top: '60%' },
  { left: '58%', top: '58%' },
  { left: '76%', top: '56%' },
]

/* ─── Floating particle ─── */
function FloatParticle({ x, y, color, delay, size = 2 }: { x: number; y: number; color: string; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.25 }}
      animate={{ y: [0, -12, 0], opacity: [0.15, 0.45, 0.15] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function CertTiltBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 })

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

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section className="relative bg-white overflow-hidden py-16">
      <div className="relative z-10 mx-auto px-6 max-w-[1580px]">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto cursor-default w-full"
          style={{ perspective: 1200, height: 680 }}
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
            {/* ★ WALL SURFACE — premium dark showcase board */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a0a14 0%, #141428 25%, #1a1a30 50%, #12122a 75%, #08081a 100%)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(91,91,255,0.05)',
              }}
            >
              {/* Gradient border - blue to purple to pink */}
              <div className="absolute inset-0 rounded-3xl opacity-40" style={{
                background: 'linear-gradient(135deg, rgba(91,91,255,0.2), rgba(166,108,217,0.1), rgba(245,138,138,0.05), rgba(91,91,255,0.15))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1.5px',
              }} />

              {/* Vignette overlay — darkens edges for depth */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                }} />

              {/* Premium subtle grid texture */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(91,91,255,0.06) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(91,91,255,0.06) 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                }} />

              {/* Main ambient glow — soft blue-purple center light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #5b5bff 0%, #a66cd9 30%, transparent 60%)' }} />

              {/* Secondary glow — warm accent at bottom */}
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, #f58a8a, transparent)' }} />

              {/* Top reflective sheen */}
              <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-3xl opacity-[0.03]"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
                }} />
            </div>

            {/* ★ FLOATING DECORATIVE PARTICLES */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <FloatParticle x={6} y={8} color="#5b5bff" delay={0} size={2.5} />
              <FloatParticle x={94} y={6} color="#a66cd9" delay={0.8} size={2} />
              <FloatParticle x={3} y={48} color="#f58a8a" delay={1.6} size={1.5} />
              <FloatParticle x={97} y={55} color="#5b5bff" delay={2.4} size={2} />
              <FloatParticle x={8} y={92} color="#a66cd9" delay={3.2} size={1.5} />
              <FloatParticle x={92} y={94} color="#f58a8a" delay={4} size={2.5} />
              <FloatParticle x={50} y={2} color="#22c55e" delay={1.2} size={1.5} />
              <FloatParticle x={50} y={98} color="#06b6d4" delay={3} size={1.5} />
            </div>

            {/* ★ WALL TITLE */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                <span className="text-white">Certified</span>{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #5b5bff, #a66cd9, #f58a8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Excellence</span>
              </h2>
              {/* Title underline accent */}
              <div className="mx-auto mt-1.5 w-16 h-[2px] rounded-full opacity-50"
                style={{ background: 'linear-gradient(90deg, #5b5bff, #a66cd9, #f58a8a)' }} />
            </div>

            {/* ★ CERTIFICATE CARDS — glass premium style */}
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer group"
                style={{
                  left: cardPositions[i].left,
                  top: cardPositions[i].top,
                  transform: `translateZ(${i % 2 === 0 ? 10 : -10}px)`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ z: 40, transition: { duration: 0.3 } }}
                onClick={() => setExpandedIndex(i)}
              >
                {/* Card ambient glow on hover */}
                <motion.div
                  className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"
                  style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }}
                />

                {/* Card — glass effect */}
                <motion.div
                  className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    boxShadow: `0 12px 48px rgba(0,0,0,0.4), 0 0 20px ${cert.color}15`,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Color accent bar */}
                  <div className="h-[2px] w-full opacity-60"
                    style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}44)` }} />

                  {/* Certificate image */}
                  <div className="relative w-full" style={{ height: 'calc(100% - 2px)' }}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-6 pb-2 px-3">
                      <h3 className="text-white text-[10px] font-semibold leading-tight truncate tracking-wide">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
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
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-lg w-full rounded-2xl p-8 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #141428, #1a1a30)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedIndex(-1)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <X size={16} />
            </button>
            <div className="text-center">
              <div className="w-full max-h-[55vh] mx-auto rounded-xl overflow-hidden mb-5 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <img src={certificates[expandedIndex].image} alt={certificates[expandedIndex].title}
                  className="w-full h-auto object-contain max-h-[55vh]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{certificates[expandedIndex].title}</h3>
              <span className="inline-block text-xs uppercase tracking-[0.12em] font-semibold px-3 py-0.5 rounded-full mb-3"
                style={{ background: `${certificates[expandedIndex].color}15`, color: certificates[expandedIndex].color }}>
                {certificates[expandedIndex].category}
              </span>
              <p className="text-gray-400 text-sm max-w-md mx-auto">{certificates[expandedIndex].description}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}> <ChevronLeft size={16} /> </button>
                <span className="text-xs text-gray-600">{expandedIndex + 1} / {certificates.length}</span>
                <button onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}> <ChevronRight size={16} /> </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
