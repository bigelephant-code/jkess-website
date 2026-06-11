'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Minus, Plus, ShoppingCart, Send, ArrowLeft, Star, StarHalf, Shield, Truck, RotateCcw } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { Reveal, StaggerItem } from '@/components/ScrollReveal'

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

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => { window.location.href = '/cart' }, 300)
  }

  const handleInquiry = () => {
    const subject = encodeURIComponent('Inquiry: ' + product.name)
    const body = encodeURIComponent(
      'Product: ' + product.name + '\n' +
      'Model: ' + (product.variants?.[selectedVariant]?.label || 'Standard') + '\n' +
      'Quantity: ' + quantity + '\n\n' +
      'Message:\n'
    )
    window.open('mailto:chinaenergymall@163.com?subject=' + subject + '&body=' + body)
  }

  const currentPrice = product.variants?.[selectedVariant]?.price

  return (
    <div className="min-h-screen bg-black">
      {/* ═══════ DARK SECTION: Hero + Product Info ═══════ */}
      <div className="bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Back link */}
          <Link href="/#products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-6 pt-2">
            <ArrowLeft size={16} /> <span>Back to Products</span>
          </Link>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>

          {/* Product Info + Image Gallery */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mb-8">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
                <Image
                  src={product.images[selectedImage] || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute top-4 left-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {isShop ? 'In Stock' : 'Custom Order'}
                </span>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={'relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border-2 bg-[#0d0d0d] transition-all ' + (selectedImage === i ? 'border-green-400 ring-1 ring-green-400/50' : 'border-white/10 hover:border-white/30')}
                    >
                      <Image src={img} alt={product.name + ' view ' + (i + 1)} fill className="object-contain p-1" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">{product.categoryLabel}</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-1 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">{product.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex text-yellow-400">
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><StarHalf size={16} fill="currentColor" />
                </div>
                <span className="text-sm text-gray-400">4.8 (128 reviews)</span>
              </div>

              {/* Price */}
              {isShop && currentPrice && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                  <span className="text-3xl md:text-4xl font-bold text-green-400">{currentPrice}</span>
                  <span className="text-sm text-gray-500 ml-2 line-through">
                    {'$' + (parseFloat(currentPrice.replace(/[$,]/g, '')) * 1.15).toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">-15% OFF</span>
                </div>
              )}

              {/* Variant selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-5">
                  <p className="text-sm text-gray-400 mb-2">
                    Model: <span className="text-white font-medium">{product.variants[selectedVariant].label}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button key={i} onClick={() => setSelectedVariant(i)}
                        className={'px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ' + (selectedVariant === i ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/10 text-gray-300 hover:border-white/30')}>
                        {v.label}
                        <span className="ml-1.5 text-xs opacity-60">{v.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Quantity:</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 text-gray-400 hover:text-white"><Minus size={16} /></button>
                    <span className="px-6 py-2.5 text-white font-medium min-w-[3rem] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2.5 text-gray-400 hover:text-white"><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                {isShop ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={handleAddToCart}
                        className={'flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl text-base transition-all ' + (addedToCart ? 'bg-green-400 text-black' : 'bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30')}>
                        {addedToCart ? '✓ Added' : <><ShoppingCart size={18} /> Add to Cart</>}
                      </button>
                      <button onClick={handleBuyNow} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3.5 rounded-xl text-base transition-all">
                        Buy Now
                      </button>
                    </div>
                    {itemCount > 0 && (
                      <Link href="/cart" className="block text-center text-sm text-gray-500 hover:text-white transition-colors">
                        View Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={handleInquiry} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-xl text-lg transition-all">
                      <Send size={18} /> Get a Quote
                    </button>
                    <p className="text-xs text-gray-500 text-center">This product requires a custom quote. We&apos;ll respond within 24 hours.</p>
                  </>
                )}
              </div>

              {/* Service badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div className="text-center"><Truck size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">Free Shipping</p></div>
                <div className="text-center"><Shield size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">2-Year Warranty</p></div>
                <div className="text-center"><RotateCcw size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">30-Day Returns</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ LIGHT SECTION: Technical Specifications ═══════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Technical Specifications</h2>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {product.specs.map((spec, i) => (
                <div key={i} className={'flex justify-between items-center px-5 md:px-8 py-4 ' + (i % 2 === 0 ? 'bg-gray-50' : 'bg-white')}>
                  <span className="text-gray-500 text-sm">{spec.key}</span>
                  <span className="text-gray-900 text-sm font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ LIGHT SECTION: Customer Reviews ═══════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Customer Reviews</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-center md:text-left md:min-w-[160px]">
                <div className="text-4xl font-bold text-gray-900">4.8</div>
                <div className="flex justify-center md:justify-start text-yellow-500 my-1">
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><StarHalf size={16} fill="currentColor" />
                </div>
                <p className="text-sm text-gray-500">128 Reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 w-4 text-right">{star}</span>
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: (star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : 3) + '%' }} />
                    </div>
                    <span className="text-gray-400 w-10 text-xs text-right">{star === 5 ? '92' : star === 4 ? '23' : star === 3 ? '8' : '3'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-sm font-bold text-white">{review.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{review.name}</p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: review.rating }).map((_, j) => (<Star key={j} size={14} fill="currentColor" />))}
                      </div>
                    </div>
                    {review.variant && <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-2">Model: {review.variant}</span>}
                    <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ LIGHT SECTION: Product Details ═══════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Product Details</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <h3 className="text-gray-900 font-semibold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Full-width detail images */}
              {product.detailImages && product.detailImages.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-gray-900 font-semibold mb-4">Product Gallery</h3>
                  <div className="flex flex-col gap-6">
                    {product.detailImages.map((img, i) => (
                      <div key={i} className="w-full rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={img}
                          alt={product.name + ' detail ' + (i + 1)}
                          className="w-full h-auto"
                          loading={i < 2 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

// ── Mock Reviews ──
const reviews = [
  {
    name: 'Marco Rossi',
    date: '2026-05-28',
    rating: 5,
    variant: '16S 48V 200A',
    content: 'Excellent BMS board. Installation was straightforward and the Bluetooth monitoring app works perfectly. Highly recommend for DIY battery builds.',
  },
  {
    name: 'Klaus Müller',
    date: '2026-05-15',
    rating: 5,
    variant: '15KWh Kit',
    content: 'The battery kit arrived well-packaged and earlier than expected. Everything was included as described. Very happy with the build quality.',
  },
  {
    name: 'Jean-Pierre Dubois',
    date: '2026-04-22',
    rating: 4,
    variant: '16S 48V 300A',
    content: 'Solid product for the price. The active balancing works well. Would be nice to have a longer cable for the LCD display, but otherwise great.',
  },
  {
    name: 'David Chen',
    date: '2026-04-10',
    rating: 5,
    variant: '16KWh Kit',
    content: 'Used this for my home solar backup system. The IP54 enclosure is perfect for outdoor installation. Customer support was also very responsive.',
  },
]
