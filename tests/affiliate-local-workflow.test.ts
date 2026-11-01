import assert from 'node:assert/strict'
import test from 'node:test'
import { AFFILIATE_MARKETING_CONSENT_KEY, readAffiliateSource, updateAffiliateSource } from '../src/lib/affiliate-link-source'
import { processAffiliatePaidTask } from '../src/lib/affiliate-paid-processor'
import type { PayPalOrderDetails } from '../src/lib/paypal-server'

const money = (value: string) => ({ value, currency_code: 'USD' })
const order: PayPalOrderDetails = { id: 'PAYPAL123', status: 'COMPLETED', purchase_units: [{
  invoice_id: 'JKESS-ORDER123', amount: { ...money('130.00'), breakdown: { item_total: money('100.00'), shipping: money('30.00') } },
  items: [{ sku: 'KIT', name: 'Kit', quantity: '1', unit_amount: money('100.00') }],
  payments: { captures: [{ id: 'CAPTURE123', status: 'COMPLETED', amount: money('130.00') }] },
}] }

function storage() {
  const values = new Map<string, string>()
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) }, removeItem: (key: string) => { values.delete(key) } }
}

for (const [first, last, expected] of [
  ['?ref=one', '?rfsn=two', 'refersion'],
  ['?rfsn=two', '?ref=one', 'goaffpro'],
] as const) {
  test(`last click ${expected} is the only provider called`, async () => {
    const store = storage()
    store.setItem(AFFILIATE_MARKETING_CONSENT_KEY, 'accepted')
    updateAffiliateSource(store, first, 1000)
    updateAffiliateSource(store, last, 2000)
    const source = readAffiliateSource(store, 3000)
    assert.ok(source)
    assert.equal(source.provider, expected)
    const task = { orderNumber: 'JKESS-ORDER123', paypalOrderId: 'PAYPAL123', captureId: 'CAPTURE123', provider: source.provider }
    const attribution = { source, cartId: 'a'.repeat(64) }
    const calls: string[] = []
    let claimed = false
    const deps = {
      getOrder: async () => order,
      getAttribution: async () => attribution,
      claim: async (_number: string, provider: 'goaffpro' | 'refersion') => {
        if (claimed) return null
        claimed = true
        return { orderNumber: task.orderNumber, operation: 'paid' as const, provider, claimId: 'b'.repeat(64), state: 'claimed' as const, updatedAt: 1 }
      },
      finish: async () => undefined,
      submitGoAffPro: async () => { calls.push('goaffpro'); return { reportedCommissionMatchesReportedTotal: true } },
      submitRefersion: async () => { calls.push('refersion') },
    }
    const results = await Promise.all([processAffiliatePaidTask(task, deps), processAffiliatePaidTask(task, deps)])
    assert.deepEqual(calls, [expected])
    assert.deepEqual(results.map((result) => result.status).sort(), ['already-claimed', 'submitted'])
  })
}

test('declining marketing tracking prevents affiliate attribution', () => {
  const store = storage()
  store.setItem(AFFILIATE_MARKETING_CONSENT_KEY, 'declined')
  updateAffiliateSource(store, '?ref=one', 1000)
  assert.equal(readAffiliateSource(store, 2000), null)
})
