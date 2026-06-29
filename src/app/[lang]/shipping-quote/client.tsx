'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Copy, Mail, MessageCircle, Ship, Truck } from 'lucide-react'
import { products } from '@/lib/products'
import { trackEvent } from '@/lib/analytics'
import { localizedSeoPath } from '@/lib/seo'

const shippingMethods = ['Recommend the best route', 'Sea freight', 'Rail freight', 'Air freight', 'Courier / express']

export default function ShippingQuoteClient({ lang }: { lang: string }) {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    variant: '',
    quantity: '1',
    country: '',
    city: '',
    postalCode: '',
    shippingMethod: shippingMethods[0],
    requiredDate: '',
    deliveryAddressType: 'Commercial address with unloading access',
    notes: '',
  })

  const inquiryText = useMemo(() => [
    'JKESS International Shipping Quote Request',
    '',
    `Name: ${form.name}`,
    `Company: ${form.company || '-'}`,
    `Email: ${form.email}`,
    `Phone / WhatsApp: ${form.phone || '-'}`,
    `Product: ${form.product}`,
    `Model / Option: ${form.variant || 'Please advise'}`,
    `Quantity: ${form.quantity}`,
    `Destination country: ${form.country}`,
    `City: ${form.city}`,
    `Postal code: ${form.postalCode}`,
    `Preferred shipping method: ${form.shippingMethod}`,
    `Required delivery date: ${form.requiredDate || 'Flexible'}`,
    `Delivery address type: ${form.deliveryAddressType}`,
    '',
    'Additional notes:',
    form.notes || '-',
  ].join('\n'), [form])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    trackEvent('generate_lead', {
      lead_source: 'shipping_quote',
      product_name: form.product,
      destination_country: form.country,
      quantity: Number(form.quantity) || 1,
    })
    trackEvent('add_shipping_info', {
      currency: 'USD',
      value: 0,
      shipping_tier: form.shippingMethod,
      items: [],
    })
    const subject = encodeURIComponent(`JKESS Shipping Quote - ${form.country} - ${form.product}`)
    window.location.href = `mailto:zhou@jkess.com?subject=${subject}&body=${encodeURIComponent(inquiryText)}`
  }

  const copyInquiry = async () => {
    await navigator.clipboard.writeText(inquiryText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
    trackEvent('shipping_quote_copy', { product_name: form.product, destination_country: form.country })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <header className="bg-gray-950 pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">International logistics</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Request a shipping quote before payment</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Heavy battery enclosures and BMS equipment can have very different freight costs by destination, quantity, packing method, route, and unloading conditions. Submit the details below so JKESS can prepare a written logistics quotation.
          </p>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-200 bg-white py-12">
          <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-4">
            {[
              ['1', 'Send project details', 'Product, option, quantity, destination, postal code, and delivery conditions.'],
              ['2', 'Packing and route review', 'JKESS checks carton or crate requirements, gross weight, volume, and available routes.'],
              ['3', 'Receive written terms', 'The quotation identifies freight, route, estimated transit time, Incoterm, validity, and exclusions.'],
              ['4', 'Approve before dispatch', 'No shipment is arranged until the written freight terms and payment method are accepted.'],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 font-bold text-black">{number}</span>
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
          <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <Ship className="text-green-600" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700">Freight inquiry</p>
                <h2 className="mt-1 text-2xl font-bold">Destination and order details</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
              <Field label="Company" value={form.company} onChange={(value) => setForm({ ...form, company: value })} />
              <Field label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
              <Field label="Phone / WhatsApp" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />

              <label className="sm:col-span-2">
                <span className="text-sm font-semibold text-gray-700">Product *</span>
                <select required value={form.product} onChange={(event) => setForm({ ...form, product: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500">
                  <option value="">Select a product</option>
                  {products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}
                  <option value="Multiple products / project">Multiple products / project</option>
                </select>
              </label>

              <Field label="Model / Option" value={form.variant} onChange={(value) => setForm({ ...form, variant: value })} placeholder="Example: Enclosure + LCD + BMS" />
              <Field label="Quantity" type="number" required value={form.quantity} onChange={(value) => setForm({ ...form, quantity: value })} />
              <Field label="Destination country" required value={form.country} onChange={(value) => setForm({ ...form, country: value })} />
              <Field label="City" required value={form.city} onChange={(value) => setForm({ ...form, city: value })} />
              <Field label="Postal code" required value={form.postalCode} onChange={(value) => setForm({ ...form, postalCode: value })} />
              <Field label="Required delivery date" type="date" value={form.requiredDate} onChange={(value) => setForm({ ...form, requiredDate: value })} />

              <label>
                <span className="text-sm font-semibold text-gray-700">Preferred shipping method</span>
                <select value={form.shippingMethod} onChange={(event) => setForm({ ...form, shippingMethod: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500">
                  {shippingMethods.map((method) => <option key={method}>{method}</option>)}
                </select>
              </label>

              <label>
                <span className="text-sm font-semibold text-gray-700">Delivery address type</span>
                <select value={form.deliveryAddressType} onChange={(event) => setForm({ ...form, deliveryAddressType: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500">
                  <option>Commercial address with unloading access</option>
                  <option>Commercial address without unloading equipment</option>
                  <option>Residential address</option>
                  <option>Port / freight forwarder warehouse</option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="text-sm font-semibold text-gray-700">Additional notes</span>
                <textarea rows={5} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Access limits, forklift or tail-lift requirement, customs broker, preferred Incoterm, packaging requirements, or project deadline." className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500" />
              </label>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-bold text-black transition hover:bg-green-400">
                <Mail size={18} /> Open email request
              </button>
              <button type="button" onClick={copyInquiry} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-900 transition hover:bg-gray-50">
                <Copy size={18} /> {copied ? 'Copied' : 'Copy inquiry text'}
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-gray-950 p-6 text-white">
              <Truck className="text-green-400" size={28} />
              <h2 className="mt-4 text-xl font-bold">What the freight quote should state</h2>
              <div className="mt-5 space-y-3">
                {[
                  'Origin and destination',
                  'Packing method, gross weight, and volume',
                  'Transport mode and estimated transit time',
                  'Incoterm and quote validity',
                  'Included and excluded destination charges',
                  'Insurance and unloading responsibility',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-300">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
              <h2 className="font-bold">Before paying for products</h2>
              <p className="mt-2">Request the freight quote first when the landed cost affects the purchase decision. Product prices shown online do not include destination-dependent freight, import duty, tax, customs clearance, or local delivery unless a written quotation says otherwise.</p>
            </div>

            <a href="https://wa.me/8613162828868" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_click', { channel: 'whatsapp', context: 'shipping_quote' })} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white">
              <MessageCircle size={18} /> Discuss shipping on WhatsApp
            </a>

            <Link href={localizedSeoPath(lang, '/shipping-policy')} className="inline-flex items-center gap-2 text-sm font-bold text-green-700">
              Read the Shipping Policy <ArrowRight size={15} />
            </Link>
          </aside>
        </section>
      </main>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label>
      <span className="text-sm font-semibold text-gray-700">{label}{required ? ' *' : ''}</span>
      <input type={type} required={required} min={type === 'number' ? 1 : undefined} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500" />
    </label>
  )
}
