import { randomBytes } from 'node:crypto'

type Operation = 'paid' | 'full_refund'
type Provider = 'goaffpro' | 'refersion'
type State = 'claimed' | 'submitted' | 'unknown' | 'rejected'
type Command = (args: Array<string | number>) => Promise<unknown>

export type AffiliateReportClaim = {
  orderNumber: string
  operation: Operation
  provider: Provider
  claimId: string
  state: State
  updatedAt: number
}

function ledgerKey(orderNumber: string, operation: Operation) {
  if (!/^[A-Za-z0-9_-]{1,160}$/.test(orderNumber)) throw new Error('Invalid order number')
  if (operation !== 'paid' && operation !== 'full_refund') throw new Error('Invalid operation')
  return `jkess:affiliate:report:${operation}:${orderNumber}`
}

function validClaim(value: unknown): value is AffiliateReportClaim {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return typeof record.orderNumber === 'string' && /^[A-Za-z0-9_-]{1,160}$/.test(record.orderNumber) &&
    (record.operation === 'paid' || record.operation === 'full_refund') &&
    (record.provider === 'goaffpro' || record.provider === 'refersion') &&
    typeof record.claimId === 'string' && /^[a-f0-9]{64}$/.test(record.claimId) &&
    ['claimed', 'submitted', 'unknown', 'rejected'].includes(String(record.state)) &&
    Number.isSafeInteger(record.updatedAt) && (record.updatedAt as number) > 0
}

/** Claims never expire automatically: a crashed sender needs reconciliation, not a blind retry. */
export async function claimAffiliateReport(command: Command, orderNumber: string, operation: Operation, provider: Provider) {
  const key = ledgerKey(orderNumber, operation)
  if (provider !== 'goaffpro' && provider !== 'refersion') throw new Error('Invalid provider')
  const claim: AffiliateReportClaim = { orderNumber, operation, provider, claimId: randomBytes(32).toString('hex'), state: 'claimed', updatedAt: Date.now() }
  if (operation === 'paid') {
    const result = await command(['SET', key, JSON.stringify(claim), 'NX'])
    if (result === 'OK') return claim
    if (result !== null) throw new Error('Unexpected ledger response')
    return null
  }
  // A refund may only target the platform to which the paid order was submitted.
  const script = "local paid = redis.call('GET', KEYS[1]); if not paid then return 0 end; local ok, value = pcall(cjson.decode, paid); if not ok or type(value) ~= 'table' or value.state ~= 'submitted' or value.provider ~= ARGV[1] then return 0 end; if redis.call('SET', KEYS[2], ARGV[2], 'NX') then return 1 else return 0 end"
  const result = await command(['EVAL', script, 2, ledgerKey(orderNumber, 'paid'), key, provider, JSON.stringify(claim)])
  if (result === 1) return claim
  if (result === 0) return null
  throw new Error('Unexpected ledger response')
}

/** Atomically check withdrawal before claiming a production paid report. */
export async function claimAffiliatePaidWithConsent(command: Command, orderNumber: string, paypalOrderId: string, provider: Provider) {
  const reportKey = ledgerKey(orderNumber, 'paid')
  if (!/^[A-Z0-9]{1,120}$/.test(paypalOrderId) || (provider !== 'goaffpro' && provider !== 'refersion')) throw new Error('Invalid paid report')
  const claim: AffiliateReportClaim = { orderNumber, operation: 'paid', provider, claimId: randomBytes(32).toString('hex'), state: 'claimed', updatedAt: Date.now() }
  const script = "local raw = redis.call('GET', KEYS[1]); if not raw then return 0 end; local ok, v = pcall(cjson.decode, raw); if not ok or type(v) ~= 'table' or v.withdrawn == true or v.orderNumber ~= ARGV[1] or type(v.withdrawalToken) ~= 'string' or type(v.source) ~= 'table' or v.source.provider ~= ARGV[2] then return 0 end; if redis.call('SET', KEYS[2], ARGV[3], 'NX') then return 1 else return 0 end"
  const result = await command(['EVAL', script, 2, `jkess:affiliate:order:${paypalOrderId}`, reportKey, orderNumber, provider, JSON.stringify(claim)])
  if (result === 1) return claim
  if (result === 0) return null
  throw new Error('Unexpected consent claim response')
}

export async function readAffiliateReport(command: Command, orderNumber: string, operation: Operation) {
  const value = await command(['GET', ledgerKey(orderNumber, operation)])
  if (value === null) return null
  if (typeof value !== 'string') throw new Error('Invalid ledger response')
  let record: unknown
  try { record = JSON.parse(value) as unknown } catch { throw new Error('Invalid ledger record') }
  if (!validClaim(record) || record.orderNumber !== orderNumber || record.operation !== operation) throw new Error('Invalid ledger record')
  return record
}

/** Only the owner of the exact claim may record an outcome; submitted is not confirmed attribution. */
export async function finishAffiliateReport(command: Command, claim: AffiliateReportClaim, state: Exclude<State, 'claimed'>) {
  if (!validClaim(claim) || claim.state !== 'claimed' || !['submitted', 'unknown', 'rejected'].includes(state)) throw new Error('Invalid report outcome')
  const next: AffiliateReportClaim = { ...claim, state, updatedAt: Date.now() }
  const script = "if redis.call('GET', KEYS[1]) == ARGV[1] then redis.call('SET', KEYS[1], ARGV[2]); return 1 else return 0 end"
  const result = await command(['EVAL', script, 1, ledgerKey(claim.orderNumber, claim.operation), JSON.stringify(claim), JSON.stringify(next)])
  if (result !== 1) throw new Error('Affiliate report claim is no longer owned')
  return next
}

/** Caller must first independently verify the provider's exact conversion. */
export async function reconcileSubmittedAffiliateReport(command: Command, claim: AffiliateReportClaim, now = Date.now()) {
  if (!validClaim(claim) || claim.operation !== 'paid' || claim.provider !== 'refersion' || !Number.isSafeInteger(now) || now <= claim.updatedAt ||
      (claim.state !== 'unknown' && !(claim.state === 'claimed' && now - claim.updatedAt > 5 * 60_000))) {
    throw new Error('Report is not eligible for reconciliation')
  }
  const next: AffiliateReportClaim = { ...claim, state: 'submitted', updatedAt: now }
  const script = "if redis.call('GET', KEYS[1]) == ARGV[1] then redis.call('SET', KEYS[1], ARGV[2]); return 1 else return 0 end"
  const result = await command(['EVAL', script, 1, ledgerKey(claim.orderNumber, claim.operation), JSON.stringify(claim), JSON.stringify(next)])
  if (result === 0) return false
  if (result !== 1) throw new Error('Invalid reconciliation response')
  return true
}
