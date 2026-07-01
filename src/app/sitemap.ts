import type { MetadataRoute } from 'next'
import { defaultLocale } from '@/i18n/config'
import { products } from '@/lib/products'
import { nonBrandLandingPages } from '@/lib/non-brand-pages'
import { specificationLandingPages } from '@/lib/specification-pages'
import { technicalGuides } from '@/lib/technical-guides'
import { absoluteUrl } from '@/lib/site'
import {
  defaultIndexableSeoLocales,
  localizedSeoPath,
  pageLanguageAlternates,
  productIndexableSeoLocales,
} from '@/lib/seo'

const policyPaths = [
  '/shipping-policy',
  '/returns-refunds',
  '/warranty',
  '/terms-of-sale',
  '/safety',
  '/privacy-policy',
  '/eu-compliance',
]
const staticPaths = [
  '',
  '/about',
  '/products',
  '/downloads',
  '/news',
  '/contact',
  '/quality-and-manufacturing',
  '/shipping-quote',
  ...policyPaths,
]
const siteLastModified = new Date('2026-07-01')
const staticImages: Record<string, string[]> = {
  '': ['/images/mountain-bg.webp', '/images/battery-kit-hero.webp'],
  '/about': ['/images/company-building.webp'],
  '/products': products.flatMap((product) => product.images.slice(0, 1)),
  '/downloads': ['/images/downloads-banner-bg.webp'],
  '/news': ['/images/news-featured-energy-storage.jpg'],
  '/contact': ['/images/contact-banner-bg.webp'],
  '/quality-and-manufacturing': ['/images/company-building.webp'],
  '/shipping-quote': ['/images/contact-banner-bg.webp'],
  '/eu-compliance': ['/images/company-building.webp'],
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
  if (path === '/contact' || path === '/shipping-quote') return 0.85
  if (path === '/downloads' || path === '/news' || path === '/quality-and-manufacturing' || path === '/eu-compliance') return 0.75
  if (policyPaths.includes(path)) return 0.5
  return 0.7
}

function staticChangeFrequency(path: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === '' || path === '/products' || path === '/news') return 'weekly'
  if (policyPaths.includes(path)) return 'yearly'
  return 'monthly'
}

function indexableSeoAlternates(path: string) {
  return pageLanguageAlternates(path, defaultIndexableSeoLocales)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of defaultIndexableSeoLocales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: siteLastModified,
        changeFrequency: staticChangeFrequency(path),
        priority: staticPriority(path),
        images: (staticImages[path] || []).map((image) => absoluteUrl(image)),
        alternates: {
          languages: indexableSeoAlternates(sitemapPath(path)),
        },
      })
    }
  }

  for (const product of products) {
    const productPath = `/products/${product.slug}`
    const indexableLocales = productIndexableSeoLocales(product.slug)
    const languageAlternates = pageLanguageAlternates(productPath, indexableLocales)

    for (const locale of indexableLocales) {
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale, productPath)),
        lastModified: siteLastModified,
        changeFrequency: 'weekly',
        priority: product.type === 'shop' ? 0.9 : 0.85,
        images: product.images.slice(0, 3).map((image) => absoluteUrl(image)),
        alternates: {
          languages: languageAlternates,
        },
      })
    }
  }

  for (const page of [...nonBrandLandingPages, ...specificationLandingPages]) {
    const path = `/${page.path}`
    const languageAlternates = indexableSeoAlternates(path)

    for (const locale of defaultIndexableSeoLocales) {
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale, path)),
        lastModified: siteLastModified,
        changeFrequency: page.kind === 'guide' ? 'monthly' : 'weekly',
        priority: page.kind === 'category' ? 0.9 : 0.85,
        images: [absoluteUrl(page.image)],
        alternates: {
          languages: languageAlternates,
        },
      })
    }
  }

  for (const guide of technicalGuides) {
    const path = `/guides/${guide.slug}`
    const languageAlternates = indexableSeoAlternates(path)

    for (const locale of defaultIndexableSeoLocales) {
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale, path)),
        lastModified: siteLastModified,
        changeFrequency: 'monthly',
        priority: 0.82,
        images: [absoluteUrl(guide.image)],
        alternates: { languages: languageAlternates },
      })
    }
  }

  return entries
}
