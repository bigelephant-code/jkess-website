import { buildPageMetadata } from '@/lib/seo'
import NewsPageClient from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/news',
      title: 'Energy Storage News and Battery Market Insights | JKESS',
      description:
        'Follow JKESS industry intelligence on energy storage, battery management systems, policy, ESS cost trends, and high voltage battery technology.',
      keywords: [
        'energy storage news',
        'battery storage market',
        'BMS news',
        'ESS policy',
        'high voltage battery technology',
      ],
      image: '/images/news-featured-energy-storage.jpg',
    })
  )
}

export default function NewsPage() {
  return <NewsPageClient />
}
