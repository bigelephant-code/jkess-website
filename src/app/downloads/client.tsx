'use client'

import { FileText, Download, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DocItem {
  title: string
  description: string
  category: string
  fileUrl: string
  fileSize: string
}

const documents: DocItem[] = [
  {
    title: 'BMS Protection Board Datasheet',
    description: 'Technical specifications, pin configuration, and electrical characteristics for 16S 48V BMS series.',
    category: 'BMS',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/bms-datasheet.pdf',
    fileSize: '1.2 MB',
  },
  {
    title: 'Battery Kit User Manual',
    description: 'Installation guide, operation instructions, and maintenance tips for 15KWh & 16KWh battery kits.',
    category: 'Battery Kit',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/battery-kit-manual.pdf',
    fileSize: '3.5 MB',
  },
  {
    title: '6U Battery Kit Installation Guide',
    description: 'Rack-mount installation, wiring diagrams, and communication setup for JKLU015 model.',
    category: 'Battery Kit',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/6u-kit-guide.pdf',
    fileSize: '2.8 MB',
  },
  {
    title: 'High Voltage Kit Technical Specs',
    description: 'Detailed specifications, system architecture, and safety guidelines for HV series.',
    category: 'High Voltage',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/hv-kit-specs.pdf',
    fileSize: '4.1 MB',
  },
  {
    title: 'CAN / RS485 Communication Protocol',
    description: 'Communication protocol documentation for system integration and monitoring setup.',
    category: 'Technical',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/communication-protocol.pdf',
    fileSize: '1.8 MB',
  },
  {
    title: 'CE & RoHS Certification',
    description: 'Product compliance certificates including CE declaration and RoHS test reports.',
    category: 'Certification',
    fileUrl: 'https://cdn.jsdelivr.net/gh/bigelephant-code/jkess-website/documents/certification.pdf',
    fileSize: '0.9 MB',
  },
]

const categories = [...new Set(documents.map((d) => d.category))]

export function DownloadsPageClient() {
  return (
    <div className="min-h-screen bg-[#010101]">
      {/* Black bg strip for navbar */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-black z-0" />

      {/* ═══════ HEADER ═══════ */}
      <div className="relative pt-32 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-4">
              <Sparkles size={12} className="text-[#a66cd9]" />
              <span>Technical Resources</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Downloads
            </h1>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Access product datasheets, user manuals, installation guides, and certification documents.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════ DOCUMENTS LIST ═══════ */}
      <section className="relative pb-20 z-10">
        <div className="max-w-5xl mx-auto px-6">
          {categories.map((category, catIdx) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="text-lg font-semibold text-white/60 uppercase tracking-widest mb-6">
                {category}
              </h2>
              <div className="space-y-3">
                {documents
                  .filter((d) => d.category === category)
                  .map((doc, idx) => (
                    <motion.a
                      key={idx}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="group block bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 
                        hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] 
                            flex items-center justify-center shrink-0 text-gray-500 group-hover:text-[#5b5bff] 
                            transition-colors duration-300">
                            <FileText size={20} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-white font-medium group-hover:text-[#5b5bff] transition-colors duration-200">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-gray-600">{doc.fileSize}</span>
                          <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] 
                            flex items-center justify-center text-gray-500 group-hover:text-green-500 
                            group-hover:border-green-500/30 transition-all duration-300">
                            <Download size={15} />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          ))}

          {/* ═══════ NOTE ═══════ */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600">
              Documents are hosted on CDN for fast worldwide access. Need a document not listed here?
              <br />
              <a href="mailto:chinaenergymall@163.com" className="text-[#5b5bff] hover:underline">
                Contact us
              </a>
              {' '}and we&apos;ll send it your way.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
