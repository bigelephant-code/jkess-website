'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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

export default function TeamSlideshow({ children }: { children?: React.ReactNode }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState<number | null>(null)
  const [fadeProgress, setFadeProgress] = useState(0) // 0 = fully current, 1 = fully next
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (currentIdx + 1) % teamImages.length
      setNextIdx(next)
    }, 3000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIdx])

  // When nextIdx is set, start crossfade
  useEffect(() => {
    if (nextIdx === null) return

    let start: number | null = null
    const duration = 1000 // 1s crossfade

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setFadeProgress(eased)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCurrentIdx(nextIdx)
        setNextIdx(null)
        setFadeProgress(0)
      }
    }

    requestAnimationFrame(animate)
  }, [nextIdx])

  const currentOpacity = 1 - fadeProgress
  const nextOpacity = fadeProgress

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* ===== Full background slideshow ===== */}
      <div className="absolute inset-0">
        {/* Current image - fading out */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-none"
          style={{
            backgroundImage: `url(${teamImages[currentIdx]})`,
            filter: 'brightness(0.55)',
            opacity: currentOpacity,
            zIndex: nextIdx !== null ? 0 : 1,
          }}
        />
        {/* Next image - fading in */}
        {nextIdx !== null && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-none"
            style={{
              backgroundImage: `url(${teamImages[nextIdx]})`,
              filter: 'brightness(0.55)',
              opacity: nextOpacity,
              zIndex: 1,
            }}
          />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />

      {/* ===== Foreground content ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-20 md:pb-28">
        {children}
      </div>
    </section>
  )
}
