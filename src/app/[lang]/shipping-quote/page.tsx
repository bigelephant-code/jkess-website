import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'
import QuoteRequestClient from './QuoteRequestClient'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const canonical = absoluteUrl('/shipping-quote')
  const indexable = lang === defaultLocale

  return {
    title: 'Product, Bulk Purchase and Shipping Quote | JKESS',
    description:
      'Request a JKESS quotation for multiple products, large quantities, volume pricing, project configurations, or destinations that require individual shipping review.',
    alternates: {
      canonical,
      languages: { en: canonical, 'x-default': canonical },
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: { index: indexable, follow: true, 'max-snippet': -1 },
    },
    openGraph: {
      title: 'Request a Product or Bulk Purchase Quote | JKESS',
      description: 'Select multiple JKESS products, enter separate quantities, and request destination or volume-pricing terms.',
      url: canonical,
      type: 'website',
      images: [absoluteUrl('/images/contact-banner-bg.webp')],
    },
  }
}

export default async function ShippingQuotePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <QuoteRequestClient lang={lang} />
}
