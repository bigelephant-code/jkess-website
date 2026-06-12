'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'
import { motion } from 'framer-motion'

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

function GradientChip({ label }: { label: string }) {
  return (
    <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-semibold gradient-text">
      {label}
    </span>
  )
}

function ProductCard({ product, idx }: { product: Product; idx: number }) {
  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : []

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left: Product Image */}
      <motion.div
        whileHover={{ y: -2 }}
        className={idx % 2 === 1 ? 'md:order-2' : ''}
      >
        {/* Main image */}
        {allImages.length > 0 ? (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden gradient-border bg-white/[0.02]">
            <Image
              src={allImages[selectedImage]}
              alt={product.name || 'Product'}
              fill
              className="object-contain p-6 transition-all duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl gradient-border flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-20">
                {product.category === 'bms' ? '⚡' : product.category === 'high-voltage-kit' ? '🔋' : '🧩'}
              </div>
              <p className="text-gray-600 text-sm">Product Image</p>
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
                className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border transition-all duration-200 ${
                  selectedImage === i
                    ? 'border-[#5b5bff] ring-1 ring-[#5b5bff]/30'
                    : 'border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-contain p-1.5"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Right: Product info */}
      <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
        <GradientChip label={categoryLabels[product.category || ''] || product.category || ''} />
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 tracking-tight">
          {product.name}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <div className="space-y-3 mb-6">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={16} className="text-[#5b5bff] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={product.slug ? `/products/${product.slug}` : '#contact'}
          className="relative inline-flex items-center gap-2 text-sm font-semibold text-white group"
        >
          <span className="relative z-10 flex items-center gap-2">
            View Details
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#5b5bff] to-transparent" />
        </a>
      </div>
    </div>
  )
}

export default function ProductSection({ products }: { products?: Product[] }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section id="products" className="relative bg-[#010101] py-24 border-t border-white/[0.03] overflow-hidden">
      {/* Subtle background orbs */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #f58a8a, transparent)' }} />
      <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #a66cd9, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Products
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Comprehensive energy storage solutions engineered for reliability and performance
            </p>
          </div>
        </Reveal>

        <StaggerReveal staggerDelay={0.2}>
          <div className="space-y-24">
            {products.map((product, idx) => (
              <StaggerItem key={`product-${idx}`}>
                <ProductCard product={product} idx={idx} />
              </StaggerItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}
