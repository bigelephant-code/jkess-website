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
      <div className="relative z-10 mx-auto px-6 max-w-[1580px]">
        {/* ═══════ 3D TILT WALL ═══════ */}
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
            {/* Wall background — premium dark display panel */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #0d0d1a 0%, #151525 30%, #1a1a2e 50%, #12121f 70%, #0a0a15 100%)',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(91,91,255,0.03)',
              }}
            >
              {/* Subtle top light reflection */}
              <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-3xl opacity-[0.02]"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                }} />

              {/* Very subtle texture micro-grid */}
              <div className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />

              {/* Soft center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
                style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />
            </div>

            {/* ── Wall Title ── */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                <span className="text-white">Certified</span>{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #5b5bff, #a66cd9, #f58a8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Excellence</span>
              </h2>
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
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, z: 45, y: -6 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setExpandedIndex(i)}
              >
                {/* Card glow - stronger */}
                <motion.div 
                  className="absolute -inset-4 rounded-2xl opacity-0 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card */}
                <motion.div 
                  className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'linear-gradient(180deg, #1a1a2e, #0d0d1a)',
                  }}
                  whileHover={{
                    borderColor: cert.color,
                    boxShadow: `0 12px 48px rgba(0,0,0,0.5), 0 0 20px ${cert.color}25`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Color accent bar - animated width */}
                  <motion.div 
                    className="h-1"
                    style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}44)` }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative w-full" style={{ height: 'calc(100% - 4px)' }}>
                    {/* Certificate image */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="absolute inset-0 w-full h-full object-contain p-2 transition-all duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Bottom overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-8 pb-2 px-3">
                      <h3 className="text-white text-[10px] font-semibold leading-tight truncate">{cert.title}</h3>
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
            transition={{ duration: 0.3 }}
            className="relative max-w-md w-full bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedIndex(-1)} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white"> <X size={16} /> </button>
            <div className="text-center">
              <div className="w-full max-h-[50vh] mx-auto rounded-xl overflow-hidden mb-5 border border-white/[0.06] bg-[#1a1a2e] flex items-center justify-center">
                      <img src={certificates[expandedIndex].image} alt={certificates[expandedIndex].title} className="w-full h-auto object-contain max-h-[50vh]" />
                    </div>
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
