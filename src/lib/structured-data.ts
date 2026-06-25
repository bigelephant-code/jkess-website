import { absoluteUrl, siteUrl } from '@/lib/site'

export const organizationId = `${siteUrl}/#organization`

export const jkessOrganization = {
  '@id': organizationId,
  '@type': ['Organization', 'LocalBusiness', 'ManufacturingBusiness'],
  name: 'JKBMS Electronic Technology Co.,Ltd',
  alternateName: 'JKESS',
  url: siteUrl,
  logo: absoluteUrl('/images/jkess-logo.png'),
  image: absoluteUrl('/images/company-building.webp'),
  email: 'zhou@jkess.com',
  telephone: '+86 131 6282 8868',
  description:
    'JKESS manufactures BMS, LiFePO4 battery kits, high voltage energy storage kits, and commercial ESS cabinet solutions.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Room 1008, Building B4, Yunzhi Science & Technology Park, Guangming Street',
    addressLocality: 'Shenzhen',
    addressRegion: 'Guangdong',
    addressCountry: 'CN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'zhou@jkess.com',
      telephone: '+86 131 6282 8868',
      availableLanguage: ['English', 'Chinese'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://wa.me/8613162828868',
      availableLanguage: ['English', 'Chinese'],
    },
  ],
  sameAs: [
    'https://www.jkesstech.com/',
  ],
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
