import type { Metadata } from 'next'
import CheckoutPageClient from './client'

export const metadata: Metadata = {
  title: 'Checkout | JKESS',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutPage() {
  return <CheckoutPageClient />
}
