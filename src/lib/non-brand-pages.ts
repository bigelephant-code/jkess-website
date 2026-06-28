export interface NonBrandPageHighlight {
  label: string
  value: string
}

export interface NonBrandPageSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface NonBrandPageProduct {
  slug: string
  label: string
  description: string
}

export interface NonBrandPageFaq {
  question: string
  answer: string
}

export interface NonBrandPageLink {
  href: string
  label: string
  description: string
}

export interface NonBrandLandingPage {
  path: string
  kind: 'category' | 'solution' | 'guide'
  eyebrow: string
  title: string
  description: string
  intro: string
  image: string
  highlights: NonBrandPageHighlight[]
  sections: NonBrandPageSection[]
  products: NonBrandPageProduct[]
  faqs: NonBrandPageFaq[]
  related: NonBrandPageLink[]
}

export const nonBrandLandingPages: NonBrandLandingPage[] = [
  {
    path: 'battery-enclosures',
    kind: 'category',
    eyebrow: 'Battery enclosure selection',
    title: 'LiFePO4 Battery Enclosures and Assembly Kits',
    description:
      'Compare 51.2V LiFePO4 battery enclosure kits for 280Ah to 320Ah cells, including movable 15kWh and 16kWh configurations with optional BMS and LCD hardware.',
    intro:
      'A battery enclosure kit provides the mechanical structure and selected integration hardware needed to assemble a low-voltage LiFePO4 storage battery. JKESS enclosure options are intended for installers and system integrators who source compatible cells separately and need a defined enclosure, mounting layout, and optional monitoring and protection hardware.',
    image: '/images/battery-kit-hero.webp',
    highlights: [
      { label: 'System voltage', value: '51.2V low-voltage platforms' },
      { label: 'Compatible cells', value: '280Ah to 320Ah LiFePO4' },
      { label: 'Supported capacity', value: '15kWh or 16kWh after assembly' },
      { label: 'Package choices', value: 'Enclosure only or BMS + LCD option' },
    ],
    sections: [
      {
        title: 'What is included in a battery enclosure kit?',
        paragraphs: [
          'The supplied scope depends on the selected package. An enclosure-only option provides the sheet-metal housing and applicable mechanical or connection hardware. A package with LCD and BMS also includes the specified monitoring and protection hardware listed for that option.',
          'Battery cells are not included. Inverters, chargers, external breakers, external cabling, onsite assembly, installation, and commissioning are also outside the standard package unless separately confirmed in writing.',
        ],
      },
      {
        title: 'How to select the correct enclosure',
        paragraphs: [
          'Start with the exact cell dimensions and terminal layout rather than capacity alone. Two cells with the same nominal amp-hour rating can have different dimensions, terminal positions, and compression requirements.',
        ],
        bullets: [
          'Confirm cell brand, model, dimensions, terminal orientation, and quantity.',
          'Confirm the inverter communication requirement, including CAN or RS485 protocol details.',
          'Check cable bend radius, breaker placement, ventilation, service clearance, and floor loading.',
          'Choose enclosure-only when the project already has validated electronics; choose the BMS and LCD package when integrated monitoring hardware is required.',
        ],
      },
      {
        title: 'Typical applications',
        paragraphs: [
          'These enclosures are commonly evaluated for residential solar storage assembly, home backup batteries, workshops, cabins, demonstration systems, and small commercial storage projects. Final suitability depends on the completed battery design, cell selection, BMS settings, inverter compatibility, protection devices, and installation environment.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable enclosure for 15kWh or 16kWh assembled 51.2V LiFePO4 systems using compatible 280Ah to 320Ah cells.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Rack Battery Kit',
        description: '19-inch rack-mount enclosure and integration kit for compact 51.2V LiFePO4 battery modules.',
      },
    ],
    faqs: [
      {
        question: 'Are LiFePO4 battery cells included with the enclosure kit?',
        answer: 'No. Compatible battery cells must be purchased separately. The selected package covers only the enclosure and the hardware specifically listed for that option.',
      },
      {
        question: 'Can a 280Ah or 314Ah cell be used?',
        answer: 'The enclosure family supports specified 280Ah to 320Ah configurations, but exact compatibility must be confirmed from the cell model, dimensions, terminal layout, compression method, and wiring design before ordering.',
      },
      {
        question: 'Does the enclosure work with every inverter?',
        answer: 'No. Physical assembly and electrical communication are separate compatibility questions. The BMS communication protocol, inverter model, firmware, cable pinout, and system settings must be checked.',
      },
    ],
    related: [
      {
        href: '/rack-battery-enclosures',
        label: '6U rack battery enclosures',
        description: 'Compare rack-mount enclosure requirements for 19-inch cabinets and equipment rooms.',
      },
      {
        href: '/high-voltage-bms',
        label: 'High-voltage BMS hardware',
        description: 'Review BCU and BMU control hardware for commercial battery racks.',
      },
    ],
  },
  {
    path: 'rack-battery-enclosures',
    kind: 'category',
    eyebrow: '19-inch rack battery systems',
    title: '6U Rack Battery Enclosures for 51.2V LiFePO4 Systems',
    description:
      'Explore 6U and 19-inch rack battery enclosure kits for 51.2V LiFePO4 storage, telecom backup, residential solar, and modular equipment-room installations.',
    intro:
      'A rack battery enclosure is designed to place a battery module inside a standard cabinet or equipment rack. The JKESS 6U kit is intended for compact LiFePO4 assembly projects where front service access, cabinet depth, airflow, parallel expansion, and inverter communication need to be planned before installation.',
    image: '/images/6u-battery-kit/1.webp',
    highlights: [
      { label: 'Form factor', value: '6U, 19-inch rack-mount' },
      { label: 'Nominal platform', value: '51.2V LiFePO4' },
      { label: 'Supported capacity', value: '15kWh after compatible cells are installed' },
      { label: 'Communication', value: 'CAN 2.0 or RS485 with compatible BMS' },
    ],
    sections: [
      {
        title: 'Rack planning requirements',
        paragraphs: [
          'Rack compatibility is more than the nominal 19-inch width. Confirm usable cabinet depth, rail position, front and rear service access, cable routing, module weight, airflow, and the load rating of the rack and floor.',
        ],
        bullets: [
          'Measure cabinet depth and reserve clearance for terminals, breakers, and cable bends.',
          'Check rack rail capacity and total floor loading when several modules are installed.',
          'Plan module addresses, parallel current, busbars, breakers, and communication before expansion.',
          'Provide the inverter model and required protocol for communication review.',
        ],
      },
      {
        title: 'Where rack battery enclosures are used',
        paragraphs: [
          'Common applications include residential solar backup, telecom rooms, small commercial backup systems, off-grid equipment rooms, and modular battery banks. The final completed battery must be engineered around the actual cells, BMS, inverter, protection equipment, and local installation requirements.',
        ],
      },
      {
        title: 'Enclosure-only or integrated electronics?',
        paragraphs: [
          'Select enclosure-only when cells, BMS, display, breakers, and wiring have already been validated as a complete design. Select the enclosure with LCD and BMS option when the project requires the specified JKESS monitoring and protection hardware. In both cases, cells remain excluded.',
        ],
      },
    ],
    products: [
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount enclosure and assembly hardware for a compact 51.2V LiFePO4 module.',
      },
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing movable alternative for projects that do not require rack installation.',
      },
    ],
    faqs: [
      {
        question: 'Does 6U guarantee compatibility with every 19-inch rack?',
        answer: 'No. The rack width standard does not confirm cabinet depth, rail position, service clearance, airflow, load capacity, or cable routing. Those dimensions must be checked before ordering.',
      },
      {
        question: 'Can several rack battery modules operate in parallel?',
        answer: 'Parallel expansion can be planned, subject to the completed battery design, BMS addressing, inverter limits, breaker sizing, busbars, current sharing, cable selection, and commissioning requirements.',
      },
      {
        question: 'Is the listed 15kWh capacity a complete battery?',
        answer: 'No. It is the supported assembled configuration after compatible cells and required electronics are installed. Battery cells are sold separately.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures',
        label: 'Floor-standing battery enclosures',
        description: 'Review movable caster enclosures for 15kWh and 16kWh assembly projects.',
      },
      {
        href: '/high-voltage-bms',
        label: 'High-voltage BMS systems',
        description: 'Compare BCU and BMU architectures for larger commercial battery racks.',
      },
    ],
  },
  {
    path: 'high-voltage-bms',
    kind: 'category',
    eyebrow: 'BCU and BMU control architecture',
    title: 'High-Voltage BMS Hardware for Commercial Energy Storage',
    description:
      'Compare 100A and 200A high-voltage BMS control hardware with BCU master boxes, BMU slave boxes, active balancing, insulation monitoring, CAN, RS485, and isoSPI.',
    intro:
      'A high-voltage battery management system coordinates cell monitoring, current and voltage detection, insulation supervision, protection logic, communication, and control across a commercial battery rack. JKESS supplies individual BCU master and BMU slave control boxes for integration into a complete engineered system.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Current options', value: '100A or 200A control architecture' },
      { label: 'Master control', value: 'BCU-B3 with total-voltage detection' },
      { label: 'Slave control', value: 'BMU-H5-16 with 2A active balancing' },
      { label: 'Interfaces', value: 'CAN, RS485, and isoSPI' },
    ],
    sections: [
      {
        title: 'BCU master and BMU slave roles',
        paragraphs: [
          'The BCU master controller supervises rack-level measurements, protection states, contactor logic, insulation information, current detection, and communication with PCS or EMS equipment. BMU slave controllers collect individual cell voltage and temperature data and coordinate balancing within their assigned battery modules.',
          'A complete system normally requires one or more control boxes selected from the final pack count, cell count, voltage range, current level, communication design, and safety architecture. The displayed price for a variant applies only to that selected control box.',
        ],
      },
      {
        title: 'Information required before selection',
        paragraphs: [
          'High-voltage BMS selection should begin with the electrical architecture rather than a product name alone.',
        ],
        bullets: [
          'Total pack voltage, cell chemistry, cells in series, module count, and rack count.',
          'Continuous and peak current, contactor arrangement, pre-charge design, and protection thresholds.',
          'PCS and EMS models, CAN or RS485 protocol documents, and network topology.',
          'Required insulation monitoring, high-voltage interlock, active balancing, remote monitoring, and certification targets.',
        ],
      },
      {
        title: 'Supply boundary',
        paragraphs: [
          'The high-voltage kit listing covers the selected BCU master or BMU slave control box. Battery cells, modules, battery racks, high-voltage cabling, contactors, PCS, EMS, inverters, installation, commissioning, and full-system engineering are not automatically included.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage BMS Control Kit',
        description: 'Select an individual 100A or 200A BCU master control box or BMU slave control box.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet platform that can include BMS, PCS, EMS, cooling, fire protection, and monitoring when specified in the quotation.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a BCU and a BMU?',
        answer: 'The BCU performs rack-level master control and communication, while BMU slave units collect module-level cell voltage and temperature information and support balancing. The required quantities depend on the battery architecture.',
      },
      {
        question: 'Does a 200A BMS mean the complete battery can always deliver 200A?',
        answer: 'No. Final system current is limited by the complete design, including cells, busbars, cables, contactors, fuses, breakers, thermal conditions, PCS, protection settings, and duty cycle.',
      },
      {
        question: 'Is CAN or RS485 support enough to confirm PCS compatibility?',
        answer: 'No. The physical interface alone is not sufficient. Protocol messages, baud rate, identifiers, scaling, state logic, wiring, firmware, and commissioning settings must match.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage cabinets',
        description: 'Review configurable C&I cabinet capacities, cooling choices, and system scope.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Air cooling vs liquid cooling',
        description: 'Compare thermal-management choices for commercial energy storage cabinets.',
      },
    ],
  },
  {
    path: 'commercial-energy-storage',
    kind: 'category',
    eyebrow: 'Commercial and industrial BESS',
    title: '64.3kWh to 261kWh Commercial Energy Storage Cabinets',
    description:
      'Explore configurable C&I energy storage cabinets from 64.3kWh to 261kWh with 30kW to 125kW AC power, air or liquid cooling, IP55 outdoor design, PCS, EMS, and fire-protection options.',
    intro:
      'Commercial and industrial energy storage cabinets combine battery modules and project-specific control, conversion, thermal-management, monitoring, and protection equipment. The JKESS cabinet platform is configured to order, so the signed quotation—not a generic web page—defines the final supplied equipment and services.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Capacity range', value: '64.3kWh to 261kWh' },
      { label: 'AC power range', value: '30kW to 125kW' },
      { label: 'Cooling options', value: 'Intelligent air cooling or liquid cooling' },
      { label: 'Installation', value: 'Outdoor IP55 cabinet platform' },
    ],
    sections: [
      {
        title: 'Available configuration range',
        paragraphs: [
          'The cabinet family includes approximately 64.3kWh, 80.4kWh, 100.3kWh, 112.5kWh, 120.57kWh, 215.04kWh, 241kWh, and 261kWh configurations. AC power, PV input, DC voltage, dimensions, weight, cooling, and included equipment vary by configuration.',
          'Capacity alone does not determine the correct system. Power demand, backup duration, tariff structure, solar generation, grid constraints, ambient temperature, operating schedule, available space, and local requirements must be reviewed together.',
        ],
      },
      {
        title: 'Typical commercial applications',
        paragraphs: [
          'C&I storage is commonly evaluated for peak shaving, time-of-use optimization, demand management, solar self-consumption, backup power, renewable-energy smoothing, and industrial-park energy management. Financial and technical suitability depends on measured site data and the applicable tariff and grid rules.',
        ],
      },
      {
        title: 'What to include in a project inquiry',
        paragraphs: [
          'A useful quotation request should contain enough information to define the electrical and commercial boundary of the project.',
        ],
        bullets: [
          'Target usable capacity, AC power, backup duration, load profile, and operating objective.',
          'PV size, grid voltage and frequency, PCS or EMS requirements, and applicable grid standard.',
          'Site country, ambient temperature, altitude, outdoor location, available footprint, and access constraints.',
          'Cooling preference, fire-protection requirements, anti-corrosion level, communication, installation, commissioning, freight, duty, and certification needs.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured-to-order cabinet platform covering approximately 64.3kWh to 261kWh and 30kW to 125kW.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage BMS Control Kit',
        description: 'BCU and BMU control hardware for integrators engineering their own high-voltage battery racks.',
      },
    ],
    faqs: [
      {
        question: 'Is the C&I cabinet sold as one fixed standard package?',
        answer: 'No. The final quotation defines the exact battery modules, BMS, PCS, EMS, cooling, fire protection, monitoring, accessories, documentation, installation support, and services included.',
      },
      {
        question: 'How should a commercial battery capacity be selected?',
        answer: 'Selection should use measured load data, target peak reduction, tariff periods, required backup duration, solar production, allowable depth of discharge, reserve margin, losses, degradation allowance, and grid constraints.',
      },
      {
        question: 'Are freight, import duty, tax, civil works, and onsite commissioning included?',
        answer: 'Only when expressly listed in the final quotation. These items vary by country, site, shipment, Incoterm, installation scope, and local requirements.',
      },
    ],
    related: [
      {
        href: '/solutions/commercial-peak-shaving',
        label: 'Commercial peak shaving',
        description: 'Learn what site data is needed to size a battery for demand reduction.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Air-cooled vs liquid-cooled ESS',
        description: 'Compare thermal-management approaches before requesting a cabinet configuration.',
      },
    ],
  },
  {
    path: 'solutions/commercial-peak-shaving',
    kind: 'solution',
    eyebrow: 'Demand management solution',
    title: 'Commercial Battery Storage for Peak Shaving',
    description:
      'Learn how commercial battery storage can reduce short demand peaks, what load data is required, and how power, energy capacity, PCS, EMS, cooling, and grid constraints affect system sizing.',
    intro:
      'Peak shaving uses stored energy to reduce the highest grid-import periods that influence demand charges or contracted-capacity limits. A battery is dispatched when facility load approaches a defined threshold and is recharged when site conditions, tariffs, and operating rules allow.',
    image: '/images/tness-ci-ess/main-2.webp',
    highlights: [
      { label: 'Primary input', value: 'Interval load data' },
      { label: 'Power sizing', value: 'Required kW peak reduction' },
      { label: 'Energy sizing', value: 'Peak duration and usable kWh' },
      { label: 'Control layer', value: 'Metering, PCS, and EMS logic' },
    ],
    sections: [
      {
        title: 'Power and energy are different sizing questions',
        paragraphs: [
          'Power in kilowatts determines how much of the site peak the system can offset at one moment. Energy in kilowatt-hours determines how long that reduction can be sustained. A short, sharp peak may require high power but limited energy, while a long plateau requires more usable capacity.',
          'For an initial screening example, reducing a 60kW peak for two hours requires approximately 120kWh of delivered energy before adding conversion losses, reserve margin, operating limits, degradation allowance, and site-specific constraints. This is an illustration, not a final system design.',
        ],
      },
      {
        title: 'Data needed for a peak-shaving study',
        paragraphs: [
          'Monthly utility bills are useful, but interval data provides the information needed to understand peak magnitude, duration, frequency, and timing.',
        ],
        bullets: [
          'At least several months of 15-minute or finer interval load data where available.',
          'Demand-charge rules, contracted-capacity limits, tariff periods, and export restrictions.',
          'Existing and planned solar generation, generators, large motors, EV charging, or variable production loads.',
          'Critical-load requirements, backup expectations, site voltage, transformer capacity, and available connection point.',
        ],
      },
      {
        title: 'How the storage cabinet is configured',
        paragraphs: [
          'The selected battery capacity, PCS power, EMS strategy, cooling method, fire protection, enclosure rating, monitoring, and communication are coordinated around the site duty cycle. JKESS C&I cabinet configurations cover approximately 64.3kWh to 261kWh and 30kW to 125kW, but the correct configuration must be derived from project data.',
        ],
      },
      {
        title: 'Economic review',
        paragraphs: [
          'A financial model should compare avoided demand or capacity costs with equipment, installation, financing, maintenance, efficiency losses, degradation, replacement assumptions, and any local incentives. Savings cannot be guaranteed without the tariff, load profile, operating strategy, and project cost.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configurable 64.3kWh to 261kWh cabinet platform for commercial demand management and backup projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage BMS Control Kit',
        description: 'Control hardware for integrators developing custom high-voltage battery racks and PCS or EMS interfaces.',
      },
    ],
    faqs: [
      {
        question: 'Can a battery eliminate every facility demand peak?',
        answer: 'Not automatically. Results depend on PCS power, usable battery energy, state of charge, peak duration, prediction and control logic, operating constraints, and whether several peaks occur before the battery can recharge.',
      },
      {
        question: 'Is one month of utility bills enough to size the system?',
        answer: 'Usually not. Bills show charges and monthly maxima, but interval load data is needed to understand how long peaks last, how often they occur, and when the battery must dispatch.',
      },
      {
        question: 'Can the same battery provide backup power and peak shaving?',
        answer: 'It can be designed for multiple objectives, but capacity and state of charge must be reserved for backup. EMS priorities and the electrical transfer architecture must be defined during project design.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage cabinets',
        description: 'Review available cabinet capacity, power, cooling, and project configuration ranges.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Choose the cooling method',
        description: 'Compare air and liquid cooling for different duty cycles and site conditions.',
      },
    ],
  },
  {
    path: 'guides/air-cooled-vs-liquid-cooled-ess',
    kind: 'guide',
    eyebrow: 'ESS thermal-management guide',
    title: 'Air-Cooled vs Liquid-Cooled Energy Storage Systems',
    description:
      'Compare air-cooled and liquid-cooled commercial energy storage cabinets by thermal uniformity, power density, maintenance, climate, duty cycle, noise, footprint, and project cost.',
    intro:
      'Cooling controls battery temperature and temperature difference across modules. Both intelligent air cooling and liquid cooling can be suitable when correctly engineered. The decision should be based on heat generation, cabinet density, ambient conditions, operating schedule, service capability, footprint, lifecycle expectations, and the final project configuration.',
    image: '/images/tness-ci-ess/main-3.webp',
    highlights: [
      { label: 'Air cooling', value: 'Simpler airflow-based architecture' },
      { label: 'Liquid cooling', value: 'Direct fluid-based thermal control' },
      { label: 'Decision inputs', value: 'Duty cycle, climate, density, service' },
      { label: 'JKESS platform', value: 'Both methods available by configuration' },
    ],
    sections: [
      {
        title: 'How air-cooled ESS cabinets work',
        paragraphs: [
          'Air-cooled cabinets use fans, ducts, heat exchangers, and control logic to move conditioned air through the cabinet. They can offer a simpler mechanical architecture and familiar service procedures, particularly where cabinet power density and ambient conditions are moderate.',
        ],
        bullets: [
          'Check airflow paths, filter maintenance, fan redundancy, dust exposure, and cabinet spacing.',
          'Evaluate ambient temperature, solar loading, altitude, humidity, corrosion, and acoustic limits.',
          'Confirm how the control system manages temperature differences across modules.',
        ],
      },
      {
        title: 'How liquid-cooled ESS cabinets work',
        paragraphs: [
          'Liquid-cooled cabinets circulate coolant through plates or channels close to battery modules and reject heat through a thermal-management unit. This can support higher cabinet density and tighter temperature control, but introduces pumps, coolant circuits, seals, leak management, and additional service requirements.',
        ],
        bullets: [
          'Review coolant specification, pump redundancy, leak detection, pressure monitoring, and service intervals.',
          'Confirm cold-weather heating strategy and the expected operating temperature range.',
          'Plan access for thermal-management unit service and replacement components.',
        ],
      },
      {
        title: 'Which cooling method should a project choose?',
        paragraphs: [
          'Air cooling may be appropriate where power density, duty cycle, climate, footprint, and temperature-uniformity requirements allow a simpler architecture. Liquid cooling is often evaluated where cabinet density, sustained power, high ambient temperature, or tighter module temperature control makes direct thermal management valuable.',
          'Cooling should not be selected from capacity alone. Two cabinets with the same energy rating may have different PCS power, cell type, module layout, operating schedule, climate, enclosure design, noise limits, service environment, and lifecycle objective.',
        ],
      },
      {
        title: 'Questions to include in a quotation request',
        paragraphs: [
          'Provide the project duty cycle and site conditions so the cabinet supplier can evaluate the appropriate thermal-management configuration.',
        ],
        bullets: [
          'Required capacity, PCS power, charge and discharge duration, cycles per day, and expected C-rate.',
          'Minimum and maximum ambient temperature, humidity, altitude, solar exposure, dust, salt mist, and corrosion environment.',
          'Available footprint, cabinet spacing, acoustic restrictions, maintenance access, and local service capability.',
          'Fire-protection, monitoring, redundancy, warranty, certification, and lifecycle requirements.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configurable cabinet family with intelligent air-cooled and liquid-cooled options across selected capacities.',
      },
    ],
    faqs: [
      {
        question: 'Is liquid cooling always better than air cooling?',
        answer: 'No. Liquid cooling can improve thermal control and density in suitable designs, but it also adds pumps, coolant circuits, leak-management requirements, and service considerations. The better choice depends on the project.',
      },
      {
        question: 'Can cooling be selected only from the cabinet kWh rating?',
        answer: 'No. PCS power, duty cycle, C-rate, cell and module layout, ambient temperature, altitude, cabinet density, service access, and lifecycle targets also affect the decision.',
      },
      {
        question: 'Does the JKESS C&I platform offer both options?',
        answer: 'Selected cabinet configurations can use intelligent air cooling or liquid cooling. The final quotation identifies the cooling system and all included thermal-management equipment.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage cabinets',
        description: 'Review the cabinet capacity, power, outdoor rating, communication, and project scope.',
      },
      {
        href: '/solutions/commercial-peak-shaving',
        label: 'Peak-shaving system sizing',
        description: 'Learn how load peaks and duty cycle influence power, capacity, and cooling requirements.',
      },
    ],
  },
]

export function getNonBrandLandingPage(path: string) {
  return nonBrandLandingPages.find((page) => page.path === path)
}
