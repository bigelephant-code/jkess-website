export interface ProductSpec {
  key: string
  value: string
}

export interface Product {
  slug: string
  name: string
  category: string
  categoryLabel: string
  tagline: string
  description: string
  features: string[]
  specs: ProductSpec[]
  images: string[]
  type: 'shop' | 'inquiry'
  variants?: { label: string; price?: string }[]
}

export const products: Product[] = [
  {
    slug: 'bms-protection-board',
    name: 'BMS Protection Board',
    category: 'bms',
    categoryLabel: 'BMS Protection Board',
    tagline: 'Intelligent battery management for optimal performance',
    description:
      'Advanced battery management system designed for optimal performance, safety monitoring, and extended battery life across various energy storage applications.',
    features: [
      'Real-time voltage & temperature monitoring',
      'Overcharge / over-discharge protection',
      'Cell balancing for extended cycle life',
      'Compatible with LFP & NMC chemistries',
      'CAN / RS485 communication interface',
      'Smart BMS with Bluetooth monitoring',
    ],
    specs: [
      { key: 'Model', value: 'JK-PB2A16S20P-V19' },
      { key: 'Cell Count', value: '16S (48V)' },
      { key: 'Continuous Current', value: '200A' },
      { key: 'Peak Current', value: '400A (10s)' },
      { key: 'Communication', value: 'CAN / RS485 / Bluetooth' },
      { key: 'Balancing', value: 'Active Balance 2A' },
      { key: 'Operating Temp', value: '-20°C ~ 65°C' },
    ],
    images: [
      '/images/bms-board-1.webp',
      '/images/bms-board-2.webp',
    ],
    type: 'shop',
    variants: [
      { label: '16S 48V 200A', price: '$189.00' },
      { label: '16S 48V 300A', price: '$259.00' },
      { label: '20S 72V 200A', price: '$229.00' },
    ],
  },
  {
    slug: 'battery-kit',
    name: 'Battery Kit',
    category: 'battery-kit',
    categoryLabel: 'Battery Kit',
    tagline: 'Complete energy storage solution, ready to deploy',
    description:
      'Complete battery kits compatible with both 15KWh and 16KWh cells, offering plug-and-play installation for residential and commercial energy storage systems.',
    features: [
      'Dual compatibility: 15KWh & 16KWh cells',
      'Pre-assembled and tested modules',
      'Scalable design for flexible capacity',
      'IP54 rated enclosure for indoor & outdoor use',
      'Integrated BMS with LCD display',
      'Plug-and-play installation',
    ],
    specs: [
      { key: 'Capacity', value: '15KWh / 16KWh' },
      { key: 'Configuration', value: 'Box + BMS + LCD' },
      { key: 'Compatible Cells', value: '280Ah ~ 320Ah LFP' },
      { key: 'Enclosure Rating', value: 'IP54' },
      { key: 'Dimensions', value: '584 × 346 × 210 mm' },
      { key: 'Weight', value: '~35 kg (empty)' },
      { key: 'Warranty', value: '5 years' },
    ],
    images: [
      '/images/battery-kit-hero.webp',
      '/images/battery-kit-system.webp',
      '/images/battery-kit-front.webp',
      '/images/battery-kit-side.webp',
      '/images/battery-kit-rear.webp',
      '/images/battery-kit-display.webp',
    ],
    type: 'shop',
    variants: [
      { label: '15KWh Kit', price: '$1,299.00' },
      { label: '16KWh Kit', price: '$1,399.00' },
    ],
  },
  {
    slug: 'high-voltage-kit',
    name: 'High Voltage Kit',
    category: 'high-voltage-kit',
    categoryLabel: 'High Voltage Kit',
    tagline: 'Industrial-grade high voltage energy storage',
    description:
      'High-performance HV battery solutions engineered for large-scale energy storage, industrial backup power, and grid-support applications.',
    features: [
      'High voltage architecture (up to 800V)',
      'Industry-leading energy density',
      'Advanced thermal management system',
      'CAN / RS485 communication interface',
      'Modular expandable design',
      'Grid-tie & off-grid compatible',
    ],
    specs: [
      { key: 'Voltage Range', value: '400V ~ 800V' },
      { key: 'Capacity', value: '50KWh ~ 200KWh' },
      { key: 'Peak Power', value: 'Up to 150kW' },
      { key: 'Cooling', value: 'Liquid cooling' },
      { key: 'Communication', value: 'CAN / RS485 / Ethernet' },
      { key: 'Certification', value: 'IEC / UL / CE' },
      { key: 'Warranty', value: '10 years' },
    ],
    images: [
      '/images/hv-kit-1.webp',
      '/images/hv-kit-2.webp',
    ],
    type: 'inquiry',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
