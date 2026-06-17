'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslate } from '@/i18n/client'

interface SolutionTab {
  id: string
  icon: string
  title: string
  desc: string
  visual: React.ReactNode
}

export default function SolutionsSection() {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)

  const tabs: SolutionTab[] = [
    {
      id: 'c-i-power',
      icon: '🏭',
      title: 'Industrial & Commercial Power Station',
      desc: 'Covers factories, office buildings, government facilities, schools and hospitals. Large rooftop areas maximize solar power generation, reducing electricity costs and ensuring energy independence for commercial users.',
      visual: (
        <svg className="w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <filter id="g"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <g transform="translate(80,80)"><rect x="0" y="0" width="60" height="35" rx="3" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1"/><rect x="0" y="0" width="60" height="17" rx="3" fill="#0d2b1a" stroke="#22c55e" strokeWidth="0.5"/><line x1="15" y1="0" x2="15" y2="35" stroke="#22c55e" strokeWidth="0.3"/><line x1="30" y1="0" x2="30" y2="35" stroke="#22c55e" strokeWidth="0.3"/><line x1="45" y1="0" x2="45" y2="35" stroke="#22c55e" strokeWidth="0.3"/></g>
          <g transform="translate(220,60)"><rect x="0" y="30" width="80" height="70" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/><rect x="55" y="10" width="8" height="25" rx="1" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/></g>
          <g transform="translate(370,50)"><rect x="0" y="20" width="60" height="80" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/></g>
          <g transform="translate(270,170)"><rect x="-15" y="-15" width="70" height="70" rx="8" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.2"/><rect x="-10" y="-10" width="60" height="60" rx="6" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#g)"/><text x="20" y="22" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">JKESS</text><text x="20" y="36" textAnchor="middle" fill="#22c55e" fontSize="9">Battery</text></g>
          <line x1="140" y1="97" x2="270" y2="200" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/>
          <circle r="3" fill="#22c55e" filter="url(#g)"><animateMotion dur="2s" repeatCount="indefinite" path="M140,97 L270,200"/></circle>
          <line x1="300" y1="200" x2="260" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
          <circle r="2.5" fill="#3b82f6" filter="url(#g)"><animateMotion dur="3s" repeatCount="indefinite" path="M300,200 L260,130"/></circle>
          <line x1="320" y1="200" x2="400" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
          <circle r="2.5" fill="#3b82f6" filter="url(#g)"><animateMotion dur="3.5s" repeatCount="indefinite" path="M320,200 L400,130"/></circle>
        </svg>
      ),
    },
    {
      id: 'residential',
      icon: '🏠',
      title: 'Residential Battery Storage',
      desc: 'Home energy storage solutions that store solar energy for use during peak hours or at night. Achieve energy independence with smart battery management, reduce electricity bills, and ensure backup power for essential loads during outages.',
      visual: (
        <svg className="w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs><filter id="g2"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <g transform="translate(100,100)"><rect x="0" y="20" width="80" height="70" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/><polygon points="0,20 40,0 80,20" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5"/><rect x="55" y="55" width="18" height="35" rx="1" fill="#22c55e" opacity="0.12"/><rect x="12" y="35" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15"/><rect x="28" y="35" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15"/></g>
          <g transform="translate(100,80)"><rect x="80" y="0" width="40" height="25" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1"/><line x1="85" y1="12" x2="115" y2="12" stroke="#22c55e" strokeWidth="0.3"/><line x1="100" y1="5" x2="100" y2="20" stroke="#22c55e" strokeWidth="0.3"/></g>
          <g transform="translate(340,140)"><rect x="0" y="0" width="50" height="50" rx="5" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#g2)"/><text x="25" y="25" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">JKESS</text><text x="25" y="38" textAnchor="middle" fill="#22c55e" fontSize="8">Battery</text></g>
          <line x1="220" y1="110" x2="340" y2="165" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/>
          <circle r="3" fill="#22c55e" filter="url(#g2)"><animateMotion dur="2.5s" repeatCount="indefinite" path="M220,110 L340,165"/></circle>
          <line x1="390" y1="165" x2="390" y2="260" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
          <circle r="2.5" fill="#3b82f6" filter="url(#g2)"><animateMotion dur="3s" repeatCount="indefinite" path="M390,165 L390,260"/></circle>
        </svg>
      ),
    },
    {
      id: 'ground',
      icon: '☀️',
      title: 'Ground Utility Solar Station',
      desc: 'Large-scale ground-mounted solar power stations for utility-level power generation. Our solutions deliver reliable performance in extreme environments — high temperature, high altitude, sandstorms, and low temperatures.',
      visual: (
        <svg className="w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs><filter id="g3"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <g transform="translate(60,180)"><rect x="0" y="0" width="70" height="30" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1"/><rect x="0" y="0" width="70" height="14" rx="2" fill="#0d2b1a" opacity="0.5"/><line x1="17" y1="0" x2="17" y2="30" stroke="#22c55e" strokeWidth="0.3"/><line x1="35" y1="0" x2="35" y2="30" stroke="#22c55e" strokeWidth="0.3"/><line x1="52" y1="0" x2="52" y2="30" stroke="#22c55e" strokeWidth="0.3"/></g>
          <g transform="translate(160,150)"><rect x="0" y="0" width="70" height="30" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1"/><rect x="0" y="0" width="70" height="14" rx="2" fill="#0d2b1a" opacity="0.5"/></g>
          <g transform="translate(100,210)"><rect x="0" y="0" width="70" height="30" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1"/></g>
          <g transform="translate(350,160)"><rect x="0" y="0" width="55" height="55" rx="5" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#g3)"/><text x="27" y="28" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">JKESS</text><text x="27" y="42" textAnchor="middle" fill="#22c55e" fontSize="8">Inverter</text></g>
          <line x1="130" y1="195" x2="350" y2="187" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/>
          <circle r="3" fill="#22c55e" filter="url(#g3)"><animateMotion dur="3s" repeatCount="indefinite" path="M130,195 L350,187"/></circle>
          <line x1="230" y1="165" x2="350" y2="187" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
          <circle r="2" fill="#22c55e" filter="url(#g3)"><animateMotion dur="3.5s" repeatCount="indefinite" path="M230,165 L350,187"/></circle>
        </svg>
      ),
    },
    {
      id: 'energy-storage',
      icon: '🔋',
      title: 'C&I Energy Storage Solution',
      desc: 'Commercial and industrial energy storage systems for peak shaving, load shifting, and emergency backup. Reduce demand charges, optimize energy usage with smart EMS, and ensure uninterrupted power for critical operations.',
      visual: (
        <svg className="w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs><filter id="g4"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <g transform="translate(80,80)"><rect x="0" y="20" width="60" height="70" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/><rect x="30" y="30" width="20" height="25" rx="1" fill="#22c55e" opacity="0.12"/></g>
          <g transform="translate(370,90)"><rect x="0" y="10" width="50" height="80" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/></g>
          <g transform="translate(200,140)"><rect x="0" y="0" width="70" height="50" rx="5" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#g4)"/><text x="35" y="22" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">JKESS</text><text x="35" y="36" textAnchor="middle" fill="#22c55e" fontSize="8">Storage</text><rect x="10" y="5" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4"/><rect x="22" y="5" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4"/><rect x="35" y="5" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4"/></g>
          <g transform="translate(320,170)"><rect x="0" y="0" width="40" height="20" rx="2" fill="#0d2b1a" stroke="#22c55e" strokeWidth="0.8"/></g>
          <line x1="140" y1="130" x2="200" y2="165" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/>
          <circle r="3" fill="#22c55e" filter="url(#g4)"><animateMotion dur="2.5s" repeatCount="indefinite" path="M140,130 L200,165"/></circle>
          <line x1="270" y1="165" x2="370" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
          <circle r="2.5" fill="#3b82f6" filter="url(#g4)"><animateMotion dur="3.5s" repeatCount="indefinite" path="M270,165 L370,130"/></circle>
          <line x1="270" y1="180" x2="320" y2="180" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
          <circle r="2" fill="#22c55e" filter="url(#g4)"><animateMotion dur="4s" repeatCount="indefinite" path="M270,180 L320,180"/></circle>
        </svg>
      ),
    },
    {
      id: 'pvbm',
      icon: '🏗️',
      title: 'PV Building Materials',
      desc: 'Integrate solar power into building structures with our PV building material solutions. From solar rooftiles to facade systems, transform every building into a clean power generator with aesthetic and functional building integration.',
      visual: (
        <svg className="w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs><filter id="g5"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <g transform="translate(150,60)"><rect x="0" y="0" width="160" height="90" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/><rect x="0" y="0" width="160" height="20" rx="0" fill="#0d2b1a" stroke="#22c55e" strokeWidth="0.5"/><rect x="20" y="30" width="20" height="30" rx="1" fill="#22c55e" opacity="0.12"/><rect x="60" y="30" width="20" height="30" rx="1" fill="#22c55e" opacity="0.12"/><rect x="100" y="30" width="20" height="30" rx="1" fill="#22c55e" opacity="0.12"/><rect x="30" y="70" width="60" height="15" rx="1" fill="#22c55e" opacity="0.08"/></g>
          <g transform="translate(140,150)"><rect x="0" y="0" width="55" height="55" rx="5" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#g5)"/><text x="27" y="28" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">JKESS</text><text x="27" y="42" textAnchor="middle" fill="#22c55e" fontSize="8">PV + B</text></g>
          <g transform="translate(330,160)"><rect x="0" y="0" width="40" height="40" rx="2" fill="#0d2b1a" stroke="rgba(34,197,94,0.3)" strokeWidth="0.8"/></g>
          <line x1="230" y1="105" x2="195" y2="150" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/>
          <circle r="3" fill="#22c55e" filter="url(#g5)"><animateMotion dur="2.5s" repeatCount="indefinite" path="M230,105 L195,150"/></circle>
          <line x1="195" y1="177" x2="330" y2="180" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
          <circle r="2.5" fill="#3b82f6" filter="url(#g5)"><animateMotion dur="3s" repeatCount="indefinite" path="M195,177 L330,180"/></circle>
        </svg>
      ),
    },
  ]

  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #22c55e 0%, transparent 50%), radial-gradient(circle at 70% 60%, #3b82f6 0%, transparent 50%)'
      }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t('solutions.title', 'Solutions')} &amp;{' '}
            <span className="text-green-400">{t('solutions.cases', 'Cases')}</span>
          </h2>
        </motion.div>

        {/* Main content: tabbed layout */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left: Tab navigation */}
          <div className="md:col-span-3 space-y-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-green-500/15 border border-green-500/40 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                    : 'bg-white/5 border border-white/[0.06] text-gray-400 hover:text-gray-200 hover:border-white/20'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <div>
                  <p className={`text-sm font-medium leading-tight ${activeTab === i ? 'text-green-400' : 'text-gray-300'}`}>
                    {tab.title.split(' ')[0] + (tab.title.includes('&') ? ' &' : '')}
                  </p>
                  <p className="text-xs leading-tight opacity-70">
                    {tab.title.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Content area */}
          <div className="md:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-5 gap-8 items-start"
              >
                {/* Text content */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {tabs[activeTab].title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {tabs[activeTab].desc}
                  </p>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors group"
                  >
                    {t('solutions.learnMore', 'Learn More')}
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Visual area */}
                <div className="md:col-span-3 relative">
                  <div className="relative w-full aspect-[4/3] bg-gray-800/40 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{ backgroundImage: 'linear-gradient(0deg, transparent 49px, white 50px), linear-gradient(90deg, transparent 49px, white 50px)', backgroundSize: '50px 50px' }}
                    />
                    {tabs[activeTab].visual}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
