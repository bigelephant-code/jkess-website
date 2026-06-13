'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: '奠基期',
    subtitle: 'Foundation Period',
    content: [
      '成立团队山东图南，进入新能源行业开启储能产品的研发。',
      '第一代产品投入市场，获得了客户的好评。',
    ],
    color: '#22c55e',
  },
  {
    period: '2020-2022',
    title: '成长期',
    subtitle: 'Growth Period',
    content: [
      '设立杭州研发中心聚焦前沿技术创新，成立深圳能亿子公司，技术实力与团队规模快速提升。',
      '产品成功开拓海外市场，海外市场占有率极速攀升，引发了行业的关注。',
    ],
    color: '#5b5bff',
  },
  {
    period: '2023-2024',
    title: '突破期',
    subtitle: 'Breakthrough Period',
    content: [
      '推出JKESS品牌覆盖全球30余国，5公顷中大型储能现代化生产基地正式建成投产。',
      '成功研发设计高压工商业储能系统，产品配置主动均衡功能，针对削峰填谷的政策，能有效帮客户提升2-5年的收益。',
    ],
    color: '#f58a8a',
  },
  {
    period: '2025-未来',
    title: '拓展期',
    subtitle: 'Expansion Period',
    content: [
      '从研发设计、生产集成、到后端测试与售后——已具备储能系统全链条研发制造和销售服务能力。',
      '当前生产线达到2.1GWh/年的产能，成为储能行业一颗冉冉升起的新星。',
    ],
    color: '#eab308',
  },
]

export default function Timeline() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20L12 4l10 16" />
            </svg>
            发展历程
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Development{' '}
            <span className="text-green-600">History</span>
          </h2>
        </motion.div>

        {/* Timeline - vertical layout */}
        <div className="max-w-3xl mx-auto">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-14 pb-12 last:pb-0"
            >
              {/* Vertical line */}
              {i < milestones.length - 1 && (
                <div className="absolute left-[18px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-gray-200 to-transparent" />
              )}

              {/* Dot with number */}
              <div className="absolute left-0 top-1">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15, type: 'spring', stiffness: 200 }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-[3px] border-white shadow-md"
                    style={{ background: item.color, color: '#fff' }}
                  >
                    {i + 1}
                  </div>
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: item.color }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                </motion.div>
              </div>

              {/* Content card */}
              <div className="pl-6">
                {/* Period badge */}
                <motion.div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ background: `${item.color}12`, color: item.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15 + 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  {item.period}
                </motion.div>

                {/* Title + subtitle */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {item.title}
                  <span className="text-sm font-normal text-gray-400 ml-2">/ {item.subtitle}</span>
                </h3>

                {/* Content */}
                <div className="space-y-2 mt-3">
                  {item.content.map((paragraph, pi) => (
                    <p key={pi} className="text-[15px] text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Mountain background at bottom ─── */}
      <div className="relative w-full h-[220px] md:h-[300px]">
        <img
          src="/images/mountain-bg-transparent.png"
          alt=""
          className="w-full h-full object-cover object-bottom"
          loading="lazy"
        />
        {/* White fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>
    </section>
  )
}
