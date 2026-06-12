'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { Product } from '@/lib/products'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal'
import { motion } from 'framer-motion'

const categoryIcons: Record<string, string> = {
  bms: '⚡',
  'battery-kit': '🔋',
  'high-voltage-kit': '🔌',
}

const categoryLabels: Record<string, string> = {
  bms: 'BMS Protection Board',
  'battery-kit': 'Battery Kit',
  'high-voltage-kit': 'High Voltage Kit',
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  return (
    <div className="min-h-screen bg-[#010101]">
      {/* ═══════ HEADER ═══════ */}
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-4">
              <Sparkles size={12} className="text-[#a66cd9]" />
              <span>Product Catalog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Our <span className="gradient-text">Products</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ═══════ PRODUCT GRID ═══════ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerReveal staggerDelay={0.12}>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] bg-white/[0.01] overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-6xl opacity-20">
                          {categoryIcons[product.category] || '📦'}
                        </div>
                      )}
                      {/* Category badge */}
                      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.1em] font-semibold gradient-text border border-white/[0.06] px-3 py-1 rounded-full glass">
                        {categoryLabels[product.category] || product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5b5bff] group-hover:to-[#f58a8a] transition-all duration-300">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>

                      {/* Feature highlights */}
                      <div className="space-y-1.5 mb-4">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[#5b5bff] text-[10px] mt-1">●</span>
                            <span className="text-xs text-gray-500">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-all group-hover:gap-3">
                        View Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════ BOTTOM TAGLINE ═══════ */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-base md:text-lg font-light italic tracking-wide">
            Comprehensive energy storage solutions engineered for reliability and performance
          </p>
        </div>
      </div>
    </div>
  )
}
