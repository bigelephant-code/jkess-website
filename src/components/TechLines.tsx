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
    const BASE_SPEED = 0.7

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
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
      time += 0.015

      ctx.clearRect(0, 0, w, h)

      // ── Layer 1: subtle horizontal tech grid lines ──
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.12)'
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
            const alpha = (1 - dist / CONNECT_DIST) * 0.5
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
        ctx.fillStyle = 'rgba(74, 222, 128, 0.12)'
        ctx.fill()

        // core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74, 222, 128, 0.9)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    // Initial setup with a delay to ensure parent is laid out
    setTimeout(() => {
      resize()
      initPoints()
    }, 50)
    draw()

    const handleResize = () => {
      resize()
      for (const p of points) {
        p.x = Math.random() * canvas!.width
        p.y = Math.random() * canvas!.height
      }
    }
    window.addEventListener('resize', handleResize)

    // Also observe parent for layout changes
    const parent = canvas.parentElement
    let observer: ResizeObserver | null = null
    if (parent) {
      observer = new ResizeObserver(handleResize)
      observer.observe(parent)
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      observer?.disconnect()
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
