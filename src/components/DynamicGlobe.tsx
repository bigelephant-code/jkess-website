'use client'

import { useEffect, useRef, useState } from 'react'

const HUBS = [
  { name: 'China', lat: 30.5, lng: 104.0, color: '#22c55e', label: 'China' },
  { name: 'Poland', lat: 52.0, lng: 21.0, color: '#5b5bff', label: 'Poland' },
  { name: 'USA', lat: 40.7, lng: -74.0, color: '#f58a8a', label: 'USA' },
]

const ALL_TARGETS: [number, number][] = [
  [55,10],[50,5],[48,15],[45,25],[52,20],[42,25],[35,140],[10,80],[25,90],[40,115],
  [-10,120],[30,110],[-30,140],[-10,140],[-40,175],[-5,105],[50,100],[45,75],[15,100],
  [20,75],[10,50],[5,15],[0,35],[-15,45],[-25,135],[10,10],[55,10],[52,5],[50,15],
  [48,10],[45,15],[52,20],[50,25],[55,25],[48,25],[42,25],[44,10],[46,8],[40,-2],
  [52,-2],[56,-3],[60,8],[58,15],[50,-5],[44,-5],[38,-8],[35,-100],[30,-95],[45,-95],
  [40,-90],[35,-90],[30,-85],[45,-85],[40,-80],[35,-80],[30,-80],[50,-80],[45,-75],
  [40,-75],[35,-110],[40,-105],[50,-100],[55,-100],[55,-110],[48,-115],[40,-115],
  [20,-100],[15,-85],[10,-75],[-5,-80],[-15,-70],[-25,-65],[-35,-55],
]

interface Shot { hubIdx: number; targetIdx: number; progress: number; speed: number }

function geoToXY(lat: number, lng: number, w: number, h: number) {
  return { x: ((lng + 180) / 360) * w, y: ((90 - lat) / 180) * h }
}

export default function DynamicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [worldData, setWorldData] = useState<[number, number][][] | null>(null)

  useEffect(() => {
    fetch('/data/world-land.json')
      .then(r => r.json())
      .then(d => { setWorldData(d); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!loaded || !worldData) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cvs = canvas, c = ctx
    let w = 0, h = 0, animId = 0, frame = 0
    const shots: Shot[] = []
    let shotCounter = 0
    const colMap = ['#22c55e', '#5b5bff', '#f58a8a']

    function resize() {
      const p = cvs.parentElement
      if (!p) return
      w = p.offsetWidth
      h = p.offsetHeight
      cvs.width = w * 2; cvs.height = h * 2
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px'
      c.scale(2, 2)
    }

    function draw() {
      c.clearRect(0, 0, w, h)

      // Transparent background (ocean is now transparent)
      c.clearRect(0, 0, w, h)

      // Grid
      c.strokeStyle = 'rgba(74,222,128,0.04)'
      c.lineWidth = 0.3
      for (let x = 0; x < w; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke() }
      for (let y = 0; y < h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke() }

      const wd = worldData!
      c.fillStyle = '#1a3a34'
      wd.forEach(ring => {
        c.beginPath()
        ring.forEach(([lat, lng], i) => {
          const p = geoToXY(lat, lng, w, h)
          i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        })
        c.closePath()
        c.fill()
      })

      c.strokeStyle = 'rgba(74,222,128,0.3)'
      c.lineWidth = 0.8
      wd.forEach(ring => {
        c.beginPath()
        ring.forEach(([lat, lng], i) => {
          const p = geoToXY(lat, lng, w, h)
          i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)
        })
        c.closePath()
        c.stroke()
      })

      // Shots
      if (frame % 10 === 0) {
        const hubIdx = shotCounter % 3
        const targetIdx = Math.floor(Math.random() * 26)
        shots.push({ hubIdx, targetIdx, progress: 0, speed: 0.012 + Math.random() * 0.008 })
        shotCounter++
      }

      for (let si = shots.length - 1; si >= 0; si--) {
        const s = shots[si]
        s.progress += s.speed
        if (s.progress >= 1) { shots.splice(si, 1); continue }
        const hub = HUBS[s.hubIdx]
        const target = ALL_TARGETS[s.hubIdx * 20 + (s.targetIdx % 20)] || ALL_TARGETS[0]
        const p1 = geoToXY(hub.lat, hub.lng, w, h)
        const p2 = geoToXY(target[0], target[1], w, h)
        const mx = (p1.x + p2.x) / 2
        const my = (p1.y + p2.y) / 2 - 40 - Math.abs(p2.x - p1.x) * 0.12
        const color = colMap[s.hubIdx]
        const t = s.progress
        const dx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * mx + t * t * p2.x
        const dy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * my + t * t * p2.y
        c.beginPath()
        c.arc(dx, dy, 4, 0, Math.PI * 2)
        const gg = c.createRadialGradient(dx, dy, 0, dx, dy, 4)
        gg.addColorStop(0, color + '99')
        gg.addColorStop(1, color + '00')
        c.fillStyle = gg; c.fill()
        c.beginPath(); c.arc(dx, dy, 2, 0, Math.PI * 2)
        c.fillStyle = color; c.fill()
      }

      // Hub dots
      const pulse = (Math.sin(frame * 0.05) + 1) / 2
      HUBS.forEach((hub, i) => {
        const p = geoToXY(hub.lat, hub.lng, w, h)
        c.beginPath(); c.arc(p.x, p.y, 7 + pulse * 10, 0, Math.PI * 2)
        c.fillStyle = colMap[i]
        c.globalAlpha = 0.15 + pulse * 0.15; c.fill(); c.globalAlpha = 1
        c.beginPath(); c.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
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
  }, [loaded, worldData])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}
