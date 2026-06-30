import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, FileCheck2, ShieldCheck, Truck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/site'
import { localizedPath } from '@/lib/lang'
import type { LangCode } from '@/i18n/config'

const pageTitle = 'EU Compliance and Project Documentation'
const pageDescription =
  'Review how JKESS handles EU project documentation, product-specific certification checks, transport paperwork, safety information, warranty terms, and quote-stage compliance review.'

const documentationBlocks = [
  {
    icon: FileCheck2,
    title: 'Product-specific documentation',
    body: 'Datasheets, user manuals, wiring information, packing lists, and configuration notes are confirmed by product model and order scope. Buyers should rely on the documents named in the quotation, invoice, or order confirmation.',
  },
  {
    icon: ShieldCheck,
    title: 'Certification scope review',
    body: 'CE, UN38.3, IEC, EMC, transport, grid-interface, and other documentation requirements vary by product, configuration, destination, and final supply scope. JKESS can review available documents before order confirmation.',
  },
  {
    icon: Truck,
    title: 'EU delivery and import notes',
    body: 'EU delivery addresses currently receive free standard shipping at checkout for eligible direct-checkout products. Import duty, VAT, customs clearance, destination compliance, and local installation requirements remain destination dependent unless stated in writing.',
  },
]

const checklist = [
  'Product model, selected option, quantity, and destination country',
  'Required certificate, declaration, test report, or transport document',
  'Intended application, installation environment, grid or inverter interface, and battery configuration',
  'Whether the order is standard, customized, configured, project-based, or quote-only',
  'Any customer, installer, distributor, or authority documentation format requirements',
]

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/eu-compliance',
      title: `${pageTitle} | JKESS`,
      description: pageDescription,
      keywords: [
        'JKESS EU compliance',
        'battery storage certification',
        'LiFePO4 battery documentation',
        'UN38.3 battery shipping',
        'CE energy storage documentation',
      ],
      image: '/images/company-building.webp',
    })
  )
}

function complianceJsonLd() {
  const url = absoluteUrl('/eu-compliance')

  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: pageTitle,
        headline: pageTitle,
        description: pageDescription,
        url,
        inLanguage: 'en',
        publisher: { '@id': organizationId },
        mainEntityOfPage: url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does every JKESS product have the same EU documentation package?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Documentation varies by product model, configuration, order scope, destination, and the documents specifically listed in the quotation or order confirmation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can JKESS review documentation before an EU order is placed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Customers can request a pre-order documentation review by sharing the target product, destination country, application, and required certificate or report type.',
            },
          },
        ],
      },
    ],
  })
}

export default async function EuCompliancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const quoteHref = localizedPath(lang as LangCode, '/shipping-quote')
  const downloadsHref = localizedPath(lang as LangCode, '/downloads')
  const contactHref = localizedPath(lang as LangCode, '/contact')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: complianceJsonLd() }}
      />
      <div className="min-h-screen bg-white text-gray-950">
        <header className="bg-black pt-28 text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">
              EU buyer support
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Use this page to understand how JKESS handles documentation checks for European projects before a standard order, configured supply, or project quotation is confirmed.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={quoteHref} className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-green-400">
                Request documentation review
              </Link>
              <Link href={downloadsHref} className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                View downloads
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-3 md:py-24">
            {documentationBlocks.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <Icon className="text-green-600" size={28} />
                <h2 className="mt-5 text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">{body}</p>
              </article>
            ))}
          </section>

          <section className="border-y border-gray-100 bg-gray-50 py-16 md:py-20">
            <div className="mx-auto max-w-4xl px-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                Before confirming an EU order
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Share the compliance inputs with the project inquiry
              </h2>
              <div className="mt-8 grid gap-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={18} />
                    <p className="text-sm leading-6 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="rounded-3xl bg-gray-950 p-8 text-white md:p-10">
              <h2 className="text-3xl font-bold">Need a written confirmation?</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">
                Send the product model, destination country, intended application, and requested document type. JKESS can confirm which documents are available for the specific order scope before payment or production begins.
              </p>
              <Link href={contactHref} className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-gray-100">
                Contact JKESS
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
