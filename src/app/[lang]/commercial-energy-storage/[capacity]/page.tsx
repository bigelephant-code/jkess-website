import { notFound } from 'next/navigation'
import SpecificationLandingPage, { buildSpecificationMetadata } from '@/components/SpecificationLandingPage'
import { getSpecificationLandingPage } from '@/lib/specification-pages'

const capacities = ['215kwh', '261kwh'] as const

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
  const page = getSpecificationLandingPage(`commercial-energy-storage/${capacity}`)
  return page ? buildSpecificationMetadata(page, lang) : {}
}

export default async function CommercialEssSpecificationPage({
  params,
}: {
  params: Promise<{ lang: string; capacity: string }>
}) {
  const { lang, capacity } = await params
  const page = getSpecificationLandingPage(`commercial-energy-storage/${capacity}`)
  if (!page) notFound()

  return <SpecificationLandingPage page={page} lang={lang} />
}
