import assert from 'node:assert/strict'
import test from 'node:test'
import { createRefersionTokenProvider } from '../src/lib/refersion-oauth'

test('shares one exchange for concurrent requests and reuses the short-lived token', async () => {
  let calls = 0
  let now = 1000
  const fetcher: typeof fetch = async () => { calls++; return new Response(JSON.stringify({ access_token: `token${calls}`, expires_in: 3600 })) }
  const token = createRefersionTokenProvider({ clientId: 'test', clientSecret: 'test' }, fetcher, () => now)
  assert.deepEqual(await Promise.all([token(), token(), token()]), ['token1', 'token1', 'token1'])
  assert.equal(await token(), 'token1')
  assert.equal(calls, 1)
  now += 3_541_000
  assert.equal(await token(), 'token2')
})

test('rejects invalid credentials, responses, and overly long-lived tokens', async () => {
  await assert.rejects(createRefersionTokenProvider({ clientId: '', clientSecret: 'x' })())
  const invalid: typeof fetch = async () => new Response(JSON.stringify({ access_token: 'test', expires_in: 7_776_000 }))
  await assert.rejects(createRefersionTokenProvider({ clientId: 'x', clientSecret: 'y' }, invalid)())
})
