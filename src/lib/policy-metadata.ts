import { buildPageMetadata } from '@/lib/seo'
import { getPolicy, type PolicySlug } from '@/lib/policies'

export function buildPolicyMetadata(lang: string, slug: PolicySlug) {
  const policy = getPolicy(slug)
  return buildPageMetadata({
    lang,
    path: `/${slug}`,
    title: `${policy.title} | JKESS`,
    description: policy.summary,
    keywords: [
      `JKESS ${policy.title}`,
      'JKESS policy',
      'JKBMS policy',
      'energy storage terms',
    ],
    image: '/images/jkess-logo.png',
  })
}
