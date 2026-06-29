import { products, getProductBySlug, getProductFaqs, getProductSeoContent, getProductUseCases, getRelatedProducts } from '@/lib/products'
import { ProductDetailClient } from './client'
import type { Product } from '@/lib/products'
import { locales, defaultLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'
import {
  jsonLd,
  organizationId,
  jkessOfferShippingDetails,
} from '@/lib/structured-data'
import { INITIAL_INVENTORY, isManagedInventorySlug } from '@/lib/inventory-catalog'
import { getInventorySnapshot } from '@/lib/order-store'
import { productVariantCommerce, schemaAvailability } from '@/lib/commerce'
import { getLocalizedProductPageContent } from '@/lib/product-localizations'
import {
  canonicalSeoPath,
  defaultIndexableSeoLocales,
  isSeoLocaleIndexable,
  localizedSeoPath,
  pageLanguageAlternates,
} from '@/lib/seo'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = []
  for (const locale of locales) {
    for (const product of products) {
      params.push({ lang: locale.code, slug: product.slug })
    }
  }
  return params
}

type PurchaseNotice = {
  title: string
  description: string
  schemaValue: string
  metadataSentence: string
}

type ProductSchemaLabels = {
  batteryIncluded: string
  currentInventory: string
  inventoryValue: (stock: number) => string
  applications: string
  compatibleSystems: string
  selectionNotes: string
  projectFit: string
  installationNotes: string
  home: string
  products: string
}

function getPurchaseNotice(product: Product): PurchaseNotice | null {
  if (product.slug === 'battery-kit' || product.slug === '6u-battery-kit') {
    return {
      title: 'Battery cells are not included',
      description:
        'This listing is for the battery kit hardware only. The displayed price covers the enclosure and only the BMS/LCD hardware specified by the selected option. Compatible LiFePO4 cells must be purchased separately.',
      schemaValue: 'No — compatible LiFePO4 battery cells are sold separately',
      metadataSentence: 'Battery cells are not included.',
    }
  }

  if (product.slug === 'high-voltage-kit') {
    return {
      title: 'Battery cells and battery packs are not included',
      description:
        'This listing is for the selected high-voltage BMS control hardware only. The displayed price covers the chosen BCU master control box or BMU slave control box. Battery cells, battery modules, and complete battery packs must be purchased separately.',
      schemaValue: 'No — battery cells, battery modules, and complete battery packs are sold separately',
      metadataSentence: 'Battery cells and battery packs are not included.',
    }
  }

  return null
}

function productKeywords(product: Product) {
  const base = [
    product.name,
    product.categoryLabel,
    'JKESS',
    'JKBMS',
    'energy storage',
    'LiFePO4',
    'battery storage system',
  ]

  const bySlug: Record<string, string[]> = {
    'battery-kit': [
      'battery kit with caster',
      'portable energy storage kit',
      '15kWh battery kit',
      '16kWh battery kit',
      'LiFePO4 battery enclosure',
    ],
    '6u-battery-kit': [
      '6U battery kit',
      'rack mount battery kit',
      '19 inch battery storage',
      'telecom backup battery',
      'rack LiFePO4 battery',
    ],
    'high-voltage-kit': [
      'high voltage battery kit',
      'high voltage BMS',
      'BCU master control box',
      'BMU slave control box',
      '100A high voltage kit',
      '200A high voltage kit',
    ],
    'tness-ci-ess-cabinet': [
      'C&I energy storage cabinet',
      'commercial energy storage cabinet',
      'industrial battery cabinet',
      '215kWh energy storage',
      '261kWh energy storage',
      'liquid cooled energy storage cabinet',
    ],
  }

  return [...base, ...(bySlug[product.slug] || [])]
}

function productLanguageAlternates(product: Product) {
  return pageLanguageAlternates(`/products/${product.slug}`, defaultIndexableSeoLocales)
}

function isReviewedLocalizedProductRoute(product: Product, lang: string) {
  return product.slug === 'battery-kit' && (lang === 'de' || lang === 'fr')
}

function productSchemaLabels(lang: string): ProductSchemaLabels {
  if (lang === 'de') {
    return {
      batteryIncluded: 'Batteriezellen enthalten',
      currentInventory: 'Aktueller Lagerbestand',
      inventoryValue: (stock) => `${stock} Stück`,
      applications: 'Anwendungen',
      compatibleSystems: 'Kompatible Systeme',
      selectionNotes: 'Auswahlhinweise',
      projectFit: 'Projekteignung',
      installationNotes: 'Installationshinweise',
      home: 'Startseite',
      products: 'Produkte',
    }
  }

  if (lang === 'fr') {
    return {
      batteryIncluded: 'Cellules de batterie incluses',
      currentInventory: 'Stock actuel',
      inventoryValue: (stock) => `${stock} unités`,
      applications: 'Applications',
      compatibleSystems: 'Systèmes compatibles',
      selectionNotes: 'Conseils de sélection',
      projectFit: 'Adéquation au projet',
      installationNotes: 'Conseils d’installation',
      home: 'Accueil',
      products: 'Produits',
    }
  }

  return {
    batteryIncluded: 'Battery Included',
    currentInventory: 'Current inventory',
    inventoryValue: (stock) => `${stock} units`,
    applications: 'Applications',
    compatibleSystems: 'Compatible Systems',
    selectionNotes: 'Selection Notes',
    projectFit: 'Project Fit',
    installationNotes: 'Installation Notes',
    home: 'Home',
    products: 'Products',
  }
}

function truncateMetadataDescription(value: string, maxLength = 158) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized

  const truncated = normalized.slice(0, maxLength + 1)
  const lastSpace = truncated.lastIndexOf(' ')
  return `${truncated.slice(0, lastSpace > maxLength * 0.75 ? lastSpace : maxLength).trimEnd()}…`
}

async function productStock(product: Product) {
  if (!isManagedInventorySlug(product.slug)) return null

  try {
    const inventory = await getInventorySnapshot()
    return inventory[product.slug]
  } catch (error) {
    console.error('Unable to load product inventory for structured data:', error)
    return INITIAL_INVENTORY[product.slug]
  }
}

async function productJsonLd(sourceProduct: Product, lang: string) {
  const localizedContent = getLocalizedProductPageContent(sourceProduct, lang)
  const localizedRoute = isReviewedLocalizedProductRoute(sourceProduct, lang)
  const schemaLang = localizedRoute ? lang : defaultLocale
  const p = localizedRoute ? localizedContent.product : sourceProduct
  const productPath = `/products/${sourceProduct.slug}`
  const url = absoluteUrl(localizedSeoPath(schemaLang, productPath))
  const faqs = localizedRoute
    ? localizedContent.product.localizedFaqs ?? getProductFaqs(sourceProduct)
    : getProductFaqs(sourceProduct)
  const useCases = localizedRoute ? localizedContent.useCases : getProductUseCases(sourceProduct)
  const seoContent = localizedRoute ? localizedContent.seoContent : getProductSeoContent(sourceProduct)
  const purchaseNotice = localizedRoute
    ? localizedContent.purchaseNotice ?? getPurchaseNotice(sourceProduct)
    : getPurchaseNotice(sourceProduct)
  const labels = productSchemaLabels(schemaLang)
  const stock = await productStock(sourceProduct)
  const additionalProperty = [
    ...(purchaseNotice
      ? [
          {
            '@type': 'PropertyValue',
            name: labels.batteryIncluded,
            value: purchaseNotice.schemaValue,
          },
        ]
      : []),
    ...p.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.key,
      value: spec.value,
    })),
    ...(stock !== null
      ? [
          {
            '@type': 'PropertyValue',
            name: labels.currentInventory,
            value: labels.inventoryValue(stock),
          },
        ]
      : []),
    {
      '@type': 'PropertyValue',
      name: labels.applications,
      value: useCases.applications.join('; '),
    },
    {
      '@type': 'PropertyValue',
      name: labels.compatibleSystems,
      value: useCases.compatibleSystems.join('; '),
    },
    {
      '@type': 'PropertyValue',
      name: labels.selectionNotes,
      value: useCases.selectionNotes.join('; '),
    },
    {
      '@type': 'PropertyValue',
      name: labels.projectFit,
      value: seoContent.projectFit,
    },
    {
      '@type': 'PropertyValue',
      name: labels.installationNotes,
      value: seoContent.installationNotes.join('; '),
    },
  ]

  const primaryEntity: Record<string, unknown> =
    p.type === 'shop'
      ? {
          '@type': 'Product',
          '@id': `${url}#product`,
          name: p.name,
          sku: sourceProduct.slug,
          description: p.description,
          inLanguage: schemaLang,
          brand: { '@type': 'Brand', name: 'JKESS' },
          manufacturer: { '@id': organizationId },
          image: p.images.map((img) => absoluteUrl(img)),
          url,
          mainEntityOfPage: url,
          additionalProperty,
          category: p.categoryLabel,
          itemCondition: 'https://schema.org/NewCondition',
        }
      : {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: p.name,
          description: p.description,
          inLanguage: schemaLang,
          provider: { '@id': organizationId },
          image: p.images.map((img) => absoluteUrl(img)),
          url,
          mainEntityOfPage: url,
          serviceType: p.categoryLabel,
          category: p.categoryLabel,
          areaServed: 'Direct-checkout destinations plus quote-only project review regions',
          additionalProperty,
        }

  if (p.type === 'shop') {
    const mpn = sourceProduct.specs.find((s) => s.key.toLowerCase().includes('model'))
    if (mpn) primaryEntity.mpn = mpn.value

    const variants = productVariantCommerce(sourceProduct)
    if (variants.length) {
      const availability = schemaAvailability(stock ?? 0)
      primaryEntity.offers = {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: Math.min(...variants.map((variant) => variant.salePrice)),
        highPrice: Math.max(...variants.map((variant) => variant.salePrice)),
        offerCount: variants.length,
        availability,
        offers: variants.map((variant) => ({
          '@type': 'Offer',
          sku: variant.sku,
          name: variant.label,
          price: variant.salePrice,
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceType: 'https://schema.org/StrikethroughPrice',
            price: variant.regularPrice,
            priceCurrency: 'USD',
          },
          availability,
          inventoryLevel:
            stock === null
              ? undefined
              : {
                  '@type': 'QuantitativeValue',
                  value: stock,
                },
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': organizationId },
          url,
          hasMerchantReturnPolicy: {
            '@id': `${absoluteUrl('/returns-refunds')}#policy`,
          },
          shippingDetails: jkessOfferShippingDetails,
        })),
      }
    }
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      primaryEntity,
      {
        '@type': 'BreadcrumbList',
        inLanguage: schemaLang,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: labels.home,
            item: absoluteUrl(localizedSeoPath(schemaLang, '/')),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: labels.products,
            item: absoluteUrl(localizedSeoPath(schemaLang, '/products')),
          },
          { '@type': 'ListItem', position: 3, name: p.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        inLanguage: schemaLang,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return jsonLd(schema)
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await props.params
  const sourceProduct = getProductBySlug(slug)
  if (!sourceProduct) return {}

  const localizedContent = getLocalizedProductPageContent(sourceProduct, lang)
  const product = localizedContent.product
  const indexable = isSeoLocaleIndexable(lang, defaultIndexableSeoLocales)
  const canonicalPath = canonicalSeoPath(lang, `/products/${sourceProduct.slug}`, defaultIndexableSeoLocales)
  const purchaseNotice = localizedContent.purchaseNotice ?? getPurchaseNotice(sourceProduct)
  const noticeSentence = purchaseNotice ? ` ${purchaseNotice.metadataSentence}` : ''
  const shippingSentence = product.type === 'shop'
    ? localizedContent.shippingMetadataSentence
      ?? ' EU delivery addresses include free standard shipping; selected non-EU direct checkout destinations use a flat $150 shipping charge per order.'
    : ''
  const description = truncateMetadataDescription(
    `${product.tagline}.${noticeSentence}${shippingSentence} ${product.description}`
  )

  return {
    title: `${product.name} | ${product.categoryLabel} | JKESS`,
    description,
    keywords: productKeywords(product),
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: productLanguageAlternates(sourceProduct),
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${product.name} | JKESS`,
      description,
      url: absoluteUrl(canonicalPath),
      type: 'website',
      images: product.images[0] ? [absoluteUrl(product.images[0])] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | JKESS`,
      description,
      images: product.images[0] ? [absoluteUrl(product.images[0])] : [],
    },
  }
}

export default async function ProductPage(props: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await props.params
  const sourceProduct = getProductBySlug(slug)
  if (!sourceProduct) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <p className="text-gray-400">Product not found</p>
      </div>
    )
  }

  const localizedContent = getLocalizedProductPageContent(sourceProduct, lang)
  const purchaseNotice = localizedContent.purchaseNotice ?? getPurchaseNotice(sourceProduct)
  const relatedProducts = isReviewedLocalizedProductRoute(sourceProduct, lang)
    ? []
    : getRelatedProducts(sourceProduct)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: await productJsonLd(sourceProduct, lang) }}
      />
      <div className="relative bg-black">
        {purchaseNotice && (
          <div className="absolute inset-x-0 top-24 z-30">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                  <div className="shrink-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
                      {lang === 'de'
                        ? 'Wichtiger Kaufhinweis'
                        : lang === 'fr'
                          ? 'Information importante avant l’achat'
                          : 'Important purchase notice'}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white">{purchaseNotice.title}</h2>
                  </div>
                  <p className="text-sm leading-6 text-amber-50/80">{purchaseNotice.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={purchaseNotice ? 'pt-32' : ''}>
          <ProductDetailClient
            product={localizedContent.product}
            lang={lang}
            relatedProducts={relatedProducts}
            useCases={localizedContent.useCases}
            seoContent={localizedContent.seoContent}
          />
        </div>
      </div>
    </>
  )
}
