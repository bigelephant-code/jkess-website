'use client'

import { FileText, Download, ArrowLeft, Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

export function DownloadsPageClient() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <div className="min-h-screen bg-white">
      

      <div className="relative pt-32 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm mb-4">
              <Sparkles size={12} className="text-[#a66cd9]" />
              <span>Product Manuals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">Downloads</h1>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Access product manuals, specifications, and technical documents for all JKESS products.
            </p>
          </div>
        </div>
      </div>

      <section className="relative pb-20 z-10">
        <div className="max-w-5xl mx-auto px-6">
          {categories.map((cat, catIdx) => {
            const isOpen = expanded[cat.label] ?? true
            return (
              <div key={cat.label} className="mb-8 last:mb-0">
                <button
                  onClick={() => setExpanded({ ...expanded, [cat.label]: !isOpen })}
                  className="w-full flex items-center justify-between mb-4 group"
                >
                  <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-widest">
                    {cat.label}
                    <span className="ml-2 text-xs text-gray-600 font-normal">({cat.files.length} files)</span>
                  </h2>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="space-y-2">
                    {cat.files.map((file, idx) => (
                      <motion.a
                        key={file.name}
                        href={file.url}
                        download
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        className="group flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 hover:bg-gray-100 transition-all duration-200"
                      >
                        <FileText size={16} className="text-gray-600 shrink-0 group-hover:text-[#5b5bff] transition-colors" />
                        <span className="flex-1 text-sm text-gray-400 group-hover:text-gray-900 transition-colors min-w-0 truncate">
                          {file.name}
                        </span>
                        <Download size={14} className="text-gray-600 shrink-0 group-hover:text-green-500 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600">
              All documents are hosted directly on our servers. Need help finding a document?
              <br />
              <a href="mailto:chinaenergymall@163.com" className="text-[#5b5bff] hover:underline">Contact us</a>
              {' '}and we&apos;ll help you out.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
