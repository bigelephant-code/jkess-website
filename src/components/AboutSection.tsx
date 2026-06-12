'use client'

import Image from 'next/image'
import { Reveal } from './ScrollReveal'
import { motion } from 'framer-motion'

interface AboutData {
  title?: string
  content?: string
  image?: string
}

export default function AboutSection({ data }: { data?: AboutData }) {
  return (
    <section id="about" className="relative bg-[#010101] py-24 border-t border-white/[0.03] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] translate-y-[-50%]"
        style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <Reveal direction="left">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden gradient-border"
            >
              {data?.image ? (
                <Image
                  src={data.image}
                  alt="JKESS — Shenzhen Nengyi Electronic Technology"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-white/[0.02] to-white/[0.01] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-30">🏭</div>
                    <p className="text-gray-600 text-sm">Company Image</p>
                  </div>
                </div>
              )}
            </motion.div>
          </Reveal>

          {/* Content */}
          <Reveal direction="right" delay={0.15}>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {data?.title || 'About JKESS'}
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-[#5b5bff] to-[#f58a8a] rounded-full mb-6" />
              <div className="text-gray-400 leading-relaxed space-y-4 text-[15px]">
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
