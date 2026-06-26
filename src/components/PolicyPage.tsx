import Link from 'next/link'
import { localizedPath } from '@/lib/lang'
import { policyLastUpdated, policyNavigation, type PolicyPage as PolicyPageData } from '@/lib/policies'

export default function PolicyPage({ policy, lang }: { policy: PolicyPageData; lang: string }) {
  return (
    <div className="min-h-screen bg-black pt-28 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
              JKESS Policies
            </p>
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {policyNavigation.map((item) => {
                const active = item.slug === policy.slug
                return (
                  <Link
                    key={item.slug}
                    href={localizedPath(lang, `/${item.slug}`)}
                    className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm transition-colors ${
                      active
                        ? 'border-green-400/60 bg-green-400/10 text-green-300'
                        : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </aside>

          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30">
            <header className="border-b border-white/10 bg-gradient-to-br from-green-400/10 to-transparent px-6 py-10 sm:px-10">
              <p className="text-sm font-medium text-green-400">Effective {policyLastUpdated}</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{policy.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300">{policy.summary}</p>
            </header>

            <div className="space-y-10 px-6 py-10 sm:px-10">
              {policy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-300 sm:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-5 text-sm leading-6 text-gray-300">
                Questions about this policy or an order should be sent to{' '}
                <a className="font-medium text-green-400 hover:text-green-300" href="mailto:zhou@jkess.com">
                  zhou@jkess.com
                </a>
                .
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
