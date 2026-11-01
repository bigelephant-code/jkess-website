import assert from 'node:assert/strict'
import test from 'node:test'
import { authorizeAffiliateWorker } from '../src/lib/affiliate-worker-authorization'

test('scheduled worker requires a sufficiently strong exact bearer secret', () => {
  const secret = 'a'.repeat(32)
  assert.equal(authorizeAffiliateWorker(`Bearer ${secret}`, secret), true)
  assert.equal(authorizeAffiliateWorker(null, secret), false)
  assert.equal(authorizeAffiliateWorker(`Bearer ${secret}b`, secret), false)
  assert.equal(authorizeAffiliateWorker(`Bearer ${'b'.repeat(32)}`, secret), false)
  assert.equal(authorizeAffiliateWorker('Bearer short', 'short'), false)
  assert.equal(authorizeAffiliateWorker(`Basic ${secret}`, secret), false)
})
