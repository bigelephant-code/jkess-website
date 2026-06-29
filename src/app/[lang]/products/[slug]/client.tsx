'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  FileText,
  Minus,
  Newspaper,
  Plus,
  RotateCcw,
  Send,
  Shield,
  ShoppingCart,
  Truck,
} from 'lucide-react'
import type { Product, ProductFaq, ProductSeoContent, ProductUseCases } from '@/lib/products'
import { getProductFaqs } from '@/lib/products'
import { isManagedInventorySlug } from '@/lib/inventory-catalog'
import { useCart } from '@/context/CartContext'
import { useI18n } from '@/i18n/client'
import { trackEvent } from '@/lib/analytics'
import {
  SALE_DISCOUNT_PERCENT,
  formatUsd,
  productVariantCommerce,
} from '@/lib/commerce'

type ProductWithLocalizedFaqs = Product & {
  localizedFaqs?: ProductFaq[]
}

type ProductDetailCopy = {
  packageScope: string
  whatsIncluded: string
  whatsNotIncluded: string
  applications: string
  compatibleSystems: string
  selectionNotes: string
  projectFit: string
  selectionGuidance: string
  installationNotes: string
  procurementNotes: string
  buyerNotes: string
  configureForProject: string
  buyerNotesBody: string
  requestQuote: string
  requestQuoteText: string
  checkDocuments: string
  checkDocumentsText: string
  readInsights: string
  readInsightsText: string
  faqTitle: string
  technicalDownloads: string
  technicalDownloadsText: string
  industryInsights: string
  industryInsightsText: string
  projectInquiry: string
  projectInquiryText: string
  relatedProducts: string
}

export function ProductDetailClient({
  product,
  lang,
  relatedProducts,
  useCases,
  seoContent,
}: {
  product: Product
  lang: string
  relatedProducts: Product[]
  useCases: ProductUseCases
  seoContent: ProductSeoContent
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, itemCount, items, inventory, inventoryLoaded } = useCart()
  const { t } = useI18n()

  const isShop = product.type === 'shop'
  const prefix = lang === 'en' ? '' : '/' + lang
  const faqs = (product as ProductWithLocalizedFaqs).localizedFaqs ?? getProductFaqs(product)
  const currentPrice = product.variants?.[selectedVariant]?.price
  const currentCommerce = productVariantCommerce(product)[selectedVariant] || null
  const managedStock = isManagedInventorySlug(product.slug) ? inventory[product.slug] : null
  const productQuantityInCart = items
    .filter((item) => item.slug === product.slug)
    .reduce((sum, item) => sum + item.quantity, 0)
  const availableToAdd = managedStock === null
    ? null
    : Math.max(0, managedStock - productQuantityInCart)
  const soldOut = isShop && managedStock !== null && managedStock <= 0
  const noMoreAvailable = isShop && availableToAdd !== null && availableToAdd <= 0
  const discountLabel = t('product.discountOff', '-{discount}% OFF')
    .replace('{discount}', String(SALE_DISCOUNT_PERCENT))
  const promoPriceNote = t(
    'product.promoPriceNote',
    'The displayed price is the current promotional price after the {discount}% discount.'
  ).replace('{discount}', String(SALE_DISCOUNT_PERCENT))
  const availableToAddLabel = availableToAdd === null
    ? null
    : t('product.availableToAdd', '{count} available to add')
      .replace('{count}', availableToAdd.toLocaleString('en-US'))
  const itemCountLabel = itemCount === 1
    ? t('product.item', 'item')
    : t('product.items', 'items')
  const detailCopy: ProductDetailCopy = {
    packageScope: t('product.packageScope', 'Package Scope'),
    whatsIncluded: t('product.whatsIncluded', 'What’s Included'),
    whatsNotIncluded: t('product.whatsNotIncluded', 'What’s Not Included'),
    applications: t('product.applications', 'Applications'),
    compatibleSystems: t('product.compatibleSystems', 'Compatible Systems'),
    selectionNotes: t('product.selectionNotes', 'Selection Notes'),
    projectFit: t('product.projectFit', 'Project Fit'),
    selectionGuidance: t('product.selectionGuidance', 'Selection guidance for {name}')
      .replace('{name}', product.name),
    installationNotes: t('product.installationNotes', 'Installation notes'),
    procurementNotes: t('product.procurementNotes', 'Procurement notes'),
    buyerNotes: t('product.buyerNotes', 'Buyer Notes'),
    configureForProject: t('product.configureForProject', 'Configure {name} for your project')
      .replace('{name}', product.name),
    buyerNotesBody: t(
      'product.buyerNotesBody',
      'Share the target voltage, capacity, inverter or PCS model, installation environment, and expected order quantity so JKESS can confirm the right configuration before production.'
    ),
    requestQuote: t('product.requestQuote', 'Request quote'),
    requestQuoteText: t('product.requestQuoteText', 'Get configuration support and pricing.'),
    checkDocuments: t('product.checkDocuments', 'Check documents'),
    checkDocumentsText: t('product.checkDocumentsText', 'Review manuals and datasheets.'),
    readInsights: t('product.readInsights', 'Read insights'),
    readInsightsText: t('product.readInsightsText', 'Follow BMS and ESS market updates.'),
    faqTitle: t('product.faqTitle', 'Frequently Asked Questions'),
    technicalDownloads: t('product.technicalDownloads', 'Technical Downloads'),
    technicalDownloadsText: t(
      'product.technicalDownloadsText',
      'Datasheets, manuals, and product resources.'
    ),
    industryInsights: t('product.industryInsights', 'Industry Insights'),
    industryInsightsText: t(
      'product.industryInsightsText',
      'Battery storage market and BMS technology updates.'
    ),
    projectInquiry: t('product.projectInquiry', 'Project Inquiry'),
    projectInquiryText: t(
      'product.projectInquiryText',
      'Ask for configuration support or a quotation.'
    ),
    relatedProducts: t('product.relatedProducts', 'Related Products'),
  }

  useEffect(() => {
    if (availableToAdd === null || availableToAdd <= 0) return
    setQuantity((current) => Math.min(current, availableToAdd))
  }, [availableToAdd])

  const handleAddToCart = () => {
    if (soldOut || noMoreAvailable) return
    const variant = product.variants?.[selectedVariant]
    const allowedQuantity = availableToAdd === null ? quantity : Math.min(quantity, availableToAdd)
    if (allowedQuantity <= 0) return

    addItem({
      slug: product.slug,
      name: product.name,
      variant: variant?.label || 'Standard',
      quantity: allowedQuantity,
      price: variant?.price || '$0.00',
      image: product.images[0] || '',
    })
    trackEvent('add_to_cart', {
      item_id: product.slug,
      item_name: product.name,
      item_variant: variant?.label || 'Standard',
      quantity: allowedQuantity,
      value: variant?.price ? parseFloat(variant.price.replace(/[$,]/g, '')) * allowedQuantity : undefined,
      currency: 'USD',
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    if (soldOut || noMoreAvailable) return
    trackEvent('buy_now_click', {
      item_id: product.slug,
      item_name: product.name,
      quantity,
    })
    handleAddToCart()
    setTimeout(() => {
      window.location.href = `${prefix}/cart`
    }, 300)
  }

  const handleInquiry = () => {
    const variant = product.variants?.[selectedVariant]
    trackEvent('product_inquiry_click', {
      item_id: product.slug,
      item_name: product.name,
      item_variant: variant?.label || 'Standard',
      quantity,
    })
    const subject = encodeURIComponent(`Product Inquiry - JKESS ${product.name}`)
    const body = encodeURIComponent(
      [
        `Product: ${product.name}`,
        `Model / Option: ${variant?.label || 'Standard'}`,
        `Quantity: ${quantity}`,
        '',
        'Message:',
      ].join('\n')
    )
    window.open(`mailto:zhou@jkess.com?subject=${subject}&body=${body}`)
  }

  const stockLabel = !isShop
    ? t('product.customOrder', 'Custom Order')
    : !inventoryLoaded
      ? t('product.checkingStock', 'Checking stock…')
      : soldOut
        ? t('product.outOfStock', 'Out of stock')
        : managedStock !== null
          ? t('product.unitsInStock', '{count} units in stock')
            .replace('{count}', managedStock.toLocaleString('en-US'))
          : t('product.inStock', 'In Stock')

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link
            href={`${prefix}/#products`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-6 pt-2"
          >
            <ArrowLeft size={16} />
            <span>{t('product.backToProducts', 'Back to Products')}</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href={`${prefix}/`} className="hover:text-white transition-colors">
              {t('nav.home', 'Home')}
            </Link>
            <span>/</span>
            <Link href={`${prefix}/#products`} className="hover:text-white transition-colors">
              {t('nav.products', 'Products')}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-4">
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
                <span className={`absolute top-4 left-4 text-black text-xs font-bold px-3 py-1 rounded-full ${soldOut ? 'bg-gray-300' : 'bg-green-500'}`}>
                  {stockLabel}
                </span>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`Show ${product.name} image ${index + 1}`}
                      className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border-2 bg-[#0d0d0d] transition-all ${
                        selectedImage === index
                          ? 'border-green-400 ring-1 ring-green-400/50'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-contain p-1" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">{product.categoryLabel}</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-1 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">{product.tagline}</p>

              {isShop && currentPrice && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                  <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                    <span className="text-3xl md:text-4xl font-bold text-green-400">{currentPrice}</span>
                    {currentCommerce && (
                      <>
                        <span className="pb-1 text-sm text-gray-400 line-through">
                          {formatUsd(currentCommerce.regularPrice)}
                        </span>
                        <span className="mb-1 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-300">
                          {discountLabel}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-green-300/80">
                    {promoPriceNote}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    {t(
                      'product.shippingRuleDetail',
                      'EU delivery addresses include free standard shipping. Supported non-EU direct checkout destinations add $150 per order. Other countries require a shipping quote before online payment. Import duties, taxes, customs clearance fees, and brokerage charges are not included unless expressly stated.'
                    )}
                  </p>
                  <Link
                    href={`${prefix}/shipping-quote`}
                    className="mt-2 inline-flex text-xs font-semibold text-amber-200 underline decoration-amber-200/40 underline-offset-4 hover:text-amber-100"
                  >
                    {t(
                      'product.shippingQuoteBeforePayment',
                      'Request a destination shipping quote before payment'
                    )}
                  </Link>
                  {managedStock !== null && (
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      {t(
                        'product.sharedInventoryNote',
                        'Inventory is shared across this product’s options and is deducted after verified payment.'
                      )}
                    </p>
                  )}
                </div>
              )}

              {product.variants && product.variants.length > 1 && (
                <div className="mb-5">
                  <p className="text-sm text-gray-400 mb-2">
                    {t('product.model', 'Model')}: <span className="text-white font-medium">{product.variants[selectedVariant].label}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.label}
                        type="button"
                        onClick={() => setSelectedVariant(index)}
                        aria-label={`Select ${variant.label}`}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          selectedVariant === index
                            ? 'border-green-500 bg-green-500/10 text-green-400'
                            : 'border-white/10 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        {variant.label}
                        <span className="ml-1.5 text-xs opacity-60">{variant.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">
                  {t('product.quantity', 'Quantity')}:
                  {availableToAddLabel && (
                    <span className="ml-2 text-xs text-gray-500">{availableToAddLabel}</span>
                  )}
                </p>
                <div className="flex items-center border border-white/10 rounded-xl bg-white/5 w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label={t('product.decreaseQuantity', 'Decrease quantity')}
                    disabled={quantity <= 1 || soldOut}
                    className="px-4 py-2.5 text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 py-2.5 text-white font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => availableToAdd === null ? current + 1 : Math.min(current + 1, Math.max(1, availableToAdd)))}
                    aria-label={t('product.increaseQuantity', 'Increase quantity')}
                    disabled={soldOut || noMoreAvailable || (availableToAdd !== null && quantity >= availableToAdd)}
                    className="px-4 py-2.5 text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {isShop ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={soldOut || noMoreAvailable}
                        className={`flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl text-base transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                          addedToCart
                            ? 'bg-green-400 text-black'
                            : 'bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {soldOut
                          ? t('product.outOfStock', 'Out of stock')
                          : noMoreAvailable
                            ? t('product.stockInCart', 'Available stock in cart')
                            : addedToCart
                              ? t('product.added', 'Added')
                              : <><ShoppingCart size={18} /> {t('product.addToCart', 'Add to Cart')}</>}
                      </button>
                      <button
                        type="button"
                        onClick={handleBuyNow}
                        disabled={soldOut || noMoreAvailable}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3.5 rounded-xl text-base transition-all disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                      >
                        {t('product.buyNow', 'Buy Now')}
                      </button>
                    </div>
                    {itemCount > 0 && (
                      <Link href={`${prefix}/cart`} className="block text-center text-sm text-gray-500 hover:text-white transition-colors">
                        {t('nav.viewCart', 'View Cart')} ({itemCount} {itemCountLabel})
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <button type="button" onClick={handleInquiry} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-xl text-lg transition-all">
                      <Send size={18} /> {t('product.getQuote', 'Get a Quote')}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      {t(
                        'product.customQuoteResponse',
                        'This product requires a custom quotation. JKESS normally responds within 24 business hours.'
                      )}
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div className="text-center"><Truck size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.shippingSummary', 'EU free shipping; supported regions $150/order')}</p></div>
                <div className="text-center"><Shield size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.warranty', '1-Year Warranty')}</p></div>
                <div className="text-center"><RotateCcw size={18} className="mx-auto mb-1 text-green-400" /><p className="text-xs text-gray-500">{t('product.returnsSubjectToPolicy', 'Returns subject to policy')}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('product.technicalSpecs', 'Technical Specifications')}</h2>
          </div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {product.specs.map((spec, index) => (
              <div key={`${spec.key}-${spec.value}`} className={`flex justify-between items-center gap-6 px-5 md:px-8 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <span className="text-gray-500 text-sm">{spec.key}</span>
                <span className="text-gray-900 text-sm font-medium text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('product.productDetails', 'Product Details')}</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

            <div className="grid gap-5 md:grid-cols-2 mb-10">
              <ScopeCard scopeLabel={detailCopy.packageScope} title={detailCopy.whatsIncluded} items={product.included} included />
              <ScopeCard scopeLabel={detailCopy.packageScope} title={detailCopy.whatsNotIncluded} items={product.notIncluded} />
            </div>

            <h3 className="text-gray-900 font-semibold mb-4">{t('product.keyFeatures', 'Key Features')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-8 grid gap-4 lg:grid-cols-3">
              <ProductUseCasePanel title={detailCopy.applications} items={useCases.applications} />
              <ProductUseCasePanel title={detailCopy.compatibleSystems} items={useCases.compatibleSystems} />
              <ProductUseCasePanel title={detailCopy.selectionNotes} items={useCases.selectionNotes} />
            </div>

            <ProductSeoPanel product={product} seoContent={seoContent} copy={detailCopy} />
            <ProductDecisionPanel product={product} prefix={prefix} copy={detailCopy} />

            {faqs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-gray-900 font-semibold mb-4">{detailCopy.faqTitle}</h3>
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
              <ResourceLink href={`${prefix}/downloads`} icon={FileText} title={detailCopy.technicalDownloads} text={detailCopy.technicalDownloadsText} />
              <ResourceLink href={`${prefix}/news`} icon={Newspaper} title={detailCopy.industryInsights} text={detailCopy.industryInsightsText} />
              <ResourceLink href={`${prefix}/contact`} icon={Send} title={detailCopy.projectInquiry} text={detailCopy.projectInquiryText} />
            </div>

            {relatedProducts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-gray-900 font-semibold mb-4">{detailCopy.relatedProducts}</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedProducts.map((item) => (
                    <Link key={item.slug} href={`${prefix}/products/${item.slug}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-green-200 hover:bg-green-50">
                      <div className="relative aspect-[4/3] bg-gray-50">
                        <Image src={item.images[0] || '/placeholder.svg'} alt={`${item.name} product image`} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-600">{item.categoryLabel}</p>
                        <h4 className="mt-2 text-sm font-semibold text-gray-900">{item.name}</h4>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{item.tagline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {product.detailImages && product.detailImages.length > 0 && (
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">{t('product.productGallery', 'Product Gallery')}</h3>
                <div className="flex flex-col">
                  {product.detailImages.map((image, index) => (
                    <div key={image} className="w-full">
                      <Image
                        src={image}
                        alt={`${product.name} detail ${index + 1}`}
                        width={1400}
                        height={900}
                        className="w-full h-auto block"
                        loading={index < 2 ? 'eager' : 'lazy'}
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

function ScopeCard({
  scopeLabel,
  title,
  items,
  included = false,
}: {
  scopeLabel: string
  title: string
  items: string[]
  included?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${included ? 'border-green-200 bg-green-50/60' : 'border-amber-200 bg-amber-50/60'}`}>
      <p className={`text-xs font-bold uppercase tracking-widest ${included ? 'text-green-700' : 'text-amber-700'}`}>{scopeLabel}</p>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            {included ? <Check size={17} className="mt-0.5 shrink-0 text-green-600" /> : <Minus size={17} className="mt-0.5 shrink-0 text-amber-600" />}
            <p className="text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductUseCasePanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <Check size={16} className="mt-0.5 shrink-0 text-green-500" />
            <p className="text-sm leading-6 text-gray-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductSeoPanel({
  product,
  seoContent,
  copy,
}: {
  product: Product
  seoContent: ProductSeoContent
  copy: ProductDetailCopy
}) {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-600">{copy.projectFit}</p>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{copy.selectionGuidance}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-600">{seoContent.projectFit}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <SeoNoteList title={copy.installationNotes} items={seoContent.installationNotes} />
        <SeoNoteList title={copy.procurementNotes} items={seoContent.procurementNotes} />
      </div>
    </div>
  )
}

function SeoNoteList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <Check size={15} className="mt-1 shrink-0 text-green-500" />
            <p className="text-sm leading-6 text-gray-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductDecisionPanel({
  product,
  prefix,
  copy,
}: {
  product: Product
  prefix: string
  copy: ProductDetailCopy
}) {
  const specSummary = product.specs.slice(0, 3).map((spec) => `${spec.key}: ${spec.value}`)
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-white">
      <div className="grid gap-px bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-gray-950 p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-300">{copy.buyerNotes}</p>
          <h3 className="mt-3 text-lg font-bold">{copy.configureForProject}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-300">{copy.buyerNotesBody}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {specSummary.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300">{item}</span>)}
          </div>
        </div>
        <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
          <DecisionLink href={`${prefix}/contact`} icon={Send} title={copy.requestQuote} text={copy.requestQuoteText} />
          <DecisionLink href={`${prefix}/downloads`} icon={FileText} title={copy.checkDocuments} text={copy.checkDocumentsText} />
          <DecisionLink href={`${prefix}/news`} icon={Newspaper} title={copy.readInsights} text={copy.readInsightsText} />
        </div>
      </div>
    </div>
  )
}

function DecisionLink({ href, icon: Icon, title, text }: { href: string; icon: typeof Send; title: string; text: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 bg-gray-900 p-5 transition-colors hover:bg-gray-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-green-300"><Icon size={18} /></div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-gray-400 group-hover:text-gray-300">{text}</p>
      </div>
    </Link>
  )
}

function ResourceLink({ href, icon: Icon, title, text }: { href: string; icon: typeof Send; title: string; text: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-green-200 hover:bg-green-50">
      <Icon size={18} className="mb-3 text-green-600" />
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-gray-500">{text}</p>
    </Link>
  )
}
