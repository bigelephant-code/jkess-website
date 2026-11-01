import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error Node executes this test using built-in TypeScript stripping.
import { sandboxUsesProductionHub, selectOrderStorageConfig } from '../src/lib/checkout-environment.ts'

const productionHub = 'https://www.jkbms.net/api/integrations/jkess/orders'

test('blocks the production order hub for PayPal sandbox', () => {
  assert.equal(sandboxUsesProductionHub('sandbox', productionHub), true)
})

test('preserves live behavior and permits sandbox with the hub disabled', () => {
  assert.equal(sandboxUsesProductionHub('live', productionHub), false)
  assert.equal(sandboxUsesProductionHub(undefined, productionHub), false)
  assert.equal(sandboxUsesProductionHub('sandbox', ''), false)
})

test('sandbox requires dedicated storage and cannot select the configured production URL', () => {
  const base = { paypalEnvironment: 'sandbox', productionUrl: 'https://prod.example/', productionToken: 'production', sandboxUrl: undefined, sandboxToken: undefined }
  assert.equal(selectOrderStorageConfig(base), null)
  assert.equal(selectOrderStorageConfig({ ...base, sandboxUrl: 'https://prod.example', sandboxToken: 'sandbox' }), null)
  assert.deepEqual(selectOrderStorageConfig({ ...base, sandboxUrl: 'https://sandbox.example/', sandboxToken: 'sandbox' }), { url: 'https://sandbox.example', token: 'sandbox' })
  assert.deepEqual(selectOrderStorageConfig({ ...base, paypalEnvironment: 'live' }), { url: 'https://prod.example', token: 'production' })
})
