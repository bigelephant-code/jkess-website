'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useCart } from '@/context/CartContext'

const PAYPAL_CLIENT_ID = 'AW1OBtJpmcG4965HhGo'

export default function CheckoutPage() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <CheckoutContent />
    </PayPalScriptProvider>
  )
}

function CheckoutContent() {
  const { items, total, clearCart, itemCount } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  })

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Cart is Empty</h1>
          <p className="text-gray-400 mb-6">Add some products first.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={18} /> Continue Shopping
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
          <h1 className="text-3xl font-bold text-white mb-3">Payment Successful! 🎉</h1>
          {orderId && (
            <p className="text-sm text-gray-500 mb-2">PayPal Order ID: {orderId}</p>
          )}
          <p className="text-gray-400 mb-2">
            Thank you for your order! We have received your payment.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email will be sent to <span className="text-green-400">{formData.email}</span>.
            We will contact you shortly with shipping details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all"
          >
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
          {/* ── Left: Form ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
              <textarea
                placeholder="Street address, City, Country, Postal code *"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none"
              />
              <textarea
                placeholder="Order notes (optional)"
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none"
              />
            </div>
          </div>

          {/* ── Right: Order Summary + PayPal ── */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.variant}`} className="flex gap-3">
                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-black">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
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
                <span className="text-xl font-bold text-green-400">
                  {items.reduce((sum, i) => sum + parseFloat(i.price.replace(/[$,]/g, '')) * i.quantity, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </div>

              {/* PayPal Buttons */}
              <div className="space-y-3">
                <PayPalButtons
                  style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                  }}
                  disabled={
                    !formData.name || !formData.email || !formData.phone || !formData.address
                  }
                  createOrder={(_data: any, actions: any) => {
                    const totalAmount = items
                      .reduce((sum, i) => sum + parseFloat(i.price.replace(/[$,]/g, '')) * i.quantity, 0)
                      .toFixed(2)

                    return actions.order.create({
                      intent: 'CAPTURE',
                      purchase_units: [
                        {
                          description: 'JKESS Order',
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
                          items: items.map((item) => ({
                            name: `${item.name} - ${item.variant}`,
                            unit_amount: {
                              currency_code: 'USD',
                              value: item.price.replace(/[$,]/g, ''),
                            },
                            quantity: item.quantity.toString(),
                            category: 'PHYSICAL_GOODS',
                          })),
                        },
                      ],
                    })
                  }}
                  onApprove={async (_data: any, actions: any) => {
                    const order = await actions.order.capture()
                    setOrderId(order.id)

                    // Send order email
                    const subject = encodeURIComponent(`New Paid Order - JKESS (PayPal: ${order.id})`)
                    const orderItems = items
                      .map((i) => `${i.name} (${i.variant}) x${i.quantity} = ${i.price}`)
                      .join('\n')
                    const body = encodeURIComponent(
                      `🎉 NEW PAID ORDER\n\n` +
                      `PayPal Order ID: ${order.id}\n` +
                      `Status: PAID ✅\n\n` +
                      `Order Details:\n${orderItems}\n\n` +
                      `Total Paid: ${
                        items.reduce((sum, i) => sum + parseFloat(i.price.replace(/[$,]/g, '')) * i.quantity, 0)
                          .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                      }\n\n` +
                      `Customer Info:\n` +
                      `Name: ${formData.name}\n` +
                      `Email: ${formData.email}\n` +
                      `Phone: ${formData.phone}\n` +
                      `Company: ${formData.company || 'N/A'}\n` +
                      `Address: ${formData.address}\n` +
                      `Notes: ${formData.notes || 'N/A'}`
                    )
                    window.open(`mailto:chinaenergymall@163.com?subject=${subject}&body=${body}`)

                    setSubmitted(true)
                    setTimeout(clearCart, 500)
                    return order
                  }}
                  onError={(err: any) => {
                    console.error('PayPal error:', err)
                    alert('Payment failed. Please try again.')
                  }}
                />

                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Lock size={12} /> Secure payment via PayPal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
