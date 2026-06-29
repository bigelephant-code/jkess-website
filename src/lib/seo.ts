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
  localeCodes: readonly LangCode[] = defaultIndexableSeoLocales
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
  indexableLocales: readonly LangCode[] = defaultIndexableSeoLocales
) {
  return indexableLocales.includes(lang as LangCode)
}

export function canonicalSeoPath(
  lang: string,
  path: string,
  indexableLocales: readonly LangCode[] = defaultIndexableSeoLocales
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
  indexableLocales = defaultIndexableSeoLocales,
  alternateLocales,
}: PageMetadataOptions): Metadata {
  const indexable = isSeoLocaleIndexable(lang, indexableLocales)
  const canonicalPath = canonicalSeoPath(lang, path, indexableLocales)
  const imageUrl = absoluteUrl(image)
  const resolvedAlternateLocales = alternateLocales ?? indexableLocales

  return {
    title,
    description,
    keywords,
    applicationName: 'JKESS',
    creator: 'JKBMS Electronic Technology Co.,Ltd',
    publisher: 'JKBMS Electronic Technology Co.,Ltd',
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: pageLanguageAlternates(path, resolvedAlternateLocales),
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
