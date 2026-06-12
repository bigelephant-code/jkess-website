'use client'

import { ArrowRight } from 'lucide-react'
import TechLines from './TechLines'

interface HeroData {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({ data }: { data?: HeroData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated tech lines background */}
      <TechLines />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-transparent to-black z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          {data?.title || 'Powering a'}
          <br />
          <span className="text-green-400">Cleaner Future</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {data?.subtitle ||
            'Shenzhen Nengyi Electronic Technology — your trusted partner in energy storage solutions, from BMS to complete battery systems.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={data?.ctaLink || '#products'}
            className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold text-black overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 animate-shimmer bg-[length:200%_100%]" />
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-0 group-hover:opacity-100 animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {data?.ctaText || 'Explore Products'}
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full text-lg transition-all"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-green-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
