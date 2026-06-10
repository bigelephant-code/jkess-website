import { products, getProductBySlug } from '@/lib/products'
import { ProductDetailClient } from './client'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <p className="text-gray-400">Product not found</p>
      </div>
    )
  }
  return <ProductDetailClient product={product} />
}
