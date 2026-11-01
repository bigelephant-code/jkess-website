const PREFIX = 'jkess:affiliate:withdrawal:v1:'

export type AffiliateWithdrawal = { paypalOrderId: string; orderNumber: string; token: string }

function valid(value: unknown): value is AffiliateWithdrawal {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.paypalOrderId === 'string' && /^[A-Z0-9]{1,120}$/.test(item.paypalOrderId) &&
    typeof item.orderNumber === 'string' && /^JKESS-[A-Z0-9-]{6,80}$/.test(item.orderNumber) &&
    typeof item.token === 'string' && /^[a-f0-9]{64}$/.test(item.token)
}

export function rememberAffiliateWithdrawal(storage: Storage, value: unknown) {
  if (!valid(value)) throw new Error('Invalid affiliate withdrawal reference')
  const key = PREFIX + value.paypalOrderId
  const json = JSON.stringify(value)
  storage.setItem(key, json)
  if (storage.getItem(key) !== json) throw new Error('Unable to save affiliate withdrawal reference')
}

export async function withdrawPendingAffiliates(storage: Storage, send: typeof fetch = fetch) {
  const keys: string[] = []
  for (let index = 0; index < storage.length; index++) {
    const key = storage.key(index)
    if (key?.startsWith(PREFIX)) keys.push(key)
  }
  let complete = true
  for (const key of keys) {
    const json = storage.getItem(key)
    if (!json) continue
    try {
      const value: unknown = JSON.parse(json)
      if (!valid(value) || key !== PREFIX + value.paypalOrderId) throw new Error('Invalid withdrawal reference')
      const response = await send('/api/affiliate/withdraw', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json,
        cache: 'no-store', signal: AbortSignal.timeout(8_000),
      })
      if (!response.ok || (await response.json() as { status?: string }).status !== 'withdrawn') throw new Error('Withdrawal is pending')
      if (storage.getItem(key) === json) storage.removeItem(key)
    } catch { complete = false }
  }
  return complete
}
