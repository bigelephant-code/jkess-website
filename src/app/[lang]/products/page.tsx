import { products } from '@/lib/products'
import { ProductsPageClient } from './client'

export const metadata = {
  title: 'Products — JKESS',
  description: 'Browse JKESS energy storage solutions — BMS protection boards, battery kits, and high voltage systems.',
}

export default function ProductsPage() {
  return <ProductsPageClient products={products} />
}
