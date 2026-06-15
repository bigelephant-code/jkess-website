'use client'

import { useState, useEffect, useRef } from 'react'

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
  const [idx, setIdx] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const idxRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start crossfade: show next image while current fades out
      setTransitioning(true)
      // After crossfade duration, advance to next
      setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % teamImages.length
        setIdx(idxRef.current)
        setTransitioning(false)
      }, 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const prevIdx = (idx - 1 + teamImages.length) % teamImages.length
  const displayIdx = idx
  const overlayIdx = transitioning ? (idx + 1) % teamImages.length : null

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* ===== Full background slideshow ===== */}
      <div className="absolute inset-0">
        {/* Base image (always visible) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[displayIdx]})`,
            filter: 'brightness(0.55)',
            transition: 'opacity 1s ease-in-out',
            opacity: transitioning ? 0 : 1,
          }}
        />
        {/* Overlay image (fades in during transition) */}
        {overlayIdx !== null && (
          <div
            key={overlayIdx}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${teamImages[overlayIdx]})`,
              filter: 'brightness(0.55)',
              transition: 'opacity 1s ease-in-out',
              opacity: transitioning ? 1 : 0,
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
