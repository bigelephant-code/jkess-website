'use client'

import Image from 'next/image'

const leftLogos = [
  { src: '/images/brands-processed/brand-1.png' },
  { src: '/images/brands-processed/brand-2.png' },
  { src: '/images/brands-processed/brand-3.png' },
  { src: '/images/brands-processed/brand-4.png' },
  { src: '/images/brands-processed/brand-5.png' },
  { src: '/images/brands-processed/brand-6.png' },
]

const rightLogos = [
  { src: '/images/brands-processed/brand-7.png' },
  { src: '/images/brands-processed/brand-8.png' },
  { src: '/images/brands-processed/brand-9.png' },
  { src: '/images/brands-processed/brand-10.png' },
  { src: '/images/brands-processed/brand-11.png' },
  { src: '/images/brands-processed/brand-12.png' },
  { src: '/images/brands-processed/brand-13.png' },
  { src: '/images/brands-processed/brand-14.png' },
  { src: '/images/brands-processed/brand-15.png' },
]

export default function BrandLogos() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Plays well with
            <br />
            <span className="text-green-600">friends</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Being this popular is uncommon. No matter your industry or platform, we&apos;re sure we&apos;re connected.
          </p>
        </div>

        {/* Logos split left and right of center */}
        <div className="flex items-center justify-between gap-8">
          {/* Left column */}
          <div className="flex-1">
            <div className="flex flex-wrap justify-end gap-x-8 gap-y-6 items-center">
              {leftLogos.map((logo, i) => (
                <div
                  key={`left-${i}`}
                  className="group relative w-24 h-12 flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={`Partner ${i + 1}`}
                    fill
                    className="object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110 opacity-60 hover:opacity-100"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Center title (invisible spacer to keep alignment) */}
          <div className="w-64 hidden md:block" />

          {/* Right column */}
          <div className="flex-1">
            <div className="flex flex-wrap justify-start gap-x-8 gap-y-6 items-center">
              {rightLogos.map((logo, i) => (
                <div
                  key={`right-${i}`}
                  className="group relative w-24 h-12 flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={`Partner ${i + 7}`}
                    fill
                    className="object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110 opacity-60 hover:opacity-100"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
