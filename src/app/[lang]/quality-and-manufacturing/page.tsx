import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, FileCheck2, PackageCheck, ShieldCheck, Wrench } from 'lucide-react'
import { defaultLocale } from '@/i18n/config'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { companyFacts, companyProfile } from '@/lib/company-profile'
import { jsonLd, organizationId } from '@/lib/structured-data'
import { localizedSeoPath } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const canonical = absoluteUrl('/quality-and-manufacturing')
  const indexable = lang === defaultLocale

  return {
    title: 'Quality, Manufacturing and Pre-Shipment Documentation | JKESS',
    description:
      'Review JKESS manufacturing facts, configuration control, incoming inspection, assembly checks, functional testing, packing verification, and the documents customers should confirm before shipment.',
    alternates: {
      canonical,
      languages: { en: canonical, 'x-default': canonical },
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: { index: indexable, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      title: 'JKESS Quality and Manufacturing',
      description: 'Manufacturing facts, inspection workflow, configuration control, and shipment documentation.',
      url: canonical,
      images: [absoluteUrl('/images/company-building.webp')],
    },
  }
}

const qualitySteps = [
  {
    icon: ClipboardCheck,
    title: 'Configuration review',
    text: 'The product model, selected option, voltage, current, communication, included hardware, destination, quantity, and project-specific requirements should be confirmed against the quotation or order record before production or packing.',
  },
  {
    icon: FileCheck2,
    title: 'Incoming material and component checks',
    text: 'Mechanical parts, control hardware, displays, harnesses, connectors, and other supplied components are checked against the applicable bill of materials and purchasing requirements before assembly.',
  },
  {
    icon: Wrench,
    title: 'Assembly and workmanship checks',
    text: 'Applicable checks include enclosure condition, fasteners, labels, cable routing, connector seating, insulation, grounding points, and the hardware included for the selected package.',
  },
  {
    icon: ShieldCheck,
    title: 'Functional verification',
    text: 'Testing depends on the supplied product. It can include power-up checks, display and communication checks, voltage or current measurement verification, input and output inspection, and confirmation of configured control hardware.',
  },
  {
    icon: PackageCheck,
    title: 'Packing and shipment verification',
    text: 'The final packing list, product quantity, accessories, protection materials, labels, gross weight, dimensions, and freight requirements are checked before dispatch documentation is issued.',
  },
]

const documentChecklist = [
  'Signed quotation or order confirmation defining the exact supply scope',
  'Model and option list, quantities, and applicable packing list',
  'Product datasheet, user manual, or wiring information where available',
  'Communication protocol or compatibility statement when included in the project scope',
  'Inspection, test, or configuration records when agreed for the order',
  'Warranty, shipping, return, safety, and installation responsibility documents',
  'Certificates or compliance documents only when applicable to the selected product and confirmed in writing',
]

function qualityJsonLd() {
  const url = absoluteUrl('/quality-and-manufacturing')
  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#page`,
        name: 'JKESS Quality and Manufacturing',
        description: 'Manufacturing facts, quality-control workflow, and pre-shipment documentation for JKESS products.',
        url,
        mainEntity: { '@id': organizationId },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Quality and Manufacturing', item: url },
        ],
      },
    ],
  })
}

export default async function QualityAndManufacturingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: qualityJsonLd() }} />
      <div className="min-h-screen bg-white text-gray-950">
        <header className="relative isolate overflow-hidden bg-gray-950 pt-24 text-white">
          <Image src="/images/company-building.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">Evidence before claims</p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">Quality, manufacturing, and shipment documentation</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
                This page explains the manufacturing facts currently published by JKESS, the checks that should be applied to configured products, and the documents buyers should confirm before payment and shipment.
              </p>
            </div>
          </div>
        </header>

        <main>
          <section className="border-b border-gray-200 bg-gray-50 py-12">
            <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-3 lg:grid-cols-5">
              {companyFacts.filter((fact) => ['Team Established', 'Factory Building Area', 'Full-time Employees', 'R&D Professionals', 'Current Annual Capacity'].includes(fact.label)).map((fact) => (
                <div key={fact.label} className="bg-white px-5 py-6">
                  <p className="text-2xl font-bold text-gray-950">{fact.value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-500">{fact.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Published company facts</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Manufacturing scale and organization</h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-gray-600">
                  {companyProfile.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
                  Product-level certification, test scope, factory acceptance testing, third-party inspection, and project documentation vary by model and order. Buyers should rely on the documents specifically identified in the signed quotation rather than assuming every certificate or service applies to every product.
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                <Image src="/images/company-building.webp" alt="JKESS manufacturing facility" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
          </section>

          <section className="bg-gray-950 py-20 text-white md:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">Quality workflow</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Checks should follow the actual product and supply scope</h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {qualitySteps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                      <Icon className="text-green-400" size={26} />
                      <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-gray-300">{step.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Factory className="text-green-600" size={30} />
                <h2 className="mt-5 text-3xl font-bold tracking-tight">Documents to confirm before shipment</h2>
                <p className="mt-4 text-base leading-8 text-gray-600">
                  The controlling document is the signed quotation or order confirmation. It should identify what the buyer receives, what remains outside the scope, and which technical or compliance documents will be supplied.
                </p>
              </div>
              <div className="space-y-3">
                {documentChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 bg-gray-50 py-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold">Request order-specific evidence</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">Send the product, option, quantity, destination, certification target, inspection requirement, and required documents so they can be confirmed in the quotation.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={localizedSeoPath(lang, '/contact')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 font-bold text-white">
                  Contact JKESS <ArrowRight size={16} />
                </Link>
                <Link href={localizedSeoPath(lang, '/downloads')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-950">
                  Technical downloads
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
