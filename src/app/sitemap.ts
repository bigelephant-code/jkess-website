import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { products } from '@/lib/products'
import { nonBrandLandingPages } from '@/lib/non-brand-pages'
import { specificationLandingPages } from '@/lib/specification-pages'
import { absoluteUrl } from '@/lib/site'
import { localizedSeoPath, pageLanguageAlternates } from '@/lib/seo'

const policyPaths = [
  '/shipping-policy',
  '/returns-refunds',
  '/warranty',
  '/terms-of-sale',
  '/safety',
  '/privacy-policy',
]
const staticPaths = ['', '/about', '/products', '/downloads', '/news', '/contact', ...policyPaths]
const siteLastModified = new Date('2026-06-28')
const staticImages: Record<string, string[]> = {
  '': ['/images/mountain-bg.webp', '/images/battery-kit-hero.webp'],
  '/about': ['/images/company-building.webp'],
  '/products': products.flatMap((product) => product.images.slice(0, 1)),
  '/downloads': ['/images/downloads-banner-bg.webp'],
  '/news': ['/images/news-featured-energy-storage.jpg'],
  '/contact': ['/images/contact-banner-bg.webp'],
}

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
  if (policyPaths.includes(path)) return 0.5
  return 0.7
}

function staticChangeFrequency(path: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === '' || path === '/products' || path === '/news') return 'weekly'
  if (policyPaths.includes(path)) return 'yearly'
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
        images: (staticImages[path] || []).map((image) => absoluteUrl(image)),
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
        images: product.images.slice(0, 3).map((image) => absoluteUrl(image)),
        alternates: {
          languages: pageLanguageAlternates(productPath),
        },
      })
    }
  }

  for (const page of [...nonBrandLandingPages, ...specificationLandingPages]) {
    const url = absoluteUrl(`/${page.path}`)
    entries.push({
      url,
      lastModified: siteLastModified,
      changeFrequency: page.kind === 'guide' ? 'monthly' : 'weekly',
      priority: page.kind === 'category' ? 0.9 : 0.85,
      images: [absoluteUrl(page.image)],
      alternates: {
        languages: {
          en: url,
          'x-default': url,
        },
      },
    })
  }

  return entries
}
