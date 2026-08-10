'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ExternalLink, Loader2, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Reveal } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'
import { trackEvent } from '@/lib/analytics'
import {
  directCheckoutCountryGroups,
  FLAT_RATE_SHIPPING_USD,
  getShippingAmount,
  getShippingCountryName,
  getShippingTier,
  isDirectCheckoutCountry,
  OTHER_COUNTRY_CODE,
} from '@/lib/shipping-zones'

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
const SALES_EMAIL = 'zhou@jkess.com'
const POLICY_VERSION = '2026-06-29'

type PayPalButtons = {
  isEligible: () => boolean
  render: (container: HTMLElement) => Promise<void> | void
  close?: () => void
}

type PayPalNamespace = {
  Buttons: (options: {
    fundingSource?: string
    style: Record<string, string | number>
    createOrder: () => Promise<string>
    onApprove: (data: { orderID: string }) => Promise<void>
    onCancel: () => void
    onError: (error: unknown) => void
  }) => PayPalButtons
  getFundingSources?: () => string[]
}

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
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
  const { items, clearCart, inventoryLoaded, refreshInventory } = useCart()
  const [invoiceNumber] = useState(() => createInvoiceNumber())
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
    countryCode: '',
    address: '',
    notes: '',
  })

  const regionDisplayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([lang], { type: 'region' })
    } catch {
      return null
    }
  }, [lang])

  useEffect(() => {
    void refreshInventory()
  }, [refreshInventory])

  const productSubtotalNumber = items.reduce(
    (sum, item) => sum + priceNumber(item.price) * item.quantity,
    0
  )
  const shippingTier = getShippingTier(formData.countryCode)
  const shippingAmountNumber = getShippingAmount(formData.countryCode)
  const orderTotalNumber = productSubtotalNumber + shippingAmountNumber
  const productSubtotal = productSubtotalNumber.toFixed(2)
  const shippingAmount = shippingAmountNumber.toFixed(2)
  const orderTotal = orderTotalNumber.toFixed(2)
  const shippingCountry = getShippingCountryName(formData.countryCode)
  const canCheckout = isDirectCheckoutCountry(formData.countryCode)
  const flatRateShippingMessage = t(
    'checkout.flatRateShipping',
    'A fixed ${amount} shipping charge will be added once per order for this destination.'
  ).replace('{amount}', FLAT_RATE_SHIPPING_USD.toFixed(2))
  const shippingSummaryMessage = t(
    'checkout.shippingSummary',
    'EU addresses receive free standard shipping. Eligible non-EU destinations are charged ${amount} once per order. Other destinations require a written quotation.'
  ).replace('{amount}', String(FLAT_RATE_SHIPPING_USD))
  const euCountryGroupLabel = t(
    'checkout.euCountryGroup',
    'European Union — Free shipping'
  )
  const flatRateCountryGroupLabel = t(
    'checkout.flatRateCountryGroup',
    'United States, Southeast Asia, Middle East, Japan & South Korea — ${amount} shipping'
  ).replace('{amount}', String(FLAT_RATE_SHIPPING_USD))

  const contactComplete = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.countryCode &&
    formData.address.trim()
  )
  const formComplete = contactComplete && acceptedPolicies && inventoryLoaded && canCheckout

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

    const scriptParams = new URLSearchParams({
      'client-id': PAYPAL_CLIENT_ID,
      currency: 'USD',
      intent: 'capture',
      components: 'buttons,funding-eligibility',
      // iDEAL, Bancontact, EPS and Przelewy24 are disabled by default in the
      // SDK and only become eligible when named here. Checked against the live
      // client id on 2026-08-10: with this list they report eligible under USD,
      // with the previous list they did not. blik, trustly and multibanco need
      // PLN or EUR, so they stay out while the store prices in USD.
      'enable-funding': 'card,paylater,venmo,ideal,bancontact,eps,p24',
      'integration-date': '2026-08-09',
    })
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?${scriptParams.toString()}`
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
    const paypal = window.paypal
    container.innerHTML = ''
    if (!formComplete) return

    const checkoutPayload = {
      orderNumber: invoiceNumber,
      customer: formData,
      items: items.map((item) => ({
        slug: item.slug,
        variant: item.variant,
        quantity: item.quantity,
      })),
    }
    let disposed = false
    const renderedButtons: PayPalButtons[] = []

    const paymentOptions = {
      style: { layout: 'vertical', shape: 'rect', height: 48 },
      createOrder: async () => {
        setPaymentError('')
        const response = await fetch('/api/paypal/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkoutPayload),
        })
        const result = (await response.json().catch(() => null)) as
          | { id?: string; error?: string }
          | null

        if (!response.ok || !result?.id) {
          throw new Error(result?.error || 'Unable to create the PayPal order.')
        }

        return result.id
      },
      onApprove: async (data: { orderID: string }) => {
        const response = await fetch(
          `/api/paypal/orders/${encodeURIComponent(data.orderID)}/capture`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkoutPayload),
          }
        )
        const order = (await response.json().catch(() => null)) as
          | { id?: string; status?: string; error?: string }
          | null

        if (
          !response.ok ||
          !order?.id ||
          order.id !== data.orderID ||
          order.status !== 'COMPLETED'
        ) {
          throw new Error(order?.error || 'Unable to complete the PayPal payment.')
        }

        setPaypalOrderId(order.id)

        const orderSnapshot = {
          jkessOrderNumber: invoiceNumber,
          paypalOrderId: order.id,
          paypalStatus: order.status,
          total: orderTotal,
          productSubtotal,
          shippingAmount,
          shippingTier,
          shippingCountry,
          currency: 'USD',
          items,
          customer: formData,
          policyVersion: POLICY_VERSION,
          policiesAcceptedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }

        try {
          window.localStorage.setItem(
            `jkess-order-${invoiceNumber}`,
            JSON.stringify(orderSnapshot)
          )
          window.dispatchEvent(new Event('jkess:order-created'))
        } catch {
          // PayPal remains the authoritative payment record if local storage is unavailable.
        }

        trackEvent('purchase', {
          transaction_id: order.id,
          order_number: invoiceNumber,
          value: orderTotalNumber,
          shipping: shippingAmountNumber,
          shipping_country: shippingCountry,
          currency: 'USD',
          items: items.length,
        })

        setSubmitted(true)
        window.setTimeout(clearCart, 500)
      },
      onCancel: () => setPaymentError(''),
      onError: (error: unknown) => {
        console.error('PayPal checkout failed:', error)
        setPaymentError(
          t(
            'checkout.paymentFailed',
            'Payment failed. Please try again or contact zhou@jkess.com.'
          )
        )
      },
    }

    async function renderEligiblePaymentMethods() {
      try {
        const fundingSources = paypal.getFundingSources?.() || []
        const sources: Array<string | undefined> = fundingSources.length
          ? fundingSources
          : [undefined]
        let renderedCount = 0

        for (const fundingSource of sources) {
          if (disposed) return

          const button = paypal.Buttons({
            ...paymentOptions,
            ...(fundingSource ? { fundingSource } : {}),
          })
          if (!button.isEligible()) continue

          const buttonContainer = document.createElement('div')
          buttonContainer.className = 'mb-3 last:mb-0'
          buttonContainer.dataset.paypalFundingSource = fundingSource || 'automatic'
          container.appendChild(buttonContainer)
          renderedButtons.push(button)
          await Promise.resolve(button.render(buttonContainer))
          renderedCount += 1
        }

        if (!disposed && renderedCount === 0) setSdkError(true)
      } catch (error) {
        console.error('Unable to render eligible PayPal payment methods:', error)
        if (!disposed) setSdkError(true)
      }
    }

    void renderEligiblePaymentMethods()

    return () => {
      disposed = true
      renderedButtons.forEach((button) => button.close?.())
      container.innerHTML = ''
    }
  }, [
    sdkReady,
    submitted,
    sdkError,
    formComplete,
    formData,
    invoiceNumber,
    productSubtotal,
    shippingAmount,
    shippingAmountNumber,
    shippingCountry,
    shippingTier,
    orderTotal,
    orderTotalNumber,
    items,
    clearCart,
    t,
  ])

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
            <p className="text-xs uppercase tracking-widest text-green-400 font-semibold">
              {t('checkout.orderNumber', 'JKESS Order Number')}
            </p>
            <p className="mt-1 text-lg font-bold text-white break-all">{invoiceNumber}</p>
            {paypalOrderId && (
              <>
                <p className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  {t('checkout.paypalOrderId', 'PayPal Order ID')}
                </p>
                <p className="mt-1 text-sm text-gray-300 break-all">{paypalOrderId}</p>
              </>
            )}
          </div>
          <p className="text-gray-400 mb-2">{t('checkout.thankYou')}</p>
          <p className="text-sm text-gray-500 mb-3">
            {t(
              'checkout.paypalRecorded',
              'The products, shipping charge, quantities, amount, and order references have been recorded in PayPal automatically.'
            )}
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
                    <input type="text" aria-label={t('checkout.fullName', 'Full name')} placeholder={t('checkout.fullName')} value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="email" aria-label={t('checkout.email', 'Email address')} placeholder={t('checkout.email')} value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="tel" aria-label={t('checkout.phone', 'Phone number')} placeholder={t('checkout.phone')} value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="text" aria-label={t('checkout.company', 'Company name')} placeholder={t('checkout.company')} value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{t('checkout.shippingAddress')}</h2>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('checkout.deliveryCountry', 'Delivery country / region *')}
                    </span>
                    <select
                      required
                      value={formData.countryCode}
                      onChange={(event) => {
                        const countryCode = event.target.value
                        setFormData({ ...formData, countryCode })
                        const amount = getShippingAmount(countryCode)
                        trackEvent('add_shipping_info', {
                          currency: 'USD',
                          value: amount,
                          shipping_tier: getShippingTier(countryCode),
                          destination_country: getShippingCountryName(countryCode),
                          items: [],
                        })
                      }}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-green-500"
                    >
                      <option value="">
                        {t('checkout.selectDeliveryCountry', 'Select delivery country / region')}
                      </option>
                      {directCheckoutCountryGroups.map((group, groupIndex) => (
                        <optgroup
                          key={group.label}
                          label={groupIndex === 0 ? euCountryGroupLabel : flatRateCountryGroupLabel}
                        >
                          {group.countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {regionDisplayNames?.of(country.code) || country.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value={OTHER_COUNTRY_CODE}>
                        {t('checkout.otherCountryQuoteRequired', 'Other country / region — Quote required')}
                      </option>
                    </select>
                  </label>

                  {shippingTier === 'eu-free' && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900">
                      {t(
                        'checkout.euFreeShipping',
                        'Free standard shipping is included for this EU delivery address.'
                      )}
                    </div>
                  )}
                  {shippingTier === 'flat-150' && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                      {flatRateShippingMessage}
                    </div>
                  )}
                  {shippingTier === 'quote-only' && (
                    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                      {t(
                        'checkout.quoteOnlyShipping',
                        'Direct online checkout is unavailable for this destination because local shipping, import, or carrier policies require individual review. Please use Get a Quote for availability and written terms.'
                      )}
                    </div>
                  )}

                  <textarea aria-label={t('checkout.shippingAddress', 'Shipping address')} placeholder={t('checkout.addressPlaceholder')} rows={3} value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <textarea aria-label={t('checkout.notesPlaceholder', 'Order notes')} placeholder={t('checkout.notesPlaceholder')} rows={2} value={formData.notes} onChange={(event) => setFormData({ ...formData, notes: event.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <p className="text-xs leading-5 text-gray-500">
                    {t(
                      'checkout.paypalCountryMatch',
                      'The country selected here must match the shipping country in PayPal. Import duty, tax, customs clearance, and destination handling charges are not included unless stated in writing.'
                    )}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('checkout.orderSummary')}</h2>
                  <p className="mb-4 text-[11px] text-gray-400">
                    {t('checkout.orderLabel', 'Order')}: {invoiceNumber}
                  </p>
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

                  <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        {t('checkout.productSubtotal', 'Product subtotal')}
                      </span>
                      <span className="font-semibold text-gray-900">${productSubtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t('checkout.shipping', 'Shipping')}</span>
                      <span className="font-semibold text-gray-900">
                        {shippingTier === 'eu-free'
                          ? t('checkout.free', 'FREE')
                          : shippingTier === 'flat-150'
                            ? `$${shippingAmount}`
                            : shippingTier === 'quote-only'
                              ? t('checkout.quoteRequired', 'Quote required')
                              : t('checkout.selectCountry', 'Select country')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="font-semibold text-gray-900">
                        {t('checkout.orderTotal', 'Order total')}
                      </span>
                      <span className="text-xl font-bold text-green-600">${orderTotal}</span>
                    </div>
                  </div>
                  <p className="mb-5 mt-3 text-xs leading-5 text-gray-500">
                    {shippingSummaryMessage}
                  </p>

                  <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <input
                      type="checkbox"
                      checked={acceptedPolicies}
                      onChange={(event) => setAcceptedPolicies(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-green-500"
                    />
                    <span className="text-xs leading-5 text-gray-600">
                      {t('checkout.policyConsentStart', 'I agree to the following policies:')}{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/terms-of-sale')}>
                        {t('checkout.termsOfSale', 'Terms of Sale')}
                      </Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/shipping-policy')}>
                        {t('checkout.shippingPolicy', 'Shipping Policy')}
                      </Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/returns-refunds')}>
                        {t('checkout.returnsPolicy', 'Returns & Refunds Policy')}
                      </Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/warranty')}>
                        {t('checkout.warrantyPolicy', 'Warranty Policy')}
                      </Link>,{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/safety')}>
                        {t('checkout.safetyNotice', 'Safety Notice')}
                      </Link>.{' '}
                      {t('checkout.policyConsentEnd', 'I also acknowledge the')}{' '}
                      <Link className="font-medium text-green-700 hover:underline" href={localizedPath(lang, '/privacy-policy')}>
                        {t('checkout.privacyPolicy', 'Privacy Policy')}
                      </Link>.
                    </span>
                  </label>

                  <div className="space-y-3">
                    {shippingTier === 'unselected' ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">
                          {t(
                            'checkout.selectCountryToContinue',
                            'Select the delivery country to calculate shipping and continue.'
                          )}
                        </p>
                      </div>
                    ) : shippingTier === 'quote-only' ? (
                      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-center">
                        <p className="text-sm font-semibold text-amber-950">
                          {t(
                            'checkout.separateQuoteTitle',
                            'This destination requires a separate quotation.'
                          )}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-amber-800">
                          {t(
                            'checkout.separateQuoteBody',
                            'Direct checkout is disabled due to destination-specific shipping and local policy requirements.'
                          )}
                        </p>
                        <Link href={localizedPath(lang, '/shipping-quote')} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-green-400">
                          <ExternalLink size={16} /> {t('checkout.getQuote', 'Get a Quote')}
                        </Link>
                      </div>
                    ) : !contactComplete ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">{t('checkout.fillFields')}</p>
                      </div>
                    ) : !acceptedPolicies ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-xs text-yellow-700">
                          {t(
                            'checkout.acceptPolicies',
                            'Please review and accept the order policies before payment.'
                          )}
                        </p>
                      </div>
                    ) : !inventoryLoaded ? (
                      <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl py-4">
                        <Loader2 size={18} className="animate-spin text-green-500" />
                        <span className="text-sm text-gray-500">
                          {t('checkout.checkingInventory', 'Checking current inventory…')}
                        </span>
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
                        <a href={`mailto:${SALES_EMAIL}`} onClick={() => trackEvent('checkout_contact_to_pay', { value: orderTotalNumber, currency: 'USD' })} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
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
