import { runAffiliateBatch } from './affiliate-batch'
import { processAffiliatePaidTask } from './affiliate-paid-processor'
import { claimAffiliatePaidWithConsent, finishAffiliateReport, readAffiliateReport, reconcileSubmittedAffiliateReport } from './affiliate-report-ledger'
import { listAffiliatePaidTasks } from './affiliate-report-queue'
import { listAffiliateRefundTasks } from './affiliate-refund-queue'
import { dispositionAffiliateTask } from './affiliate-task-disposition'
import { affiliateStoreCommand, getAffiliateAttribution } from './order-store'
import { getPayPalOrder } from './paypal-server'
import { submitGoAffProPaidOrder } from './goaffpro-client'
import { submitRefersionPaidOrder } from './refersion-client'
import { alertAffiliateReviews } from './affiliate-review-alert'
import { readRefersionConversionsLocked } from './refersion-locked-read'
import { recoverRefersionPaidReport } from './affiliate-refersion-recovery'
import { runAffiliateRecoveryQueue } from './affiliate-recovery-queue'

/** Separate switch: credentials or click tracking alone never activate a sender. */
export function productionAffiliateWorkerEnabled(env: Record<string, string | undefined> = process.env) {
  return (env.PAYPAL_ENVIRONMENT || env.PAYPAL_ENV) === 'live' &&
    env.AFFILIATE_PRODUCTION_WORKER_ENABLED === 'true' &&
    env.AFFILIATE_INTEGRATION_ENABLED === 'true' &&
    env.AFFILIATE_REFUND_EVENTS_ENABLED === 'true' &&
    Boolean(env.GOAFFPRO_ACCESS_TOKEN && env.REFERSION_PUBLIC_KEY && env.REFERSION_SECRET_KEY &&
      env.REFERSION_OAUTH_CLIENT_ID && env.REFERSION_OAUTH_CLIENT_SECRET &&
      env.RESEND_API_KEY && env.ORDER_EMAIL_FROM && (env.CRON_SECRET?.length || 0) >= 32)
}

export async function manualAffiliateRefundReview() {
  return { status: 'review' as const }
}

/** All refunds are held for manual review. */
export async function runProductionAffiliateBatch() {
  if (!productionAffiliateWorkerEnabled()) throw new Error('Production affiliate worker is disabled')
  const credentials = { publicKey: process.env.REFERSION_PUBLIC_KEY!, secretKey: process.env.REFERSION_SECRET_KEY! }
  const oauth = { clientId: process.env.REFERSION_OAUTH_CLIENT_ID!, clientSecret: process.env.REFERSION_OAUTH_CLIENT_SECRET! }
  const result = await runAffiliateBatch({
    listPaid: () => listAffiliatePaidTasks(affiliateStoreCommand, 1),
    listRefund: () => listAffiliateRefundTasks(affiliateStoreCommand, 1),
    processPaid: (task) => processAffiliatePaidTask(task, {
      getOrder: getPayPalOrder,
      getAttribution: getAffiliateAttribution,
      claim: (number, provider) => claimAffiliatePaidWithConsent(affiliateStoreCommand, number, task.paypalOrderId, provider),
      finish: (claim, state) => finishAffiliateReport(affiliateStoreCommand, claim, state),
      submitGoAffPro: (order, code) => submitGoAffProPaidOrder(order, code, process.env.GOAFFPRO_ACCESS_TOKEN!),
      submitRefersion: (order) => submitRefersionPaidOrder(order, credentials),
    }),
    processRefund: manualAffiliateRefundReview,
    readReport: (number, operation) => readAffiliateReport(affiliateStoreCommand, number, operation),
    disposition: (task, state) => dispositionAffiliateTask(affiliateStoreCommand, task, state),
    now: Date.now,
  })
  const recovery = await runAffiliateRecoveryQueue(affiliateStoreCommand, (task) => recoverRefersionPaidReport(task, {
    readReport: (number) => readAffiliateReport(affiliateStoreCommand, number, 'paid'),
    getAttribution: getAffiliateAttribution,
    getOrder: getPayPalOrder,
    getConversions: async (number) => {
      const result = await readRefersionConversionsLocked(affiliateStoreCommand, number, oauth)
      if (result.status === 'busy') throw new Error('Refersion lookup is busy')
      return result.entries
    },
    reconcile: (claim, now) => reconcileSubmittedAffiliateReport(affiliateStoreCommand, claim, now),
    now: Date.now,
    isTest: false,
  }))
  await alertAffiliateReviews(affiliateStoreCommand, {
    apiKey: process.env.RESEND_API_KEY!, from: process.env.ORDER_EMAIL_FROM!, to: process.env.ORDER_NOTIFICATION_EMAIL || 'zhou@jkess.com',
  })
  if (result.errors) throw new Error('Affiliate batch requires investigation')
  return { ...result, recovery }
}
