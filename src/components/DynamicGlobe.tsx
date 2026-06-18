'use client'

import { useEffect, useRef } from 'react'

const HUBS: { name: string; lat: number; lng: number; color: string; label: string }[] = [
  { name: 'China', lat: 30.5, lng: 104.0, color: '#22c55e', label: 'China' },
  { name: 'Poland', lat: 52.0, lng: 21.0, color: '#5b5bff', label: 'Poland' },
  { name: 'USA', lat: 40.7, lng: -74.0, color: '#f58a8a', label: 'USA' },
]

const HUBS_TARGETS: Record<string, [number, number][]> = {
  China: [[35,140],[10,80],[25,90],[40,115],[-10,120],[30,110],[-30,140],[-10,140],[-40,175],[-5,105],[50,100],[45,75],[15,100],[20,75],[10,50],[5,15],[0,35],[-15,45],[-25,135],[10,10]],
  Poland: [[55,10],[52,5],[50,15],[48,10],[45,15],[52,20],[50,25],[55,25],[48,25],[42,25],[44,10],[46,8],[40,-2],[52,-2],[56,-3],[60,8],[58,15],[50,-5],[44,-5],[38,-8]],
  USA: [[35,-100],[30,-95],[45,-95],[40,-90],[35,-90],[30,-85],[45,-85],[40,-80],[35,-80],[30,-80],[50,-80],[45,-75],[40,-75],[35,-110],[40,-105],[50,-100],[55,-100],[55,-110],[48,-115],[40,-115]],
}

function toRad(d: number) { return d * Math.PI / 180 }

function dotOnGlobe(cx: number, cy: number, r: number, lat: number, lng: number) {
  const phi = toRad(lat), theta = toRad(lng)
  return { x: cx + r * Math.cos(phi) * Math.sin(theta), y: cy - r * Math.sin(phi) }
}

export default function DynamicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // TS non-null aliases
    const cvs = canvas, c = ctx

    let w = 0, h = 0, cx = 0, cy = 0, r = 0, animId = 0, time = 0

    function resize() {
      const parent = cvs.parentElement
      if (!parent) return
      w = parent.offsetWidth
      h = parent.offsetHeight
      cvs.width = w * 2
      cvs.height = h * 2
      cvs.style.width = w + 'px'
      cvs.style.height = h + 'px'
      c.scale(2, 2)
      cx = w / 2
      cy = h / 2
      r = Math.min(w, h) * 0.38
    }

    function draw() {
      c.clearRect(0, 0, w, h)

      // Globe bg
      const g = c.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r)
      g.addColorStop(0, '#0a1628')
      g.addColorStop(0.5, '#0f2847')
      g.addColorStop(1, '#061218')
      c.beginPath()
      c.arc(cx, cy, r, 0, Math.PI * 2)
      c.fillStyle = g
      c.fill()

      // Outer glow
      c.beginPath()
      c.arc(cx, cy, r, 0, Math.PI * 2)
      const gl = c.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.15)
      gl.addColorStop(0, 'rgba(34,197,94,0)')
      gl.addColorStop(0.5, 'rgba(34,197,94,0.08)')
      gl.addColorStop(1, 'rgba(34,197,94,0)')
      c.fillStyle = gl
      c.fill()

      // Grid lines
      c.strokeStyle = 'rgba(74,222,128,0.07)'
      c.lineWidth = 0.5
      for (let i = 0; i < 12; i++) {
        const t = (i / 12) * Math.PI * 2
        c.beginPath()
        c.moveTo(cx, cy - r)
        c.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + t)
        c.stroke()
      }
      for (let i = 1; i < 8; i++) {
        const lr = r * Math.sin((i / 8) * Math.PI)
        const ly = cy - r * Math.cos((i / 8) * Math.PI)
        c.beginPath()
        c.ellipse(cx, ly, lr, Math.abs(lr) * 0.15, 0, 0, Math.PI * 2)
        c.stroke()
      }

      // Border
      c.beginPath()
      c.arc(cx, cy, r, 0, Math.PI * 2)
      c.strokeStyle = 'rgba(34,197,94,0.15)'
      c.lineWidth = 1
      c.stroke()

      // Continent outlines
      c.strokeStyle = 'rgba(74,222,128,0.12)'
      c.lineWidth = 0.8
      const continents: [number, number][][] = [
        [[35,10],[38,15],[40,20],[45,22],[48,20],[50,15],[55,10],[58,6],[60,8],[58,10],[55,8],[50,8],[48,5],[45,5],[42,3],[40,0],[38,-5],[35,-5],[30,-10],[28,-5],[32,0],[35,5]],
        [[40,-75],[38,-80],[35,-80],[30,-82],[28,-78],[25,-80],[22,-85],[20,-90],[18,-95],[20,-100],[25,-102],[28,-105],[30,-108],[32,-110],[35,-115],[37,-115],[38,-110],[40,-105],[42,-100],[45,-95],[45,-90],[42,-80]],
        [[55,-100],[55,-110],[52,-115],[50,-120],[48,-125],[50,-130],[55,-130],[58,-125],[60,-120],[60,-110],[58,-100]],
        [[-10,135],[-12,130],[-15,125],[-18,120],[-20,115],[-22,110],[-25,115],[-23,120],[-20,125],[-18,130],[-15,135],[-12,140]],
        [[20,105],[22,108],[20,110],[15,108],[10,105],[8,100],[12,98],[15,100],[18,102]],
        [[50,100],[48,95],[50,90],[55,95],[55,100],[52,102]],
        [[55,80],[58,85],[55,90],[50,88],[48,82],[50,78]],
        [[35,-10],[35,-5],[32,0],[30,5],[28,10],[30,15],[35,18],[38,15],[40,10],[38,5],[35,0],[32,-5]],
        [[20,-105],[22,-100],[18,-95],[15,-90],[12,-85],[8,-82],[10,-78],[12,-75],[15,-72],[18,-70],[22,-68],[25,-65],[25,-70],[22,-75],[20,-80],[18,-85],[20,-90],[22,-95],[20,-100],[18,-105]],
      ]
      continents.forEach(pts => {
        c.beginPath()
        pts.forEach(([lt, ln], i) => {
          const p = dotOnGlobe(cx, cy, r, lt, ln)
          i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        })
        c.closePath()
        c.stroke()
      })

      // Flow lines
      const colMap: Record<string, string> = {
        China: 'rgba(34,197,94,0.5)', Poland: 'rgba(91,91,255,0.5)', USA: 'rgba(245,138,138,0.5)'
      }
      HUBS.forEach(hub => {
        const targets = HUBS_TARGETS[hub.name] || []
        const color = colMap[hub.name] || 'rgba(34,197,94,0.3)'
        targets.forEach(([tlat, tlng], i) => {
          const p1 = dotOnGlobe(cx, cy, r, hub.lat, hub.lng)
          const p2 = dotOnGlobe(cx, cy, r, tlat, tlng)
          const mlat = (hub.lat + tlat) / 2 + 25
          const mlng = (hub.lng + tlng) / 2
          const pm = dotOnGlobe(cx, cy, r, mlat, mlng)

          const speed = 2.5 + i * 0.05
          const delay = i * 0.3
          const t = ((time + delay) % speed) / speed
          const prog = t < 0.5 ? t * 2 : 1 - (t - 0.5) * 2

          c.beginPath()
          c.moveTo(p1.x, p1.y)
          c.bezierCurveTo(
            p1.x + (pm.x - p1.x) * 0.4, p1.y - 30,
            p2.x - (p2.x - pm.x) * 0.4, p2.y - 30,
            p2.x, p2.y
          )
          const alpha = prog * 0.35
          c.strokeStyle = color.replace(')', `,${alpha})`).replace('rgb', 'rgba')
          c.lineWidth = 1.2
          c.stroke()
        })
      })

      // Hub dots
      const pulse = (Math.sin(time * 0.8) + 1) / 2
      HUBS.forEach(hub => {
        const p = dotOnGlobe(cx, cy, r, hub.lat, hub.lng)
        c.beginPath()
        c.arc(p.x, p.y, 5 + pulse * 8, 0, Math.PI * 2)
        c.fillStyle = hub.color
        c.globalAlpha = 0.15 + pulse * 0.15
        c.fill()
        c.globalAlpha = 1
        c.beginPath()
        c.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        c.fillStyle = '#ffffff'
        c.fill()
        c.fillStyle = 'rgba(255,255,255,0.7)'
        c.font = '10px sans-serif'
        c.textAlign = 'center'
        c.fillText(hub.label, p.x, p.y + 14)
      })

      time += 0.016
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
