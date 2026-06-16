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
  '/images/team/10.jpg',
]

export default function TeamSlideshow({ children }: { children?: React.ReactNode }) {
  const [curIdx, setCurIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)
  const [isFading, setIsFading] = useState(false)
  const [noTrans, setNoTrans] = useState(false)

  useEffect(() => {
    const advance = () => {
      // Trigger crossfade: cur fades out, next fades in
      setIsFading(true)
      setNoTrans(false)

      setTimeout(() => {
        // Reset: disable transitions during instant swap
        setNoTrans(true)
        setCurIdx(nextIdx)
        setNextIdx((nextIdx + 1) % teamImages.length)
        setIsFading(false)

        // Re-enable transitions after browser paints
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNoTrans(false)
          })
        })
      }, 1000)
    }

    const timer = setInterval(advance, 1000)
    return () => clearInterval(timer)
  }, [nextIdx])

  const transStyle = noTrans ? 'none' : 'opacity 1s ease-in-out'

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[curIdx]})`,
            filter: 'brightness(0.55)',
            opacity: isFading ? 0 : 1,
            transition: transStyle,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${teamImages[nextIdx]})`,
            filter: 'brightness(0.55)',
            opacity: isFading ? 1 : 0,
            transition: transStyle,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-20 md:pb-28">
        {children}
      </div>
    </section>
  )
}
