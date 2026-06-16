import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from '@/i18n/config'

// Paths that should never be language-prefixed or rewritten
const PUBLIC_PATHS = [
  '/_next',
  '/images',
  '/favicon',
  '/api',
  '/sanity',
  '/studio',
  '/robots.txt',
  '/sitemap.xml',
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public/static paths
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]?.toLowerCase()

  // If path already has a valid locale prefix → let it through
  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next()
  }

  // No locale prefix — rewrite to English version internally
  // This keeps clean URLs: jkess-energy.com/about → serves /en/about content
  const locale = getNegotiatedLocale(request)

  // For non-English, redirect to the language-specific path
  if (locale !== defaultLocale) {
    const newUrl = new URL(request.nextUrl)
    newUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(newUrl, 307)
  }

  // For English (default): rewrite internally so URL stays clean
  const rewriteUrl = new URL(request.nextUrl)
  rewriteUrl.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
