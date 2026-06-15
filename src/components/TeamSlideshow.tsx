'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const teamImages = [
  '/images/team/072986de101b8dd30cb2a3ff111126f.jpg',
  '/images/team/4 拷贝.jpg',
  '/images/team/a18713ac6f8676f0700bf46e5fe324e.jpg',
  '/images/team/客户合作照片 (1).jpg',
  '/images/team/客户合作照片 (10).jpg',
  '/images/team/客户合作照片 (11).jpg',
  '/images/team/客户合作照片 (2).jpg',
  '/images/team/客户合作照片 (7).jpg',
  '/images/team/客户合作照片 (8).jpg',
  '/images/team/客户合作照片 (9).jpg',
  '/images/team/微信图片_20250717183700.jpg',
  '/images/team/微信图片_20251229185847_474_168.jpg',
  '/images/team/微信图片_20251229185905_481_168.jpg',
  '/images/team/微信图片_20251229190216_559_168.jpg',
  '/images/team/微信图片_20260122134047_683_110.jpg',
  '/images/team/微信图片_20260306184840_931_168.jpg',
]

export default function TeamSlideshow() {
  const [visibleImages, setVisibleImages] = useState<number[]>([0, 1, 2, 3])
  const [bgImage, setBgImage] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cycle through large background images (slow crossfade)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBgImage((prev) => (prev + 1) % teamImages.length)
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Cycle through visible grid images
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const next = [...prev]
        // Shift: remove first, add a new one at the end
        next.shift()
        const lastIdx = prev[prev.length - 1]
        next.push((lastIdx + 1) % teamImages.length)
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* ===== Full background slideshow ===== */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${teamImages[bgImage]})`,
                filter: 'brightness(0.6)',
              }}
            />
            {/* Slow zoom animation */}
            <style jsx>{`
              .ken-burns {
                animation: kenburns 8s ease-in-out infinite alternate;
              }
              @keyframes kenburns {
                0% { transform: scale(1); }
                100% { transform: scale(1.08); }
              }
            `}</style>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* ===== Content area ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Our <span className="text-green-400">Team</span>
          </h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            The people behind JKESS — dedicated, passionate, and committed to powering a cleaner future.
          </p>
        </motion.div>

        {/* Photo mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {visibleImages.map((imgIdx, i) => (
            <motion.div
              key={`${imgIdx}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className={`
                relative rounded-xl overflow-hidden shadow-lg
                ${i === 0 ? 'row-span-2 col-span-2 md:row-span-2 md:col-span-2' : ''}
                ${i === 1 ? 'col-span-1' : ''}
                ${i === 2 ? 'col-span-1' : ''}
                ${i === 3 ? 'col-span-2 md:col-span-2' : ''}
              `}
              style={{ aspectRatio: i === 0 ? '16/10' : i === 3 ? '16/9' : '4/3' }}
            >
              <img
                src={teamImages[imgIdx]}
                alt="JKESS Team"
                className="w-full h-full object-cover transition-transform duration-7000 hover:scale-110"
                style={{ transitionDuration: '7s' }}
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent mt-10 max-w-md mx-auto"
        />
      </div>
    </section>
  )
}
