import assert from 'node:assert/strict'
import test from 'node:test'
import { AFFILIATE_MARKETING_CONSENT_KEY, AFFILIATE_SOURCE_KEY, AFFILIATE_WINDOW_MS } from '../src/lib/affiliate-link-source'
import { sendRefersionCheckout, startRefersionClick } from '../src/lib/refersion-browser'

test('Refersion is not loaded without consent and binds only a consented cart', async () => {
  const values = new Map<string, string>()
  const now = Date.now()
  values.set(AFFILIATE_SOURCE_KEY, JSON.stringify({ status: 'attributed', provider: 'refersion', code: 'test', clickedAt: now, expiresAt: now + AFFILIATE_WINDOW_MS }))
  const calls: string[] = []
  const fakeWindow = {
    localStorage: { getItem: (key: string) => values.get(key) ?? null },
    location: { origin: 'https://example.test', pathname: '/checkout', href: 'https://example.test/checkout?private=value' },
    r: {
      pubKey: '',
      initializeXDLS: async () => { calls.push('init') },
      launchDefault: async () => { calls.push('launch') },
      sendCheckoutEvent: async (cart: string, _id: string, url: string) => { calls.push(`cart:${cart}:${url}`) },
    },
  }
  const fakeDocument = {
    createElement: () => ({ src: '', async: false, dataset: {} as Record<string, string>, onload: () => {}, onerror: () => {} }),
    head: { appendChild: (script: { src: string; onload: () => void }) => { calls.push(script.src); script.onload() } },
  }
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: fakeWindow })
  Object.defineProperty(globalThis, 'document', { configurable: true, value: fakeDocument })
  try {
    assert.equal(await startRefersionClick('pub_test123'), false)
    assert.equal(calls.length, 0)
    values.set(AFFILIATE_MARKETING_CONSENT_KEY, 'accepted')
    values.set('rfsn_v4_id', 'test-id')
    values.set('rfsn_v4_aid', 'test-aid')
    values.set('rfsn_v4_cs', 'test-cs')
    assert.equal(await startRefersionClick('pub_test123'), true)
    assert.ok(!calls.includes('init'))
    assert.equal(await sendRefersionCheckout('a'.repeat(64)), true)
    assert.ok(calls.includes(`cart:${'a'.repeat(64)}:https://example.test/checkout`))
    values.set(AFFILIATE_MARKETING_CONSENT_KEY, 'declined')
    assert.equal(await sendRefersionCheckout('b'.repeat(64)), false)
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow)
    else Reflect.deleteProperty(globalThis, 'window')
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument)
    else Reflect.deleteProperty(globalThis, 'document')
  }
})
