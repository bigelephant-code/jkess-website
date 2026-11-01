const LIVE_ORDER_HUB_URL = 'https://www.jkbms.net/api/integrations/jkess/orders'

/** Prevent sandbox payments from being written to the shared production hub. */
export function sandboxUsesProductionHub(paypalEnvironment: string | undefined, hubUrl: string): boolean {
  return paypalEnvironment === 'sandbox' && hubUrl === LIVE_ORDER_HUB_URL
}

export function selectOrderStorageConfig(options: {
  paypalEnvironment: string | undefined
  productionUrl: string | undefined
  productionToken: string | undefined
  sandboxUrl: string | undefined
  sandboxToken: string | undefined
}): { url: string; token: string } | null {
  const normalize = (url: string | undefined) => (url || '').trim().replace(/\/+$/, '')
  const productionUrl = normalize(options.productionUrl)
  const sandboxUrl = normalize(options.sandboxUrl)
  if (options.paypalEnvironment === 'sandbox') {
    if (!sandboxUrl || !options.sandboxToken || (productionUrl && sandboxUrl === productionUrl)) return null
    return { url: sandboxUrl, token: options.sandboxToken }
  }
  if (!productionUrl || !options.productionToken) return null
  return { url: productionUrl, token: options.productionToken }
}
