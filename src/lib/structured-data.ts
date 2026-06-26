import { absoluteUrl, siteUrl } from '@/lib/site'
import { companyProfile } from '@/lib/company-profile'

export const organizationId = `${siteUrl}/#organization`

export const jkessOrganization = {
  '@id': organizationId,
  '@type': ['Organization', 'LocalBusiness', 'ManufacturingBusiness'],
  name: companyProfile.companyName,
  alternateName: companyProfile.brandName,
  url: siteUrl,
  logo: absoluteUrl('/images/jkess-logo.png'),
  image: absoluteUrl('/images/company-building.webp'),
  email: companyProfile.salesEmail,
  telephone: '+86 131 6282 8868',
  foundingDate: String(companyProfile.companyFoundedYear),
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 700,
  },
  description:
    'The team began operating in the new energy sector in 2017. JKBMS Electronic Technology Co.,Ltd was established in 2023, and the JKESS brand launched in 2024. The company operates a 70,000 m² manufacturing facility on a 120-mu site, employs 700+ full-time staff including 100+ R&D professionals, has current annual capacity of 2.1 GWh, and supplies customers across 200+ countries and regions.',
  knowsAbout: [
    'Battery management systems',
    'LiFePO4 battery enclosure kits',
    'High-voltage battery management systems',
    'Commercial and industrial energy storage cabinets',
  ],
  areaServed: '200+ countries and regions',
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
      email: companyProfile.salesEmail,
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
  sameAs: ['https://www.jkesstech.com/'],
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
