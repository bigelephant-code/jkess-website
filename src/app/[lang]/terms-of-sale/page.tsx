import PolicyPage from '@/components/PolicyPage'
import { buildPolicyMetadata } from '@/lib/policy-metadata'
import { getPolicy } from '@/lib/policies'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => buildPolicyMetadata(lang, 'terms-of-sale'))
}

export default async function TermsOfSalePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <PolicyPage lang={lang} policy={getPolicy('terms-of-sale')} />
}
