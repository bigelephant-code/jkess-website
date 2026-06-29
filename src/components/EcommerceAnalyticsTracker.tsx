'use client'

import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { locales } from '@/i18n/config'
import { products, getProductBySlug } from '@/lib/products'
import { defaultProductCommerce, SALE_COUPON_NAME } from '@/lib/commerce'
import { ga4Items, trackEvent } from '@/lib/analytics'

function neutralPath(pathname: string) {
  const pattern = new RegExp(`^/(${locales.map((locale) => locale.code).join('|')})(?=/|$)`)
  return pathname.replace(pattern, '') || '/'
}

function once(key: string, callback: () => void) {
  try {
    if (window.sessionStorage.getItem(key)) return
    window.sessionStorage.setItem(key, '1')
  } catch {
    // Analytics should still work when session storage is unavailable.
  }
  callback()
}

export default function EcommerceAnalyticsTracker() {
  const pathname = usePathname()
  const path = neutralPath(pathname)
  const { items } = useCart()
  const cartSignature = useMemo(
    () => items.map((item) => `${item.slug}:${item.variant}:${item.quantity}`).join('|'),
    [items]
  )

  useEffect(() => {
    if (path === '/products') {
      once('jkess:ga:view_item_list:products', () => {
        const listItems = products
          .filter((product) => product.type === 'shop')
          .map((product, index) => {
            const commerce = defaultProductCommerce(product)
            return {
              item_id: product.slug,
              item_name: product.name,
              affiliation: 'JKESS Online Store',
              coupon: SALE_COUPON_NAME,
              discount: commerce?.discountAmount || 0,
              index,
              item_brand: 'JKESS',
              item_category: product.categoryLabel,
              item_variant: commerce?.label || 'Standard',
              price: commerce?.salePrice || 0,
              quantity: 1,
            }
          })
        trackEvent('view_item_list', {
          item_list_id: 'jkess_products',
          item_list_name: 'JKESS Products',
          currency: 'USD',
          items: listItems,
        })
      })
    }

    const productMatch = path.match(/^\/products\/([^/]+)$/)
    if (productMatch) {
      const product = getProductBySlug(productMatch[1])
      const commerce = product ? defaultProductCommerce(product) : null
      if (product && commerce) {
        once(`jkess:ga:view_item:${product.slug}`, () => {
          trackEvent('view_item', {
            currency: 'USD',
            value: commerce.salePrice,
            items: [
              {
                item_id: product.slug,
                item_name: product.name,
                affiliation: 'JKESS Online Store',
                coupon: SALE_COUPON_NAME,
                discount: commerce.discountAmount,
                item_brand: 'JKESS',
                item_category: product.categoryLabel,
                item_variant: commerce.label,
                price: commerce.salePrice,
                quantity: 1,
              },
            ],
          })
        })
      }
    }
  }, [path])

  useEffect(() => {
    if (path !== '/cart' || items.length === 0) return
    once(`jkess:ga:view_cart:${cartSignature}`, () => {
      const value = items.reduce((sum, item) => {
        const price = Number.parseFloat(item.price.replace(/[$,]/g, '')) || 0
        return sum + price * item.quantity
      }, 0)
      trackEvent('view_cart', {
        currency: 'USD',
        value,
        items: ga4Items(items),
      })
    })
  }, [path, items, cartSignature])

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      const productMatch = href.match(/\/products\/([^/?#]+)/)
      if (productMatch) {
        const product = getProductBySlug(productMatch[1])
        const commerce = product ? defaultProductCommerce(product) : null
        if (product && commerce) {
          trackEvent('select_item', {
            item_list_id: path === '/products' ? 'jkess_products' : 'internal_links',
            item_list_name: path === '/products' ? 'JKESS Products' : 'Internal Product Links',
            currency: 'USD',
            items: [
              {
                item_id: product.slug,
                item_name: product.name,
                item_brand: 'JKESS',
                item_category: product.categoryLabel,
                item_variant: commerce.label,
                price: commerce.salePrice,
                quantity: 1,
              },
            ],
          })
        }
      }

      if (/\.(pdf|zip|docx?|xlsx?)($|[?#])/i.test(href) || href.includes('/downloads')) {
        trackEvent('file_download', {
          file_name: href.split('/').pop() || href,
          link_url: anchor.href,
        })
      }

      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('wa.me') || href.includes('/contact')) {
        trackEvent('contact_click', {
          channel: href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : href.includes('wa.me') ? 'whatsapp' : 'contact_page',
          link_url: anchor.href,
        })
      }
    }

    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [path])

  return null
}
