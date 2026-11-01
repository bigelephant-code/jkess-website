import type { AffiliatePaidTask } from './affiliate-report-queue'
import type { AffiliateRefundTask } from './affiliate-refund-queue'

type Command = (args: Array<string | number>) => Promise<unknown>
type Task = { type: 'paid'; value: AffiliatePaidTask } | { type: 'refund'; value: AffiliateRefundTask }
type Outcome = 'defer' | 'review' | 'submitted'

/** Move only the exact still-pending task; its original record is retained for audit. */
export async function dispositionAffiliateTask(command: Command, task: Task, outcome: Outcome) {
  if (!['defer', 'review', 'submitted'].includes(outcome)) throw new Error('Invalid task outcome')
  const id = task.type === 'paid' ? task.value.orderNumber : task.value.refundId
  if (task.type === 'paid' ? !/^JKESS-[A-Z0-9-]{6,80}$/.test(id) : !/^[A-Z0-9]{1,120}$/i.test(id)) throw new Error('Invalid task ID')
  const recordKey = task.type === 'paid' ? `jkess:affiliate:paid:task:${id}` : `jkess:affiliate:refund:${id}`
  const pendingKey = task.type === 'paid' ? 'jkess:affiliate:paid:pending' : 'jkess:affiliate:refunds:pending'
  const reviewKey = 'jkess:affiliate:reports:review'
  const reviewId = `${task.type}:${id}`
  const taskValue = task.type === 'paid'
    ? JSON.stringify({ orderNumber: task.value.orderNumber, paypalOrderId: task.value.paypalOrderId, captureId: task.value.captureId, provider: task.value.provider })
    : JSON.stringify({ refundId: task.value.refundId, captureId: task.value.captureId, orderNumber: task.value.orderNumber, action: task.value.action })
  const script = "if redis.call('GET', KEYS[1]) ~= ARGV[1] then return -1 end; if not redis.call('ZSCORE', KEYS[2], ARGV[2]) then return 0 end; if ARGV[3] == 'defer' then local tail = redis.call('ZREVRANGE', KEYS[2], 0, 0, 'WITHSCORES'); local score = tonumber(ARGV[4]); if #tail > 0 then score = math.max(score, tonumber(tail[2]) + 1) end; redis.call('ZADD', KEYS[2], score, ARGV[2]); return 1 end; redis.call('ZADD', KEYS[3], ARGV[4], ARGV[5]); redis.call('SET', KEYS[4], ARGV[3]); if (ARGV[3] == 'review' or ARGV[3] == 'submitted') and ARGV[6] == '1' then redis.call('ZADD', KEYS[5], 'NX', ARGV[4], ARGV[2]) end; redis.call('ZREM', KEYS[2], ARGV[2]); return 1"
  const recover = task.type === 'paid' && task.value.provider === 'refersion' ? '1' : '0'
  const result = await command(['EVAL', script, 5, recordKey, pendingKey, reviewKey, `jkess:affiliate:reports:review:${reviewId}`, 'jkess:affiliate:recovery:pending', taskValue, id, outcome, Date.now(), reviewId, recover])
  if (result === -1) throw new Error('Task record changed during processing')
  if (result !== 0 && result !== 1) throw new Error('Invalid task disposition response')
  return { moved: result === 1 }
}
