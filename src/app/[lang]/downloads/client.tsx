'use client'

import { BatteryCharging, Boxes, Cpu, Download, FileText, Search, Wrench, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { useTranslate } from '@/i18n/client'

interface FileItem {
  name: string
  url: string
}

interface CategoryGroup {
  label: string
  files: FileItem[]
}

const categories: CategoryGroup[] = [
  {
    label: 'BMS Protection Board',
    files: [
      { name: 'JK-B15A24S Active Balancer Protection Board Manual V11.6.1', url: '/downloads/BMS-Protection-Board/JK-B15A24S-Active-Balancer-Protection-Board-Manual-V11.6.1.pdf' },
      { name: 'JK-B2A16S-TH Active Balancer Manual V11.5.1', url: '/downloads/BMS-Protection-Board/JK-B2A16S-TH-Active-Balancer-Manual-V11.5.1.pdf' },
      { name: 'JK-B2A24S Active Balancer Manual V11.5.1', url: '/downloads/BMS-Protection-Board/JK-B2A24S-Active-Balancer-Manual-V11.5.1.pdf' },
      { name: 'JK-B2A25S-RP Active Balancer Relay Protection Board Manual V1.4', url: '/downloads/BMS-Protection-Board/JK-B2A25S-RP-Active-Balancer-Relay-Protection-Board-Manual-V1.4.pdf' },
      { name: 'JK-B2A8S Active Balancer Manual V11.6.2', url: '/downloads/BMS-Protection-Board/JK-B2A8S-Active-Balancer-Manual-V11.6.2.pdf' },
      { name: 'JK-B4A24S Active Balancer Manual V11.1.1', url: '/downloads/BMS-Protection-Board/JK-B4A24S-Active-Balancer-Manual-V11.1.1.pdf' },
      { name: 'JK-B5A24S Active Balancer Protection Board Manual V11.0.1', url: '/downloads/BMS-Protection-Board/JK-B5A24S-Active-Balancer-Protection-Board-Manual-V11.0.1.pdf' },
      { name: 'JK-B5A25S-60P Manual V8.0', url: '/downloads/BMS-Protection-Board/JK-B5A25S-60P-Manual-V8.0.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V15.1.2', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V15.1.2.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V15.1.3 (Mounting Ears)', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V15.1.3-wiht-Mounting-Ears.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V17.1.1', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V17.1.1.pdf' },
      { name: 'JK-WB2A8S-10P-15P-20P-30P Active Balancer Protection Board Manual V1.0', url: '/downloads/BMS-Protection-Board/JK-WB2A8S-10P-15P-20P-30P-Active-Balancer-Protection-Board-Manual-V1.0.pdf' },
      { name: 'JK-WB2A8S-30P Active Balancer Protection Board Manual V15.0.1', url: '/downloads/BMS-Protection-Board/JK-WB2A8S-30P-Active-Balancer-Protection-Board-Manual-V15.0.1.pdf' },
      { name: 'JK-WBD6AxxS-15P Active Balancer External Protection Board Specification', url: '/downloads/BMS-Protection-Board/JK-WBD6AxxS-15P-Active-Balancer-External-Protection-Board-Specification.pdf' },
      { name: 'NY-B2A16S-TH Active Balancer Manual V16.0.2', url: '/downloads/BMS-Protection-Board/NY-B2A16S-TH-Active-Balancer-Manual-V16.0.2.pdf' },
      { name: 'Active Balancer Manual JK-B2A4S V2.1 (Independent Power)', url: '/downloads/BMS-Protection-Board/Active-Balancer-Manual-JK-B2A4S-V2.1-Independent-Power.pdf' },
      { name: 'Protection Board Parameter Settings Manual V2.0', url: '/downloads/BMS-Protection-Board/Protection-Board-Parameter-Settings-Manual-V2.0.pdf' },
      { name: 'Protection Board Parameter Settings Manual V2.2', url: '/downloads/BMS-Protection-Board/Protection-Board-Parameter-Settings-Manual-V2.2.pdf' },
    ],
  },
  {
    label: 'Balancing Capacitors',
    files: [
      { name: 'EK-24S10EB Balancing Capacitor Manual V1.2.1', url: '/downloads/Balancing-Capacitors/EK-24S10EB-Balancing-Capacitor-Manual-V1.2.1.pdf' },
      { name: 'EK-24S15EB Balancing Capacitor Manual V1.61', url: '/downloads/Balancing-Capacitors/EK-24S15EB-Balancing-Capacitor-Manual-V1.61.pdf' },
      { name: 'EK-24S4EB Balancing Capacitor Manual V1.0', url: '/downloads/Balancing-Capacitors/EK-24S4EB-Balancing-Capacitor-Manual-V1.0.pdf' },
      { name: 'EK-24S8EB Balancing Capacitor Manual V1.2.1', url: '/downloads/Balancing-Capacitors/EK-24S8EB-Balancing-Capacitor-Manual-V1.2.1.pdf' },
      { name: 'NEEY Smart Active Balancer Specification', url: '/downloads/Balancing-Capacitors/NEEY-Smart-Active-Balancer-Specification.pdf' },
      { name: 'Capacitor Manual', url: '/downloads/Balancing-Capacitors/Capacitor-Manual.pdf' },
    ],
  },
  {
    label: 'Kits',
    files: [
      { name: '6U Lithium Battery Kit Specification 3.2', url: '/downloads/Kits/6U-Lithium-Battery-Kit-Specification-3.2.pdf' },
      { name: 'Roller Lithium Battery Sheet Metal Kit Manual', url: '/downloads/Kits/Roller-Lithium-Battery-Sheet-Metal-Kit-Manual.pdf' },
    ],
  },
  {
    label: 'Accessory Manuals',
    files: [
      { name: '3.2-Inch Display Manual V1.0', url: '/downloads/Accessory-Manuals/3.2-Inch-Display-Manual-V1.0.pdf' },
      { name: '4.3-Inch Display DW Manual V1.1', url: '/downloads/Accessory-Manuals/4.3-Inch-Display-DW-Manual-V1.1.pdf' },
      { name: '4.3-Inch Display ZX Manual V2.0 (2024.04.09)', url: '/downloads/Accessory-Manuals/4.3-Inch-Display-ZX-Manual-V2.0-20240409.pdf' },
      { name: 'JK-BLMK-5A V3.0 Battery Parallel Module Manual', url: '/downloads/Accessory-Manuals/JK-BLMK-5A-V3.0-Battery-Parallel-Module-Manual.pdf' },
      { name: 'JK-QB2A8S-20P Active Balancer Protection Board Manual V17.0.2', url: '/downloads/Accessory-Manuals/JK-QB2A8S-20P-Active-Balancer-Protection-Board-Manual-V17.0.2.pdf' },
      { name: 'LCD-2.0-LY Display Manual V1.1', url: '/downloads/Accessory-Manuals/LCD-2.0-LY-Display-Manual-V1.1.pdf' },
      { name: 'MK-30V-P2.5FDS Product Specification', url: '/downloads/Accessory-Manuals/MK-30V-P2.5FDS-Product-Specification.pdf' },
      { name: 'P-Link-CR Communication Interface Board Manual V1.0', url: '/downloads/Accessory-Manuals/P-Link-CR-Communication-Interface-Board-Manual-V1.0.pdf' },
      { name: 'USB-TTL Isolation Module Manual', url: '/downloads/Accessory-Manuals/USB-TTL-Isolation-Module-Manual.pdf' },
      { name: 'Smart Positioning Terminal ZX03 Zhixun Specification', url: '/downloads/Accessory-Manuals/Smart-Positioning-Terminal-ZX03-Zhixun-Specification.pdf' },
      { name: 'Voice Alarm Manual V1.0', url: '/downloads/Accessory-Manuals/Voice-Alarm-Manual-V1.0.pdf' },
    ],
  },
  {
    label: 'High Voltage',
    files: [
      { name: 'BCU-B3 Energy Storage Controller Specification', url: '/downloads/High-Voltage/BCU-B3-Energy-Storage-Controller-Specification.docx' },
      { name: 'EMS-E2 Energy Management Unit Specification', url: '/downloads/High-Voltage/EMS-E2-Energy-Management-Unit-Specification.pdf' },
      { name: 'HV-B6U Slave Control Box Specification V1.0 (2026.06.01)', url: '/downloads/High-Voltage/HV-B6U-Slave-Control-Box-Specification-V1.0-20260601.docx' },
      { name: 'HV-BC250 Specification (2026.05.20)', url: '/downloads/High-Voltage/HV-BC250-Specification-20260520.pdf' },
    ],
  },
]

const categoryMeta: Record<string, { accent: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  'BMS Protection Board': { accent: '#22c55e', icon: Cpu },
  'Balancing Capacitors': { accent: '#5b5bff', icon: Zap },
  Kits: { accent: '#f58a8a', icon: Boxes },
  'Accessory Manuals': { accent: '#a66cd9', icon: Wrench },
  'High Voltage': { accent: '#f97316', icon: BatteryCharging },
}

function getFileType(url: string) {
  return url.split('.').pop()?.toUpperCase() || 'FILE'
}

export function DownloadsPageClient() {
  const t = useTranslate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const totalFiles = categories.reduce((sum, cat) => sum + cat.files.length, 0)
  const visibleCategories = categories
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
          <Image src="/images/downloads-banner-bg.png" alt="" fill className="object-cover" priority sizes="100vw" />
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
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Documents</p>
              </div>
              <div className="bg-black/45 px-4 py-4">
                <p className="text-2xl font-bold text-white">{categories.length}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Categories</p>
              </div>
              <div className="bg-black/45 px-4 py-4">
                <p className="text-2xl font-bold text-white">PDF</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Manuals</p>
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
                    placeholder="Search manuals"
                    className="w-full border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-green-500 focus:bg-white"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <button
                    onClick={() => setActiveCategory('All')}
                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                      activeCategory === 'All' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="font-semibold">All Documents</span>
                    <span className="text-xs opacity-70">{totalFiles}</span>
                  </button>

                  {categories.map((cat) => {
                    const meta = categoryMeta[cat.label]
                    const Icon = meta?.icon || FileText
                    const isActive = activeCategory === cat.label
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setActiveCategory(cat.label)}
                        className={`group flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors ${
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-green-300' : 'text-gray-400 group-hover:text-green-500'} />
                        <span className="min-w-0 flex-1 truncate font-semibold">{cat.label}</span>
                        <span className="text-xs opacity-70">{cat.files.length}</span>
                      </button>
                    )
                  })}
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
                      <p className="text-sm font-semibold text-gray-900">No matching documents</p>
                      <p className="mt-2 text-sm text-gray-500">Try another product name or document type.</p>
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
                                <h2 className="text-lg font-bold text-gray-900">{cat.label}</h2>
                                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{cat.files.length} documents available</p>
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
                                  <p className="mt-1 text-xs text-gray-400">{getFileType(file.url)} document</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="hidden text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-green-600 md:inline">Download</span>
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
              All documents are hosted directly on our servers. Need help finding a document?{' '}
              <a href="mailto:chinaenergymall@163.com" className="font-semibold text-green-600 hover:underline">Contact us</a>
              {' '}and we&apos;ll help you out.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
