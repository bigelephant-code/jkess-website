'use client'

import { useEffect, useRef } from 'react'

const HUBS = [
  { name: 'China', lat: 30.5, lng: 104.0, color: '#22c55e', label: 'China' },
  { name: 'Poland', lat: 52.0, lng: 21.0, color: '#5b5bff', label: 'Poland' },
  { name: 'USA', lat: 40.7, lng: -74.0, color: '#f58a8a', label: 'USA' },
]

const TARGETS: [number, number][] = [
  // Asia/Europe/Africa/Oceania (served by China)
  [55,10],[50,5],[48,15],[45,25],[52,20],[42,25],
  [35,140],[10,80],[25,90],[40,115],[-10,120],[30,110],[-30,140],[-10,140],[-40,175],[-5,105],
  [50,100],[45,75],[15,100],[20,75],[10,50],[5,15],[0,35],[-15,45],[-25,135],[10,10],
  // Europe (served by Poland)
  [55,10],[52,5],[50,15],[48,10],[45,15],[52,20],[50,25],[55,25],[48,25],[42,25],
  [44,10],[46,8],[40,-2],[52,-2],[56,-3],[60,8],[58,15],[50,-5],[44,-5],[38,-8],
  // Americas (served by USA)
  [35,-100],[30,-95],[45,-95],[40,-90],[35,-90],[30,-85],[45,-85],[40,-80],[35,-80],
  [30,-80],[50,-80],[45,-75],[40,-75],[35,-110],[40,-105],[50,-100],[55,-100],
  [55,-110],[48,-115],[40,-115],[20,-100],[15,-85],[10,-75],[-5,-80],[-15,-70],[-25,-65],[-35,-55],
]

// Map projection: equirectangular (simple flat map)
function geoToXY(lat: number, lng: number, w: number, h: number) {
  return {
    x: ((lng + 180) / 360) * w,
    y: ((90 - lat) / 180) * h,
  }
}

// Simplified continent outline points (lat, lng)
const CONTINENTS: [number, number][][] = [
  // Europe
  [[55,-10],[55,-2],[52,0],[50,5],[48,8],[45,10],[40,8],[38,5],[35,5],[35,10],[38,15],[40,20],[45,22],[48,20],[50,15],[55,10],[58,6],[60,8],[58,12],[55,15],[50,18],[48,25],[42,25],[40,20],[38,15],[35,15],[32,10],[30,5],[32,0],[35,-5],[38,-8],[40,-10],[42,-8],[45,-5],[48,-5],[50,-8],[52,-5],[55,-8],[58,-5],[58,-10],[55,-10]],
  // North America
  [[55,-100],[55,-110],[52,-115],[50,-120],[48,-125],[50,-130],[55,-130],[58,-125],[60,-120],[62,-115],[62,-100],[60,-90],[58,-85],[55,-80],[50,-75],[48,-70],[45,-70],[42,-75],[40,-80],[38,-80],[35,-80],[32,-82],[30,-80],[28,-78],[25,-80],[22,-85],[20,-90],[18,-95],[20,-100],[22,-102],[25,-105],[28,-108],[30,-110],[32,-112],[35,-115],[38,-112],[40,-108],[42,-105],[45,-100],[48,-95],[50,-95],[52,-95],[55,-100]],
  // South America
  [[10,-75],[8,-78],[5,-80],[0,-80],[-5,-82],[-10,-80],[-15,-78],[-20,-75],[-22,-70],[-25,-68],[-30,-70],[-35,-65],[-40,-70],[-45,-72],[-48,-70],[-50,-72],[-52,-68],[-55,-65],[-55,-60],[-50,-58],[-45,-60],[-40,-55],[-35,-55],[-30,-55],[-25,-55],[-22,-50],[-20,-45],[-15,-45],[-10,-42],[-5,-40],[0,-42],[5,-45],[8,-48],[10,-50],[12,-55],[10,-60],[8,-65],[5,-70],[8,-72],[10,-75]],
  // Africa
  [[35,-5],[32,0],[30,5],[28,10],[30,15],[35,18],[38,15],[40,10],[38,5],[35,0],[32,-5],[30,-10],[28,-5],[25,0],[22,5],[20,10],[18,15],[15,18],[12,20],[10,22],[8,20],[5,18],[2,15],[0,12],[-2,10],[-5,8],[-8,10],[-10,12],[-12,15],[-15,18],[-18,20],[-20,22],[-22,25],[-25,25],[-28,28],[-30,30],[-32,28],[-35,25],[-35,20],[-32,18],[-30,15],[-28,10],[-25,5],[-22,0],[-20,-5],[-18,-10],[-15,-12],[-12,-15],[-10,-18],[-8,-20],[-5,-18],[0,-15],[5,-12],[8,-10],[10,-8],[12,-5],[15,0],[18,5],[20,10],[22,12],[25,15],[28,18],[30,20],[32,18],[35,15],[36,10],[35,5],[35,-5]],
  // Asia
  [[50,100],[48,95],[50,90],[55,95],[55,100],[52,102],[50,105],[48,110],[45,115],[42,120],[40,125],[38,130],[35,135],[30,140],[25,145],[20,145],[15,140],[12,135],[10,130],[8,125],[5,120],[2,115],[0,110],[-2,105],[-5,100],[-8,105],[-10,110],[-8,115],[-5,120],[-2,125],[0,130],[5,135],[8,140],[12,145],[15,148],[20,150],[25,150],[30,145],[35,140],[40,135],[42,130],[45,125],[48,120],[50,115],[55,110],[58,105],[60,100],[58,95],[55,90],[52,85],[50,80],[48,82],[50,88],[52,90],[50,95],[50,100]],
  // Southeast Asia / Oceania
  [[20,105],[22,108],[20,110],[15,108],[10,105],[8,100],[12,98],[15,100],[18,102],[20,105]],
  [[-10,135],[-12,130],[-15,125],[-18,120],[-20,115],[-22,110],[-25,115],[-23,120],[-20,125],[-18,130],[-15,135],[-12,140],[-10,135]],
]

// Shot animation: each shot fires from hub, travels along arc, disappears on arrival
interface Shot {
  hubIdx: number
  targetIdx: number
  progress: number // 0 to 1
  speed: number
}

export default function DynamicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cvs = canvas, c = ctx

    let w = 0, h = 0, animId = 0, frame = 0
    const shots: Shot[] = []
    let shotCounter = 0

    function resize() {
      const p = cvs.parentElement
      if (!p) return
      w = p.offsetWidth
      h = p.offsetHeight
      cvs.width = w * 2
      cvs.height = h * 2
      cvs.style.width = w + 'px'
      cvs.style.height = h + 'px'
      c.scale(2, 2)
    }

    function draw() {
      c.clearRect(0, 0, w, h)

      // ── Ocean background ──
      const grad = c.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#071422')
      grad.addColorStop(0.5, '#0a1f35')
      grad.addColorStop(1, '#061218')
      c.fillStyle = grad
      c.fillRect(0, 0, w, h)

      // Subtle grid
      c.strokeStyle = 'rgba(74,222,128,0.04)'
      c.lineWidth = 0.3
      for (let x = 0; x < w; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke() }
      for (let y = 0; y < h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke() }

      // ── Continent outlines ──
      c.strokeStyle = 'rgba(34,197,94,0.15)'
      c.lineWidth = 1
      CONTINENTS.forEach(pts => {
        c.beginPath()
        pts.forEach(([lt, ln], i) => {
          const p = geoToXY(lt, ln, w, h)
          i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        })
        c.closePath()
        c.stroke()
      })

      // Fill continents with subtle color
      c.fillStyle = 'rgba(74,222,128,0.03)'
      CONTINENTS.forEach(pts => {
        c.beginPath()
        pts.forEach(([lt, ln], i) => {
          const p = geoToXY(lt, ln, w, h)
          i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        })
        c.closePath()
        c.fill()
      })

      // ── Spawn new shots periodically ──
      if (frame % 8 === 0) {
        const hubIdx = shotCounter % 3
        const hub = HUBS[hubIdx]
        const hubTargets = {
          0: TARGETS.filter((_, i) => i < 20),
          1: TARGETS.filter((_, i) => i >= 20 && i < 40),
          2: TARGETS.filter((_, i) => i >= 40),
        }
        const targets = hubTargets[hubIdx as keyof typeof hubTargets]
        const targetIdx = Math.floor(Math.random() * targets.length)
        shots.push({ hubIdx, targetIdx, progress: 0, speed: 0.015 + Math.random() * 0.01 })
        shotCounter++
      }

      // ── Update and draw shots ──
      const colMap = ['#22c55e', '#5b5bff', '#f58a8a']
      const hubTargetLists = [
        TARGETS.filter((_, i) => i < 20),
        TARGETS.filter((_, i) => i >= 20 && i < 40),
        TARGETS.filter((_, i) => i >= 40),
      ]

      for (let si = shots.length - 1; si >= 0; si--) {
        const shot = shots[si]
        shot.progress += shot.speed

        if (shot.progress >= 1) {
          shots.splice(si, 1)
          continue
        }

        const hub = HUBS[shot.hubIdx]
        const targets = hubTargetLists[shot.hubIdx]
        if (!targets || !targets[shot.targetIdx]) continue
        const target = targets[shot.targetIdx]

        const p1 = geoToXY(hub.lat, hub.lng, w, h)
        const p2 = geoToXY(target[0], target[1], w, h)

        // Arc curve: control point above midpoint
        const mx = (p1.x + p2.x) / 2
        const my = (p1.y + p2.y) / 2 - 60 - Math.abs(p2.x - p1.x) * 0.15

        // Draw the full arc path faintly
        c.beginPath()
        c.moveTo(p1.x, p1.y)
        c.quadraticCurveTo(mx, my, p2.x, p2.y)
        c.strokeStyle = 'rgba(255,255,255,0.04)'
        c.lineWidth = 0.5
        c.stroke()

        // Draw the traveling dot with trail
        const prog = shot.progress
        // Leading dot position
        const t = prog
        const dotX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * mx + t * t * p2.x
        const dotY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * my + t * t * p2.y

        // Glow behind dot
        c.beginPath()
        c.arc(dotX, dotY, 5, 0, Math.PI * 2)
        const g = c.createRadialGradient(dotX, dotY, 0, dotX, dotY, 5)
        g.addColorStop(0, colMap[shot.hubIdx] + '44')
        g.addColorStop(1, colMap[shot.hubIdx] + '00')
        c.fillStyle = g
        c.fill()

        // Bright dot
        c.beginPath()
        c.arc(dotX, dotY, 2, 0, Math.PI * 2)
        c.fillStyle = colMap[shot.hubIdx]
        c.fill()

        // Trail (line from near the start to the dot)
        const trailStart = Math.max(0, prog - 0.15)
        const steps = 20
        c.beginPath()
        for (let i = 0; i <= steps; i++) {
          const s = trailStart + (prog - trailStart) * (i / steps)
          const tx = (1 - s) * (1 - s) * p1.x + 2 * (1 - s) * s * mx + s * s * p2.x
          const ty = (1 - s) * (1 - s) * p1.y + 2 * (1 - s) * s * my + s * s * p2.y
          i === 0 ? c.moveTo(tx, ty) : c.lineTo(tx, ty)
        }
        c.strokeStyle = colMap[shot.hubIdx]
        c.globalAlpha = 0.3 * (1 - prog) + 0.1
        c.lineWidth = 1.5
        c.stroke()
        c.globalAlpha = 1
      }

      // ── Hub dots ──
      const pulse = (Math.sin(frame * 0.05) + 1) / 2
      HUBS.forEach((hub, i) => {
        const p = geoToXY(hub.lat, hub.lng, w, h)
        // Pulse ring
        c.beginPath()
        c.arc(p.x, p.y, 6 + pulse * 8, 0, Math.PI * 2)
        c.fillStyle = colMap[i]
        c.globalAlpha = 0.15 + pulse * 0.15
        c.fill()
        c.globalAlpha = 1
        // Solid dot
        c.beginPath()
        c.arc(p.x, p.y, 3, 0, Math.PI * 2)
        c.fillStyle = '#ffffff'
        c.fill()
        // Label
        c.fillStyle = colMap[i]
        c.font = '11px sans-serif'
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
