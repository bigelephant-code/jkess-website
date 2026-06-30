type QuoteRequestProduct = {
  name: string
  slug: string
  category: string
  quantity: number
  option: string
}

export type QuoteRequestEmail = {
  purpose: string
  name: string
  company: string
  email: string
  phone: string
  country: string
  city: string
  postalCode: string
  arrivalWindow: string
  targetArrivalDate: string
  notes: string
  products: QuoteRequestProduct[]
  requestText: string
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function textBlock(value: string) {
  return escapeHtml(value || '-').replace(/\n/g, '<br>')
}

export async function sendQuoteRequestEmail(request: QuoteRequestEmail) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ORDER_EMAIL_FROM
  const to = process.env.ORDER_NOTIFICATION_EMAIL || 'zhou@jkess.com'

  if (!apiKey || !from) throw new Error('Quote email service is not configured.')

  const productRows = request.products
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;">
            ${escapeHtml(item.name)}<br>
            <small>${escapeHtml(item.category)} / ${escapeHtml(item.slug)}</small>
          </td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.option || '-')}</td>
        </tr>`
    )
    .join('')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;color:#111827;line-height:1.55;">
      <h1 style="color:#16a34a;">New JKESS quote request</h1>
      <p style="padding:12px;background:#ecfdf5;border:1px solid #bbf7d0;">
        A visitor submitted the website quotation form. Reply directly to the customer and confirm product scope, freight, taxes, lead time, and payment terms in writing.
      </p>
      <p><strong>Purpose:</strong> ${escapeHtml(request.purpose)}</p>
      <p><strong>Customer:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(request.company || '-')}</p>
      <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(request.phone || '-')}</p>
      <p><strong>Destination:</strong> ${escapeHtml([request.country, request.city, request.postalCode].filter(Boolean).join(', '))}</p>
      <p><strong>Expected arrival:</strong> ${escapeHtml(request.arrivalWindow)}</p>
      <p><strong>Preferred arrival date:</strong> ${escapeHtml(request.targetArrivalDate || '-')}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr>
            <th style="padding:10px;border-bottom:2px solid #d1d5db;text-align:left;">Product</th>
            <th style="padding:10px;border-bottom:2px solid #d1d5db;text-align:center;">Qty</th>
            <th style="padding:10px;border-bottom:2px solid #d1d5db;text-align:left;">Option / configuration</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>
      <p><strong>Additional requirements:</strong><br>${textBlock(request.notes)}</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:22px 0;">
      <p><strong>Plain text request:</strong></p>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;padding:14px;border-radius:8px;font-family:Consolas,monospace;font-size:13px;">${escapeHtml(request.requestText)}</pre>
    </div>`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'JKESS-Website/1.0',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: request.email,
      subject: `JKESS quote request - ${request.country || 'destination pending'} - ${request.name}`,
      html,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Resend failed with status ${response.status}.`)
  }
}
