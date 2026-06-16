import { locales, defaultLocale } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'

/** Returns the path with the language prefix, stripping default locale for cleaner URLs */
export function localizedPath(lang: LangCode, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  // For the default locale, don't prefix (domain.com/about instead of domain.com/en/about)
  if (lang === defaultLocale) return p
  return `/${lang}${p}`
}

/** Get alternate language links for SEO (hreflang) */
export function getHreflangLinks(currentPath: string): Array<{ lang: string; href: string }> {
  return locales.map((l) => ({
    lang: l.code,
    href: localizedPath(l.code, currentPath),
  }))
}
