import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from '@/i18n/config'
import { REQUEST_LOCALE_HEADER } from '@/lib/request-locale'

const PUBLIC_PATHS = [
  '/_next',
  '/images',
  '/favicon',
  '/api',
  '/sanity',
  '/studio',
  '/robots.txt',
  '/sitemap.xml',
  '/indexnow-key.txt',
  '/merchant-feed.xml',
  '/manifest.webmanifest',
  '/apple-touch-icon.png',
  '/icon-',
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

function requestHeadersWithLocale(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(REQUEST_LOCALE_HEADER, locale)
  return requestHeaders
}

function setLocaleResponseHeaders(
  response: NextResponse,
  locale: string
) {
  response.headers.set('Content-Language', locale)
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]?.toLowerCase()

  if (firstSegment && isValidLocale(firstSegment)) {
    const response = NextResponse.next({
      request: {
        headers: requestHeadersWithLocale(request, firstSegment),
      },
    })
    return setLocaleResponseHeaders(response, firstSegment)
  }

  const rewriteUrl = new URL(request.nextUrl)
  rewriteUrl.pathname = `/en${pathname === '/' ? '' : pathname}`
  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeadersWithLocale(request, defaultLocale),
    },
  })
  return setLocaleResponseHeaders(response, defaultLocale)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
