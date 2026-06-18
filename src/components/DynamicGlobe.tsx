'use client'

import { useEffect, useRef } from 'react'
import { worldCountryRings } from '@/data/world'

const HUBS = [
  { name: 'China',   lat: 30.5, lng: 104.0, color: '#22c55e', label: 'China' },
  { name: 'Poland',  lat: 52.0, lng: 21.0, color: '#f58a8a', label: 'Poland' },
  { name: 'USA',     lat: 40.7, lng: -74.0, color: '#5b5bff', label: 'USA' },
  { name: 'Brazil',  lat: -15.8, lng: -47.9, color: '#fbbf24', label: 'Brazil' },
]

const TARGETS_CN = [[55,135],[45,140],[35,125],[25,120],[20,115],[10,105],[0,110],[-10,120],[20,75],[30,90],[40,115],[50,100],[45,75],[50,85],[55,80],[60,100],[10,80],[25,90],[35,70],[45,70],[5,100],[-5,105],[-20,115],[-25,135],[-10,135],[-15,120]]
const TARGETS_FI = [[55,10],[52,5],[50,10],[48,5],[45,10],[52,20],[50,25],[55,25],[48,25],[42,25],[44,10],[46,8],[40,-2],[52,-2],[56,-3],[60,8],[58,15],[50,-5],[44,-5],[38,-8],[42,15],[48,15],[55,20],[58,20],[60,25]]
const TARGETS_US = [[35,-100],[30,-95],[45,-95],[40,-90],[35,-90],[30,-85],[45,-85],[40,-80],[35,-80],[30,-80],[50,-80],[45,-75],[40,-75],[35,-110],[40,-105],[50,-100],[55,-100],[55,-110],[48,-115],[40,-115],[20,-100],[15,-85],[10,-75],[-5,-80],[-15,-70],[-25,-65]]
const TARGETS_BR = [[-5,-40],[0,-42],[5,-45],[8,-48],[10,-50],[12,-55],[10,-60],[8,-65],[5,-70],[8,-72],[10,-75],[8,-78],[5,-80],[0,-80],[-5,-82],[-10,-80],[-15,-78],[-20,-75],[-22,-70],[-25,-68],[-30,-70],[-35,-65],[-40,-70],[-45,-72],[-48,-70],[-50,-72]]
const ALL_TARGETS = [...TARGETS_CN, ...TARGETS_FI, ...TARGETS_US, ...TARGETS_BR]

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
    let w = 0, h = 0, cx = 0, cy = 0, R = 0, animId = 0, frame = 0, globeRot = 0
    const shots: Shot[] = []
    let shotCounter = 0
    const colors = ['#22c55e', '#f58a8a', '#5b5bff', '#fbbf24']

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
          j === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        }
        c.stroke()
      }
      for (let i = 1; i < 8; i++) {
        const phi = (i / 8) * Math.PI - Math.PI/2
        c.beginPath()
        for (let j = 0; j <= 30; j++) {
          const theta = (j / 30) * Math.PI * 2
          const p = toScreen(proj(phi*180/Math.PI, theta*180/Math.PI, globeRot), cx, cy, R)
          j === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
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
          ;(sumZ / ring.length > 0 ? frontRings : backRings).push(ring)
        })

        // Painter's algorithm: back first, then front
        ;[backRings, frontRings].forEach(rs => {
          if (rs.length === 0) return
          c.fillStyle = '#1a4a4a'
          c.beginPath()
          rs.forEach(ring => {
            ring.forEach(([lat, lng], i) => {
              const p = toScreen(proj(lat, lng, globeRot), cx, cy, R)
              i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
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
              i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
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
        // Draw a few arcs
        ;[[0,3],[0,8],[0,15],[1,1],[1,5],[1,10],[2,2],[2,6],[2,12],[3,3],[3,8],[3,13]].forEach(([hi, ti]) => {
          const hub = HUBS[hi]
          const target = ALL_TARGETS[hi * 26 + ti] || ALL_TARGETS[0]
          const s = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
          const e = toScreen(proj(target[0], target[1], globeRot), cx, cy, R)
          if (!visible(s) || !visible(e)) return
          const mx = (s.x + e.x) / 2
          const my = (s.y + e.y) / 2 - R * 0.25
          c.beginPath()
          c.moveTo(s.x, s.y)
          c.quadraticCurveTo(mx, my, e.x, e.y)
          c.strokeStyle = colors[hi]
          c.globalAlpha = 0.08
          c.lineWidth = 1
          c.stroke()
          c.globalAlpha = 1
        })
      }

      // ── Spawn animated shots (fewer, fixed target per shot) ──
      if (frame % 25 === 0) {
        const hubIdx = shotCounter % 4
        const maxT = 26
        const targetIdx = hubIdx * 26 + Math.floor(Math.random() * Math.min(maxT, Math.floor(ALL_TARGETS.length / 4)))
        shots.push({ hubIdx, targetIdx, progress: 0, speed: 0.008 + Math.random() * 0.006 })
        shotCounter++
      }

      for (let si = shots.length - 1; si >= 0; si--) {
        const s = shots[si]
        s.progress += s.speed
        if (s.progress >= 1) { shots.splice(si, 1); continue }
        const hub = HUBS[s.hubIdx]
        const target = ALL_TARGETS[Math.min(s.targetIdx, ALL_TARGETS.length - 1)]
        if (!target) continue
        const start = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
        const end = toScreen(proj(target[0], target[1], globeRot), cx, cy, R)
        if (!visible(start) || !visible(end)) continue
        const mx = (start.x + end.x) / 2
        const my = (start.y + end.y) / 2 - R * 0.3
        const clr = colors[s.hubIdx]
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
          i === 0 ? c.moveTo(tx, ty) : c.lineTo(tx, ty)
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
      HUBS.forEach((hub, i) => {
        const p = toScreen(proj(hub.lat, hub.lng, globeRot), cx, cy, R)
        if (!visible(p)) return
        // Pulse ring
        c.beginPath(); c.arc(p.x, p.y, 5 + pulse * 7, 0, Math.PI * 2)
        c.fillStyle = colors[i]
        c.globalAlpha = 0.2 + pulse * 0.15; c.fill(); c.globalAlpha = 1
        // Solid dot
        c.beginPath(); c.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        c.fillStyle = '#ffffff'; c.fill()
        // Label
        c.fillStyle = '#ffffff'
        c.font = 'bold 10px sans-serif'
        c.textAlign = 'center'
        c.fillText(hub.label, p.x, p.y + 14)
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

