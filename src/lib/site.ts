export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkesstech.com').replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}
