export interface ProductSpec {
  key: string
  value: string
}

export interface ProductFaq {
  question: string
  answer: string
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
  detailImages?: string[]
}

export function getProductFaqs(product: Product): ProductFaq[] {
  if (product.slug === 'battery-kit') {
    return [
      {
        question: 'What battery cells are compatible with the Battery Kit (With Caster)?',
        answer: 'The kit is designed for 280Ah to 320Ah LiFePO4 cells and supports 15KWh or 16KWh energy storage configurations.',
      },
      {
        question: 'Does this battery kit include BMS and LCD options?',
        answer: 'Yes. Customers can choose the BOX and LCD+BMS option for a complete monitored system, or the OnlyBOX option when they only need the enclosure.',
      },
      {
        question: 'Where is the caster battery kit typically used?',
        answer: 'It is suitable for home backup, mobile power, small commercial storage, and semi-outdoor energy storage projects that need easy movement and positioning.',
      },
    ]
  }

  if (product.slug === '6u-battery-kit') {
    return [
      {
        question: 'What is the application of the 6U Battery Kit?',
        answer: 'The 6U Battery Kit is built for 19-inch rack installations, residential solar storage, telecom backup, commercial backup power, and off-grid energy storage systems.',
      },
      {
        question: 'What communication interfaces does the 6U Battery Kit support?',
        answer: 'It supports CAN 2.0 and RS485 communication, making it easier to integrate with compatible inverters and monitoring systems.',
      },
      {
        question: 'Can the 6U Battery Kit be expanded in parallel?',
        answer: 'Yes. The kit is designed for modular parallel expansion, allowing installers to scale capacity for larger energy storage projects.',
      },
    ]
  }

  if (product.slug === 'high-voltage-kit') {
    return [
      {
        question: 'What current options are available for the High Voltage Kit?',
        answer: 'The High Voltage Kit is available in 100A and 200A options, with separate master control box and slave control box selections.',
      },
      {
        question: 'What is the High Voltage Kit used for?',
        answer: 'It is used for high-voltage energy storage systems that require BCU master control, BMU slave monitoring, active balancing, and communication with PCS or EMS equipment.',
      },
      {
        question: 'Does the High Voltage Kit support remote monitoring?',
        answer: 'Yes. The system supports remote OTA upgrades and real-time IoT cloud monitoring depending on the final system configuration.',
      },
    ]
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return [
      {
        question: 'What capacity range does the C&I High Voltage ESS Cabinet cover?',
        answer: 'The cabinet series covers configurations from 64.3kWh to 261kWh, including air-cooled and liquid-cooled commercial and industrial storage systems.',
      },
      {
        question: 'Is the C&I High Voltage ESS Cabinet suitable for outdoor projects?',
        answer: 'Yes. It uses an IP55 outdoor cabinet design with up to C4 anti-corrosion protection, making it suitable for commercial and industrial outdoor energy storage projects.',
      },
      {
        question: 'How do customers order the C&I High Voltage ESS Cabinet?',
        answer: 'This product is handled through inquiry because the final configuration depends on project capacity, cooling method, PCS requirements, site conditions, and communication needs.',
      },
    ]
  }

  return [
    {
      question: `What is ${product.name} used for?`,
      answer: product.description,
    },
  ]
}

const productCatalog: Product[] = [
  {
    slug: 'battery-kit',
    name: 'Battery Kit (With Caster)',
    category: 'battery-kit',
    categoryLabel: 'Battery Kit (With Caster)',
    tagline: 'Complete energy storage solution on wheels, ready to deploy',
    description:
      'The JKESS Roller Battery Kit is a portable energy storage system built on a heavy-duty caster base for easy mobility. It features a robust sheet-metal enclosure, integrated BMS with LCD, and supports both 15KWh and 16KWh LFP cells. Ideal for home backup, mobile power, and small commercial applications requiring flexibility and quick deployment.',
    features: [
      'Heavy-duty caster wheels — easy to move and position, perfect for mobile power needs',
      'Sheet-metal enclosure — durable, IP54 rated for indoor & semi-outdoor use',
      'Dual compatibility — supports both 15KWh & 16KWh LFP cells (280Ah ~ 320Ah)',
      'Integrated BMS with LCD display — real-time monitoring of voltage, current & SOC',
      'Pre-assembled and tested — plug-and-play installation, ready out of the box',
      'Scalable design — connect multiple units for larger capacity requirements',
      'CAN / RS485 communication — integrates with inverters and monitoring systems',
      '1-year warranty — backed by JKBMS quality assurance',
    ],
    specs: [
      { key: 'Capacity', value: '15KWh / 16KWh' },
      { key: 'Configuration', value: 'Box + BMS + LCD + Caster Base' },
      { key: 'Compatible Cells', value: '280Ah ~ 320Ah LFP (LiFePO4)' },
      { key: 'Enclosure', value: 'Sheet-metal, IP54 rated' },
      { key: 'Dimensions', value: '835 × 400 × 280 mm' },
      { key: 'Weight', value: '~28 kg (empty)' },
      { key: 'Mobility', value: '4 heavy-duty caster wheels (2 with brakes)' },
      { key: 'Communication', value: 'CAN 2.0 / RS485' },
      { key: 'Display', value: 'LCD touch screen' },
      { key: 'Warranty', value: '1 years' },
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
      { label: 'BOX and LCD+BMS', price: '$400.00' },
      { label: 'OnlyBOX', price: '$300.00' },
    ],
    detailImages: [
      '/images/battery-kit-detail/1.webp',
      '/images/battery-kit-detail/2.webp',
      '/images/battery-kit-detail/3.webp',
      '/images/battery-kit-detail/4.webp',
      '/images/battery-kit-detail/5.webp',
      '/images/battery-kit-detail/6.webp',
      '/images/battery-kit-detail/7.webp',
      '/images/battery-kit-detail/8.webp',
      '/images/battery-kit-detail/9.webp',
      '/images/battery-kit-detail/10.webp',
      '/images/battery-kit-detail/11.webp',
      '/images/battery-kit-detail/12.webp',
      '/images/battery-kit-detail/13.webp',
      '/images/battery-kit-detail/14.webp',
      '/images/battery-kit-detail/15.webp',
      '/images/battery-kit-detail/16.webp',
    ],
  },
  {
    slug: 'high-voltage-kit',
    name: 'High Voltage Kit',
    category: 'high-voltage-kit',
    categoryLabel: 'High Voltage Kit',
    tagline: 'Industrial-grade high voltage energy storage',
    description:
      'Complete high-voltage BMS solution featuring BCU-B3 master control module & BMU-H5-16 active balancing slave modules. ISO 26262 functional safety design with 1500V detection, active balancing, and smart SOC/SOH/SOP estimation for industrial energy storage.',
    features: [
      'BCU-B3 Master Control: ISO 26262 functional safety, 1500V max detection',
      'BMU-H5-16 Active Balancing: ±5mV accuracy, 2A bidirectional active balancing',
      'SOC / SOH / SOP smart estimation based on physical cell model',
      '9~16 series cell voltage + 8-channel temperature collection per slave',
      'Remote OTA upgrades & real-time IoT cloud monitoring',
      'Multi-level power isolation, high EMC immunity',
      'CAN / RS485 / isoSPI daisy-chain communication with PCS & EMS',
      'Supports LFP, NMC, LMO, LTO battery types, GPS/BeiDou positioning',
    ],
    specs: [
      { key: 'Master Control', value: 'BCU-B3 — ISO 26262, 1500V detection' },
      { key: 'Slave Control', value: 'BMU-H5-16 — 16-cell, 2A active balancing' },
      { key: 'Voltage Accuracy', value: '±5mV (BMU) / ≤1% (BCU total voltage)' },
      { key: 'Current Detection', value: '-300A ~ +300A, ≤1% accuracy' },
      { key: 'Insulation', value: '≥20MΩ, high-voltage interlock' },
      { key: 'Communication', value: 'CAN ×2 / RS485 ×4 / isoSPI daisy-chain' },
      { key: 'Operating Temp', value: '-25°C ~ +85°C (BCU & BMU)' },
      { key: 'Protection', value: 'Overcharge/over-discharge/over-temp/fault alarm' },
    ],
    images: [
      '/images/hv-kit/1.jpg',
      '/images/hv-kit/2.jpg',
      '/images/hv-kit/3.jpg',
      '/images/hv-kit/4.jpg',
      '/images/hv-kit/5.jpg',
      '/images/hv-kit/6.jpg',
    ],
    detailImages: [
      '/images/hv-kit-pdf-detail/page-01.webp',
      '/images/hv-kit-pdf-detail/page-02.webp',
      '/images/hv-kit-pdf-detail/page-03.webp',
      '/images/hv-kit-pdf-detail/page-04.webp',
      '/images/hv-kit-pdf-detail/page-05.webp',
      '/images/hv-kit-pdf-detail/page-06.webp',
      '/images/hv-kit-pdf-detail/page-07.webp',
      '/images/hv-kit-pdf-detail/page-08.webp',
      '/images/hv-kit-pdf-detail/page-09.webp',
      '/images/hv-kit-pdf-detail/page-10.webp',
    ],
    type: 'shop',
    variants: [
      { label: '100A Master Control Box', price: '$1020.00' },
      { label: '100A Slave Control Box', price: '$390.00' },
      { label: '200A Master Control Box', price: '$1180.00' },
      { label: '200A Slave Control Box', price: '$420.00' },
    ],
  },
  {
    slug: 'tness-ci-ess-cabinet',
    name: 'C&I High Voltage ESS Cabinet',
    category: 'commercial-ess',
    categoryLabel: 'C&I ESS Cabinet',
    tagline: 'Outdoor commercial and industrial energy storage cabinets for solar, backup, and peak shaving',
    description:
      'The C&I High Voltage ESS Cabinet series is designed for commercial and industrial energy storage projects, covering small high-voltage cabinets from 64kWh to 120kWh and larger air-cooled or liquid-cooled systems up to 261kWh. It supports peak shaving, demand management, dynamic capacity expansion, emergency backup, and renewable energy self-consumption for hotels, hospitals, commercial centers, industrial parks, and premium residential projects.',
    features: [
      'Wide capacity coverage from 64kWh to 261kWh for different C&I project scales',
      'Modular cabinet architecture with quick-connect battery modules for easier deployment and maintenance',
      'Integrated BMS with active balancing to improve usable energy and extend battery service life',
      'Air-cooled and liquid-cooled options for flexible thermal management requirements',
      'Outdoor IP55 cabinet design with up to C4 anti-corrosion protection',
      'Multi-level electrical protection with DC breaker, fuse, AC surge protection, and polarity protection',
      'Pack-level perfluorohexanone and cabinet-level aerosol fire suppression, with optional water fire protection',
      'Remote monitoring interfaces including WiFi, 4G, LAN, CAN, RS485, and Ethernet depending on configuration',
    ],
    specs: [
      { key: 'Product Series', value: 'Commercial & Industrial High Voltage ESS Cabinet' },
      { key: 'Capacity Range', value: '64.3kWh / 80.4kWh / 100.3kWh / 112.5kWh / 120.57kWh / 215.04kWh / 241kWh / 261kWh' },
      { key: 'Cooling Options', value: 'Intelligent air cooling / liquid cooling' },
      { key: 'Battery Chemistry', value: 'LFP 3.2V 280Ah / 314Ah cells' },
      { key: 'AC Power Range', value: '30kW ~ 125kW' },
      { key: 'PV Input Range', value: '45.5kW ~ 200kW max available PV input' },
      { key: 'DC Voltage Range', value: '165.5V ~ 949V operating range, configuration dependent' },
      { key: 'Round-trip Efficiency', value: '≥88%' },
      { key: 'Protection Rating', value: 'IP55 outdoor cabinet, up to C4 anti-corrosion level' },
      { key: 'Fire Suppression', value: 'Pack-level perfluorohexanone + cabinet-level aerosol + optional water fire protection' },
      { key: 'Communication', value: 'WiFi / 4G / LAN / CAN / RS485 / Ethernet, configuration dependent' },
      { key: 'Operating Temperature', value: '-20°C ~ 55°C' },
      { key: 'Dimensions Range', value: '1050 × 1150 × 1820 mm to 1200 × 1490 × 2472 mm' },
      { key: 'Weight Range', value: '≤850 kg to approx. 2700 kg, configuration dependent' },
    ],
    images: [
      '/images/tness-ci-ess/main-1.webp',
      '/images/tness-ci-ess/main-2.webp',
      '/images/tness-ci-ess/main-3.webp',
      '/images/tness-ci-ess/main-4.webp',
      '/images/tness-ci-ess/main-5.webp',
    ],
    detailImages: [
      '/images/tness-ci-ess-detail/page-01.webp',
      '/images/tness-ci-ess-detail/page-02.webp',
      '/images/tness-ci-ess-detail/page-03.webp',
      '/images/tness-ci-ess-detail/page-04.webp',
      '/images/tness-ci-ess-detail/page-05.webp',
      '/images/tness-ci-ess-detail/page-06.webp',
      '/images/tness-ci-ess-detail/page-07.webp',
      '/images/tness-ci-ess-detail/page-08.webp',
      '/images/tness-ci-ess-detail/page-09.webp',
      '/images/tness-ci-ess-detail/page-10.webp',
      '/images/tness-ci-ess-detail/page-11.webp',
      '/images/tness-ci-ess-detail/page-12.webp',
    ],
    type: 'inquiry',
  },
  {
    slug: '6u-battery-kit',
    name: '6U Battery Kit',
    category: 'battery-kit',
    categoryLabel: '6U Battery Kit',
    tagline: 'Rack-mount energy storage for professional installations',
    description:
      'The JKESS 6U Battery Kit (JKLU015) is a professional-grade energy storage system designed for standard 19-inch rack-mount installations. It features high-energy-density LFP cells, an intelligent BMS with active balancing, and a 4.3-inch LCD display for real-time monitoring. Suitable for residential solar backup, commercial peak shaving, telecom backup, and off-grid applications.',
    features: [
      '6U rack-mount form factor — fits standard 19-inch cabinets for easy integration',
      'Modular parallel design — easy to expand capacity up to 30KWh or more',
      'Intelligent BMS with active cell balancing — extends battery life up to 20%',
      '4.3-inch LCD display — real-time voltage, current, temperature & SOC monitoring',
      'CAN / RS485 communication — seamless integration with inverters and monitoring systems',
      'Modular parallel design — expandable up to 30KWh or more for larger capacity',
      'Compatible with leading inverters — works with Victron, Growatt, Deye, Sofar, and more',
      '1-year warranty — backed by JKBMS quality assurance',
    ],
    specs: [
      { key: 'Model', value: 'JKLU015' },
      { key: 'Nominal Capacity', value: '15KWh' },
      { key: 'Nominal Voltage', value: '51.2V' },
      { key: 'Form Factor', value: '6U Rack-mount (19-inch)' },
      { key: 'Cell Chemistry', value: 'LiFePO4 (LFP)' },
      { key: 'Communication', value: 'CAN 2.0 / RS485' },
      { key: 'Display', value: '4.3-inch LCD Touch' },
      { key: 'Operating Temp', value: '-20°C ~ 60°C' },
      { key: 'Protection Rating', value: 'IP20 (indoor)' },
      { key: 'Dimensions', value: '715 × 472 × 270 mm' },
      { key: 'Weight', value: '~25 kg' },
      { key: 'Warranty', value: '1 years' },
    ],
    images: [
      '/images/6u-kit/1.webp',
      '/images/6u-kit/2.webp',
      '/images/6u-kit/3.webp',
      '/images/6u-kit/4.webp',
      '/images/6u-kit/5.webp',
      '/images/6u-kit/6.webp',
    ],
    detailImages: [
      '/images/6u-kit-detail/1.webp',
      '/images/6u-kit-detail/2.webp',
      '/images/6u-kit-detail/3.webp',
      '/images/6u-kit-detail/4.webp',
      '/images/6u-kit-detail/5.webp',
      '/images/6u-kit-detail/6.webp',
      '/images/6u-kit-detail/7.webp',
      '/images/6u-kit-detail/8.webp',
      '/images/6u-kit-detail/9.webp',
      '/images/6u-kit-detail/10.webp',
      '/images/6u-kit-detail/11.webp',
      '/images/6u-kit-detail/12.webp',
      '/images/6u-kit-detail/14.webp',
      '/images/6u-kit-detail/15.webp',
      '/images/6u-kit-detail/16.webp',
    ],
    type: 'shop',
    variants: [
      { label: 'BOX and LCD+BMS', price: '$380.00' },
      { label: 'OnlyBOX', price: '$280.00' },
    ],
  },
]

const productDisplayOrder = ['battery-kit', '6u-battery-kit', 'high-voltage-kit', 'tness-ci-ess-cabinet']
const getProductDisplayIndex = (slug: string) => {
  const index = productDisplayOrder.indexOf(slug)
  return index === -1 ? productDisplayOrder.length : index
}

export const products: Product[] = [...productCatalog].sort(
  (a, b) => getProductDisplayIndex(a.slug) - getProductDisplayIndex(b.slug)
)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
