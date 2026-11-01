import { NextResponse } from 'next/server'
import { authorizeAffiliateWorker } from '@/lib/affiliate-worker-authorization'
import { productionAffiliateWorkerEnabled, runProductionAffiliateBatch } from '@/lib/affiliate-production-worker'
import { drainAffiliateBatches } from '@/lib/affiliate-worker-drain'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  if (!authorizeAffiliateWorker(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  }
  if (!productionAffiliateWorkerEnabled()) return NextResponse.json({ error: 'Unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const result = await drainAffiliateBatches(runProductionAffiliateBatch)
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Processing failed' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
