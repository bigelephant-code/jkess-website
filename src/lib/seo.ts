import type { Metadata } from 'next'
import { defaultLocale, isValidLocale, locales } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'

export const euSeoPilotLocales: readonly LangCode[] = ['de', 'fr']
export const fullyLocalizedSeoLocales: readonly LangCode[] = [defaultLocale]
export const defaultIndexableSeoLocales: readonly LangCode[] = fullyLocalizedSeoLocales
export const allPublishedSeoLocales: readonly LangCode[] = locales.map((locale) => locale.code)

interface PageMetadataOptions {
  lang: string
  path: string
  title: string
  description: string
  keywords?: string[]
  image?: string
  indexableLocales?: readonly LangCode[]
  alternateLocales?: readonly LangCode[]
}

export function localizedSeoPath(lang: string, path: string) {
  const validLang = isValidLocale(lang) ? lang : defaultLocale
  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`
  return `${validLang === defaultLocale ? '' : `/${validLang}`}${normalizedPath}`
}

export function pageLanguageAlternates(
  path: string,
  localeCodes: readonly LangCode[] = allPublishedSeoLocales
) {
  return {
    ...Object.fromEntries(
      localeCodes.map((code) => [
        code,
        absoluteUrl(localizedSeoPath(code, path)),
      ])
    ),
    'x-default': absoluteUrl(localizedSeoPath(defaultLocale, path)),
  }
}

export function isSeoLocaleIndexable(
  lang: string,
  indexableLocales: readonly LangCode[] = allPublishedSeoLocales
) {
  return indexableLocales.includes(lang as LangCode)
}

export function canonicalSeoPath(
  lang: string,
  path: string,
  indexableLocales: readonly LangCode[] = allPublishedSeoLocales
) {
  return localizedSeoPath(isSeoLocaleIndexable(lang, indexableLocales) ? lang : defaultLocale, path)
}

export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  keywords = [],
  image = '/images/news-featured-energy-storage.jpg',
  indexableLocales,
  alternateLocales,
}: PageMetadataOptions): Metadata {
  const canonicalPath = canonicalSeoPath(lang, path, indexableLocales)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords,
    applicationName: 'JKESS',
    creator: 'JKBMS Electronic Technology Co.,Ltd',
    publisher: 'JKBMS Electronic Technology Co.,Ltd',
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: pageLanguageAlternates(path, alternateLocales),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: 'JKESS',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}
