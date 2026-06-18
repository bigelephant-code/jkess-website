'use client'

import { useEffect, useRef } from 'react'
import { worldCountryRings } from '@/data/world'

const HUBS = [
  { name: 'China',   lat: 30.5, lng: 104.0, color: '#22c55e', label: 'China' },
  { name: 'Finland',  lat: 62.0, lng: 26.0, color: '#5b5bff', label: 'Finland' },
  { name: 'USA',     lat: 40.7, lng: -74.0, color: '#f58a8a', label: 'USA' },
]

const TARGETS_CN = [[55,135],[45,140],[35,125],[25,120],[20,115],[10,105],[0,110],[-10,120],[20,75],[30,90],[40,115],[50,100],[45,75],[50,85],[55,80],[60,100],[10,80],[25,90],[35,70],[45,70],[5,100],[-5,105],[-20,115],[-25,135],[-10,135],[-15,120]]
const TARGETS_FI = [[55,10],[52,5],[50,10],[48,5],[45,10],[52,20],[50,25],[55,25],[48,25],[42,25],[44,10],[46,8],[40,-2],[52,-2],[56,-3],[60,8],[58,15],[50,-5],[44,-5],[38,-8],[42,15],[48,15],[55,20],[58,20],[60,25]]
const TARGETS_US = [[35,-100],[30,-95],[45,-95],[40,-90],[35,-90],[30,-85],[45,-85],[40,-80],[35,-80],[30,-80],[50,-80],[45,-75],[40,-75],[35,-110],[40,-105],[50,-100],[55,-100],[55,-110],[48,-115],[40,-115],[20,-100],[15,-85],[10,-75],[-5,-80],[-15,-70],[-25,-65]]
const ALL_TARGETS = [...TARGETS_CN, ...TARGETS_FI, ...TARGETS_US]

interface Shot { hubIdx: number; progress: number; speed: number }

function geoXY(lat: number, lng: number, w: number, h: number) {
  // Mercator projection with latitude clamped to avoid infinity
  const clamped = Math.max(-80, Math.min(80, lat))
  const x = ((lng + 180) / 360) * w
  const y = (Math.PI - Math.log(Math.tan(Math.PI / 4 + (clamped * Math.PI) / 360))) / (2 * Math.PI) * h
  return { x, y }
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
    let w = 0, h = 0, animId = 0, frame = 0
    const shots: Shot[] = []
    let shotCounter = 0
    const colors = ['#22c55e', '#5b5bff', '#f58a8a']

    function resize() {
      const p = cvs.parentElement
      if (!p) return
      w = p.offsetWidth; h = p.offsetHeight
      cvs.width = w * 2; cvs.height = h * 2
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px'
      c.scale(2, 2)
    }

    function draw() {
      c.clearRect(0, 0, w, h)

      // ── World map: fill + stroke each country ──
      const rings = dataRef.current
      if (rings && rings.length > 0) {
        // Fill all countries (batch into one path)
        c.fillStyle = '#0d2b28'
        c.beginPath()
        rings.forEach(ring => {
          ring.forEach(([lat, lng], i) => {
            const p = geoXY(lat, lng, w, h)
            i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
          })
          c.closePath()
        })
        c.fill()

        // Stroke all country borders (batch into one path)
        c.strokeStyle = 'rgba(74,222,128,0.2)'
        c.lineWidth = 0.5
        c.beginPath()
        rings.forEach(ring => {
          ring.forEach(([lat, lng], i) => {
            const p = geoXY(lat, lng, w, h)
            i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
          })
          c.closePath()
        })
        c.stroke()
      }

      // ── Spawn shots ──
      if (frame % 8 === 0) {
        shots.push({ hubIdx: shotCounter % 3, progress: 0, speed: 0.015 + Math.random() * 0.01 })
        shotCounter++
      }

      // ── Draw shots (travel and disappear) ──
      for (let si = shots.length - 1; si >= 0; si--) {
        const s = shots[si]
        s.progress += s.speed
        if (s.progress >= 1) { shots.splice(si, 1); continue }

        const hub = HUBS[s.hubIdx]
        const ti = s.hubIdx * 26 + (Math.floor(s.progress * 26) % 26)
        const target = ALL_TARGETS[Math.min(ti, ALL_TARGETS.length - 1)]
        if (!target) continue

        const p1 = geoXY(hub.lat, hub.lng, w, h)
        const p2 = geoXY(target[0], target[1], w, h)
        const mx = (p1.x + p2.x) / 2
        const my = Math.min(p1.y, p2.y) - Math.abs(p2.x - p1.x) * 0.12 - 20
        const clr = colors[s.hubIdx]
        const t = s.progress

        // Dot position along quadratic bezier
        const dx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * mx + t * t * p2.x
        const dy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * my + t * t * p2.y

        // Glow
        c.beginPath(); c.arc(dx, dy, 3, 0, Math.PI * 2)
        const gg = c.createRadialGradient(dx, dy, 0, dx, dy, 3)
        gg.addColorStop(0, clr + 'aa'); gg.addColorStop(1, clr + '00')
        c.fillStyle = gg; c.fill()

        // Bright dot
        c.beginPath(); c.arc(dx, dy, 1.5, 0, Math.PI * 2)
        c.fillStyle = clr; c.fill()
      }

      // ── Hub dots ──
      const pulse = (Math.sin(frame * 0.05) + 1) / 2
      HUBS.forEach((hub, i) => {
        const p = geoXY(hub.lat, hub.lng, w, h)
        c.beginPath(); c.arc(p.x, p.y, 6 + pulse * 8, 0, Math.PI * 2)
        c.fillStyle = colors[i]
        c.globalAlpha = 0.2 + pulse * 0.15; c.fill(); c.globalAlpha = 1
        c.beginPath(); c.arc(p.x, p.y, 3, 0, Math.PI * 2)
        c.fillStyle = '#ffffff'; c.fill()
        c.fillStyle = '#ffffff'
        c.font = 'bold 11px sans-serif'
        c.textAlign = 'center'
        c.fillText(hub.label, p.x, p.y + 16)
      })

      frame++
      animId = requestAnimationFrame(draw)
    }

    resize()
    animId = requestAnimationFrame(draw)
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    const obs = new ResizeObserver(onResize)
    if (cvs.parentElement) obs.observe(cvs.parentElement)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); obs.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}
