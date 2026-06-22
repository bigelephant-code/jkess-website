'use client'

import { motion } from 'framer-motion'
import AboutSection from "@/components/AboutSection"
import TeamSlideshow from "@/components/TeamSlideshow"
import DynamicGlobe from "@/components/DynamicGlobe"
import { Reveal } from "@/components/ScrollReveal"
import { useTranslate } from '@/i18n/client'

const cultures = [
  {
    title: 'Mission',
    desc: 'To deliver safe, reliable, and intelligent energy storage solutions that power a cleaner, more sustainable future for everyone.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
    ),
    color: '#22c55e',
  },
  {
    title: 'Vision',
    desc: 'To become a globally recognized leader in new energy storage, driving innovation from BMS to complete battery systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
    ),
    color: '#5b5bff',
  },
  {
    title: 'Values',
    desc: 'Integrity, innovation, and customer focus define everything we do. We build trust through quality and long-term partnerships.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    color: '#f58a8a',
  },
]

export default function AboutPage() {
  const t = useTranslate()

  const cultures = [
    {
      title: 'Mission',
      desc: 'To deliver safe, reliable, and intelligent energy storage solutions that power a cleaner, more sustainable future for everyone.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
      ),
      color: '#22c55e',
    },
    {
      title: 'Vision',
      desc: 'To become a globally recognized leader in new energy storage, driving innovation from BMS to complete battery systems.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
      ),
      color: '#5b5bff',
    },
    {
      title: 'Values',
      desc: 'Integrity, innovation, and customer focus define everything we do. We build trust through quality and long-term partnerships.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      ),
      color: '#f58a8a',
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      <TeamSlideshow>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            {t('about.heroTitle')?.split(' ')?.slice(0, -2)?.join(' ')} <span className="animate-gradient-green">{t('about.heroTitle')?.split(' ')?.slice(-2)?.join(' ')}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">{t('about.heroDesc')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight animate-gradient-text">{t('about.ourTeam')}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {cultures.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="group text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: `${item.color}25`, color: item.color }}>{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{t('about.' + item.title.toLowerCase())}</h3>
              <p className="text-gray-300 leading-relaxed max-w-xs mx-auto">{t('about.' + item.title.toLowerCase() + 'Desc')}</p>
            </motion.div>
          ))}
        </div>
      </TeamSlideshow>

      <AboutSection data={{ title: t('about.title'), image: "/images/company-building.webp" }} />

      {/* Our Offices Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.offices', 'Our Offices & Factory')}</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">{t('about.officesDesc', 'JKESS operates across three strategic locations in China to serve you better')}</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M3 21h18M3 10l9-7 9 7M5 10v11h5V13h4v8h5V10" /></svg>
                ),
                title: 'Shenzhen Office',
                lines: [
                  'Room 1008, Building B4,',
                  'Yunzhi Science & Technology Park,',
                  'Guangming Street, Guangming District,',
                  'Shenzhen, Guangdong, China',
                ],
                color: '#22c55e',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M3 21h18M3 10l9-7 9 7M5 10v11h5V13h4v8h5V10" /></svg>
                ),
                title: 'Hangzhou Office',
                lines: [
                  'Room 309-2, Building 11,',
                  'Nanhu Future Science Park,',
                  'No. 2 Tongshanxi Road, Zhongtai Street,',
                  'Yuhang District, Hangzhou, Zhejiang, China',
                ],
                color: '#5b5bff',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                ),
                title: 'Shandong Factory',
                lines: [
                  'No. 103 Binshi Road,',
                  'Lize Subdistrict Office,',
                  'Binzhou Economic & Technological',
                  'Development Zone, Shandong, China',
                ],
                color: '#f58a8a',
              },
            ].map((office, i) => (
              <motion.div
                key={office.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${office.color}12`, color: office.color }}>
                  {office.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{office.title}</h3>
                <div className="text-gray-500 text-sm leading-relaxed">
                  {office.lines.map((line, li) => (
                    <p key={li}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse & Global Logistics Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content - Left side */}
            <Reveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t('warehouse.title', 'Global Warehouse & Logistics')}
                </h2>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>{t('warehouse.desc1', 'JKESS maintains strategically located warehouses across three major regions in China — Sichuan, Shandong, and Shenzhen — ensuring rapid fulfillment and cost-effective domestic logistics. Combined with our overseas warehouses in Poland (serving the European market), the United States (covering North America), and Brazil (covering South America), we offer a truly global distribution network that guarantees fast delivery, reduced shipping costs, and localized support for customers worldwide.')}</p>
                  <p>{t('warehouse.desc2', 'Whether you are placing a small sample order or a large-volume container shipment, our multi-warehouse inventory system ensures product availability, flexible dispatch options, and seamless cross-border logistics. With warehouses on four continents, JKESS is committed to delivering energy storage solutions to your doorstep — wherever you are.')}</p>
                </div>
              </div>
            </Reveal>

            {/* Image - Right side */}
            <Reveal direction="right" delay={0.15}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d1b2a]">
                <DynamicGlobe />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
