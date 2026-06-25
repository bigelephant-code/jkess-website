import { buildPageMetadata } from '@/lib/seo'
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

export default function AboutPage() {
  return <AboutPageClient />
}
