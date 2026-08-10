import { DownloadsPageClient } from './client'
import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { downloadFiles } from '@/lib/downloads'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { faqJsonLd, pageFaqs } from '@/lib/page-faqs'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/downloads',
      title: 'JKESS Battery Box Manual and BMS Documents',
      description:
        'Download JKESS battery box manuals, 6U battery kit specifications, roller enclosure documents, BMS and BMU resources, and LCD manuals.',
      keywords: [
        'JKESS downloads',
        'JKESS battery box manual',
        'JKESS battery box',
        'JK BA424S manual',
        'battery kit datasheet',
        '6U battery kit specification',
        'BMS manual',
        'BMU module document',
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
        name: 'JKESS Battery Box Manual and Technical Downloads',
        description:
          'Download JKESS battery box manuals, 6U battery kit specifications, roller enclosure documents, BMS and BMU resources, and LCD manuals.',
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
              description: file.description || `${file.category} technical document from JKESS.`,
              dateModified: file.updated || '2026-06-30',
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
      faqJsonLd(pageFaqs.downloads),
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
