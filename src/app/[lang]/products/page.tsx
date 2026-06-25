import { products } from '@/lib/products'
import { buildPageMetadata } from '@/lib/seo'
import { ProductsPageClient } from './client'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/products',
      title: 'Energy Storage Products | JKESS Battery Kits and BMS',
      description:
        'Browse JKESS energy storage products, including LiFePO4 battery kits, 6U rack battery kits, high voltage BMS kits, and commercial ESS cabinets.',
      keywords: [
        'JKESS products',
        'battery kit',
        '6U battery kit',
        'high voltage kit',
        'commercial ESS cabinet',
        'LiFePO4 storage system',
      ],
      image: products[0]?.images[0] || '/images/jkess-logo.png',
    })
  )
}

export default function ProductsPage() {
  return <ProductsPageClient products={products} />
}
