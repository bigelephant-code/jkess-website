'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    period: '2017-2019',
    title: '奠基期',
    subtitle: 'Foundation',
    content: [
      '成立团队山东图南，进入新能源行业开启储能产品的研发。',
      '第一代产品投入市场，获得了客户的好评。',
    ],
    color: '#22c55e',
  },
  {
    period: '2020-2022',
    title: '成长期',
    subtitle: 'Growth',
    content: [
      '设立杭州研发中心聚焦前沿技术创新，成立深圳能亿子公司，技术实力与团队规模快速提升。',
      '产品成功开拓海外市场，海外市场占有率极速攀升，引发了行业的关注。',
    ],
    color: '#5b5bff',
  },
  {
    period: '2023-2024',
    title: '突破期',
    subtitle: 'Breakthrough',
    content: [
      '推出JKESS品牌覆盖全球30余国，5公顷中大型储能现代化生产基地正式建成投产。',
      '成功研发设计高压工商业储能系统，产品配置主动均衡功能，针对削峰填谷的政策，能有效帮客户提升2-5年的收益。',
    ],
    color: '#f58a8a',
  },
  {
    period: '2025-未来',
    title: '拓展期',
    subtitle: 'Expansion',
    content: [
      '从研发设计、生产集成、到后端测试与售后——已具备储能系统全链条研发制造和销售服务能力。',
      '当前生产线达到2.1GWh/年的产能，成为储能行业一颗冉冉升起的新星。',
    ],
    color: '#eab308',
  },
]

export default function Timeline() {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20L12 4l10 16" />
            </svg>
            发展历程
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Development <span className="text-green-600">History</span>
          </h2>
        </motion.div>

        {/* 4 columns horizontal */}
        <div className="grid md:grid-cols-4 gap-5 md:gap-6">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group relative"
            >
              {/* Hover glow */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-0 blur-xl group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse, ${item.color}12, transparent 70%)` }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl border border-gray-100 p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col"
                style={{ background: `${item.color}03` }}
              >
                {/* Number + period */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm"
                    style={{ background: item.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: item.color }}>
                    {item.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-4">{item.subtitle}</p>

                {/* Color bar */}
                <div className="h-0.5 w-12 rounded-full mb-4" style={{ background: item.color, opacity: 0.3 }} />

                {/* Content */}
                <div className="space-y-3 flex-1">
                  {item.content.map((p, pi) => (
                    <p key={pi} className="text-[13px] text-gray-600 leading-relaxed">
                      {p}
                    </p>
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
