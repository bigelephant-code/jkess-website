export const FLAT_RATE_SHIPPING_USD = 150
export const OTHER_COUNTRY_CODE = 'OTHER'

export type ShippingTier = 'eu-free' | 'flat-150' | 'quote-only' | 'unselected'

export type ShippingCountry = {
  code: string
  name: string
}

export type ShippingCountryGroup = {
  label: string
  countries: ShippingCountry[]
}

const euCountries: ShippingCountry[] = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
]

const flatRateCountries: ShippingCountry[] = [
  { code: 'US', name: 'United States' },
  { code: 'BN', name: 'Brunei' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'LA', name: 'Laos' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'PH', name: 'Philippines' },
  { code: 'SG', name: 'Singapore' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'IL', name: 'Israel' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'TR', name: 'Turkey' },
  { code: 'EG', name: 'Egypt' },
]

const euCodes = new Set(euCountries.map((country) => country.code))
const flatRateCodes = new Set(flatRateCountries.map((country) => country.code))
const countryNames = new Map(
  [...euCountries, ...flatRateCountries].map((country) => [country.code, country.name])
)

export const directCheckoutCountryGroups: ShippingCountryGroup[] = [
  {
    label: 'European Union — Free shipping',
    countries: euCountries,
  },
  {
    label: `United States, Southeast Asia, Middle East, Japan & South Korea — $${FLAT_RATE_SHIPPING_USD} shipping`,
    countries: flatRateCountries,
  },
]

export function getShippingTier(countryCode: string): ShippingTier {
  if (!countryCode) return 'unselected'
  if (euCodes.has(countryCode)) return 'eu-free'
  if (flatRateCodes.has(countryCode)) return 'flat-150'
  return 'quote-only'
}

export function getShippingAmount(countryCode: string) {
  return getShippingTier(countryCode) === 'flat-150' ? FLAT_RATE_SHIPPING_USD : 0
}

export function getShippingCountryName(countryCode: string) {
  if (countryCode === OTHER_COUNTRY_CODE) return 'Other country / region'
  return countryNames.get(countryCode) || countryCode
}

export function isDirectCheckoutCountry(countryCode: string) {
  const tier = getShippingTier(countryCode)
  return tier === 'eu-free' || tier === 'flat-150'
}
