'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

const projectImages = Array.from({ length: 12 }, (_, index) => `/images/projects/project-${index + 1}.webp`)

export default function MadeWithShowcase() {
  const t = useTranslate()
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 })
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6])
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6])

  function handleMouseMove(event: React.MouseEvent) {
    if (shouldReduceMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(Math.max(-1, Math.min(1, (event.clientX - centerX) / (rect.width / 2))))
    mouseY.set(Math.max(-1, Math.min(1, (event.clientY - centerY) / (rect.height / 2))))
  }

  function resetTilt() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative isolate -mb-px overflow-hidden bg-gray-50">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative bg-gray-50"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
          }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 px-4 pb-24 pt-20 sm:grid-cols-3 md:grid-cols-4 md:gap-3 md:px-8 md:pb-28 md:pt-28">
              {projectImages.map((src, index) => (
                <motion.div
                  key={src}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Project ${index + 1}`}
                    fill
                    className={shouldReduceMotion ? 'object-cover' : 'object-cover transition-transform duration-500 group-hover:scale-110'}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-white/70 transition-opacity duration-500 group-hover:opacity-0" />
                </motion.div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50/80" />
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 drop-shadow-sm sm:text-5xl md:text-7xl">
            {t('madeWith.title')}{' '}
            <span className="text-green-600">{t('madeWith.brand')}</span>
          </h2>
          <p className="mt-4 max-w-md text-center text-base text-gray-600 drop-shadow-sm md:text-lg">
            {t('madeWith.desc')}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3 bg-gray-50" />
    </section>
  )
}
