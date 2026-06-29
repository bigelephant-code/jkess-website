'use client'

import { useEffect } from 'react'

const NAVBAR_SELECTOR = 'nav[style*="translateX(-50%)"]'

export default function NavbarDockEffect() {
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR)
    if (!navbar) return

    navbar.classList.add('jkess-navbar-shell')

    let frameId = 0
    const syncDockState = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        navbar.classList.toggle('jkess-navbar-at-top', window.scrollY <= 10)
      })
    }

    syncDockState()
    window.addEventListener('scroll', syncDockState, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', syncDockState)
      navbar.classList.remove('jkess-navbar-shell', 'jkess-navbar-at-top')
    }
  }, [])

  return null
}
