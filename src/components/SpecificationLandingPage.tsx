import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { NonBrandLandingPage } from '@/lib/non-brand-pages'
import { getProductBySlug } from '@/lib/products'
import {
  canonicalSeoPath,
  defaultIndexableSeoLocales,
  isSeoLocaleIndexable,
  localizedSeoPath,
  pageLanguageAlternates,
} from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'

function specificationKeywords(page: NonBrandLandingPage) {
  return Array.from(new Set([
    page.title,
    page.eyebrow,
    ...page.highlights.map((highlight) => highlight.value),
    ...page.products.map((product) => product.label),
    ...page.related.map((link) => link.label),
    ...page.faqs.slice(0, 2).map((faq) => faq.question),
  ])).slice(0, 14)
}

export function buildSpecificationMetadata(page: NonBrandLandingPage, lang: string): Metadata {
  const path = `/${page.path}`
  const canonical = absoluteUrl(canonicalSeoPath(lang, path, defaultIndexableSeoLocales))
  const indexable = isSeoLocaleIndexable(lang, defaultIndexableSeoLocales)

  return {
    title: `${page.title} | JKESS`,
    description: page.description,
    keywords: specificationKeywords(page),
    alternates: {
      canonical,
      languages: pageLanguageAlternates(path, defaultIndexableSeoLocales),
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
      type: 'website',
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

function specificationJsonLd(page: NonBrandLandingPage, lang: string) {
  const path = `/${page.path}`
  const url = absoluteUrl(canonicalSeoPath(lang, path))
  const pathParts = page.path.split('/')
  const parentPath = `/${pathParts.slice(0, -1).join('/')}`
  const parentUrl = absoluteUrl(canonicalSeoPath(lang, parentPath))

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
          url: absoluteUrl(canonicalSeoPath(lang, `/products/${product.slug}`)),
          brand: { '@type': 'Brand', name: 'JKESS' },
          manufacturer: { '@id': organizationId },
        },
      }
    })
    .filter(Boolean)
  const relatedPageItems = page.related.map((link, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'WebPage',
      name: link.label,
      description: link.description,
      url: absoluteUrl(canonicalSeoPath(lang, link.href)),
    },
  }))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: page.title,
        headline: page.title,
        description: page.description,
        url,
        image: absoluteUrl(page.image),
        inLanguage: lang,
        publisher: { '@id': organizationId },
        mainEntityOfPage: url,
        datePublished: '2026-06-28',
        dateModified: '2026-06-30',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: pathParts[0].replaceAll('-', ' '), item: parentUrl },
          { '@type': 'ListItem', position: 3, name: page.title, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Relevant products for ${page.title}`,
        itemListElement: productItems,
      },
      {
        '@type': 'ItemList',
        name: `Related specifications for ${page.title}`,
        itemListElement: relatedPageItems,
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

export default function SpecificationLandingPage({
  page,
  lang,
}: {
  page: NonBrandLandingPage
  lang: string
}) {
  const products = page.products
    .map((item) => ({ item, product: getProductBySlug(item.slug) }))
    .filter((entry) => entry.product)

  const quoteHref = localizedSeoPath(lang, '/shipping-quote')
  const downloadsHref = localizedSeoPath(lang, '/downloads')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: specificationJsonLd(page, lang) }}
      />

      <div className="min-h-screen bg-white text-gray-950">
        <header className="relative isolate overflow-hidden bg-black pt-24">
          <Image
            src={page.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/45" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
                {page.intro}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={quoteHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-green-400"
                >
                  Request configuration support <ArrowRight size={17} />
                </Link>
                <Link
                  href={downloadsHref}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  View technical downloads
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="border-b border-gray-100 bg-gray-50">
            <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 px-6 py-px sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
              {page.highlights.map((highlight) => (
                <div key={highlight.label} className="bg-white px-6 py-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {highlight.label}
                  </p>
                  <p className="mt-2 text-base font-bold text-gray-950">{highlight.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="space-y-16">
                {page.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-8 text-gray-600">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-6 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700"
                          >
                            <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={18} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </article>

              <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-950 p-6 text-white lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">
                  Quotation checklist
                </p>
                <h2 className="mt-3 text-2xl font-bold">Share the real project inputs</h2>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Include voltage, power, capacity, quantity, duty cycle, compatible equipment, destination,
                  site conditions, installation scope, and required certification or documentation.
                </p>
                <Link
                  href={quoteHref}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
                >
                  Start a technical inquiry <ArrowRight size={16} />
                </Link>
              </aside>
            </div>
          </section>

          <section className="bg-gray-950 py-20 text-white md:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                Relevant products
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
                Continue from the search specification to the actual product scope
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {products.map(({ item, product }) => {
                  if (!product) return null
                  return (
                    <Link
                      key={product.slug}
                      href={localizedSeoPath(lang, `/products/${product.slug}`)}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-green-400/50 hover:bg-white/[0.07]"
                    >
                      <div className="relative aspect-[16/8] overflow-hidden bg-black">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{item.label}</h3>
                        <p className="mt-3 text-sm leading-6 text-gray-300">{item.description}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400">
                          View product details <ArrowRight size={15} />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                  Frequently asked questions
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Specification questions</h2>
              </div>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-8 text-base font-bold text-gray-950">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold text-gray-950">Compare related specifications</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {page.related.map((link) => (
                  <Link
                    key={link.href}
                    href={localizedSeoPath(lang, link.href)}
                    className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-green-400 hover:shadow-sm"
                  >
                    <h3 className="flex items-center justify-between gap-4 text-lg font-bold text-gray-950">
                      {link.label}
                      <ArrowRight className="shrink-0 text-green-600 transition group-hover:translate-x-1" size={18} />
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
