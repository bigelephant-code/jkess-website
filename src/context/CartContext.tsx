'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface CartItem {
  slug: string
  name: string
  variant: string
  quantity: number
  price: string
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (slug: string, variant: string) => void
  updateQuantity: (slug: string, variant: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('jkess-cart')
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {}
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('jkess-cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === newItem.slug && i.variant === newItem.variant
      )
      if (existing) {
        return prev.map((i) =>
          i.slug === newItem.slug && i.variant === newItem.variant
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }
      return [...prev, newItem]
    })
  }, [])

  const removeItem = useCallback((slug: string, variant: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.variant === variant)))
  }, [])

  const updateQuantity = useCallback((slug: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug, variant)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.variant === variant ? { ...i, quantity } : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const total = items
    .reduce((sum, i) => {
      const price = parseFloat(i.price.replace(/[$,]/g, ''))
      return sum + price * i.quantity
    }, 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
