import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function normalizeSecret(value: string) {
  let normalized = value
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()

  const first = normalized.at(0)
  const last = normalized.at(-1)
  if (normalized.length >= 2 && ((first === '"' && last === '"') || (first === "'" && last === "'"))) {
    normalized = normalized.slice(1, -1).trim()
  }

  return normalized
}

function secretsMatch(received: string, expected: string) {
  const receivedBytes = Buffer.from(normalizeSecret(received))
  const expectedBytes = Buffer.from(normalizeSecret(expected))
  return receivedBytes.length === expectedBytes.length && timingSafeEqual(receivedBytes, expectedBytes)
}

export async function POST(request: Request) {
  const expectedSecret = process.env.ORDER_TEST_SECRET || ''
  const authorization = request.headers.get('authorization') || ''
  const bearerSecret = authorization.toLowerCase().startsWith('bearer ')
    ? authorization.slice(7)
    : ''
  const receivedSecret = request.headers.get('x-order-test-secret') || bearerSecret

  if (!normalizeSecret(expectedSecret)) {
    return NextResponse.json({ error: 'Test endpoint is not configured.' }, { status: 503 })
  }
  if (!normalizeSecret(receivedSecret) || !secretsMatch(receivedSecret, expectedSecret)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ORDER_EMAIL_FROM
  const to = process.env.ORDER_NOTIFICATION_EMAIL || 'zhou@jkess.com'
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'Order email service is not configured.' }, { status: 503 })
  }

  const sentAt = new Date().toISOString()
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
      subject: '[TEST] JKESS website order email',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111827;line-height:1.6;">
          <h1 style="color:#16a34a;">JKESS order email test succeeded</h1>
          <p style="padding:12px;background:#eff6ff;border:1px solid #bfdbfe;">
            This is a configuration test. No PayPal payment was made and no product should be shipped.
          </p>
          <p><strong>Recipient:</strong> ${to}</p>
          <p><strong>Sent at:</strong> ${sentAt}</p>
          <p>The Vercel function reached Resend and Resend accepted the email request.</p>
        </div>`,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Resend test email failed:', response.status, await response.text())
    return NextResponse.json({ error: 'Test email could not be sent.' }, { status: 502 })
  }

  return NextResponse.json({ sent: true, sentAt })
}
