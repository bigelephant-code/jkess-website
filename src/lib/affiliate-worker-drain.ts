type BatchResult = {
  submitted: number
  review: number
  deferred: number
  errors: number
  recovery: { attempted: number; recovered: number }
}

/** Limit scheduled work so one invocation cannot continuously consume resources. */
export async function drainAffiliateBatches(
  runBatch: () => Promise<BatchResult>,
  now: () => number = Date.now,
) {
  const started = now()
  const batches: BatchResult[] = []
  for (let i = 0; i < 5; i++) {
    const result = await runBatch()
    batches.push(result)
    if (result.errors) throw new Error('Affiliate batch requires investigation')
    if (result.submitted + result.review + result.deferred + result.recovery.attempted === 0) break
    if (now() - started >= 5_000) break
  }
  return { batches }
}
