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

function getNegotiatedLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  if (!acceptLang) return defaultLocale
  const preferred = acceptLang
    .split(',')
    .map((entry) => {
      const [lang, q = '1'] = entry.trim().split(';q=')
      return { lang: lang.split('-')[0].toLowerCase(), q: parseFloat(q) || 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const pref of preferred) {
    if (isValidLocale(pref.lang)) return pref.lang
  }
  return defaultLocale
}

function requestHeadersWithLocale(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(REQUEST_LOCALE_HEADER, locale)
  return requestHeaders
}

function setLocaleResponseHeaders(
  response: NextResponse,
  locale: string,
  varyByAcceptLanguage = false
) {
  response.headers.set('Content-Language', locale)
  if (varyByAcceptLanguage) response.headers.append('Vary', 'Accept-Language')
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

  const locale = getNegotiatedLocale(request)

  if (locale !== defaultLocale) {
    const newUrl = new URL(request.nextUrl)
    newUrl.pathname = `/${locale}${pathname}`
    const response = NextResponse.redirect(newUrl, 307)
    return setLocaleResponseHeaders(response, locale, true)
  }

  const rewriteUrl = new URL(request.nextUrl)
  rewriteUrl.pathname = `/en${pathname === '/' ? '' : pathname}`
  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeadersWithLocale(request, defaultLocale),
    },
  })
  return setLocaleResponseHeaders(response, defaultLocale, true)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
