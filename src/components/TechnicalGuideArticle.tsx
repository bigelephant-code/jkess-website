import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { defaultLocale } from '@/i18n/config'
import { getProductBySlug } from '@/lib/products'
import type { TechnicalGuide } from '@/lib/technical-guides'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { localizedSeoPath } from '@/lib/seo'

export function buildTechnicalGuideMetadata(guide: TechnicalGuide, lang: string): Metadata {
  const canonical = absoluteUrl(`/guides/${guide.slug}`)
  const indexable = lang === defaultLocale

  return {
    title: `${guide.title} | JKESS Technical Guide`,
    description: guide.description,
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
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: canonical,
      images: [
        {
          url: absoluteUrl(guide.image),
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [absoluteUrl(guide.image)],
    },
  }
}

function guideJsonLd(guide: TechnicalGuide) {
  const url = absoluteUrl(`/guides/${guide.slug}`)
  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: guide.title,
        name: guide.title,
        description: guide.description,
        image: absoluteUrl(guide.image),
        url,
        mainEntityOfPage: url,
        inLanguage: 'en',
        datePublished: '2026-06-29',
        dateModified: '2026-06-29',
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Technical Guides', item: absoluteUrl('/news') },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
    ],
  })
}

export default function TechnicalGuideArticle({
  guide,
  lang,
}: {
  guide: TechnicalGuide
  lang: string
}) {
  const products = guide.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: guideJsonLd(guide) }}
      />
      <div className="min-h-screen bg-white text-gray-950">
        <header className="relative isolate overflow-hidden bg-black pt-24">
          <Image src={guide.image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/45" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">{guide.eyebrow}</p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">{guide.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">{guide.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <span>Published June 29, 2026</span>
                <span>•</span>
                <span>JKESS technical editorial</span>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="space-y-16">
                {guide.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>
                    <div className="mt-5 space-y-4 text-base leading-8 text-gray-600">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {section.bullets && (
                      <ul className="mt-6 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700">
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
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">Key takeaways</p>
                <div className="mt-5 space-y-4">
                  {guide.takeaways.map((takeaway) => (
                    <div key={takeaway} className="flex items-start gap-3 text-sm leading-6 text-gray-300">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-green-400" size={17} />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
                <Link href={localizedSeoPath(lang, '/contact')} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-gray-100">
                  Request technical review <ArrowRight size={16} />
                </Link>
              </aside>
            </div>
          </section>

          <section className="bg-gray-950 py-20 text-white">
            <div className="mx-auto max-w-7xl px-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">Related products</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {products.map((product) => product && (
                  <Link key={product.slug} href={localizedSeoPath(lang, `/products/${product.slug}`)} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-green-400/50 hover:bg-white/[0.07]">
                    <p className="text-xs font-bold uppercase tracking-widest text-green-400">{product.categoryLabel}</p>
                    <h2 className="mt-3 text-xl font-bold">{product.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-300">{product.tagline}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400">View product <ArrowRight size={15} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold">Continue reading</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {guide.relatedLinks.map((item) => (
                  <Link key={item.href} href={localizedSeoPath(lang, item.href)} className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 font-bold transition hover:border-green-400">
                    <span>{item.label}</span>
                    <ArrowRight className="shrink-0 text-green-600 transition group-hover:translate-x-1" size={17} />
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
