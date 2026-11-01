import assert from 'node:assert/strict'
import test from 'node:test'
// Node executes this isolated test directly with built-in TypeScript stripping.
// @ts-expect-error The application TypeScript configuration disallows .ts imports.
import { decideAffiliateRefund, selectLastAffiliateTouch } from '../src/lib/affiliate-rules.ts'

test('last eligible affiliate provider wins', () => {
  const touches = [
    { provider: 'goaffpro' as const, occurredAt: 10, expiresAt: 100 },
    { provider: 'refersion' as const, occurredAt: 20, expiresAt: 100 },
  ]
  assert.deepEqual(selectLastAffiliateTouch(touches, 50), { status: 'credited', provider: 'refersion' })
  assert.deepEqual(selectLastAffiliateTouch([...touches, { provider: 'goaffpro', occurredAt: 30, expiresAt: 100 }], 50), { status: 'credited', provider: 'goaffpro' })
})

test('expired, future and malformed touches are not eligible', () => {
  assert.deepEqual(selectLastAffiliateTouch([
    { provider: 'goaffpro', occurredAt: 1, expiresAt: 50 },
    { provider: 'refersion', occurredAt: 60, expiresAt: 100 },
    { provider: 'refersion', occurredAt: 20, expiresAt: 10 },
  ], 50), { status: 'none' })
})

test('simultaneous last touches from different providers require review', () => {
  assert.deepEqual(selectLastAffiliateTouch([
    { provider: 'goaffpro', occurredAt: 10, expiresAt: 100 },
    { provider: 'refersion', occurredAt: 10, expiresAt: 100 },
  ], 20), { status: 'review', reason: 'ambiguous-last-touch' })
})

test('full refunds cancel; partial and invalid refunds require review', () => {
  assert.equal(decideAffiliateRefund(10000, 0), 'unchanged')
  assert.equal(decideAffiliateRefund(10000, 10000), 'cancel')
  assert.equal(decideAffiliateRefund(10000, 5000), 'review')
  assert.equal(decideAffiliateRefund(10000, 10001), 'review')
  assert.equal(decideAffiliateRefund(1.5, 1), 'review')
})
