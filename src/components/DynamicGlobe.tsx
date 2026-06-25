'use client'

import { useEffect, useRef } from 'react'
import { worldCountryRings } from '@/data/world'

type Target = [number, number]

interface Hub {
  name: string
  lat: number
  lng: number
  color: string
  label: string
  labelDx?: number
  labelDy?: number
  targets: Target[]
}

const TARGETS_CHENGDU: Target[] = [
  [27.7, 85.3], [23.8, 90.4], [16.8, 96.2], [13.8, 100.5],
  [28.6, 77.2], [21.0, 105.9], [17.9, 102.6], [3.1, 101.7],
  [24.9, 67.0], [25.2, 55.3],
]

const TARGETS_SHANDONG: Target[] = [
  [37.6, 127.0], [35.7, 139.7], [34.7, 135.5], [43.1, 131.9],
  [25.0, 121.5], [47.9, 106.9], [39.0, 125.8], [22.3, 114.2],
  [31.2, 121.5], [37.5, 126.7],
]

const TARGETS_SHENZHEN: Target[] = [
  [22.3, 114.2], [14.6, 121.0], [10.8, 106.7], [11.6, 104.9],
  [1.4, 103.8], [-6.2, 106.8], [13.8, 100.5], [25.0, 121.5],
  [3.1, 101.7], [-8.7, 115.2],
]

const TARGETS_PL: Target[] = [
  [52.5, 13.4], [48.9, 2.4], [51.5, -0.1], [40.4, -3.7], [41.9, 12.5],
  [48.2, 16.4], [50.1, 14.4], [52.2, 21.0], [59.3, 18.1], [59.9, 10.8],
  [60.2, 24.9], [55.7, 12.6], [50.8, 4.4], [52.4, 4.9], [47.4, 8.5],
  [53.3, -6.2], [44.8, 20.5], [46.1, 14.8],
]

const TARGETS_US: Target[] = [
  [49.3, -123.1], [45.5, -73.6], [40.7, -74.0], [43.7, -79.4], [51.0, -114.1],
  [47.6, -122.3], [37.8, -122.4], [34.1, -118.2], [41.9, -87.6], [29.8, -95.4],
  [25.8, -80.2], [39.1, -84.5], [39.7, -105.0], [38.9, -77.0], [42.4, -71.0],
  [19.4, -99.1], [14.6, -90.5], [9.4, -84.1], [18.5, -69.9],
]

const TARGETS_BR: Target[] = [
  [-23.6, -46.6], [-22.9, -43.2], [-15.8, -47.9], [-12.9, -38.5], [-8.1, -34.9],
  [-3.1, -60.0], [-1.4, -48.5], [4.6, -74.1], [6.2, -75.6], [10.5, -66.9],
  [-16.5, -68.1], [-33.5, -70.7], [-34.6, -58.4], [-32.9, -71.3], [-25.3, -57.7],
  [-36.9, -73.0],
]

const HUBS = [
  { name: 'Chengdu', lat: 30.57, lng: 104.07, color: '#22c55e', label: 'Chengdu', labelDx: -24, labelDy: 22, targets: TARGETS_CHENGDU },
  { name: 'Shandong', lat: 36.65, lng: 117.12, color: '#38bdf8', label: 'Shandong', labelDx: 30, labelDy: -10, targets: TARGETS_SHANDONG },
  { name: 'Shenzhen', lat: 22.54, lng: 114.06, color: '#f97316', label: 'Shenzhen', labelDx: 34, labelDy: 20, targets: TARGETS_SHENZHEN },
  { name: 'Poland', lat: 52.0, lng: 21.0, color: '#f58a8a', label: 'Poland', targets: TARGETS_PL },
  { name: 'USA', lat: 40.7, lng: -74.0, color: '#5b5bff', label: 'USA', targets: TARGETS_US },
  { name: 'Brazil', lat: -15.8, lng: -47.9, color: '#fbbf24', label: 'Brazil', targets: TARGETS_BR },
] satisfies Hub[]

interface Shot { hubIdx: number; targetIdx: number; progress: number; speed: number }

// ─── 3D orthographic globe projection ───
function proj(lat: number, lng: number, rotation: number = 0): { x: number; y: number; z: number } {
  const phi = lat * Math.PI / 180
  const theta = (lng + rotation) * Math.PI / 180
  return {
    x: Math.cos(phi) * Math.sin(theta),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(theta),
  }
}

function toScreen(p: { x: number; y: number; z: number }, cx: number, cy: number, R: number) {
  return { x: cx + p.x * R, y: cy - p.y * R, z: p.z }
}

export default function DynamicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dataRef = useRef(worldCountryRings)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cvs = canvas, c = ctx
    let w = 0, h = 0, cx = 0, cy = 0, R = 0, animId = 0, frame = 0, globeRot = -105
    const shots: Shot[] = []
    let shotCounter = 0

    function resize() {
      const p = cvs.parentElement
      if (!p) return
      w = p.offsetWidth; h = p.offsetHeight
      cvs.width = w * 2; cvs.height = h * 2
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px'
      c.scale(2, 2)
      cx = w / 2; cy = h / 2
      R = Math.min(w, h) * 0.42
    }

    function visible(p: { x: number; y: number; z: number }): boolean {
      return p.z > -0.1 // front face
    }

    function drawPathPoint(index: number, x: number, y: number) {
      if (index === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }

    function drawGlobe() {
      c.clearRect(0, 0, w, h)

      // ── Background grid ──
      c.strokeStyle = 'rgba(74,222,128,0.04)'
      c.lineWidth = 0.5
      for (let x = 0; x < w; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke() }
      for (let y = 0; y < h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke() }

      // ── Globe sphere clip ──
      c.save()
      c.beginPath()
      c.arc(cx, cy, R, 0, Math.PI * 2)
      c.clip()

      // ── Ocean fill ──
      const ocean = c.createRadialGradient(cx - R*0.3, cy - R*0.3, 0, cx, cy, R)
      ocean.addColorStop(0, '#0f2847')
      ocean.addColorStop(0.6, '#0a1f30')
      ocean.addColorStop(1, '#061218')
      c.fillStyle = ocean
      c.fillRect(cx - R, cy - R, R*2, R*2)

      // ── Grid lines on globe ──
      c.strokeStyle = 'rgba(74,222,128,0.06)'
      c.lineWidth = 0.5
      for (let i = 0; i < 12; i++) {
        const theta = (i / 12) * Math.PI * 2
        c.beginPath()
        for (let j = 0; j <= 30; j++) {
          const phi = (j / 30) * Math.PI - Math.PI/2
          const p = toScreen(proj(phi*180/Math.PI, theta*180/Math.PI, globeRot), cx, cy, R)
          drawPathPoint(j, p.x, p.y)
        }
        c.stroke()
      }
      for (let i = 1; i < 8; i++) {
        const phi = (i / 8) * Math.PI - Math.PI/2
        c.beginPath()
        for (let j = 0; j <= 30; j++) {
          const theta = (j / 30) * Math.PI * 2
          const p = toScreen(proj(phi*180/Math.PI, theta*180/Math.PI, globeRot), cx, cy, R)
          drawPathPoint(j, p.x, p.y)
        }
        c.stroke()
      }

      // ── Countries (backface culled by polygon center z) ──
      const rings = dataRef.current
      if (rings && rings.length > 0) {
        const frontRings: typeof rings = []
        const backRings: typeof rings = []
        rings.forEach(ring => {
          let sumZ = 0
          ring.forEach(([lat, lng]) => { sumZ += proj(lat, lng, globeRot).z })
          if (sumZ / ring.length > 0) frontRings.push(ring)
          else backRings.push(ring)
        })

        // Painter's algorithm: back first, then front
        ;[backRings, frontRings].forEach(rs => {
          if (rs.length === 0) return
          c.fillStyle = '#1a4a4a'
          c.beginPath()
          rs.forEach(ring => {
            ring.forEach(([lat, lng], i) => {
              const p = toScreen(proj(lat, lng, globeRot), cx, cy, R)
              drawPathPoint(i, p.x, p.y)
            })
            c.closePath()
          })
          c.fill()
          c.strokeStyle = 'rgba(74,222,128,0.2)'
          c.lineWidth = 0.5
          c.beginPath()
          rs.forEach(ring => {
            ring.forEach(([lat, lng], i) => {
              const p = toScreen(proj(lat, lng, globeRot), cx, cy, R)
              drawPathPoint(i, p.x, p.y)
            })
            c.closePath()
          })
          c.stroke()
        })
      }

      c.restore() // remove clip

      // ── Globe border glow ──
      c.beginPath()
      c.arc(cx, cy, R, 0, Math.PI * 2)
      c.strokeStyle = 'rgba(74,222,128,0.15)'
      c.lineWidth = 1
      c.stroke()

      // Outer glow
      const gg = c.createRadialGradient(cx, cy, R*0.9, cx, cy, R*1.2)
      gg.addColorStop(0, 'rgba(34,197,94,0)')
      gg.addColorStop(0.5, 'rgba(34,197,94,0.06)')
      gg.addColorStop(1, 'rgba(34,197,94,0)')
      c.beginPath(); c.arc(cx, cy, R*1.2, 0, Math.PI * 2)
      c.fillStyle = gg; c.fill()

      // ── Connection arcs (dotted glow lines between hubs and targets) ──
      // Show some static arcs to demonstrate global coverage
      if (frame % 2 === 0) {
        HUBS.forEach((hub) => {
          const staticTargetIndexes = [1, Math.floor(hub.targets.length / 2), hub.targets.length - 2]
          staticTargetIndexes.forEach((ti) => {
            const target = hub.targets[Math.max(0, Math.min(ti, hub.targets.length - 1))]
            const s = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
            const e = toScreen(proj(target[0], target[1], globeRot), cx, cy, R)
            if (!visible(s) || !visible(e)) return
            const mx = (s.x + e.x) / 2
            const my = (s.y + e.y) / 2 - R * 0.25
            c.beginPath()
            c.moveTo(s.x, s.y)
            c.quadraticCurveTo(mx, my, e.x, e.y)
            c.strokeStyle = hub.color
            c.globalAlpha = hub.name === 'Chengdu' || hub.name === 'Shandong' || hub.name === 'Shenzhen' ? 0.14 : 0.08
            c.lineWidth = hub.name === 'Chengdu' || hub.name === 'Shandong' || hub.name === 'Shenzhen' ? 1.2 : 1
            c.stroke()
            c.globalAlpha = 1
          })
        })
      }

      // ── Spawn animated shots (fewer, fixed target per shot) ──
      if (frame % 14 === 0) {
        const hubIdx = shotCounter % HUBS.length
        const targetIdx = Math.floor(Math.random() * HUBS[hubIdx].targets.length)
        shots.push({ hubIdx, targetIdx, progress: 0, speed: 0.008 + Math.random() * 0.006 })
        shotCounter++
      }

      for (let si = shots.length - 1; si >= 0; si--) {
        const s = shots[si]
        s.progress += s.speed
        if (s.progress >= 1) { shots.splice(si, 1); continue }
        const hub = HUBS[s.hubIdx]
        const target = hub.targets[s.targetIdx % hub.targets.length]
        if (!target) continue
        const start = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
        const end = toScreen(proj(target[0], target[1], globeRot), cx, cy, R)
        if (!visible(start) || !visible(end)) continue
        const mx = (start.x + end.x) / 2
        const my = (start.y + end.y) / 2 - R * 0.3
        const clr = hub.color
        const t = s.progress
        const dx = (1-t)*(1-t)*start.x + 2*(1-t)*t*mx + t*t*end.x
        const dy = (1-t)*(1-t)*start.y + 2*(1-t)*t*my + t*t*end.y

        // Trail: draw arc from near start to current position
        const trailLen = 15
        c.beginPath()
        for (let i = 0; i <= trailLen; i++) {
          const st = Math.max(0, t - 0.12) + (t - Math.max(0, t - 0.12)) * (i / trailLen)
          const tx = (1-st)*(1-st)*start.x + 2*(1-st)*st*mx + st*st*end.x
          const ty = (1-st)*(1-st)*start.y + 2*(1-st)*st*my + st*st*end.y
          drawPathPoint(i, tx, ty)
        }
        c.strokeStyle = clr
        c.globalAlpha = 0.3 * (1 - t) + 0.05
        c.lineWidth = 1.5
        c.stroke()
        c.globalAlpha = 1

        // Head glow
        c.beginPath(); c.arc(dx, dy, 3, 0, Math.PI * 2)
        const g = c.createRadialGradient(dx, dy, 0, dx, dy, 3)
        g.addColorStop(0, clr + 'cc'); g.addColorStop(1, clr + '00')
        c.fillStyle = g; c.fill()
        // Head dot
        c.beginPath(); c.arc(dx, dy, 1.5, 0, Math.PI * 2)
        c.fillStyle = clr; c.fill()
      }

      // ── Hub dots + labels ──
      const pulse = (Math.sin(frame * 0.05) + 1) / 2
      HUBS.forEach((hub) => {
        const p = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
        if (!visible(p)) return
        // Pulse ring
        c.beginPath(); c.arc(p.x, p.y, 5 + pulse * 7, 0, Math.PI * 2)
        c.fillStyle = hub.color
        c.globalAlpha = 0.2 + pulse * 0.15; c.fill(); c.globalAlpha = 1
        // Solid dot
        c.beginPath(); c.arc(p.x, p.y, 3.2, 0, Math.PI * 2)
        c.fillStyle = hub.color; c.fill()
        c.beginPath(); c.arc(p.x, p.y, 1.3, 0, Math.PI * 2)
        c.fillStyle = '#ffffff'; c.fill()
        // Label
        c.fillStyle = hub.color
        c.font = 'bold 10px sans-serif'
        c.textAlign = 'center'
        c.fillText(hub.label, p.x + (hub.labelDx ?? 0), p.y + (hub.labelDy ?? 14))
      })

      frame++
      globeRot += 0.3 // auto-rotation speed
      animId = requestAnimationFrame(drawGlobe)
    }

    resize()
    animId = requestAnimationFrame(drawGlobe)
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    const obs = new ResizeObserver(onResize)
    if (cvs.parentElement) obs.observe(cvs.parentElement)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); obs.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}

