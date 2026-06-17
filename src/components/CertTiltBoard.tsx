'use client'

import { motion } from 'framer-motion'
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

  return (
    <section className="relative overflow-hidden">

      <div className="relative z-10 mx-auto px-6 max-w-[1800px] pt-10 pb-16">
        {/* Module title */}
        <div className="text-center mb-16">
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
                  whileHover={{ y: -8, scale: 1.15, borderColor: cert.color, boxShadow: `0 16px 48px rgba(0,0,0,0.12), 0 0 30px ${cert.color}30` }}
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
                      className="object-contain transition-all duration-500 ease-out group-hover:scale-125"
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

    </section>
  )
}
