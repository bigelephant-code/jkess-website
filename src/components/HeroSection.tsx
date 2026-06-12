'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import TechLines from './TechLines'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface HeroData {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

/* ─── Floating glow orbs ─── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(91,91,255,0.3) 0%, transparent 70%)' }}
      />
      <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15 animate-float-slower"
        style={{ background: 'radial-gradient(circle, rgba(245,138,138,0.25) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full opacity-10 animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(166,108,217,0.25) 0%, transparent 70%)' }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

/* ─── CTA button with gradient border ─── */
function GradientButton({ href, children, primary }: {
  href: string; children: React.ReactNode; primary?: boolean
}) {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 group overflow-hidden ${
        primary
          ? 'text-white'
          : 'text-gray-300 border border-white/10 hover:border-white/30'
      }`}
    >
      {primary && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5b5bff] via-[#a66cd9] to-[#f58a8a] bg-[length:200%_100%] animate-shimmer" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </a>
  )
}

export default function HeroSection({ data }: { data?: HeroData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#010101]">
      {/* Background layers */}
      <TechLines />
      <FloatingOrbs />

      {/* Gradient overlay edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101] z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-8"
        >
          <Sparkles size={12} className="text-[#a66cd9]" />
          <span>Next-Gen Energy Storage</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight"
        >
          {data?.title || 'Powering a'}
          <br />
          <span className="gradient-text">Cleaner Future</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {data?.subtitle ||
            'Shenzhen Nengyi Electronic Technology — your trusted partner in energy storage solutions, from BMS to complete battery systems.'}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GradientButton href={data?.ctaLink || '#products'} primary>
            {data?.ctaText || 'Explore Products'}
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </GradientButton>
          <GradientButton href="#about">
            Learn More
          </GradientButton>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010101] to-transparent z-[2]" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
