const API = 'https://api.goaffpro.com/v1/admin'
const PAGE_SIZE = 100
const MAX_TRANSACTIONS = 500

type Transaction = { id: number; event: string; amount: bigint; paid: boolean; currency: string }
export type GoAffProReconciliation = {
  saleId: number
  affiliateId: number
  status: string
  commission: bigint
  total: bigint
  transactions: Transaction[]
}

function positiveId(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) > 0
}

function money(value: unknown): bigint {
  if (typeof value !== 'string' || !/^-?\d{1,12}(?:\.\d{1,8})?$/.test(value)) throw new Error('Invalid GoAffPro amount')
  const negative = value.startsWith('-')
  const [whole, fraction = ''] = (negative ? value.slice(1) : value).split('.')
  const amount = BigInt(whole) * BigInt(100_000_000) + BigInt(fraction.padEnd(8, '0'))
  return negative ? -amount : amount
}

async function read(path: string, token: string, send: typeof fetch): Promise<Record<string, unknown>> {
  if (!token.trim()) throw new Error('Missing GoAffPro token')
  const response = await send(`${API}/${path}`, {
    headers: { 'x-goaffpro-access-token': token }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error('GoAffPro lookup failed')
  const body: unknown = await response.json()
  if (!body || typeof body !== 'object' || Array.isArray(body) || 'error' in body) throw new Error('Invalid GoAffPro response')
  return body as Record<string, unknown>
}

function page(body: Record<string, unknown>, key: string, limit: number) {
  const items = body[key]
  const count = body.count ?? body.total_results
  if (!Array.isArray(items) || !Number.isSafeInteger(count) || (count as number) < 0 || items.length > limit) {
    throw new Error('Incomplete GoAffPro response')
  }
  return { items, count: count as number }
}

/** Read-only diagnostic; an inconclusive result must never authorize a mutation. */
export async function readGoAffProReconciliation(orderNumber: string, referralCode: string, token: string, send: typeof fetch = fetch): Promise<GoAffProReconciliation> {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber) || !/^[A-Za-z0-9_.-]{1,180}$/.test(referralCode)) throw new Error('Invalid lookup')
  const affiliateQuery = new URLSearchParams({ ref_code: referralCode, fields: 'id,ref_code,ref_codes', limit: '10' })
  const affiliates = page(await read(`affiliates?${affiliateQuery}`, token, send), 'affiliates', 10)
  if (affiliates.count !== 1 || affiliates.items.length !== 1) throw new Error('Ambiguous GoAffPro affiliate')
  const affiliate = affiliates.items[0] as Record<string, unknown>
  if (!affiliate || !positiveId(affiliate.id) || !(affiliate.ref_code === referralCode || (Array.isArray(affiliate.ref_codes) && affiliate.ref_codes.includes(referralCode)))) throw new Error('Mismatched GoAffPro affiliate')

  const query = new URLSearchParams({ number: orderNumber, fields: 'id,number,status,is_paid,affiliate_id,total,commission', limit: '50' })
  const orders = page(await read(`orders?${query}`, token, send), 'orders', 50)
  if (orders.count !== 1 || orders.items.length !== 1) throw new Error('Ambiguous GoAffPro order')
  const sale = orders.items[0] as Record<string, unknown>
  if (!sale || !positiveId(sale.id) || sale.number !== orderNumber || sale.affiliate_id !== affiliate.id || typeof sale.status !== 'string') throw new Error('Mismatched GoAffPro order')
  const commission = money(sale.commission)
  const total = money(sale.total)
  if (total <= BigInt(0) || commission < BigInt(0)) throw new Error('Invalid GoAffPro order amount')

  const transactions: Transaction[] = []
  const seen = new Set<number>()
  let expectedCount: number | undefined
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const params = new URLSearchParams({ affiliate_id: String(affiliate.id), type: 'ORDERS', limit: String(PAGE_SIZE), offset: String(offset) })
    const result = page(await read(`transactions?${params}`, token, send), 'transactions', PAGE_SIZE)
    expectedCount ??= result.count
    if (result.count !== expectedCount || result.count > MAX_TRANSACTIONS || result.items.length !== Math.min(PAGE_SIZE, result.count - offset)) throw new Error('Incomplete GoAffPro transactions')
    for (const item of result.items) {
      const tx = item as Record<string, unknown>
      if (!tx || !positiveId(tx.tx_id) || seen.has(tx.tx_id) || tx.affiliate_id !== affiliate.id || String(tx.entity_type).toLowerCase() !== 'orders' || !positiveId(tx.entity_id)) throw new Error('Invalid GoAffPro transaction')
      seen.add(tx.tx_id)
      if (tx.entity_id !== sale.id) continue
      if (!['insert', 'update'].includes(String(tx.event_type)) || ![0, 1, false, true].includes(tx.is_paid as boolean | number) || typeof tx.currency !== 'string' || !/^[A-Z]{3}$/.test(tx.currency)) throw new Error('Invalid GoAffPro transaction detail')
      transactions.push({ id: tx.tx_id, event: tx.event_type as string, amount: money(tx.amount), paid: tx.is_paid === true || tx.is_paid === 1, currency: tx.currency })
    }
    if (offset + result.items.length === expectedCount) break
  }
  return { saleId: sale.id, affiliateId: affiliate.id, status: sale.status.toLowerCase(), commission, total, transactions }
}

/** Classification is diagnostic only, not permission to reverse or pay a commission. */
export function classifyGoAffProReconciliation(value: GoAffProReconciliation) {
  const tx = value.transactions
  if (!tx.length || tx.some((t) => t.paid) || new Set(tx.map((t) => t.currency)).size !== 1) return 'review' as const
  const inserts = tx.filter((t) => t.event === 'insert')
  if (inserts.length !== 1 || inserts[0].amount <= BigInt(0) || inserts[0].amount !== value.commission) return 'review' as const
  // The provider may retain fractions of a cent; compare rounded cents.
  const cents = (n: bigint) => (n + BigInt(500_000)) / BigInt(1_000_000)
  if (cents(value.commission) !== cents(value.total / BigInt(10))) return 'review' as const
  const updates = tx.filter((t) => t.event === 'update')
  if (!updates.length && ['approved', 'pending', 'new'].includes(value.status)) return 'unpaid-candidate' as const
  if (value.status === 'rejected' && updates.length === 1 && updates[0].amount === -inserts[0].amount) return 'balanced' as const
  return 'review' as const
}
