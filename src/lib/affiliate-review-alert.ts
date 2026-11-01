import { createHash, randomUUID } from 'node:crypto'

type Command = (args: Array<string | number>) => Promise<unknown>
type Config = { apiKey: string; from: string; to: string }

/** Sends only order/refund references, never customer or payment details. */
export async function alertAffiliateReviews(command: Command, config: Config, send: typeof fetch = fetch) {
  if (!config.apiKey || !config.from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.to)) throw new Error('Affiliate alert service is not configured')
  const count = await command(['ZCARD', 'jkess:affiliate:reports:review'])
  if (!Number.isSafeInteger(count) || (count as number) < 0) throw new Error('Invalid review count')
  if (count === 0) return { status: 'empty' as const }
  const ids = await command(['ZREVRANGE', 'jkess:affiliate:reports:review', 0, 49])
  if (!Array.isArray(ids) || ids.length !== Math.min(count as number, 50) || new Set(ids).size !== ids.length || ids.some((id) => typeof id !== 'string' || !/^(paid:JKESS-[A-Z0-9-]{6,80}|refund:[A-Z0-9]{1,120})$/i.test(id))) throw new Error('Invalid review references')
  const day = new Date().toISOString().slice(0, 10)
  const omitted = (count as number) - ids.length
  const text = `Please review affiliate records in the JKESS queue and provider dashboards.\n\nPending records: ${count}\nMost recent records shown: ${ids.length}\nAdditional records not listed: ${omitted}\n${ids.join('\n')}`
  const digest = createHash('sha256').update(text).digest('hex').slice(0, 32)
  const lockKey = `jkess:affiliate:review:alert:${day}:${digest}`
  const lockOwner = randomUUID()
  const locked = await command(['SET', lockKey, lockOwner, 'NX', 'EX', 86400])
  if (locked === null) return { status: 'already-notified' as const }
  if (locked !== 'OK') throw new Error('Invalid alert lock')
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15_000),
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `jkess-affiliate-review-${day}-${digest}` },
      body: JSON.stringify({ from: config.from, to: [config.to], subject: 'JKESS affiliate records require review', text }),
    })
    if (!response.ok) throw new Error('Affiliate review alert failed; inspect the alert service')
  } catch (error) {
    const release = "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end"
    await command(['EVAL', release, 1, lockKey, lockOwner]).catch(() => undefined)
    throw error
  }
  return { status: 'sent' as const }
}
