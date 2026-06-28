export interface SpecSeoHighlight {
  label: string
  value: string
}

export interface SpecSeoSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface SpecSeoProduct {
  slug: string
  label: string
  description: string
}

export interface SpecSeoFaq {
  question: string
  answer: string
}

export interface SpecSeoRelatedLink {
  href: string
  label: string
  description: string
}

export interface SpecSeoPage {
  path: string
  slug: string
  prefix: 'battery-enclosures' | 'commercial-energy-storage' | 'high-voltage-bms' | 'guides'
  kind: 'specification' | 'comparison' | 'guide'
  eyebrow: string
  title: string
  description: string
  intro: string
  image: string
  highlights: SpecSeoHighlight[]
  sections: SpecSeoSection[]
  products: SpecSeoProduct[]
  faqs: SpecSeoFaq[]
  related: SpecSeoRelatedLink[]
}

export const specSeoPages: SpecSeoPage[] = [
  {
    path: 'battery-enclosures/15kwh-lifepo4',
    slug: '15kwh-lifepo4',
    prefix: 'battery-enclosures',
    kind: 'specification',
    eyebrow: '15kWh LiFePO4 enclosure search',
    title: '15kWh LiFePO4 Battery Enclosure Kit for 51.2V Systems',
    description:
      'Review a 15kWh 51.2V LiFePO4 battery enclosure kit for compatible 280Ah to 320Ah cells, including package scope, BMS and LCD options, dimensions, and ordering inputs.',
    intro:
      'A 15kWh LiFePO4 battery enclosure is typically used when installers want to assemble a low-voltage 51.2V battery module from separately sourced cells. The web listing should be treated as an enclosure and integration-hardware reference, not as a complete battery pack with cells included.',
    image: '/images/battery-kit-hero.webp',
    highlights: [
      { label: 'Nominal platform', value: '51.2V LiFePO4' },
      { label: 'Common search intent', value: '15kWh battery enclosure or DIY battery box' },
      { label: 'Cell range', value: 'Compatible 280Ah to 320Ah cells after confirmation' },
      { label: 'Supply boundary', value: 'Battery cells are sold separately' },
    ],
    sections: [
      {
        title: 'What the 15kWh term means',
        paragraphs: [
          'The 15kWh figure refers to the supported assembled battery configuration after compatible LiFePO4 cells and required electronics are installed. It does not mean the enclosure alone stores energy, and it does not mean cells are included in the listed package.',
          'Final usable energy depends on the selected cells, BMS settings, protection design, depth-of-discharge limits, inverter settings, temperature, ageing, and commissioning choices.',
        ],
      },
      {
        title: 'Selection checks before ordering',
        paragraphs: [
          'The most important checks are mechanical fit, electrical safety, communication, and installation environment. Capacity alone is not enough to confirm compatibility.',
        ],
        bullets: [
          'Confirm cell model, dimensions, terminal orientation, compression needs, and busbar layout.',
          'Confirm inverter model, CAN or RS485 requirements, cable pinout, and required protocol behavior.',
          'Plan breaker location, cable routing, floor loading, ventilation, service clearance, and transport handling.',
          'Decide whether the enclosure-only package is sufficient or whether the specified BMS and LCD package is required.',
        ],
      },
      {
        title: 'When this page should lead to a quotation request',
        paragraphs: [
          'Ask for engineering confirmation when the project uses a new cell model, a new inverter, unusual ambient conditions, parallel expansion, special branding, custom color, or repeat-order packing requirements. Provide the destination country so freight, duty, tax, and documentation questions can be separated from product scope.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable enclosure kit for 15kWh or 16kWh 51.2V LiFePO4 assembly projects using compatible cells.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Rack Battery Kit',
        description: 'Rack-mount alternative for 15kWh 51.2V LiFePO4 module assembly in 19-inch cabinets.',
      },
    ],
    faqs: [
      {
        question: 'Is this a complete 15kWh battery pack?',
        answer: 'No. It is an enclosure and selected integration-hardware package. Compatible LiFePO4 cells and any components not listed in the selected package are not included.',
      },
      {
        question: 'Can the enclosure support a 16S 51.2V battery design?',
        answer: 'The enclosure is intended for 51.2V LiFePO4 assembly projects, but the exact cell dimensions, terminal layout, wiring, BMS, and inverter communication must be reviewed before ordering.',
      },
      {
        question: 'Does the BMS option work with every inverter?',
        answer: 'No. CAN or RS485 support is only the interface. Protocol details, wiring, firmware, and settings must match the selected inverter.',
      },
    ],
    related: [
      { href: '/battery-enclosures', label: 'Battery enclosure selection hub', description: 'Compare the broader enclosure family, supply boundary, and ordering checklist.' },
      { href: '/battery-enclosures/16kwh-lifepo4', label: '16kWh LiFePO4 enclosure', description: 'Review the adjacent 16kWh search intent and configuration considerations.' },
    ],
  },
  {
    path: 'battery-enclosures/16kwh-lifepo4',
    slug: '16kwh-lifepo4',
    prefix: 'battery-enclosures',
    kind: 'specification',
    eyebrow: '16kWh LiFePO4 enclosure search',
    title: '16kWh LiFePO4 Battery Enclosure Kit for 280Ah to 320Ah Cells',
    description:
      'Evaluate a 16kWh LiFePO4 battery enclosure kit for compatible 51.2V storage assembly, including cell-fit checks, package options, BMS communication, and quote inputs.',
    intro:
      'A 16kWh enclosure search usually indicates that the buyer already has a low-voltage LiFePO4 system target and needs a mechanical housing with clear electronics and compatibility boundaries. The enclosure can support a 16kWh assembled configuration only after compatible cells and required hardware are installed.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Search target', value: '16kWh LiFePO4 battery box' },
      { label: 'Voltage class', value: '51.2V low-voltage ESS assembly' },
      { label: 'Cell fit', value: 'Confirm dimensions before ordering' },
      { label: 'Package options', value: 'Enclosure only or BMS + LCD option' },
    ],
    sections: [
      {
        title: 'Why 16kWh pages need mechanical detail',
        paragraphs: [
          'A 16kWh label can hide several engineering differences. Cell dimensions, terminal orientation, busbar layout, cable exit direction, compression method, breaker position, and available service clearance determine whether the physical assembly is practical.',
          'Two projects with similar nominal energy can require different wiring layouts or different inverter communication settings. For this reason, JKESS should confirm the cell model and inverter model before treating the configuration as ready to order.',
        ],
      },
      {
        title: 'Typical use cases',
        paragraphs: [
          'The movable caster enclosure is commonly considered for residential solar backup, small commercial storage, demonstration batteries, outdoor work power, cabins, and workshop power systems where floor-standing mobility is useful.',
        ],
      },
      {
        title: 'Ordering checklist',
        paragraphs: [
          'Provide the engineering information that determines whether the standard package is suitable or whether a quotation requires additional review.',
        ],
        bullets: [
          'Target assembled capacity, cell brand, cell model, and cell dimensions.',
          'Inverter brand and model, required communication interface, and any protocol documentation.',
          'Quantity, destination country, delivery schedule, branding, color, and packing preference.',
          'Whether battery cells, external breakers, cables, installation, or commissioning are expected to be included separately.',
        ],
      },
    ],
    products: [
      { slug: 'battery-kit', label: 'Battery Kit With Caster', description: 'Floor-standing enclosure option for 15kWh and 16kWh assembled LiFePO4 configurations.' },
      { slug: '6u-battery-kit', label: '6U Battery Kit', description: 'Indoor rack-mount option for compact 51.2V LiFePO4 module assembly.' },
    ],
    faqs: [
      {
        question: 'Are 314Ah cells automatically compatible?',
        answer: 'No. The exact 314Ah cell model, dimensions, terminal layout, and compression requirements must be checked. Amp-hour rating alone is not enough.',
      },
      {
        question: 'Is free shipping included?',
        answer: 'No global free-shipping claim should be assumed. Freight, duty, tax, and delivery terms must be confirmed for the destination and order quantity.',
      },
      {
        question: 'Can the enclosure be customized?',
        answer: 'Repeat projects can discuss color, logo, wiring layout, and packing requirements, but the final scope must be confirmed in the quotation or packing list.',
      },
    ],
    related: [
      { href: '/battery-enclosures/15kwh-lifepo4', label: '15kWh LiFePO4 enclosure', description: 'Compare adjacent 15kWh configuration assumptions and ordering inputs.' },
      { href: '/rack-battery-enclosures', label: '6U rack battery enclosures', description: 'Review rack-mounted alternatives for equipment-room installations.' },
    ],
  },
  {
    path: 'commercial-energy-storage/215kwh',
    slug: '215kwh',
    prefix: 'commercial-energy-storage',
    kind: 'specification',
    eyebrow: '215kWh C&I battery cabinet search',
    title: '215kWh Commercial Energy Storage Cabinet',
    description:
      'Review a 215kWh-class commercial energy storage cabinet for C&I projects, including power, cooling, PCS, EMS, fire protection, installation, and quotation inputs.',
    intro:
      'A 215kWh commercial energy storage search usually comes from a buyer comparing cabinet capacity for peak shaving, solar self-consumption, backup power, or factory energy optimization. The correct configuration depends on the complete project, not the energy rating alone.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Capacity class', value: '215.04kWh configuration available' },
      { label: 'Application', value: 'C&I peak shaving, backup, solar storage' },
      { label: 'Cooling', value: 'Configuration-dependent air or liquid cooling' },
      { label: 'Final scope', value: 'Defined by project quotation' },
    ],
    sections: [
      {
        title: 'Where a 215kWh cabinet can fit',
        paragraphs: [
          'A 215kWh-class cabinet can be evaluated for commercial buildings, factories, industrial parks, hotels, and solar-plus-storage projects where the load profile and available footprint make a mid-to-large cabinet practical.',
          'The energy rating must be paired with the required AC power, PCS topology, EMS control strategy, grid connection point, cooling design, fire-protection requirements, and local installation rules.',
        ],
      },
      {
        title: 'Sizing questions before selecting 215kWh',
        paragraphs: [
          'Capacity should be compared with the site use case and operating strategy. Peak shaving, backup, and solar self-consumption can lead to different power and energy requirements.',
        ],
        bullets: [
          'For peak shaving, provide interval load data and the target kW reduction.',
          'For backup, provide critical load, backup duration, transfer requirements, and reserve margin.',
          'For solar self-consumption, provide PV size, generation profile, export rules, and tariff periods.',
          'For outdoor installation, provide ambient temperature, altitude, humidity, dust, salt mist, footprint, and service access.',
        ],
      },
      {
        title: 'Quotation boundary',
        paragraphs: [
          'The project quotation controls the final supply scope. It should specify battery modules, cabinet, BMS, PCS, EMS, cooling, fire protection, monitoring, accessories, documentation, freight, taxes, installation support, and commissioning scope where applicable.',
        ],
      },
    ],
    products: [
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: 'Configured-to-order commercial cabinet platform covering 64.3kWh to 261kWh.' },
      { slug: 'high-voltage-kit', label: 'High Voltage BMS Control Kit', description: 'BCU and BMU hardware for integrators building custom high-voltage battery racks.' },
    ],
    faqs: [
      {
        question: 'Is 215kWh the usable capacity?',
        answer: 'Not necessarily. Usable capacity depends on cell configuration, depth-of-discharge settings, reserve margin, efficiency, degradation allowance, temperature, and system controls.',
      },
      {
        question: 'Can one 215kWh cabinet solve peak shaving?',
        answer: 'It may, but the result depends on required kW reduction, peak duration, PCS power, state-of-charge management, tariff rules, and how often peaks occur.',
      },
      {
        question: 'Is installation included?',
        answer: 'Only if included in the final quotation. Civil works, foundation, crane work, cabling, switchgear, installation, commissioning, freight, duty, and taxes must be confirmed separately.',
      },
    ],
    related: [
      { href: '/commercial-energy-storage', label: 'Commercial ESS cabinet hub', description: 'Review the full 64.3kWh to 261kWh cabinet family and project inputs.' },
      { href: '/commercial-energy-storage/261kwh', label: '261kWh ESS cabinet', description: 'Compare a larger cabinet capacity class and selection trade-offs.' },
    ],
  },
  {
    path: 'commercial-energy-storage/261kwh',
    slug: '261kwh',
    prefix: 'commercial-energy-storage',
    kind: 'specification',
    eyebrow: '261kWh C&I battery cabinet search',
    title: '261kWh Commercial Energy Storage Cabinet',
    description:
      'Evaluate a 261kWh commercial energy storage cabinet for C&I battery projects, including cooling, PCS power, EMS integration, outdoor installation, and quote requirements.',
    intro:
      'A 261kWh cabinet search usually indicates a buyer looking for a higher-capacity outdoor C&I storage cabinet for demand management, backup power, or renewable integration. The cabinet should be selected from the site load profile and power requirement rather than from capacity alone.',
    image: '/images/tness-ci-ess/main-2.webp',
    highlights: [
      { label: 'Capacity class', value: '261kWh configuration available' },
      { label: 'Power range family', value: 'C&I cabinet platform supports 30kW to 125kW range' },
      { label: 'Outdoor rating', value: 'IP55 cabinet design by configuration' },
      { label: 'Thermal design', value: 'Air or liquid cooling selected by project' },
    ],
    sections: [
      {
        title: 'Why 261kWh is a project-specific selection',
        paragraphs: [
          'The 261kWh class can increase available energy, but project value depends on whether the PCS power, EMS strategy, cooling, site constraints, and tariff or backup objective match the actual demand profile.',
          'A larger energy cabinet does not automatically deliver higher instantaneous power. AC output depends on the PCS configuration and the overall electrical design.',
        ],
      },
      {
        title: 'Technical information to collect',
        paragraphs: [
          'Before requesting a 261kWh cabinet quotation, collect the information that determines whether the cabinet is practical for the site and application.',
        ],
        bullets: [
          'Load profile, peak demand, required backup duration, and target operating mode.',
          'Grid voltage, transformer capacity, switchgear arrangement, PCS requirements, and EMS interface.',
          'Available footprint, foundation, crane access, ventilation clearance, fire protection, and monitoring requirements.',
          'Ambient temperature range, humidity, altitude, dust, salt mist, anti-corrosion requirement, and local certification needs.',
        ],
      },
      {
        title: 'Cooling and service considerations',
        paragraphs: [
          'Higher-capacity cabinets should be evaluated with thermal management, service access, spare parts, monitoring, alarms, and maintenance planning. Liquid cooling can be useful for density and thermal uniformity in suitable projects, while air cooling may be preferred where a simpler architecture is appropriate.',
        ],
      },
    ],
    products: [
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: 'Configurable outdoor cabinet platform for commercial and industrial energy storage.' },
      { slug: 'high-voltage-kit', label: 'High Voltage BMS Control Kit', description: 'High-voltage battery control hardware for custom rack integration.' },
    ],
    faqs: [
      {
        question: 'Does 261kWh mean the system can output 261kW?',
        answer: 'No. kWh is energy capacity. kW output depends on PCS power, battery current limits, thermal conditions, protection settings, and the overall electrical design.',
      },
      {
        question: 'Should 261kWh always use liquid cooling?',
        answer: 'Not always. Cooling depends on power density, duty cycle, ambient conditions, cabinet layout, maintenance requirements, and lifecycle objectives.',
      },
      {
        question: 'Can the cabinet be used for both backup and peak shaving?',
        answer: 'Yes, if the EMS strategy and electrical architecture reserve sufficient state of charge for backup while still allowing peak-shaving operation. This must be defined during design.',
      },
    ],
    related: [
      { href: '/commercial-energy-storage/215kwh', label: '215kWh ESS cabinet', description: 'Compare a lower capacity class before choosing the final cabinet configuration.' },
      { href: '/guides/air-cooled-vs-liquid-cooled-ess', label: 'Air vs liquid cooling', description: 'Review cooling choices for commercial energy storage cabinets.' },
    ],
  },
  {
    path: 'high-voltage-bms/100a-200a',
    slug: '100a-200a',
    prefix: 'high-voltage-bms',
    kind: 'comparison',
    eyebrow: '100A and 200A high-voltage BMS search',
    title: '100A vs 200A High-Voltage BMS Control Hardware',
    description:
      'Compare 100A and 200A high-voltage BMS control hardware for commercial battery racks, including BCU and BMU roles, current limits, PCS communication, and selection inputs.',
    intro:
      'A 100A or 200A high-voltage BMS search usually indicates that the buyer already has a commercial battery-rack architecture in mind. The current rating should be selected from the complete electrical design, not from the BMS product label alone.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Current options', value: '100A and 200A control-box choices' },
      { label: 'Architecture', value: 'BCU master and BMU slave hardware' },
      { label: 'Communication', value: 'CAN, RS485, and isoSPI by architecture' },
      { label: 'Included scope', value: 'Selected control box only' },
    ],
    sections: [
      {
        title: 'How to think about 100A vs 200A',
        paragraphs: [
          'A 200A selection can support a higher-current architecture than a 100A selection, but the final system current is limited by cells, modules, busbars, cables, contactors, fuses, breakers, thermal design, PCS limits, protection thresholds, and duty cycle.',
          'The BMS should be selected after the pack voltage, current requirement, module count, rack count, PCS interface, EMS logic, insulation monitoring, and safety interlock requirements are known.',
        ],
      },
      {
        title: 'Information required for engineering review',
        paragraphs: [
          'Provide a system-level design package rather than only asking for a BMS current rating.',
        ],
        bullets: [
          'Cell chemistry, cells in series, module count, rack count, total voltage, and target current.',
          'PCS model, EMS model, communication protocol, baud rate, and network topology.',
          'Contactor, pre-charge, fuse, breaker, insulation, high-voltage interlock, and emergency-stop requirements.',
          'Expected operating temperature, C-rate, duty cycle, remote monitoring, OTA, and certification requirements.',
        ],
      },
      {
        title: 'Supply boundary',
        paragraphs: [
          'The high-voltage kit product is sold as the selected 100A or 200A BCU master control box or BMU slave control box. Battery cells, modules, racks, PCS, EMS, high-voltage cabling, contactors, installation, and commissioning are not automatically included.',
        ],
      },
    ],
    products: [
      { slug: 'high-voltage-kit', label: 'High Voltage BMS Control Kit', description: 'Select a 100A or 200A BCU master box or BMU slave box for high-voltage battery control.' },
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: 'Configured cabinet option where BMS, PCS, EMS, cooling, and monitoring can be included when quoted.' },
    ],
    faqs: [
      {
        question: 'Should I choose 100A or 200A?',
        answer: 'Choose from the complete rack design, including current requirement, PCS power, voltage, cells, cables, contactors, protection settings, thermal limits, and duty cycle. Share the single-line diagram for review.',
      },
      {
        question: 'Is the BMU current-rated like the BCU?',
        answer: 'The BMU focuses on module-level cell voltage and temperature collection and balancing. The system architecture determines the master and slave box quantities and roles.',
      },
      {
        question: 'Does CAN or RS485 support guarantee PCS compatibility?',
        answer: 'No. Interface support must be matched with protocol messages, identifiers, scaling, state logic, wiring, firmware, and commissioning settings.',
      },
    ],
    related: [
      { href: '/high-voltage-bms', label: 'High-voltage BMS hub', description: 'Review the broader BCU and BMU architecture for commercial storage.' },
      { href: '/guides/bcu-vs-bmu', label: 'BCU vs BMU guide', description: 'Learn the difference between master and slave battery-management control hardware.' },
    ],
  },
  {
    path: 'guides/bcu-vs-bmu',
    slug: 'bcu-vs-bmu',
    prefix: 'guides',
    kind: 'guide',
    eyebrow: 'High-voltage BMS architecture guide',
    title: 'BCU vs BMU in a High-Voltage Battery Management System',
    description:
      'Understand the difference between BCU master control and BMU slave monitoring in high-voltage BMS architectures for commercial and industrial energy storage.',
    intro:
      'A high-voltage battery system usually separates rack-level control from module-level monitoring. The BCU and BMU work together, but they are not interchangeable components. Understanding the difference helps buyers request the correct control-box quantities and integration support.',
    image: '/images/hv-kit/2.jpg',
    highlights: [
      { label: 'BCU role', value: 'Rack-level master control' },
      { label: 'BMU role', value: 'Module-level cell monitoring' },
      { label: 'Key question', value: 'How many racks, modules, and cells?' },
      { label: 'System interface', value: 'PCS and EMS communication must match' },
    ],
    sections: [
      {
        title: 'What the BCU does',
        paragraphs: [
          'The BCU is the master control layer. It coordinates total-voltage detection, current information, protection states, insulation supervision, contactor logic, communication, alarms, and interaction with PCS or EMS equipment depending on the final system architecture.',
        ],
      },
      {
        title: 'What the BMU does',
        paragraphs: [
          'The BMU is the slave monitoring layer assigned to battery modules or groups of cells. It collects cell voltage and temperature information and supports balancing. In the JKESS high-voltage hardware family, the BMU-H5-16 supports 16-cell monitoring and 2A bidirectional active balancing.',
        ],
      },
      {
        title: 'How to specify quantities',
        paragraphs: [
          'The required number of BCU and BMU boxes depends on the system design. The integrator should provide cell count, module count, rack count, voltage range, current requirement, communication topology, and protection design.',
        ],
        bullets: [
          'Start from the cell and module configuration, not the controller name.',
          'Map each BMU to the cells or modules it monitors.',
          'Define BCU communication with PCS, EMS, current sensor, insulation monitoring, and contactor logic.',
          'Confirm CAN, RS485, or isoSPI wiring and protocol details before ordering.',
        ],
      },
    ],
    products: [
      { slug: 'high-voltage-kit', label: 'High Voltage BMS Control Kit', description: 'BCU master and BMU slave hardware for high-voltage battery system integration.' },
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: 'Configured cabinet system where BMS architecture is included in the quoted project scope.' },
    ],
    faqs: [
      {
        question: 'Can a BMU replace a BCU?',
        answer: 'No. A BMU collects module-level cell data and supports balancing. A BCU performs rack-level master control and system communication. They have different roles.',
      },
      {
        question: 'How many BMUs are required?',
        answer: 'The quantity depends on the number of cells or modules each BMU monitors, the pack configuration, and the final high-voltage architecture.',
      },
      {
        question: 'What should I send before asking for a BCU and BMU quotation?',
        answer: 'Send cell count, module count, rack count, voltage range, target current, PCS and EMS models, communication protocol requirements, and a single-line diagram if available.',
      },
    ],
    related: [
      { href: '/high-voltage-bms', label: 'High-voltage BMS category', description: 'Review BCU and BMU control hardware for commercial energy storage.' },
      { href: '/high-voltage-bms/100a-200a', label: '100A vs 200A BMS', description: 'Compare current-rating considerations for high-voltage BMS control hardware.' },
    ],
  },
  {
    path: 'guides/215kwh-vs-261kwh-ess',
    slug: '215kwh-vs-261kwh-ess',
    prefix: 'guides',
    kind: 'comparison',
    eyebrow: 'C&I ESS capacity comparison',
    title: '215kWh vs 261kWh Commercial Energy Storage Cabinet',
    description:
      'Compare 215kWh and 261kWh commercial energy storage cabinet choices by usable energy, PCS power, footprint, cooling, backup duration, peak shaving, and quotation inputs.',
    intro:
      'Choosing between 215kWh and 261kWh should start from the load profile, site constraints, backup objective, tariff, PCS power, cooling, and budget. A larger kWh number is not automatically the better configuration if the duty cycle or site conditions do not need it.',
    image: '/images/tness-ci-ess/main-4.webp',
    highlights: [
      { label: '215kWh class', value: 'Mid-to-large C&I cabinet capacity' },
      { label: '261kWh class', value: 'Higher energy capacity option' },
      { label: 'Main trade-off', value: 'Usable energy vs footprint, cost, and duty cycle' },
      { label: 'Selection method', value: 'Load data and project objective first' },
    ],
    sections: [
      {
        title: 'When 215kWh may be enough',
        paragraphs: [
          'A 215kWh-class cabinet may be suitable when the required peak-reduction duration, backup load, or solar-shifting requirement fits within its usable-energy range after reserve margin, depth-of-discharge limits, efficiency losses, and degradation allowance are considered.',
        ],
      },
      {
        title: 'When 261kWh may be justified',
        paragraphs: [
          'A 261kWh-class cabinet may be considered when the project needs longer backup duration, more solar energy shifting, more reserve margin, or a longer peak-shaving window. It must still be paired with appropriate PCS power and site electrical capacity.',
        ],
      },
      {
        title: 'Comparison inputs',
        paragraphs: [
          'The capacity comparison should be made from measured site data and a clear operating objective.',
        ],
        bullets: [
          'Peak load, target peak reduction, and duration of the peak period.',
          'Critical load and required backup duration if backup is part of the objective.',
          'PV generation profile, export limits, charge windows, tariff periods, and EMS strategy.',
          'Available footprint, cabinet spacing, foundation, crane access, cooling method, and maintenance access.',
        ],
      },
      {
        title: 'The PCS power question',
        paragraphs: [
          'Both 215kWh and 261kWh describe energy capacity. Instantaneous output is a kW question determined by PCS power, system voltage, current limits, thermal conditions, and protection settings. Always compare kWh and kW together.',
        ],
      },
    ],
    products: [
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: 'Configurable 64.3kWh to 261kWh cabinet platform for commercial and industrial applications.' },
    ],
    faqs: [
      {
        question: 'Is 261kWh always better than 215kWh?',
        answer: 'No. It provides more nominal energy, but the better choice depends on load data, power requirement, operating strategy, site constraints, cooling, budget, and return target.',
      },
      {
        question: 'Can both capacities use the same PCS power?',
        answer: 'Possibly, depending on the final configuration, but kWh and kW are separate design values. Confirm PCS power, current limits, and duty cycle in the quotation.',
      },
      {
        question: 'Which capacity is better for peak shaving?',
        answer: 'The answer depends on the target kW reduction and how long the site peak lasts. A short peak may need more PCS power, while a long peak may need more usable kWh.',
      },
    ],
    related: [
      { href: '/commercial-energy-storage/215kwh', label: '215kWh ESS cabinet', description: 'Review the 215kWh cabinet search page and project inputs.' },
      { href: '/commercial-energy-storage/261kwh', label: '261kWh ESS cabinet', description: 'Review the 261kWh cabinet search page and selection requirements.' },
    ],
  },
]

export function getSpecSeoPage(path: string) {
  return specSeoPages.find((page) => page.path === path)
}

export function specSeoPagesByPrefix(prefix: SpecSeoPage['prefix']) {
  return specSeoPages.filter((page) => page.prefix === prefix)
}
