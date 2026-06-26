import { products, getProductBySlug, getProductFaqs, getProductSeoContent, getProductUseCases, getRelatedProducts } from '@/lib/products'
import { ProductDetailClient } from './client'
import type { Product } from '@/lib/products'
import { locales, defaultLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = []
  for (const locale of locales) {
    for (const product of products) {
      params.push({ lang: locale.code, slug: product.slug })
    }
  }
  return params
}

function productPath(product: Product, lang: string) {
  return `${lang === defaultLocale ? '' : '/' + lang}/products/${product.slug}`
}

function isBatteryEnclosureKit(product: Product) {
  return product.slug === 'battery-kit' || product.slug === '6u-battery-kit'
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
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        locale.code,
        absoluteUrl(productPath(product, locale.code)),
      ])
    ),
    'x-default': absoluteUrl(productPath(product, defaultLocale)),
  }
}

function productJsonLd(p: Product, lang: string) {
  const localePath = lang === defaultLocale ? '' : `/${lang}`
  const url = absoluteUrl(`${localePath}/products/${p.slug}`)
  const faqs = getProductFaqs(p)
  const useCases = getProductUseCases(p)
  const seoContent = getProductSeoContent(p)
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.slug,
    description: p.description,
    brand: { '@type': 'Brand', name: 'JKESS' },
    manufacturer: { '@id': organizationId },
    image: p.images.map((img) => absoluteUrl(img)),
    url,
    additionalProperty: [
      ...(isBatteryEnclosureKit(p)
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Battery Cells Included',
              value: 'No — compatible LiFePO4 battery cells are sold separately',
            },
          ]
        : []),
      ...p.specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.key,
        value: spec.value,
      })),
      {
        '@type': 'PropertyValue',
        name: 'Applications',
        value: useCases.applications.join('; '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Compatible Systems',
        value: useCases.compatibleSystems.join('; '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Selection Notes',
        value: useCases.selectionNotes.join('; '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Project Fit',
        value: seoContent.projectFit,
      },
      {
        '@type': 'PropertyValue',
        name: 'Installation Notes',
        value: seoContent.installationNotes.join('; '),
      },
    ],
    category: p.categoryLabel,
  }
  const mpn = p.specs.find((s) => s.key.toLowerCase().includes('model'))
  if (mpn) productSchema.mpn = mpn.value

  if (p.type === 'shop' && p.variants?.length) {
    productSchema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(...p.variants.map((v) => parseFloat((v.price || '0').replace(/[$,]/g, '')))),
      highPrice: Math.max(...p.variants.map((v) => parseFloat((v.price || '0').replace(/[$,]/g, '')))),
      offerCount: p.variants.length,
      offers: p.variants.map((v) => ({
        '@type': 'Offer',
        name: v.label,
        price: v.price ? parseFloat(v.price.replace(/[$,]/g, '')) : undefined,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url,
      })),
    }
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      productSchema,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(localePath || '/') },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: absoluteUrl(`${localePath}/products`) },
          { '@type': 'ListItem', position: 3, name: p.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
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
  const product = getProductBySlug(slug)
  if (!product) return {}
  const canonicalPath = productPath(product, lang)
  const cellsNotice = isBatteryEnclosureKit(product) ? ' Battery cells are not included.' : ''
  const description = `${product.tagline}.${cellsNotice} ${product.description}`.slice(0, 158)
  return {
    title: `${product.name} | ${product.categoryLabel} | JKESS`,
    description,
    keywords: productKeywords(product),
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: productLanguageAlternates(product),
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
  const product = getProductBySlug(slug)
  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <p className="text-gray-400">Product not found</p>
      </div>
    )
  }

  const showCellsNotice = isBatteryEnclosureKit(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product, lang) }}
      />
      <div className="relative bg-black">
        {showCellsNotice && (
          <div className="absolute inset-x-0 top-24 z-30">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                  <div className="shrink-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
                      Important purchase notice
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white">Battery cells are not included</h2>
                  </div>
                  <p className="text-sm leading-6 text-amber-50/80">
                    This listing is for the battery kit hardware only. The displayed price covers the enclosure and only the BMS/LCD hardware specified by the selected option. Compatible LiFePO4 cells must be purchased separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={showCellsNotice ? 'pt-32' : ''}>
          <ProductDetailClient
            product={product}
            lang={lang}
            relatedProducts={getRelatedProducts(product)}
            useCases={getProductUseCases(product)}
            seoContent={getProductSeoContent(product)}
          />
        </div>
      </div>
    </>
  )
}
