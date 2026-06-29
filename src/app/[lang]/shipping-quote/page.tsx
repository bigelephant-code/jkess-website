import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'
import ShippingQuoteClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const canonical = absoluteUrl('/shipping-quote')
  const indexable = lang === defaultLocale

  return {
    title: 'International Shipping Quote for Battery Kits and BMS | JKESS',
    description:
      'Request a written international freight quote for JKESS battery enclosures, 6U rack kits, high-voltage BMS hardware, and commercial ESS equipment before payment.',
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
      title: 'International Shipping Quote | JKESS',
      description: 'Submit destination, quantity, product, and unloading details for a written freight quotation.',
      url: canonical,
      type: 'website',
      images: [absoluteUrl('/images/contact-banner-bg.webp')],
    },
  }
}

export default async function ShippingQuotePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <ShippingQuoteClient lang={lang} />
}
