'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SALE_DISCOUNT_PERCENT,
  SALE_MULTIPLIER,
  formatUsd,
} from '@/lib/commerce'

type SaleTarget = {
  container: HTMLElement
  salePrice: number
}

function parsePrice(value: string) {
  const price = Number.parseFloat(value.replace(/[^0-9.]/g, ''))
  return Number.isFinite(price) && price > 0 ? price : null
}

export default function ProductSalePrice() {
  const pathname = usePathname()
  const [target, setTarget] = useState<SaleTarget | null>(null)

  useEffect(() => {
    if (!pathname.includes('/products/')) {
      setTarget(null)
      return
    }

    const syncSalePrice = () => {
      const priceElement = document.querySelector<HTMLElement>(
        'span.text-3xl.font-bold.text-green-400'
      )
      const container = priceElement?.parentElement
      const salePrice = priceElement ? parsePrice(priceElement.textContent || '') : null

      if (!container || salePrice === null) {
        setTarget(null)
        return
      }

      setTarget((current) =>
        current?.container === container && current.salePrice === salePrice
          ? current
          : { container, salePrice }
      )
    }

    syncSalePrice()
    const observer = new MutationObserver(syncSalePrice)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [pathname])

  if (!target) return null

  const regularPrice = target.salePrice / SALE_MULTIPLIER

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
      <Link
        href="/shipping-quote"
        className="mt-1 w-full text-xs font-semibold text-amber-200 underline decoration-amber-200/40 underline-offset-4 hover:text-amber-100"
      >
        Request a destination shipping quote before payment
      </Link>
    </div>,
    target.container
  )
}
