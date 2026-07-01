'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, MessagesSquare, Send, ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useI18n, useTranslate } from '@/i18n/client'
import PageFaqSection from '@/components/PageFaqSection'
import { pageFaqs } from '@/lib/page-faqs'
import { trackEvent } from '@/lib/analytics'
import { getLocalizedGuide, getLocalizedUiCopy } from '@/lib/localized-ui'

export default function ContactPage() {
  const t = useTranslate()
  const { lang } = useI18n()
  const ui = getLocalizedUiCopy(lang)
  const guide = getLocalizedGuide(lang)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    productType: '',
    country: '',
    quantity: '',
    timeline: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('JKESS Inquiry')
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Company: ${formData.company}`,
        `Email: ${formData.email}`,
        `Product Type: ${formData.productType}`,
        `Destination Country: ${formData.country}`,
        `Estimated Quantity: ${formData.quantity}`,
        `Timeline: ${formData.timeline}`,
        '',
        'Message:',
        formData.message,
      ].join('\n')
    )
    trackEvent('contact_form_submit', {
      product_type: formData.productType || 'unspecified',
      destination_country: formData.country || 'unspecified',
      has_quantity: Boolean(formData.quantity),
      has_timeline: Boolean(formData.timeline),
    })
    window.open(`mailto:zhou@jkess.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  const contactItems = [
    { icon: Phone, label: 'Phone', value: '+86 131 6282 8868', href: 'tel:+8613162828868', color: '#22c55e' },
    { icon: Mail, label: 'Email', value: 'zhou@jkess.com', href: 'mailto:zhou@jkess.com', color: '#5b5bff' },
    { icon: MapPin, label: 'Location', value: 'Building B4, Guangming, Shenzhen', color: '#f58a8a' },
  ]
  const inquiryChecklist = [
    guide.lifepo4Europe,
    guide.enclosureEu,
    guide.canRs485,
    guide.quote,
  ]

  return (
    <div className="bg-white min-h-screen">
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/contact-banner-bg.webp" alt="" fill className="object-cover" priority sizes="100vw" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-8 rounded-2xl border border-green-100 bg-green-50/70 p-5 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700">{ui.requestProjectQuote}</p>
                <h2 className="mt-2 text-xl font-bold text-gray-950">{ui.prepareInputs}</h2>
              </div>
              <a href="https://wa.me/8613162828868" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                WhatsApp <ArrowRight size={15} />
              </a>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {inquiryChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
              className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{t('contactPage.formTitle')}</h2>
              <p className="text-gray-500 text-sm mb-6">{t('contactPage.formDesc')}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="text" aria-label="Name" placeholder={t('contactPage.namePlaceholder')} required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                  <input type="text" aria-label="Company" placeholder={t('contactPage.companyPlaceholder')} value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                </div>
                <input type="email" aria-label="Email address" placeholder={t('contactPage.emailPlaceholder')} required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <select
                    aria-label={guide.lifepo4Europe}
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="">{guide.lifepo4Europe}</option>
                    <option value="Battery Kit (With Caster)">Battery Kit (With Caster)</option>
                    <option value="6U Battery Kit">6U Battery Kit</option>
                    <option value="High Voltage Kit">High Voltage Kit</option>
                    <option value="C&I High Voltage ESS Cabinet">C&I High Voltage ESS Cabinet</option>
                    <option value="Custom project">{guide.quote}</option>
                  </select>
                  <input
                    type="text"
                    aria-label={ui.destinationCountry}
                    placeholder={ui.destinationCountry}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    aria-label={ui.estimatedQuantity}
                    placeholder={ui.estimatedQuantity}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors"
                  />
                  <input
                    type="text"
                    aria-label={ui.projectTimeline}
                    placeholder={ui.projectTimeline}
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors"
                  />
                </div>
                <textarea aria-label="Message" placeholder={t('contactPage.messagePlaceholder')} required rows={5} value={formData.message}
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
                <p className="text-gray-500 text-sm mb-10 h-14 leading-5">{t('contactPage.whatsappDesc', 'Quickest way to get a response')}</p>
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
                <p className="text-gray-500 text-sm mb-10 h-14 leading-5">{t('contactPage.wechatDesc', 'Scan to add me on WeChat')}</p>
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
      <PageFaqSection
        faqs={pageFaqs.contact}
        title={ui.requestProjectQuote}
        description={ui.prepareInputsBody}
      />
    </div>
  )
}
