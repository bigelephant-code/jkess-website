export function formatOrderMoney(amount: number, currency: string) {
  if ((currency !== 'USD' && currency !== 'EUR') || !Number.isFinite(amount) || amount < 0) {
    throw new Error('Invalid order amount or currency')
  }
  return `${currency} ${amount.toFixed(2)}`
}
