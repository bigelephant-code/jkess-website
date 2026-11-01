import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node runs the source directly with TypeScript stripping.
import { AFFILIATE_SOURCE_KEY, AFFILIATE_MARKETING_CONSENT_KEY, AFFILIATE_WINDOW_MS, readAffiliateSource, sourceFromSearch, updateAffiliateSource, validAffiliateSource } from '../src/lib/affiliate-link-source.ts'

test('captures either provider with a 90-day window', () => {
  assert.deepEqual(sourceFromSearch('?ref=partner', 1000), { status: 'attributed', provider: 'goaffpro', code: 'partner', clickedAt: 1000, expiresAt: 1000 + AFFILIATE_WINDOW_MS })
  const refersion = sourceFromSearch('?rfsn=123.abc', 1000)
  assert.equal(refersion?.status === 'attributed' && refersion.provider, 'refersion')
  assert.equal(sourceFromSearch('?ref=<invalid>', 1000)?.status, 'review')
})

test('checkout rejects expired, future, altered and unconsented attribution', () => {
  const source = sourceFromSearch('?ref=partner', 1000)!
  assert.deepEqual(validAffiliateSource(source, 2000), source)
  assert.equal(validAffiliateSource(source, 1000 + AFFILIATE_WINDOW_MS), null)
  assert.equal(validAffiliateSource(source, 999), null)
  assert.equal(validAffiliateSource({ ...source, expiresAt: 1001 + AFFILIATE_WINDOW_MS }, 2000), null)
  const values = new Map([[AFFILIATE_SOURCE_KEY, JSON.stringify(source)]])
  const storage = { getItem: (key: string) => values.get(key) ?? null }
  assert.equal(readAffiliateSource(storage, 2000), null)
  values.set(AFFILIATE_MARKETING_CONSENT_KEY, 'accepted')
  assert.deepEqual(readAffiliateSource(storage, 2000), source)
})

test('flags conflicting or repeated source parameters for review', () => {
  assert.equal(sourceFromSearch('?ref=one&rfsn=two', 1000)?.status, 'review')
  assert.equal(sourceFromSearch('?ref=one&ref=two', 1000)?.status, 'review')
})

test('does not store attribution without independent marketing consent', () => {
  const values = new Map<string, string>()
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) }, removeItem: (key: string) => { values.delete(key) } }
  updateAffiliateSource(storage, '?ref=one', 1000)
  assert.equal(values.has(AFFILIATE_SOURCE_KEY), false)
  values.set(AFFILIATE_MARKETING_CONSENT_KEY, 'accepted')
  updateAffiliateSource(storage, '?ref=one', 1000)
  updateAffiliateSource(storage, '?rfsn=two.123', 2000)
  assert.equal(JSON.parse(values.get(AFFILIATE_SOURCE_KEY)!).provider, 'refersion')
  values.set(AFFILIATE_MARKETING_CONSENT_KEY, 'declined')
  updateAffiliateSource(storage, '', 3000)
  assert.equal(values.has(AFFILIATE_SOURCE_KEY), false)
})
