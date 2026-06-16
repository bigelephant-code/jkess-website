'use client'

import { motion } from 'framer-motion'
import AboutSection from "@/components/AboutSection"
import TeamSlideshow from "@/components/TeamSlideshow"

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
  return (
    <div className="bg-white min-h-screen">
      <div className="h-16 bg-gray-900" />
      <TeamSlideshow>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Powering a <span className="animate-gradient-green">Cleaner Future</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">From BMS to complete battery systems — discover the story, mission, and values behind JKESS.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight animate-gradient-text">Our Team & Vision</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {cultures.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="group text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: `${item.color}25`, color: item.color }}>{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </TeamSlideshow>
      <AboutSection data={{ title: "About JKESS", image: "/images/company-building.webp" }} />
    </div>
  )
}
