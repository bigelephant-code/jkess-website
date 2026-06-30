import { NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { sendQuoteRequestEmail, type QuoteRequestEmail } from '@/lib/quote-request-email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const productBySlug = new Map(products.map((product) => [product.slug, product]))

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function cleanProduct(value: unknown) {
  const input = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const slug = clean(input.slug, 100)
  const product = productBySlug.get(slug)
  const quantity = Math.max(1, Math.min(999, Number(input.quantity) || 1))

  if (!product) return null

  return {
    name: product.name,
    slug: product.slug,
    category: product.categoryLabel,
    quantity,
    option: clean(input.option, 220) || 'Please advise',
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const rawProducts = Array.isArray(body.products) ? body.products : []
    const website = clean(body.website, 80)

    if (website) {
      return NextResponse.json({ sent: true })
    }

    const quoteRequest: QuoteRequestEmail = {
      purpose: clean(body.purpose, 160),
      name: clean(body.name, 120),
      company: clean(body.company, 160),
      email: clean(body.email, 200).toLowerCase(),
      phone: clean(body.phone, 100),
      country: clean(body.country, 120),
      city: clean(body.city, 120),
      postalCode: clean(body.postalCode, 60),
      arrivalWindow: clean(body.arrivalWindow, 120),
      targetArrivalDate: clean(body.targetArrivalDate, 40),
      notes: clean(body.notes, 2500),
      products: rawProducts.map(cleanProduct).filter(Boolean) as QuoteRequestEmail['products'],
      requestText: clean(body.requestText, 6000),
    }

    if (!quoteRequest.name || !validEmail(quoteRequest.email) || !quoteRequest.country || !quoteRequest.city) {
      return NextResponse.json({ error: 'Required quote contact fields are missing.' }, { status: 400 })
    }
    if (quoteRequest.products.length === 0 || quoteRequest.products.length > 12) {
      return NextResponse.json({ error: 'Select at least one valid product.' }, { status: 400 })
    }

    await sendQuoteRequestEmail(quoteRequest)

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('Quote request email failed:', error)
    return NextResponse.json({ error: 'Unable to send this quote request.' }, { status: 502 })
  }
}
