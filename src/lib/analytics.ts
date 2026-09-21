import { SALE_COUPON_NAME, SALE_MULTIPLIER } from '@/lib/commerce'

type AnalyticsParams = Record<string, unknown>

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim()
const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL?.trim()
const GOOGLE_ADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_CONVERSION_LABEL?.trim()

type StoredCartItem = {
  slug: string
  name: string
  variant: string
  quantity: number
  price: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: {
      (command: 'event', eventName: string, params?: AnalyticsParams): void
      (command: 'js', date: Date): void
      (command: 'config', targetId: string, params?: AnalyticsParams): void
      (command: 'consent', action: 'default' | 'update', params: AnalyticsParams): void
    }
    jkessGoogleConsentInitialized?: boolean
  }
}

function priceNumber(price: unknown) {
  if (typeof price === 'number') return Number.isFinite(price) ? price : 0
  if (typeof price !== 'string') return 0
  const value = Number.parseFloat(price.replace(/[$,]/g, ''))
  return Number.isFinite(value) ? value : 0
}

function storedCart(): StoredCartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem('jkess-cart') || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function ga4Item(item: StoredCartItem, index = 0) {
  const salePrice = priceNumber(item.price)
  const regularPrice = salePrice / SALE_MULTIPLIER
  return {
    item_id: item.slug,
    item_name: item.name,
    affiliation: 'JKESS Online Store',
    coupon: SALE_COUPON_NAME,
    discount: Number((regularPrice - salePrice).toFixed(2)),
    index,
    item_brand: 'JKESS',
    item_category: item.slug === 'high-voltage-kit' ? 'High Voltage BMS' : 'Battery Enclosure Kit',
    item_variant: item.variant,
    price: salePrice,
    quantity: Math.max(1, Number(item.quantity) || 1),
  }
}

export function ga4Items(items: StoredCartItem[]) {
  return items.map((item, index) => ga4Item(item, index))
}

function normalizeEvent(eventName: string, params: AnalyticsParams = {}) {
  if (eventName === 'add_to_cart') {
    const quantity = Math.max(1, Number(params.quantity) || 1)
    const value = priceNumber(params.value)
    const unitPrice = quantity > 0 ? value / quantity : value
    const regularPrice = unitPrice / SALE_MULTIPLIER
    return {
      currency: params.currency || 'USD',
      value,
      coupon: SALE_COUPON_NAME,
      items: [
        {
          item_id: params.item_id,
          item_name: params.item_name,
          affiliation: 'JKESS Online Store',
          coupon: SALE_COUPON_NAME,
          discount: Number((regularPrice - unitPrice).toFixed(2)),
          item_brand: 'JKESS',
          item_variant: params.item_variant,
          price: unitPrice,
          quantity,
        },
      ],
    }
  }

  if (['begin_checkout', 'purchase', 'view_cart'].includes(eventName) && !Array.isArray(params.items)) {
    const cart = storedCart()
    return {
      ...params,
      currency: params.currency || 'USD',
      coupon: SALE_COUPON_NAME,
      items: ga4Items(cart),
    }
  }

  return params
}

function adsDestination(label: string | undefined) {
  if (!GOOGLE_ADS_ID || !label) return null
  return `${GOOGLE_ADS_ID}/${label}`
}

function trackGoogleAdsConversion(eventName: string, params: AnalyticsParams) {
  if (!window.gtag) return

  if (eventName === 'generate_lead') {
    const sendTo = adsDestination(GOOGLE_ADS_LEAD_LABEL)
    if (!sendTo) return

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      currency: params.currency || 'USD',
      ...(typeof params.value === 'number' ? { value: params.value } : {}),
    })
    return
  }

  if (eventName === 'purchase') {
    const sendTo = adsDestination(GOOGLE_ADS_PURCHASE_LABEL)
    if (!sendTo) return

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      currency: params.currency || 'USD',
      value: priceNumber(params.value),
      transaction_id: params.transaction_id,
    })
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined') return
  const normalized = normalizeEvent(eventName, params)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...normalized })
  window.gtag?.('event', eventName, normalized)
  trackGoogleAdsConversion(eventName, normalized)

  if (eventName === 'contact_form_submit') {
    window.gtag?.('event', 'generate_lead', {
      lead_source: 'contact_form',
      ...params,
    })
  }
}
