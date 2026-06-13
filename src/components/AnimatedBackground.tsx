'use client'

import { useEffect, useRef } from 'react'

interface NodeState {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  phase: number
  label: string
}

interface EdgeDef {
  from: number
  to: number
}

interface Traveler {
  edgeIndex: number
  progress: number
  speed: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

// Energy Storage Lifecycle Flow:
//   左侧（发电）          右侧（储能→用电）
//   ☀️ Solar (0)  ───→  🔋 JKESS (3)  ──→  🏠 Home (4)
//   🌬️ Wind  (1)  ───→                   └──→  🚗 EV (5)
//   🔌 Grid  (2)  ───→

const NODE_DEFS = [
  { baseX: 0.18, baseY: 0.76, size: 40, phase: 4, label: 'Solar' },
  { baseX: 0.06, baseY: 0.48, size: 44, phase: 2, label: 'Wind' },
  { baseX: 0.14, baseY: 0.18, size: 48, phase: 0, label: 'Grid' },
  { baseX: 0.86, baseY: 0.18, size: 48, phase: 1, label: 'JKESS' },
  { baseX: 0.94, baseY: 0.48, size: 44, phase: 3, label: 'Home' },
  { baseX: 0.82, baseY: 0.76, size: 40, phase: 5, label: 'EV' },
]

const EDGE_DEFS: EdgeDef[] = [
  { from: 0, to: 3 }, // Solar → JKESS
  { from: 1, to: 3 }, // Wind → JKESS
  { from: 2, to: 3 }, // Grid → JKESS
  { from: 3, to: 4 }, // JKESS → Home
  { from: 3, to: 5 }, // JKESS → EV
  { from: 0, to: 4 }, // Solar → Home (direct supply)
  { from: 0, to: 5 }, // Solar → EV (direct)
  { from: 4, to: 5 }, // Home → EV (home charging)
]

// ─── Icon Drawers ──────────────────────────────────────────

function drawSolar(ctx: CanvasRenderingContext2D, s: number, time: number) {
  // Sun circle
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Rays (rotating slowly)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + time * 0.06
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * s * 0.55, Math.sin(a) * s * 0.55)
    ctx.lineTo(Math.cos(a) * s * 0.85, Math.sin(a) * s * 0.85)
    ctx.stroke()
  }

  // Inner glow
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 200, 0.5)'
  ctx.fill()
}

function drawWind(ctx: CanvasRenderingContext2D, s: number, time: number) {
  // Pole
  ctx.beginPath()
  ctx.moveTo(0, s * 0.1)
  ctx.lineTo(0, s * 0.9)
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.7)'
  ctx.stroke()

  // Blades (rotating)
  ctx.save()
  ctx.rotate(time * 0.8)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(a) * s * 0.7, Math.sin(a) * s * 0.7)
    ctx.lineWidth = 2.5
    ctx.stroke()
    // Blade tip
    ctx.beginPath()
    ctx.arc(Math.cos(a) * s * 0.7, Math.sin(a) * s * 0.7, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(74, 222, 128, 0.7)'
    ctx.fill()
  }
  // Hub
  ctx.beginPath()
  ctx.arc(0, 0, 3, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(74, 222, 128, 0.9)'
  ctx.fill()
  ctx.restore()
}

function drawGrid(ctx: CanvasRenderingContext2D, s: number) {
  // Power plug
  ctx.lineWidth = 2
  // Plug body
  ctx.beginPath()
  ctx.roundRect(-s * 0.25, -s * 0.35, s * 0.5, s * 0.7, 3)
  ctx.stroke()
  // Prongs
  ctx.beginPath()
  ctx.moveTo(-s * 0.1, -s * 0.35)
  ctx.lineTo(-s * 0.1, -s * 0.6)
  ctx.moveTo(s * 0.1, -s * 0.35)
  ctx.lineTo(s * 0.1, -s * 0.6)
  ctx.stroke()
  // Power line
  ctx.beginPath()
  ctx.moveTo(0, s * 0.35)
  ctx.lineTo(0, s * 0.8)
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)'
  ctx.stroke()
  // Lightning bolt on plug
  ctx.fillStyle = 'rgba(74, 222, 128, 0.7)'
  ctx.beginPath()
  ctx.moveTo(s * 0.08, -s * 0.15)
  ctx.lineTo(-s * 0.04, s * 0.02)
  ctx.lineTo(s * 0.04, s * 0.02)
  ctx.lineTo(-s * 0.08, s * 0.2)
  ctx.fill()
}

function drawJKESS(ctx: CanvasRenderingContext2D, s: number) {
  // Battery icon (JKESS energy storage) - EXTRA BRIGHT
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.roundRect(-s * 0.45, -s * 0.9, s * 0.9, s * 1.8, 4)
  ctx.stroke()

  // Terminal
  ctx.beginPath()
  ctx.roundRect(-s * 0.12, -s * 1.05, s * 0.24, s * 0.18, 2)
  ctx.fill()

  // Fill level (shows ~70% charge)
  const fillH = s * 1.1
  const gap = s * 0.08
  ctx.fillStyle = 'rgba(74, 222, 128, 0.85)'
  ctx.beginPath()
  ctx.roundRect(-s * 0.32, -s * 0.75 + (s * 1.5 - fillH), s * 0.64, fillH - gap, 2)
  ctx.fill()

  // Lightning bolt inside battery
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.beginPath()
  ctx.moveTo(s * 0.12, -s * 0.5)
  ctx.lineTo(-s * 0.06, -s * 0.05)
  ctx.lineTo(s * 0.06, -s * 0.05)
  ctx.lineTo(-s * 0.12, s * 0.45)
  ctx.fill()

  // "JK" text
  ctx.fillStyle = 'rgba(74, 222, 128, 0.9)'
  ctx.font = '700 11px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('JK', 0, 0.5)
}

function drawHome(ctx: CanvasRenderingContext2D, s: number) {
  ctx.lineWidth = 2
  // House body
  ctx.beginPath()
  ctx.roundRect(-s * 0.5, -s * 0.2, s, s * 0.7, 2)
  ctx.stroke()

  // Roof
  ctx.beginPath()
  ctx.moveTo(-s * 0.6, -s * 0.2)
  ctx.lineTo(0, -s * 0.85)
  ctx.lineTo(s * 0.6, -s * 0.2)
  ctx.closePath()
  ctx.stroke()
  ctx.fillStyle = 'rgba(74, 222, 128, 0.55)'
  ctx.fill()

  // Door
  ctx.beginPath()
  ctx.roundRect(-s * 0.1, s * 0.15, s * 0.2, s * 0.35, [2, 2, 0, 0])
  ctx.stroke()

  // Window
  ctx.beginPath()
  ctx.roundRect(s * 0.15, s * 0.0, s * 0.2, s * 0.2, 2)
  ctx.stroke()

  // Light glow in window
  ctx.beginPath()
  ctx.arc(s * 0.25, s * 0.1, s * 0.07, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 200, 0.9)'
  ctx.fill()
}

function drawEV(ctx: CanvasRenderingContext2D, s: number, time: number) {
  // EV icon — uses global drawIcon fill/stroke (same as Solar)
  ctx.lineWidth = 2.2
  // Car body
  ctx.beginPath()
  ctx.moveTo(-s * 0.7, s * 0.05)
  ctx.lineTo(-s * 0.7, -s * 0.2)
  ctx.lineTo(-s * 0.4, -s * 0.35)
  ctx.lineTo(-s * 0.1, -s * 0.35)
  ctx.lineTo(s * 0.1, -s * 0.2)
  ctx.lineTo(s * 0.6, -s * 0.2)
  ctx.lineTo(s * 0.7, -s * 0.05)
  ctx.lineTo(s * 0.7, s * 0.05)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()  // uses global fill (90%)

  // Windows — use global stroke (95%)
  ctx.beginPath()
  ctx.moveTo(-s * 0.35, -s * 0.22)
  ctx.lineTo(-s * 0.15, -s * 0.22)
  ctx.lineTo(-s * 0.05, -s * 0.12)
  ctx.lineTo(-s * 0.35, -s * 0.12)
  ctx.closePath()
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-s * 0.05, -s * 0.22)
  ctx.lineTo(s * 0.15, -s * 0.22)
  ctx.lineTo(s * 0.25, -s * 0.12)
  ctx.lineTo(-s * 0.05, -s * 0.12)
  ctx.closePath()
  ctx.stroke()

  // Wheels — use global fill (90%)
  ctx.beginPath()
  ctx.arc(-s * 0.35, s * 0.05, s * 0.12, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(s * 0.35, s * 0.05, s * 0.12, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Lightning (EV charging symbol, white for contrast)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.beginPath()
  ctx.moveTo(s * 0.52, -s * 0.3)
  ctx.lineTo(s * 0.4, -s * 0.05)
  ctx.lineTo(s * 0.48, -s * 0.05)
  ctx.lineTo(s * 0.36, s * 0.18)
  ctx.fill()

  // Headlight glow
  ctx.beginPath()
  ctx.arc(s * 0.65, -s * 0.12, 3, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(200, 255, 200, ${Math.sin(time * 2) * 0.15 + 0.7})`
  ctx.fill()
}

function drawIcon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, idx: number, time: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = 'rgba(74, 222, 128, 1.0)'
  ctx.fillStyle = 'rgba(74, 222, 128, 0.75)'
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  switch (idx) {
    case 0: drawSolar(ctx, s, time); break
    case 1: drawWind(ctx, s, time); break
    case 2: drawGrid(ctx, s); break
    case 3: drawJKESS(ctx, s); break
    case 4: drawHome(ctx, s); break
    case 5: drawEV(ctx, s, time); break
  }

  ctx.restore()
}

function drawGlassCard(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, label: string, idx: number, time: number) {
  const r = size / 2
  const isRight = idx >= 3 // Right-side nodes (JKESS, Home, EV) get extra brightness
  ctx.save()
  ctx.translate(x, y)

  // Glassmorphism background
  ctx.beginPath()
  ctx.roundRect(-r, -r, size, size, 12)
  ctx.fillStyle = isRight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.12)'
  ctx.fill()
  ctx.strokeStyle = isRight ? 'rgba(74, 222, 128, 0.7)' : 'rgba(74, 222, 128, 0.45)'
  ctx.lineWidth = isRight ? 1.5 : 1.2
  ctx.stroke()

  // Inner highlight
  ctx.beginPath()
  ctx.roundRect(-r + 1, -r + 1, size - 2, size * 0.4, [11, 11, 0, 0])
  ctx.fillStyle = isRight ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)'
  ctx.fill()

  // Icon area ring
  const iconS = r * 0.38
  ctx.beginPath()
  ctx.arc(0, -3, iconS + 4, 0, Math.PI * 2)
  ctx.fillStyle = isRight ? 'rgba(74, 222, 128, 0.4)' : 'rgba(74, 222, 128, 0.25)'
  ctx.fill()

  // Draw icon
  drawIcon(ctx, 0, -3, iconS, idx, time)

  // Label (brighter)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.font = '600 11px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText(label, 0, -r - 8)

  // Small status dot (glowing)
  ctx.beginPath()
  ctx.arc(r - 8, -r + 8, 2.5, 0, Math.PI * 2)
  const pulse = Math.sin(time * 1.5 + idx) * 0.2 + 0.5
  ctx.fillStyle = `rgba(74, 222, 128, ${pulse * 0.6})`
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
      // One traveler per edge, flowing in the energy direction
      for (let i = 0; i < EDGE_DEFS.length; i++) {
        travelers.push({
          edgeIndex: i,
          progress: (i / EDGE_DEFS.length) % 1,
          speed: 0.002 + Math.random() * 0.003,
        })
      }
    }

    function initParticles() {
      if (!canvas) return
      particles = []
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          size: 0.4 + Math.random() * 1.2,
          alpha: 0.08 + Math.random() * 0.3,
        })
      }
    }

    function drawBg(w: number, h: number) {
      ctx!.fillStyle = '#010101'
      ctx!.fillRect(0, 0, w, h)

      // Green glow spots
      const spots = [
        { x: w * 0.3, y: h * 0.22, r: w * 0.28, c: 'rgba(74, 222, 128, 0.08)' },
        { x: w * 0.7, y: h * 0.6, r: w * 0.3, c: 'rgba(34, 197, 94, 0.05)' },
        { x: w * 0.5, y: h * 0.4, r: w * 0.2, c: 'rgba(134, 239, 172, 0.04)' },
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
      const step = 70
      const offsetY = (time * 6) % step
      const offsetX = (time * 4) % step

      ctx!.strokeStyle = 'rgba(74, 222, 128, 0.02)'
      ctx!.lineWidth = 0.4

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
        const flicker = Math.sin(time * 0.5 + p.x * 0.01) * 0.3 + 0.5
        ctx!.fillStyle = `rgba(74, 222, 128, ${p.alpha * flicker})`
        ctx!.fill()
      }
    }

    function drawEdgesAndDots() {
      // Draw connection lines
      for (const edge of EDGE_DEFS) {
        const fromN = nodes[edge.from]
        const toN = nodes[edge.to]
        if (!fromN || !toN) continue

        const fy = fromN.y + Math.sin(time * 0.4 + fromN.phase) * 7
        const ty = toN.y + Math.sin(time * 0.4 + toN.phase) * 7

        // Base line (dimmed back)
        ctx!.beginPath()
        ctx!.moveTo(fromN.x, fy)
        ctx!.lineTo(toN.x, ty)
        ctx!.strokeStyle = 'rgba(74, 222, 128, 0.06)'
        ctx!.lineWidth = 0.6
        ctx!.stroke()

        // Pulse glow (dimmed back)
        const pulse = Math.sin(time * 0.6 + edge.from + edge.to * 0.7) * 0.5 + 0.5
        ctx!.beginPath()
        ctx!.moveTo(fromN.x, fy)
        ctx!.lineTo(toN.x, ty)
        ctx!.strokeStyle = `rgba(74, 222, 128, ${pulse * 0.03})`
        ctx!.lineWidth = 2.5
        ctx!.stroke()
      }

      // Traveling dots (energy flow direction: from → to)
      for (const t of travelers) {
        const edge = EDGE_DEFS[t.edgeIndex]
        const fromN = nodes[edge.from]
        const toN = nodes[edge.to]
        if (!fromN || !toN) continue

        t.progress += t.speed
        if (t.progress > 1) {
          t.progress = 0
        }

        const pr = t.progress
        const fromFy = fromN.y + Math.sin(time * 0.4 + fromN.phase) * 7
        const toFy = toN.y + Math.sin(time * 0.4 + toN.phase) * 7
        const dx = toN.x - fromN.x
        const dy = toFy - fromFy

        const x = fromN.x + dx * pr
        const y = fromFy + dy * pr

        // Glow ring
        const size = 4 + Math.sin(pr * Math.PI) * 1.5 // pulse at middle of edge
        ctx!.beginPath()
        ctx!.arc(x, y, size, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(74, 222, 128, 0.06)'
        ctx!.fill()

        // Core dot (brighter)
        ctx!.beginPath()
        ctx!.arc(x, y, 2, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(134, 239, 172, 0.9)'
        ctx!.fill()

        // Bright center
        ctx!.beginPath()
        ctx!.arc(x, y, 1, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx!.fill()

        // Trail behind
        const trailPr = Math.max(0, pr - t.speed * 5)
        const trailX = fromN.x + dx * trailPr
        const trailY = fromFy + dy * trailPr
        const grad = ctx!.createRadialGradient(trailX, trailY, 0, trailX, trailY, 5)
        grad.addColorStop(0, 'rgba(74, 222, 128, 0.1)')
        grad.addColorStop(1, 'transparent')
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(trailX, trailY, 5, 0, Math.PI * 2)
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
