'use client'

import Image from 'next/image'

const brandLogos = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/brands/brand-${i + 1}.jpg`,
}))

export default function BrandLogos() {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Section header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Trusted Partners
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Industry Matches{' '}
            <span className="text-green-600">We Support</span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            JKESS energy storage solutions are trusted across industries —
            from solar installers to EV infrastructure providers.
          </p>
        </div>
      </div>

      {/* Scrolling logo rows */}
      <div className="space-y-8">
        {/* Row 1: right to left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-scroll-left">
            {/* Two identical sets for seamless loop */}
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div
                key={`row1-${i}`}
                className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center group"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={`Partner ${(i % 15) + 1}`}
                    fill
                    className="object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110"
                    sizes="144px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: left to right */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-scroll-right">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div
                key={`row2-${i}`}
                className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center group"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={`Partner ${(i % 15) + 1}`}
                    fill
                    className="object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110"
                    sizes="144px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
