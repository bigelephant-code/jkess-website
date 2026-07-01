import { absoluteUrl, siteUrl } from '@/lib/site'
import { companyProfile } from '@/lib/company-profile'
import {
  FLAT_RATE_SHIPPING_USD,
  euCountries,
  flatRateCountries,
} from '@/lib/shipping-zones'

export const organizationId = `${siteUrl}/#organization`
export const merchantShippingPolicyId = `${siteUrl}/shipping-policy#policy`
export const merchantReturnPolicyId = `${siteUrl}/returns-refunds#policy`

const handlingTime = {
  '@type': 'QuantitativeValue',
  minValue: 1,
  maxValue: 3,
  unitCode: 'DAY',
}

const transitTime = {
  '@type': 'QuantitativeValue',
  minValue: 7,
  maxValue: 35,
  unitCode: 'DAY',
}

function definedRegion(countries: { code: string }[]) {
  return {
    '@type': 'DefinedRegion',
    addressCountry: countries.map((country) => country.code),
  }
}

const directCheckoutCountryCodes = [...euCountries, ...flatRateCountries]
  .map((country) => country.code)

export const jkessOfferShippingDetails = [
  {
    '@type': 'OfferShippingDetails',
    '@id': `${merchantShippingPolicyId}-eu-free`,
    name: 'Free EU standard shipping',
    shippingDestination: definedRegion(euCountries),
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: 0,
      currency: 'USD',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime,
      transitTime,
    },
  },
  {
    '@type': 'OfferShippingDetails',
    '@id': `${merchantShippingPolicyId}-flat-150`,
    name: `Supported non-EU direct checkout shipping — $${FLAT_RATE_SHIPPING_USD} per order`,
    shippingDestination: definedRegion(flatRateCountries),
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: FLAT_RATE_SHIPPING_USD,
      currency: 'USD',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime,
      transitTime,
    },
  },
]

export const jkessMerchantShippingPolicy = {
  '@id': merchantShippingPolicyId,
  '@type': 'MerchantShippingPolicy',
  name: 'JKESS direct checkout shipping policy',
  url: absoluteUrl('/shipping-policy'),
  description:
    'EU delivery addresses receive free standard shipping. The United States, supported Southeast Asia, Japan, South Korea, and listed Middle East destinations use a flat $150 shipping charge per order. Other destinations require a shipping quote before online payment.',
  shippingDestination: [definedRegion(euCountries), definedRegion(flatRateCountries)],
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Quote-only destinations',
      value:
        'Destinations outside the current direct-checkout country lists are reviewed separately through Request a Quote before payment.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Duties and taxes',
      value:
        'Import duties, taxes, customs clearance fees, brokerage charges, and destination-country compliance costs are not included unless expressly stated in checkout or quotation terms.',
    },
  ],
}

export const jkessMerchantReturnPolicy = {
  '@id': merchantReturnPolicyId,
  '@type': 'MerchantReturnPolicy',
  name: 'JKESS returns and refunds policy',
  url: absoluteUrl('/returns-refunds'),
  applicableCountry: directCheckoutCountryCodes,
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 7,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Return authorization',
      value:
        'Customers must contact JKESS and receive written return instructions before sending products back.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Confirmed quality defects',
      value:
        'JKESS bears reasonable approved return shipping costs or provides another agreed remedy for a confirmed product quality problem.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Mandatory local rights',
      value:
        'Longer mandatory cancellation or return periods and non-excludable statutory remedies continue to apply where required by local law.',
    },
  ],
}

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
    'The team began operating in the new energy sector in 2017. JKBMS Electronic Technology Co.,Ltd was established in 2023, and the JKESS brand launched in 2024. The company operates a 70,000 m² manufacturing facility on a 120-mu site, employs 700+ full-time staff including 100+ R&D professionals, has current annual capacity of 2.1 GWh, and supports direct checkout in selected destinations plus quotation-based delivery review for other regions.',
  knowsAbout: [
    'Battery management systems',
    'LiFePO4 battery enclosure kits',
    'High-voltage battery management systems',
    'Commercial and industrial energy storage cabinets',
    'EU warehouse battery kit shipping',
    'Commercial energy storage cabinet project review',
    'Global energy storage distributor cooperation',
  ],
  areaServed: [
    'European Union direct checkout',
    'United States direct checkout',
    'Selected Southeast Asia direct checkout',
    'Japan and South Korea direct checkout',
    'Selected Middle East direct checkout',
    'Other regions by quotation review',
  ],
  hasMerchantReturnPolicy: {
    '@id': merchantReturnPolicyId,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'JKESS battery storage products and cooperation programs',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'LiFePO4 battery enclosure kits',
        url: absoluteUrl('/battery-enclosures'),
      },
      {
        '@type': 'OfferCatalog',
        name: 'High-voltage BMS hardware',
        url: absoluteUrl('/high-voltage-bms'),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Commercial energy storage cabinets',
        url: absoluteUrl('/commercial-energy-storage'),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Global distributor and local partner cooperation',
        url: absoluteUrl('/about'),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Product, bulk purchase, and shipping quote review',
        url: absoluteUrl('/shipping-quote'),
      },
    ],
  },
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
  return JSON.stringify(data).replace(/</g, '\u003c')
}
