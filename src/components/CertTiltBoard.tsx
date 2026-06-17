'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslate } from '@/i18n/client'
import Image from 'next/image'

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
  { title: 'CE UKCA', description: 'UKCA marking for products sold in Great Britain.', image: '/images/certifications/11.jpg', category: 'International', color: '#f43f5e' },
  { title: 'Battery Directive', description: 'EU battery collection and recycling compliance.', image: '/images/certifications/12.jpg', category: 'European', color: '#10b981' },
  { title: 'EMC Directive', description: 'Electromagnetic compatibility compliance for EU market.', image: '/images/certifications/13.jpg', category: 'European', color: '#6366f1' },
  { title: 'MSDS Certificate', description: 'Material safety data sheet for lithium battery transport.', image: '/images/certifications/14.jpg', category: 'Safety', color: '#d946ef' },
]

export default function CertTiltBoard() {
  const t = useTranslate()
  const [expandedIndex, setExpandedIndex] = useState(-1)

  return (
    <section className="relative overflow-hidden">

      <div className="relative z-10 mx-auto px-6 max-w-[1800px] py-16">
        {/* Module title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
{t('certified.title')?.split(' ')?.[0]} <span className="text-green-600">{t('certified.title')?.split(' ')?.slice(1)?.join(' ')}</span>
          </h2>
        </div>

        {/* Certificate wall — grid layout, perfectly aligned */}
        <div className="mx-auto w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-5">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                className="flex justify-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }}
                viewport={{ once: true }}
                onClick={() => setExpandedIndex(i)}
              >
                {/* Card glow */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-0 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card */}
                <motion.div
                  className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}
                  whileHover={{ y: -6, scale: 1.06, borderColor: cert.color, boxShadow: `0 12px 48px rgba(0,0,0,0.1), 0 0 20px ${cert.color}20` }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Color accent bar */}
                  <motion.div
                    className="h-1"
                    style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}44)` }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative w-full p-2" style={{ height: 'calc(100% - 4px)' }}>
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain transition-all duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 14vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-8 pb-2 px-3 z-10">
                      <h3 className="text-white text-[10px] font-semibold leading-tight truncate">{cert.title}</h3>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
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
            className="relative max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedIndex(-1)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"> <X size={16} /> </button>
            <div className="text-center">
              <div className="w-full max-h-[50vh] mx-auto rounded-xl overflow-hidden mb-5 border border-gray-200 bg-gray-50 flex items-center justify-center">
                <img src={certificates[expandedIndex].image} alt={certificates[expandedIndex].title} className="w-full h-auto object-contain max-h-[50vh]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{certificates[expandedIndex].title}</h3>
              <span className="inline-block text-xs uppercase tracking-[0.12em] font-semibold px-3 py-0.5 rounded-full mb-4" style={{ background: `${certificates[expandedIndex].color}15`, color: certificates[expandedIndex].color }}>{certificates[expandedIndex].category}</span>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-sm mx-auto text-sm">{certificates[expandedIndex].description}</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => setExpandedIndex(((expandedIndex - 1) % certificates.length + certificates.length) % certificates.length)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"> <ChevronLeft size={16} /> </button>
                <span className="text-xs text-gray-400">{expandedIndex + 1} / {certificates.length}</span>
                <button onClick={() => setExpandedIndex((expandedIndex + 1) % certificates.length)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"> <ChevronRight size={16} /> </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
