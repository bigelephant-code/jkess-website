import { absoluteUrl, siteUrl } from '@/lib/site'
import { news } from '@/lib/news'
import { technicalGuides } from '@/lib/technical-guides'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { buildPageMetadata, canonicalSeoPath } from '@/lib/seo'
import NewsOwnedInsights from '@/components/NewsOwnedInsights'
import NewsPageClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: '/news',
    title: 'Energy Storage News and JKESS Technical Guides',
    description:
      'JKESS technical guides and curated energy storage news on ESS cooling, battery enclosures, BMS communication, BMU modules, and peak shaving.',
    keywords: [
      'JKESS technical guides',
      'energy storage news',
      'battery news',
      'ESS news',
      'ESS tech news',
      'battery enclosure guide',
      'ESS cooling system',
      'peak shaving battery storage',
      'BMS communication guide',
      'BMU battery module',
      'LiFePO4 cell selection',
      'energy storage sources',
    ],
    image: '/images/news-featured-energy-storage.jpg',
  })
}

function newsJsonLd(lang: string) {
  const pageUrl = absoluteUrl(canonicalSeoPath(lang, '/news'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Energy Storage News, ESS Tech News and JKESS Technical Guides',
        description:
          'Original JKESS technical guidance and curated energy storage sources on ESS cooling, BMS communication, BMU modules, and peak shaving.',
        url: pageUrl,
        publisher: { '@id': organizationId },
        hasPart: [
          {
            '@type': 'ItemList',
            name: 'JKESS original technical guides',
            itemListElement: technicalGuides.map((guide, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: absoluteUrl(canonicalSeoPath(lang, `/guides/${guide.slug}`)),
              item: {
                '@type': 'TechArticle',
                headline: guide.title,
                description: guide.description,
                image: absoluteUrl(guide.image),
                url: absoluteUrl(canonicalSeoPath(lang, `/guides/${guide.slug}`)),
                author: { '@id': organizationId },
                publisher: { '@id': organizationId },
              },
            })),
          },
          {
            '@type': 'ItemList',
            name: 'External industry sources',
            itemListElement: news.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: item.url,
              item: {
                '@type': 'WebPage',
                name: item.title,
                description: item.summary,
                url: item.url,
                datePublished: item.date,
                isPartOf: pageUrl,
                about: item.category,
                spatialCoverage: {
                  '@type': 'Place',
                  name: item.region,
                },
                publisher: {
                  '@type': 'Organization',
                  name: item.source,
                },
              },
            })),
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Technical Guides and Sources', item: pageUrl },
        ],
      },
    ],
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
      <NewsOwnedInsights lang={lang} />
    </>
  )
}
