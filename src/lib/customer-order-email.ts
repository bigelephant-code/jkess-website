import type { StoredOrderRecord } from '@/lib/order-store'

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function money(value: string) {
  const amount = Number.parseFloat(value)
  return Number.isFinite(amount) ? amount.toFixed(2) : value
}

function shippingAddress(order: StoredOrderRecord) {
  const customerAddress = order.customer.address.trim()
  if (customerAddress) return customerAddress

  return [
    order.shippingAddress.addressLine1,
    order.shippingAddress.addressLine2,
    order.shippingAddress.city,
    order.shippingAddress.state,
    order.shippingAddress.postalCode,
    order.shippingAddress.countryCode,
  ]
    .filter(Boolean)
    .join(', ')
}

export async function sendCustomerOrderConfirmation(order: StoredOrderRecord) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ORDER_EMAIL_FROM
  const replyTo = process.env.ORDER_NOTIFICATION_EMAIL || 'zhou@jkess.com'
  const recipient = (order.customer.email || order.payerEmail).trim().toLowerCase()

  if (!apiKey || !from) throw new Error('Order email service is not configured.')
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    throw new Error('Customer email address is unavailable or invalid.')
  }

  const rows = order.items
    .map((item) => {
      const lineTotal = Number.parseFloat(item.unitAmount) * item.quantity
      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
            <strong>${escapeHtml(item.name)}</strong>
            ${item.sku ? `<br><small style="color:#6b7280;">${escapeHtml(item.sku)}</small>` : ''}
          </td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;">$${Number.isFinite(lineTotal) ? lineTotal.toFixed(2) : '-'}</td>
        </tr>`
    })
    .join('')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#111827;line-height:1.6;">
      <h1 style="margin-bottom:8px;color:#16a34a;">Payment received</h1>
      <p>Thank you for your JKESS order. Your PayPal payment has been received and verified.</p>

      <div style="margin:20px 0;padding:16px;border:1px solid #d1d5db;border-radius:12px;background:#f9fafb;">
        <p style="margin:0 0 8px;"><strong>JKESS order number:</strong> ${escapeHtml(order.orderNumber)}</p>
        <p style="margin:0 0 8px;"><strong>PayPal order ID:</strong> ${escapeHtml(order.paypalOrderId)}</p>
        <p style="margin:0;"><strong>Payment total:</strong> $${escapeHtml(money(order.amount))} ${escapeHtml(order.currency)}</p>
      </div>

      <h2 style="font-size:18px;margin-top:28px;">Order summary</h2>
      <table style="width:100%;border-collapse:collapse;margin:12px 0 20px;">
        <thead>
          <tr>
            <th style="padding:10px;text-align:left;border-bottom:2px solid #d1d5db;">Item</th>
            <th style="padding:10px;text-align:center;border-bottom:2px solid #d1d5db;">Qty</th>
            <th style="padding:10px;text-align:right;border-bottom:2px solid #d1d5db;">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <h2 style="font-size:18px;margin-top:28px;">Delivery details</h2>
      <p><strong>Name:</strong> ${escapeHtml(order.customer.name || order.payerName || '-')}</p>
      <p><strong>Address:</strong><br>${escapeHtml(shippingAddress(order) || '-').replace(/\n/g, '<br>')}</p>
      ${order.customer.phone ? `<p><strong>Phone:</strong> ${escapeHtml(order.customer.phone)}</p>` : ''}

      <p style="margin-top:24px;padding:14px;border:1px solid #fed7aa;background:#fff7ed;border-radius:10px;">
        This email confirms payment only. It is not a shipping notice. JKESS will contact you when the order is ready for dispatch or if additional delivery information is required.
      </p>

      <p style="margin-top:24px;">Questions about this order? Reply to this email or contact <a href="mailto:${escapeHtml(replyTo)}">${escapeHtml(replyTo)}</a>.</p>
      <p style="color:#6b7280;font-size:13px;">Please keep your JKESS order number for future reference.</p>
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
      to: [recipient],
      reply_to: replyTo,
      subject: `Payment received — JKESS order ${order.orderNumber}`,
      html,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Customer confirmation email failed with status ${response.status}.`)
  }
}
