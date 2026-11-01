export type GoAffProOrderInput = {
  orderNumber: string
  captureId: string
  currency: 'USD' | 'EUR'
  paidMinorUnits: number
  shippingMinorUnits: number
  taxMinorUnits: number
  discountMinorUnits: number
  items: ReadonlyArray<{
    sku: string
    name: string
    quantity: number
    unitNetMinorUnits: number
    lineTaxMinorUnits: number
    lineDiscountMinorUnits: number
  }>
}

function money(value: number) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid order amount')
  return value
}

/** Caller must supply independently verified order and payment data. */
export function buildGoAffProOrder(input: GoAffProOrderInput) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(input.orderNumber) || !/^[A-Z0-9]{1,120}$/.test(input.captureId) ||
      (input.currency !== 'USD' && input.currency !== 'EUR') || !input.items.length || input.items.length > 100) {
    throw new Error('Invalid order details')
  }
  money(input.paidMinorUnits)
  money(input.shippingMinorUnits)
  money(input.taxMinorUnits)
  money(input.discountMinorUnits)
  let net = 0
  let tax = 0
  let discount = 0
  const items = input.items.map((item) => {
    if (!item.sku.trim() || item.sku.length > 180 || !item.name.trim() || item.name.length > 300 ||
        !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 10000) throw new Error('Invalid order item')
    money(item.unitNetMinorUnits)
    money(item.lineTaxMinorUnits)
    money(item.lineDiscountMinorUnits)
    // The provider's tax treatment for multiple taxed units has not been verified.
    if (item.quantity !== 1 && item.lineTaxMinorUnits !== 0) throw new Error('Taxed quantities require review')
    const lineNet = item.unitNetMinorUnits * item.quantity
    const lineGross = lineNet + item.lineTaxMinorUnits
    if (!Number.isSafeInteger(lineGross) || item.lineDiscountMinorUnits > lineGross) throw new Error('Invalid item total')
    net += lineNet
    tax += item.lineTaxMinorUnits
    discount += item.lineDiscountMinorUnits
    if (![net, tax, discount].every(Number.isSafeInteger)) throw new Error('Invalid order total')
    return {
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      price: (item.unitNetMinorUnits + item.lineTaxMinorUnits) / 100,
      tax: item.lineTaxMinorUnits / 100,
      discount: item.lineDiscountMinorUnits / 100,
    }
  })
  const subtotal = net - discount
  const total = net + tax + input.shippingMinorUnits - discount
  if (subtotal < 0 || !Number.isSafeInteger(total) || total <= 0 || total !== input.paidMinorUnits ||
      tax !== input.taxMinorUnits || discount !== input.discountMinorUnits) {
    throw new Error('Order totals require review')
  }
  return {
    id: input.captureId,
    number: input.orderNumber,
    total: total / 100,
    subtotal: subtotal / 100,
    shipping: input.shippingMinorUnits / 100,
    tax: tax / 100,
    discount: discount / 100,
    currency: input.currency,
    line_items: items,
    forceSDK: true,
  }
}
