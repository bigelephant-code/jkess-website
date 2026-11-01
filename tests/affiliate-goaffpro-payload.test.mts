import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
// @ts-expect-error Node runs this isolated test with TypeScript stripping.
import { signGoAffProOrder } from '../src/lib/affiliate-goaffpro-payload.ts'

const sample = { orderNumber: 'JKESS-TEST123', captureId: 'CAPTURE123', currency: 'USD', totalMinorUnits: 11500, referralCode: 'partner_1' }
const testSecret = 'only-a-fake-test-secret'

test('signs the verified total and referral using HS256', () => {
  const [header, payload, signature] = signGoAffProOrder(sample, testSecret).split('.')
  assert.deepEqual(JSON.parse(Buffer.from(header, 'base64url').toString()), { alg: 'HS256', typ: 'JWT' })
  assert.equal(JSON.parse(Buffer.from(payload, 'base64url').toString()).total, 115)
  assert.equal(JSON.parse(Buffer.from(payload, 'base64url').toString()).ref, 'partner_1')
  assert.equal(signature, createHmac('sha256', testSecret).update(`${header}.${payload}`).digest('base64url'))
  assert.notEqual(signature, createHmac('sha256', testSecret).update(`${header}.${payload}x`).digest('base64url'))
})

test('rejects invalid inputs instead of signing them', () => {
  assert.throws(() => signGoAffProOrder(sample, 'short'))
  assert.throws(() => signGoAffProOrder({ ...sample, totalMinorUnits: 1.5 }, testSecret))
  assert.throws(() => signGoAffProOrder({ ...sample, currency: 'JPY' }, testSecret))
  assert.throws(() => signGoAffProOrder({ ...sample, referralCode: '../bad' }, testSecret))
})

test('retains the verified EUR currency without changing the paid amount', () => {
  const [, payload] = signGoAffProOrder({ ...sample, currency: 'EUR' }, testSecret).split('.')
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString())
  assert.equal(decoded.currency, 'EUR')
  assert.equal(decoded.total, 115)
})
