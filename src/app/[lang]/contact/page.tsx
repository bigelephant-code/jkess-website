import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jkessOrganization, jsonLd, organizationId } from '@/lib/structured-data'
import ContactPageClient from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/contact',
      title: 'Contact JKESS | Energy Storage Project Inquiry',
      description:
        'Contact JKESS for battery kit, BMS, high voltage kit, and commercial energy storage cabinet project inquiries.',
      keywords: [
        'contact JKESS',
        'energy storage inquiry',
        'battery kit supplier',
        'BMS supplier China',
        'commercial ESS quote',
      ],
      image: '/images/contact-banner-bg.webp',
    })
  )
}

function contactJsonLd(lang: string) {
  const contactUrl = absoluteUrl(localizedSeoPath(lang, '/contact'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'Contact JKESS',
        description:
          'Contact JKESS for battery kit, BMS, high voltage kit, and commercial energy storage cabinet project inquiries.',
        url: contactUrl,
        mainEntity: {
          '@id': organizationId,
        },
      },
      jkessOrganization,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: contactUrl },
        ],
      },
    ],
  })
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: contactJsonLd(lang) }}
      />
      <ContactPageClient />
    </>
  )
}
