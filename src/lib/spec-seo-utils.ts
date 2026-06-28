import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { getProductBySlug } from '@/lib/products'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'
import type { SpecSeoPage } from '@/lib/spec-seo-pages'

export function buildSpecSeoMetadata(page: SpecSeoPage, lang: string): Metadata {
  const canonical = absoluteUrl(`/${page.path}`)
  const indexable = lang === defaultLocale

  return {
    title: `${page.title} | JKESS`,
    description: page.description,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: page.kind === 'guide' ? 'article' : 'website',
      title: page.title,
      description: page.description,
      url: canonical,
      images: [
        {
          url: absoluteUrl(page.image),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [absoluteUrl(page.image)],
    },
  }
}

export function specSeoJsonLd(page: SpecSeoPage) {
  const url = absoluteUrl(`/${page.path}`)
  const primaryType = page.kind === 'guide' ? 'TechArticle' : page.kind === 'comparison' ? 'Article' : 'WebPage'
  const primaryEntity: Record<string, unknown> = {
    '@type': primaryType,
    '@id': `${url}#page`,
    name: page.title,
    headline: page.title,
    description: page.description,
    url,
    image: absoluteUrl(page.image),
    inLanguage: 'en',
    publisher: { '@id': organizationId },
    mainEntityOfPage: url,
    datePublished: '2026-06-28',
    dateModified: '2026-06-28',
  }

  if (page.kind === 'guide' || page.kind === 'comparison') {
    primaryEntity.author = { '@id': organizationId }
  }

  const productItems = page.products
    .map((item, index) => {
      const product = getProductBySlug(item.slug)
      if (!product) return null

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: item.description,
          image: product.images[0] ? absoluteUrl(product.images[0]) : undefined,
          url: absoluteUrl(`/products/${product.slug}`),
          brand: { '@type': 'Brand', name: 'JKESS' },
          manufacturer: { '@id': organizationId },
        },
      }
    })
    .filter(Boolean)

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      primaryEntity,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: page.title, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Relevant JKESS products for ${page.title}`,
        itemListElement: productItems,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  })
}
