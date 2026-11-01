type Credentials = { clientId: string; clientSecret: string }

/** One in-flight exchange per process. Other instances may still invalidate a token. */
export function createRefersionTokenProvider(credentials: Credentials, send: typeof fetch = fetch, now: () => number = Date.now) {
  let cached: { token: string; expiresAt: number } | null = null
  let pending: Promise<string> | null = null
  return async function accessToken(): Promise<string> {
    if (cached && cached.expiresAt > now()) return cached.token
    if (pending) return pending
    if (!credentials.clientId.trim() || !credentials.clientSecret.trim()) throw new Error('Refersion OAuth is not configured')
    pending = (async () => {
      const response = await send('https://auth.refersion.com/oauth/token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({ client_id: credentials.clientId, client_secret: credentials.clientSecret }),
      })
      if (!response.ok) throw new Error('Refersion OAuth exchange failed')
      const body = await response.json() as { access_token?: unknown; expires_in?: unknown }
      if (typeof body.access_token !== 'string' || !body.access_token || !Number.isSafeInteger(body.expires_in) ||
          (body.expires_in as number) <= 120 || (body.expires_in as number) > 86400) throw new Error('Invalid Refersion OAuth response')
      cached = { token: body.access_token, expiresAt: now() + ((body.expires_in as number) - 60) * 1000 }
      return cached.token
    })()
    try { return await pending } finally { pending = null }
  }
}
