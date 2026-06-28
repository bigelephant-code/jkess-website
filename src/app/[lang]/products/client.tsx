'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { StaggerReveal, StaggerItem } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import PageFaqSection from '@/components/PageFaqSection'
import { pageFaqs } from '@/lib/page-faqs'

const categoryLabels: Record<string, string> = {
  bms: 'BMS Protection Board',
  'battery-kit': 'Battery Kit',
  'high-voltage-kit': 'High Voltage Kit',
  'commercial-ess': 'C&I ESS Cabinet',
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  const { lang } = useI18n()

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-0 left-0 right-0 h-[84px] bg-black z-0" />
      <div className="relative pt-32 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6"><div className="h-0" /></div>
      </div>
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerReveal staggerDelay={0.12}>
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={localizedPath(lang, `/products/${product.slug}`)}
                    className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={`${product.name} energy storage product`}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 767px) calc(100vw - 3rem), 46vw"
                          quality={72}
                          priority={index === 0}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-lg font-semibold text-gray-400">
                          JKESS
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
                            <span className="mt-1 text-xs text-green-500">•</span>
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
      <div className="defer-render">
        <PageFaqSection
          faqs={pageFaqs.products}
          title="Product Selection FAQ"
          description="A quick guide to choosing between JKESS battery kits, high voltage kits, and commercial energy storage cabinets."
        />
      </div>
      <div className="defer-render pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-base md:text-lg font-light italic tracking-wide">
            Comprehensive energy storage solutions engineered for reliability and performance
          </p>
        </div>
      </div>
    </div>
  )
}
