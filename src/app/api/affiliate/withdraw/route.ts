import { NextResponse } from 'next/server'
import { withdrawAffiliateAttribution } from '@/lib/order-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const size = Number(request.headers.get('content-length') || 0)
    if (!Number.isFinite(size) || size > 2048) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    const raw = await request.text()
    if (!raw || Buffer.byteLength(raw, 'utf8') > 2048) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    const input = value as Record<string, unknown>
    if (typeof input.paypalOrderId !== 'string' || typeof input.orderNumber !== 'string' || typeof input.token !== 'string') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    const result = await withdrawAffiliateAttribution(input.paypalOrderId, input.orderNumber, input.token)
    return result === 'busy' ? NextResponse.json({ status: 'pending' }, { status: 409, headers: { 'Cache-Control': 'no-store' } }) : NextResponse.json({ status: 'withdrawn' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Unable to complete withdrawal' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
