'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Minus, Plus, ShoppingCart, Send, ArrowLeft } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, itemCount } = useCart()

  const isShop = product.type === 'shop'

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      variant: product.variants?.[selectedVariant]?.label || 'Standard',
      quantity,
      price: product.variants?.[selectedVariant]?.price || '$0.00',
      image: product.images[0] || '',
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Inquiry: ${product.name}`)
    const body = encodeURIComponent(
      `Product: ${product.name}\n` +
      `Model: ${product.variants?.[selectedVariant]?.label || 'Standard'}\n` +
      `Quantity: ${quantity}\n\n` +
      `Message:\n`
    )
    window.open(`mailto:chinaenergymall@163.com?subject=${subject}&body=${body}`)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </a>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ── Left: Image Gallery ── */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black">
              <Image
                src={product.images[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 bg-black transition-all ${
                      selectedImage === i
                        ? 'border-green-400 ring-1 ring-green-400/50'
                        : 'border-white/10 hover:border-white/30'
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

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
              {product.categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {product.name}
            </h1>
            <p className="text-gray-400 text-lg mb-6">{product.tagline}</p>

            {/* Price */}
            {isShop && product.variants && (
              <div className="mb-6">
                <span className="text-3xl font-bold text-green-400">
                  {product.variants[selectedVariant].price}
                </span>
              </div>
            )}

            {/* Variant selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Model / Specification:</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedVariant === i
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {v.label}
                      {v.price && (
                        <span className="ml-2 text-xs opacity-70">{v.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-3">Quantity:</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 py-2.5 text-white font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              {isShop ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full text-lg transition-all ${
                      addedToCart
                        ? 'bg-green-400 text-black'
                        : 'bg-green-500 hover:bg-green-400 text-black'
                    }`}
                  >
                    {addedToCart ? (
                      <>✓ Added to Cart</>
                    ) : (
                      <>
                        <ShoppingCart size={20} /> Add to Cart
                      </>
                    )}
                  </button>
                  {itemCount > 0 && (
                    <a
                      href="/cart"
                      className="w-full flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3 rounded-full text-base transition-all"
                    >
                      View Cart ({itemCount})
                    </a>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleInquiry}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-full text-lg transition-all"
                  >
                    <Send size={18} /> Get a Quote
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    This product requires a custom quote. We&apos;ll respond within 24 hours.
                  </p>
                </>
              )}
            </div>

            {/* Key features */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold mb-4">Key Features</h3>
              <div className="space-y-3">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-green-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Specs Table ── */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Technical Specifications</h2>
          <div className="max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between px-6 py-4 bg-black"
                >
                  <span className="text-gray-400 text-sm">{spec.key}</span>
                  <span className="text-white text-sm font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
