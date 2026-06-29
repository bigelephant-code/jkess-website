'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SALE_DISCOUNT_PERCENT,
  formatUsd,
  regularPriceFromSalePrice,
} from '@/lib/commerce'
import { defaultLocale, isValidLocale } from '@/i18n/config'

type SaleTarget = {
  container: HTMLElement
  salePrice: number
}

const CURRENT_PRODUCT_SHIPPING_COPY =
  'Shipping: free standard shipping to EU delivery addresses; $150 per order to the United States, supported Southeast Asia, Japan, South Korea, and listed Middle East destinations; other countries require a shipping quote before online payment. Import duties, taxes, customs clearance fees, and brokerage charges are not included unless expressly stated.'

const MAX_INITIAL_SYNC_ATTEMPTS = 8

function parsePrice(value: string) {
  const price = Number.parseFloat(value.replace(/[^0-9.]/g, ''))
  return Number.isFinite(price) && price > 0 ? price : null
}

function syncCurrentShippingCopy(container: HTMLElement) {
  const paragraphs = Array.from(container.querySelectorAll<HTMLElement>('p.text-xs.leading-5'))
  const outdatedCopy = paragraphs.find((paragraph) =>
    paragraph.textContent?.includes('Product price only. Shipping, import duty')
  )

  if (outdatedCopy) outdatedCopy.textContent = CURRENT_PRODUCT_SHIPPING_COPY
}

export default function ProductSalePrice() {
  const pathname = usePathname()
  const [target, setTarget] = useState<SaleTarget | null>(null)

  const firstPathSegment = pathname.split('/').filter(Boolean)[0] || ''
  const languagePrefix = isValidLocale(firstPathSegment) && firstPathSegment !== defaultLocale
    ? `/${firstPathSegment}`
    : ''

  useEffect(() => {
    if (!pathname.includes('/products/')) {
      setTarget(null)
      return
    }

    let animationFrame: number | null = null
    let initialAttempts = 0

    const syncSalePrice = () => {
      const priceElement = document.querySelector<HTMLElement>(
        'span.text-3xl.font-bold.text-green-400'
      )
      const container = priceElement?.parentElement
      const salePrice = priceElement ? parsePrice(priceElement.textContent || '') : null

      if (!container || salePrice === null) return false

      syncCurrentShippingCopy(container)
      setTarget((current) =>
        current?.container === container && current.salePrice === salePrice
          ? current
          : { container, salePrice }
      )
      return true
    }

    const syncAfterRender = () => {
      animationFrame = window.requestAnimationFrame(() => {
        const found = syncSalePrice()
        if (!found && initialAttempts < MAX_INITIAL_SYNC_ATTEMPTS) {
          initialAttempts += 1
          syncAfterRender()
        }
      })
    }

    const handleProductClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null
      if (!element?.closest('button[aria-label^="Select "]')) return

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        syncSalePrice()
      })
    }

    syncAfterRender()
    document.addEventListener('click', handleProductClick)

    return () => {
      document.removeEventListener('click', handleProductClick)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [pathname])

  if (!target) return null

  const regularPrice = regularPriceFromSalePrice(target.salePrice)

  return createPortal(
    <div
      data-jkess-sale-price="true"
      className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/10 pt-3"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
        Regular price
      </span>
      <span className="text-sm text-gray-400 line-through">
        {formatUsd(regularPrice)}
      </span>
      <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-300">
        -{SALE_DISCOUNT_PERCENT}% OFF
      </span>
      <span className="w-full text-xs leading-5 text-green-300/80">
        The displayed price is the current promotional price after the {SALE_DISCOUNT_PERCENT}% discount.
      </span>
      <span className="w-full text-xs leading-5 text-gray-400">
        EU delivery addresses include free standard shipping. Supported non-EU direct checkout destinations add $150 per order; other countries require Request a Quote before payment.
      </span>
      <Link
        href={`${languagePrefix}/shipping-quote`}
        className="mt-1 w-full text-xs font-semibold text-amber-200 underline decoration-amber-200/40 underline-offset-4 hover:text-amber-100"
      >
        Request a destination shipping quote before payment
      </Link>
    </div>,
    target.container
  )
}
