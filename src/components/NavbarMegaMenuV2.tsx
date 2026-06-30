'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Globe, Menu, ShoppingCart, X } from 'lucide-react'
import LanguageFlag from '@/components/LanguageFlag'
import { useCart } from '@/context/CartContext'
import { useI18n } from '@/i18n/client'
import { localeMap, locales } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'
import { navigationGroups } from '@/lib/navigation-menu'

const languageGroups = [
  ['West & Central Europe', ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt']],
  ['Nordic', ['sv', 'da', 'fi']],
  ['Central & Eastern Europe', ['pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'el']],
  ['Baltics & Balkans', ['hr', 'sl', 'lt', 'lv', 'et']],
  ['CIS & Middle East', ['ru', 'uk', 'fa', 'tr']],
] as const satisfies ReadonlyArray<readonly [string, readonly LangCode[]]>

const MENU_CLOSE_DELAY_MS = 140

export default function NavbarMegaMenuV2() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLElement>(null)
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { itemCount } = useCart()
  const { lang, t } = useI18n()
  const pathname = usePathname()
  const prefix = lang === 'en' ? '' : `/${lang}`
  const localePattern = new RegExp(`^/(${locales.map((locale) => locale.code).join('|')})(?=/|$)`)
  const neutralPath = pathname.replace(localePattern, '') || '/'
  const activeGroup = navigationGroups.find((group) => group.key === activeMenu && group.items)
  const currentLocale = localeMap.get(lang)!
  const languageHref = (code: LangCode) => code === 'en' ? neutralPath : `/${code}${neutralPath === '/' ? '' : neutralPath}`

  const cancelMenuClose = () => {
    if (menuCloseTimer.current) {
      clearTimeout(menuCloseTimer.current)
      menuCloseTimer.current = null
    }
  }

  const closeMenu = () => {
    cancelMenuClose()
    setActiveMenu(null)
  }

  const scheduleMenuClose = () => {
    cancelMenuClose()
    menuCloseTimer.current = setTimeout(() => {
      setActiveMenu(null)
      menuCloseTimer.current = null
    }, MENU_CLOSE_DELAY_MS)
  }

  const openMenu = (key: string) => {
    cancelMenuClose()
    setLanguageOpen(false)
    setActiveMenu(key)
  }

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < 100 || current < lastScrollY.current)
      lastScrollY.current = current
      cancelMenuClose()
      setActiveMenu(null)
      setLanguageOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    cancelMenuClose()
    const timeout = window.setTimeout(() => {
      setActiveMenu(null)
      setLanguageOpen(false)
      setMobileOpen(false)
      setMobileGroup(null)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [pathname])

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        cancelMenuClose()
        setActiveMenu(null)
        setLanguageOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  useEffect(() => () => cancelMenuClose(), [])

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => { closeMenu(); setLanguageOpen(false) }}
      style={{ transform: `translateX(-50%) translateY(${visible ? '0' : '-120px'})` }}
      className="fixed left-1/2 top-2 z-50 w-[97%] max-w-[1580px] rounded-[17px] border border-white/[0.07] bg-black/70 shadow-2xl shadow-black/30 backdrop-blur-xl transition-transform duration-500"
    >
      <AnimatePresence initial={false}>
        {languageOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden overflow-hidden rounded-t-[17px] border-b border-white/[0.06] bg-black/90 lg:block"
          >
            <div className="px-8 py-6">
              <div className="mx-auto grid max-w-[1400px] grid-cols-5 gap-x-6">
                {languageGroups.map(([groupLabel, codes]) => (
                  <div key={groupLabel}>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-400">{groupLabel}</p>
                    <div className="space-y-0.5">
                      {codes.map((code) => {
                        const locale = localeMap.get(code)
                        if (!locale) return null
                        const active = lang === code
                        return (
                          <a key={code} href={languageHref(code)} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-base transition-colors ${active ? 'bg-green-500/15 text-green-400' : 'text-gray-200 hover:bg-white/10 hover:text-white'}`}>
                            <LanguageFlag code={code} />
                            <span className="text-base leading-none">{locale.name}</span>
                            {active && <span className="ml-auto text-sm font-bold">✓</span>}
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

      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-start px-5 lg:px-7">
        <a href={prefix || '/'} className="shrink-0" onMouseEnter={closeMenu}>
          <Image src="/images/jkess-logo-cropped.png" alt="JKESS" width={160} height={48} className="h-12 w-auto brightness-0 invert" priority />
        </a>

        <div className="ml-auto hidden items-center gap-2 lg:flex xl:gap-4">
          {navigationGroups.map((group) => group.items ? (
            <button
              key={group.key}
              type="button"
              onMouseEnter={() => openMenu(group.key)}
              onMouseLeave={scheduleMenuClose}
              onFocus={() => openMenu(group.key)}
              onClick={() => setActiveMenu(activeMenu === group.key ? null : group.key)}
              aria-expanded={activeMenu === group.key}
              className={`flex items-center gap-1 rounded-xl px-3 py-2 text-base font-semibold transition ${activeMenu === group.key ? 'bg-white/10 text-green-400' : 'text-white hover:bg-white/10 hover:text-green-400'}`}
            >
              {t(`nav.${group.key}`, group.label)}
              <motion.span animate={{ rotate: activeMenu === group.key ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={15} /></motion.span>
            </button>
          ) : (
            <a key={group.key} href={`${prefix}${group.href}`} onMouseEnter={closeMenu} className="rounded-xl px-3 py-2 text-base font-semibold text-white transition hover:bg-white/10 hover:text-green-400">
              {t(`nav.${group.key}`, group.label)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex" onMouseEnter={closeMenu}>
          <button
            type="button"
            onClick={() => { setActiveMenu(null); setLanguageOpen((current) => !current) }}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-white transition hover:bg-white/10 hover:text-green-400 ${languageOpen ? 'bg-white/10 text-green-400' : ''}`}
            aria-label={`Change language. Current language: ${currentLocale.name}`}
            aria-expanded={languageOpen}
          >
            <Globe size={21} /><LanguageFlag code={lang} size="sm" />
          </button>
          <a href={`${prefix}/cart`} className="relative rounded-xl p-2 text-white transition hover:bg-white/10 hover:text-green-400" aria-label={`View cart with ${itemCount} items`}>
            <ShoppingCart size={22} />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">{itemCount > 99 ? '99+' : itemCount}</span>}
          </a>
          <a href={`${prefix}/shipping-quote`} className="rounded-xl bg-green-500 px-4 py-2.5 text-base font-bold text-black transition hover:bg-green-400">
            {t('nav.getQuote', 'Get a Quote')}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a href={`${prefix}/cart`} className="relative text-white" aria-label={`View cart with ${itemCount} items`}>
            <ShoppingCart size={24} />
            {itemCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">{itemCount > 99 ? '99+' : itemCount}</span>}
          </a>
          <button type="button" onClick={() => setMobileOpen((current) => !current)} className="text-white" aria-label="Toggle navigation menu" aria-expanded={mobileOpen}>{mobileOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeGroup?.items && (
          <motion.div
            key={activeGroup.key}
            initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            onMouseEnter={() => openMenu(activeGroup.key)}
            onMouseLeave={scheduleMenuClose}
            className="absolute left-1/2 top-[calc(100%+8px)] hidden w-[min(94vw,1180px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/[0.98] shadow-2xl shadow-black/60 backdrop-blur-2xl lg:block"
          >
            <div className="grid lg:grid-cols-[300px_1fr]">
              <div className="border-r border-white/10 bg-gradient-to-br from-green-500/15 via-white/[0.03] to-transparent p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">{activeGroup.label}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">Explore {activeGroup.label}</h2>
                <p className="mt-4 text-sm leading-6 text-gray-400">{activeGroup.description}</p>
                <a href={`${prefix}${activeGroup.href}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300">View overview <ArrowUpRight size={16} /></a>
              </div>
              <div className={`grid gap-2 p-4 ${activeGroup.items.length > 4 ? 'xl:grid-cols-3' : 'md:grid-cols-2'}`}>
                {activeGroup.items.map((item, index) => (
                  <motion.a key={item.href} href={`${prefix}${item.href}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + index * 0.035, duration: 0.18 }} className="group rounded-xl border border-transparent p-4 transition hover:border-green-400/25 hover:bg-white/[0.06]">
                    <div className="flex items-start justify-between gap-4">
                      <div><h3 className="text-sm font-bold text-white group-hover:text-green-400">{item.label}</h3><p className="mt-2 text-xs leading-5 text-gray-500 group-hover:text-gray-300">{item.description}</p></div>
                      <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-gray-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-400" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden border-t border-white/[0.06] bg-black/90 lg:hidden">
            <div className="max-h-[calc(100vh-96px)] overflow-y-auto px-5 py-5">
              <a href={prefix || '/'} className="block rounded-xl px-4 py-3 text-lg font-semibold text-white hover:bg-white/10">{t('nav.home', 'Home')}</a>
              <a href={`${prefix}/products`} className="block rounded-xl px-4 py-3 text-lg font-semibold text-white hover:bg-white/10">{t('nav.shop', 'Shop')}</a>
              {navigationGroups.filter((group) => group.items).map((group) => {
                const expanded = mobileGroup === group.key
                return (
                  <div key={group.key} className="border-t border-white/[0.06]">
                    <button type="button" onClick={() => setMobileGroup(expanded ? null : group.key)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-lg font-semibold text-white hover:bg-white/10" aria-expanded={expanded}>
                      {t(`nav.${group.key}`, group.label)}<motion.span animate={{ rotate: expanded ? 180 : 0 }}><ChevronDown size={18} /></motion.span>
                    </button>
                    <AnimatePresence initial={false}>{expanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-1 pb-3 pl-3">
                          <a href={`${prefix}${group.href}`} className="flex items-center justify-between rounded-xl bg-green-500/10 px-4 py-3 text-sm font-bold text-green-400">View {group.label} overview <ArrowUpRight size={15} /></a>
                          {group.items?.map((item) => <a key={item.href} href={`${prefix}${item.href}`} className="block rounded-xl px-4 py-3 hover:bg-white/[0.06]"><p className="text-sm font-semibold text-white">{item.label}</p><p className="mt-1 text-xs leading-5 text-gray-500">{item.description}</p></a>)}
                        </div>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                )
              })}
              <div className="mt-4 border-t border-white/10 pt-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500"><Globe size={15} /> {t('nav.language', 'Language')}</p>
                <div className="grid grid-cols-2 gap-1.5">{locales.map((locale) => <a key={locale.code} href={languageHref(locale.code)} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${lang === locale.code ? 'bg-green-500/15 text-green-400' : 'text-gray-300 hover:bg-white/10'}`}><LanguageFlag code={locale.code} size="sm" /><span className="truncate">{locale.name}</span></a>)}</div>
              </div>
              <a href={`${prefix}/shipping-quote`} className="mt-5 block rounded-xl bg-green-500 px-6 py-3.5 text-center font-bold text-black">{t('nav.getQuote', 'Get a Quote')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
