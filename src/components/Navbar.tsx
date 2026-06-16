'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ShoppingCart, Globe, ChevronUp } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/i18n/client'
import { locales, localeMap } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/products' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
  { key: 'nav.downloads', href: '/downloads' },
]

const languageGroups = [
  { label: 'West & Central Europe', codes: ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt'] as LangCode[] },
  { label: 'Nordic', codes: ['sv', 'da', 'fi'] as LangCode[] },
  { label: 'Central & Eastern Europe', codes: ['pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'el'] as LangCode[] },
  { label: 'Baltics & Balkans', codes: ['hr', 'sl', 'lt', 'lv', 'et'] as LangCode[] },
  { label: 'CIS & Middle East', codes: ['ru', 'uk', 'fa', 'tr'] as LangCode[] },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const [justAppeared, setJustAppeared] = useState(false)
  const lastScrollY = useRef(0)
  const wasHidden = useRef(false)
  const scrollDirection = useRef<'up' | 'down' | null>(null)
  const visibleRef = useRef(true)
  const navRef = useRef<HTMLDivElement>(null)
  const { itemCount } = useCart()
  const { lang, t } = useI18n()
  const prefix = lang === 'en' ? '' : '/' + lang

  const currentLocale = localeMap.get(lang)!

  // Sync visibleRef with state
  useEffect(() => { visibleRef.current = visible }, [visible])

  // Hide navbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Track scroll direction (always, with small dead zone)
      if (currentScrollY > lastScrollY.current + 2) {
        scrollDirection.current = 'down'
      } else if (currentScrollY < lastScrollY.current - 2) {
        scrollDirection.current = 'up'
      }
      lastScrollY.current = currentScrollY
      
      // Close language panel on scroll
      setLangOpen(false)
      
      const isCurrentlyVisible = visibleRef.current
      
      if (currentScrollY <= 10) {
        // At top: seamless full-width
        setAtTop(true)
        if (!isCurrentlyVisible) {
          wasHidden.current = true
          setVisible(true)
        }
      } else if (scrollDirection.current === 'down' && currentScrollY > 100) {
        // Scrolling down past threshold: peel then hide
        setAtTop(false)
        setVisible(false)
      } else if (scrollDirection.current === 'up' && !isCurrentlyVisible) {
        // Scrolling up while hidden: reappear with particles
        setAtTop(currentScrollY <= 10)
        wasHidden.current = true
        setVisible(true)
      } else {
        // Between 10-100px: peeled visible state
        setAtTop(false)
        if (!isCurrentlyVisible) {
          setVisible(true)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    if (visible && wasHidden.current) {
      setJustAppeared(true)
      wasHidden.current = false
      setTimeout(() => setJustAppeared(false), 700)
    }
  }, [visible])

  // Close language panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 0, left: 0, x: 0, width: '100%', borderRadius: '0px' }}
      animate={{
        y: visible ? 0 : -120,
        left: atTop ? 0 : '50%',
        x: atTop ? 0 : '-50%',
        width: atTop ? '100%' : '97%',
        borderRadius: atTop ? '0px' : '17px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed z-50 bg-black/50 overflow-hidden ${
        atTop ? '' : 'max-w-[1580px] border border-white/[0.04]'
      }`}
    >
      {/* ── Particle Rain Effect (on reappear) ── */}
      <AnimatePresence>
        {justAppeared && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
            style={{ borderRadius: 'inherit' }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: -20 - Math.random() * 30,
                  scale: 0.3,
                  opacity: 1,
                }}
                animate={{
                  y: [null, 60 + Math.random() * 40 + '%', 100 + Math.random() * 30 + '%'],
                  x: [null, (Math.random() - 0.5) * 80 + '%'],
                  scale: [0.3, 1.2, 2.5],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.3,
                  delay: Math.random() * 0.15,
                  ease: 'easeOut',
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
                style={{
                  left: (i * 2.5) % 100 + '%',
                }}
              />
            ))}
            {/* Radial burst center */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/15"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navbar Content (fades in with particles on reappear) ── */}
      <motion.div
        initial={justAppeared ? { opacity: 0, y: 10, scale: 0.97 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
      >

      {/* ── Language Panel (appears ABOVE navbar content, pushes everything down) ── */}
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-black/90 border-b border-white/[0.06]"
          >
            <div className="px-8 py-6">
              <div className="grid grid-cols-5 gap-x-6 gap-y-0 max-w-[1400px] mx-auto">
                {languageGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.codes.map((code) => {
                        const locale = localeMap.get(code)
                        if (!locale) return null
                        const isActive = lang === code
                        return (
                          <a
                            key={code}
                            href={code === 'en' ? '/' : `/${code}`}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-green-500/15 text-green-400'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="text-lg shrink-0">{locale.flag}</span>
                            <span className="text-sm">{locale.name}</span>
                            {isActive && <span className="text-green-400 text-xs ml-auto font-bold">✓</span>}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Original Navbar Content — unchanged layout ── */}
      <div className="px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href={prefix || '/'} className="flex items-center">
          <img
            src="/images/jkess-logo-cropped.png"
            alt="JKESS"
            className="h-12 w-auto brightness-0 invert"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={`${prefix}${link.href}`}
              className="relative text-lg tracking-wider font-medium text-white/80 transition-colors duration-200
                before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-0 before:w-0 before:h-[1px]
                before:bg-green-500 before:rounded-full before:transition-all before:duration-300
                hover:before:w-full"
            >
              <motion.span
                className="flex"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  hover: { transition: { staggerChildren: 0.025 } },
                }}
                whileHover="hover"
              >
                {(t(link.key) || link.key.replace('nav.', '')).split('').map((char: string, i: number) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      rest: { y: 0, color: 'rgba(255,255,255,0.8)', transition: { duration: 0.2 } },
                      hover: { y: -2, color: '#22c55e', transition: { duration: 0.2 } },
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </a>
          ))}

          {/* ── Language Switcher ── */}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-white/60 hover:text-green-500 transition-colors duration-200 text-lg"
          >
            <Globe size={20} />
            <span className="text-xl leading-none">{currentLocale.flag}</span>
          </button>

          {/* Cart icon */}
          <a
            href={`${prefix}/cart`}
            className="relative text-white/60 hover:text-green-500 transition-colors duration-200"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <a href={`${prefix}/cart`} className="relative text-white/60">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
          <button className="text-white/80" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/70 border-t border-white/[0.04] px-6 py-5 space-y-4 rounded-b-[17px] overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={`${prefix}${link.href}`}
                className="block text-lg tracking-wider font-medium text-white/80 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t(link.key) || link.key.replace('nav.', '')}
              </a>
            ))}

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold flex items-center gap-2">
                <Globe size={14} /> {t('nav.language', 'Language')}
              </p>
              <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto">
                {locales.map((locale) => {
                  const isActive = lang === locale.code
                  return (
                    <a
                      key={locale.code}
                      href={locale.code === 'en' ? '/' : `/${locale.code}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                        isActive ? 'bg-green-500/15 text-green-400' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{locale.flag}</span>
                      <span className="truncate">{locale.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <a
              href={`${prefix}/#contact`}
              className="block text-center border border-white/20 hover:border-green-500 text-white/80 hover:text-green-500 font-normal px-6 py-2.5 rounded-[8px] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.getQuote', 'Get a Quote')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
