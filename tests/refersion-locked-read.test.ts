import assert from 'node:assert/strict'
import test from 'node:test'
import { readRefersionConversionsLocked } from '../src/lib/refersion-locked-read'

function redis() {
  const values = new Map<string, string>()
  return async (args: Array<string | number>) => {
    if (args[0] === 'SET') { const key = String(args[1]); if (values.has(key)) return null; values.set(key, String(args[2])); return 'OK' }
    if (args[0] === 'EVAL') { const key = String(args[3]); if (values.get(key) !== args[4]) return 0; values.delete(key); return 1 }
    throw new Error('Unexpected command')
  }
}

test('only one instance reads while the shared OAuth lock is held', async () => {
  const command = redis()
  let release!: () => void
  const blocked = new Promise<void>((resolve) => { release = resolve })
  let calls = 0
  const send: typeof fetch = async (input) => {
    calls++
    if (String(input).includes('oauth/token')) { await blocked; return Response.json({ access_token: 'token', expires_in: 3600 }) }
    return Response.json({ data: [] })
  }
  const first = readRefersionConversionsLocked(command, 'JKESS-ORDER123', { clientId: 'id', clientSecret: 'secret' }, send)
  await new Promise((resolve) => setTimeout(resolve, 0))
  const second = await readRefersionConversionsLocked(command, 'JKESS-ORDER123', { clientId: 'id', clientSecret: 'secret' }, send)
  assert.equal(second.status, 'busy')
  release()
  assert.equal((await first).status, 'ok')
  assert.equal(calls, 2)
  assert.equal((await readRefersionConversionsLocked(command, 'JKESS-ORDER123', { clientId: 'id', clientSecret: 'secret' }, send)).status, 'ok')
})

test('failure releases the lock and permits a later safe read', async () => {
  const command = redis()
  await assert.rejects(readRefersionConversionsLocked(command, 'JKESS-ORDER123', { clientId: 'id', clientSecret: 'secret' }, async () => new Response('{}', { status: 503 })))
  const send: typeof fetch = async (input) => String(input).includes('oauth/token') ? Response.json({ access_token: 'token', expires_in: 3600 }) : Response.json({ data: [] })
  assert.equal((await readRefersionConversionsLocked(command, 'JKESS-ORDER123', { clientId: 'id', clientSecret: 'secret' }, send)).status, 'ok')
})
