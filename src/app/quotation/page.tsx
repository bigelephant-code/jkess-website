import type { Metadata } from 'next'
import QuotationBuilder from './QuotationBuilder'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'JKESS Proforma Invoice Builder',
  description: 'Internal JKESS tool for preparing customer proforma invoices.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
  referrer: 'no-referrer',
}

export default function QuotationPage() {
  const today = new Date()
  const validUntil = new Date(today)
  validUntil.setDate(validUntil.getDate() + 15)
  const issueDate = localIsoDate(today)
  const stamp = issueDate.replaceAll('-', '')

  return (
    <QuotationBuilder
      initialDates={{
        issueDate,
        validUntil: localIsoDate(validUntil),
        quoteNumber: `JKESS-PI-${stamp}-${String(today.getTime()).slice(-4)}`,
      }}
    />
  )
}

function localIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
