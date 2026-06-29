export type NavigationItem = {
  label: string
  href: string
  description: string
}

export type NavigationGroup = {
  key: string
  label: string
  href?: string
  description?: string
  items?: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'shop', label: 'Shop', href: '/products' },
  {
    key: 'products',
    label: 'Products',
    href: '/products',
    description: 'Battery enclosures, BMS hardware, and commercial energy storage products.',
    items: [
      { label: 'Battery Enclosures', href: '/battery-enclosures', description: 'Floor-standing LiFePO4 enclosure kits for 15–16kWh projects.' },
      { label: '6U Rack Enclosures', href: '/rack-battery-enclosures', description: '19-inch rack-mount kits for telecom, backup, and modular storage.' },
      { label: 'High Voltage BMS', href: '/high-voltage-bms', description: 'BCU master and BMU slave control hardware for battery racks.' },
      { label: 'Commercial ESS', href: '/commercial-energy-storage', description: 'Commercial and industrial energy storage cabinet configurations.' },
    ],
  },
  {
    key: 'solutions',
    label: 'Solutions',
    href: '/commercial-energy-storage',
    description: 'Application-focused commercial storage solutions and system configurations.',
    items: [
      { label: 'Commercial Peak Shaving', href: '/solutions/commercial-peak-shaving', description: 'Reduce demand peaks and optimize commercial electricity costs.' },
      { label: '215kWh ESS Cabinet', href: '/commercial-energy-storage/215kwh', description: 'Selection guidance for the 215kWh commercial storage class.' },
      { label: '261kWh ESS Cabinet', href: '/commercial-energy-storage/261kwh', description: 'Selection guidance for the 261kWh commercial storage class.' },
      { label: 'Air vs Liquid Cooling', href: '/guides/air-cooled-vs-liquid-cooled-ess', description: 'Compare cooling architectures for commercial ESS projects.' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    href: '/news',
    description: 'Technical guides, engineering references, and product documentation.',
    items: [
      { label: 'Technical Guides', href: '/news', description: 'JKESS original guides and clearly labeled external sources.' },
      { label: 'Downloads', href: '/downloads', description: 'Product manuals, datasheets, and technical documents.' },
      { label: 'BCU vs BMU', href: '/guides/bcu-vs-bmu', description: 'Understand master and slave roles in high-voltage BMS design.' },
      { label: 'CAN vs RS485', href: '/guides/can-vs-rs485-battery-communication', description: 'Compare battery, inverter, PCS, and EMS communication.' },
      { label: '280Ah vs 314Ah Cells', href: '/guides/280ah-vs-314ah-lifepo4-cells', description: 'Review capacity, fit, terminals, and lifecycle considerations.' },
      { label: 'Match BMS With Inverter', href: '/guides/how-to-match-bms-with-inverter', description: 'Use a compatibility checklist before commissioning.' },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    href: '/about',
    description: 'Company information, quality controls, logistics support, and contact channels.',
    items: [
      { label: 'About', href: '/about', description: 'Company background, manufacturing facts, and energy storage focus.' },
      { label: 'Quality & Manufacturing', href: '/quality-and-manufacturing', description: 'Inspection workflow, documentation, and order-specific checks.' },
      { label: 'Request a Quote', href: '/shipping-quote', description: 'Request destination review, multiple products, quantities, or volume pricing.' },
      { label: 'Contact', href: '/contact', description: 'Send a technical, commercial, or project inquiry to JKESS.' },
    ],
  },
]
