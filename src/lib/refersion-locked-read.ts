import { randomBytes } from 'node:crypto'
import { createRefersionTokenProvider } from './refersion-oauth'
import { readRefersionOrderConversions } from './refersion-reconciliation'

type Command = (args: Array<string | number>) => Promise<unknown>
const LOCK = 'jkess:affiliate:refersion:oauth-read-lock'

/** Serializes token issuance across instances; no access token is stored in Redis. */
export async function readRefersionConversionsLocked(command: Command, orderNumber: string, credentials: { clientId: string; clientSecret: string }, send: typeof fetch = fetch) {
  const owner = randomBytes(32).toString('hex')
  const acquired = await command(['SET', LOCK, owner, 'NX', 'EX', 120])
  if (acquired === null) return { status: 'busy' as const }
  if (acquired !== 'OK') throw new Error('Invalid Refersion lock response')
  const deadline = AbortSignal.timeout(40_000)
  const boundedFetch: typeof fetch = (input, init) => send(input, {
    ...init, signal: init?.signal ? AbortSignal.any([init.signal, deadline]) : deadline,
  })
  try {
    // A token minted by a different instance invalidates cached tokens, so
    // every lock holder obtains a fresh token before its own reads.
    const token = createRefersionTokenProvider(credentials, boundedFetch)
    const entries = await readRefersionOrderConversions(orderNumber, await token(), boundedFetch)
    return { status: 'ok' as const, entries }
  } finally {
    const release = "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end"
    await command(['EVAL', release, 1, LOCK, owner])
  }
}
