'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Reveal } from '@/components/ScrollReveal'

const PAYPAL_CLIENT_ID = 'AaR-dWE_jGLO3En53T2iUBs1dbCrhVsFBPxbcnPUkCzGEwQdAbCxW5cTkukeMoy9gt-uHza0Gccs8qWX'

declare global {
  interface Window {
    paypal: any
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart, itemCount } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState(false)
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

  // Load PayPal SDK once
  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    if (window.paypal) {
      setSdkReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => { setSdkError(true); setSdkReady(true) }
    document.body.appendChild(script)

    setTimeout(() => {
      if (!window.paypal) { setSdkError(true); setSdkReady(true) }
    }, 15000)
  }, [])

  // Render PayPal buttons
  useEffect(() => {
    if (!sdkReady || submitted || !paypalRef.current) return
    if (!window.paypal) return

    const container = paypalRef.current
    container.innerHTML = ''
    if (sdkError) return

    try {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: function (_data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              description: 'JKESS Order',
              amount: { value: totalAmount },
            }],
          })
        },
        onApprove: async function (_data: any, actions: any) {
          const order = await actions.order.capture()
          setOrderId(order.id)

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
          setTimeout(clearCart, 500)
        },
        onError: function (err: any) {
          console.error('[PayPal] Payment error:', err)
          alert('Payment failed. Please try again or contact us.')
        },
      }).render(container)
    } catch (e) {
      console.error('[PayPal] Render error:', e)
      setSdkError(true)
    }
  }, [sdkReady, submitted, sdkError, formData, totalAmount, items, clearCart])

  // ── Empty cart ──
  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Cart is Empty</h1>
          <p className="text-gray-400 mb-6">Add some products first.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // ── Success ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>
          {orderId && <p className="text-sm text-gray-500 mb-2">PayPal Order: {orderId}</p>}
          <p className="text-gray-400 mb-2">Thank you for your order! Your payment has been received.</p>
          <p className="text-sm text-gray-500 mb-8">We will contact you shortly with shipping details.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // ── Checkout form ──
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <Reveal>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: Forms */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name *" value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="email" placeholder="Email *" value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="tel" placeholder="Phone *" value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                    <input type="text" placeholder="Company" value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                  <textarea placeholder="Street address, City, Country, Postal code *" rows={3} value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                  <textarea placeholder="Order notes (optional)" rows={2} value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                </div>
              </div>

              {/* Right: Order Summary + PayPal */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
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
                    <span className="text-gray-900 font-semibold">Total</span>
                    <span className="text-xl font-bold text-green-600">${totalAmount}</span>
                  </div>

                  {/* PayPal area */}
                  <div className="space-y-3">
                    {!sdkReady ? (
                      <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl py-4">
                        <Loader2 size={18} className="animate-spin text-green-500" />
                        <span className="text-sm text-gray-500">Loading PayPal...</span>
                      </div>
                    ) : sdkError ? (
                      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
                        <p className="text-sm text-yellow-700 font-medium mb-2">⚠️ PayPal temporarily unavailable</p>
                        <p className="text-xs text-gray-500 mb-4">Please send payment via bank transfer or contact us.</p>
                        <a href="mailto:chinaenergymall@163.com"
                          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
                          <ExternalLink size={16} /> Contact Us to Pay
                        </a>
                      </div>
                    ) : (
                      <div ref={paypalRef} id="paypal-container" />
                    )}

                    <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                      <Lock size={12} /> Secure payment via PayPal
                    </p>

                    {(!formData.name || !formData.email || !formData.phone || !formData.address) && (
                      <p className="text-xs text-yellow-600 text-center">
                        Please fill in all required fields above before paying
                      </p>
                    )}
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
