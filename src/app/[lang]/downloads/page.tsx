import { DownloadsPageClient } from './client'
import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { downloadFiles } from '@/lib/downloads'
import { jsonLd, organizationId } from '@/lib/structured-data'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/downloads',
      title: 'Downloads | JKESS Technical Library',
      description:
        'Download JKESS technical documents, datasheets, manuals, and product resources for battery kits, BMS, and energy storage systems.',
      keywords: [
        'JKESS downloads',
        'battery kit datasheet',
        'BMS manual',
        'energy storage datasheet',
        'ESS technical documents',
      ],
      image: '/images/downloads-banner-bg.webp',
    })
  )
}

function downloadsJsonLd(lang: string) {
  const pageUrl = absoluteUrl(localizedSeoPath(lang, '/downloads'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'JKESS Technical Library',
        description:
          'Download JKESS technical documents, datasheets, manuals, and product resources for battery kits, BMS, and energy storage systems.',
        url: pageUrl,
        publisher: { '@id': organizationId },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: downloadFiles.map((file, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(file.url),
            item: {
              '@type': 'DigitalDocument',
              name: file.name,
              url: absoluteUrl(file.url),
              fileFormat: file.url.endsWith('.docx')
                ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                : 'application/pdf',
              about: file.category,
              publisher: { '@id': organizationId },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Downloads', item: pageUrl },
        ],
      },
    ],
  })
}

export default async function DownloadsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: downloadsJsonLd(lang) }}
      />
      <DownloadsPageClient />
    </>
  )
}
