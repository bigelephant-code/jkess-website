const API = 'https://api.refersion.com/v2026-08/conversions'

export type RefersionConversionDetail = {
  id: number
  affiliateId: number
  orderNumber: string
  paymentId: number
  status: string
  isTest: boolean
  total: string
  commission: string
  currency: 'USD' | 'EUR'
}

async function readJson(url: string, token: string, send: typeof fetch) {
  if (!token.trim()) throw new Error('Refersion access token is missing')
  const response = await send(url, {
    headers: { Authorization: `Bearer ${token}` }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error('Refersion lookup failed')
  try { return await response.json() as unknown } catch { throw new Error('Invalid Refersion response') }
}

/** Read-only lookup. An empty or capped list is not proof that no conversion exists. */
export async function readRefersionOrderConversions(orderNumber: string, token: string, send: typeof fetch = fetch) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber)) throw new Error('Invalid order number')
  const query = new URLSearchParams({ orderId: orderNumber, limit: '100' })
  const body = await readJson(`${API}?${query}`, token, send)
  if (!body || typeof body !== 'object' || !('data' in body) || !Array.isArray(body.data) || body.data.length >= 100) throw new Error('Incomplete Refersion conversion list')
  const ids = body.data.map((row: unknown) => {
    if (!row || typeof row !== 'object') throw new Error('Invalid Refersion conversion')
    const value = row as Record<string, unknown>
    if (value.orderId !== orderNumber || !Number.isSafeInteger(value.id) || (value.id as number) <= 0) throw new Error('Mismatched Refersion conversion')
    return value.id as number
  })
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate Refersion conversion')
  const result: RefersionConversionDetail[] = []
  for (const id of ids) {
    const detail = await readJson(`${API}/${id}`, token, send)
    if (!detail || typeof detail !== 'object' || !('data' in detail) || !detail.data || typeof detail.data !== 'object') throw new Error('Invalid Refersion detail')
    const value = detail.data as Record<string, unknown>
    const affiliate = value.affiliate as Record<string, unknown> | null
    if (value.id !== id || value.merchantUniqueId !== orderNumber || !Number.isSafeInteger(value.paymentId) || (value.paymentId as number) < 0 ||
        !affiliate || !Number.isSafeInteger(affiliate.id) || (affiliate.id as number) <= 0 ||
        typeof value.status !== 'string' || typeof value.isTest !== 'boolean' || !['USD', 'EUR'].includes(String(value.currency)) ||
        typeof value.total !== 'string' || !/^-?\d{1,10}(?:\.\d{1,2})?$/.test(value.total) ||
        typeof value.commissionTotal !== 'string' || !/^-?\d{1,10}(?:\.\d{1,2})?$/.test(value.commissionTotal)) throw new Error('Mismatched Refersion detail')
    result.push({ id, affiliateId: affiliate.id as number, orderNumber, paymentId: value.paymentId as number, status: value.status, isTest: value.isTest, total: value.total, commission: value.commissionTotal, currency: value.currency as 'USD' | 'EUR' })
  }
  return result
}

function minorUnits(value: string) {
  if (!/^-?\d{1,10}(?:\.\d{1,2})?$/.test(value)) throw new Error('Invalid amount')
  const negative = value.startsWith('-')
  const [whole, fraction = ''] = (negative ? value.slice(1) : value).split('.')
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  return negative ? -result : result
}

/** Diagnostic classification only: a missing row does not authorize a new report. */
export function classifyRefersionConversions(entries: RefersionConversionDetail[], expected: {
  affiliateId: number; paidMinorUnits: number; currency: 'USD' | 'EUR'; isTest: boolean
}) {
  if (!Number.isSafeInteger(expected.affiliateId) || expected.affiliateId <= 0 || !Number.isSafeInteger(expected.paidMinorUnits) || expected.paidMinorUnits <= 0) throw new Error('Invalid expected conversion')
  if (!entries.length) return 'unconfirmed' as const
  if (entries.some((entry) => entry.affiliateId !== expected.affiliateId || entry.currency !== expected.currency || entry.isTest !== expected.isTest || entry.paymentId !== 0 || entry.status !== 'PENDING')) return 'review' as const
  const originals = entries.filter((entry) => minorUnits(entry.total) > 0)
  const refunds = entries.filter((entry) => minorUnits(entry.total) < 0)
  if (originals.length !== 1 || originals.length + refunds.length !== entries.length) return 'review' as const
  const total = minorUnits(originals[0].total)
  const commission = minorUnits(originals[0].commission)
  if (total !== expected.paidMinorUnits || commission !== Math.round(total / 10)) return 'review' as const
  if (!refunds.length) return 'awaiting-refund' as const
  if (refunds.length !== 1 || minorUnits(refunds[0].total) !== -total || minorUnits(refunds[0].commission) !== -commission) return 'review' as const
  return 'balanced' as const
}
