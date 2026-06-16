'use client'
import { useTranslate } from '@/i18n/client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'

interface Product {
  name?: string
  slug?: string
  category?: string
  description?: string
  features?: string[]
  image?: string
  images?: string[]
}

const categoryLabels: Record<string, string> = {
  bms: 'BMS Protection Board',
  'battery-kit': 'Battery Kit',
  'high-voltage-kit': 'High Voltage Kit',
}

function ProductCard({ product, idx }: { product: Product; idx: number }) {
  const t = useTranslate()
  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : []

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Left: Product Image */}
      <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
        {/* Main image */}
        {allImages.length > 0 ? (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group">
            <Image
              src={allImages[selectedImage]}
              alt={product.name || 'Product'}
              fill
              className="object-contain p-4 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {product.category === 'bms' ? '⚡' : product.category === 'high-voltage-kit' ? '🔋' : '🧩'}
              </div>
              <p className="text-gray-400 text-sm">Product Image</p>
            </div>
          </div>
        )}

        {/* Thumbnail gallery */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 bg-gray-50 transition-all ${
                  selectedImage === i
                    ? 'border-green-500 ring-1 ring-green-500/50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product info */}
      <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
        <span className="text-xs uppercase tracking-widest text-green-600 font-semibold">
          {categoryLabels[product.category || ''] || product.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
          {product.name}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <div className="space-y-3 mb-6">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={product.slug ? `/products/${product.slug}` : "#contact"}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-semibold transition-colors"
        >
          {t('productsSection.viewDetails', 'View Details')} <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}

export default function ProductSection({ products }: { products?: Product[] }) {
  const t = useTranslate()
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section id="products" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('productsSection.title', 'Our Products')}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t('productsSection.desc', 'Comprehensive energy storage solutions engineered for reliability and performance')}
            </p>
          </div>
        </Reveal>

        <StaggerReveal staggerDelay={0.2}>
          <div className="space-y-20">
            {products.map((product, idx) => (
              <StaggerItem key={idx}>
                <ProductCard product={product} idx={idx} />
              </StaggerItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}
