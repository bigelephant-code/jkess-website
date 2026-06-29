import type { Product } from '@/lib/products'

export const SALE_DISCOUNT_PERCENT = 15
export const SALE_MULTIPLIER = 1 - SALE_DISCOUNT_PERCENT / 100
export const SALE_COUPON_NAME = 'JKESS15'

export function parseUsdPrice(price?: string) {
  if (!price) return null
  const value = Number.parseFloat(price.replace(/[$,]/g, ''))
  return Number.isFinite(value) && value >= 0 ? value : null
}

export function regularPriceFromSalePrice(salePrice: number) {
  return Number((salePrice / SALE_MULTIPLIER).toFixed(2))
}

export function formatUsd(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function productVariantCommerce(product: Product) {
  return (product.variants || []).map((variant, index) => {
    const salePrice = parseUsdPrice(variant.price) || 0
    const regularPrice = regularPriceFromSalePrice(salePrice)

    return {
      index,
      label: variant.label,
      sku: `${product.slug}-${index + 1}`,
      salePrice,
      regularPrice,
      discountAmount: Number((regularPrice - salePrice).toFixed(2)),
      discountPercent: SALE_DISCOUNT_PERCENT,
    }
  })
}

export function defaultProductCommerce(product: Product) {
  return productVariantCommerce(product)[0] || null
}

export function schemaAvailability(stock: number) {
  return stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
}

export function merchantAvailability(stock: number) {
  return stock > 0 ? 'in_stock' : 'out_of_stock'
}
