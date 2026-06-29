import DynamicProductPage from '../[slug]/page'
import { getProductBySlug } from '@/lib/products'
import { getLocalizedProductPageContent } from '@/lib/product-localizations'
import type { LangCode } from '@/i18n/config'
import {
  buildPageMetadata,
  productIndexableSeoLocales,
} from '@/lib/seo'

export const dynamic = 'force-dynamic'

const PRODUCT_SLUG = 'battery-kit'
const PRODUCT_PATH = `/products/${PRODUCT_SLUG}`

const localizedKeywords: Record<LangCode, string[]> = {
  en: [
    'battery kit with caster',
    'portable LiFePO4 battery enclosure',
    '15kWh battery kit',
    '16kWh battery kit',
    '51.2V battery enclosure',
  ],
  de: [
    'Batteriegehäuse mit Rollen',
    'LiFePO4 Batteriebausatz',
    '15 kWh Batteriegehäuse',
    '16 kWh Batteriegehäuse',
    '51,2 V Batteriespeicher Bausatz',
  ],
  fr: [
    'boîtier de batterie sur roulettes',
    'kit batterie LiFePO4',
    'boîtier batterie 15 kWh',
    'boîtier batterie 16 kWh',
    'kit stockage batterie 51,2 V',
  ],
}

const openGraphLocales: Record<LangCode, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
}

function isSupportedSeoLocale(lang: string): lang is LangCode {
  return lang === 'en' || lang === 'de' || lang === 'fr'
}

function truncateMetadataDescription(value: string, maxLength = 158) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized

  const truncated = normalized.slice(0, maxLength + 1)
  const lastSpace = truncated.lastIndexOf(' ')
  return `${truncated.slice(0, lastSpace > maxLength * 0.75 ? lastSpace : maxLength).trimEnd()}…`
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params
  const sourceProduct = getProductBySlug(PRODUCT_SLUG)
  if (!sourceProduct) return {}

  const localizedContent = getLocalizedProductPageContent(sourceProduct, lang)
  const product = localizedContent.product
  const noticeSentence = localizedContent.purchaseNotice?.metadataSentence
    ? ` ${localizedContent.purchaseNotice.metadataSentence}`
    : ''
  const shippingSentence = product.type === 'shop'
    ? localizedContent.shippingMetadataSentence
      ?? ' EU delivery addresses include free standard shipping; selected non-EU direct checkout destinations use a flat $150 shipping charge per order.'
    : ''
  const description = truncateMetadataDescription(
    `${product.tagline}.${noticeSentence}${shippingSentence} ${product.description}`
  )
  const indexableLocales = productIndexableSeoLocales(PRODUCT_SLUG)
  const resolvedLang: LangCode = isSupportedSeoLocale(lang) ? lang : 'en'
  const openGraphLocale = openGraphLocales[resolvedLang]
  const openGraphAlternateLocales = Object.entries(openGraphLocales)
    .filter(([, locale]) => locale !== openGraphLocale)
    .map(([, locale]) => locale)

  return buildPageMetadata({
    lang,
    path: PRODUCT_PATH,
    title: `${product.name} | ${product.categoryLabel} | JKESS`,
    description,
    keywords: [
      product.name,
      product.categoryLabel,
      'JKESS',
      'JKBMS',
      'LiFePO4',
      ...localizedKeywords[resolvedLang],
    ],
    image: product.images[0] ?? '/images/battery-kit-hero.webp',
    indexableLocales,
    alternateLocales: indexableLocales,
    openGraphLocale,
    openGraphAlternateLocales,
  })
}

export default async function BatteryKitPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params

  return DynamicProductPage({
    params: Promise.resolve({ lang, slug: PRODUCT_SLUG }),
  })
}
