import assert from 'node:assert/strict'
import test from 'node:test'
import { findGoAffProSale, GoAffProApiError, submitGoAffProPaidOrder } from '../src/lib/goaffpro-client'

const number = 'JKESS-SANDBOX-123'
const token = 'test-token'
const sale = { id: 123, number, status: 'pending', is_paid: false }

test('reads exact sale without disclosing unnecessary customer fields', async () => {
  const send: typeof fetch = async (url, init) => {
    const parsed = new URL(String(url))
    assert.equal(parsed.searchParams.get('number'), number)
    assert.equal(parsed.searchParams.get('fields'), 'id,number,status,is_paid')
    assert.equal((init?.headers as Record<string, string>)['x-goaffpro-access-token'], token)
    return Response.json({ orders: [sale] })
  }
  assert.deepEqual(await findGoAffProSale(number, token, send), sale)
})

test('refuses ambiguous matches and unverified paid state', async () => {
  await assert.rejects(findGoAffProSale(number, token, async () => Response.json({ orders: [sale, sale] })))
  await assert.rejects(findGoAffProSale(number, token, async () => Response.json({ orders: [{ ...sale, is_paid: 'unknown' }] })))
})

test('does not retry an uncertain lookup', async () => {
  let calls = 0
  const send: typeof fetch = async () => { calls++; throw new Error('timeout') }
  await assert.rejects(findGoAffProSale(number, token, send), (error: unknown) => error instanceof GoAffProApiError && error.outcome === 'unknown')
  assert.equal(calls, 1)
})

const paidOrder = {
  orderNumber: number, captureId: 'CAPTURE123', currency: 'USD' as const,
  paidMinorUnits: 13000, shippingMinorUnits: 2000, taxMinorUnits: 1000, discountMinorUnits: 0,
  items: [{ sku: 'KIT', name: 'Kit', quantity: 1, unitNetMinorUnits: 10000, lineTaxMinorUnits: 1000, lineDiscountMinorUnits: 0 }],
}

test('reports the verified order using only a referral code and checks the provider commission', async () => {
  const send: typeof fetch = async (url, init) => {
    assert.equal(url, 'https://api.goaffpro.com/v1/admin/orders')
    const payload = JSON.parse(String(init?.body))
    assert.equal(payload.ref_code, 'test-code')
    assert.equal(payload.affiliate_id, undefined)
    assert.equal(payload.order.line_items[0].price, 110)
    return Response.json({ result: { affiliate_id: 123, total: 130, commission: 13 } })
  }
  assert.deepEqual(await submitGoAffProPaidOrder(paidOrder, 'test-code', token, send), { status: 'submitted', reportedCommissionMatchesReportedTotal: true })
})

test('flags a provider commission which excludes tax', async () => {
  const send: typeof fetch = async () => Response.json({ result: { affiliate_id: 123, total: 130, commission: 12 } })
  assert.equal((await submitGoAffProPaidOrder(paidOrder, 'test-code', token, send)).reportedCommissionMatchesReportedTotal, false)
})

test('refuses invalid input and treats 200 provider errors as unknown', async () => {
  let calls = 0
  const send: typeof fetch = async () => { calls++; return Response.json({ result: { error: 'not found' } }) }
  await assert.rejects(submitGoAffProPaidOrder(paidOrder, '../bad', token, send))
  assert.equal(calls, 0)
  await assert.rejects(submitGoAffProPaidOrder(paidOrder, 'test-code', token, send), (error: unknown) => error instanceof GoAffProApiError && error.outcome === 'unknown')
  assert.equal(calls, 1)
})
