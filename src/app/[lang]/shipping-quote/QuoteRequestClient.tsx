'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Copy, Mail, PackageCheck, Ship } from 'lucide-react'
import { products } from '@/lib/products'
import { trackEvent } from '@/lib/analytics'
import { localizedSeoPath } from '@/lib/seo'
import { FLAT_RATE_SHIPPING_USD } from '@/lib/shipping-zones'

type Selection = { selected: boolean; quantity: string; option: string }

const purposes = [
  'Destination requires individual shipping review',
  'Bulk purchase / volume discount request',
  'Both shipping review and bulk pricing',
  'Project configuration request',
]

const arrivalWindows = [
  'Urgent — as soon as possible',
  'Within 2 weeks',
  'Within 1 month',
  'Within 2 months',
  'Within 3 months',
  'Flexible — no fixed deadline',
]

const initialSelections = Object.fromEntries(
  products.map((product) => [product.slug, { selected: false, quantity: '1', option: '' }])
) as Record<string, Selection>

export default function QuoteRequestClient({
  lang,
  initialProductSlug,
}: {
  lang: string
  initialProductSlug?: string
}) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [selections, setSelections] = useState<Record<string, Selection>>(() => {
    if (!initialProductSlug || !initialSelections[initialProductSlug]) return initialSelections
    return {
      ...initialSelections,
      [initialProductSlug]: {
        ...initialSelections[initialProductSlug],
        selected: true,
      },
    }
  })
  const [form, setForm] = useState({
    purpose: purposes[0],
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    arrivalWindow: arrivalWindows[2],
    targetArrivalDate: '',
    notes: '',
  })

  const chosen = useMemo(
    () =>
      products
        .filter((product) => selections[product.slug]?.selected)
        .map((product) => ({
          product,
          quantity: Math.max(1, Number(selections[product.slug]?.quantity) || 1),
          option: selections[product.slug]?.option.trim() || 'Please advise',
        })),
    [selections]
  )

  const totalUnits = chosen.reduce((sum, item) => sum + item.quantity, 0)
  const requestText = useMemo(
    () =>
      [
        'JKESS Product and Shipping Quote Request',
        `Inquiry purpose: ${form.purpose}`,
        `Name: ${form.name}`,
        `Company: ${form.company || '-'}`,
        `Email: ${form.email}`,
        `Phone / WhatsApp: ${form.phone || '-'}`,
        '',
        'Requested products:',
        ...chosen.map(
          ({ product, quantity, option }) =>
            `- ${product.name} | Quantity: ${quantity} | Model / option: ${option}`
        ),
        '',
        `Destination: ${form.country}, ${form.city}, ${form.postalCode}`,
        `Expected arrival timing: ${form.arrivalWindow}`,
        `Preferred arrival date: ${form.targetArrivalDate || 'Not specified'}`,
        'Additional requirements:',
        form.notes || '-',
      ].join('\n'),
    [chosen, form]
  )

  const updateSelection = (slug: string, patch: Partial<Selection>) => {
    setSelections((current) => ({ ...current, [slug]: { ...current[slug], ...patch } }))
    setError('')
  }

  const copyRequest = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!chosen.length) {
      setError('Select at least one product and enter its quantity.')
      return
    }

    await navigator.clipboard.writeText(requestText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
    trackEvent('generate_lead', {
      lead_source: 'product_quote',
      inquiry_type: form.purpose,
      destination_country: form.country,
      expected_arrival: form.arrivalWindow,
      target_arrival_date: form.targetArrivalDate || 'not_specified',
      quantity: totalUnits,
      product_names: chosen.map((item) => item.product.name).join(', '),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <header className="bg-gray-950 pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">Tailored commercial quotation</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Request a product, volume, or destination quote</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">Use this form for destinations outside direct online checkout, multi-product projects, or larger quantities that may qualify for company-approved volume pricing.</p>
          {initialProductSlug && (
            <p className="mt-4 inline-flex rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-200">
              Selected product carried over from the product page.
            </p>
          )}
        </div>
      </header>

      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2">
          <InfoCard icon={<Ship />} title="Destination-specific purchase" text="Other destinations require individual review because local shipping, carrier, import, or product policies may prevent standard online dispatch." />
          <InfoCard icon={<PackageCheck />} title="Bulk and project purchasing" text="Select several products and enter a separate quantity for each. JKESS will review the order size and available company discount." />
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
        <form onSubmit={copyRequest} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">Products, quantities, and destination</h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <SelectField label="Inquiry purpose" value={form.purpose} onChange={(value) => setForm({ ...form, purpose: value })} options={purposes} />
            <Field label="Name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <Field label="Company" value={form.company} onChange={(value) => setForm({ ...form, company: value })} />
            <Field label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
            <Field label="Phone / WhatsApp" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">Select products and quantities *</h3>
                <p className="mt-1 text-xs text-gray-500">Multiple products can be included in one request.</p>
              </div>
              {totalUnits > 0 && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">{totalUnits} units</span>}
            </div>

            <div className="mt-4 space-y-3">
              {products.map((product) => {
                const selection = selections[product.slug]
                const hint = product.variants?.map((variant) => variant.label).join(' / ') || 'Capacity, power, cooling, or configuration'

                return (
                  <div key={product.slug} className={`rounded-2xl border p-5 ${selection.selected ? 'border-green-400 bg-green-50/60' : 'border-gray-200 bg-gray-50'}`}>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={selection.selected} onChange={(event) => updateSelection(product.slug, { selected: event.target.checked })} className="mt-1 h-5 w-5 accent-green-500" />
                      <span>
                        <strong className="block">{product.name}</strong>
                        <span className="text-xs text-gray-500">{product.categoryLabel}</span>
                      </span>
                    </label>
                    <div className="mt-4 grid gap-3 sm:grid-cols-[140px_1fr]">
                      <Field label="Quantity" type="number" disabled={!selection.selected} value={selection.quantity} onChange={(value) => updateSelection(product.slug, { quantity: value })} />
                      <Field label="Model / option / configuration" disabled={!selection.selected} value={selection.option} placeholder={hint} onChange={(value) => updateSelection(product.slug, { option: value })} />
                    </div>
                  </div>
                )
              })}
            </div>
            {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Field label="Destination country / region" required value={form.country} onChange={(value) => setForm({ ...form, country: value })} />
            <Field label="City" required value={form.city} onChange={(value) => setForm({ ...form, city: value })} />
            <Field label="Postal code" required value={form.postalCode} onChange={(value) => setForm({ ...form, postalCode: value })} />
            <Field label="Preferred arrival date (optional)" type="date" value={form.targetArrivalDate} onChange={(value) => setForm({ ...form, targetArrivalDate: value })} />
            <SelectField label="Expected arrival timing" value={form.arrivalWindow} onChange={(value) => setForm({ ...form, arrivalWindow: value })} options={arrivalWindows} />
            <p className="-mt-2 text-xs leading-5 text-gray-500 sm:col-span-2">Choose the closest timing so JKESS can judge urgency, production priority, and a suitable shipping route. The exact delivery date will be confirmed in the quotation.</p>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-gray-700">Additional requirements</span>
              <textarea rows={5} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Project background, quantity split, certifications, branding, Incoterm, unloading conditions, or deadline." className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500" />
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-bold text-black hover:bg-green-400"><Copy size={18} /> {copied ? 'Request copied' : 'Generate & copy request'}</button>
            <a href="mailto:zhou@jkess.com?subject=JKESS%20Quote%20Request" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold hover:bg-gray-50"><Mail size={18} /> Open email to JKESS</a>
          </div>
          <p className="mt-3 text-xs leading-5 text-gray-500">Generate and copy the request first, then paste it into the email message.</p>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-gray-950 p-6 text-white">
            <h2 className="text-xl font-bold">Online checkout delivery rules</h2>
            <div className="mt-5 space-y-3">
              {[
                'European Union: free standard shipping.',
                `United States, supported Southeast Asia and Middle East destinations, Japan, and South Korea: $${FLAT_RATE_SHIPPING_USD} shipping per order.`,
                'Other destinations: written availability and shipping terms are required.',
                'Import duty, tax, customs clearance, and local handling are excluded unless stated in writing.',
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-sm leading-7 text-green-950">
            <h2 className="font-bold">Volume discount review</h2>
            <p className="mt-2">Discounts depend on product mix, quantity, configuration, production planning, destination, and company approval. The written quotation is the controlling price.</p>
          </div>
          <Link href={localizedSeoPath(lang, '/shipping-policy')} className="font-bold text-green-700">Read the Shipping Policy</Link>
        </aside>
      </main>
    </div>
  )
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="text-green-700">{icon}</div>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  )
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="sm:col-span-2">
      <span className="text-sm font-semibold text-gray-700">{label} *</span>
      <select required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder, disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string; disabled?: boolean }) {
  return (
    <label>
      <span className="text-sm font-semibold text-gray-700">{label}{required ? ' *' : ''}</span>
      <input type={type} required={required} disabled={disabled} min={type === 'number' ? 1 : undefined} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none disabled:bg-gray-100 disabled:text-gray-400 focus:border-green-500" />
    </label>
  )
}
