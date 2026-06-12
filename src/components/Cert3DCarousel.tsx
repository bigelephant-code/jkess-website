'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Maximize2, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

interface Certificate {
  title: string
  description: string
  image: string
  category: string
  color: string // gradient color accent
}

const certificates: Certificate[] = [
  {
    title: 'CE Certification',
    description: 'Product compliance with EU health, safety, and environmental protection standards.',
    image: '/images/certifications/ce.jpg',
    category: 'European',
    color: '#5b5bff',
  },
  {
    title: 'RoHS Compliance',
    description: 'Restriction of Hazardous Substances directive compliance for electronic products.',
    image: '/images/certifications/rohs.jpg',
    category: 'European',
    color: '#a66cd9',
  },
  {
    title: 'ISO 9001:2025',
    description: 'Quality management system certification for manufacturing and production processes.',
    image: '/images/certifications/iso9001.jpg',
    category: 'Quality',
    color: '#f58a8a',
  },
  {
    title: 'UN38.3 Test Report',
    description: 'United Nations transportation safety test for lithium battery shipments.',
    image: '/images/certifications/un383.jpg',
    category: 'Safety',
    color: '#22c55e',
  },
  {
    title: 'FCC Certification',
    description: 'Federal Communications Commission electromagnetic interference compliance.',
    image: '/images/certifications/fcc.jpg',
    category: 'International',
    color: '#06b6d4',
  },
  {
    title: 'UL Recognition',
    description: 'Underwriters Laboratories component recognition for product safety.',
    image: '/images/certifications/ul.jpg',
    category: 'Safety',
    color: '#eab308',
  },
]

/* ─── Floating orb background ─── */
function AmbientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-10 animate-float-slow"
        style={{ background: 'radial-gradient(circle, #5b5bff 0%, transparent 70%)' }} />
      <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full opacity-8 animate-float-slower"
        style={{ background: 'radial-gradient(circle, #a66cd9 0%, transparent 70%)' }} />
      <div className="absolute bottom-[15%] left-[30%] w-[450px] h-[450px] rounded-full opacity-6 animate-float-slow"
        style={{ background: 'radial-gradient(circle, #f58a8a 0%, transparent 70%)' }} />
      <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[350px] rounded-full opacity-5 animate-float-slower"
        style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

/* ─── Floating certificate card ─── */
function FloatingCard({
  cert,
  index,
  onClick,
}: {
  cert: Certificate
  index: number
  onClick: () => void
}) {
  // Different positions and animations for each card
  const positions = [
    { x: -30, y: -20, rotate: -4, delay: 0 },
    { x: 10, y: -35, rotate: 2, delay: 0.15 },
    { x: 40, y: -15, rotate: -1, delay: 0.3 },
    { x: -25, y: 5, rotate: 3, delay: 0.1 },
    { x: 15, y: 15, rotate: -3, delay: 0.25 },
    { x: -10, y: 30, rotate: 1, delay: 0.35 },
  ]

  const pos = positions[index % positions.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: pos.delay, ease: [0.23, 1, 0.32, 1] }}
      className="absolute cursor-pointer group"
      style={{
        left: `calc(50% + ${pos.x}%)`,
        top: `calc(50% + ${pos.y}%)`,
        transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.08,
        y: -8,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
      }}
      onClick={onClick}
    >
      {/* Ambient glow behind card on hover */}
      <div
        className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }}
      />

      {/* Card */}
      <div className="relative w-52 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden
        border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01]
        group-hover:border-white/[0.2] transition-all duration-300
        shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
        {/* Top color accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }}
        />

        {/* Card content */}
        <div className="flex flex-col items-center justify-center p-6 text-center h-full">
          {/* Certificate icon/placeholder */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-4
              border border-white/[0.06] transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${cert.color}15` }}
          >
            🏅
          </div>

          <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{cert.title}</h3>
          <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-3">
            {cert.description}
          </p>

          {/* Category tag */}
          <span
            className="inline-block text-[10px] uppercase tracking-[0.12em] font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: `${cert.color}15`,
              color: cert.color,
            }}
          >
            {cert.category}
          </span>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default function CertDisplayBoard() {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="certifications" ref={sectionRef} className="relative bg-[#010101] py-24 overflow-hidden">
      <AmbientBg />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-4">
            <Sparkles size={12} className="text-[#a66cd9]" />
            <span>Certifications &amp; Compliance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Certified <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Our products meet rigorous international standards for quality and safety
          </p>
        </div>

        {/* ═══════ FLOATING CARDS AREA ═══════ */}
        <div className="relative w-full" style={{ height: 560 }}>
          {isInView && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central glow */}
                <div className="w-40 h-40 rounded-full opacity-[0.06]"
                  style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />
              </div>

              {certificates.map((cert, i) => (
                <FloatingCard
                  key={i}
                  cert={cert}
                  index={i}
                  onClick={() => setExpandedIndex(i)}
                />
              ))}
            </>
          )}
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
            className="relative max-w-lg w-full bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedIndex(-1)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center">
              {/* Large icon */}
              <div
                className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6
                  border border-white/[0.06]"
                style={{ background: `${certificates[expandedIndex].color}15` }}
              >
                🏅
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {certificates[expandedIndex].title}
              </h3>
              <span
                className="inline-block text-xs uppercase tracking-[0.12em] font-semibold px-3 py-0.5 rounded-full mb-4"
                style={{
                  background: `${certificates[expandedIndex].color}15`,
                  color: certificates[expandedIndex].color,
                }}
              >
                {certificates[expandedIndex].category}
              </span>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md mx-auto text-sm">
                {certificates[expandedIndex].description}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-gray-600">
                  {expandedIndex + 1} / {certificates.length}
                </span>
                <button
                  onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
