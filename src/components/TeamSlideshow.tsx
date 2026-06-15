'use client'

import { useState, useEffect, useRef } from 'react'

const teamImages = [
  '/images/team/072986de101b8dd30cb2a3ff111126f.jpg',
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
  const idxRef = useRef(0)
  const curElRef = useRef<HTMLDivElement>(null)
  const nextElRef = useRef<HTMLDivElement>(null)
  const [, forceRender] = useState(0)
  const [nextSrc, setNextSrc] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      const nextIdx = (idxRef.current + 1) % teamImages.length
      const next = teamImages[nextIdx]

      // Set next image ready (hidden, opaque so no flash)
      setNextSrc(next)

      // Use next frame to let DOM settle, then start crossfade
      requestAnimationFrame(() => {
        if (curElRef.current) curElRef.current.style.opacity = '0'
        if (nextElRef.current) nextElRef.current.style.opacity = '1'
      })

      // After crossfade, finalize: swap layers
      setTimeout(() => {
        idxRef.current = nextIdx
        setNextSrc(null)
        // Trigger re-render with new current
        forceRender((n) => n + 1)
        // Reset opacities instantly (no transition)
        if (curElRef.current) {
          curElRef.current.style.transition = 'none'
          curElRef.current.style.opacity = '1'
        }
        if (nextElRef.current) {
          nextElRef.current.style.transition = 'none'
          nextElRef.current.style.opacity = '0'
        }
        // Re-enable transition after a frame
        requestAnimationFrame(() => {
          if (curElRef.current) curElRef.current.style.transition = ''
          if (nextElRef.current) nextElRef.current.style.transition = ''
        })
      }, 1000)
    }

    const timer = setInterval(tick, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {/* Current image - always visible, fades out during transition */}
        <div
          ref={curElRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[idxRef.current]})`,
            filter: 'brightness(0.55)',
            opacity: 1,
            transition: 'opacity 1s ease-in-out',
            zIndex: 0,
          }}
        />
        {/* Next image - fades in during transition, pre-loaded */}
        {nextSrc && (
          <div
            ref={nextElRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${nextSrc})`,
              filter: 'brightness(0.55)',
              opacity: 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1,
            }}
          />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-20 md:pb-28">
        {children}
      </div>
    </section>
  )
}
