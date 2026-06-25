import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import { news } from '@/lib/news'
import NewsPageClient from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/news',
      title: 'Energy Storage News and Battery Market Insights | JKESS',
      description:
        'Follow JKESS industry intelligence on energy storage, battery management systems, policy, ESS cost trends, and high voltage battery technology.',
      keywords: [
        'energy storage news',
        'battery storage market',
        'BMS news',
        'ESS policy',
        'high voltage battery technology',
      ],
      image: '/images/news-featured-energy-storage.jpg',
    })
  )
}

function newsJsonLd(lang: string) {
  const pageUrl = absoluteUrl(localizedSeoPath(lang, '/news'))

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Energy Storage News and Battery Market Insights',
    description:
      'JKESS industry intelligence on energy storage, battery management systems, policy, ESS cost trends, and high voltage battery technology.',
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: news.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        item: {
          '@type': 'Article',
          headline: item.title,
          description: item.summary,
          articleSection: item.category,
          datePublished: item.date,
          dateModified: item.date,
          isPartOf: pageUrl,
          spatialCoverage: {
            '@type': 'Place',
            name: item.region,
          },
          author: {
            '@type': 'Organization',
            name: item.source,
          },
          publisher: {
            '@type': 'Organization',
            name: 'JKESS',
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl('/images/jkess-logo.png'),
            },
          },
        },
      })),
    },
  })
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: newsJsonLd(lang) }}
      />
      <NewsPageClient />
    </>
  )
}
