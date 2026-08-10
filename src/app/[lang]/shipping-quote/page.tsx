import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { buildPageMetadata, canonicalSeoPath } from '@/lib/seo'
import { faqJsonLd, pageFaqs } from '@/lib/page-faqs'
import PageFaqSection from '@/components/PageFaqSection'
import { getLocalizedGuide, getLocalizedUiCopy } from '@/lib/localized-ui'
import QuoteRequestClient from './QuoteRequestClient'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: '/shipping-quote',
    title: 'Product, Bulk Purchase and Shipping Quote | JKESS',
    description:
      'Request a JKESS quotation for multiple products, large quantities, volume pricing, or destinations that require individual shipping review.',
    keywords: [
      'JKESS shipping quote',
      'battery kit bulk quote',
      'energy storage project quote',
      'BMS volume pricing',
      'battery enclosure freight review',
    ],
    image: '/images/contact-banner-bg.webp',
  })
}

function shippingQuoteJsonLd(lang: string) {
  const pageUrl = absoluteUrl(canonicalSeoPath(lang, '/shipping-quote'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${pageUrl}#page`,
        name: 'JKESS Product, Bulk Purchase and Shipping Quote',
        description:
          'Request a JKESS quotation for product combinations, volume pricing, project configurations, and destinations that require individual shipping review.',
        url: pageUrl,
        isPartOf: siteUrl,
        mainEntity: {
          '@type': 'Service',
          '@id': `${pageUrl}#quote-service`,
          name: 'Product and shipping quotation review',
          provider: { '@id': organizationId },
          serviceType: [
            'Product quotation',
            'Bulk purchase review',
            'Destination shipping review',
            'Energy storage project configuration review',
          ],
          areaServed: 'Worldwide',
        },
        potentialAction: {
          '@type': 'CommunicateAction',
          name: 'Request a JKESS quotation',
          target: pageUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Shipping Quote', item: pageUrl },
        ],
      },
      faqJsonLd(pageFaqs.shippingQuote),
    ],
  })
}

export default async function ShippingQuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<{ product?: string }>
}) {
  const { lang } = await params
  const query = searchParams ? await searchParams : {}
  const ui = getLocalizedUiCopy(lang)
  const guide = getLocalizedGuide(lang)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: shippingQuoteJsonLd(lang) }}
      />
      <QuoteRequestClient lang={lang} initialProductSlug={query.product} />
      <PageFaqSection
        faqs={pageFaqs.shippingQuote}
        title={guide.quote}
        description={ui.prepareInputsBody}
      />
    </>
  )
}
