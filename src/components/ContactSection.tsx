'use client'
import { useTranslate } from '@/i18n/client'

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from './ScrollReveal'
import Image from 'next/image'

interface FooterData {
  contactEmail?: string
}

export default function ContactSection({ data }: { data?: FooterData }) {
  const t = useTranslate()

  return (
    <section id="contact" className="bg-black py-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-3">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
              {t('contactSection.title', 'Get in Touch')}
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              {t('contactSection.desc', 'Ready to power your future? Contact us for a custom quote or partnership inquiry.')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <StaggerReveal staggerDelay={0.12} className="space-y-2">
            <StaggerItem>
              <div className="flex items-end gap-4 group cursor-pointer transition-all duration-200 hover:-translate-x-1">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-green-500/20 group-hover:-translate-x-1">
                  <Phone size={20} className="text-green-400 transition-all duration-200 group-hover:text-green-300" />
                </div>
                <div className="flex-1 relative">
                  <div className="pr-36">
                    <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">{t('contactSection.phone', 'Phone')}</p>
                    <a href="tel:+8613162828868" className="text-gray-400 transition-colors duration-200 group-hover:text-green-400">+86 131 6282 8868</a>
                  </div>
                  <div className="absolute right-0 top-0 flex items-start gap-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <a href="https://wa.me/8613162828868" target="_blank" rel="noopener noreferrer" className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-1 transition-transform hover:scale-110" title="WhatsApp">
                        <Image src="/images/whatsapp-qr.png" alt="WhatsApp QR" fill className="object-contain" sizes="64px" />
                      </a>
                      <span className="text-[10px] text-green-500 font-semibold tracking-wide">WhatsApp</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-1" title="WeChat">
                        <Image src="/images/wechat-qr.png" alt="WeChat QR" fill className="object-contain" sizes="64px" />
                      </div>
                      <span className="text-[10px] text-green-500 font-semibold tracking-wide">WeChat</span>
                    </div>
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
                  <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">{t('contactSection.email', 'Email')}</p>
                  <a href={`mailto:${data?.contactEmail || 'zhou@jkess.com'}`} className="text-gray-400 transition-colors duration-200 group-hover:text-green-400">
                    {data?.contactEmail || 'zhou@jkess.com'}
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
                  <p className="text-white font-semibold transition-colors duration-200 group-hover:text-green-500">{t('contactSection.location', 'Location')}</p>
                  <p className="text-gray-400 leading-relaxed transition-colors duration-200 group-hover:text-green-400/80">Building B4, Guangming, Shenzhen, China</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerReveal>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || ''
            const company = (form.elements.namedItem('company') as HTMLInputElement)?.value || ''
            const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || ''
            const subject = encodeURIComponent('JKESS Inquiry')
            const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nMessage:\n${message}`)
            window.open(`mailto:${data?.contactEmail || 'zhou@jkess.com'}?subject=${subject}&body=${body}`)
          }}>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="name" placeholder={t('contactSection.yourName', 'Your Name')} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors" />
              <input type="text" name="company" placeholder={t('contactSection.company', 'Company')} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors" />
            </div>
            <textarea name="message" rows={3} placeholder={t('contactSection.yourMessage', 'Your Message')} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none" />
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-lg transition-all text-sm">
              {t('contactSection.send', 'Send Message')} <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
