import { DownloadsPageClient } from './client'
import { buildPageMetadata } from '@/lib/seo'

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
      image: '/images/downloads-banner-bg.png',
    })
  )
}

export default function DownloadsPage() {
  return <DownloadsPageClient />
}
