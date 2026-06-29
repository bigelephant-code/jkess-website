import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { news } from '@/lib/news'
import { technicalGuides } from '@/lib/technical-guides'
import { jsonLd, organizationId } from '@/lib/structured-data'
import NewsOwnedInsights from '@/components/NewsOwnedInsights'
import NewsPageClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const canonical = absoluteUrl('/news')
  const indexable = lang === defaultLocale

  return {
    title: 'JKESS Technical Guides and Curated Energy Storage Sources',
    description:
      'Read original JKESS technical guides on battery enclosures, BMS communication, cell selection, and inverter compatibility, plus a clearly labeled directory of external energy storage sources.',
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
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
      type: 'website',
      title: 'JKESS Technical Guides and Curated Energy Storage Sources',
      description: 'Original JKESS engineering guides and a labeled directory of third-party energy storage sources.',
      url: canonical,
      images: [absoluteUrl('/images/news-featured-energy-storage.jpg')],
    },
  }
}

function newsJsonLd() {
  const pageUrl = absoluteUrl('/news')

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'JKESS Technical Guides and Curated Energy Storage Sources',
        description:
          'Original JKESS technical guidance and a clearly labeled directory of third-party energy storage sources.',
        url: pageUrl,
        publisher: { '@id': organizationId },
        hasPart: [
          {
            '@type': 'ItemList',
            name: 'JKESS original technical guides',
            itemListElement: technicalGuides.map((guide, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: absoluteUrl(`/guides/${guide.slug}`),
              item: {
                '@type': 'TechArticle',
                headline: guide.title,
                description: guide.description,
                image: absoluteUrl(guide.image),
                url: absoluteUrl(`/guides/${guide.slug}`),
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
        dangerouslySetInnerHTML={{ __html: newsJsonLd() }}
      />
      <NewsPageClient />
      <NewsOwnedInsights lang={lang} />
    </>
  )
}
