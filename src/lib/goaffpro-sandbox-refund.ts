import { classifyGoAffProReconciliation, readGoAffProReconciliation } from './goaffpro-reconciliation'

/** Only the named internal test affiliate and allowlisted sandbox order can be changed. */
export async function cancelGoAffProSandboxSale(orderNumber: string, token: string, send: typeof fetch = fetch) {
  const testUrl = (process.env.JKESS_SANDBOX_UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '')
  const liveUrls = [process.env.UPSTASH_REDIS_REST_URL, process.env.KV_REST_API_URL].filter(Boolean).map((url) => url!.replace(/\/+$/, ''))
  if ((process.env.PAYPAL_ENVIRONMENT || process.env.PAYPAL_ENV) !== 'sandbox' ||
      process.env.AFFILIATE_SANDBOX_AUTO_TEST_ENABLED !== 'true' ||
      orderNumber !== process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER ||
      !/^JKESS-[A-Z0-9-]{6,80}$/.test(orderNumber) || !testUrl || liveUrls.includes(testUrl)) throw new Error('Explicit isolated sandbox required')

  const before = await readGoAffProReconciliation(orderNumber, 'jkess-test-sandbox', token, send)
  if (before.affiliateId !== 21335892 || classifyGoAffProReconciliation(before) !== 'unpaid-candidate') throw new Error('Test commission requires review')
  const response = await send(`https://api.goaffpro.com/v1/admin/orders/${before.saleId}`, {
    method: 'PATCH', headers: { 'x-goaffpro-access-token': token, 'content-type': 'application/json' },
    body: JSON.stringify({ status: 'rejected' }), redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error('Sandbox cancellation not confirmed')
  const result: unknown = await response.json()
  if (!result || typeof result !== 'object' || 'error' in result) throw new Error('Sandbox cancellation not confirmed')
  const after = await readGoAffProReconciliation(orderNumber, 'jkess-test-sandbox', token, send)
  if (after.saleId !== before.saleId || after.affiliateId !== before.affiliateId || classifyGoAffProReconciliation(after) !== 'balanced') throw new Error('Sandbox reversal requires review')
}
