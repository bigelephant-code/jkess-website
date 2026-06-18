'use client'
import { motion } from 'framer-motion'

import { useTranslate } from '@/i18n/client'

export default function Timeline() {
  const t = useTranslate()

  const milestones = [
    {
      year: '2017',
      period: '2017-2019',
      title: t('timeline.2017.title'),
      content: [
        t('timeline.2017.line1'),
        t('timeline.2017.line2'),
      ],
    },
    {
      year: '2020',
      period: '2020-2022',
      title: t('timeline.2020.title'),
      content: [
        t('timeline.2020.line1'),
        t('timeline.2020.line2'),
      ],
    },
    {
      year: '2023',
      period: '2023-2024',
      title: t('timeline.2023.title'),
      content: [
        t('timeline.2023.line1'),
        t('timeline.2023.line2'),
      ],
    },
    {
      year: '2026',
      period: '2026-Future',
      title: t('timeline.2026.title'),
      content: [
        t('timeline.2026.line1'),
        t('timeline.2026.line2'),
      ],
    },
  ]
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
{t('timeline.title.part1')} <span className="text-green-600">{t('timeline.title.part2')}</span>
          </h2>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Central horizontal axis */}
          <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-green-500 -translate-y-1/2 hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {milestones.map((item, i) => {
              const isTop = i % 2 === 0

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: isTop ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className="relative flex flex-col items-center"
                >
                  {/* Content - alternating top/bottom */}
                  <div className={`w-full ${isTop ? 'order-1 mb-8' : 'order-3 mt-8'}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      {/* Title */}
                      <h3 className="text-xs md:text-sm font-bold tracking-[0.15em] text-green-600 mb-2">
                        {item.title}
                      </h3>
                      {/* Divider */}
                      <div className="h-px w-8 bg-green-500/40 mb-3" />
                      {/* Description */}
                      <div className="space-y-2">
                        {item.content.map((p, pi) => (
                          <p key={pi} className="text-[11px] md:text-[13px] text-gray-600 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Year marker on axis */}
                  <div className={`order-2 z-10 ${isTop ? 'mb-auto' : 'mt-auto'}`}>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-[3px] border-green-500 flex items-center justify-center shadow-sm">
                      <span className="text-base md:text-xl font-bold text-green-600">{item.year}</span>
                    </div>
                  </div>


                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: stacked timeline */}
        <div className="md:hidden mt-8 space-y-10">
          {milestones.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-10"
            >
              {/* Vertical line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-green-200" />

              {/* Dot */}
              <div className="absolute left-[7px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow z-10" />

              {/* Year */}
              <span className="text-sm font-bold text-green-600 mb-1 block">{item.year}</span>

              {/* Content */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-xs font-bold tracking-[0.12em] text-green-600 mb-2">{item.title}</h3>
                <div className="h-px w-6 bg-green-500/40 mb-2" />
                <div className="space-y-1.5">
                  {item.content.map((p, pi) => (
                    <p key={pi} className="text-xs text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
