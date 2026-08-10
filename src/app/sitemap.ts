import type { MetadataRoute } from 'next'
import { defaultLocale } from '@/i18n/config'
import { products } from '@/lib/products'
import { nonBrandLandingPages } from '@/lib/non-brand-pages'
import { specificationLandingPages } from '@/lib/specification-pages'
import { technicalGuides } from '@/lib/technical-guides'
import { absoluteUrl } from '@/lib/site'
import {
  authorizedDistributorIndexableSeoLocales,
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
  '/authorized-distributors',
  ...policyPaths,
]
const siteLastModified = new Date('2026-07-01')
const staticPageLastModified: Record<string, Date> = {
  '/authorized-distributors': new Date('2026-07-29'),
}
// Landing pages whose title/description were revised after siteLastModified.
// Without this the sitemap would still advertise the older shared date and give
// crawlers no reason to re-fetch the page.
const nonBrandPageLastModified: Record<string, string> = {
  // 2026-08-10: titles and meta descriptions revised so they stop being
  // truncated in search results. Every path listed here had its title,
  // seoTitle, or description changed on that date.
  'applications/commercial-backup-power-battery-storage': '2026-08-10',
  'applications/ev-charging-station-battery-storage': '2026-08-10',
  'applications/factory-energy-storage-system': '2026-08-10',
  'applications/solar-self-consumption-battery-storage': '2026-08-10',
  'applications/warehouse-supermarket-battery-storage': '2026-08-10',
  'battery-box-manual': '2026-08-10',
  'battery-enclosures/15kwh-lifepo4': '2026-08-10',
  'battery-enclosures/16kwh-lifepo4': '2026-08-10',
  'bmu-battery-module': '2026-08-10',
  'can-rs485-bms-inverter-compatibility': '2026-08-10',
  'commercial-battery-storage-cabinet': '2026-08-10',
  'commercial-energy-storage': '2026-08-10',
  'commercial-energy-storage/215kwh': '2026-08-10',
  'commercial-energy-storage/261kwh': '2026-08-10',
  'commercial-ess-cabinet-manufacturer': '2026-08-10',
  compare: '2026-08-10',
  'compare/100a-vs-200a-high-voltage-bms': '2026-08-10',
  'compare/48v-vs-51-2v-lifepo4-battery': '2026-08-10',
  'compare/battery-kit-vs-ci-ess-cabinet': '2026-08-10',
  'compare/rack-vs-floor-standing-battery-kit': '2026-08-10',
  'energy-storage-enclosures': '2026-08-10',
  'ess-cooling-system': '2026-08-10',
  'ess-rack-mount-battery-modules': '2026-08-10',
  europe: '2026-08-10',
  'europe/48v-battery-enclosure-eu-shipping': '2026-08-10',
  'europe/austria-lifepo4-battery-kit': '2026-08-10',
  'europe/belgium-lifepo4-battery-kit': '2026-08-10',
  'europe/commercial-energy-storage-cabinet-europe': '2026-08-10',
  'europe/denmark-lifepo4-battery-kit': '2026-08-10',
  'europe/eu-warehouse-battery-kit': '2026-08-10',
  'europe/france-lifepo4-battery-kit': '2026-08-10',
  'europe/germany-lifepo4-battery-kit': '2026-08-10',
  'europe/italy-lifepo4-battery-kit': '2026-08-10',
  'europe/lifepo4-battery-kit-europe': '2026-08-10',
  'europe/netherlands-lifepo4-battery-kit': '2026-08-10',
  'europe/poland-lifepo4-battery-kit': '2026-08-10',
  'europe/portugal-lifepo4-battery-kit': '2026-08-10',
  'europe/spain-lifepo4-battery-kit': '2026-08-10',
  'europe/sweden-lifepo4-battery-kit': '2026-08-10',
  'guides/air-cooled-vs-liquid-cooled-ess': '2026-08-10',
  'high-voltage-bms': '2026-08-10',
  'high-voltage-bms-for-ess': '2026-08-10',
  'peak-shaving-battery-storage': '2026-08-10',
  'quote-preparation/commercial-ess-project-checklist': '2026-08-10',
  'solutions/commercial-peak-shaving': '2026-08-10',
}
const staticImages: Record<string, string[]> = {
  '': ['/images/mountain-bg.webp', '/images/battery-kit-hero.webp'],
  '/about': ['/images/company-building.webp'],
  '/products': products.flatMap((product) => product.images.slice(0, 1)),
  '/downloads': ['/images/downloads-banner-bg.webp'],
  '/news': ['/images/news-featured-energy-storage.jpg'],
  '/contact': ['/images/contact-banner-bg.webp'],
  '/quality-and-manufacturing': ['/images/company-building.webp'],
  '/shipping-quote': ['/images/contact-banner-bg.webp'],
  '/authorized-distributors': ['/images/company-building.webp'],
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
  if (path === '/authorized-distributors') return 0.8
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

function staticIndexableLocales(path: string) {
  return path === '/authorized-distributors'
    ? authorizedDistributorIndexableSeoLocales
    : defaultIndexableSeoLocales
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of staticPaths) {
    const indexableLocales = staticIndexableLocales(path)
    const languageAlternates = pageLanguageAlternates(sitemapPath(path), indexableLocales)

    for (const locale of indexableLocales) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: staticPageLastModified[path] || siteLastModified,
        changeFrequency: staticChangeFrequency(path),
        priority: staticPriority(path),
        images: (staticImages[path] || []).map((image) => absoluteUrl(image)),
        alternates: {
          languages: languageAlternates,
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
    const revisedOn = nonBrandPageLastModified[page.path]
    const pageLastModified = revisedOn
      ? new Date(`${revisedOn}T00:00:00.000Z`)
      : siteLastModified

    for (const locale of defaultIndexableSeoLocales) {
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale, path)),
        lastModified: pageLastModified,
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
    // Guides carry their own revision date. Reporting the shared site date here
    // would tell crawlers the page is unchanged on the day it was edited.
    const guideLastModified = new Date(`${guide.dateModified}T00:00:00.000Z`)

    for (const locale of defaultIndexableSeoLocales) {
      entries.push({
        url: absoluteUrl(localizedSeoPath(locale, path)),
        lastModified: guideLastModified,
        changeFrequency: 'monthly',
        priority: 0.82,
        images: [absoluteUrl(guide.image)],
        alternates: { languages: languageAlternates },
      })
    }
  }

  return entries
}
