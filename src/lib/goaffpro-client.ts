const API = 'https://api.goaffpro.com/v1/admin/orders'

export type GoAffProSale = {
  id: number
  number: string
  status: string
  is_paid: boolean | number | null
}

export class GoAffProApiError extends Error {
  constructor(readonly outcome: 'rejected' | 'unknown', readonly status?: number) {
    super('GoAffPro API request failed')
    this.name = 'GoAffProApiError'
  }
}

function headers(token: string) {
  if (!token.trim()) throw new Error('GoAffPro access token is not configured')
  return { 'x-goaffpro-access-token': token, 'Content-Type': 'application/json' }
}

async function apiRequest(url: string, token: string, init: RequestInit, send: typeof fetch) {
  let response: Response
  try {
    response = await send(url, {
      ...init, headers: headers(token), redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15_000),
    })
  } catch {
    throw new GoAffProApiError('unknown')
  }
  if (!response.ok) {
    throw new GoAffProApiError(response.status >= 400 && response.status < 500 && response.status !== 429 ? 'rejected' : 'unknown', response.status)
  }
  try { return await response.json() as unknown } catch { throw new GoAffProApiError('unknown') }
}

/** Submission is separate from attribution and refund reconciliation. Do not retry ambiguous results blindly. */
export async function submitGoAffProPaidOrder(input: GoAffProOrderInput, referralCode: string, token: string, send: typeof fetch = fetch) {
  if (!/^[A-Za-z0-9_.-]{1,180}$/.test(referralCode)) throw new Error('Invalid referral code')
  const order = buildGoAffProOrder(input)
  const body = await apiRequest(API, token, {
    method: 'POST',
    body: JSON.stringify({ order, ref_code: referralCode }),
  }, send)
  if (!body || typeof body !== 'object' || !('result' in body) || !body.result || typeof body.result !== 'object') {
    throw new GoAffProApiError('unknown')
  }
  const result = body.result as Record<string, unknown>
  if (result.error || !/^[1-9]\d*$/.test(String(result.affiliate_id ?? ''))) throw new GoAffProApiError('unknown')
  const total = Number(result.total)
  const commission = Number(result.commission)
  if (!Number.isFinite(total) || total <= 0 || total > 1e9 || !Number.isFinite(commission) || commission < 0) {
    throw new GoAffProApiError('unknown')
  }
  // The provider may report in a different currency. This compares its own
  // total and commission, not whether its exchange rate matches checkout.
  const reportedCommissionMatchesReportedTotal = Math.round(commission * 100) === Math.round(total * 10)
  return { status: 'submitted' as const, reportedCommissionMatchesReportedTotal }
}

/** Reads only minimal data and refuses ambiguous matches. */
export async function findGoAffProSale(orderNumber: string, token: string, send: typeof fetch = fetch) {
  if (!/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber)) throw new Error('Invalid order number')
  const query = new URLSearchParams({ number: orderNumber, fields: 'id,number,status,is_paid', limit: '50' })
  const body = await apiRequest(`${API}?${query}`, token, { method: 'GET' }, send)
  if (!body || typeof body !== 'object' || !('orders' in body) || !Array.isArray(body.orders)) {
    throw new GoAffProApiError('unknown')
  }
  const matches = body.orders.filter((sale: unknown) => sale && typeof sale === 'object' && (sale as Record<string, unknown>).number === orderNumber)
  if (matches.length > 1) throw new Error('Ambiguous GoAffPro order')
  if (!matches.length) return null
  const sale = matches[0] as Record<string, unknown>
  if (!Number.isSafeInteger(sale.id) || (sale.id as number) <= 0 || typeof sale.status !== 'string') {
    throw new GoAffProApiError('unknown')
  }
  const paid = sale.is_paid
  if (paid !== false && paid !== true && paid !== 0 && paid !== 1 && paid !== null) throw new GoAffProApiError('unknown')
  return { id: sale.id as number, number: orderNumber, status: sale.status, is_paid: paid as boolean | number | null }
}

import { buildGoAffProOrder, type GoAffProOrderInput } from './goaffpro-order'
