'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Copy, Mail, PackageCheck, Ship } from 'lucide-react'
import { products } from '@/lib/products'
import { trackEvent } from '@/lib/analytics'
import { localizedSeoPath } from '@/lib/seo'
import { FLAT_RATE_SHIPPING_USD } from '@/lib/shipping-zones'
import { getLocalizedGuide, getLocalizedUiCopy } from '@/lib/localized-ui'

type Selection = { selected: boolean; quantity: string; option: string }
type SubmitStatus = 'idle' | 'sending' | 'sent' | 'failed'

const purposes = [
  'Destination requires individual shipping review',
  'Bulk purchase / volume discount request',
  'Both shipping review and bulk pricing',
  'Project configuration request',
]

const arrivalWindows = [
  'Urgent - as soon as possible',
  'Within 2 weeks',
  'Within 1 month',
  'Within 2 months',
  'Within 3 months',
  'Flexible - no fixed deadline',
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
  const ui = getLocalizedUiCopy(lang)
  const guide = getLocalizedGuide(lang)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
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
  const selectedProductNames = chosen.map((item) => item.product.name).join(', ')
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
  const emailHref = useMemo(() => {
    const subject = encodeURIComponent('JKESS Quote Request')
    return `mailto:zhou@jkess.com?subject=${subject}&body=${encodeURIComponent(requestText)}`
  }, [requestText])

  const updateSelection = (slug: string, patch: Partial<Selection>) => {
    setSelections((current) => ({ ...current, [slug]: { ...current[slug], ...patch } }))
    setError('')
    setSubmitStatus('idle')
    if (patch.selected) {
      const product = products.find((item) => item.slug === slug)
      trackEvent('quote_product_select', {
        item_id: slug,
        item_name: product?.name || slug,
      })
    }
  }

  const validateRequest = () => {
    if (!chosen.length) {
      setError('Select at least one product and enter its quantity.')
      return false
    }
    setError('')
    return true
  }

  const submitRequest = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validateRequest()) return

    setSubmitStatus('sending')

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          website: '',
          requestText,
          products: chosen.map(({ product, quantity, option }) => ({
            slug: product.slug,
            quantity,
            option,
          })),
        }),
      })

      if (!response.ok) {
        setSubmitStatus('failed')
        trackEvent('quote_request_error', {
          lead_source: 'product_quote',
          destination_country: form.country,
          product_names: selectedProductNames,
        })
        return
      }
    } catch {
      setSubmitStatus('failed')
      trackEvent('quote_request_error', {
        lead_source: 'product_quote',
        destination_country: form.country,
        product_names: selectedProductNames,
      })
      return
    }

    setSubmitStatus('sent')
    trackEvent('generate_lead', {
      lead_source: 'product_quote',
      inquiry_type: form.purpose,
      destination_country: form.country,
      expected_arrival: form.arrivalWindow,
      target_arrival_date: form.targetArrivalDate || 'not_specified',
      quantity: totalUnits,
      product_names: selectedProductNames,
    })
  }

  const copyRequest = async () => {
    if (!validateRequest()) return

    await navigator.clipboard.writeText(requestText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
    trackEvent('quote_request_copy', {
      lead_source: 'product_quote',
      inquiry_type: form.purpose,
      destination_country: form.country,
      expected_arrival: form.arrivalWindow,
      target_arrival_date: form.targetArrivalDate || 'not_specified',
      quantity: totalUnits,
      product_names: selectedProductNames,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <header className="bg-gray-950 pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">{ui.requestProjectQuote}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{guide.quote}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{guide.desc}</p>
          {initialProductSlug && (
            <p className="mt-4 inline-flex rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-200">
              {ui.viewProductDetails}
            </p>
          )}
        </div>
      </header>

      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2">
          <InfoCard icon={<Ship />} title={ui.destinationCountry} text={guide.desc} />
          <InfoCard icon={<PackageCheck />} title={guide.lifepo4Europe} text={guide.desc} />
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
        <form onSubmit={submitRequest} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">{ui.prepareInputs}</h2>

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
                <h3 className="font-bold">{guide.lifepo4Europe} *</h3>
                <p className="mt-1 text-xs text-gray-500">{guide.desc}</p>
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
            <label className="hidden" aria-hidden="true">
              Company website
              <input tabIndex={-1} autoComplete="off" name="website" />
            </label>
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

          {submitStatus === 'sent' && (
            <p className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
              {guide.desc}
            </p>
          )}
          {submitStatus === 'failed' && (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {guide.quote}
            </p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button type="submit" disabled={submitStatus === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-bold text-black hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-gray-300">
              <Mail size={18} /> {submitStatus === 'sending' ? ui.requestProjectQuote : guide.quote}
            </button>
            <button type="button" onClick={copyRequest} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold hover:bg-gray-50"><Copy size={18} /> {copied ? guide.quote : ui.copyEmail}</button>
            <a href={emailHref} onClick={() => trackEvent('quote_request_email_open', { destination_country: form.country, product_names: selectedProductNames })} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold hover:bg-gray-50"><Mail size={18} /> {ui.contactUs}</a>
          </div>
          <p className="mt-3 text-xs leading-5 text-gray-500">{guide.desc}</p>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-gray-950 p-6 text-white">
            <h2 className="text-xl font-bold">{guide.enclosureEu}</h2>
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
            <h2 className="font-bold">{guide.quote}</h2>
            <p className="mt-2">{guide.desc}</p>
          </div>
          <Link href={localizedSeoPath(lang, '/shipping-policy')} className="font-bold text-green-700">{guide.enclosureEu}</Link>
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
