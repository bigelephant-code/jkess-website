'use client'

import { ArrowUpRight, BarChart3, CalendarDays, Factory, Filter, Globe2, Landmark, Search, TrendingUp, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { useI18n, useTranslate } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { getLocalizedGuide, getLocalizedUiCopy, localizedCategoryLabel } from '@/lib/localized-ui'

import { news, type NewsItem } from '@/lib/news'

const categoryMeta: Record<NewsItem['category'], { color: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  Market: { color: '#4f46e5', icon: BarChart3 },
  Technology: { color: '#16a34a', icon: Zap },
  Policy: { color: '#ea580c', icon: Landmark },
  Industry: { color: '#7c3aed', icon: Factory },
}

const categoryOptions = ['All', 'Market', 'Technology', 'Policy', 'Industry'] as const
const yearOptions = ['All', ...Array.from(new Set(news.map((item) => item.date.slice(0, 4))))] as const
const signalHighlights = [
  { label: '2026 Storage Outlook', value: '300 GWh', note: 'Global installation signal' },
  { label: 'BMS Growth Path', value: '20.6%', note: 'Projected CAGR to 2031' },
  { label: 'Cost Direction', value: '-20%', note: 'Expected ESS system decline' },
]
const editorialLenses = [
  { title: 'Market Pulse', text: 'Track deployment volume, cost movement, and regional demand signals across storage markets.', category: 'Market' as const },
  { title: 'Technology Watch', text: 'Follow BMS, LFP, sodium-ion, diagnostics, and high-voltage architecture developments.', category: 'Technology' as const },
  { title: 'Policy Radar', text: 'Monitor regulation, incentive, safety, and compliance shifts affecting ESS projects.', category: 'Policy' as const },
]

function formatDate(dateText: string, lang: string) {
  return new Intl.DateTimeFormat(lang || 'en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(dateText))
}

export default function NewsPage() {
  const t = useTranslate()
  const { lang } = useI18n()
  const ui = getLocalizedUiCopy(lang)
  const guide = getLocalizedGuide(lang)
  const [activeCategory, setActiveCategory] = useState<(typeof categoryOptions)[number]>('All')
  const [activeYear, setActiveYear] = useState<(typeof yearOptions)[number]>('All')
  const [query, setQuery] = useState('')

  const featured = news[0]
  const normalizedQuery = query.trim().toLowerCase()
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesYear = activeYear === 'All' || item.date.startsWith(activeYear)
      const matchesQuery = !normalizedQuery
        || item.title.toLowerCase().includes(normalizedQuery)
        || item.summary.toLowerCase().includes(normalizedQuery)
        || item.source.toLowerCase().includes(normalizedQuery)
        || item.region.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesYear && matchesQuery
    })
  }, [activeCategory, activeYear, normalizedQuery])

  const groupedNews = yearOptions
    .filter((year) => year !== 'All')
    .map((year) => ({
      year,
      items: filteredNews.filter((item) => item.date.startsWith(year)),
    }))
    .filter((group) => group.items.length > 0)
  const categoryCounts = categoryOptions
    .filter((category) => category !== 'All')
    .map((category) => ({
      category,
      count: news.filter((item) => item.category === category).length,
    }))
  const latestDate = formatDate(featured.date, lang)
  const localizedSignals = lang === 'en'
    ? signalHighlights
    : [
        { label: guide.europe, value: signalHighlights[0].value, note: guide.desc },
        { label: guide.hvEss, value: signalHighlights[1].value, note: guide.desc },
        { label: guide.commercialEurope, value: signalHighlights[2].value, note: guide.desc },
      ]
  const localizedLenses = lang === 'en'
    ? editorialLenses
    : [
        { title: guide.europe, text: guide.desc, category: 'Market' as const },
        { title: guide.hvEss, text: guide.desc, category: 'Technology' as const },
        { title: guide.enclosureEu, text: guide.desc, category: 'Policy' as const },
      ]

  return (
    <div className="min-h-screen bg-[#f3f6f5] text-gray-950">
      <section className="relative min-h-[680px] overflow-hidden bg-[#07110d]">
        <div className="absolute inset-0">
          <Image src="/images/news-banner-bg.webp" alt="" fill className="object-cover opacity-70" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.96)_0%,rgba(2,18,12,0.92)_43%,rgba(4,33,38,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f3f6f5] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pt-28 pb-24 md:pt-36 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">{t('news.title')}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{t('news.desc')}</p>

            <div className="mt-10 grid max-w-3xl gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              <MetricTile value={news.length.toString()} label={ui.curatedUpdates} />
              <MetricTile value={(categoryOptions.length - 1).toString()} label={ui.researchLenses} />
              <MetricTile value={`${yearOptions.length - 1}Y`} label={ui.signalHistory} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="border border-white/12 bg-black/35 p-5 shadow-2xl shadow-black/30 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">{ui.liveBrief}</p>
                <p className="mt-1 text-sm text-slate-400">{latestDate}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {localizedSignals.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.note}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${78 - index * 12}%` }}
                      transition={{ duration: 0.9, delay: 0.35 + index * 0.15 }}
                      className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {localizedLenses.map((lens, index) => {
              const meta = categoryMeta[lens.category]
              const Icon = meta.icon
              return (
                <motion.button
                  key={lens.title}
                  onClick={() => setActiveCategory(lens.category)}
                  aria-label={`${ui.showing}: ${localizedCategoryLabel(lang, lens.category)}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-gray-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center" style={{ background: `${meta.color}14`, color: meta.color }}>
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-300 transition-colors group-hover:text-emerald-600" />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-gray-950">{lens.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{lens.text}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="group grid overflow-hidden border border-gray-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_440px]"
          >
            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 via-cyan-500 to-indigo-500" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-gray-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                  <CalendarDays size={14} />
                  {ui.leadStory}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{latestDate}</span>
              </div>
              <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-emerald-700 md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-500 md:text-base">{featured.summary}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CategoryPill category={featured.category} lang={lang} />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  <Globe2 size={14} />
                  {featured.region}
                </span>
                <span className="ml-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors group-hover:text-emerald-700">
                  {ui.readSource}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
            <div className="relative min-h-72 border-t border-gray-200 bg-gray-950 lg:border-l lg:border-t-0">
              <Image src="/images/news-featured-energy-storage.jpg" alt="Battery energy storage system cabinets for energy storage industry news" fill className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 440px, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/85" />
              <div className="absolute bottom-5 left-5 right-5 border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-gray-400">{ui.source}</p>
                <p className="mt-2 text-lg font-bold text-white">{featured.source}</p>
              </div>
            </div>
          </motion.a>

          <div className="mt-8 grid gap-6 lg:grid-cols-[310px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Filter size={16} className="text-emerald-600" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{ui.refineFeed}</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label={ui.searchNews}
                    placeholder={ui.searchNews}
                    className="w-full border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{ui.topic}</p>
                  <div className="space-y-1">
                    {categoryOptions.map((category) => {
                      const isActive = activeCategory === category
                      const count = category === 'All' ? news.length : news.filter((item) => item.category === category).length
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          aria-label={`${ui.showing}: ${localizedCategoryLabel(lang, category)}`}
                          className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                            isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="font-semibold">{category === 'All' ? ui.allTopics : localizedCategoryLabel(lang, category)}</span>
                          <span className="text-xs opacity-70">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{ui.year}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        aria-label={`${ui.year}: ${year === 'All' ? ui.allYears : year}`}
                        className={`px-3 py-2 text-sm font-semibold transition-colors ${
                          activeYear === year ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {year === 'All' ? ui.allYears : year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{ui.applyInsight}</p>
                <div className="mt-3 grid gap-2">
                  <Link href={localizedPath(lang, '/products/high-voltage-kit')} className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
                    High Voltage Kit
                  </Link>
                  <Link href={localizedPath(lang, '/products/tness-ci-ess-cabinet')} className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
                    C&I ESS Cabinet
                  </Link>
                  <Link href={localizedPath(lang, '/contact')} className="rounded-lg bg-gray-950 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                    {ui.discussProject}
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-5 flex flex-col gap-3 border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.showing}</p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{filteredNews.length} {ui.updates}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryCounts.map(({ category, count }) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      aria-label={`${ui.showing}: ${localizedCategoryLabel(lang, category)}`}
                      className="group inline-flex items-center gap-2"
                    >
                      <CategoryPill category={category} compact lang={lang} />
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-700">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeYear}-${query}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {groupedNews.length === 0 ? (
                    <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                      <p className="text-sm font-semibold text-gray-900">{ui.noMatchingNews}</p>
                      <p className="mt-2 text-sm text-gray-500">{ui.tryAnotherNews}</p>
                    </div>
                  ) : (
                    groupedNews.map((group) => (
                      <section key={group.year}>
                        <div className="mb-4 flex items-center gap-4">
                          <h2 className="text-2xl font-bold text-gray-950">{group.year}</h2>
                          <div className="h-px flex-1 bg-gray-200" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{group.items.length} {ui.itemsLabel}</span>
                        </div>
                        <div className="relative grid gap-4 xl:grid-cols-2">
                          {group.items.map((item, index) => (
                            <NewsCard key={item.date + item.title} item={item} index={index} lang={lang} />
                          ))}
                        </div>
                      </section>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryPill({ category, compact = false, lang = 'en' }: { category: NewsItem['category']; compact?: boolean; lang?: string }) {
  const meta = categoryMeta[category]
  const Icon = meta.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}`}
      style={{ background: `${meta.color}14`, color: meta.color }}
    >
      <Icon size={compact ? 12 : 14} />
      {localizedCategoryLabel(lang, category)}
    </span>
  )
}

function NewsCard({ item, index, lang }: { item: NewsItem; index: number; lang: string }) {
  const meta = categoryMeta[item.category]
  const Icon = meta.icon
  const ui = getLocalizedUiCopy(lang)

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.18) }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: meta.color }} />
      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center opacity-10 transition-opacity group-hover:opacity-20" style={{ color: meta.color }}>
        <Icon size={42} />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryPill category={item.category} compact lang={lang} />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              <Globe2 size={12} />
              {item.region}
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">{formatDate(item.date, lang)}</p>
        </div>
        <ArrowUpRight size={18} className="shrink-0 text-gray-300 transition-colors group-hover:text-emerald-600" />
      </div>
      <h3 className="mt-4 pr-8 text-base font-bold leading-snug text-gray-950 transition-colors group-hover:text-emerald-700">{item.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">{item.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-semibold text-gray-500">{item.source}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors group-hover:text-emerald-700">{ui.readMore}</span>
      </div>
    </motion.a>
  )
}

function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-black/45 px-5 py-4 backdrop-blur-sm">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  )
}
