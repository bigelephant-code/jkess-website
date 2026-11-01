import { buildRefersionPaidOrder, type VerifiedAffiliateOrder } from './affiliate-refersion-order'
import { validateRefundForOrder, type CaptureDetails, type RefundDetails } from './paypal-refund-validation'

const PAID_ORDER_ENDPOINT = 'https://inbound-webhooks.refersion.com/tracker/orders/paid'
const CANCELLATION_ENDPOINT = 'https://api.refersion.com/v2/conversion/cancel'

export class RefersionReportError extends Error {
  constructor(readonly outcome: 'rejected' | 'unknown', readonly status?: number) {
    super('Refersion order reporting failed')
    this.name = 'RefersionReportError'
  }
}

async function submit(
  endpoint: string,
  payload: unknown,
  credentials: { publicKey: string; secretKey: string },
  send: typeof fetch,
) {
  if (!/^pub_[A-Za-z0-9]+$/.test(credentials.publicKey) ||
      !/^sec_[A-Za-z0-9]+$/.test(credentials.secretKey)) {
    throw new Error('Refersion credentials are not configured')
  }

  let response: Response
  try {
    response = await send(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Refersion-Public-Key': credentials.publicKey,
        'Refersion-Secret-Key': credentials.secretKey,
      },
      body: JSON.stringify(payload),
      redirect: 'error',
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    })
  } catch {
    // Delivery may have succeeded despite a timeout; never retry blindly.
    throw new RefersionReportError('unknown')
  }
  // The legacy cancellation API documents 204 as an invalid request.
  if (endpoint === CANCELLATION_ENDPOINT && response.status === 204) {
    throw new RefersionReportError('rejected', 204)
  }
  if (!response.ok) {
    throw new RefersionReportError(response.status >= 400 && response.status < 500 && response.status !== 429 ? 'rejected' : 'unknown', response.status)
  }
  return { status: 'submitted' as const }
}

/** A successful response means submitted, not that a commission was attributed. */
export async function submitRefersionPaidOrder(
  order: VerifiedAffiliateOrder,
  credentials: { publicKey: string; secretKey: string },
  send: typeof fetch = fetch,
) {
  return submit(PAID_ORDER_ENDPOINT, buildRefersionPaidOrder(order), credentials, send)
}

/** Inputs must be independently retrieved from PayPal and trusted order storage. */
export async function submitRefersionFullRefund(
  order: VerifiedAffiliateOrder,
  verification: {
    refundId: string
    refund: RefundDetails
    capture: CaptureDetails
    storedOrder: { orderNumber: string; paypalCaptureId: string; amount: string; currency: string }
  },
  credentials: { publicKey: string; secretKey: string },
  send: typeof fetch = fetch,
) {
  const payload = buildRefersionPaidOrder(order)
  const stored = verification.storedOrder
  const decision = validateRefundForOrder({
    eventRefundId: verification.refundId,
    refund: verification.refund,
    capture: verification.capture,
    order: stored,
  })
  if (decision.action !== 'cancel' || stored.orderNumber !== order.orderId ||
      stored.currency !== order.currency ||
      !/^\d{1,10}(?:\.\d{1,2})?$/.test(stored.amount)) {
    throw new Error('Full refund does not match the verified order')
  }
  const [whole, fractional = ''] = stored.amount.split('.')
  const storedMinorUnits = Number(whole) * 100 + Number(fractional.padEnd(2, '0'))
  if (!Number.isSafeInteger(storedMinorUnits) || storedMinorUnits !== order.paidMinorUnits) {
    throw new Error('Full refund amount does not match the verified order')
  }
  // The provider can create a new negative conversion for every request.
  // The caller must persist and reconcile ambiguous attempts before any retry.
  return submit(CANCELLATION_ENDPOINT, {
    order_id: payload.order_id,
    items: payload.items.map(({ sku, quantity, price }) => ({ sku, quantity, price })),
  }, credentials, send)
}
