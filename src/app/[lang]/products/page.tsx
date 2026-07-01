import { products } from '@/lib/products'
import { defaultLocale } from '@/i18n/config'
import {
  buildPageMetadata,
  canonicalSeoPath,
  defaultIndexableSeoLocales,
  localizedSeoPath,
} from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { faqJsonLd, pageFaqs } from '@/lib/page-faqs'
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
        'Spain LiFePO4 battery kit',
        'Austria battery kit shipping',
        'Belgium battery storage distributor',
        'Sweden commercial energy storage',
        'Denmark rack battery kit',
        'Portugal solar storage battery kit',
      ],
      image: products[0]?.images[0] || '/images/jkess-logo.png',
    })
  )
}

function productsCollectionJsonLd(lang: string) {
  const schemaLang = defaultLocale
  const url = absoluteUrl(
    canonicalSeoPath(lang, '/products', defaultIndexableSeoLocales)
  )
  const collectionId = `${url}#collection`
  const itemListId = `${url}#product-list`

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': collectionId,
        name: 'JKESS Energy Storage Products',
        description:
          'JKESS energy storage product catalog, including battery kits, high voltage BMS kits, and commercial ESS cabinet solutions.',
        inLanguage: schemaLang,
        url,
        mainEntityOfPage: url,
        publisher: { '@id': organizationId },
        mainEntity: {
          '@type': 'ItemList',
          '@id': itemListId,
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => {
            const productUrl = absoluteUrl(
              localizedSeoPath(schemaLang, `/products/${product.slug}`)
            )

            return {
              '@type': 'ListItem',
              position: index + 1,
              name: product.name,
              url: productUrl,
              item: {
                '@type': 'WebPage',
                '@id': productUrl,
                name: product.name,
                description: product.description,
                inLanguage: schemaLang,
                url: productUrl,
                isPartOf: { '@id': collectionId },
                primaryImageOfPage: product.images[0]
                  ? {
                      '@type': 'ImageObject',
                      contentUrl: absoluteUrl(product.images[0]),
                    }
                  : undefined,
              },
            }
          }),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        inLanguage: schemaLang,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: url },
        ],
      },
      {
        ...faqJsonLd(pageFaqs.products),
        '@id': `${url}#faq`,
        inLanguage: schemaLang,
        mainEntityOfPage: url,
      },
    ],
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
