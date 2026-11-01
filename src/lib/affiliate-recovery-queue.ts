import { readAffiliatePaidTask } from './affiliate-report-queue'
import type { AffiliatePaidTask } from './affiliate-report-queue'

type Command = (args: Array<string | number>) => Promise<unknown>
const PENDING = 'jkess:affiliate:recovery:pending'
const RETRY_DELAY = 15 * 60_000

/** Recovery tasks remain separate from the human-review audit queue. */
export async function runAffiliateRecoveryQueue(command: Command, recover: (task: AffiliatePaidTask) => Promise<'recovered' | 'already-submitted' | 'changed' | 'review'>, now = Date.now()) {
  if (!Number.isSafeInteger(now) || now <= 0) throw new Error('Invalid recovery time')
  const ids = await command(['ZRANGEBYSCORE', PENDING, '-inf', now, 'LIMIT', 0, 1])
  if (!Array.isArray(ids) || ids.length > 1 || ids.some((id) => typeof id !== 'string' || !/^JKESS-[A-Z0-9-]{6,80}$/.test(id))) throw new Error('Invalid recovery queue')
  if (!ids.length) return { attempted: 0, recovered: 0 }
  const id = ids[0] as string
  try {
    const task = await readAffiliatePaidTask(command, id)
    if (task.provider !== 'refersion') throw new Error('Invalid recovery provider')
    const result = await recover(task)
    if (result === 'recovered' || result === 'already-submitted') {
      const removed = await command(['ZREM', PENDING, id])
      if (removed !== 0 && removed !== 1) throw new Error('Invalid recovery completion')
      return { attempted: 1, recovered: result === 'recovered' ? 1 : 0 }
    }
  } catch {
    // No provider mutation occurs during recovery; leave a bounded retry.
  }
  const updated = await command(['ZADD', PENDING, 'XX', now + RETRY_DELAY, id])
  if (updated !== 0 && updated !== 1) throw new Error('Invalid recovery retry')
  return { attempted: 1, recovered: 0 }
}
