import { createVerify } from 'node:crypto'

export class PayPalWebhookConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PayPalWebhookConfigurationError'
  }
}

export class PayPalWebhookVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PayPalWebhookVerificationError'
  }
}

const certificateCache = new Map<string, { pem: string; expiresAt: number }>()

function crc32(input: Buffer) {
  let crc = 0xffffffff

  for (const byte of input) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1)
      crc = (crc >>> 1) ^ (0xedb88320 & mask)
    }
  }

  return (crc ^ 0xffffffff) >>> 0
}

function allowedCertificateHosts() {
  const environment = process.env.PAYPAL_ENVIRONMENT || process.env.PAYPAL_ENV
  return environment === 'sandbox'
    ? new Set(['api.sandbox.paypal.com', 'api-m.sandbox.paypal.com'])
    : new Set(['api.paypal.com', 'api-m.paypal.com'])
}

function validateCertificateUrl(value: string) {
  let url: URL

  try {
    url = new URL(value)
  } catch {
    throw new PayPalWebhookVerificationError('PayPal certificate URL is invalid.')
  }

  if (
    url.protocol !== 'https:' ||
    !allowedCertificateHosts().has(url.hostname) ||
    !url.pathname.startsWith('/v1/notifications/certs/')
  ) {
    throw new PayPalWebhookVerificationError('PayPal certificate URL is not trusted.')
  }

  return url.toString()
}

async function getCertificate(certUrl: string) {
  const trustedUrl = validateCertificateUrl(certUrl)
  const cached = certificateCache.get(trustedUrl)
  if (cached && cached.expiresAt > Date.now()) return cached.pem

  const response = await fetch(trustedUrl, { cache: 'no-store' })
  const pem = await response.text()

  if (!response.ok || !pem.includes('BEGIN CERTIFICATE')) {
    throw new PayPalWebhookVerificationError(
      `Unable to download PayPal certificate (${response.status}).`
    )
  }

  certificateCache.set(trustedUrl, {
    pem,
    expiresAt: Date.now() + 60 * 60 * 1000,
  })

  return pem
}

function requiredHeader(headers: Headers, name: string) {
  const value = headers.get(name)?.trim()
  if (!value) {
    throw new PayPalWebhookVerificationError(`Missing PayPal header: ${name}.`)
  }
  return value
}

export async function verifyPayPalWebhookSignature(input: {
  headers: Headers
  rawBody: string
}) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID?.trim()
  if (!webhookId) {
    throw new PayPalWebhookConfigurationError('PAYPAL_WEBHOOK_ID is not configured.')
  }

  const transmissionId = requiredHeader(input.headers, 'paypal-transmission-id')
  const transmissionTime = requiredHeader(input.headers, 'paypal-transmission-time')
  const transmissionSignature = requiredHeader(input.headers, 'paypal-transmission-sig')
  const certificateUrl = requiredHeader(input.headers, 'paypal-cert-url')
  const authAlgorithm = requiredHeader(input.headers, 'paypal-auth-algo')

  if (authAlgorithm.toUpperCase() !== 'SHA256WITHRSA') {
    throw new PayPalWebhookVerificationError('Unsupported PayPal signature algorithm.')
  }

  const checksum = crc32(Buffer.from(input.rawBody, 'utf8'))
  const signedMessage = `${transmissionId}|${transmissionTime}|${webhookId}|${checksum}`
  const certificate = await getCertificate(certificateUrl)
  const verifier = createVerify('RSA-SHA256')
  verifier.update(signedMessage)
  verifier.end()

  const valid = verifier.verify(certificate, Buffer.from(transmissionSignature, 'base64'))
  if (!valid) {
    throw new PayPalWebhookVerificationError('PayPal webhook signature is invalid.')
  }

  return true
}
