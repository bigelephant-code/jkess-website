import assert from 'node:assert/strict'
import test from 'node:test'
import { alertAffiliateReviews } from '../src/lib/affiliate-review-alert'

const config = { apiKey: 'test-key', from: 'orders@example.test', to: 'owner@example.test' }

test('does not send email when there are no review tasks', async () => {
  let sent = false
  const result = await alertAffiliateReviews(async () => 0, config, async () => { sent = true; return new Response('{}') })
  assert.equal(result.status, 'empty')
  assert.equal(sent, false)
})

test('sends a bounded summary without customer information and suppresses duplicates', async () => {
  const locks = new Set<string>()
  const command = async (args: Array<string | number>) => {
    if (args[0] === 'ZCARD') return 1
    if (args[0] === 'ZREVRANGE') return ['paid:JKESS-ORDER123']
    if (args[0] === 'SET') { const key = String(args[1]); if (locks.has(key)) return null; locks.add(key); return 'OK' }
    throw new Error('Unexpected command')
  }
  let body = ''
  let calls = 0
  const send: typeof fetch = async (_input, init) => { calls++; body = String(init?.body); return new Response('{}') }
  assert.equal((await alertAffiliateReviews(command, config, send)).status, 'sent')
  assert.equal((await alertAffiliateReviews(command, config, send)).status, 'already-notified')
  assert.equal(calls, 1)
  assert.match(body, /JKESS-ORDER123/)
  assert.doesNotMatch(body, /customer|address|paypal/i)
})

test('rejects unsafe queue values and unknown locks', async () => {
  await assert.rejects(alertAffiliateReviews(async (args) => args[0] === 'ZCARD' ? 1 : ['<script>'], config))
  await assert.rejects(alertAffiliateReviews(async (args) => args[0] === 'ZCARD' ? 1 : args[0] === 'ZREVRANGE' ? ['paid:JKESS-ORDER123'] : 7, config))
  await assert.rejects(alertAffiliateReviews(async (args) => args[0] === 'ZCARD' ? 1 : [], config))
})

test('releases the alert lock when sending fails so a later run can retry', async () => {
  let released = false
  const command = async (args: Array<string | number>) => {
    if (args[0] === 'ZCARD') return 1
    if (args[0] === 'ZREVRANGE') return ['refund:REFUND123']
    if (args[0] === 'SET') return 'OK'
    if (args[0] === 'EVAL') { released = true; return 1 }
    throw new Error('Unexpected command')
  }
  await assert.rejects(alertAffiliateReviews(command, config, async () => new Response('{}', { status: 503 })))
  assert.equal(released, true)
})

test('new same-day review items trigger a new notification and duplicates remain suppressed', async () => {
  let ids = ['paid:JKESS-ORDER123']
  const locks = new Set<string>()
  const command = async (args: Array<string | number>) => {
    if (args[0] === 'ZCARD') return ids.length
    if (args[0] === 'ZREVRANGE') return ids
    if (args[0] === 'SET') { const key = String(args[1]); if (locks.has(key)) return null; locks.add(key); return 'OK' }
    throw new Error('Unexpected command')
  }
  const messages: string[] = []
  const send: typeof fetch = async (_input, init) => { messages.push(String(init?.body)); return new Response('{}') }
  await alertAffiliateReviews(command, config, send)
  ids = ['refund:REFUND123', ...ids]
  assert.equal((await alertAffiliateReviews(command, config, send)).status, 'sent')
  assert.equal((await alertAffiliateReviews(command, config, send)).status, 'already-notified')
  assert.equal(messages.length, 2)
  assert.match(messages[1], /REFUND123/)
})

test('large queues explicitly report the number of omitted records', async () => {
  let body = ''
  const command = async (args: Array<string | number>) => {
    if (args[0] === 'ZCARD') return 55
    if (args[0] === 'ZREVRANGE') return Array.from({ length: 50 }, (_, index) => `refund:REFUND${index}`)
    if (args[0] === 'SET') return 'OK'
    throw new Error('Unexpected command')
  }
  await alertAffiliateReviews(command, config, async (_input, init) => { body = String(init?.body); return new Response('{}') })
  assert.match(body, /Additional records not listed: 5/)
})
