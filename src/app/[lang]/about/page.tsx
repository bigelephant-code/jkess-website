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
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a3a5a]">
                <DynamicGlobe />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AboutSection data={{ title: t('about.title'), image: "/images/company-building.webp" }} />
    </div>
  )
}
