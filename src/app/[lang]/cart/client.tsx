'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Reveal } from '@/components/ScrollReveal'
import { useI18n } from '@/i18n/client'
import { localizedPath } from '@/lib/lang'

export default function CartPage() {
  const { lang, t } = useI18n()
  const { items, removeItem, updateQuantity, clearCart, itemCount, total } = useCart()

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-white mb-3">{t('cart.empty')}</h1>
          <p className="text-gray-400 mb-8">
            {t('cart.emptyDesc')}
          </p>
          <Link
            href={localizedPath(lang, '/')}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={18} /> {t('cart.browse')}
          </Link>
        </div>
      </div>
    )
  }

  // ── Cart with items ──
  return (
    <div className="relative min-h-screen bg-gray-50"><div className="absolute top-0 left-0 right-0 h-24 bg-black z-0" />
      {/* ═══════ CONTENT ═══════ */}
      <div className="pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('cart.title')}</h1>
            <button
              onClick={clearCart}
              aria-label="Clear all cart items"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              {t('cart.clearAll')}
            </button>
          </div>

          <Reveal>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.variant}`}
                  className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
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
                      className="text-gray-900 font-semibold hover:text-green-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                    <p className="text-green-600 font-semibold mt-2">{item.price}</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.slug, item.variant)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.slug, item.variant, item.quantity - 1)}
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-900"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1.5 text-gray-900 text-sm min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.variant, item.quantity + 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-900"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">
                  {t('cart.subtotal')} ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
                <span className="text-gray-900 font-semibold">{total}</span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                {t('cart.shippingNote')}
              </p>
              <Link
                href={localizedPath(lang, '/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-full text-lg transition-all"
              >
                {t('cart.checkout')}
              </Link>
              <Link
                href={localizedPath(lang, '/')}
                className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 font-medium px-8 py-3 mt-3 transition-colors"
              >
                <ArrowLeft size={16} /> {t('cart.browse')}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
