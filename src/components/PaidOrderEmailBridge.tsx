'use client'

import { useEffect, useRef } from 'react'

type StoredOrder = {
  jkessOrderNumber?: string
  paypalOrderId?: string
  paypalStatus?: string
  items?: unknown[]
  customer?: Record<string, unknown>
}

const ORDER_PREFIX = 'jkess-order-'
const SENT_PREFIX = 'jkess-order-email-sent-'

export default function PaidOrderEmailBridge() {
  const inFlight = useRef(new Set<string>())
  const attempts = useRef(new Map<string, number>())

  useEffect(() => {
    async function sendPendingOrders() {
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index)
        if (!key?.startsWith(ORDER_PREFIX)) continue

        const raw = window.localStorage.getItem(key)
        if (!raw) continue

        try {
          const order = JSON.parse(raw) as StoredOrder
          const paypalOrderId = order.paypalOrderId?.trim()
          const orderNumber = order.jkessOrderNumber?.trim()
          const status = order.paypalStatus?.toUpperCase()
          if (!paypalOrderId || !orderNumber || status !== 'COMPLETED') continue

          const sentKey = `${SENT_PREFIX}${paypalOrderId}`
          if (window.localStorage.getItem(sentKey) || inFlight.current.has(paypalOrderId)) continue

          const attemptCount = attempts.current.get(paypalOrderId) || 0
          if (attemptCount >= 5) continue

          inFlight.current.add(paypalOrderId)
          attempts.current.set(paypalOrderId, attemptCount + 1)

          const response = await fetch('/api/order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber,
              paypalOrderId,
              paypalStatus: status,
              customer: order.customer,
              items: order.items,
            }),
          })

          if (response.ok) {
            window.localStorage.setItem(sentKey, new Date().toISOString())
          }
        } catch (error) {
          console.error('Unable to send the paid order email:', error)
        } finally {
          try {
            const parsed = JSON.parse(raw) as StoredOrder
            if (parsed.paypalOrderId) inFlight.current.delete(parsed.paypalOrderId)
          } catch {
            // Ignore malformed local order data.
          }
        }
      }
    }

    void sendPendingOrders()
    const interval = window.setInterval(() => void sendPendingOrders(), 2500)
    const handleFocus = () => void sendPendingOrders()
    window.addEventListener('focus', handleFocus)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return null
}
