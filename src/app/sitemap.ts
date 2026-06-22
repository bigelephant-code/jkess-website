import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { products } from '@/lib/products'
import { absoluteUrl } from '@/lib/site'

const staticPaths = ['', '/about', '/products', '/downloads', '/news', '/contact']

function localizedPath(locale: string, path: string) {
  return `${locale === defaultLocale ? '' : `/${locale}`}${path || '/'}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizedPath(locale.code, path)),
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      })
    }

    for (const product of products) {
      entries.push({
        url: absoluteUrl(localizedPath(locale.code, `/products/${product.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
