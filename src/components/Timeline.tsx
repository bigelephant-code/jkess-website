'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslate } from '@/i18n/client'

export default function Timeline() {
  const t = useTranslate()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 45%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const glowLeft = useTransform(scrollYProgress, [0, 1], ['2%', '88%'])

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
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {t('timeline.title.part1')} <span className="text-green-600">{t('timeline.title.part2')}</span>
          </h2>
        </motion.div>

        <div className="relative hidden lg:block px-8 mt-56">
          <div className="absolute left-10 right-10 top-1/2 h-px -translate-y-1/2 bg-gray-200" />
          <motion.div
            className="absolute left-10 right-10 top-1/2 h-[3px] -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-green-300 via-green-500 to-emerald-300 shadow-[0_0_24px_rgba(34,197,94,0.35)]"
            style={{ scaleX: lineScale }}
          />
          <motion.div
            className="absolute top-1/2 h-7 w-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-green-300/70 to-transparent blur-md"
            style={{ left: glowLeft }}
          />

          <div className="grid grid-cols-4 gap-8">
            {milestones.map((item, i) => {
              const isTop = i % 2 === 0

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: isTop ? -28 : 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  className="relative min-h-[360px] flex flex-col items-center justify-center"
                >
                  <div className={`absolute w-full ${isTop ? 'bottom-[calc(50%+54px)]' : 'top-[calc(50%+54px)]'}`}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="relative bg-white border border-gray-200 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                    >
                      <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-green-500" />
                      <span className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-green-500" />
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="text-xs md:text-sm font-bold tracking-[0.16em] text-green-600">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-gray-400">{item.period}</span>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-green-500/50 via-gray-200 to-transparent mb-3" />
                      <div className="space-y-2">
                        {item.content.map((p, pi) => (
                          <p key={pi} className="text-[12px] text-gray-600 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.86, opacity: 0.45 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.45, delay: i * 0.12 }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-green-200 bg-white shadow-[0_0_0_8px_rgba(34,197,94,0.06)]"
                  >
                    <motion.span
                      className="absolute inset-[-8px] rounded-full border border-green-400/50"
                      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
                    />
                    <span className="absolute h-[3px] w-7 bg-green-500 -left-7" />
                    <span className="absolute h-[3px] w-7 bg-green-500 -right-7" />
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black text-green-400 shadow-[inset_0_0_14px_rgba(34,197,94,0.4)]">
                      <span className="text-lg font-bold">{item.year}</span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="lg:hidden relative space-y-8">
          <motion.div
            className="absolute left-[18px] top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-green-300 via-green-500 to-emerald-300"
            style={{ scaleY: lineScale }}
          />
          {milestones.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-green-200 bg-white shadow-sm">
                <div className="h-5 w-5 rounded-full bg-black shadow-[inset_0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <span className="text-sm font-bold text-green-600 mb-1 block">{item.year}</span>
              <div className="relative bg-white border border-gray-200 p-4 shadow-sm">
                <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-green-500" />
                <span className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-green-500" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-xs font-bold tracking-[0.12em] text-green-600">{item.title}</h3>
                  <span className="text-[11px] text-gray-400">{item.period}</span>
                </div>
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
