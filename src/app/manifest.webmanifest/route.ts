const manifest = {
  name: 'JKESS Energy Storage Systems',
  short_name: 'JKESS',
  description: 'BMS, LiFePO4 battery kits, high voltage kits, and commercial energy storage systems.',
  start_url: '/',
  display: 'standalone',
  background_color: '#050505',
  theme_color: '#22c55e',
  icons: [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}

export function GET() {
  return Response.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
