'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useI18n } from '@/i18n/client'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

// Checkout uses client-only features (localStorage, PayPal), skip static generation
export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const { items, total, itemCount } = useCart()
  const { lang, t } = useI18n()
  const prefix = lang === 'en' ? '' : '/' + lang
  const [email, setEmail] = useState('')

  // Load saved email on mount (avoid SSR localStorage error)
  useEffect(() => {
    const saved = localStorage.getItem('checkout_email')
    if (saved) setEmail(saved)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.slug + '-' + item.variant} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} × {item.quantity} <span className="text-gray-400">({item.variant})</span></span>
                <span className="text-gray-900 font-medium">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between">
            <span className="font-semibold text-gray-900">Total ({itemCount} items)</span>
            <span className="font-bold text-lg text-green-600">{total}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (typeof window !== 'undefined') localStorage.setItem('checkout_email', e.target.value) }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
          <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              createOrder={(_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: '0.01' } }],
                })
              }}
            />
          </PayPalScriptProvider>
        </div>

        <div className="mt-6 text-center">
          <Link href={`${prefix}/cart`} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
