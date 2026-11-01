import assert from 'node:assert/strict'
import test from 'node:test'
import { affiliateConsentCopy, affiliateWithdrawalError } from '../src/lib/affiliate-consent-copy'
import { readAffiliateConsent, saveAffiliateConsent } from '../src/lib/affiliate-consent'
import { AFFILIATE_MARKETING_CONSENT_KEY, AFFILIATE_SOURCE_KEY } from '../src/lib/affiliate-link-source'
import { locales } from '../src/i18n/config'

function makeStorage(): Storage {
  const data = new Map<string, string>()
  return {
    get length() { return data.size },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => { data.delete(key) },
    setItem: (key, value) => { data.set(key, value) },
  }
}

test('every supported language has a complete affiliate consent choice', () => {
  for (const locale of locales) {
    const copy = affiliateConsentCopy[locale.code]
    assert.equal(copy.length, 6)
    assert.ok(copy.every((item) => item.length > 1))
    assert.match(copy[1], /GoAffPro/)
    assert.match(copy[1], /Refersion/)
    assert.ok(affiliateWithdrawalError[locale.code].length > 1)
  }
})

test('consent is separate from analytics and requires an explicit choice', () => {
  const storage = makeStorage()
  storage.setItem('jkess-cookie-consent', 'accepted')
  assert.equal(readAffiliateConsent(storage), null)
  saveAffiliateConsent(storage, 'accepted')
  assert.equal(readAffiliateConsent(storage), 'accepted')
})

test('withdrawal clears first-party affiliate identifiers without affecting unrelated choices', () => {
  const storage = makeStorage()
  storage.setItem('jkess-cookie-consent', 'accepted')
  storage.setItem(AFFILIATE_MARKETING_CONSENT_KEY, 'accepted')
  storage.setItem(AFFILIATE_SOURCE_KEY, 'source')
  storage.setItem('rfsn_v4_id', 'test-id')
  storage.setItem('rfsn_v4_aid', 'test-partner')
  storage.setItem('rfsn_v4_cs', 'test-code')
  saveAffiliateConsent(storage, 'declined')
  assert.equal(readAffiliateConsent(storage), 'declined')
  assert.equal(storage.getItem(AFFILIATE_SOURCE_KEY), null)
  assert.equal(storage.getItem('rfsn_v4_id'), null)
  assert.equal(storage.getItem('rfsn_v4_aid'), null)
  assert.equal(storage.getItem('rfsn_v4_cs'), null)
  assert.equal(storage.getItem('jkess-cookie-consent'), 'accepted')
})

test('blocked storage does not fabricate a saved decision', () => {
  const storage = makeStorage()
  storage.setItem = () => { throw new Error('blocked') }
  assert.throws(() => saveAffiliateConsent(storage, 'accepted'))
  assert.equal(readAffiliateConsent(storage), null)
})
