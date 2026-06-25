import { buildPageMetadata } from '@/lib/seo'
import { localizedSeoPath } from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jkessOrganization, jsonLd, organizationId } from '@/lib/structured-data'
import AboutPageClient from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/about',
      title: 'About JKESS | Energy Storage and BMS Manufacturer',
      description:
        'Learn about JKESS, a manufacturer of BMS, battery kits, high voltage energy storage systems, and commercial ESS cabinet solutions.',
      keywords: [
        'about JKESS',
        'JKBMS manufacturer',
        'energy storage manufacturer',
        'BMS factory',
        'battery storage company',
      ],
      image: '/images/company-building.webp',
    })
  )
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutJsonLd(lang) }}
      />
      <AboutPageClient />
    </>
  )
}

function aboutJsonLd(lang: string) {
  const pageUrl = absoluteUrl(localizedSeoPath(lang, '/about'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      jkessOrganization,
      {
        '@type': 'AboutPage',
        name: 'About JKESS',
        url: pageUrl,
        description:
          'Learn about JKESS manufacturing, offices, factory, and global energy storage logistics network.',
        mainEntity: {
          '@id': organizationId,
        },
      },
      {
        '@type': 'ItemList',
        name: 'JKESS offices, factory, and warehouse network',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Place',
              name: 'JKESS Shenzhen Office',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Room 1008, Building B4, Yunzhi Science & Technology Park, Guangming Street',
                addressLocality: 'Shenzhen',
                addressRegion: 'Guangdong',
                addressCountry: 'CN',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 22.54, longitude: 114.06 },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Place',
              name: 'JKESS Hangzhou Office',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Room 309-2, Building 11, Nanhu Future Science Park, Zhongtai Street',
                addressLocality: 'Hangzhou',
                addressRegion: 'Zhejiang',
                addressCountry: 'CN',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 30.27, longitude: 120.16 },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Place',
              name: 'JKESS Shandong Factory',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No. 103 Binshi Road, Lize Subdistrict Office',
                addressLocality: 'Binzhou',
                addressRegion: 'Shandong',
                addressCountry: 'CN',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 37.38, longitude: 117.97 },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Place',
              name: 'JKESS global warehouse and logistics network',
              description:
                'Warehouses and logistics coverage across China, Poland, the United States, and Brazil for energy storage products.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'About', item: pageUrl },
        ],
      },
    ],
  })
}
