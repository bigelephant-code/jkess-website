import { notFound } from 'next/navigation'
import SpecificationLandingPage, { buildSpecificationMetadata } from '@/components/SpecificationLandingPage'
import { getSpecificationLandingPage } from '@/lib/specification-pages'

const currentOptions = ['100a', '200a'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return currentOptions.map((current) => ({ current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; current: string }>
}) {
  const { lang, current } = await params
  const page = getSpecificationLandingPage(`high-voltage-bms/${current}`)
  return page ? buildSpecificationMetadata(page, lang) : {}
}

export default async function HighVoltageBmsSpecificationPage({
  params,
}: {
  params: Promise<{ lang: string; current: string }>
}) {
  const { lang, current } = await params
  const page = getSpecificationLandingPage(`high-voltage-bms/${current}`)
  if (!page) notFound()

  return <SpecificationLandingPage page={page} lang={lang} />
}
