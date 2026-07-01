'use client'

import { BatteryCharging, Boxes, Cpu, Download, FileText, Search, Wrench, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { useI18n, useTranslate } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { downloadCategories, getDownloadFileType, getDownloadFileVersion } from '@/lib/downloads'
import PageFaqSection from '@/components/PageFaqSection'
import { pageFaqs } from '@/lib/page-faqs'
import { trackEvent } from '@/lib/analytics'
import { getLocalizedGuide, getLocalizedUiCopy, localizedCategoryLabel } from '@/lib/localized-ui'

const categoryMeta: Record<string, { accent: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  'BMS Protection Board': { accent: '#22c55e', icon: Cpu },
  'Balancing Capacitors': { accent: '#5b5bff', icon: Zap },
  Kits: { accent: '#f58a8a', icon: Boxes },
  'Accessory Manuals': { accent: '#a66cd9', icon: Wrench },
  'High Voltage': { accent: '#f97316', icon: BatteryCharging },
}

export function DownloadsPageClient() {
  const t = useTranslate()
  const { lang } = useI18n()
  const ui = getLocalizedUiCopy(lang)
  const guide = getLocalizedGuide(lang)
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const totalFiles = downloadCategories.reduce((sum, cat) => sum + cat.files.length, 0)
  const visibleCategories = downloadCategories
    .filter((cat) => activeCategory === 'All' || cat.label === activeCategory)
    .map((cat) => ({
      ...cat,
      files: cat.files.filter((file) => file.name.toLowerCase().includes(normalizedQuery)),
    }))
    .filter((cat) => cat.files.length > 0)

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/downloads-banner-bg.webp" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/78 to-gray-900/88" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t('downloads.title')}</h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-gray-300">{t('downloads.desc')}</p>
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10 md:max-w-xl">
              <div className="bg-black/45 px-4 py-4">
                <p className="text-2xl font-bold text-white">{totalFiles}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{ui.documents}</p>
              </div>
              <div className="bg-black/45 px-4 py-4">
                <p className="text-2xl font-bold text-white">{downloadCategories.length}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{ui.categories}</p>
              </div>
              <div className="bg-black/45 px-4 py-4">
                <p className="text-2xl font-bold text-white">PDF</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{ui.manuals}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label={ui.searchDocuments}
                    placeholder={ui.searchManuals}
                    className="w-full border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-green-500 focus:bg-white"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <button
                    onClick={() => setActiveCategory('All')}
                    aria-label={ui.showAllDocuments}
                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                      activeCategory === 'All' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="font-semibold">{ui.allDocuments}</span>
                    <span className="text-xs opacity-70">{totalFiles}</span>
                  </button>

                  {downloadCategories.map((cat) => {
                    const meta = categoryMeta[cat.label]
                    const Icon = meta?.icon || FileText
                    const isActive = activeCategory === cat.label
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setActiveCategory(cat.label)}
                        aria-label={`${ui.showDocuments}: ${localizedCategoryLabel(lang, cat.label)}`}
                        className={`group flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors ${
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-green-300' : 'text-gray-400 group-hover:text-green-500'} />
                        <span className="min-w-0 flex-1 truncate font-semibold">{localizedCategoryLabel(lang, cat.label)}</span>
                        <span className="text-xs opacity-70">{cat.files.length}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="mt-4 border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.nextStep}</p>
                <div className="mt-3 grid gap-2">
                  <Link href={localizedPath(lang, '/products')} className="rounded-lg bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700">
                    {ui.browseProducts}
                  </Link>
                  <Link href={localizedPath(lang, '/shipping-quote')} className="rounded-lg bg-gray-950 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                    {ui.requestProjectQuote}
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${query}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {visibleCategories.length === 0 ? (
                    <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                      <p className="text-sm font-semibold text-gray-900">{ui.noMatchingDocuments}</p>
                      <p className="mt-2 text-sm text-gray-500">{ui.tryAnotherDocument}</p>
                    </div>
                  ) : (
                    visibleCategories.map((cat, catIndex) => {
                      const meta = categoryMeta[cat.label]
                      const Icon = meta?.icon || FileText
                      return (
                        <motion.div
                          key={cat.label}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.35, delay: catIndex * 0.04 }}
                          className="border border-gray-200 bg-white shadow-sm"
                        >
                          <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className="flex h-12 w-12 items-center justify-center"
                                style={{ background: `${meta?.accent || '#22c55e'}14`, color: meta?.accent || '#22c55e' }}
                              >
                                <Icon size={22} />
                              </div>
                              <div>
                                <h2 className="text-lg font-bold text-gray-900">{localizedCategoryLabel(lang, cat.label)}</h2>
                                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{cat.files.length} {ui.documentsAvailable}</p>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{lang === 'en' ? cat.description : guide.desc}</p>
                              </div>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 via-gray-100 to-transparent md:max-w-xs" />
                          </div>

                          <div className="divide-y divide-gray-100">
                            {cat.files.map((file, idx) => (
                              <motion.a
                                key={file.name}
                                href={file.url}
                                download
                                aria-label={`${ui.download}: ${file.name}`}
                                onClick={() => trackEvent('download_document', { file_name: file.name, file_category: cat.label, file_type: getDownloadFileType(file.url), file_version: getDownloadFileVersion(file.name) })}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.22, delay: Math.min(idx * 0.025, 0.18) }}
                                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
                              >
                                <div className="flex h-10 w-10 items-center justify-center border border-gray-200 bg-gray-50 text-gray-500 transition-colors group-hover:border-green-200 group-hover:bg-green-50 group-hover:text-green-600">
                                  <FileText size={18} />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-700">{file.name}</p>
                                  <p className="mt-1 text-xs text-gray-400">
                                    {getDownloadFileType(file.url)} {ui.document} / {getDownloadFileVersion(file.name)}
                                    {file.updated ? ` / ${ui.updated} ${file.updated}` : ''}
                                  </p>
                                  {file.description && <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{file.description}</p>}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="hidden text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-green-600 md:inline">{ui.download}</span>
                                  <Download size={17} className="text-gray-400 transition-colors group-hover:text-green-600" />
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )
                    })
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 border border-gray-200 bg-white px-6 py-5 text-center">
            <p className="text-xs leading-6 text-gray-500">
              {ui.documentHelpPrefix}{' '}
              <a href="mailto:chinaenergymall@163.com" className="font-semibold text-green-600 hover:underline">{ui.contactUs}</a>
              {' '}{ui.documentHelpSuffix}
            </p>
          </div>
        </div>
      </section>
      <PageFaqSection
        faqs={pageFaqs.downloads}
        title={ui.technicalLibraryFaq}
        description={ui.technicalLibraryFaqDesc}
      />
    </div>
  )
}
