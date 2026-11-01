import type { AffiliatePaidTask } from './affiliate-report-queue'
import type { PayPalMoney, PayPalOrderDetails } from './paypal-server'
import type { StoredAffiliateAttribution } from './order-store'
import type { VerifiedAffiliateOrder } from './affiliate-refersion-order'
import type { GoAffProOrderInput } from './goaffpro-order'

function cents(money: PayPalMoney | undefined, currency: string, optional = false) {
  if (!money && optional) return 0
  if (!money || money.currency_code !== currency || typeof money.value !== 'string' || !/^\d{1,10}(?:\.\d{1,2})?$/.test(money.value)) {
    throw new Error('Invalid verified PayPal amount')
  }
  const [whole, fractional = ''] = money.value.split('.')
  const amount = Number(whole) * 100 + Number(fractional.padEnd(2, '0'))
  if (!Number.isSafeInteger(amount)) throw new Error('Invalid verified PayPal amount')
  return amount
}

/** Order details must be independently fetched from PayPal, never from the browser. */
function affiliateOrdersFromCapture(task: AffiliatePaidTask, order: PayPalOrderDetails, attribution: StoredAffiliateAttribution, captureStatus: 'COMPLETED' | 'REFUNDED') {
  if (order.id !== task.paypalOrderId || order.status?.toUpperCase() !== 'COMPLETED' ||
      order.purchase_units?.length !== 1 || attribution.source.provider !== task.provider ||
      !/^[a-f0-9]{64}$/.test(attribution.cartId)) throw new Error('Affiliate payment requires review')
  const unit = order.purchase_units[0]
  if ((unit.invoice_id || unit.reference_id) !== task.orderNumber) throw new Error('Affiliate order mismatch')
  const currency = unit.amount?.currency_code
  if (currency !== 'USD' && currency !== 'EUR') throw new Error('Unsupported affiliate currency')
  const total = cents(unit.amount, currency)
  const captures = unit.payments?.captures
  if (!captures || captures.length !== 1 || captures[0].id !== task.captureId ||
      captures[0].status?.toUpperCase() !== captureStatus || cents(captures[0].amount, currency) !== total) {
    throw new Error('Affiliate capture requires review')
  }
  const breakdown = unit.amount?.breakdown
  if (!breakdown) throw new Error('Affiliate amount breakdown is missing')
  const supportedKeys = ['item_total', 'shipping', 'tax_total', 'discount', 'shipping_discount', 'handling', 'insurance']
  if (Object.keys(breakdown).some((key) => !supportedKeys.includes(key))) throw new Error('Unknown PayPal amount component')
  const itemTotal = cents(breakdown.item_total, currency)
  const shipping = cents(breakdown.shipping, currency, true)
  for (const value of [breakdown.tax_total, breakdown.discount, breakdown.shipping_discount, breakdown.handling, breakdown.insurance]) {
    if (cents(value, currency, true) !== 0) throw new Error('Tax, discounts, or additional charges require review')
  }
  if (!unit.items?.length || unit.items.length > 100) throw new Error('Affiliate items are missing')
  let computedItems = 0
  const items = unit.items.map((item) => {
    const sku = item.sku?.trim() || ''
    const name = item.name?.trim() || ''
    if (!sku || sku.length > 180 || !name || name.length > 300 || !/^[1-9]\d{0,4}$/.test(item.quantity || '')) {
      throw new Error('Invalid affiliate item')
    }
    const quantity = Number(item.quantity)
    if (quantity > 10000) throw new Error('Invalid affiliate item')
    const price = cents(item.unit_amount, currency)
    computedItems += price * quantity
    if (!Number.isSafeInteger(computedItems)) throw new Error('Invalid affiliate item amount')
    return { sku, name, quantity, unitMinorUnits: price }
  })
  if (total <= 0 || computedItems !== itemTotal || itemTotal + shipping !== total) throw new Error('Affiliate totals do not match')
  const refersion: VerifiedAffiliateOrder = {
    cartId: attribution.cartId, orderId: task.orderNumber, currency, paidMinorUnits: total,
    shippingMinorUnits: shipping, taxMinorUnits: 0, discountMinorUnits: 0, items,
  }
  const goaffpro: GoAffProOrderInput = {
    orderNumber: task.orderNumber, captureId: task.captureId, currency, paidMinorUnits: total,
    shippingMinorUnits: shipping, taxMinorUnits: 0, discountMinorUnits: 0,
    items: items.map(({ unitMinorUnits, ...item }) => ({ ...item, unitNetMinorUnits: unitMinorUnits, lineTaxMinorUnits: 0, lineDiscountMinorUnits: 0 })),
  }
  return { refersion, goaffpro }
}

export function affiliateOrdersFromVerifiedPayment(task: AffiliatePaidTask, order: PayPalOrderDetails, attribution: StoredAffiliateAttribution) {
  return affiliateOrdersFromCapture(task, order, attribution, 'COMPLETED')
}

/** Refund verification must also independently confirm the completed refund. */
export function affiliateOrdersFromRefundedCapture(task: AffiliatePaidTask, order: PayPalOrderDetails, attribution: StoredAffiliateAttribution) {
  return affiliateOrdersFromCapture(task, order, attribution, 'REFUNDED')
}
