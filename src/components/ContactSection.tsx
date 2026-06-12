'use client'

import { Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'
import { motion } from 'framer-motion'

interface FooterData {
  contactEmail?: string
}

function ContactCard({ icon, title, children }: {
  icon: React.ReactNode; title: string; children: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-start gap-4 group"
    >
      <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 text-gray-500 group-hover:text-[#5b5bff] transition-colors duration-300">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">{title}</p>
        {children}
      </div>
    </motion.div>
  )
}

export default function ContactSection({ data }: { data?: FooterData }) {
  return (
    <section id="contact" className="relative bg-[#010101] py-24 border-t border-white/[0.03] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #5b5bff, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-400 mb-4">
              <Sparkles size={12} className="text-[#a66cd9]" />
              <span>Let&apos;s Talk</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Ready to power your future? Contact us for a custom quote or partnership inquiry.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact info */}
          <StaggerReveal staggerDelay={0.12} className="space-y-8">
            <StaggerItem>
              <ContactCard icon={<Phone size={18} />} title="Phone">
                <a href="tel:+8613162828868" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +86 131 6282 8868
                </a>
              </ContactCard>
            </StaggerItem>
            <StaggerItem>
              <ContactCard icon={<Mail size={18} />} title="Email">
                <a
                  href={`mailto:${data?.contactEmail || 'chinaenergymall@163.com'}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {data?.contactEmail || 'chinaenergymall@163.com'}
                </a>
              </ContactCard>
            </StaggerItem>
            <StaggerItem>
              <ContactCard icon={<MapPin size={18} />} title="Location">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building B4, Yunzhi Science &amp; Technology Park<br />
                  Guangming Street, Guangming District<br />
                  Shenzhen, China
                </p>
              </ContactCard>
            </StaggerItem>
          </StaggerReveal>

          {/* Contact form */}
          <Reveal delay={0.3}>
            <div className="gradient-border rounded-xl">
              <div className="bg-[#050505] rounded-xl p-6">
                <form className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const subject = encodeURIComponent('JKESS Inquiry')
                    const body = encodeURIComponent(
                      `Name: ${(form.elements.namedItem('name') as HTMLInputElement).value}\n` +
                      `Company: ${(form.elements.namedItem('company') as HTMLInputElement).value}\n\n` +
                      `Message:\n${(form.elements.namedItem('message') as HTMLTextAreaElement).value}`
                    )
                    window.open(`mailto:${data?.contactEmail || 'chinaenergymall@163.com'}?subject=${subject}&body=${body}`)
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#5b5bff] transition-all duration-200 text-sm"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#5b5bff] transition-all duration-200 text-sm"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#5b5bff] transition-all duration-200 text-sm resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5b5bff] via-[#a66cd9] to-[#f58a8a] bg-[length:200%_100%] animate-shimmer" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message <Send size={14} />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
