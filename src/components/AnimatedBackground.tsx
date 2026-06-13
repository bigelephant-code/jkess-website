'use client'

import { useEffect, useRef } from 'react'

interface NodeState {
  x: number
  y: number
  baseX: number // fraction of viewport
  baseY: number
  size: number
  phase: number // float animation phase
  label: string
  // icon is drawn procedurally based on index
}

interface EdgeDef {
  from: number
  to: number
}

interface Traveler {
  edgeIndex: number
  progress: number
  speed: number
  dir: 1 | -1
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

const NODE_DEFS = [
  { baseX: 0.14, baseY: 0.18, size: 64, phase: 0, label: 'BMS' },
  { baseX: 0.06, baseY: 0.48, size: 58, phase: 2, label: 'Battery Kit' },
  { baseX: 0.18, baseY: 0.76, size: 52, phase: 4, label: '6U Rack' },
  { baseX: 0.86, baseY: 0.18, size: 64, phase: 1, label: 'HV Kit' },
  { baseX: 0.94, baseY: 0.48, size: 58, phase: 3, label: 'Inverter' },
  { baseX: 0.82, baseY: 0.76, size: 52, phase: 5, label: 'Protection' },
]

const EDGE_DEFS: EdgeDef[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 0, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 0, to: 4 },
  { from: 1, to: 3 },
  { from: 2, to: 5 },
  { from: 1, to: 4 },
]

function drawIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, idx: number, time: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.7)'
  ctx.fillStyle = 'rgba(74, 222, 128, 0.35)'
  ctx.lineWidth = 1.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  switch (idx) {
    case 0: // Circuit / BMS
      ctx.beginPath()
      ctx.roundRect(-s * 0.5, -s * 0.5, s, s, 3)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.35, -s * 0.35)
      ctx.lineTo(-s * 0.35, 0)
      ctx.lineTo(s * 0.35, 0)
      ctx.lineTo(s * 0.35, s * 0.35)
      ctx.stroke()
      break
    case 1: // Battery
      ctx.beginPath()
      ctx.roundRect(-s * 0.35, -s, s * 0.7, s * 1.8, 3)
      ctx.stroke()
      ctx.beginPath()
      ctx.roundRect(-s * 0.1, -s * 1.15, s * 0.2, s * 0.22, 1)
      ctx.fill()
      ctx.fillStyle = 'rgba(74, 222, 128, 0.2)'
      ctx.beginPath()
      ctx.roundRect(-s * 0.22, -s * 0.7, s * 0.44, s * 1.2, 2)
      ctx.fill()
      break
    case 2: // Rack mount
      ctx.beginPath()
      ctx.roundRect(-s * 0.45, -s * 0.5, s * 0.9, s, 2)
      ctx.stroke()
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(-s * 0.3, -s * 0.3 + i * s * 0.3)
        ctx.lineTo(s * 0.3, -s * 0.3 + i * s * 0.3)
        ctx.stroke()
      }
      break
    case 3: // Lightning bolt / HV
      ctx.beginPath()
      ctx.moveTo(s * 0.25, -s * 1.0)
      ctx.lineTo(-s * 0.15, -s * 0.1)
      ctx.lineTo(s * 0.15, -s * 0.1)
      ctx.lineTo(-s * 0.25, s * 1.0)
      ctx.lineTo(s * 0.15, s * 0.15)
      ctx.lineTo(-s * 0.1, s * 0.15)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      break
    case 4: // Inverter / sun
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + time * 0.08
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5)
        ctx.lineTo(Math.cos(a) * s * 0.78, Math.sin(a) * s * 0.78)
        ctx.stroke()
      }
      break
    case 5: // Shield / Protection
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.95)
      ctx.lineTo(s * 0.9, -s * 0.5)
      ctx.lineTo(s * 0.7, s * 0.55)
      ctx.lineTo(0, s * 0.95)
      ctx.lineTo(-s * 0.7, s * 0.55)
      ctx.lineTo(-s * 0.9, -s * 0.5)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.18, s * 0.1)
      ctx.lineTo(0, s * 0.3)
      ctx.lineTo(s * 0.28, -s * 0.18)
      ctx.stroke()
      ctx.fillStyle = 'rgba(74, 222, 128, 0.1)'
      ctx.fill()
      break
  }
  ctx.restore()
}

function drawGlassCard(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, label: string, idx: number, time: number) {
  const r = size / 2
  ctx.save()
  ctx.translate(x, y)

  // Glassmorphism background
  ctx.beginPath()
  ctx.roundRect(-r, -r, size, size, 14)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.12)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Inner highlight (top edge shine)
  ctx.beginPath()
  ctx.roundRect(-r + 1, -r + 1, size - 2, size * 0.4, [13, 13, 0, 0])
  ctx.fillStyle = 'rgba(255, 255, 255, 0.015)'
  ctx.fill()

  // Icon area ring
  const iconS = r * 0.38
  ctx.beginPath()
  ctx.arc(0, -3, iconS + 4, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(74, 222, 128, 0.06)'
  ctx.fill()

  // Draw icon
  drawIcon(ctx, 0, -3, iconS, idx, time)

  // Label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
  ctx.font = '600 11px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText(label, 0, -r - 8)

  // Small green dot indicator (live status)
  ctx.beginPath()
  ctx.arc(r - 8, -r + 8, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(74, 222, 128, 0.6)'
  ctx.fill()

  ctx.restore()
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: NodeState[] = []
    let travelers: Traveler[] = []
    let particles: Particle[] = []
    let time = 0

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = NODE_DEFS.map(def => ({
        ...def,
        x: def.baseX * canvas.width,
        y: def.baseY * canvas.height,
      }))
    }

    function initTravelers() {
      travelers = []
      const count = 7
      for (let i = 0; i < count; i++) {
        travelers.push({
          edgeIndex: i % EDGE_DEFS.length,
          progress: (i / count) % 1,
          speed: 0.0025 + Math.random() * 0.004,
          dir: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    function initParticles() {
      if (!canvas) return
      particles = []
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: 0.5 + Math.random() * 1.5,
          alpha: 0.1 + Math.random() * 0.4,
        })
      }
    }

    function drawBg(w: number, h: number) {
      // Pure black background (original style)
      ctx!.fillStyle = '#010101'
      ctx!.fillRect(0, 0, w, h)

      // Subtle green glow spots (same as original HeroSection blur-3xl style)
      const spots = [
        { x: w * 0.25, y: h * 0.25, r: w * 0.3, c: 'rgba(74, 222, 128, 0.04)' },
        { x: w * 0.75, y: h * 0.6, r: w * 0.3, c: 'rgba(34, 197, 94, 0.025)' },
      ]
      for (const sp of spots) {
        const g = ctx!.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.r)
        g.addColorStop(0, sp.c)
        g.addColorStop(1, 'transparent')
        ctx!.fillStyle = g
        ctx!.fillRect(sp.x - sp.r, sp.y - sp.r, sp.r * 2, sp.r * 2)
      }
    }

    function drawTechGrid(w: number, h: number) {
      // Subtle tech lines
      const step = 70
      const offsetY = (time * 8) % step
      const offsetX = (time * 5) % step

      ctx!.strokeStyle = 'rgba(74, 222, 128, 0.025)'
      ctx!.lineWidth = 0.5

      for (let y = offsetY; y < h; y += step) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
        ctx!.stroke()
      }
      for (let x = offsetX; x < w; x += step) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
        ctx!.stroke()
      }
    }

    function drawParticles() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(74, 222, 128, ${p.alpha * (Math.sin(time * 0.3 + p.x * 0.01) * 0.3 + 0.5)})`
        ctx!.fill()
      }
    }

    function drawEdgesAndDots() {
      for (const edge of EDGE_DEFS) {
        const fromN = nodes[edge.from]
        const toN = nodes[edge.to]
        if (!fromN || !toN) continue

        const fy = fromN.y + Math.sin(time * 0.4 + fromN.phase) * 7
        const ty = toN.y + Math.sin(time * 0.4 + toN.phase) * 7

        // Base line
        ctx!.beginPath()
        ctx!.moveTo(fromN.x, fy)
        ctx!.lineTo(toN.x, ty)
        ctx!.strokeStyle = 'rgba(74, 222, 128, 0.06)'
        ctx!.lineWidth = 0.6
        ctx!.stroke()

        // Pulse glow
        const pulse = Math.sin(time * 0.6 + edge.from + edge.to * 0.7) * 0.5 + 0.5
        ctx!.beginPath()
        ctx!.moveTo(fromN.x, fy)
        ctx!.lineTo(toN.x, ty)
        ctx!.strokeStyle = `rgba(74, 222, 128, ${pulse * 0.04})`
        ctx!.lineWidth = 2.5
        ctx!.stroke()
      }

      // Traveling dots
      for (const t of travelers) {
        const edge = EDGE_DEFS[t.edgeIndex]
        const fromN = nodes[edge.from]
        const toN = nodes[edge.to]
        if (!fromN || !toN) continue

        t.progress += t.speed * t.dir
        if (t.progress > 1 || t.progress < 0) {
          t.dir = (t.dir === 1 ? -1 : 1) as 1 | -1
          t.progress = Math.max(0, Math.min(1, t.progress))
        }

        const pr = t.progress
        const fromFy = fromN.y + Math.sin(time * 0.4 + fromN.phase) * 7
        const toFy = toN.y + Math.sin(time * 0.4 + toN.phase) * 7
        const dx = toN.x - fromN.x
        const dy = toFy - fromFy

        const x = fromN.x + dx * pr
        const y = fromFy + dy * pr

        // Glow ring
        ctx!.beginPath()
        ctx!.arc(x, y, 5, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(74, 222, 128, 0.08)'
        ctx!.fill()

        // Core
        ctx!.beginPath()
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(134, 239, 172, 0.85)'
        ctx!.fill()

        // Trail
        const trailX = fromN.x + dx * (pr - t.speed * 4 * t.dir)
        const trailY = fromFy + dy * (pr - t.speed * 4 * t.dir)
        const grad = ctx!.createRadialGradient(trailX, trailY, 0, trailX, trailY, 4)
        grad.addColorStop(0, 'rgba(74, 222, 128, 0.15)')
        grad.addColorStop(1, 'transparent')
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(trailX, trailY, 4, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      time += 0.016

      drawBg(w, h)
      drawTechGrid(w, h)
      drawParticles()
      drawEdgesAndDots()

      // Draw glass cards on top
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const floatY = Math.sin(time * 0.4 + n.phase) * 7
        drawGlassCard(ctx, n.x, n.y + floatY, n.size, n.label, i, time)
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initTravelers()
    initParticles()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
