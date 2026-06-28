'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ExternalLink, Loader2, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Reveal } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { trackEvent } from '@/lib/analytics'

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  'AaR-dWE_jGLO3En53T2iUBs1dbCrhVsFBPxbcnPUkCzGEwQdAbCxW5cTkukeMoy9gt-uHza0Gccs8qWX'

const SALES_EMAIL = 'zhou@jkess.com'
const POLICY_VERSION = '2026-06-27'

interface PayPalCapturedOrder {
  id: string
  status?: string
}

type PayPalActions = {
  order: {
    create: (payload: unknown) => Promise<string>
    capture: () => Promise<PayPalCapturedOrder>
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
    onError: (error: unknown) => void
  }) => PayPalButtons
}

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
}

function compactReference(value: string, maxLength = 127) {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function priceNumber(price: string) {
  const value = Number.parseFloat(price.replace(/[$,]/g, ''))
  return Number.isFinite(value) ? value : 0
}

function createInvoiceNumber() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `JKESS-${timestamp}-${random}`
}

export default function CheckoutPage() {
  const { lang, t } = useI18n()
  const { items, clearCart } = useCart()
  const invoiceNumber = useRef(createInvoiceNumber())
  const paypalRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  const [submitted, setSubmitted] = useState(false)
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState(!PAYPAL_CLIENT_ID)
  const [paymentError, setPaymentError] = useState('')
  const [acceptedPolicies, setAcceptedPolicies] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  })

  const totalAmount = items
    .reduce((sum, item) => sum + priceNumber(item.price) * item.quantity, 0)
    .toFixed(2)

  const contactComplete = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim()
  )
  const formComplete = contactComplete && acceptedPolicies

  useEffect(() => {
    if (!formComplete || scriptLoaded.current || !PAYPAL_CLIENT_ID) return

    if (window.paypal) {
      window.setTimeout(() => setSdkReady(true), 0)
      return
    }

    scriptLoaded.current = true

    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://www.paypal.com'
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons`
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

    return () => window.clearTimeout(timeout)
  }, [formComplete])

  useEffect(() => {
    if (!sdkReady || submitted || !paypalRef.current || !window.paypal || sdkError) return

    const container = paypalRef.current
    container.innerHTML = ''
    if (!formComplete) return

    const contactReference = compactReference(
      `Name:${formData.name} | Email:${formData.email} | Phone:${formData.phone} | Company:${formData.company || '-'}`
    )
    const deliveryReference = compactReference(
      `Delivery reference:${formData.address} | Notes:${formData.notes || '-'}`
    )

    try {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: (_data, actions) =>
          actions.order.create({
            application_context: {
              brand_name: 'JKESS',
              user_action: 'PAY_NOW',
              shipping_preference: 'GET_FROM_FILE',
            },
            purchase_units: [
              {
                reference_id: invoiceNumber.current,
                invoice_id: invoiceNumber.current,
                custom_id: contactReference,
                description: deliveryReference,
                items: items.map((item) => ({
                  name: compactReference(`${item.name} - ${item.variant}`),
                  sku: compactReference(`${item.slug}-${item.variant}`, 127),
                  quantity: String(item.quantity),
                  category: 'PHYSICAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: priceNumber(item.price).toFixed(2),
                  },
                })),
                amount: {
                  currency_code: 'USD',
                  value: totalAmount,
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: totalAmount,
                    },
                  },
                },
              },
            ],
          }),
        onApprove: async (_data, actions) => {
          const order = await actions.order.capture()
          setPaypalOrderId(order.id)

          const orderSnapshot = {
            jkessOrderNumber: invoiceNumber.current,
            paypalOrderId: order.id,
            paypalStatus: order.status || 'COMPLETED',
            total: totalAmount,
            currency: 'USD',
            items,
            customer: formData,
            policyVersion: POLICY_VERSION,
            policiesAcceptedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }

          try {
            window.localStorage.setItem(
              `jkess-order-${invoiceNumber.current}`,
              JSON.stringify(orderSnapshot)
            )
            window.dispatchEvent(new Event('jkess:order-created'))
          } catch {
            // PayPal remains the authoritative payment record if local storage is unavailable.
          }

          trackEvent('purchase', {
            transaction_id: order.id,
            order_number: invoiceNumber.current,
            value: Number(totalAmount),
            currency: 'USD',
            items: items.length,
          })

          setSubmitted(true)
          window.setTimeout(clearCart, 500)
        },
        onError: () => {
          setPaymentError('Payment failed. Please try again or contact zhou@jkess.com.')
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
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold text-white mb-3">{t('checkout.paymentSuccessful')}</h1>
          <div className="my-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <p className="text-xs uppercase tracking-widest text-green-400 font-semibold">JKESS Order Number</p>
            <p className="mt-1 text-lg font-bold text-white break-all">{invoiceNumber.current}</p>
            {paypalOrderId && (
              <>
                <p className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">PayPal Order ID</p>
                <p className="mt-1 text-sm text-gray-300 break-all">{paypalOrderId}</p>
              </>
            )}
          </div>
          <p className="text-gray-400 mb-2">{t('checkout.thankYou')}</p>
          <p className="text-sm text-gray-500 mb-3">
            The product, option, quantity, amount, and order references have been recorded in PayPal automatically. No manual email is required.
          </p>
          <p className="text-sm text-gray-500 mb-8">{t('checkout.shippingDetails')}</p>
          <Link href={localizedPath(lang, '/')} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all">
            <ArrowLeft size={18} /> {t('checkout.backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-0 left-0 right-0 h-24 bg-black z-0" />
      <div className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>

          <Reveal>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{t('checkout.contactInfo')}</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="text" aria-label="Full name" placeholder={t('checkout.fullName')} value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="email" aria-label="Email address" placeholder={t('checkout.email')} value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="tel" aria-label="Phone number" placeholder={t('checkout.phone')} value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="text" aria-label="Company name" placeholder={t('checkout.company')} value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{t('checkout.shippingAddress')}</h2>
                  <textarea aria-label="Shipping address" placeholder={t('checkout.addressPlaceholder')} rows={3} value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <textarea aria-label="Order notes" placeholder={t('checkout.notesPlaceholder')} rows={2} value={formData.notes} onChange={(event) => setFormData({ ...formData, notes: event.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <p className="text-xs leading-5 text-gray-500">
                    PayPal records the purchased items and payment automatically. Please also confirm that the shipping address shown in PayPal is correct before approving payment.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('checkout.orderSummary')}</h2>
                  <p className="mb-4 text-[11px] text-gray-400">Order: {invoiceNumber.current}</p>
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.slug}-${item.variant}`} className="flex gap-3">
                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-contain p-1" sizes="56px" quality={70} />
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

                  <div className="border-t border-gray-200 pt-4 mb-5 flex items-center justify-between">
                    <span className="text-gray-900 font-semibold">{t('checkout.total')}</span>
                    <span className="text-xl font-bold text-green-600">${totalAmount}</span>
                  </div>

                  <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <input
                      type="checkbox"
                      checked={acceptedPolicies}
                      onChange={(event) => setAcceptedPolicies(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-green-500"
                    />
                    <span className="text-xs leading-5 text-gray-600">
                      I agree to the{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/terms-of-sale')}>Terms of Sale</Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/shipping-policy')}>Shipping Policy</Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/returns-refunds')}>Returns & Refunds Policy</Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/warranty')}>Warranty Policy</Link>, and{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/safety')}>Safety Notice</Link>, and acknowledge the{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/privacy-policy')}>Privacy Policy</Link>.
                    </span>
                  </label>

                  <div className="space-y-3">
                    {!contactComplete ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">{t('checkout.fillFields')}</p>
                      </div>
                    ) : !acceptedPolicies ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">Please review and accept the order policies before payment.</p>
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
                        <a href={`mailto:${SALES_EMAIL}`} onClick={() => trackEvent('checkout_contact_to_pay', { value: Number(totalAmount), currency: 'USD' })} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
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
