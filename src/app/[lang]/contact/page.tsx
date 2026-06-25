import { buildPageMetadata, localizedSeoPath } from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
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

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'Contact JKESS',
        description:
          'Contact JKESS for battery kit, BMS, high voltage kit, and commercial energy storage cabinet project inquiries.',
        url: contactUrl,
        mainEntity: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@id': `${siteUrl}/#organization`,
        '@type': ['Organization', 'LocalBusiness'],
        name: 'JKBMS Electronic Technology Co.,Ltd',
        alternateName: 'JKESS',
        url: siteUrl,
        logo: absoluteUrl('/images/jkess-logo.png'),
        image: absoluteUrl('/images/contact-banner-bg.webp'),
        email: 'zhou@jkess.com',
        telephone: '+86 131 6282 8868',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Room 1008, Building B4, Yunzhi Science & Technology Park, Guangming Street',
          addressLocality: 'Shenzhen',
          addressRegion: 'Guangdong',
          addressCountry: 'CN',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'zhou@jkess.com',
            telephone: '+86 131 6282 8868',
            availableLanguage: ['English', 'Chinese'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: 'https://wa.me/8613162828868',
            availableLanguage: ['English', 'Chinese'],
          },
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
