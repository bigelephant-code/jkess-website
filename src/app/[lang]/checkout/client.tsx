'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Reveal } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { trackEvent } from '@/lib/analytics'

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  'AaR-dWE_jGLO3En53T2iUBs1dbCrhVsFBPxbcnPUkCzGEwQdAbCxW5cTkukeMoy9gt-uHza0Gccs8qWX'

type PayPalActions = {
  order: {
    create: (payload: unknown) => Promise<string>
    capture: () => Promise<{ id: string }>
  }
}

type PayPalButtons = {
  render: (container: HTMLElement) => void
}

type PayPalNamespace = {
  Buttons: (options: {
    style: Record<string, string>
    createOrder: (_data: unknown, actions: PayPalActions) => Promise<string>
    onApprove: (_data: unknown, actions: PayPalActions) => Promise<void>
    onError: (err: unknown) => void
  }) => PayPalButtons
}

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
}

export default function CheckoutPage() {
  const { lang, t } = useI18n()
  const { items, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState(!PAYPAL_CLIENT_ID)
  const [paymentError, setPaymentError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  })
  const paypalRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  const totalAmount = items
    .reduce((sum, i) => sum + parseFloat(i.price.replace(/[$,]/g, '')) * i.quantity, 0)
    .toFixed(2)

  const formComplete = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim()
  )

  useEffect(() => {
    if (window.paypal) {
      window.setTimeout(() => setSdkReady(true), 0)
      return
    }

    if (scriptLoaded.current || window.paypal || !PAYPAL_CLIENT_ID) return
    scriptLoaded.current = true

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => {
      setSdkError(true)
      setSdkReady(true)
    }
    document.body.appendChild(script)

    const timeout = window.setTimeout(() => {
      if (!window.paypal) {
        setSdkError(true)
        setSdkReady(true)
      }
    }, 15000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!sdkReady || submitted || !paypalRef.current || !window.paypal || sdkError || !formComplete) return

    const container = paypalRef.current
    container.innerHTML = ''

    try {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: (_data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: 'JKESS Order',
              amount: { value: totalAmount },
            }],
          })
        },
        onApprove: async (_data, actions) => {
          const order = await actions.order.capture()
          setOrderId(order.id)
          trackEvent('purchase', {
            transaction_id: order.id,
            value: Number(totalAmount),
            currency: 'USD',
            items: items.length,
          })

          const subject = encodeURIComponent('New Paid Order - JKESS (PayPal: ' + order.id + ')')
          const itemsStr = items.map((i) => i.name + ' (' + i.variant + ') x' + i.quantity + ' = ' + i.price).join('\n')
          const body = encodeURIComponent(
            'NEW PAID ORDER\n\nPayPal Order ID: ' + order.id + '\nStatus: PAID\n\n' +
            'Order Details:\n' + itemsStr + '\n\n' +
            'Total Paid: $' + totalAmount + '\n\n' +
            'Customer:\nName: ' + formData.name + '\nEmail: ' + formData.email + '\n' +
            'Phone: ' + formData.phone + '\nCompany: ' + (formData.company || '-') + '\n' +
            'Address: ' + formData.address + '\nNotes: ' + (formData.notes || '-')
          )
          window.open('mailto:chinaenergymall@163.com?subject=' + subject + '&body=' + body)
          setSubmitted(true)
          window.setTimeout(clearCart, 500)
        },
        onError: () => {
          setPaymentError('Payment failed. Please try again or contact us.')
        },
      }).render(container)
    } catch {
      window.setTimeout(() => setSdkError(true), 0)
    }
  }, [sdkReady, submitted, sdkError, formComplete, formData, totalAmount, items, clearCart])

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">{t('checkout.cartIsEmpty')}</h1>
          <p className="text-gray-400 mb-6">{t('checkout.addProductsFirst')}</p>
          <Link href={localizedPath(lang, '/')} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all">
            <ArrowLeft size={18} /> {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold text-white mb-3">{t('checkout.paymentSuccessful')}</h1>
          {orderId && <p className="text-sm text-gray-500 mb-2">PayPal Order: {orderId}</p>}
          <p className="text-gray-400 mb-2">{t('checkout.thankYou')}</p>
          <p className="text-sm text-gray-500 mb-8">{t('checkout.shippingDetails')}</p>
          <Link href={localizedPath(lang, '/')} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all">
            <ArrowLeft size={18} /> {t('checkout.backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gray-50"><div className="absolute top-0 left-0 right-0 h-24 bg-black z-0" />
      <div className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>

          <Reveal>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{t('checkout.contactInfo')}</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="text" aria-label="Full name" placeholder={t('checkout.fullName')} value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="email" aria-label="Email address" placeholder={t('checkout.email')} value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="tel" aria-label="Phone number" placeholder={t('checkout.phone')} value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="text" aria-label="Company name" placeholder={t('checkout.company')} value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{t('checkout.shippingAddress')}</h2>
                  <textarea aria-label="Shipping address" placeholder={t('checkout.addressPlaceholder')} rows={3} value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <textarea aria-label="Order notes" placeholder={t('checkout.notesPlaceholder')} rows={2} value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('checkout.orderSummary')}</h2>
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.slug + item.variant} className="flex gap-3">
                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-contain p-1" sizes="56px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 font-medium truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.variant}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-400">x{item.quantity}</span>
                            <span className="text-sm text-green-600 font-medium">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-6 flex items-center justify-between">
                    <span className="text-gray-900 font-semibold">{t('checkout.total')}</span>
                    <span className="text-xl font-bold text-green-600">${totalAmount}</span>
                  </div>

                  <div className="space-y-3">
                    {!formComplete ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">{t('checkout.fillFields')}</p>
                      </div>
                    ) : !sdkReady ? (
                      <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl py-4">
                        <Loader2 size={18} className="animate-spin text-green-500" />
                        <span className="text-sm text-gray-500">{t('checkout.paypalLoading')}</span>
                      </div>
                    ) : sdkError ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-sm text-yellow-700 font-medium mb-2">{t('checkout.paypalUnavailable')}</p>
                        <p className="text-xs text-gray-500 mb-4">{t('checkout.paypalDesc')}</p>
                        <a href="mailto:chinaenergymall@163.com"
                          onClick={() => trackEvent('checkout_contact_to_pay', { value: Number(totalAmount), currency: 'USD' })}
                          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
                          <ExternalLink size={16} /> {t('checkout.contactToPay')}
                        </a>
                      </div>
                    ) : (
                      <div ref={paypalRef} id="paypal-container" />
                    )}

                    {paymentError && <p className="text-xs text-red-600 text-center">{paymentError}</p>}
                    <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                      <Lock size={12} /> {t('checkout.securePayment')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
