const manifest = {
  name: 'JKESS Energy Storage Systems',
  short_name: 'JKESS',
  description: 'BMS, LiFePO4 battery kits, high voltage kits, and commercial energy storage systems.',
  id: '/',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait-primary',
  lang: 'en',
  dir: 'ltr',
  background_color: '#050505',
  theme_color: '#22c55e',
  categories: ['business', 'productivity', 'utilities'],
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
  shortcuts: [
    {
      name: 'Shop JKESS Products',
      short_name: 'Shop',
      description: 'Browse JKESS battery kits, BMS hardware, and energy storage systems.',
      url: '/products',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    {
      name: 'Request a Quote',
      short_name: 'Quote',
      description: 'Request product, bulk purchase, or destination-specific shipping review.',
      url: '/shipping-quote',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    {
      name: 'Technical Downloads',
      short_name: 'Downloads',
      description: 'Open the JKESS technical document library.',
      url: '/downloads',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
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
