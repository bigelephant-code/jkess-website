'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now: email the order
    const subject = encodeURIComponent('New Order - JKESS')
    const orderItems = items
      .map((i) => `${i.name} (${i.variant}) x${i.quantity} = ${i.price}`)
      .join('\n')
    const body = encodeURIComponent(
      `Order Details:\n${orderItems}\n\nTotal: ${total}\n\n` +
      `Name: ${(e.target as any).name.value}\n` +
      `Email: ${(e.target as any).email.value}\n` +
      `Company: ${(e.target as any).company.value}\n` +
      `Phone: ${(e.target as any).phone.value}\n` +
      `Address: ${(e.target as any).address.value}\n` +
      `Notes: ${(e.target as any).notes.value}`
    )
    window.open(`mailto:chinaenergymall@163.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
    setTimeout(clearCart, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">
            {submitted ? '🎉 Order Submitted!' : 'Cart is Empty'}
          </h1>
          <p className="text-gray-400 mb-6">
            {submitted
              ? 'Thank you! We will contact you shortly with payment details and shipping information.'
              : 'Add some products first.'}
          </p>
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

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Left: Form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
              <textarea
                name="address"
                placeholder="Street address, City, Country, Postal code *"
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none"
              />
              <textarea
                name="notes"
                placeholder="Order notes (optional)"
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none"
              />
            </div>

            {/* Payment Notice */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-green-400" />
                <h2 className="text-lg font-semibold text-white">Payment</h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                After submitting your order, we will send you an invoice with payment instructions.
                We accept bank transfer and credit card payments. For EU customers, VAT may apply.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-full text-lg transition-all"
            >
              <Lock size={18} /> Place Order
            </button>
          </form>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
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
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-xl font-bold text-green-400">{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
