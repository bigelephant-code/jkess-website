import { notFound } from 'next/navigation'
import SpecSeoLandingPage from '@/components/SpecSeoLandingPage'
import { defaultLocale } from '@/i18n/config'
import { buildSpecSeoMetadata } from '@/lib/spec-seo-utils'
import { getSpecSeoPage, specSeoPagesByPrefix } from '@/lib/spec-seo-pages'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return specSeoPagesByPrefix('high-voltage-bms').map((page) => ({
    lang: defaultLocale,
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params
  const page = getSpecSeoPage(`high-voltage-bms/${slug}`)
  if (!page) return {}
  return buildSpecSeoMetadata(page, lang)
}

export default async function HighVoltageBmsSpecPage({ params }: PageProps) {
  const { lang, slug } = await params
  const page = getSpecSeoPage(`high-voltage-bms/${slug}`)
  if (!page) notFound()

  return <SpecSeoLandingPage page={page} lang={lang} />
}
