import assert from 'node:assert/strict'
import test from 'node:test'
import { sandboxAffiliateAutoEnabled } from '../src/lib/affiliate-sandbox-automatic'

test('automatic worker requires the explicit sandbox, isolated store and one allowlisted order', () => {
  const names = ['PAYPAL_ENVIRONMENT', 'PAYPAL_ENV', 'AFFILIATE_SANDBOX_AUTO_TEST_ENABLED', 'AFFILIATE_SANDBOX_AUTO_TEST_ORDER', 'JKESS_SANDBOX_UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL'] as const
  const saved = Object.fromEntries(names.map((name) => [name, process.env[name]]))
  try {
    process.env.PAYPAL_ENVIRONMENT = 'sandbox'
    process.env.AFFILIATE_SANDBOX_AUTO_TEST_ENABLED = 'true'
    process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER = 'JKESS-TEST123'
    process.env.JKESS_SANDBOX_UPSTASH_REDIS_REST_URL = 'https://independent.example.test'
    process.env.UPSTASH_REDIS_REST_URL = 'https://live.example.test'
    delete process.env.KV_REST_API_URL
    assert.equal(sandboxAffiliateAutoEnabled(), true)
    process.env.PAYPAL_ENVIRONMENT = 'live'
    assert.equal(sandboxAffiliateAutoEnabled(), false)
    process.env.PAYPAL_ENVIRONMENT = 'sandbox'
    process.env.KV_REST_API_URL = 'https://independent.example.test/'
    assert.equal(sandboxAffiliateAutoEnabled(), false)
    delete process.env.KV_REST_API_URL
    process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER = '../all-orders'
    assert.equal(sandboxAffiliateAutoEnabled(), false)
    process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER = 'JKESS-TEST123'
    delete process.env.AFFILIATE_SANDBOX_AUTO_TEST_ENABLED
    assert.equal(sandboxAffiliateAutoEnabled(), false)
  } finally {
    for (const name of names) {
      const value = saved[name]
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  }
})
