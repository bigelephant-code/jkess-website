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
const RETRY_DELAYS = [5_000, 15_000, 60_000, 300_000]

export default function PaidOrderEmailBridge() {
  const inFlight = useRef(new Set<string>())
  const attempts = useRef(new Map<string, number>())
  const retryTimer = useRef<number | null>(null)

  useEffect(() => {
    let disposed = false

    function clearRetryTimer() {
      if (retryTimer.current !== null) {
        window.clearTimeout(retryTimer.current)
        retryTimer.current = null
      }
    }

    function scheduleRetry(delay: number) {
      if (disposed || retryTimer.current !== null) return
      retryTimer.current = window.setTimeout(() => {
        retryTimer.current = null
        void sendPendingOrders()
      }, delay)
    }

    async function sendPendingOrders() {
      if (disposed || document.visibilityState !== 'visible') return

      clearRetryTimer()
      let nextDelay: number | null = null

      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index)
        if (!key?.startsWith(ORDER_PREFIX)) continue

        const raw = window.localStorage.getItem(key)
        if (!raw) continue

        let order: StoredOrder
        try {
          order = JSON.parse(raw) as StoredOrder
        } catch {
          continue
        }

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

        try {
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
            attempts.current.delete(paypalOrderId)
          } else {
            const delay = RETRY_DELAYS[Math.min(attemptCount, RETRY_DELAYS.length - 1)]
            nextDelay = nextDelay === null ? delay : Math.min(nextDelay, delay)
          }
        } catch (error) {
          console.error('Unable to send the paid order email:', error)
          const delay = RETRY_DELAYS[Math.min(attemptCount, RETRY_DELAYS.length - 1)]
          nextDelay = nextDelay === null ? delay : Math.min(nextDelay, delay)
        } finally {
          inFlight.current.delete(paypalOrderId)
        }
      }

      if (nextDelay !== null) scheduleRetry(nextDelay)
    }

    const runWhenIdle = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => void sendPendingOrders(), { timeout: 2_000 })
      } else {
        window.setTimeout(() => void sendPendingOrders(), 500)
      }
    }

    const handleFocus = () => void sendPendingOrders()
    const handleOnline = () => void sendPendingOrders()
    const handleStorage = (event: StorageEvent) => {
      if (event.key?.startsWith(ORDER_PREFIX)) void sendPendingOrders()
    }
    const handleOrderCreated = () => void sendPendingOrders()

    runWhenIdle()
    window.addEventListener('focus', handleFocus)
    window.addEventListener('online', handleOnline)
    window.addEventListener('storage', handleStorage)
    window.addEventListener('jkess:order-created', handleOrderCreated)

    return () => {
      disposed = true
      clearRetryTimer()
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('jkess:order-created', handleOrderCreated)
    }
  }, [])

  return null
}
