import { products, getProductBySlug } from '@/lib/products'
import { ProductDetailClient } from './client'
import type { Product } from '@/lib/products'
import { locales, defaultLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = []
  for (const locale of locales) {
    for (const product of products) {
      params.push({ lang: locale.code, slug: product.slug })
    }
  }
  return params
}

function productJsonLd(p: Product, lang: string) {
  const localePath = lang === defaultLocale ? '' : `/${lang}`
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: { '@type': 'Brand', name: 'JKESS' },
    image: p.images.map((img) => absoluteUrl(img)),
    url: absoluteUrl(`${localePath}/products/${p.slug}`),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      offerCount: p.variants?.length || 1,
      offers: (p.variants?.length
        ? p.variants.map((v) => ({
            '@type': 'Offer',
            name: v.label,
            price: v.price ? parseFloat(v.price.replace(/[$,]/g, '')) : undefined,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          }))
        : [{
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          }]
      ),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '128',
    },
    category: p.categoryLabel,
  }
  const mpn = p.specs.find((s) => s.key.toLowerCase().includes('model'))
  if (mpn) schema.mpn = mpn.value
  return JSON.stringify(schema, null, 2)
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} - JKESS`,
    description: product.description.slice(0, 160),
    keywords: [product.name, 'JKESS', product.category, 'BMS', 'battery kit', 'energy storage'],
    openGraph: {
      title: `${product.name} - JKESS`,
      description: product.description.slice(0, 160),
      url: absoluteUrl(`${lang === defaultLocale ? '' : '/' + lang}/products/${product.slug}`),
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product, lang) }}
      />
      <ProductDetailClient product={product} lang={lang} />
    </>
  )
}
