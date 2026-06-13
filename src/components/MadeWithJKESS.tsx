'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  { src: '/images/projects/project-1.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-2.png', span: 'col-span-1 row-span-2' },
  { src: '/images/projects/project-3.png', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-4.jpg', span: 'col-span-2 row-span-1' },
  { src: '/images/projects/project-5.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-6.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-7.png', span: 'col-span-1 row-span-2' },
  { src: '/images/projects/project-8.png', span: 'col-span-2 row-span-1' },
  { src: '/images/projects/project-9.png', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-10.png', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-11.png', span: 'col-span-1 row-span-1' },
  { src: '/images/projects/project-12.png', span: 'col-span-1 row-span-2' },
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
          Project Showcase
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Made with{' '}
          <span className="text-green-600">JKESS</span>
        </h2>
        <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto text-center">
          Real projects delivered — from design to deployment.
        </p>
      </div>

      {/* Staggered masonry grid */}
      <div className="px-4 md:px-8 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[150px]">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${project.span}`}
              >
                <Image
                  src={project.src}
                  alt={`Project ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
