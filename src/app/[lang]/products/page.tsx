import { products } from '@/lib/products'
import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import { ProductsPageClient } from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/products',
      title: 'Energy Storage Products | JKESS Battery Kits and BMS',
      description:
        'Browse JKESS energy storage products, including LiFePO4 battery kits, 6U rack battery kits, high voltage BMS kits, and commercial ESS cabinets.',
      keywords: [
        'JKESS products',
        'battery kit',
        '6U battery kit',
        'high voltage kit',
        'commercial ESS cabinet',
        'LiFePO4 storage system',
      ],
      image: products[0]?.images[0] || '/images/jkess-logo.png',
    })
  )
}

function productsCollectionJsonLd(lang: string) {
  const url = absoluteUrl(localizedSeoPath(lang, '/products'))

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'JKESS Energy Storage Products',
    description:
      'JKESS energy storage product catalog, including battery kits, high voltage BMS kits, and commercial ESS cabinet solutions.',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(localizedSeoPath(lang, `/products/${product.slug}`)),
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images[0] ? absoluteUrl(product.images[0]) : undefined,
          brand: {
            '@type': 'Brand',
            name: 'JKESS',
          },
          category: product.categoryLabel,
        },
      })),
    },
  })
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productsCollectionJsonLd(lang) }}
      />
      <ProductsPageClient products={products} />
    </>
  )
}
