'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const products = [
  {
    name: 'BMS Protection Board',
    image: '/images/battery-kit-hero.webp',
    category: 'BMS',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Battery Kit (With Caster)',
    image: '/images/battery-kit-system.webp',
    category: 'Battery',
    span: 'col-span-1 row-span-1',
  },
  {
    name: '6U Rack Mount',
    image: '/images/6u-kit/1.webp',
    category: 'Rack',
    span: 'col-span-1 row-span-2',
  },
  {
    name: 'High Voltage Kit',
    image: '/images/6u-kit/2.webp',
    category: 'HV',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Battery Kit Front',
    image: '/images/battery-kit-front.webp',
    category: 'Battery',
    span: 'col-span-1 row-span-1',
  },
  {
    name: '6U Kit Detail',
    image: '/images/6u-kit/3.webp',
    category: 'Detail',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Battery Display',
    image: '/images/battery-kit-display.webp',
    category: 'LCD',
    span: 'col-span-1 row-span-1',
  },
  {
    name: '6U Kit Side View',
    image: '/images/6u-kit/4.webp',
    category: 'Rack',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Battery Kit Side',
    image: '/images/battery-kit-side.webp',
    category: 'Battery',
    span: 'col-span-1 row-span-1',
  },
  {
    name: '6U Kit Rear',
    image: '/images/6u-kit/5.webp',
    category: 'Rack',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Battery Kit Rear',
    image: '/images/battery-kit-rear.webp',
    category: 'Battery',
    span: 'col-span-1 row-span-1',
  },
  {
    name: '6U Kit Detail 6',
    image: '/images/6u-kit/6.webp',
    category: 'Detail',
    span: 'col-span-1 row-span-1',
  },
]

export default function MadeWithJKESS() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Title overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 md:py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Product Showcase
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Made with{' '}
          <span className="text-green-600">JKESS</span>
        </h2>
        <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto text-center">
          Explore our range of energy storage solutions — built for reliability, safety, and performance.
        </p>
      </div>

      {/* Masonry-like grid of product images */}
      <div className="px-4 md:px-8 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${product.span}`}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  loading="lazy"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end" />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                  {product.category}
                </span>
                <h3 className="text-white text-sm font-semibold mt-1 leading-tight">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
