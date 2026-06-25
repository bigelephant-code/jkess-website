'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, FileText, Minus, Newspaper, Plus, ShoppingCart, Send, ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react'
import type { Product } from '@/lib/products'
import { getProductFaqs } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { useI18n } from '@/i18n/client'

export function ProductDetailClient({ product, lang }: { product: Product; lang: string }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, itemCount } = useCart()
  const { t } = useI18n()

  const isShop = product.type === 'shop'
  const prefix = lang === 'en' ? '' : '/' + lang
  const faqs = getProductFaqs(product)

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
    setTimeout(() => { window.location.href = `${prefix}/cart` }, 300)
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
      {/* DARK SECTION: Hero + Product Info */}
      <div className="bg-black pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link href={`${prefix}/#products`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-6 pt-2">
            <ArrowLeft size={16} /> <span>{t('nav.shop', 'Back to Products')}</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href={`${prefix}/`} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${prefix}/#products`} className="hover:text-white transition-colors">{t('nav.shop', 'Products')}</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 mb-4">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
                <Image
                  src={product.images[selectedImage] || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute top-4 left-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {isShop ? t('product.inStock', 'In Stock') : t('product.customOrder', 'Custom Order')}
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

              {isShop && currentPrice && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                  <span className="text-3xl md:text-4xl font-bold text-green-400">{currentPrice}</span>
                  <span className="text-sm text-gray-500 ml-2 line-through">
                    {'$' + (parseFloat(currentPrice.replace(/[$,]/g, '')) * 1.15).toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">-15% OFF</span>
                </div>
              )}

              {product.variants && product.variants.length > 1 && (
                <div className="mb-5">
                  <p className="text-sm text-gray-400 mb-2">
                    {t('product.model', 'Model')}: <span className="text-white font-medium">{product.variants[selectedVariant].label}</span>
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
              <div className="space-y-3 mb-4">
                {isShop ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={handleAddToCart}
                        className={'flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl text-base transition-all ' + (addedToCart ? 'bg-green-400 text-black' : 'bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30')}>
                        {addedToCart ? <>{t('product.added', 'Added')}</> : <><ShoppingCart size={18} /> {t('product.addToCart', 'Add to Cart')}</>}
                      </button>
                      <button onClick={handleBuyNow} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3.5 rounded-xl text-base transition-all">
                        {t('product.buyNow', 'Buy Now')}
                      </button>
                    </div>
                    {itemCount > 0 && (
                      <Link href={`${prefix}/cart`} className="block text-center text-sm text-gray-500 hover:text-white transition-colors">
                        {t('nav.viewCart', 'View Cart')} ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={handleInquiry} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-xl text-lg transition-all">
                      <Send size={18} /> {t('product.getQuote', 'Get a Quote')}
                    </button>
                    <p className="text-xs text-gray-500 text-center">This product requires a custom quote. We&apos;ll respond within 24 hours.</p>
                  </>
                )}
              </div>

              {/* Service badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div className="text-center"><Truck size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.freeShipping', 'Free Shipping')}</p></div>
                <div className="text-center"><Shield size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.warranty', '1-Year Warranty')}</p></div>
                <div className="text-center"><RotateCcw size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.returns', '7-Day Returns')}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('product.technicalSpecs', 'Technical Specifications')}</h2>
          </div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div key={i} className={'flex justify-between items-center px-5 md:px-8 py-4 ' + (i % 2 === 0 ? 'bg-gray-50' : 'bg-white')}>
                <span className="text-gray-500 text-sm">{spec.key}</span>
                <span className="text-gray-900 text-sm font-medium text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('product.productDetails', 'Product Details')}</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            <h3 className="text-gray-900 font-semibold mb-4">{t('product.keyFeatures', 'Key Features')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{feat}</span>
                </div>
              ))}
            </div>
            {faqs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-gray-900 font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="bg-white px-5 py-4">
                      <h4 className="text-sm font-semibold text-gray-900">{faq.question}</h4>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-8 grid gap-3 md:grid-cols-3">
              <Link href={`${prefix}/downloads`} className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-green-200 hover:bg-green-50">
                <FileText size={18} className="mb-3 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-900">Technical Downloads</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">Datasheets, manuals, and product resources.</p>
              </Link>
              <Link href={`${prefix}/news`} className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-green-200 hover:bg-green-50">
                <Newspaper size={18} className="mb-3 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-900">Industry Insights</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">Battery storage market and BMS technology updates.</p>
              </Link>
              <Link href={`${prefix}/contact`} className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-green-200 hover:bg-green-50">
                <Send size={18} className="mb-3 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-900">Project Inquiry</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">Ask for configuration support or a quotation.</p>
              </Link>
            </div>
            {product.detailImages && product.detailImages.length > 0 && (
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">{t('product.productGallery', 'Product Gallery')}</h3>
                <div className="flex flex-col">
                  {product.detailImages.map((img, i) => (
                    <div key={i} className="w-full">
                      <Image
                        src={img}
                        alt={product.name + ' detail ' + (i + 1)}
                        width={1400}
                        height={900}
                        className="w-full h-auto block"
                        loading={i < 2 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
