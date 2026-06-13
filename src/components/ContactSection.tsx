'use client'

import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'
import Image from 'next/image'

interface FooterData {
  contactEmail?: string
}

export default function ContactSection({ data }: { data?: FooterData }) {
  return (
    <section id="contact" className="bg-black py-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-3">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Ready to power your future? Contact us for a custom quote or partnership inquiry.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact info */}
          <StaggerReveal staggerDelay={0.12} className="space-y-4">
            <StaggerItem>
              <div className="flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:-translate-x-1">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-green-500/20 group-hover:-translate-x-1">
                  <Phone size={20} className="text-green-400 transition-all duration-200 group-hover:text-green-300" />
                </div>
                <div>
                  <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">Phone</p>
                  <a href="tel:+8613162828868" className="text-gray-400 transition-colors duration-200 group-hover:text-green-400">
                    +86 131 6282 8868
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4 group transition-all duration-200">
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">WhatsApp</p>
                  <p className="text-gray-400 text-sm mb-2">Scan to chat with us</p>
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white p-1.5">
                    <Image
                      src="/images/whatsapp-qr.png"
                      alt="WhatsApp QR Code"
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:-translate-x-1">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-green-500/20 group-hover:-translate-x-1">
                  <Mail size={20} className="text-green-400 transition-all duration-200 group-hover:text-green-300" />
                </div>
                <div>
                  <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">Email</p>
                  <a
                    href={`mailto:${data?.contactEmail || 'chinaenergymall@163.com'}`}
                    className="text-gray-400 transition-colors duration-200 group-hover:text-green-400"
                  >
                    {data?.contactEmail || 'chinaenergymall@163.com'}
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:-translate-x-1">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-green-500/20 group-hover:-translate-x-1">
                  <MapPin size={20} className="text-green-400 transition-all duration-200 group-hover:text-green-300" />
                </div>
                <div>
                  <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">Location</p>
                  <p className="text-gray-400 leading-relaxed transition-colors duration-200 group-hover:text-green-400/80">
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
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
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
