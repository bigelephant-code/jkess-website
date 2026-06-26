import PolicyPage from '@/components/PolicyPage'
import { buildPolicyMetadata } from '@/lib/policy-metadata'
import { getPolicy } from '@/lib/policies'

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => buildPolicyMetadata(lang, 'safety'))
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <PolicyPage lang={lang} policy={getPolicy('safety')} />
}
