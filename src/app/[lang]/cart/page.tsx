'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useI18n } from '@/i18n/client'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart()
  const { lang, t } = useI18n()
  const prefix = lang === 'en' ? '' : '/' + lang

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any products yet.</p>
          <Link href={`${prefix}/#products`} className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition-colors">
            <ArrowLeft size={18} /> Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors">Clear All</button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.slug + '-' + item.variant} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-contain p-2" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`${prefix}/products/${item.slug}`} className="text-sm font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-1">{item.name}</Link>
                <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                <p className="text-sm font-bold text-green-600 mt-1">{item.price}</p>
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button onClick={() => updateQuantity(item.slug, item.variant, Math.max(1, item.quantity - 1))} className="px-3 py-2 text-gray-400 hover:text-gray-700"><Minus size={14} /></button>
                <span className="px-4 py-2 text-sm font-medium text-gray-900">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.slug, item.variant, item.quantity + 1)} className="px-3 py-2 text-gray-400 hover:text-gray-700"><Plus size={14} /></button>
              </div>
              <button onClick={() => removeItem(item.slug, item.variant)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            <span className="text-xl font-bold text-gray-900">{total}</span>
          </div>
          <p className="text-xs text-gray-400 mb-6">Shipping & taxes calculated at checkout</p>
          <Link
            href={`${prefix}/checkout`}
            className="block w-full text-center bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
