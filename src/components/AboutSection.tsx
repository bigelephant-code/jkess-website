'use client'

import Image from 'next/image'

interface AboutData {
  title?: string
  content?: string
  image?: string
}

export default function AboutSection({ data }: { data?: AboutData }) {
  return (
    <section id="about" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          {data?.image ? (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={data.image}
                alt="JKESS — Shenzhen Nengyi Electronic Technology"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="aspect-square bg-gradient-to-br from-green-900/20 to-black border border-white/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏭</div>
                <p className="text-gray-500 text-sm">Company Image</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {data?.title || 'About JKESS'}
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              {data?.content
                ? data.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                : (
                  <>
                    <p>
                      Shenzhen Nengyi Electronic Technology Co., Ltd. is a high-tech enterprise
                      deeply rooted in the new energy storage sector, covering product design,
                      R&D, system integration, intelligent manufacturing, and global sales.
                    </p>
                    <p>
                      With over a decade of technical expertise, we are committed to providing
                      safe, reliable, efficient, and clean energy storage solutions to customers
                      worldwide.
                    </p>
                    <p>
                      As of 2026, our products have been exported to more than 30 countries,
                      establishing long-term strategic partnerships with renowned enterprises
                      across the globe.
                    </p>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
