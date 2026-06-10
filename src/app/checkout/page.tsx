'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { useCart } from '@/context/CartContext'

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

    // Already loaded
    if (window.paypal) {
      setSdkReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => {
      console.log('[PayPal] SDK loaded')
      setSdkReady(true)
    }
    script.onerror = () => {
      console.error('[PayPal] SDK load failed')
      setSdkError(true)
      setSdkReady(true)
    }
    document.body.appendChild(script)

    // 15s timeout
    setTimeout(() => {
      if (!window.paypal) {
        console.warn('[PayPal] SDK timeout')
        setSdkError(true)
        setSdkReady(true)
      }
    }, 15000)
  }, [])

  // Render buttons when SDK ready
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

  // Empty cart
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

  // Success
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

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50" />
                <input type="email" placeholder="Email *" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50" />
                <input type="tel" placeholder="Phone *" value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50" />
                <input type="text" placeholder="Company" value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
              <textarea placeholder="Street address, City, Country, Postal code *" rows={3} value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none" />
              <textarea placeholder="Order notes (optional)" rows={2} value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none" />
            </div>
          </div>

          {/* Right: Order Summary + PayPal */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.slug + item.variant} className="flex gap-3">
                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-black">
                      <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-contain p-1" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">x{item.quantity}</span>
                        <span className="text-sm text-green-400 font-medium">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-6 flex items-center justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-xl font-bold text-green-400">${totalAmount}</span>
              </div>

              {/* PayPal area */}
              <div className="space-y-3">
                {!sdkReady ? (
                  <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-4">
                    <Loader2 size={18} className="animate-spin text-green-400" />
                    <span className="text-sm text-gray-400">Loading PayPal...</span>
                  </div>
                ) : sdkError ? (
                  /* Fallback: manual payment via email */
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-yellow-400 font-medium mb-2">⚠️ PayPal temporarily unavailable</p>
                    <p className="text-xs text-gray-400 mb-4">Please send payment via bank transfer or contact us.</p>
                    <a href="mailto:chinaenergymall@163.com"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
                      <ExternalLink size={16} /> Contact Us to Pay
                    </a>
                  </div>
                ) : (
                  <div ref={paypalRef} id="paypal-container" />
                )}

                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Lock size={12} /> Secure payment via PayPal
                </p>

                {/* Form validation warning */}
                {(!formData.name || !formData.email || !formData.phone || !formData.address) && (
                  <p className="text-xs text-yellow-400 text-center">
                    Please fill in all required fields above before paying
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
