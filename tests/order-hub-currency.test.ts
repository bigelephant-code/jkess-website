import assert from 'node:assert/strict'
import test from 'node:test'
import { checkoutHubPayload } from '../src/lib/order-hub'
import { validateCheckoutPayload } from '../src/lib/paypal-checkout'

function checkout(countryCode: string, rate?: number) {
  return validateCheckoutPayload({
    orderNumber: 'JKESS-TEST123',
    customer: { name: 'Test', email: 'test@example.invalid', phone: '0', countryCode, address: 'Test' },
    items: [{ slug: '6u-battery-kit', variant: 'Enclosure Only', quantity: 1 }],
  }, rate)
}

test('EUR payment and USD catalog values remain distinct in hub draft', () => {
  const payload = checkoutHubPayload(checkout('DE', 895556), { id: 'TESTORDER', status: 'CREATED' })
  assert.equal(payload.paymentCurrency, 'EUR')
  assert.equal(payload.paymentTotal, 250.76)
  assert.equal(payload.usdTotal, 280)
  assert.equal((payload.items as Array<{ price: number }>)[0].price, 280)
})

test('USD hub draft includes the original shipping charge', () => {
  const payload = checkoutHubPayload(checkout('US'), { id: 'TESTORDER', status: 'CREATED' })
  assert.equal(payload.paymentCurrency, 'USD')
  assert.equal(payload.paymentTotal, 430)
  assert.equal(payload.usdTotal, 430)
})
