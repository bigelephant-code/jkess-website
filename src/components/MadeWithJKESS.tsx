'use client'

import { useRef, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

const projectImages = [
  { src: '/images/projects/project-1.jpg' },
  { src: '/images/projects/project-2.png' },
  { src: '/images/projects/project-3.png' },
  { src: '/images/projects/project-4.jpg' },
  { src: '/images/projects/project-5.jpg' },
  { src: '/images/projects/project-6.jpg' },
  { src: '/images/projects/project-7.png' },
  { src: '/images/projects/project-8.png' },
  { src: '/images/projects/project-9.png' },
  { src: '/images/projects/project-10.png' },
  { src: '/images/projects/project-11.png' },
  { src: '/images/projects/project-12.png' },
]

export default function MadeWithJKESS() {
  const t = useTranslate()
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse for 3D parallax tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Map mouse position (-1 to 1) to rotation
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6])
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6])

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))))
    mouseY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))))
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{ perspective: 1200 }}
      >
        {/* ─── 3D Parallax container ─── */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
          }}
          transition={{ duration: 0.1 }}
        >
          {/* ─── Image grid with creamy white overlay ─── */}
          <div className="relative">
            {/* Image grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-28">
              {projectImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <Image
                    src={img.src}
                    alt={`Project ${i + 1}`}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    loading="lazy"
                  />
                  {/* Creamy white overlay — clears on hover */}
                  <div className="absolute inset-0 bg-white/70 transition-opacity duration-500 group-hover:opacity-0" />
                </motion.div>
              ))}
            </div>

            {/* ─── White gradient edges for smooth blend ─── */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-50 via-transparent to-gray-50/80" />
          </div>
        </motion.div>

        {/* ─── Floating title overlay (not affected by 3D tilt) ─── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 tracking-tight text-center drop-shadow-sm">
            {t('madeWith.title')}{' '}
            <span className="text-green-600">{t('madeWith.brand')}</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-md text-center drop-shadow-sm">
            {t('madeWith.desc')}
          </p>
        </div>
      </div>
    </section>
  )
}
