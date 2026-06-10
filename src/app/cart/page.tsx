'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, itemCount, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-white mb-3">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">
            Looks like you haven&apos;t added any products yet.
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.slug}-${item.variant}`}
              className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
            >
              {/* Image */}
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-white font-semibold hover:text-green-400 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                <p className="text-green-400 font-semibold mt-2">{item.price}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => removeItem(item.slug, item.variant)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-center border border-white/10 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.slug, item.variant, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-400 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-1.5 text-white text-sm min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.slug, item.variant, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-400 hover:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span className="text-white font-semibold">{total}</span>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Shipping &amp; taxes calculated at checkout
          </p>
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-full text-lg transition-all"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium px-8 py-3 mt-3 transition-colors"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
