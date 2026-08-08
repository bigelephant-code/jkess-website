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

export type PayPalMoney = {
  currency_code?: string
  value?: string
}

export type PayPalCapture = {
  id?: string
  status?: string
  amount?: PayPalMoney
  create_time?: string
  update_time?: string
}

export type PayPalOrderItem = {
  name?: string
  sku?: string
  quantity?: string
  unit_amount?: PayPalMoney
}

export type PayPalPurchaseUnit = {
  reference_id?: string
  invoice_id?: string
  custom_id?: string
  description?: string
  amount?: PayPalMoney
  items?: PayPalOrderItem[]
  shipping?: {
    name?: {
      full_name?: string
    }
    address?: {
      address_line_1?: string
      address_line_2?: string
      admin_area_1?: string
      admin_area_2?: string
      postal_code?: string
      country_code?: string
    }
  }
  payments?: {
    captures?: PayPalCapture[]
  }
}

export type PayPalOrderDetails = {
  id?: string
  status?: string
  create_time?: string
  update_time?: string
  payer?: {
    email_address?: string
    payer_id?: string
    name?: {
      given_name?: string
      surname?: string
    }
  }
  purchase_units?: PayPalPurchaseUnit[]
}

type PayPalApiErrorBody = {
  name?: string
  message?: string
  debug_id?: string
  details?: Array<{
    issue?: string
    description?: string
  }>
}

export function paypalBaseUrl() {
  const environment = process.env.PAYPAL_ENVIRONMENT || process.env.PAYPAL_ENV
  return environment === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'
}

export async function getPayPalAccessToken() {
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
  const accessToken = await getPayPalAccessToken()
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

async function paypalOrdersRequest(
  path: string,
  init: {
    method: 'POST'
    body?: unknown
    requestId: string
  }
) {
  const accessToken = await getPayPalAccessToken()
  const response = await fetch(`${paypalBaseUrl()}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': init.requestId.slice(0, 108),
      Prefer: 'return=representation',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  })

  const body = (await response.json().catch(() => null)) as
    | PayPalOrderDetails
    | PayPalApiErrorBody
    | null

  if (!response.ok || !body || !('id' in body) || !body.id) {
    const errorBody = body as PayPalApiErrorBody | null
    const detail = errorBody?.details?.[0]
    throw new PayPalVerificationError(
      detail?.description ||
        detail?.issue ||
        errorBody?.message ||
        `PayPal order request failed with status ${response.status}.`
    )
  }

  return body as PayPalOrderDetails
}

export async function createPayPalOrder(payload: unknown, requestId: string) {
  return paypalOrdersRequest('/v2/checkout/orders', {
    method: 'POST',
    body: payload,
    requestId,
  })
}

export async function capturePayPalOrder(paypalOrderId: string) {
  return paypalOrdersRequest(
    `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: 'POST',
      body: {},
      requestId: `capture-${paypalOrderId}`,
    }
  )
}

export function amountToCents(value: string | undefined) {
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
    order,
    capture,
  }
}
