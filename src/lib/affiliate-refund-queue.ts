type Command = (args: Array<string | number>) => Promise<unknown>

export type AffiliateRefundTask = {
  refundId: string
  captureId: string
  orderNumber: string
  action: 'cancel' | 'review'
}

function validTask(task: AffiliateRefundTask) {
  return /^[A-Z0-9]{1,120}$/i.test(task.refundId) && /^[A-Z0-9]{1,120}$/i.test(task.captureId) &&
    /^JKESS-[A-Z0-9-]{6,80}$/.test(task.orderNumber) && (task.action === 'cancel' || task.action === 'review')
}

/** Preserve the original task and flag conflicting replays for investigation. */
export async function enqueueAffiliateRefund(command: Command, task: AffiliateRefundTask) {
  if (!validTask(task)) throw new Error('Invalid refund reference')
  const record = JSON.stringify({ refundId: task.refundId, captureId: task.captureId, orderNumber: task.orderNumber, action: task.action })
  const script = "local previous = redis.call('GET', KEYS[1]); if previous then if previous == ARGV[1] then return 0 else return -1 end end; redis.call('SET', KEYS[1], ARGV[1]); redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3]); return 1"
  const result = await command(['EVAL', script, 2, `jkess:affiliate:refund:${task.refundId}`, 'jkess:affiliate:refunds:pending', record, Date.now(), task.refundId])
  if (result === 1) return { duplicate: false }
  if (result === 0) return { duplicate: true }
  if (result === -1) throw new Error('Refund conflicts with existing task')
  throw new Error('Unexpected refund queue response')
}

export async function listAffiliateRefundTasks(command: Command, limit = 20) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error('Invalid queue limit')
  const ids = await command(['ZRANGE', 'jkess:affiliate:refunds:pending', 0, limit - 1])
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' || !/^[A-Z0-9]{1,120}$/i.test(id))) throw new Error('Invalid refund queue')
  if (!ids.length) return []
  const values = await command(['MGET', ...ids.map((id) => `jkess:affiliate:refund:${id}`)])
  if (!Array.isArray(values) || values.length !== ids.length) throw new Error('Invalid refund records')
  return values.map((raw, index) => {
    if (typeof raw !== 'string') throw new Error('Missing refund record')
    let task: AffiliateRefundTask
    try { task = JSON.parse(raw) as AffiliateRefundTask; if (!validTask(task)) throw new Error('Invalid refund') } catch { throw new Error('Invalid refund record') }
    if (task.refundId !== ids[index]) throw new Error('Mismatched refund record')
    return task
  })
}
