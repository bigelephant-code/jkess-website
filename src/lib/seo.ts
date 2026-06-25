import type { Metadata } from 'next'
import { defaultLocale, isValidLocale, locales } from '@/i18n/config'
import { absoluteUrl } from '@/lib/site'

interface PageMetadataOptions {
  lang: string
  path: string
  title: string
  description: string
  keywords?: string[]
  image?: string
}

export function localizedSeoPath(lang: string, path: string) {
  const validLang = isValidLocale(lang) ? lang : defaultLocale
  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`
  return `${validLang === defaultLocale ? '' : `/${validLang}`}${normalizedPath}`
}

export function pageLanguageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        locale.code,
        absoluteUrl(localizedSeoPath(locale.code, path)),
      ])
    ),
    'x-default': absoluteUrl(localizedSeoPath(defaultLocale, path)),
  }
}

export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  keywords = [],
  image = '/images/jkess-logo.png',
}: PageMetadataOptions): Metadata {
  const canonicalPath = localizedSeoPath(lang, path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: pageLanguageAlternates(path),
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
