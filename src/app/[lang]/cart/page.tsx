import type { Metadata } from 'next'
import CartPageClient from './client'

export const metadata: Metadata = {
  title: 'Cart | JKESS',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CartPage() {
  return <CartPageClient />
}
