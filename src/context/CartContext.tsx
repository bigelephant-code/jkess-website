'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  INITIAL_INVENTORY,
  isManagedInventorySlug,
  normalizedInventory,
  type InventorySnapshot,
} from '@/lib/inventory-catalog'

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
  refreshInventory: () => Promise<void>
  inventory: InventorySnapshot
  inventoryLoaded: boolean
  itemCount: number
  total: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function clampItemsToInventory(items: CartItem[], inventory: InventorySnapshot) {
  const used: Partial<Record<keyof InventorySnapshot, number>> = {}

  return items
    .map((item) => {
      const requested = Math.max(0, Math.floor(Number(item.quantity) || 0))
      if (!isManagedInventorySlug(item.slug)) {
        return { ...item, quantity: requested }
      }

      const alreadyUsed = used[item.slug] || 0
      const available = Math.max(0, inventory[item.slug] - alreadyUsed)
      const quantity = Math.min(requested, available)
      used[item.slug] = alreadyUsed + quantity
      return { ...item, quantity }
    })
    .filter((item) => item.quantity > 0)
}

function parseSavedCart(value: string | null) {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? clampItemsToInventory(parsed as CartItem[], INITIAL_INVENTORY) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventorySnapshot>({ ...INITIAL_INVENTORY })
  const [inventoryLoaded, setInventoryLoaded] = useState(false)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    return parseSavedCart(localStorage.getItem('jkess-cart'))
  })

  const refreshInventory = useCallback(async () => {
    try {
      const response = await fetch('/api/inventory', { cache: 'no-store' })
      if (!response.ok) throw new Error(`Inventory request failed with ${response.status}.`)
      const payload = (await response.json()) as { inventory?: Partial<InventorySnapshot> }
      const next: InventorySnapshot = {
        'battery-kit': normalizedInventory(payload.inventory?.['battery-kit'], INITIAL_INVENTORY['battery-kit']),
        '6u-battery-kit': normalizedInventory(payload.inventory?.['6u-battery-kit'], INITIAL_INVENTORY['6u-battery-kit']),
        'high-voltage-kit': normalizedInventory(payload.inventory?.['high-voltage-kit'], INITIAL_INVENTORY['high-voltage-kit']),
      }
      setInventory(next)
      setItems((current) => clampItemsToInventory(current, next))
    } catch (error) {
      console.error('Unable to refresh inventory:', error)
    } finally {
      setInventoryLoaded(true)
    }
  }, [])

  useEffect(() => {
    void refreshInventory()
  }, [refreshInventory])

  useEffect(() => {
    try {
      localStorage.setItem('jkess-cart', JSON.stringify(items))
    } catch {
      // Ignore storage failures so shopping remains usable.
    }
  }, [items])

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const requested = Math.max(0, Math.floor(Number(newItem.quantity) || 0))
      if (requested <= 0) return prev

      let allowed = requested
      if (isManagedInventorySlug(newItem.slug)) {
        const inCart = prev
          .filter((item) => item.slug === newItem.slug)
          .reduce((sum, item) => sum + item.quantity, 0)
        allowed = Math.min(requested, Math.max(0, inventory[newItem.slug] - inCart))
      }
      if (allowed <= 0) return prev

      const existing = prev.find(
        (item) => item.slug === newItem.slug && item.variant === newItem.variant
      )
      if (existing) {
        return prev.map((item) =>
          item.slug === newItem.slug && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + allowed }
            : item
        )
      }
      return [...prev, { ...newItem, quantity: allowed }]
    })
  }, [inventory])

  const removeItem = useCallback((slug: string, variant: string) => {
    setItems((prev) => prev.filter((item) => !(item.slug === slug && item.variant === variant)))
  }, [])

  const updateQuantity = useCallback((slug: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug, variant)
      return
    }

    setItems((prev) => {
      let nextQuantity = Math.max(1, Math.floor(quantity))
      if (isManagedInventorySlug(slug)) {
        const otherVariants = prev
          .filter((item) => item.slug === slug && item.variant !== variant)
          .reduce((sum, item) => sum + item.quantity, 0)
        nextQuantity = Math.min(nextQuantity, Math.max(0, inventory[slug] - otherVariants))
      }

      if (nextQuantity <= 0) {
        return prev.filter((item) => !(item.slug === slug && item.variant === variant))
      }

      return prev.map((item) =>
        item.slug === slug && item.variant === variant
          ? { ...item, quantity: nextQuantity }
          : item
      )
    })
  }, [inventory, removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const total = items
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[$,]/g, ''))
      return sum + price * item.quantity
    }, 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refreshInventory,
        inventory,
        inventoryLoaded,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
