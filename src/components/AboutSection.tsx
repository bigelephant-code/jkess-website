'use client'

import Image from 'next/image'
import { Reveal } from './ScrollReveal'

import { useTranslate } from '@/i18n/client'

interface AboutData {
  title?: string
  content?: string
  image?: string
}

export default function AboutSection({ data }: { data?: AboutData }) {
  const t = useTranslate()
  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <Reveal direction="left">
            {data?.image ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer">
                <Image
                  src={data.image}
                  alt="JKESS — JKBMS Electronic Technology Co.,Ltd"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-green-100 to-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏭</div>
                  <p className="text-gray-400 text-sm">Company Image</p>
                </div>
              </div>
            )}
          </Reveal>

          {/* Content */}
          <Reveal direction="right" delay={0.15}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {data?.title || t('about.title')}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {data?.content
                  ? data.content.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  : (
                    <>
                      <p>{t('about.desc')}</p>
                      <p>{t('about.desc2')}</p>
                      <p>{t('about.desc3')}</p>
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
