'use client'

import { Check, ArrowRight } from 'lucide-react'

interface ProductFeature {
  key?: string
  value?: string
}

interface Product {
  name?: string
  category?: string
  description?: string
  features?: string[]
  specifications?: ProductFeature[]
}

const categoryLabels: Record<string, string> = {
  bms: 'BMS Protection Board',
  'battery-kit': 'Battery Kit',
  'high-voltage-kit': 'High Voltage Kit',
}

export default function ProductSection({ products }: { products?: Product[] }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section id="products" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Comprehensive energy storage solutions engineered for reliability and performance
          </p>
        </div>

        <div className="space-y-20">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              {/* Left: Image placeholder */}
              <div className={`${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[4/3] bg-gradient-to-br from-green-900/30 to-black border border-white/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {product.category === 'bms' ? '⚡' : product.category === 'high-voltage-kit' ? '🔋' : '🧩'}
                    </div>
                    <p className="text-gray-500 text-sm">Product Image</p>
                  </div>
                </div>
              </div>

              {/* Right: Product info */}
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
                  {categoryLabels[product.category || ''] || product.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                  {product.name}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.features && product.features.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-green-400 mt-0.5 shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Get a Quote <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
