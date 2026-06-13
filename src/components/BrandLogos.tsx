'use client'

import Image from 'next/image'

const brandLogos = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/brands-processed/brand-${i + 1}.png`,
}))

export default function BrandLogos() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="space-y-12">
        {/* Row 1: right to left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-scroll-left">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div
                key={`row1-${i}`}
                className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={`Partner ${(i % 15) + 1}`}
                    fill
                    className="object-contain"
                    sizes="144px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered title overlay between rows */}
        <div className="relative flex items-center justify-center py-6">
          <div className="text-center z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Plays well with
              <br />
              <span className="text-green-600">friends</span>
            </h2>
            <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
              Being this popular is uncommon. No matter your platform provider
              or site builder, we&#39;re sure we&#39;re connected.
            </p>
          </div>
        </div>

        {/* Row 2: left to right */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-scroll-right">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div
                key={`row2-${i}`}
                className="flex-shrink-0 w-28 h-14 md:w-36 md:h-16 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={`Partner ${(i % 15) + 1}`}
                    fill
                    className="object-contain"
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
