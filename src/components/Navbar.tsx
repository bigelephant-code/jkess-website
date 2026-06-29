'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart, Globe } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/i18n/client'
import { locales, localeMap } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'

const navLinks = [
  { key: 'nav.home', label: 'Home', href: '/' },
  { key: 'nav.shop', label: 'Products', href: '/products' },
  { key: 'nav.solutions', label: 'Solutions', href: '/commercial-energy-storage' },
  { key: 'nav.guides', label: 'Guides', href: '/news' },
  { key: 'nav.about', label: 'About', href: '/about' },
  { key: 'nav.downloads', label: 'Downloads', href: '/downloads' },
  { key: 'nav.quality', label: 'Quality', href: '/quality-and-manufacturing' },
  { key: 'nav.shippingQuote', label: 'Shipping Quote', href: '/shipping-quote' },
  { key: 'nav.contact', label: 'Contact', href: '/contact' },
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
  const pathname = usePathname()
  const prefix = lang === 'en' ? '' : '/' + lang

  const currentLocale = localeMap.get(lang)!
  const localePattern = new RegExp(`^/(${locales.map((locale) => locale.code).join('|')})(?=/|$)`)
  const languageNeutralPath = pathname.replace(localePattern, '') || '/'
  const languageHref = (code: LangCode) =>
    code === 'en'
      ? languageNeutralPath
      : `/${code}${languageNeutralPath === '/' ? '' : languageNeutralPath}`

  useEffect(() => { visibleRef.current = visible }, [visible])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current + 2) {
        scrollDirection.current = 'down'
      } else if (currentScrollY < lastScrollY.current - 2) {
        scrollDirection.current = 'up'
      }
      lastScrollY.current = currentScrollY
      setLangOpen(false)

      const isCurrentlyVisible = visibleRef.current

      if (currentScrollY <= 10) {
        setAtTop(true)
        if (!isCurrentlyVisible) {
          wasHidden.current = true
          setVisible(true)
        }
      } else if (scrollDirection.current === 'down' && currentScrollY > 100) {
        setAtTop(false)
        setVisible(false)
      } else if (scrollDirection.current === 'up' && !isCurrentlyVisible) {
        setAtTop(currentScrollY <= 10)
        wasHidden.current = true
        setVisible(true)
      } else {
        setAtTop(false)
        if (!isCurrentlyVisible) setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (visible && wasHidden.current) {
      setJustAppeared(true)
      wasHidden.current = false
      setTimeout(() => setJustAppeared(false), 400)
    }
  }, [visible])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        transition: 'all 0.5s ease-in-out',
        transform: `translateX(-50%) translateY(${visible ? '0' : '-120px'})`,
      }}
      className={`fixed z-50 left-1/2 bg-black/50 border border-white/[0.04] ${
        atTop
          ? 'top-0 w-full max-w-none rounded-none'
          : 'top-2 w-[97%] max-w-[1580px] rounded-[17px]'
      }`}
    >
      <AnimatePresence>
        {justAppeared && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
            style={{ borderRadius: 'inherit' }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-navbar-sweep" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-black/90 border-b border-white/[0.06] rounded-t-[17px]"
          >
            <div className="px-8 py-6">
              <div className="grid grid-cols-5 gap-x-6 gap-y-0 max-w-[1400px] mx-auto">
                {languageGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2 font-semibold">{group.label}</p>
                    <div className="space-y-0.5">
                      {group.codes.map((code) => {
                        const locale = localeMap.get(code)
                        if (!locale) return null
                        const isActive = lang === code
                        return (
                          <a
                            key={code}
                            href={languageHref(code)}
                            className={`flex items-center gap-2 px-2 py-2 rounded-lg text-base transition-colors ${
                              isActive
                                ? 'bg-green-500/15 text-green-400'
                                : 'text-gray-200 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="text-2xl shrink-0 leading-none flex items-center self-center">{locale.flag}</span>
                            <span className="text-base leading-none self-center translate-y-px">{locale.name}</span>
                            {isActive && <span className="text-green-400 text-sm ml-auto font-bold">✓</span>}
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

      <div className="px-6 h-20 flex items-center justify-between">
        <a href={prefix || '/'} className="flex items-center">
          <Image
            src="/images/jkess-logo-cropped.png"
            alt="JKESS"
            width={160}
            height={48}
            className="h-12 w-auto brightness-0 invert"
            priority
          />
        </a>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={`${prefix}${link.href}`}
              className="relative text-xs xl:text-sm tracking-wide font-medium text-white transition-colors duration-200 before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-0 before:w-0 before:h-[1px] before:bg-green-500 before:rounded-full before:transition-all before:duration-300 hover:before:w-full"
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
                {t(link.key, link.label).split('').map((char: string, index: number) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                      rest: { y: 0, color: 'rgba(255,255,255,1)', transition: { duration: 0.2 } },
                      hover: { y: -2, color: '#22c55e', transition: { duration: 0.2 } },
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </a>
          ))}

          <button
            onClick={() => setLangOpen(!langOpen)}
            aria-label="Change language"
            aria-expanded={langOpen}
            className="flex items-center gap-1.5 text-white hover:text-green-500 transition-colors duration-200 text-xl"
          >
            <Globe size={22} />
            <span className="text-xl leading-none">{currentLocale.flag}</span>
          </button>

          <a
            href={`${prefix}/cart`}
            aria-label={`View cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            className="relative text-white hover:text-green-500 transition-colors duration-200"
          >
            <ShoppingCart size={23} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <a href={`${prefix}/cart`} aria-label={`View cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} className="relative text-white">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu" aria-expanded={isOpen}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black/70 border-t border-white/[0.04] px-6 py-5 space-y-4 rounded-b-[17px] overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={`${prefix}${link.href}`}
                className="block text-xl tracking-wider font-medium text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t(link.key, link.label)}
              </a>
            ))}

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold flex items-center gap-2">
                <Globe size={16} /> {t('nav.language', 'Language')}
              </p>
              <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto">
                {locales.map((locale) => {
                  const isActive = lang === locale.code
                  return (
                    <a
                      key={locale.code}
                      href={languageHref(locale.code)}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                        isActive ? 'bg-green-500/15 text-green-400' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{locale.flag}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{locale.code.toUpperCase()}</span>
                      <span className="truncate">{locale.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <a
              href={`${prefix}/contact`}
              className="block text-center border border-white/20 hover:border-green-500 text-white hover:text-green-500 font-normal px-6 py-2.5 rounded-[8px] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.getQuote', 'Get a Quote')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
