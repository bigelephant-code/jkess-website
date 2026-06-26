type PaidOrderItem = {
  name: string
  variant: string
  quantity: number
  lineTotal: number
}

type PaidOrderEmail = {
  orderNumber: string
  paypalOrderId: string
  paypalCaptureId: string
  payerEmail: string
  customer: {
    name: string
    email: string
    phone: string
    company: string
    address: string
    notes: string
  }
  items: PaidOrderItem[]
  total: number
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendPaidOrderEmail(order: PaidOrderEmail) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ORDER_EMAIL_FROM
  const to = process.env.ORDER_NOTIFICATION_EMAIL || 'zhou@jkess.com'

  if (!apiKey || !from) throw new Error('Order email service is not configured.')

  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.name)}<br><small>${escapeHtml(item.variant)}</small></td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">$${item.lineTotal.toFixed(2)}</td>
        </tr>`
    )
    .join('')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#111827;line-height:1.55;">
      <h1 style="color:#16a34a;">PayPal payment verified</h1>
      <p style="padding:12px;background:#fff7ed;border:1px solid #fed7aa;">The JKESS server verified this transaction with PayPal. Confirm it in the PayPal merchant account before arranging delivery.</p>
      <p><strong>JKESS order:</strong> ${escapeHtml(order.orderNumber)}</p>
      <p><strong>PayPal order ID:</strong> ${escapeHtml(order.paypalOrderId)}</p>
      <p><strong>PayPal capture ID:</strong> ${escapeHtml(order.paypalCaptureId || '-')}</p>
      <p><strong>PayPal payer email:</strong> ${escapeHtml(order.payerEmail || '-')}</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0;">
      <p><strong>Customer:</strong> ${escapeHtml(order.customer.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(order.customer.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(order.customer.phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(order.customer.company || '-')}</p>
      <p><strong>Delivery address:</strong><br>${escapeHtml(order.customer.address).replace(/\n/g, '<br>')}</p>
      <p><strong>Notes:</strong><br>${escapeHtml(order.customer.notes || '-').replace(/\n/g, '<br>')}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;"><tbody>${rows}</tbody></table>
      <p style="font-size:18px;"><strong>Verified catalog total: $${order.total.toFixed(2)} USD</strong></p>
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
      subject: `Verified JKESS order — ${order.orderNumber}`,
      html,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Resend failed with status ${response.status}.`)
  }
}
