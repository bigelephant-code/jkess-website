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
  const [curIdx, setCurIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)
  const [isFading, setIsFading] = useState(false)
  const el1Ref = useRef<HTMLDivElement>(null)
  const el2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const advance = () => {
      // Start fade: layer2 becomes visible
      setIsFading(true)

      // After crossfade, promote next to cur
      setTimeout(() => {
        setCurIdx(nextIdx)
        setNextIdx((nextIdx + 1) % teamImages.length)
        setIsFading(false)
      }, 1000)
    }

    const timer = setInterval(advance, 3000)
    return () => clearInterval(timer)
  }, [nextIdx])

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {/* Layer 1: always shows curIdx */}
        <div
          ref={el1Ref}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[curIdx]})`,
            filter: 'brightness(0.55)',
            opacity: isFading ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
          }}
        />
        {/* Layer 2: always shows nextIdx */}
        <div
          ref={el2Ref}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[nextIdx]})`,
            filter: 'brightness(0.55)',
            opacity: isFading ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
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
