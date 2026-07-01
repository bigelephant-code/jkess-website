import { siteUrl } from '@/lib/site'

const defaultIndexNowKey = '0a413e2f4f0550ba613c42a081b9a567'

export function getIndexNowKey() {
  return (process.env.INDEXNOW_KEY || defaultIndexNowKey).trim()
}

export function getIndexNowEndpoint() {
  return (process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow').trim()
}

export function getIndexNowKeyLocation() {
  const configuredLocation = process.env.INDEXNOW_KEY_LOCATION?.trim()
  if (configuredLocation) return configuredLocation
  return `${siteUrl}/indexnow-key.txt`
}

export function isSameSiteUrl(value: string) {
  try {
    const parsed = new URL(value)
    return parsed.origin === siteUrl
  } catch {
    return false
  }
}
