import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import PaidOrderEmailBridge from '@/components/PaidOrderEmailBridge'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { companyProfile } from '@/lib/company-profile'
import { navigationGroups } from '@/lib/navigation-menu'
import { getLocalizedUiCopy, localizedNavGroupLabel, localizedNavItem } from '@/lib/localized-ui'
import {
  jkessMerchantReturnPolicy,
  jkessMerchantShippingPolicy,
  jkessOrganization,
  jsonLd,
} from '@/lib/structured-data'
import { defaultLocale, isValidLocale, localeMap } from '@/i18n/config'
import { REQUEST_LOCALE_HEADER } from '@/lib/request-locale'
import './globals.css'
import './performance.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JKESS | BMS, Battery Kits and Energy Storage Systems',
    template: '%s',
  },
  description:
    'JKBMS Electronic Technology Co.,Ltd develops BMS control hardware, battery enclosure kits, high-voltage battery management systems, and configured commercial energy storage solutions with direct checkout in selected destinations and quotation review for other regions.',
  keywords: [
    'JKESS',
    'BMS',
    'battery storage',
    'energy storage',
    'battery enclosure kit',
    'high voltage BMS',
    'JKBMS',
  ],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'JKESS',
    url: siteUrl,
    title: 'JKESS | BMS, Battery Kits and Energy Storage Systems',
    description:
      'JKESS supplies battery management hardware, LiFePO4 battery enclosure kits, and configured commercial and industrial energy storage cabinet solutions.',
    images: [
      {
        url: absoluteUrl('/images/news-featured-energy-storage.jpg'),
        width: 1200,
        height: 630,
        alt: 'JKESS energy storage systems and battery management solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JKESS | BMS, Battery Kits and Energy Storage Systems',
    description:
      'Battery management hardware, LiFePO4 battery enclosure kits, and configured commercial energy storage solutions.',
    images: [absoluteUrl('/images/news-featured-energy-storage.jpg')],
  },
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
}

const websiteJsonLd = {
  '@type': 'WebSite',
  name: companyProfile.brandName,
  url: siteUrl,
  publisher: {
    '@type': 'Organization',
    name: companyProfile.companyName,
    logo: absoluteUrl('/images/jkess-logo.png'),
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const requestedLocale = requestHeaders.get(REQUEST_LOCALE_HEADER)
  const lang = requestedLocale && isValidLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale
  const dir = localeMap.get(lang)?.dir || 'ltr'
  const ui = getLocalizedUiCopy(lang)
  let navigationPosition = 0
  const siteNavigationJsonLd = navigationGroups.flatMap((group) => {
    const localizedGroup = localizedNavItem(lang, group.label, group.href || '/', group.description || '')
    const groupName = group.key === 'home'
      ? companyProfile.brandName
      : localizedNavGroupLabel(lang, group.key, localizedGroup.label)
    const groupDescription = lang === 'en' ? group.description : localizedGroup.description || ui.technicalGuides
    const groupItem = group.href
      ? [{
          '@type': 'SiteNavigationElement',
          position: ++navigationPosition,
          name: groupName,
          description: groupDescription,
          url: absoluteUrl(group.href),
        }]
      : []

    const childItems = (group.items || []).map((item) => {
      const localizedItem = localizedNavItem(lang, item.label, item.href, item.description)
      return {
        '@type': 'SiteNavigationElement',
        position: ++navigationPosition,
        name: localizedItem.label,
        description: localizedItem.description,
        url: absoluteUrl(item.href),
      }
    })

    return [...groupItem, ...childItems]
  })
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      jkessOrganization,
      jkessMerchantShippingPolicy,
      jkessMerchantReturnPolicy,
      websiteJsonLd,
      ...siteNavigationJsonLd,
    ],
  }

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <PaidOrderEmailBridge />
        {children}
      </body>
    </html>
  )
}
