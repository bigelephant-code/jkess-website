import { NextResponse } from 'next/server'
import { INITIAL_INVENTORY } from '@/lib/inventory-catalog'
import { getInventorySnapshot } from '@/lib/order-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const inventory = await getInventorySnapshot()
    return NextResponse.json(
      {
        inventory,
        source: 'redis',
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('Inventory lookup failed:', error)
    return NextResponse.json(
      {
        inventory: INITIAL_INVENTORY,
        source: 'configured-fallback',
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  }
}
