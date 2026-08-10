import { getProductBySlug } from '@/lib/products'
import { amountToCents, type PayPalOrderDetails } from '@/lib/paypal-server'
import {
  getShippingAmount,
  getShippingCountryName,
  getShippingTier,
  isDirectCheckoutCountry,
} from '@/lib/shipping-zones'

const MAX_ITEMS = 25
const MAX_QUANTITY = 50

export class CheckoutValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CheckoutValidationError'
  }
}

export type ValidatedCheckoutItem = {
  slug: string
  name: string
  variant: string
  quantity: number
  unitPriceCents: number
  lineTotalCents: number
  sku: string
}

export type ValidatedCheckout = {
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    company: string
    countryCode: string
    address: string
    notes: string
  }
  items: ValidatedCheckoutItem[]
  productSubtotalCents: number
  shippingCents: number
  totalCents: number
  shippingCountry: string
  shippingTier: string
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function compactReference(value: string, maxLength = 127) {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function priceToCents(value: string | undefined) {
  if (!value) return null
  const normalized = value.replace(/[$,]/g, '')
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null
  const cents = Math.round(Number(normalized) * 100)
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null
}

export function validateCheckoutPayload(value: unknown): ValidatedCheckout {
  const body = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const rawCustomer = body.customer && typeof body.customer === 'object'
    ? (body.customer as Record<string, unknown>)
    : {}
  const rawItems = Array.isArray(body.items) ? body.items : []
  const orderNumber = clean(body.orderNumber, 80)
  const customer = {
    name: clean(rawCustomer.name, 120),
    email: clean(rawCustomer.email, 200).toLowerCase(),
    phone: clean(rawCustomer.phone, 80),
    company: clean(rawCustomer.company, 160),
    countryCode: clean(rawCustomer.countryCode, 8).toUpperCase(),
    address: clean(rawCustomer.address, 800),
    notes: clean(rawCustomer.notes, 1500),
  }

  if (!/^JKESS-[A-Z0-9-]{6,70}$/.test(orderNumber)) {
    throw new CheckoutValidationError('The order reference is invalid.')
  }
  if (
    !customer.name ||
    !customer.email ||
    !customer.phone ||
    !customer.countryCode ||
    !customer.address
  ) {
    throw new CheckoutValidationError('Customer and delivery information is incomplete.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw new CheckoutValidationError('The customer email address is invalid.')
  }
  if (!isDirectCheckoutCountry(customer.countryCode)) {
    throw new CheckoutValidationError('This destination requires a written shipping quote.')
  }
  if (rawItems.length === 0 || rawItems.length > MAX_ITEMS) {
    throw new CheckoutValidationError('The order items are invalid.')
  }

  const items = rawItems.map((rawValue, index): ValidatedCheckoutItem => {
    const rawItem = rawValue && typeof rawValue === 'object'
      ? (rawValue as Record<string, unknown>)
      : {}
    const slug = clean(rawItem.slug, 100)
    const variantLabel = clean(rawItem.variant, 160)
    const quantity = Number(rawItem.quantity)
    const product = getProductBySlug(slug)
    const variant = product?.variants?.find((entry) => entry.label === variantLabel)
    const unitPriceCents = priceToCents(variant?.price)

    if (
      !product ||
      product.type !== 'shop' ||
      !variant ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY ||
      unitPriceCents === null
    ) {
      throw new CheckoutValidationError(`Order item ${index + 1} is invalid.`)
    }

    return {
      slug,
      name: product.name,
      variant: variant.label,
      quantity,
      unitPriceCents,
      lineTotalCents: unitPriceCents * quantity,
      sku: compactReference(`${slug}-${variant.label}`),
    }
  })

  const productSubtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0)
  const shippingCents = Math.round(getShippingAmount(customer.countryCode) * 100)
  const totalCents = productSubtotalCents + shippingCents

  if (!Number.isSafeInteger(totalCents) || totalCents <= 0) {
    throw new CheckoutValidationError('The order total is invalid.')
  }

  return {
    orderNumber,
    customer,
    items,
    productSubtotalCents,
    shippingCents,
    totalCents,
    shippingCountry: getShippingCountryName(customer.countryCode),
    shippingTier: getShippingTier(customer.countryCode),
  }
}

export function moneyFromCents(cents: number) {
  return (cents / 100).toFixed(2)
}

export function buildPayPalOrderPayload(checkout: ValidatedCheckout) {
  const contactReference = compactReference(
    `Name:${checkout.customer.name} | Email:${checkout.customer.email} | Phone:${checkout.customer.phone} | Company:${checkout.customer.company || '-'}`
  )
  const deliveryReference = compactReference(
    `Country:${checkout.shippingCountry} | Delivery reference:${checkout.customer.address} | Notes:${checkout.customer.notes || '-'}`
  )

  return {
    intent: 'CAPTURE',
    application_context: {
      brand_name: 'JKESS',
      user_action: 'PAY_NOW',
      shipping_preference: 'GET_FROM_FILE',
    },
    purchase_units: [
      {
        reference_id: checkout.orderNumber,
        invoice_id: checkout.orderNumber,
        custom_id: contactReference,
        description: deliveryReference,
        items: checkout.items.map((item) => ({
          name: compactReference(`${item.name} - ${item.variant}`),
          sku: item.sku,
          quantity: String(item.quantity),
          category: 'PHYSICAL_GOODS',
          unit_amount: {
            currency_code: 'USD',
            value: moneyFromCents(item.unitPriceCents),
          },
        })),
        amount: {
          currency_code: 'USD',
          value: moneyFromCents(checkout.totalCents),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: moneyFromCents(checkout.productSubtotalCents),
            },
            ...(checkout.shippingCents > 0
              ? {
                  shipping: {
                    currency_code: 'USD',
                    value: moneyFromCents(checkout.shippingCents),
                  },
                }
              : {}),
          },
        },
      },
    ],
  }
}

export function assertPayPalOrderMatchesCheckout(
  order: PayPalOrderDetails,
  checkout: ValidatedCheckout
) {
  const purchaseUnit = order.purchase_units?.[0]
  const reference = purchaseUnit?.invoice_id || purchaseUnit?.reference_id
  const currency = purchaseUnit?.amount?.currency_code
  const totalCents = amountToCents(purchaseUnit?.amount?.value)
  const shippingCountryCode = purchaseUnit?.shipping?.address?.country_code?.toUpperCase()
  const orderItems = purchaseUnit?.items || []

  if (reference !== checkout.orderNumber) {
    throw new CheckoutValidationError('PayPal returned a different order reference.')
  }
  if (currency !== 'USD' || totalCents !== checkout.totalCents) {
    throw new CheckoutValidationError('PayPal returned a different order total.')
  }
  // Bank-redirect methods (iDEAL, Bancontact, EPS, Przelewy24) settle without a
  // PayPal-side shipping address, so requiring one here would reject those
  // payments before capture. When PayPal does supply an address it must still
  // match. Nothing else is relaxed: the order reference, currency, total, item
  // SKUs, quantities and unit prices are all still verified above, and
  // fulfilment uses the address collected by this site's own checkout form,
  // which is also what the server priced the shipping from.
  if (shippingCountryCode && shippingCountryCode !== checkout.customer.countryCode) {
    throw new CheckoutValidationError(
      'The PayPal shipping country must match the selected delivery country.'
    )
  }
  if (orderItems.length !== checkout.items.length) {
    throw new CheckoutValidationError('PayPal returned different order items.')
  }

  for (const checkoutItem of checkout.items) {
    const paypalItem = orderItems.find((item) => item.sku === checkoutItem.sku)
    if (
      !paypalItem ||
      Number(paypalItem.quantity) !== checkoutItem.quantity ||
      paypalItem.unit_amount?.currency_code !== 'USD' ||
      amountToCents(paypalItem.unit_amount?.value) !== checkoutItem.unitPriceCents
    ) {
      throw new CheckoutValidationError('PayPal returned different order items.')
    }
  }
}
