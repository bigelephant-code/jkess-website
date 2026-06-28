import { NextResponse } from 'next/server'

export function GET(request: Request) {
  return NextResponse.redirect(new URL('/images/6u-kit/1.webp', request.url), 308)
}
