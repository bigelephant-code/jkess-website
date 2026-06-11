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
    let time = 0
    const CONNECT_DIST = 220
    const POINT_COUNT = 130
    const BASE_SPEED = 0.25

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
          size: Math.random() * 2.5 + 0.8,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      time += 0.005

      ctx.clearRect(0, 0, w, h)

      // ── Layer 1: subtle horizontal tech grid lines ──
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.06)'
      ctx.lineWidth = 0.5
      const gridStep = 60
      const offsetY = (Math.sin(time) * 10 + Math.sin(time * 2.3) * 5) % gridStep
      for (let y = offsetY; y < h; y += gridStep) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // ── Layer 2: moving dots ──
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < -50 || p.x > w + 50) {
          p.vx *= -1
          p.x = Math.max(-50, Math.min(w + 50, p.x))
        }
        if (p.y < -50 || p.y > h + 50) {
          p.vy *= -1
          p.y = Math.max(-50, Math.min(h + 50, p.y))
        }
      }

      // ── Layer 3: connection lines ──
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // ── Layer 4: node dots with glow ──
      for (const p of points) {
        // glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74, 222, 128, 0.06)'
        ctx.fill()

        // core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74, 222, 128, 0.7)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initPoints()
    draw()

    window.addEventListener('resize', () => {
      resize()
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
