import assert from 'node:assert/strict'
import test from 'node:test'
import { manualAffiliateRefundReview, productionAffiliateWorkerEnabled } from '../src/lib/affiliate-production-worker'

test('production sender fails closed without every explicit production prerequisite', () => {
  const env: Record<string, string | undefined> = {
    PAYPAL_ENVIRONMENT: 'live', AFFILIATE_PRODUCTION_WORKER_ENABLED: 'true',
    AFFILIATE_INTEGRATION_ENABLED: 'true', AFFILIATE_REFUND_EVENTS_ENABLED: 'true',
    GOAFFPRO_ACCESS_TOKEN: 'test', REFERSION_PUBLIC_KEY: 'test', REFERSION_SECRET_KEY: 'test', CRON_SECRET: 'a'.repeat(32),
    REFERSION_OAUTH_CLIENT_ID: 'test', REFERSION_OAUTH_CLIENT_SECRET: 'test',
    RESEND_API_KEY: 'test', ORDER_EMAIL_FROM: 'test@example.test',
  }
  assert.equal(productionAffiliateWorkerEnabled(env), true)
  for (const name of Object.keys(env)) {
    const broken = { ...env }; delete broken[name]
    assert.equal(productionAffiliateWorkerEnabled(broken), false, `missing ${name}`)
  }
  assert.equal(productionAffiliateWorkerEnabled({ ...env, PAYPAL_ENVIRONMENT: 'sandbox' }), false)
  assert.equal(productionAffiliateWorkerEnabled({ ...env, CRON_SECRET: 'short' }), false)
  assert.equal(productionAffiliateWorkerEnabled({ ...env, AFFILIATE_PRODUCTION_WORKER_ENABLED: 'false' }), false)
})

test('production refunds require manual review', async () => {
  assert.deepEqual(await manualAffiliateRefundReview(), { status: 'review' })
})
