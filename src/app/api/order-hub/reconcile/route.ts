import { NextResponse } from 'next/server'
import { OrderHubSyncError, reconcileHubOrders, verifyReconcileRequest } from '@/lib/order-hub'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300
export async function POST(request: Request) {
  try {
    const raw = await request.text()
    if (raw.length > 256) return NextResponse.json({ ok: false }, { status: 413 })
    verifyReconcileRequest(request, raw)
    const body = JSON.parse(raw)
    const offset = Number(body.offset || 0)
    if (!Number.isSafeInteger(offset) || offset < 0) return NextResponse.json({ ok: false }, { status: 400 })
    return NextResponse.json({ ok: true, ...await reconcileHubOrders(offset) }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return NextResponse.json({ ok: false }, { status: error instanceof OrderHubSyncError ? error.status : 503 }) }
}
