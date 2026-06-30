export interface ProductSpec {
  key: string
  value: string
}

export interface ProductFaq {
  question: string
  answer: string
}

export interface ProductUseCases {
  applications: string[]
  compatibleSystems: string[]
  selectionNotes: string[]
}

export interface ProductSeoContent {
  projectFit: string
  installationNotes: string[]
  procurementNotes: string[]
}

export interface Product {
  slug: string
  name: string
  category: string
  categoryLabel: string
  tagline: string
  description: string
  included: string[]
  notIncluded: string[]
  features: string[]
  specs: ProductSpec[]
  images: string[]
  type: 'shop' | 'inquiry'
  variants?: { label: string; price?: string }[]
  detailImages?: string[]
}

export function getProductSeoContent(product: Product): ProductSeoContent {
  if (product.slug === 'battery-kit') {
    return {
      projectFit:
        'This caster battery enclosure kit is intended for low-voltage LiFePO4 projects where installers need a movable enclosure and optional integrated monitoring hardware. It is commonly selected for residential backup, small commercial storage, outdoor work power, and demonstration systems after compatible cells are installed.',
      installationNotes: [
        'Confirm cell dimensions, inverter communication compatibility, and cable layout before assembly.',
        'Reserve enough floor clearance for caster movement, cable bend radius, and ventilation.',
        'Select Enclosure + LCD + BMS when integrated protection and local monitoring are required.',
      ],
      procurementNotes: [
        'Share target assembled capacity, cell brand, inverter model, and destination country for compatibility confirmation.',
        'For repeat projects, confirm enclosure color, logo, wiring layout, and selected hardware package.',
      ],
    }
  }

  if (product.slug === '6u-battery-kit') {
    return {
      projectFit:
        'The 6U Battery Kit is a 19-inch rack-mount enclosure and integration kit for building a compact LiFePO4 battery module. It fits residential solar backup, telecom rooms, small commercial backup systems, and off-grid equipment rooms after compatible cells are installed.',
      installationNotes: [
        'Confirm rack depth, front service clearance, cell dimensions, and cabinet airflow before installation.',
        'Plan parallel capacity, breaker sizing, and communication addresses before scaling multiple units.',
        'Verify CAN or RS485 compatibility with the selected inverter during commissioning.',
      ],
      procurementNotes: [
        'Provide rack layout, target assembled capacity, inverter brand, cell specification, and required quantity.',
        'Select Enclosure + LCD + BMS for integrated electronics, or Enclosure Only when electronics are sourced separately.',
      ],
    }
  }

  if (product.slug === 'high-voltage-kit') {
    return {
      projectFit:
        'The High Voltage BMS Control Kit is designed for commercial and industrial battery racks where BCU master and BMU slave control hardware coordinates voltage sampling, current detection, insulation monitoring, active balancing, and communication with PCS or EMS equipment.',
      installationNotes: [
        'Confirm total pack voltage, cell count, current rating, and required master/slave box quantities before ordering.',
        'Reserve isolated wiring routes for high-voltage detection, communication, and safety interlock circuits.',
        'Match CAN, RS485, or isoSPI communication requirements with the PCS and EMS design.',
      ],
      procurementNotes: [
        'Choose 100A for moderate-current racks and 200A when higher current capability is required.',
        'Share the single-line diagram, pack configuration, PCS model, and protection requirements for engineering review.',
      ],
    }
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return {
      projectFit:
        'The C&I High Voltage ESS Cabinet is a configurable integrated cabinet platform for commercial energy storage projects such as peak shaving, backup power, solar self-consumption, demand management, and industrial park energy optimization. The final supply scope is defined in the project quotation.',
      installationNotes: [
        'Confirm outdoor placement, foundation, ventilation clearance, ambient temperature, and fire protection requirements.',
        'Choose air cooling or liquid cooling according to power density, duty cycle, and site thermal conditions.',
        'Coordinate PCS, EMS, grid connection, and monitoring interfaces during project design.',
      ],
      procurementNotes: [
        'Share capacity target, AC power, PV input needs, grid standard, site photos, and delivery country.',
        'The final quotation confirms battery modules, PCS, EMS, cooling, fire protection, monitoring, and other included components.',
      ],
    }
  }

  return {
    projectFit: product.description,
    installationNotes: ['Confirm system voltage, communication method, installation environment, and safety requirements.'],
    procurementNotes: ['Contact JKESS with project drawings and quantity requirements for configuration support.'],
  }
}

export function getProductUseCases(product: Product): ProductUseCases {
  if (product.slug === 'battery-kit') {
    return {
      applications: [
        'Home backup power and residential solar storage assembly projects',
        'Movable battery systems for workshops, cabins, and outdoor work sites',
        'Small commercial storage projects that need easy movement and positioning',
      ],
      compatibleSystems: [
        '51.2V low-voltage LiFePO4 battery systems',
        'CAN 2.0 / RS485 inverter communication environments',
        '280Ah to 320Ah LFP cell configurations',
      ],
      selectionNotes: [
        'Choose Enclosure + LCD + BMS when integrated monitoring and protection hardware is required.',
        'Choose Enclosure Only when cells, BMS, display, and related electronics are sourced separately.',
        'Battery cells must be purchased separately for every option.',
      ],
    }
  }

  if (product.slug === '6u-battery-kit') {
    return {
      applications: [
        '19-inch rack solar battery assembly projects for homes and commercial sites',
        'Telecom backup power and equipment room energy storage',
        'Off-grid and hybrid inverter systems needing modular rack expansion',
      ],
      compatibleSystems: [
        'Standard 19-inch cabinet and rack installations',
        '51.2V LiFePO4 battery storage platforms',
        'CAN 2.0 / RS485 compatible inverter and monitoring systems',
      ],
      selectionNotes: [
        'Choose Enclosure + LCD + BMS for integrated monitoring and protection hardware.',
        'Choose Enclosure Only when the project uses separately sourced electronics.',
        'The stated supported capacity applies only after compatible cells are installed.',
      ],
    }
  }

  if (product.slug === 'high-voltage-kit') {
    return {
      applications: [
        'Commercial and industrial high-voltage energy storage systems',
        'PCS and EMS integrated battery racks requiring BCU and BMU coordination',
        'High-voltage battery clusters with active balancing and remote monitoring',
      ],
      compatibleSystems: [
        '100A or 200A high-voltage battery control architectures',
        'PCS / EMS systems using CAN, RS485, or isoSPI communication',
        'LFP, NMC, LMO, and LTO battery chemistry configurations',
      ],
      selectionNotes: [
        'Each listed price applies to the selected master or slave control box only.',
        'Confirm master and slave box quantities based on pack count, voltage, and EMS design.',
        'Battery cells, modules, racks, PCS, and EMS equipment are not included.',
      ],
    }
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return {
      applications: [
        'Commercial peak shaving, demand management, and time-of-use optimization',
        'Industrial park, hospital, hotel, and commercial center backup power',
        'Solar self-consumption and renewable energy storage projects',
      ],
      compatibleSystems: [
        '30kW to 125kW AC power commercial and industrial projects',
        'Outdoor IP55 ESS installations with air-cooled or liquid-cooled design',
        'WiFi, 4G, LAN, CAN, RS485, and Ethernet monitoring environments',
      ],
      selectionNotes: [
        'Request a quotation after the final capacity, PCS power, cooling method, and site conditions are defined.',
        'The quotation is the controlling document for the final included equipment and services.',
        'Confirm fire suppression, anti-corrosion, communication, installation, and commissioning requirements during project design.',
      ],
    }
  }

  return {
    applications: [product.description],
    compatibleSystems: ['JKESS energy storage projects'],
    selectionNotes: ['Contact JKESS for configuration support.'],
  }
}

export function getProductFaqs(product: Product): ProductFaq[] {
  if (product.slug === 'battery-kit') {
    return [
      {
        question: 'Are battery cells included with the Battery Kit (With Caster)?',
        answer: 'No. The kit is supplied as enclosure and assembly hardware, with optional LCD and BMS depending on the selected variant. Compatible 280Ah to 320Ah LiFePO4 cells must be purchased separately.',
      },
      {
        question: 'What is included in each Battery Kit option?',
        answer: 'Enclosure Only supplies the enclosure hardware and caster base. Enclosure + LCD + BMS also includes the specified display and BMS hardware. Refer to the final packing list for the exact accessories supplied.',
      },
      {
        question: 'Where is the caster battery kit typically used?',
        answer: 'It is suitable for home backup, mobile power, small commercial storage, and semi-outdoor battery assembly projects that need easy movement and positioning.',
      },
      {
        question: 'Can the Battery Kit be shipped to Europe?',
        answer: 'European Union delivery addresses can use the current direct-checkout shipping rule where available. For bulk quantities, remote areas, or project delivery requirements, request a written quotation before ordering.',
      },
      {
        question: 'Can JKESS support OEM color, logo, or repeat project requirements?',
        answer: 'Yes. Share the target quantity, color requirement, logo placement, cell plan, inverter model, and destination country so JKESS can review feasible OEM or repeat-project options.',
      },
    ]
  }

  if (product.slug === '6u-battery-kit') {
    return [
      {
        question: 'Are battery cells included with the 6U Battery Kit?',
        answer: 'No. The stated 15kWh capacity is the supported assembled configuration after compatible LiFePO4 cells are installed. Battery cells must be purchased separately.',
      },
      {
        question: 'What is the application of the 6U Battery Kit?',
        answer: 'The kit is designed for 19-inch rack battery assembly projects, residential solar storage, telecom backup, commercial backup power, and off-grid systems.',
      },
      {
        question: 'Can the 6U Battery Kit be expanded in parallel?',
        answer: 'Yes. After compatible cells and electronics are installed, multiple modules can be planned for parallel expansion subject to BMS, inverter, breaker, and cabling requirements.',
      },
      {
        question: 'Is the 6U Battery Kit suitable for EU residential solar storage projects?',
        answer: 'It can be used in EU-oriented residential or small commercial storage assembly projects when the final battery cells, BMS, inverter communication, protection devices, and installation rules are confirmed by the installer.',
      },
      {
        question: 'What information should I provide before buying several 6U kits?',
        answer: 'Provide the inverter model, target capacity, rack layout, cell specification, quantity, destination country, and any documentation requirements so JKESS can confirm the correct option and shipping route.',
      },
    ]
  }

  if (product.slug === 'high-voltage-kit') {
    return [
      {
        question: 'What is included in the listed High Voltage Kit price?',
        answer: 'The price applies only to the selected 100A or 200A BCU master control box or BMU slave control box. Battery cells, battery modules, battery racks, PCS, EMS, and complete battery packs are not included.',
      },
      {
        question: 'What is the High Voltage Kit used for?',
        answer: 'It is BMS control hardware for high-voltage energy storage systems requiring master control, slave monitoring, active balancing, insulation monitoring, and PCS or EMS communication.',
      },
      {
        question: 'Does the High Voltage Kit support remote monitoring?',
        answer: 'Remote OTA upgrades and IoT monitoring can be supported depending on the final system architecture and selected supporting services.',
      },
      {
        question: 'How do I choose between the 100A and 200A High Voltage Kit options?',
        answer: 'Choose based on the full electrical design, including continuous current, peak current, pack voltage, PCS power, thermal design, contactors, fuses, cables, and duty cycle. JKESS can review the selection before purchase.',
      },
      {
        question: 'Can JKESS review PCS or EMS communication compatibility?',
        answer: 'Yes. Send the PCS or EMS model, protocol requirement, voltage range, current rating, contactor logic, and project diagram so JKESS can review CAN, RS485, or isoSPI integration requirements.',
      },
    ]
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return [
      {
        question: 'What capacity range does the C&I High Voltage ESS Cabinet cover?',
        answer: 'The cabinet platform covers configurations from 64.3kWh to 261kWh, including air-cooled and liquid-cooled commercial and industrial storage systems.',
      },
      {
        question: 'What is included with a C&I ESS Cabinet order?',
        answer: 'The final quotation defines the exact supply scope, including the selected cabinet, battery modules, BMS, PCS, EMS, cooling, fire suppression, monitoring, accessories, and services where specified.',
      },
      {
        question: 'How do customers order the C&I High Voltage ESS Cabinet?',
        answer: 'This product is supplied through project quotation because the final configuration depends on capacity, cooling method, PCS requirements, site conditions, certification, installation, and communication needs.',
      },
      {
        question: 'Can the C&I ESS Cabinet be configured for European projects?',
        answer: 'Yes. Share the delivery country, grid connection requirements, capacity target, AC power, site environment, compliance documents required by the customer, and installation scope for project review.',
      },
      {
        question: 'Does the quotation include freight, duty, tax, or onsite installation?',
        answer: 'Only the signed written quotation defines whether freight, duty, tax, installation, commissioning, training, or site services are included. Items not listed in the quotation should be treated as excluded.',
      },
    ]
  }

  return [{ question: `What is ${product.name} used for?`, answer: product.description }]
}

const productCatalog: Product[] = [
  {
    slug: 'battery-kit',
    name: 'Battery Kit (With Caster)',
    category: 'battery-kit',
    categoryLabel: 'Caster Battery Enclosure Kit',
    tagline: 'Movable LiFePO4 battery enclosure kit with optional BMS and LCD',
    description:
      'The JKESS Roller Battery Kit is a heavy-duty enclosure and assembly hardware kit for building a movable 51.2V LiFePO4 storage battery. It supports 280Ah to 320Ah cells and 15kWh or 16kWh assembled configurations after compatible cells are installed. Choose either the enclosure-only package or the package with the specified BMS and LCD. Battery cells are not included.',
    included: [
      'Heavy-duty sheet-metal enclosure with caster base',
      'Internal mechanical and connection hardware supplied with the selected package',
      'LCD display and BMS only when the Enclosure + LCD + BMS option is selected',
      'Standard packing list and applicable product documentation',
    ],
    notIncluded: [
      'LiFePO4 battery cells',
      'Inverter, charger, external breaker, and external cabling',
      'Onsite assembly, installation, and commissioning',
      'Any component not listed in the selected variant or final packing list',
    ],
    features: [
      'Heavy-duty caster wheels for easier movement and positioning',
      'Sheet-metal enclosure with IP54-rated enclosure design',
      'Supports 280Ah to 320Ah LiFePO4 cell configurations',
      'Optional BMS and LCD package for monitoring and protection hardware',
      'CAN / RS485 communication when the compatible BMS package is selected',
      'Designed for 15kWh or 16kWh assembled battery configurations',
      'Scalable project design subject to inverter, BMS, breaker, and cabling requirements',
      '1-year warranty for the supplied JKESS hardware',
    ],
    specs: [
      { key: 'Product Type', value: 'Battery enclosure and assembly hardware kit' },
      { key: 'Supported Assembled Capacity', value: '15kWh / 16kWh after compatible cells are installed' },
      { key: 'Battery Cells Included', value: 'No' },
      { key: 'Package Options', value: 'Enclosure Only / Enclosure + LCD + BMS' },
      { key: 'Compatible Cells', value: '280Ah ~ 320Ah LFP (LiFePO4)' },
      { key: 'Enclosure', value: 'Sheet-metal, IP54-rated design' },
      { key: 'Dimensions', value: '835 × 400 × 280 mm' },
      { key: 'Weight', value: '~28 kg empty, configuration dependent' },
      { key: 'Mobility', value: '4 heavy-duty caster wheels, 2 with brakes' },
      { key: 'Communication', value: 'CAN 2.0 / RS485 with compatible BMS option' },
      { key: 'Warranty', value: '1 year for supplied hardware' },
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
      { label: 'Enclosure + LCD + BMS', price: '$400.00' },
      { label: 'Enclosure Only', price: '$300.00' },
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
    categoryLabel: 'High Voltage BMS Control Kit',
    tagline: 'BCU and BMU control hardware for high-voltage battery systems',
    description:
      'The JKESS High Voltage Kit is modular BMS control hardware for high-voltage energy storage systems. Customers select an individual 100A or 200A BCU master control box or BMU slave control box. The selected price applies only to that control box. Battery cells, battery modules, battery racks, PCS, EMS, and complete battery packs are not included.',
    included: [
      'The selected 100A or 200A BCU master control box or BMU slave control box',
      'Embedded control and communication hardware provided with that selected model',
      'Standard accessories and documentation listed in the model packing list',
      'Configuration guidance based on project information supplied to JKESS',
    ],
    notIncluded: [
      'Battery cells, battery modules, and complete battery packs',
      'Additional master or slave control boxes not selected in the order',
      'Battery rack, high-voltage cabling, contactors, PCS, EMS, and inverter equipment',
      'System engineering, onsite installation, and commissioning unless separately quoted',
    ],
    features: [
      'BCU-B3 master control with ISO 26262-oriented functional safety design and 1500V detection',
      'BMU-H5-16 slave control with ±5mV accuracy and 2A bidirectional active balancing',
      'SOC / SOH / SOP estimation based on the battery model',
      '9 to 16 series cell voltage and 8-channel temperature collection per slave',
      'Remote OTA and IoT monitoring support depending on final architecture',
      'Multi-level power isolation and high EMC immunity',
      'CAN / RS485 / isoSPI communication with compatible PCS and EMS equipment',
      'Supports LFP, NMC, LMO, and LTO battery system designs',
    ],
    specs: [
      { key: 'Product Type', value: 'High-voltage BMS control hardware' },
      { key: 'Order Scope', value: 'One selected master or slave control box per ordered unit' },
      { key: 'Battery Included', value: 'No' },
      { key: 'Master Control', value: 'BCU-B3 — ISO 26262-oriented design, 1500V detection' },
      { key: 'Slave Control', value: 'BMU-H5-16 — 16-cell, 2A active balancing' },
      { key: 'Voltage Accuracy', value: '±5mV BMU / ≤1% BCU total voltage' },
      { key: 'Current Detection', value: '-300A ~ +300A, ≤1% accuracy' },
      { key: 'Insulation', value: '≥20MΩ, high-voltage interlock' },
      { key: 'Communication', value: 'CAN ×2 / RS485 ×4 / isoSPI daisy-chain' },
      { key: 'Operating Temperature', value: '-25°C ~ +85°C' },
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
    categoryLabel: 'Configurable C&I ESS Cabinet',
    tagline: 'Configured-to-order integrated energy storage cabinet for commercial and industrial projects',
    description:
      'The C&I High Voltage ESS Cabinet is a configurable integrated cabinet platform for commercial and industrial energy storage projects. Available configurations cover approximately 64.3kWh to 261kWh with air-cooled or liquid-cooled options. The final quotation defines the exact battery modules, BMS, PCS, EMS, cooling, fire suppression, monitoring, accessories, installation support, and other supplied items.',
    included: [
      'The ESS cabinet and factory-integrated components specifically listed in the project quotation',
      'Selected battery modules, BMS, PCS, EMS, cooling, fire protection, and monitoring where specified',
      'Factory assembly and testing for the quoted configuration',
      'Technical documentation and remote support listed in the quotation',
    ],
    notIncluded: [
      'Civil works, foundation, crane work, and site preparation unless quoted',
      'Site AC/DC cabling, switchgear, transformer, and grid interconnection unless quoted',
      'Onsite installation, commissioning, travel, and training unless quoted',
      'Any equipment, certification, freight, duty, tax, or service not included in the final quotation',
    ],
    features: [
      'Capacity configurations from approximately 64.3kWh to 261kWh',
      'Modular cabinet architecture with quick-connect battery modules',
      'Integrated BMS with active balancing in applicable configurations',
      'Air-cooled and liquid-cooled options',
      'Outdoor IP55 cabinet design with up to C4 anti-corrosion protection',
      'Multi-level electrical protection according to selected configuration',
      'Pack-level and cabinet-level fire protection options',
      'WiFi, 4G, LAN, CAN, RS485, and Ethernet monitoring options',
    ],
    specs: [
      { key: 'Product Type', value: 'Configured-to-order C&I energy storage cabinet' },
      { key: 'Final Supply Scope', value: 'Defined by the signed project quotation' },
      { key: 'Capacity Range', value: '64.3kWh / 80.4kWh / 100.3kWh / 112.5kWh / 120.57kWh / 215.04kWh / 241kWh / 261kWh' },
      { key: 'Cooling Options', value: 'Intelligent air cooling / liquid cooling' },
      { key: 'Battery Chemistry', value: 'LFP 3.2V 280Ah / 314Ah cells, configuration dependent' },
      { key: 'AC Power Range', value: '30kW ~ 125kW' },
      { key: 'PV Input Range', value: '45.5kW ~ 200kW maximum, configuration dependent' },
      { key: 'DC Voltage Range', value: '165.5V ~ 949V, configuration dependent' },
      { key: 'Round-trip Efficiency', value: '≥88%, configuration dependent' },
      { key: 'Protection Rating', value: 'IP55 outdoor cabinet, up to C4 anti-corrosion level' },
      { key: 'Communication', value: 'WiFi / 4G / LAN / CAN / RS485 / Ethernet, configuration dependent' },
      { key: 'Operating Temperature', value: '-20°C ~ 55°C' },
      { key: 'Dimensions Range', value: '1050 × 1150 × 1820 mm to 1200 × 1490 × 2472 mm' },
      { key: 'Weight Range', value: '≤850 kg to approximately 2700 kg, configuration dependent' },
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
    categoryLabel: '6U Rack Battery Enclosure Kit',
    tagline: '6U rack-mount LiFePO4 enclosure kit with optional BMS and LCD',
    description:
      'The JKESS 6U Battery Kit (JKLU015) is a 19-inch rack-mount enclosure and assembly hardware kit for building a 51.2V LiFePO4 battery module. The supported 15kWh capacity applies after compatible cells are installed. Choose either the enclosure-only package or the package with the specified BMS and 4.3-inch LCD. Battery cells are not included.',
    included: [
      '6U sheet-metal enclosure for standard 19-inch rack installation',
      'Internal mechanical and connection hardware supplied with the selected package',
      '4.3-inch LCD and BMS only when the Enclosure + LCD + BMS option is selected',
      'Standard packing list and applicable product documentation',
    ],
    notIncluded: [
      'LiFePO4 battery cells',
      'External rack cabinet, inverter, charger, breaker, and external cabling',
      'Onsite assembly, installation, and commissioning',
      'Any component not listed in the selected variant or final packing list',
    ],
    features: [
      '6U rack-mount form factor for standard 19-inch cabinets',
      'Supports a 51.2V 15kWh assembled configuration after compatible cells are installed',
      'Optional intelligent BMS with active balancing',
      'Optional 4.3-inch LCD for voltage, current, temperature, and SOC monitoring',
      'CAN / RS485 communication with compatible electronics',
      'Modular design for planned parallel expansion',
      'Compatible with inverter protocols subject to model and firmware confirmation',
      '1-year warranty for the supplied JKESS hardware',
    ],
    specs: [
      { key: 'Model', value: 'JKLU015' },
      { key: 'Product Type', value: '6U rack battery enclosure and assembly hardware kit' },
      { key: 'Supported Assembled Capacity', value: '15kWh after compatible cells are installed' },
      { key: 'Battery Cells Included', value: 'No' },
      { key: 'Nominal Voltage', value: '51.2V assembled configuration' },
      { key: 'Package Options', value: 'Enclosure Only / Enclosure + LCD + BMS' },
      { key: 'Form Factor', value: '6U rack-mount, 19-inch' },
      { key: 'Cell Chemistry', value: 'LiFePO4 compatible' },
      { key: 'Communication', value: 'CAN 2.0 / RS485 with compatible BMS option' },
      { key: 'Display', value: 'Optional 4.3-inch LCD touch display' },
      { key: 'Operating Temperature', value: '-20°C ~ 60°C, component dependent' },
      { key: 'Protection Rating', value: 'IP20 indoor enclosure design' },
      { key: 'Dimensions', value: '715 × 472 × 270 mm' },
      { key: 'Weight', value: '~25 kg empty, configuration dependent' },
      { key: 'Warranty', value: '1 year for supplied hardware' },
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
      { label: 'Enclosure + LCD + BMS', price: '$380.00' },
      { label: 'Enclosure Only', price: '$280.00' },
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
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter((item) => item.slug !== product.slug && item.category === product.category)
  const otherProducts = products.filter((item) => item.slug !== product.slug && item.category !== product.category)
  return [...sameCategory, ...otherProducts].slice(0, limit)
}
