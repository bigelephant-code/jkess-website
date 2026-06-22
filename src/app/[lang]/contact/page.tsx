'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, MessagesSquare, Send, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslate } from '@/i18n/client'

export default function ContactPage() {
  const t = useTranslate()
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('JKESS Inquiry')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.open(`mailto:zhou@jkess.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  const contactItems = [
    { icon: Phone, label: 'Phone', value: '+86 131 6282 8868', href: 'tel:+8613162828868', color: '#22c55e' },
    { icon: Mail, label: 'Email', value: 'zhou@jkess.com', href: 'mailto:zhou@jkess.com', color: '#5b5bff' },
    { icon: MapPin, label: 'Location', value: 'Building B4, Guangming, Shenzhen', color: '#f58a8a' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/contact-banner-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-gray-900/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5b5bff 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              {t('contactPage.title')}
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {t('contactPage.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {contactItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}12` }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{t('contactPage.' + item.label.toLowerCase())}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-900 font-semibold hover:text-green-600 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-gray-900 font-semibold">{item.value}</p>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
              className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{t('contactPage.formTitle')}</h2>
              <p className="text-gray-500 text-sm mb-6">{t('contactPage.formDesc')}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t('contactPage.namePlaceholder')} required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                  <input type="text" placeholder={t('contactPage.companyPlaceholder')} value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                </div>
                <input type="email" placeholder={t('contactPage.emailPlaceholder')} required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                <textarea placeholder={t('contactPage.messagePlaceholder')} required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none" />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm">
                  {submitted ? t('contactPage.sent') : t('contactPage.send')} <Send size={15} />
                </button>
              </form>
            </motion.div>

            <div className="md:col-span-2 grid md:grid-cols-2 gap-4 content-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-start text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-4">
                  <MessageCircle size={28} className="text-[#25D366]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('contactPage.whatsappTitle', 'WhatsApp')}</h3>
                <p className="text-gray-500 text-sm mb-5 min-h-[3rem]">{t('contactPage.whatsappDesc', 'Quickest way to get a response')}</p>
                <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm mb-4">
                  <Image src="/images/whatsapp-qr.png" alt="WhatsApp QR Code" fill className="object-contain p-2" sizes="144px" />
                </div>
                <span className="text-xs text-green-600 font-semibold tracking-wide mb-4">WhatsApp</span>
                <a href="https://wa.me/8613162828868" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-2.5 rounded-lg transition-all text-sm">
                  {t('contactPage.startChat', 'Start Chat')} <ArrowRight size={15} />
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-start text-center">
                <div className="w-16 h-16 rounded-full bg-[#07C160]/10 flex items-center justify-center mb-4">
                  <MessagesSquare size={28} className="text-[#07C160]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('contactPage.wechatTitle', 'WeChat')}</h3>
                <p className="text-gray-500 text-sm mb-5 min-h-[3rem]">{t('contactPage.wechatDesc', 'Scan to add me on WeChat')}</p>
                <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm mb-4">
                  <Image src="/images/wechat-qr.png" alt="WeChat QR Code" fill className="object-contain p-2" sizes="144px" />
                </div>
                <span className="text-xs text-[#07C160] font-semibold tracking-wide mb-4">WeChat</span>
                <p className="text-sm text-gray-400">{t('contactPage.wechatId', 'Scan to add contact')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
