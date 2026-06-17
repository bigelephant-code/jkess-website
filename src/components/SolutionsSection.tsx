'use client'

import { motion } from 'framer-motion'
import { useTranslate } from '@/i18n/client'
import Image from 'next/image'

const applications = [
  { icon: '🏭', label: 'Factory' },
  { icon: '🏢', label: 'Office' },
  { icon: '🏛️', label: 'Government' },
  { icon: '🎓', label: 'School' },
  { icon: '🏥', label: 'Hospital' },
]

const industries = [
  { label: 'Solar panels on large rooftops reduce costs', value: 'Low Electricity Cost' },
  { label: 'Continuous power supply for critical loads', value: 'Uninterrupted Power' },
  { label: 'Smart EMS maximizes self-consumption', value: 'Smart Management' },
  { label: 'Peak shaving and load shifting for savings', value: 'Peak Shaving' },
]

export default function SolutionsSection() {
  const t = useTranslate()

  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Industrial &amp; Commercial{' '}
            <span className="text-green-400">Power Station</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Covers factories, office buildings, government facilities, schools and hospitals —
            leveraging large rooftops for solar power, reducing costs, and ensuring energy independence.
          </p>
        </motion.div>

        {/* Main visual area */}
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Left: Application icons list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 space-y-4"
          >
            {applications.map((app, i) => (
              <motion.div
                key={app.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 py-3 hover:border-green-500/30 transition-all duration-300 group cursor-default"
              >
                <span className="text-2xl">{app.icon}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {app.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Center: Energy flow diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 relative"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-800/40 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
              {/* Isometric illustration grid background */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(0deg, transparent 49px, white 50px), linear-gradient(90deg, transparent 49px, white 50px)`,
                  backgroundSize: '50px 50px'
                }}
              />

              {/* SVG Energy Flow Diagram */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="energyFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="energyFlow2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Solar panels (isometric style) */}
                <g transform="translate(80, 80)">
                  <rect x="0" y="0" width="60" height="35" rx="3" fill="#1e3a2f" stroke="#22c55e" strokeWidth="1" opacity="0.8" />
                  <rect x="0" y="0" width="60" height="17" rx="3" fill="#1e3a2f" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
                  <line x1="0" y1="9" x2="60" y2="9" stroke="#22c55e" strokeWidth="0.3" opacity="0.4" />
                  <line x1="15" y1="0" x2="15" y2="35" stroke="#22c55e" strokeWidth="0.3" opacity="0.4" />
                  <line x1="30" y1="0" x2="30" y2="35" stroke="#22c55e" strokeWidth="0.3" opacity="0.4" />
                  <line x1="45" y1="0" x2="45" y2="35" stroke="#22c55e" strokeWidth="0.3" opacity="0.4" />
                </g>

                {/* Factory building */}
                <g transform="translate(220, 60)">
                  <rect x="0" y="30" width="80" height="70" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
                  <rect x="10" y="45" width="15" height="15" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="30" y="45" width="15" height="15" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="55" y="40" width="20" height="25" rx="1" fill="#22c55e" opacity="0.1" />
                  {/* Chimney */}
                  <rect x="55" y="10" width="8" height="25" rx="1" fill="#1a1a2e" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
                  {/* Window grid lines */}
                  <line x1="15" y1="52" x2="15" y2="60" stroke="#22c55e" strokeWidth="0.3" opacity="0.5" />
                  <line x1="35" y1="52" x2="35" y2="60" stroke="#22c55e" strokeWidth="0.3" opacity="0.5" />
                </g>

                {/* Office building */}
                <g transform="translate(370, 50)">
                  <rect x="0" y="20" width="60" height="80" rx="2" fill="#1a1a2e" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
                  <rect x="5" y="30" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="22" y="30" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="39" y="30" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="5" y="50" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="22" y="50" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="39" y="50" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="5" y="70" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="22" y="70" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                  <rect x="39" y="70" width="12" height="14" rx="1" fill="#22c55e" opacity="0.15" />
                </g>

                {/* Central JKESS Battery System (replaces H Cube) */}
                <g transform="translate(270, 170)">
                  {/* Glow background */}
                  <rect x="-15" y="-15" width="70" height="70" rx="8" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.2" filter="url(#softGlow)" />
                  {/* Main battery cube */}
                  <rect x="-10" y="-10" width="60" height="60" rx="6" fill="#0d2b1a" stroke="#22c55e" strokeWidth="1.5" filter="url(#glow)" />
                  <text x="20" y="22" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold" filter="url(#glow)">JKESS</text>
                  <text x="20" y="38" textAnchor="middle" fill="#22c55e" fontSize="9" opacity="0.7">Battery</text>
                  {/* Inner battery bars */}
                  <rect x="5" y="-3" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4" />
                  <rect x="16" y="-3" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4" />
                  <rect x="27" y="-3" width="8" height="6" rx="1" fill="#22c55e" opacity="0.4" />
                </g>

                {/* Animated energy flow lines */}
                {/* Solar → Battery */}
                <line x1="140" y1="97" x2="270" y2="200" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />
                <circle r="3" fill="#22c55e" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M140,97 L270,200" />
                </circle>

                {/* Factory → Battery */}
                <line x1="260" y1="130" x2="280" y2="190" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
                <circle r="2" fill="#22c55e" filter="url(#glow)">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M260,130 L280,190" />
                </circle>

                {/* Office → Battery */}
                <line x1="400" y1="130" x2="310" y2="190" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
                <circle r="2" fill="#22c55e" filter="url(#glow)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,130 L310,190" />
                </circle>

                {/* Battery → Factory (energy out) */}
                <line x1="300" y1="200" x2="260" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3" />
                <circle r="2.5" fill="#3b82f6" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M300,200 L260,130" />
                </circle>

                {/* Battery → Office (energy out) */}
                <line x1="320" y1="200" x2="400" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3" />
                <circle r="2.5" fill="#3b82f6" filter="url(#glow)">
                  <animateMotion dur="4.5s" repeatCount="indefinite" path="M320,200 L400,130" />
                </circle>

                {/* Lower connectors */}
                <line x1="200" y1="260" x2="260" y2="220" stroke="#22c55e" strokeWidth="0.8" opacity="0.3" />
                <line x1="350" y1="260" x2="320" y2="210" stroke="#22c55e" strokeWidth="0.8" opacity="0.3" />

                {/* Bottom section labels */}
                <g transform="translate(120, 360)">
                  <rect x="0" y="0" width="80" height="25" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
                  <text x="40" y="16" textAnchor="middle" fill="#22c55e" fontSize="9">Solar Power</text>
                </g>
                <g transform="translate(260, 370)">
                  <rect x="0" y="0" width="80" height="25" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
                  <text x="40" y="16" textAnchor="middle" fill="#22c55e" fontSize="9">Energy Storage</text>
                </g>
                <g transform="translate(400, 360)">
                  <rect x="0" y="0" width="80" height="25" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
                  <text x="40" y="16" textAnchor="middle" fill="#22c55e" fontSize="9">Smart EMS</text>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Right: Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 space-y-4"
          >
            {industries.map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 py-3 hover:border-green-500/30 transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs uppercase tracking-wider text-green-400 font-semibold">{item.value}</span>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
