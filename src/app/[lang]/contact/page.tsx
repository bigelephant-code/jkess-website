import { buildPageMetadata } from '@/lib/seo'
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
      image: '/images/contact-banner-bg.png',
    })
  )
}

export default function ContactPage() {
  return <ContactPageClient />
}
