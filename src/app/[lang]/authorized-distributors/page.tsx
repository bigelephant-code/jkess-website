import type { LangCode } from '@/i18n/config'
import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Building2, CircleCheck, Globe2, ShieldCheck } from 'lucide-react'
import { localizedPath } from '@/lib/lang'
import {
  authorizedDistributorIndexableSeoLocales,
  buildPageMetadata,
  localizedSeoPath,
} from '@/lib/seo'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { jsonLd, organizationId, websiteId } from '@/lib/structured-data'

const directoryCopy = {
  en: {
    eyebrow: 'Official JKESS distributor directory',
    title: 'Authorized JKESS distributors',
    intro:
      'Use this directory to verify independent distributors that JKESS has authorized to market and sell JKESS products in a defined region.',
    officialSite: 'Official global brand website',
    region: 'Germany',
    status: 'Authorized independent JKESS distributor',
    relationship:
      'jkess.de is an independently operated distributor website authorized by JKESS for customers in Germany. It is not the global manufacturer website.',
    visit: 'Visit the authorized distributor',
    verifyTitle: 'Verify the seller before you buy',
    verifyBody:
      'Check that the website and region match this directory. Orders placed with an independent distributor are governed by that seller’s order, delivery, return, and warranty terms unless a written agreement says otherwise.',
    officialTitle: 'Need confirmation from JKESS?',
    officialBody:
      'For manufacturer information, product documentation, global project inquiries, or distributor-status questions, contact JKESS through the official website.',
    contact: 'Contact JKESS',
    updated: 'Authorization status confirmed by JKESS on July 29, 2026.',
    metadataTitle: 'Authorized JKESS Distributors | Official Dealer Directory',
    metadataDescription:
      'Verify authorized JKESS distributors. jkess.de is an independent authorized distributor for Germany; jkesstech.com is the official global site.',
  },
  de: {
    eyebrow: 'Offizielles JKESS Händlerverzeichnis',
    title: 'Autorisierte JKESS Vertriebspartner',
    intro:
      'In diesem Verzeichnis können Sie unabhängige Vertriebspartner prüfen, die von JKESS für die Vermarktung und den Verkauf von JKESS Produkten in einer bestimmten Region autorisiert wurden.',
    officialSite: 'Offizielle globale Markenwebsite',
    region: 'Deutschland',
    status: 'Autorisierter unabhängiger JKESS Vertriebspartner',
    relationship:
      'jkess.de ist eine unabhängig betriebene Vertriebswebsite, die von JKESS für Kunden in Deutschland autorisiert wurde. Sie ist nicht die globale Herstellerwebsite.',
    visit: 'Autorisierten Vertriebspartner besuchen',
    verifyTitle: 'Verkäufer vor dem Kauf prüfen',
    verifyBody:
      'Prüfen Sie, ob Website und Region mit diesem Verzeichnis übereinstimmen. Für Bestellungen bei einem unabhängigen Vertriebspartner gelten dessen Bestell-, Liefer-, Rückgabe- und Garantiebedingungen, sofern nichts anderes schriftlich vereinbart wurde.',
    officialTitle: 'Bestätigung direkt von JKESS benötigt?',
    officialBody:
      'Für Herstellerinformationen, Produktunterlagen, globale Projektanfragen oder Fragen zum Händlerstatus kontaktieren Sie JKESS über die offizielle Website.',
    contact: 'JKESS kontaktieren',
    updated: 'Der Autorisierungsstatus wurde von JKESS am 29. Juli 2026 bestätigt.',
    metadataTitle: 'Autorisierte JKESS Händler | Offizielles Verzeichnis',
    metadataDescription:
      'Autorisierte JKESS Vertriebspartner prüfen. jkess.de ist als unabhängiger autorisierter Vertriebspartner für Deutschland gelistet; jkesstech.com ist die offizielle globale JKESS Markenwebsite.',
  },
} as const

function getCopy(lang: string) {
  return lang === 'de' ? directoryCopy.de : directoryCopy.en
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => {
    const copy = getCopy(lang)

    return buildPageMetadata({
      lang,
      path: '/authorized-distributors',
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      keywords: [
        'authorized JKESS distributor',
        'official JKESS dealer',
        'JKESS Germany',
        'jkess.de',
        'JKESS official website',
      ],
      image: '/images/company-building.webp',
      indexableLocales: authorizedDistributorIndexableSeoLocales,
      alternateLocales: authorizedDistributorIndexableSeoLocales,
    })
  })
}

function distributorJsonLd(lang: string) {
  const copy = getCopy(lang)
  const pageUrl = absoluteUrl(localizedSeoPath(lang, '/authorized-distributors'))

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        name: copy.metadataTitle,
        description: copy.metadataDescription,
        url: pageUrl,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        publisher: { '@id': organizationId },
        mainEntity: {
          '@type': 'ItemList',
          name: copy.title,
          numberOfItems: 1,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'Organization',
                name: 'jkess.de',
                url: 'https://jkess.de/',
                description: copy.relationship,
                areaServed: {
                  '@type': 'Country',
                  name: copy.region,
                },
              },
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'JKESS', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: copy.title, item: pageUrl },
        ],
      },
    ],
  })
}

export default async function AuthorizedDistributorsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const copy = getCopy(lang)
  const contactHref = localizedPath(lang as LangCode, '/contact')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: distributorJsonLd(lang) }}
      />

      <div className="min-h-screen bg-[#f6f8f6] text-gray-950">
        <section className="relative overflow-hidden bg-black px-6 pb-24 pt-28 text-white md:pb-32 md:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(34,197,94,0.2),transparent_36%)]" />
          <div className="relative mx-auto max-w-6xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              <BadgeCheck size={17} />
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              {copy.intro}
            </p>
            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              <Globe2 size={17} className="text-green-400" />
              <span>{copy.officialSite}:</span>
              <strong className="text-white">www.jkesstech.com</strong>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <article className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-px bg-gray-200 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-gray-950 p-8 text-white md:p-10">
                <div className="flex h-12 w-12 items-center justify-center bg-green-400 text-gray-950">
                  <Building2 size={24} />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-green-400">
                  {copy.region}
                </p>
                <h2 className="mt-3 text-4xl font-bold">jkess.de</h2>
                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-gray-300">
                  <CircleCheck size={18} className="mt-0.5 shrink-0 text-green-400" />
                  {copy.status}
                </p>
              </div>

              <div className="bg-white p-8 md:p-10">
                <p className="max-w-2xl text-base leading-8 text-gray-600">
                  {copy.relationship}
                </p>
                <a
                  href="https://jkess.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-green-400"
                >
                  {copy.visit}
                  <ArrowUpRight size={17} />
                </a>
                <p className="mt-5 text-xs leading-5 text-gray-500">{copy.updated}</p>
              </div>
            </div>
          </article>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="border border-gray-200 bg-white p-7 md:p-8">
              <ShieldCheck size={24} className="text-green-600" />
              <h2 className="mt-5 text-2xl font-bold">{copy.verifyTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{copy.verifyBody}</p>
            </section>

            <section className="border border-gray-200 bg-white p-7 md:p-8">
              <Globe2 size={24} className="text-green-600" />
              <h2 className="mt-5 text-2xl font-bold">{copy.officialTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{copy.officialBody}</p>
              <Link
                href={contactHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-600"
              >
                {copy.contact}
                <ArrowUpRight size={16} />
              </Link>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
