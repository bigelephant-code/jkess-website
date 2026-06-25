import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { products } from '@/lib/products'
import { absoluteUrl } from '@/lib/site'
import { localizedSeoPath, pageLanguageAlternates } from '@/lib/seo'

const staticPaths = ['', '/about', '/products', '/downloads', '/news', '/contact']
const siteLastModified = new Date('2026-06-25')

function localizedPath(locale: string, path: string) {
  return `${locale === defaultLocale ? '' : `/${locale}`}${path || '/'}`
}

function sitemapPath(path: string) {
  return path || '/'
}

function staticPriority(path: string) {
  if (path === '') return 1
  if (path === '/products') return 0.9
  if (path === '/contact') return 0.85
  if (path === '/downloads' || path === '/news') return 0.75
  return 0.7
}

function staticChangeFrequency(path: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === '' || path === '/products' || path === '/news') return 'weekly'
  return 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizedPath(locale.code, path)),
        lastModified: siteLastModified,
        changeFrequency: staticChangeFrequency(path),
        priority: staticPriority(path),
        alternates: {
          languages: pageLanguageAlternates(sitemapPath(path)),
        },
      })
    }

    for (const product of products) {
      const productPath = `/products/${product.slug}`
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale.code, productPath)),
        lastModified: siteLastModified,
        changeFrequency: 'weekly',
        priority: product.type === 'shop' ? 0.9 : 0.85,
        alternates: {
          languages: pageLanguageAlternates(productPath),
        },
      })
    }
  }

  return entries
}
