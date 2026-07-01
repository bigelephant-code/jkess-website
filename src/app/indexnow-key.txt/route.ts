import { NextResponse } from 'next/server'
import { getIndexNowKey } from '@/lib/indexnow'

export function GET() {
  const key = getIndexNowKey()

  return new NextResponse(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
