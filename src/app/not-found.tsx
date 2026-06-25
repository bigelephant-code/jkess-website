import Link from 'next/link'
import { ArrowRight, Home, Mail, PackageSearch } from 'lucide-react'

const recoveryLinks = [
  {
    href: '/',
    label: 'Home',
    description: 'Return to the JKESS homepage.',
    icon: Home,
  },
  {
    href: '/products',
    label: 'Products',
    description: 'Browse battery kits, BMS, and ESS cabinet solutions.',
    icon: PackageSearch,
  },
  {
    href: '/contact',
    label: 'Contact',
    description: 'Send a project inquiry to the JKESS team.',
    icon: Mail,
  },
]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black pt-28 text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-400">404</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          This page is not available
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400">
          The link may have changed, but the main JKESS product catalog and inquiry channels are still ready.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {recoveryLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-green-400/60 hover:bg-green-400/10"
              >
                <Icon size={22} className="text-green-400" />
                <h2 className="mt-5 text-lg font-semibold">{item.label}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-400">
                  Open
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
