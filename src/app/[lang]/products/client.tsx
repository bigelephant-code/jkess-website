'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { StaggerReveal, StaggerItem } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import PageFaqSection from '@/components/PageFaqSection'
import { pageFaqs } from '@/lib/page-faqs'
import type { PageFaq } from '@/lib/page-faqs'

const categoryLabels: Record<string, string> = {
  bms: 'BMS Protection Board',
  'battery-kit': 'Battery Kit',
  'high-voltage-kit': 'High Voltage Kit',
  'commercial-ess': 'C&I ESS Cabinet',
}

const localizedCategoryLabels: Partial<Record<string, Record<string, string>>> = {
  de: {
    bms: 'BMS-Schutzplatine',
    'battery-kit': 'Batteriebausatz',
    'high-voltage-kit': 'Hochspannungs-Bausatz',
    'commercial-ess': 'C&I-ESS-Schrank',
  },
  fr: {
    bms: 'Carte de protection BMS',
    'battery-kit': 'Kit de batterie',
    'high-voltage-kit': 'Kit haute tension',
    'commercial-ess': 'Armoire ESS C&I',
  },
}

const localizedProductFaqs: Partial<Record<string, PageFaq[]>> = {
  de: [
    {
      question: 'Wie wähle ich das passende JKESS-Produkt?',
      answer:
        'Wählen Sie Niederspannungs-Batteriegehäuse-Bausätze für Wohn- und Rackprojekte, Hochspannungs-BMS-Bausätze für die Steuerung von Batterieracks und konfigurierte C&I-ESS-Schränke für größere gewerbliche Speicherprojekte.',
    },
    {
      question: 'Kann JKESS die Kompatibilität mit Wechselrichter oder PCS prüfen?',
      answer:
        'Ja. Teilen Sie uns das Modell Ihres Wechselrichters, PCS oder EMS sowie Spannung, Kapazität und Kommunikationsanforderungen mit, damit JKESS die Kompatibilität prüfen kann.',
    },
    {
      question: 'Welche Produkte können direkt bestellt werden?',
      answer:
        'Die Hardwareoptionen Battery Kit, 6U Battery Kit und High Voltage Kit können direkt ausgewählt werden. Der C&I-ESS-Schrank wird entsprechend der endgültigen Projektkonfiguration angeboten.',
    },
  ],
  fr: [
    {
      question: 'Comment choisir le produit JKESS adapté ?',
      answer:
        'Choisissez les kits de boîtier de batterie basse tension pour les projets résidentiels et en rack, les kits BMS haute tension pour la commande des racks de batteries, et les armoires ESS C&I configurées pour les projets de stockage commerciaux de plus grande capacité.',
    },
    {
      question: 'JKESS peut-il confirmer la compatibilité avec un onduleur ou un PCS ?',
      answer:
        'Oui. Communiquez le modèle de votre onduleur, PCS ou EMS ainsi que les exigences de tension, de capacité et de communication afin que JKESS puisse vérifier la compatibilité.',
    },
    {
      question: 'Quels produits peuvent être commandés directement ?',
      answer:
        'Les options matérielles Battery Kit, 6U Battery Kit et High Voltage Kit peuvent être sélectionnées directement, tandis que l’armoire ESS C&I fait l’objet d’un devis selon la configuration finale du projet.',
    },
  ],
}

const technicalSearchPages = [
  {
    href: '/battery-enclosures',
    title: 'LiFePO4 battery enclosures',
    text: 'Compare 51.2V enclosure formats, included scope, cell fit, and inverter communication requirements.',
  },
  {
    href: '/battery-enclosures/15kwh-lifepo4',
    title: '15kWh battery enclosure',
    text: 'Review the 15kWh-class floor-standing enclosure, cell inputs, package scope, and installation questions.',
  },
  {
    href: '/battery-enclosures/16kwh-lifepo4',
    title: '16kWh battery enclosure',
    text: 'Compare the higher-capacity assembly class, usable-energy limits, movement, and cell compatibility.',
  },
  {
    href: '/rack-battery-enclosures',
    title: '6U rack battery enclosures',
    text: 'Plan 19-inch rack depth, airflow, service clearance, module expansion, and communication.',
  },
  {
    href: '/high-voltage-bms/100a',
    title: '100A high-voltage BMS',
    text: 'Review the moderate-current BCU and BMU option and the system information required before selection.',
  },
  {
    href: '/high-voltage-bms/200a',
    title: '200A high-voltage BMS',
    text: 'Review higher-current control hardware, conductor and protection requirements, and supply boundaries.',
  },
  {
    href: '/commercial-energy-storage/215kwh',
    title: '215kWh C&I ESS cabinet',
    text: 'Evaluate a 215.04kWh configuration for peak shaving, solar self-consumption, and selected backup loads.',
  },
  {
    href: '/commercial-energy-storage/261kwh',
    title: '261kWh C&I ESS cabinet',
    text: 'Review the larger cabinet energy class, logistics, cooling, duty cycle, and multi-cabinet planning.',
  },
]

export function ProductsPageClient({ products }: { products: Product[] }) {
  const { lang, t } = useI18n()
  const pageTitle = t('productsSection.title', 'Our Products')
  const pageDescription = t(
    'productsSection.desc',
    'Comprehensive energy storage solutions engineered for reliability and performance'
  )
  const viewDetails = t('productsSection.viewDetails', 'View Details')
  const productFaqs = localizedProductFaqs[lang] ?? pageFaqs.products
  const categoryLabelsForLanguage = localizedCategoryLabels[lang] ?? categoryLabels

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-0 left-0 right-0 h-[84px] bg-black z-0" />
      <header className="relative pt-32 pb-10 z-10" aria-labelledby="products-page-title">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">JKESS</p>
          <h1 id="products-page-title" className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            {pageDescription}
          </p>
        </div>
      </header>
      <section className="pb-16" aria-labelledby="products-page-title">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerReveal staggerDelay={0.12}>
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={localizedPath(lang, `/products/${product.slug}`)}
                    aria-label={`${viewDetails}: ${product.name}`}
                    className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 767px) calc(100vw - 3rem), 46vw"
                          quality={72}
                          priority={index === 0}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-lg font-semibold text-gray-400">
                          JKESS
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {categoryLabelsForLanguage[product.category] || product.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span aria-hidden="true" className="mt-1 text-xs text-green-500">•</span>
                            <span className="text-xs text-gray-600">{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        {viewDetails} <ArrowRight aria-hidden="true" size={16} />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {lang === 'en' && (
        <section className="border-y border-gray-200 bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Search by technical requirement
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              Compare capacity, current, enclosure format, and application before choosing a product
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
              These pages explain what each specification means, what is included, what must be confirmed,
              and which project information is needed for a reliable quotation.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {technicalSearchPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-green-400 hover:bg-green-50"
                >
                  <h3 className="flex items-start justify-between gap-4 text-base font-bold text-gray-950">
                    {page.title}
                    <ArrowRight aria-hidden="true" className="mt-0.5 shrink-0 text-green-600 transition group-hover:translate-x-1" size={17} />
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{page.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="defer-render">
        <PageFaqSection
          faqs={productFaqs}
          title={t('product.faqTitle', 'Frequently Asked Questions')}
          description={pageDescription}
        />
      </div>
      <div className="defer-render pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-base md:text-lg font-light italic tracking-wide">
            {pageDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
