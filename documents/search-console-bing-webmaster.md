# Google Search Console and Bing Webmaster Setup

## URLs to submit

- Sitemap: `https://www.jkesstech.com/sitemap.xml`
- Robots: `https://www.jkesstech.com/robots.txt`
- IndexNow key file: `https://www.jkesstech.com/indexnow-key.txt`

## Ownership verification

Set these environment variables in Vercel after copying the verification values from each platform:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

The site renders:

- `<meta name="google-site-verification" content="...">`
- `<meta name="msvalidate.01" content="...">`

## IndexNow submission

Set `INDEXNOW_SUBMIT_SECRET` in Vercel to protect the submission endpoint.

Submit updated URLs with:

```bash
curl -X POST https://www.jkesstech.com/api/indexnow \
  -H "Content-Type: application/json" \
  -H "x-indexnow-secret: YOUR_SECRET" \
  -d "{\"urls\":[\"https://www.jkesstech.com/products/battery-kit\"]}"
```

The API accepts same-site absolute URLs or paths, for example:

```json
{
  "urls": ["/products/battery-kit", "/de/about", "/sitemap.xml"]
}
```

Keep `NEXT_PUBLIC_SITE_URL=https://www.jkesstech.com` so sitemap, robots, structured data, and IndexNow payloads use the canonical host.
