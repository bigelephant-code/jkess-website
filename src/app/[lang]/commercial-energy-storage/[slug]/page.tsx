import { notFound } from 'next/navigation'
import SpecSeoLandingPage from '@/components/SpecSeoLandingPage'
import { locales } from '@/i18n/config'
import { buildSpecSeoMetadata } from '@/lib/spec-seo-utils'
import { getSpecSeoPage, specSeoPagesByPrefix } from '@/lib/spec-seo-pages'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    specSeoPagesByPrefix('commercial-energy-storage').map((page) => ({
      lang: locale.code,
      slug: page.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params
  const page = getSpecSeoPage(`commercial-energy-storage/${slug}`)
  if (!page) return {}
  return buildSpecSeoMetadata(page, lang)
}

export default async function CommercialEnergyStorageSpecPage({ params }: PageProps) {
  const { lang, slug } = await params
  const page = getSpecSeoPage(`commercial-energy-storage/${slug}`)
  if (!page) notFound()

  return <SpecSeoLandingPage page={page} lang={lang} />
}
