import { notFound } from 'next/navigation'
import TechnicalGuideArticle, { buildTechnicalGuideMetadata } from '@/components/TechnicalGuideArticle'
import { getTechnicalGuide } from '@/lib/technical-guides'

const guide = getTechnicalGuide('bcu-vs-bmu')

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => guide ? buildTechnicalGuideMetadata(guide, lang) : {})
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!guide) notFound()
  return <TechnicalGuideArticle guide={guide} lang={lang} />
}
