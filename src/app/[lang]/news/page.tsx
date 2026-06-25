import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import NewsPageClient from './client'

const newsStructuredData = [
  {
    date: '2026-06-10',
    title: 'Global Battery Storage Installations to Hit 300 GWh in 2026 Despite Slight Dip',
    summary:
      'S&P Global reports global battery storage installations are expected to reach 296,617 MWh in 2026 as grid-scale deployments accelerate worldwide.',
    source: 'S&P Global',
    url: 'https://www.spglobal.com/energy/en/news-research/latest-news/metals/010826-battery-storage-to-drive-lithium-demand-growth-globally',
  },
  {
    date: '2026-05-28',
    title: 'EU Battery Regulation Enters Full Effect: New Sustainability Requirements for Energy Storage',
    summary:
      'The EU Battery Regulation introduces sustainability requirements, carbon footprint declarations, recycled content rules, and digital battery passport expectations.',
    source: 'European Commission',
    url: 'https://energy.ec.europa.eu',
  },
  {
    date: '2026-04-22',
    title: 'U.S. Energy Storage Market Faces Headwinds but Remains Resilient',
    summary:
      'The U.S. energy storage market remains resilient, with data center backup demand becoming a major new driver for battery storage systems.',
    source: 'RTO Insider',
    url: 'https://www.rtoinsider.com/122189-will-batteries-remain-a-clean-energy-bright-spot-in-2026',
  },
  {
    date: '2026-03-18',
    title: 'EV Battery Management System Market Projected to Reach $49.8 Billion by 2031',
    summary:
      'The global EV BMS market is forecast to grow strongly through 2031, with modular BMS architectures gaining traction.',
    source: 'Research and Markets',
    url: 'https://finance.yahoo.com/news/electric-vehicle-ev-battery-management-103300927.html',
  },
]

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
      itemListElement: newsStructuredData.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        item: {
          '@type': 'Article',
          headline: item.title,
          description: item.summary,
          datePublished: item.date,
          dateModified: item.date,
          isPartOf: pageUrl,
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
