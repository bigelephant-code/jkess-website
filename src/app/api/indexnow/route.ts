import { NextResponse } from 'next/server'
import { getIndexNowEndpoint, getIndexNowKey, getIndexNowKeyLocation, isSameSiteUrl } from '@/lib/indexnow'
import { siteUrl } from '@/lib/site'

type IndexNowRequestBody = {
  url?: string
  urls?: string[]
  secret?: string
}

function normalizeSubmittedUrl(value: unknown) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null

  const absolute = trimmed.startsWith('/')
    ? `${siteUrl}${trimmed}`
    : trimmed

  if (!isSameSiteUrl(absolute)) return null
  return absolute
}

export async function POST(request: Request) {
  const submitSecret = process.env.INDEXNOW_SUBMIT_SECRET?.trim()
  let body: IndexNowRequestBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (submitSecret) {
    const headerSecret = request.headers.get('x-indexnow-secret')?.trim()
    if (headerSecret !== submitSecret && body.secret !== submitSecret) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }
  }

  const candidates = [
    body.url,
    ...(Array.isArray(body.urls) ? body.urls : []),
  ]
  const urlList = Array.from(new Set(candidates
    .map(normalizeSubmittedUrl)
    .filter((value): value is string => Boolean(value))))
    .slice(0, 100)

  if (!urlList.length) {
    return NextResponse.json(
      { error: 'Submit at least one same-site URL or path.' },
      { status: 400 }
    )
  }

  const response = await fetch(getIndexNowEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: getIndexNowKey(),
      keyLocation: getIndexNowKeyLocation(),
      urlList,
    }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    return NextResponse.json(
      {
        error: 'IndexNow submission failed.',
        status: response.status,
        response: text.slice(0, 500),
      },
      { status: 502 }
    )
  }

  return NextResponse.json({
    submitted: urlList.length,
    urlList,
  })
}
