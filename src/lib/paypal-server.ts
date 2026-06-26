export class PayPalConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PayPalConfigurationError'
  }
}

export class PayPalVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PayPalVerificationError'
  }
}

type PayPalCapture = {
  id?: string
  status?: string
  amount?: {
    currency_code?: string
    value?: string
  }
}

type PayPalPurchaseUnit = {
  reference_id?: string
  invoice_id?: string
  amount?: {
    currency_code?: string
    value?: string
  }
  payments?: {
    captures?: PayPalCapture[]
  }
}

export type PayPalOrderDetails = {
  id?: string
  status?: string
  payer?: {
    email_address?: string
    payer_id?: string
  }
  purchase_units?: PayPalPurchaseUnit[]
}

function paypalBaseUrl() {
  return process.env.PAYPAL_ENVIRONMENT === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'
}

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new PayPalConfigurationError('PayPal server credentials are not configured.')
  }

  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  const body = (await response.json().catch(() => null)) as
    | { access_token?: string; error_description?: string }
    | null

  if (!response.ok || !body?.access_token) {
    throw new PayPalVerificationError(
      body?.error_description || `PayPal authentication failed with status ${response.status}.`
    )
  }

  return body.access_token
}

export async function getPayPalOrder(paypalOrderId: string) {
  const accessToken = await getAccessToken()
  const response = await fetch(
    `${paypalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  )

  const body = (await response.json().catch(() => null)) as PayPalOrderDetails | null
  if (!response.ok || !body) {
    throw new PayPalVerificationError(
      `PayPal order lookup failed with status ${response.status}.`
    )
  }

  return body
}

function amountToCents(value: string | undefined) {
  if (!value || !/^\d+(\.\d{1,2})?$/.test(value)) return null
  return Math.round(Number(value) * 100)
}

export async function verifyCompletedPayPalOrder(input: {
  paypalOrderId: string
  orderNumber: string
  expectedTotalCents: number
}) {
  const order = await getPayPalOrder(input.paypalOrderId)
  const purchaseUnit = order.purchase_units?.[0]
  const capture = purchaseUnit?.payments?.captures?.find(
    (entry) => entry.status?.toUpperCase() === 'COMPLETED'
  )
  const reference = purchaseUnit?.invoice_id || purchaseUnit?.reference_id
  const currency = capture?.amount?.currency_code || purchaseUnit?.amount?.currency_code
  const paidCents = amountToCents(capture?.amount?.value || purchaseUnit?.amount?.value)

  if (order.id !== input.paypalOrderId) {
    throw new PayPalVerificationError('PayPal order ID mismatch.')
  }
  if (order.status?.toUpperCase() !== 'COMPLETED' || !capture?.id) {
    throw new PayPalVerificationError('PayPal payment is not completed.')
  }
  if (reference !== input.orderNumber) {
    throw new PayPalVerificationError('PayPal invoice reference mismatch.')
  }
  if (currency !== 'USD' || paidCents !== input.expectedTotalCents) {
    throw new PayPalVerificationError('PayPal amount or currency mismatch.')
  }

  return {
    paypalOrderId: order.id,
    paypalCaptureId: capture.id,
    payerEmail: order.payer?.email_address || '',
  }
}
