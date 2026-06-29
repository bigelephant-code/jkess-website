import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import { technicalGuides } from '@/lib/technical-guides'
import { localizedSeoPath } from '@/lib/seo'

export default function NewsOwnedInsights({ lang }: { lang: string }) {
  return (
    <section className="border-b border-gray-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">JKESS original technical guides</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Engineering guidance written for real battery and ESS selection decisions
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-600">
              These articles are written and published by JKESS. They explain system boundaries, compatibility checks,
              purchasing inputs, and commissioning questions using the same product architecture described on the site.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900 lg:max-w-sm">
            <p className="font-bold">External-source notice</p>
            <p className="mt-1">
              The market feed below links to third-party publishers. Their articles and claims are not published or endorsed by JKESS.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {technicalGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={localizedSeoPath(lang, `/guides/${guide.slug}`)}
              className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition hover:border-green-400 hover:shadow-sm sm:grid-cols-[180px_1fr]"
            >
              <div className="relative min-h-44 bg-gray-950">
                <Image src={guide.image} alt="" fill sizes="180px" className="object-cover opacity-80 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <BookOpen className="absolute bottom-4 left-4 text-green-300" size={22} />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-green-700">{guide.eyebrow}</p>
                <h3 className="mt-3 text-xl font-bold leading-7 text-gray-950">{guide.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                  Read JKESS guide <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3 border-t border-gray-200 pt-8 text-sm text-gray-500">
          <ExternalLink size={17} className="text-gray-400" />
          <p>The section below is a curated directory of external industry sources and opens publisher websites.</p>
        </div>
      </div>
    </section>
  )
}
