import type { AffiliatePaidTask } from './affiliate-report-queue'
import type { AffiliateRefundTask } from './affiliate-refund-queue'
import type { AffiliateReportClaim } from './affiliate-report-ledger'

type Task = { type: 'paid'; value: AffiliatePaidTask } | { type: 'refund'; value: AffiliateRefundTask }
type Result = { status: 'submitted' | 'review' | 'defer' | 'already-claimed' | 'already-claimed-or-unreported' }
type Dependencies = {
  listPaid: () => Promise<AffiliatePaidTask[]>
  listRefund: () => Promise<AffiliateRefundTask[]>
  processPaid: (task: AffiliatePaidTask) => Promise<Result>
  processRefund: (task: AffiliateRefundTask) => Promise<Result>
  readReport: (order: string, operation: 'paid' | 'full_refund') => Promise<AffiliateReportClaim | null>
  disposition: (task: Task, state: 'defer' | 'review' | 'submitted') => Promise<unknown>
  now: () => number
}

/** Submitted reports remain in the review queue until platform attribution is confirmed. */
export async function runAffiliateBatch(deps: Dependencies) {
  const counts = { submitted: 0, review: 0, deferred: 0, errors: 0 }
  const tasks: Task[] = [
    ...(await deps.listPaid()).map((value): Task => ({ type: 'paid', value })),
    ...(await deps.listRefund()).map((value): Task => ({ type: 'refund', value })),
  ]
  for (const task of tasks) {
    try {
      let result: Result
      let processingFailed = false
      try {
        result = task.type === 'paid' ? await deps.processPaid(task.value) : await deps.processRefund(task.value)
      } catch {
        // A worker crash or timeout may have occurred after sending to a provider.
        processingFailed = true
        result = { status: 'already-claimed' }
      }
      let state: 'defer' | 'review' | 'submitted'
      if (result.status === 'submitted') state = 'submitted'
      else if (result.status === 'review') state = 'review'
      else if (result.status === 'defer') state = 'defer'
      else {
        const report = await deps.readReport(task.value.orderNumber, task.type === 'paid' ? 'paid' : 'full_refund')
        if (report?.state === 'submitted') state = 'submitted'
        else if (report?.state === 'unknown' || report?.state === 'rejected' ||
          (report?.state === 'claimed' && deps.now() - report.updatedAt > 5 * 60_000)) state = 'review'
        else if (!report && processingFailed) state = 'review'
        else if (!report && task.type === 'refund') {
          const paid = await deps.readReport(task.value.orderNumber, 'paid')
          state = paid?.state === 'claimed' && deps.now() - paid.updatedAt <= 5 * 60_000 ? 'defer' : 'review'
        } else state = 'defer'
      }
      await deps.disposition(task, state)
      if (state === 'defer') counts.deferred++
      else counts[state]++
    } catch { counts.errors++ }
  }
  return counts
}
