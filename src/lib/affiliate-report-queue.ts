type Command = (args: Array<string | number>) => Promise<unknown>
export type AffiliatePaidTask = {
  orderNumber: string
  paypalOrderId: string
  captureId: string
  provider: 'goaffpro' | 'refersion'
}

const PENDING = 'jkess:affiliate:paid:pending'

function validate(task: AffiliatePaidTask) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(task.orderNumber) ||
      !/^[A-Z0-9]{1,120}$/.test(task.paypalOrderId) || !/^[A-Z0-9]{1,120}$/.test(task.captureId) ||
      (task.provider !== 'goaffpro' && task.provider !== 'refersion')) throw new Error('Invalid affiliate paid task')
}

function recordKey(orderNumber: string) {
  return `jkess:affiliate:paid:task:${orderNumber}`
}

export async function readAffiliatePaidTask(command: Command, orderNumber: string) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber)) throw new Error('Invalid affiliate order number')
  const raw = await command(['GET', recordKey(orderNumber)])
  if (typeof raw !== 'string') throw new Error('Missing affiliate queue record')
  let task: AffiliatePaidTask
  try { task = JSON.parse(raw) as AffiliatePaidTask; validate(task) } catch { throw new Error('Invalid affiliate queue record') }
  if (task.orderNumber !== orderNumber) throw new Error('Mismatched affiliate queue record')
  return task
}

/** Persist one task and its queue entry in one atomic operation. */
export async function enqueueAffiliatePaid(command: Command, task: AffiliatePaidTask) {
  validate(task)
  const data = JSON.stringify({ orderNumber: task.orderNumber, paypalOrderId: task.paypalOrderId, captureId: task.captureId, provider: task.provider })
  const script = "local previous = redis.call('GET', KEYS[1]); if previous then if previous == ARGV[1] then return 0 else return -1 end end; redis.call('SET', KEYS[1], ARGV[1]); redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3]); return 1"
  const result = await command(['EVAL', script, 2, recordKey(task.orderNumber), PENDING, data, Date.now(), task.orderNumber])
  if (result === 1) return { duplicate: false }
  if (result === 0) return { duplicate: true }
  if (result === -1) throw new Error('Affiliate task conflicts with existing order')
  throw new Error('Unexpected affiliate queue response')
}

/** A task remains pending until an explicit reconciliation process removes it. */
export async function listAffiliatePaidTasks(command: Command, limit = 20) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error('Invalid queue limit')
  const ids = await command(['ZRANGE', PENDING, 0, limit - 1])
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' || !/^JKESS-[A-Z0-9-]{6,80}$/.test(id))) throw new Error('Invalid affiliate queue')
  if (!ids.length) return []
  const values = await command(['MGET', ...ids.map(recordKey)])
  if (!Array.isArray(values) || values.length !== ids.length) throw new Error('Invalid affiliate queue records')
  return values.map((raw, index) => {
    if (typeof raw !== 'string') throw new Error('Missing affiliate queue record')
    let task: AffiliatePaidTask
    try { task = JSON.parse(raw) as AffiliatePaidTask; validate(task) } catch { throw new Error('Invalid affiliate queue record') }
    if (task.orderNumber !== ids[index]) throw new Error('Mismatched affiliate queue record')
    return task
  })
}
