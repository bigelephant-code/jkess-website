// Values supplied here must come from server-verified payment and order data.
export type VerifiedAffiliateOrder = {
  cartId: string
  orderId: string
  currency: string
  paidMinorUnits: number
  shippingMinorUnits: number
  taxMinorUnits: number
  discountMinorUnits: number
  items: ReadonlyArray<{ sku: string; name: string; quantity: number; unitMinorUnits: number }>
}

function requireMinorUnits(value: number, field: string) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`Invalid ${field}`)
}

/** Builds data only; this function never sends an order to Refersion. */
export function buildRefersionPaidOrder(order: VerifiedAffiliateOrder) {
  if (!/^[A-Za-z0-9_-]{32,128}$/.test(order.cartId)) throw new Error('Invalid cart ID')
  if (!order.orderId.trim() || order.orderId.length > 160) throw new Error('Invalid order ID')
  // USD and EUR both use 100 minor units; other currencies require explicit support.
  if (order.currency !== 'USD' && order.currency !== 'EUR') throw new Error('Unsupported currency')
  requireMinorUnits(order.paidMinorUnits, 'paid amount')
  requireMinorUnits(order.shippingMinorUnits, 'shipping')
  requireMinorUnits(order.taxMinorUnits, 'tax')
  requireMinorUnits(order.discountMinorUnits, 'discount')
  if (order.items.length === 0 || order.items.length > 100) throw new Error('Invalid items')

  let itemTotal = 0
  const items = order.items.map((item) => {
    if (!item.sku.trim() || item.sku.length > 180 || !item.name.trim() || item.name.length > 300 ||
        !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 10000) {
      throw new Error('Invalid item')
    }
    requireMinorUnits(item.unitMinorUnits, 'item price')
    itemTotal += item.unitMinorUnits * item.quantity
    if (!Number.isSafeInteger(itemTotal)) throw new Error('Invalid item total')
    return { sku: item.sku, name: item.name, quantity: item.quantity, price: item.unitMinorUnits / 100 }
  })
  const total = itemTotal + order.shippingMinorUnits + order.taxMinorUnits - order.discountMinorUnits
  if (!Number.isSafeInteger(total) || total !== order.paidMinorUnits || total <= 0) {
    throw new Error('Order amount does not match verified payment')
  }
  return {
    cart_id: order.cartId,
    order_id: order.orderId,
    currency_code: order.currency,
    shipping: order.shippingMinorUnits / 100,
    tax: order.taxMinorUnits / 100,
    discount: order.discountMinorUnits / 100,
    items,
  }
}
