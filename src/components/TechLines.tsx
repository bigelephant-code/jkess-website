'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export default function TechLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let points: Point[] = []
    const CONNECT_DIST = 150
    const POINT_COUNT = 60
    const BASE_SPEED = 0.3

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initPoints() {
      points = []
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          size: Math.random() * 2 + 1,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // Move points
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges with some randomness
        if (p.x < 0 || p.x > w) {
          p.vx *= -1
          p.x = Math.max(0, Math.min(w, p.x))
        }
        if (p.y < 0 || p.y > h) {
          p.vy *= -1
          p.y = Math.max(0, Math.min(h, p.y))
        }
      }

      // Draw connections + nodes in one pass
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})` // green-400
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const p of points) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74, 222, 128, 0.8)'
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74, 222, 128, 0.08)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initPoints()
    draw()

    window.addEventListener('resize', () => {
      resize()
      // Recalculate point positions relative to new size
      for (const p of points) {
        p.x = Math.random() * canvas!.width
        p.y = Math.random() * canvas!.height
      }
    })

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
