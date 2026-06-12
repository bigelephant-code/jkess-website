'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react'

interface Certificate {
  title: string
  description: string
  image: string
  category: string
}

const certificates: Certificate[] = [
  {
    title: 'CE Certification',
    description: 'Product compliance with EU health, safety, and environmental standards.',
    image: '/images/certifications/ce.jpg',
    category: 'European',
  },
  {
    title: 'RoHS Compliance',
    description: 'Restriction of Hazardous Substances directive compliance.',
    image: '/images/certifications/rohs.jpg',
    category: 'European',
  },
  {
    title: 'ISO 9001:2025',
    description: 'Quality management system certification for manufacturing processes.',
    image: '/images/certifications/iso9001.jpg',
    category: 'Quality',
  },
  {
    title: 'UN38.3 Test Report',
    description: 'United Nations transportation safety test for lithium batteries.',
    image: '/images/certifications/un383.jpg',
    category: 'Safety',
  },
  {
    title: 'FCC Certification',
    description: 'Federal Communications Commission electromagnetic interference compliance.',
    image: '/images/certifications/fcc.jpg',
    category: 'International',
  },
  {
    title: 'UL recognized',
    description: 'Underwriters Laboratories component recognition for safety.',
    image: '/images/certifications/ul.jpg',
    category: 'Safety',
  },
]

export default function Cert3DCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)

  const total = certificates.length
  const radius = 320

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total)
    setIsFlipped(false)
  }

  const handleDragEnd = () => {
    const x = dragX.get()
    if (x > 50) goTo(activeIndex - 1)
    else if (x < -50) goTo(activeIndex + 1)
  }

  // Auto-rotate
  useEffect(() => {
    if (expanded) return
    const interval = setInterval(() => {
      goTo(activeIndex + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [activeIndex, expanded])

  return (
    <section id="certifications" className="relative bg-[#010101] py-24 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #a66cd9, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* ═══════ 3D CAROUSEL ═══════ */}
        <div className="relative flex items-center justify-center perspective-[1200px]" style={{ minHeight: 480 }}>
          {/* Navigation arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-4 md:left-0 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-4 md:right-0 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>

          {/* 3D Carousel container */}
          <motion.div
            ref={containerRef}
            className="relative preserve-3d cursor-grab active:cursor-grabbing"
            style={{ width: 280, height: 380 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
          >
            {certificates.map((cert, i) => {
              const offset = i - activeIndex
              const absOffset = Math.abs(offset)
              const yAngle = offset * (360 / total)
              const isActive = i === activeIndex
              const zOffset = (absOffset === 0 ? 0 : absOffset === 1 || absOffset === total - 1 ? -80 : -180)

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 preserve-3d backface-hidden"
                  style={{
                    transform: `rotateY(${yAngle}deg) translateZ(${radius + zOffset}px)`,
                    opacity: absOffset === 0 ? 1 : absOffset <= 2 ? 0.6 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  animate={{
                    scale: isActive ? 1 : absOffset <= 2 ? 0.85 : 0.7,
                  }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Certificate card */}
                  <motion.div
                    className="w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer"
                    onClick={() => { if (isActive) { setExpandedIndex(i); setExpanded(true) }}}
                    whileHover={isActive ? { y: -6 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-2xl border border-white/[0.08] group-hover:border-white/[0.2] transition-all duration-300" />

                    {/* Certificate image placeholder / icon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5b5bff]/20 to-[#a66cd9]/20 
                        border border-white/[0.06] flex items-center justify-center text-3xl mb-4
                        group-hover:scale-110 transition-transform duration-300">
                        🏅
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-transparent 
                        group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5b5bff] group-hover:to-[#f58a8a] 
                        transition-all duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{cert.description}</p>
                      <span className="mt-3 text-[10px] uppercase tracking-[0.15em] font-semibold gradient-text">
                        {cert.category}
                      </span>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      bg-gradient-to-t from-[#5b5bff]/5 to-transparent pointer-events-none" />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-gradient-to-r from-[#5b5bff] to-[#a66cd9]'
                  : 'bg-white/[0.12] hover:bg-white/[0.25]'
              }`}
            />
          ))}
        </div>

        {/* Category filter pills */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {[...new Set(certificates.map(c => c.category))].map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full glass text-[11px] text-gray-500"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ LIGHTBOX EXPANDED VIEW ═══════ */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-2xl w-full bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Expanded certificate display */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-[#5b5bff]/20 to-[#a66cd9]/20 
                border border-white/[0.06] flex items-center justify-center text-5xl mb-6">
                🏅
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {certificates[expandedIndex].title}
              </h3>
              <span className="inline-block text-xs uppercase tracking-[0.15em] font-semibold gradient-text mb-4">
                {certificates[expandedIndex].category}
              </span>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-lg mx-auto">
                {certificates[expandedIndex].description}
              </p>

              {/* Previous / Next in lightbox */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setExpandedIndex(((expandedIndex - 1) % total + total) % total)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs text-gray-600">
                  {expandedIndex + 1} / {total}
                </span>
                <button
                  onClick={() => setExpandedIndex((expandedIndex + 1) % total)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
