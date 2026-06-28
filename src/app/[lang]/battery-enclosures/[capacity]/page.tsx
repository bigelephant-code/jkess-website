import { notFound } from 'next/navigation'
import SpecificationLandingPage, { buildSpecificationMetadata } from '@/components/SpecificationLandingPage'
import { getSpecificationLandingPage } from '@/lib/specification-pages'

const capacities = ['15kwh-lifepo4', '16kwh-lifepo4'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return capacities.map((capacity) => ({ capacity }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; capacity: string }>
}) {
  const { lang, capacity } = await params
  const page = getSpecificationLandingPage(`battery-enclosures/${capacity}`)
  return page ? buildSpecificationMetadata(page, lang) : {}
}

export default async function BatteryEnclosureSpecificationPage({
  params,
}: {
  params: Promise<{ lang: string; capacity: string }>
}) {
  const { lang, capacity } = await params
  const page = getSpecificationLandingPage(`battery-enclosures/${capacity}`)
  if (!page) notFound()

  return <SpecificationLandingPage page={page} lang={lang} />
}
