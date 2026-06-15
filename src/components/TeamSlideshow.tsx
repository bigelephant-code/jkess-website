'use client'

import { useState, useEffect } from 'react'

const teamImages = [
  '/images/team/1.jpg',
  '/images/team/2.jpg',
  '/images/team/3.jpg',
  '/images/team/4.jpg',
  '/images/team/5.jpg',
  '/images/team/6.jpg',
  '/images/team/7.jpg',
  '/images/team/8.jpg',
  '/images/team/9.jpg',
  '/images/team/10.jpg',
]

export default function TeamSlideshow({ children }: { children?: React.ReactNode }) {
  const [curIdx, setCurIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)
  const [isFading, setIsFading] = useState(false)

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
