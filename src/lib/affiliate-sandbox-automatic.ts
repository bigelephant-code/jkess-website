import { runAffiliateBatch } from './affiliate-batch'
import { processAffiliatePaidTask } from './affiliate-paid-processor'
import { processAffiliateRefundTask } from './affiliate-refund-processor'
import { claimAffiliateReport, finishAffiliateReport, readAffiliateReport } from './affiliate-report-ledger'
import { listAffiliatePaidTasks } from './affiliate-report-queue'
import { listAffiliateRefundTasks } from './affiliate-refund-queue'
import { dispositionAffiliateTask } from './affiliate-task-disposition'
import { affiliateStoreCommand, getAffiliateAttribution, getStoredOrder } from './order-store'
import { getPayPalCapture, getPayPalOrder, getPayPalRefund } from './paypal-server'
import { submitGoAffProPaidOrder } from './goaffpro-client'
import { submitRefersionFullRefund, submitRefersionPaidOrder } from './refersion-client'
import { cancelGoAffProSandboxSale } from './goaffpro-sandbox-refund'

export function sandboxAffiliateAutoEnabled() {
  const testUrl = (process.env.JKESS_SANDBOX_UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '')
  const liveUrls = [process.env.UPSTASH_REDIS_REST_URL, process.env.KV_REST_API_URL].filter(Boolean).map((url) => url!.replace(/\/+$/, ''))
  return (process.env.PAYPAL_ENVIRONMENT || process.env.PAYPAL_ENV) === 'sandbox' &&
    process.env.AFFILIATE_SANDBOX_AUTO_TEST_ENABLED === 'true' && !!testUrl && !liveUrls.includes(testUrl) &&
    /^JKESS-[A-Z0-9-]{6,80}$/.test(process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER || '')
}

/** Explicit sandbox-only allowlist; no automatic production processing. */
export async function runSandboxAffiliateBatch() {
  if (!sandboxAffiliateAutoEnabled()) throw new Error('Explicit isolated sandbox is required')
  const allowed = process.env.AFFILIATE_SANDBOX_AUTO_TEST_ORDER!
  const publicKey = process.env.REFERSION_PUBLIC_KEY || ''
  const secretKey = process.env.REFERSION_SECRET_KEY || ''
  const goToken = process.env.GOAFFPRO_ACCESS_TOKEN || ''
  const credentials = { publicKey, secretKey }
  const getTestAttribution = async (orderId: string) => {
    const attribution = await getAffiliateAttribution(orderId)
    if (!attribution || !((attribution.source.provider === 'goaffpro' && attribution.source.code === 'jkess-test-sandbox') ||
      (attribution.source.provider === 'refersion' && attribution.source.code === '9396324.5l1pnlj'))) throw new Error('Test affiliate required')
    return attribution
  }
  return runAffiliateBatch({
    listPaid: async () => (await listAffiliatePaidTasks(affiliateStoreCommand, 100)).filter((task) => task.orderNumber === allowed),
    listRefund: async () => (await listAffiliateRefundTasks(affiliateStoreCommand, 100)).filter((task) => task.orderNumber === allowed),
    processPaid: (task) => processAffiliatePaidTask(task, {
      getOrder: getPayPalOrder, getAttribution: getTestAttribution,
      claim: (number, provider) => claimAffiliateReport(affiliateStoreCommand, number, 'paid', provider),
      finish: (claim, state) => finishAffiliateReport(affiliateStoreCommand, claim, state),
      submitGoAffPro: (order, code) => submitGoAffProPaidOrder(order, code, goToken),
      submitRefersion: (order) => submitRefersionPaidOrder(order, credentials),
    }),
    processRefund: async (task) => {
      const stored = await getStoredOrder(task.orderNumber)
      if (!stored) return { status: 'review' as const }
      await getTestAttribution(stored.paypalOrderId)
      return processAffiliateRefundTask(task, {
        getStoredOrder, getAttribution: getTestAttribution, getOrder: getPayPalOrder,
        getRefund: getPayPalRefund, getCapture: getPayPalCapture,
        claim: (number, provider) => claimAffiliateReport(affiliateStoreCommand, number, 'full_refund', provider),
        finish: (claim, state) => finishAffiliateReport(affiliateStoreCommand, claim, state),
        cancelGoAffPro: (number) => cancelGoAffProSandboxSale(number, goToken),
        cancelRefersion: (order, verification) => submitRefersionFullRefund(order, verification, credentials),
      })
    },
    readReport: (number, operation) => readAffiliateReport(affiliateStoreCommand, number, operation),
    disposition: (task, state) => dispositionAffiliateTask(affiliateStoreCommand, task, state),
    now: Date.now,
  })
}
