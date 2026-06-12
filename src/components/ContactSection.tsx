'use client'

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'

interface FooterData {
  contactEmail?: string
}

export default function ContactSection({ data }: { data?: FooterData }) {
  return (
    <section id="contact" className="bg-black py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Ready to power your future? Contact us for a custom quote or partnership inquiry.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact info */}
          <StaggerReveal staggerDelay={0.12} className="space-y-6">
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <a href="tel:+8613162828868" className="text-gray-400 hover:text-green-400 transition-colors">
                    +86 131 6282 8868
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <a
                    href={`mailto:${data?.contactEmail || 'chinaenergymall@163.com'}`}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {data?.contactEmail || 'chinaenergymall@163.com'}
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-400 leading-relaxed">
                    Building B4, Yunzhi Science &amp; Technology Park<br />
                    Guangming Street, Guangming District<br />
                    Shenzhen, China
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerReveal>

          {/* Simple contact form */}
          <Reveal delay={0.3}>
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
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-lg transition-all"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
