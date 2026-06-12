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

/* ─── Subtle 3D tilt wrapper ─── */
function TiltContainer({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 })
  const tiltX = useTransform(smoothY, [-1, 1], [6, -6])
  const tiltY = useTransform(smoothX, [-1, 1], [-6, 6])

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    mouseX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))))
    mouseY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))))
  }
  const handleLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ ...style, perspective: 1200, rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Certificate card ─── */
function CertCard({ cert, index, onClick }: { cert: Certificate; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ z: 20 }}
      onClick={onClick}
    >
      {/* Card body — clean frame design */}
      <div className="relative rounded-xl overflow-hidden transition-all duration-500"
        style={{
          background: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        {/* Image area */}
        <div className="relative w-full" style={{ paddingBottom: '133%' }}>
          <img
            src={cert.image}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Bottom info strip */}
        <div className="px-3 py-2 border-t border-black/[0.03]">
          <h3 className="text-[11px] font-medium text-gray-700 leading-tight truncate tracking-wide">
            {cert.title}
          </h3>
        </div>
      </div>

      {/* Hover shadow */}
      <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: `0 8px 30px rgba(0,0,0,0.06), 0 0 0 1px ${cert.color}15`,
        }} />
    </motion.div>
  )
}

const cardPositions = [
  { left: '2%', top: '8%' },
  { left: '21%', top: '6%' },
  { left: '40%', top: '4%' },
  { left: '59%', top: '6%' },
  { left: '78%', top: '8%' },
  { left: '2%', top: '52%' },
  { left: '21%', top: '54%' },
  { left: '40%', top: '56%' },
  { left: '59%', top: '54%' },
  { left: '78%', top: '52%' },
]

export default function CertTiltBoard() {
  const [expandedIndex, setExpandedIndex] = useState(-1)

  return (
    <section className="relative bg-white overflow-hidden py-20">
      <div className="relative z-10 mx-auto px-6 max-w-[1580px]">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            <span className="text-gray-900">Certified</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #5b5bff, #a66cd9, #f58a8a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Excellence</span>
          </h2>
          <div className="mx-auto mt-3 w-12 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, #5b5bff, #a66cd9, #f58a8a)' }} />
          <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
            International certifications &amp; compliance standards
          </p>
        </div>

        {/* 3D Tilt Gallery */}
        <TiltContainer className="relative mx-auto w-full" style={{ height: 600 }}>
          {/* Light background board */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fafafa, #f5f5f8, #f8f8fc)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 4px rgba(0,0,0,0.02)',
            }}
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.3]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }} />
          </div>

          {/* Certificate cards */}
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: cardPositions[i].left,
                top: cardPositions[i].top,
                width: '18%',
                transform: `translateZ(${i % 2 === 0 ? 8 : -8}px)`,
              }}
            >
              <CertCard cert={cert} index={i} onClick={() => setExpandedIndex(i)} />
            </motion.div>
          ))}
        </TiltContainer>
      </div>

      {/* Lightbox */}
      {expandedIndex >= 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setExpandedIndex(-1)}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-xl w-full bg-white rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedIndex(-1)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors bg-gray-100">
              <X size={16} />
            </button>
            <div className="text-center">
              <div className="w-full max-h-[55vh] mx-auto rounded-xl overflow-hidden mb-5 bg-gray-50">
                <img src={certificates[expandedIndex].image} alt={certificates[expandedIndex].title}
                  className="w-full h-auto object-contain max-h-[55vh]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{certificates[expandedIndex].title}</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">{certificates[expandedIndex].description}</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-gray-400">{expandedIndex + 1} / {certificates.length}</span>
                <button onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all">
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
