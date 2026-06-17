'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { StaggerReveal, StaggerItem } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'

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
  const { lang } = useI18n()

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-0 left-0 right-0 h-[85px] bg-black z-0" />
      <div className="relative pt-32 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6"><div className="h-0" /></div>
      </div>
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerReveal staggerDelay={0.12}>
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={`/${lang === 'en' ? '' : lang + '/'}products/${product.slug}`}
                    className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-6xl">
                          {categoryIcons[product.category] || '📦'}
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {categoryLabels[product.category] || product.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-green-500 text-xs mt-1">●</span>
                            <span className="text-xs text-gray-600">{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        View Details <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-base md:text-lg font-light italic tracking-wide whitespace-nowrap">
            Comprehensive energy storage solutions engineered for reliability and performance
          </p>
        </div>
      </div>
    </div>
  )
}
