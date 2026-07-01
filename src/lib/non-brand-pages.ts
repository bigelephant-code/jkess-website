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
  {
    path: '48v-lifepo4-battery-enclosure',
    kind: 'category',
    eyebrow: 'Low-voltage battery assembly',
    title: '48V and 51.2V LiFePO4 Battery Enclosure Selection',
    description:
      'Plan a 48V or 51.2V LiFePO4 battery enclosure by checking cell dimensions, BMS communication, inverter compatibility, service clearance, and shipment scope.',
    intro:
      'A 48V-class LiFePO4 battery enclosure is usually built around a 16-series 51.2V nominal battery platform. The enclosure choice should be driven by the exact cell model, BMS hardware, inverter protocol, wiring route, service access, and installation environment rather than capacity wording alone.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Nominal platform', value: '48V / 51.2V LiFePO4 systems' },
      { label: 'Common cell range', value: '280Ah to 320Ah class cells' },
      { label: 'Form factors', value: 'Caster enclosure or 6U rack kit' },
      { label: 'Key check', value: 'Cell fit, BMS protocol, inverter match' },
    ],
    sections: [
      {
        title: 'Start with the exact cell model',
        paragraphs: [
          'Capacity labels such as 280Ah, 304Ah, or 314Ah do not prove that a cell fits a cabinet. Width, height, depth, terminal position, vent location, compression method, busbar geometry, and insulation clearance can all differ between suppliers.',
          'Before ordering an enclosure, provide the official cell datasheet and dimensional drawing. This avoids a common problem where the electrical capacity looks correct but the mechanical pack cannot be assembled cleanly.',
        ],
      },
      {
        title: 'Confirm BMS and inverter compatibility',
        paragraphs: [
          'A completed 48V-class battery normally needs correct voltage limits, charge and discharge current limits, CAN or RS485 communication, cable pinout, breaker selection, and commissioning settings. Connector type alone is not a compatibility guarantee.',
        ],
        bullets: [
          'Share the inverter brand, model, firmware, and supported battery protocol.',
          'Confirm CAN or RS485 message format, baud rate, pinout, and termination.',
          'Check continuous current, surge current, cable size, breaker rating, and thermal path.',
          'Define whether the project needs enclosure-only supply or integrated BMS and LCD hardware.',
        ],
      },
      {
        title: 'Choose between floor-standing and rack formats',
        paragraphs: [
          'A caster enclosure can help during positioning and service access in residential or small commercial rooms. A 6U rack kit can suit equipment cabinets, telecom rooms, and modular battery banks where rack depth, rail rating, airflow, and cable management are already planned.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing 51.2V LiFePO4 enclosure for compatible high-capacity cells.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount enclosure option for compact 51.2V battery module assembly.',
      },
    ],
    faqs: [
      {
        question: 'Is a 48V LiFePO4 battery the same as a 51.2V battery?',
        answer: 'Many 48V-class LiFePO4 systems use 16 cells in series and are described as 51.2V nominal. The inverter voltage range and BMS settings must still be confirmed.',
      },
      {
        question: 'Are battery cells included with the JKESS enclosure kits?',
        answer: 'No. The product page defines the enclosure and selected hardware scope. Compatible cells are sourced separately unless a written quotation states otherwise.',
      },
      {
        question: 'Can JKESS review my inverter compatibility?',
        answer: 'Yes. Send the inverter model, protocol information, target battery configuration, and selected enclosure option for compatibility review.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures',
        label: 'Battery enclosure selection guide',
        description: 'Compare enclosure scope, cell compatibility, and package options.',
      },
      {
        href: '/guides/how-to-match-bms-with-inverter',
        label: 'BMS and inverter matching checklist',
        description: 'Review voltage, current, protocol, firmware, and commissioning checks.',
      },
    ],
  },
  {
    path: 'high-voltage-bms-for-ess',
    kind: 'category',
    eyebrow: 'ESS rack control hardware',
    title: 'High Voltage BMS for ESS Battery Racks',
    description:
      'Review high voltage BMS hardware for ESS projects, including BCU master control, BMU slave monitoring, 100A and 200A options, PCS communication, and quotation inputs.',
    intro:
      'A high voltage BMS for energy storage systems coordinates rack safety, cell monitoring, contactor logic, current limits, and communication with a PCS or EMS. The correct hardware combination depends on voltage, current, module topology, protocol requirements, and the final system boundary.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Current classes', value: '100A and 200A hardware options' },
      { label: 'Control roles', value: 'Master BCU and slave BMU boxes' },
      { label: 'System interface', value: 'PCS, EMS, CAN, RS485 review' },
      { label: 'Use case', value: 'Commercial ESS racks and cabinets' },
    ],
    sections: [
      {
        title: 'Define the master and slave control scope',
        paragraphs: [
          'High voltage BMS hardware is not a complete battery pack. A functioning rack normally needs the correct master control box, slave monitoring boxes, sensors, contactors, pre-charge components, protection devices, wiring, PCS interface, and commissioning settings.',
        ],
        bullets: [
          'Confirm total series cell count, rack voltage range, module count, and BMU channel requirements.',
          'Confirm continuous current, peak current, contactor selection, and pre-charge logic.',
          'Confirm PCS or EMS protocol, message format, baud rate, and fault handling requirements.',
        ],
      },
      {
        title: 'Choose 100A or 200A from the electrical design',
        paragraphs: [
          'Current class should follow the project power requirement, battery module design, conductor rating, contactor rating, thermal condition, and operating schedule. A higher current option is not automatically better if the rest of the system is not designed for it.',
        ],
      },
      {
        title: 'Information to send before purchase',
        paragraphs: [
          'For a faster review, prepare a one-line diagram, rack voltage range, module arrangement, cell count, PCS model, required communication protocol, operating current, peak current, destination country, and any required compliance documentation.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BMS control-box options for engineered ESS rack projects.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Quoted cabinet solution when the project requires a configured complete system.',
      },
    ],
    faqs: [
      {
        question: 'Is a master control box enough for a complete high voltage battery rack?',
        answer: 'No. It is one part of the control architecture. Slave monitoring, sensors, contactors, wiring, PCS communication, and commissioning requirements must also be defined.',
      },
      {
        question: 'How do I choose between 100A and 200A?',
        answer: 'Choose from the project power, voltage, battery module design, conductor and contactor ratings, thermal conditions, and duty cycle.',
      },
      {
        question: 'Can JKESS review PCS communication compatibility?',
        answer: 'Yes. Provide the PCS or EMS model and protocol document so JKESS can review communication and control requirements.',
      },
    ],
    related: [
      {
        href: '/high-voltage-bms',
        label: 'High-voltage BMS selection page',
        description: 'Compare high-voltage BMS hardware, scope, and quotation inputs.',
      },
      {
        href: '/guides/bcu-vs-bmu',
        label: 'BCU vs BMU guide',
        description: 'Understand master and slave controller roles in high-voltage BMS architecture.',
      },
    ],
  },
  {
    path: 'commercial-battery-storage-cabinet',
    kind: 'solution',
    eyebrow: 'C&I energy storage planning',
    title: 'Commercial Battery Storage Cabinet Planning Guide',
    description:
      'Plan a commercial battery storage cabinet by reviewing capacity, PCS power, cooling method, outdoor rating, communication, safety documentation, and project quotation scope.',
    intro:
      'Commercial battery storage cabinets are project-configured systems. The right solution depends on load profile, tariff structure, backup requirement, PCS power, site conditions, installation boundary, logistics route, and local documentation requirements.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Typical use', value: 'Peak shaving, backup, solar self-use' },
      { label: 'Configuration', value: 'Capacity, PCS power, cooling, EMS' },
      { label: 'Project input', value: 'Load data and site conditions' },
      { label: 'Commercial path', value: 'Quotation-based configuration' },
    ],
    sections: [
      {
        title: 'Start from the load and tariff data',
        paragraphs: [
          'A cabinet should not be selected from kWh alone. Peak shaving, backup, solar self-consumption, and demand management each require different power, capacity, discharge duration, and control strategy.',
          'Where possible, provide measured interval load data, peak demand charges, electricity tariff periods, backup loads, available transformer capacity, and the target financial objective.',
        ],
      },
      {
        title: 'Define cabinet configuration and site constraints',
        paragraphs: [
          'The quotation should define capacity, PCS power, cooling method, IP rating, communication, fire and safety documentation, installation boundary, freight route, and any customer-side civil or electrical work.',
        ],
        bullets: [
          'Ambient temperature, altitude, humidity, dust, solar exposure, and corrosion environment.',
          'Available footprint, cabinet spacing, access for service, crane route, and unloading condition.',
          'Grid connection point, AC voltage, transformer capacity, EMS or monitoring requirements.',
          'Documentation, warranty, commissioning, and training scope required by the buyer.',
        ],
      },
      {
        title: 'When a quoted cabinet is better than buying parts',
        paragraphs: [
          'A quoted cabinet can be more appropriate when the project needs coordinated battery modules, BMS, PCS, thermal management, enclosure design, monitoring, and documentation. Component-only purchasing may suit experienced integrators who already own the system engineering responsibility.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial and industrial cabinet solution for project quotation review.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'Control hardware option for integrators engineering their own ESS rack architecture.',
      },
    ],
    faqs: [
      {
        question: 'Can I buy a commercial storage cabinet directly online?',
        answer: 'No. C&I cabinets require quotation review because final capacity, PCS power, cooling, site conditions, shipping route, documentation, and project scope must be confirmed.',
      },
      {
        question: 'What information is needed for a cabinet quotation?',
        answer: 'Provide load data, use case, target capacity, PCS power, site country, site conditions, grid voltage, installation boundary, and required documentation.',
      },
      {
        question: 'Does JKESS support air-cooled and liquid-cooled configurations?',
        answer: 'Selected cabinet configurations can use intelligent air cooling or liquid cooling. The final quotation confirms the supplied thermal-management system.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage overview',
        description: 'Review C&I cabinet capacity, project scope, and quotation inputs.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Air-cooled vs liquid-cooled ESS',
        description: 'Compare thermal management choices for cabinet projects.',
      },
    ],
  },
  {
    path: 'can-rs485-bms-inverter-compatibility',
    kind: 'guide',
    eyebrow: 'Communication compatibility',
    title: 'CAN and RS485 BMS Inverter Compatibility Checklist',
    description:
      'Check BMS and inverter compatibility through CAN or RS485 by reviewing protocol, firmware, pinout, baud rate, message map, operating limits, and commissioning tests.',
    intro:
      'CAN or RS485 on a product label does not guarantee that a battery, BMS, inverter, PCS, or EMS will work together. Compatibility depends on the exact protocol, firmware, wiring, message format, state logic, and protection limits used by the completed system.',
    image: '/images/battery-kit-display.webp',
    highlights: [
      { label: 'Interfaces', value: 'CAN, RS485, Modbus, proprietary maps' },
      { label: 'Main risk', value: 'Same port, different protocol' },
      { label: 'Required proof', value: 'Protocol files and commissioning test' },
      { label: 'Best use', value: 'Battery-to-inverter matching review' },
    ],
    sections: [
      {
        title: 'Check protocol before connector shape',
        paragraphs: [
          'Two devices can both include CAN or RS485 ports and still be incompatible. Confirm the application protocol, message identifiers or register map, byte order, scaling, update interval, alarm definitions, and master-slave relationship.',
        ],
      },
      {
        title: 'Check wiring and physical layer details',
        paragraphs: [
          'Incorrect pinout, missing termination, swapped differential wires, duplicated addresses, wrong baud rate, or unsupported firmware can prevent communication even when the equipment is otherwise suitable.',
        ],
        bullets: [
          'Confirm CAN-H/CAN-L or RS485-A/RS485-B pinout from both device manuals.',
          'Confirm baud rate, parity, stop bits, termination, shielding, grounding, and maximum cable length.',
          'Record firmware versions and supported protocol profiles before commissioning.',
        ],
      },
      {
        title: 'Commission operating limits, not only data display',
        paragraphs: [
          'A system may show voltage and state-of-charge but still fail under real operation if charge enable, discharge enable, current limit, contactor status, alarm handling, or fault recovery logic does not match.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Low-voltage enclosure option where BMS and inverter communication must be checked before assembly.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'High-voltage BMS control hardware requiring PCS or EMS protocol review.',
      },
    ],
    faqs: [
      {
        question: 'Does CAN support mean my inverter will work with the BMS?',
        answer: 'No. CAN is an interface, not a complete compatibility statement. Message format, firmware, state logic, and settings must match.',
      },
      {
        question: 'Is RS485 always Modbus?',
        answer: 'No. RS485 is a physical communication layer. It can carry Modbus RTU or a manufacturer-specific protocol.',
      },
      {
        question: 'What should I send for a compatibility review?',
        answer: 'Send the inverter or PCS model, BMS model, protocol document, wiring pinout, firmware versions, target voltage, current, and battery configuration.',
      },
    ],
    related: [
      {
        href: '/guides/can-vs-rs485-battery-communication',
        label: 'CAN vs RS485 technical guide',
        description: 'Compare interface behavior, protocol risks, and commissioning checks.',
      },
      {
        href: '/guides/how-to-match-bms-with-inverter',
        label: 'How to match BMS with inverter',
        description: 'Use a broader voltage, current, firmware, and commissioning checklist.',
      },
    ],
  },
  {
    path: 'europe',
    kind: 'category',
    eyebrow: 'Europe battery storage market',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for Europe',
    description:
      'Compare JKESS LiFePO4 battery kits, 48V battery enclosures, high-voltage BMS hardware, EU shipping review, and commercial energy storage cabinet quotation paths for European buyers.',
    intro:
      'European battery storage buyers often search from several directions at once: EU warehouse availability, LiFePO4 battery kit Europe, 48V battery enclosure EU shipping, high-voltage BMS for ESS, and commercial energy storage cabinet Europe. This hub connects those search intents to the relevant JKESS product pages, country pages, and quotation workflow.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Market focus', value: 'European Union and nearby project buyers' },
      { label: 'Search themes', value: 'EU warehouse, LiFePO4 kits, C&I ESS' },
      { label: 'Product paths', value: '48V kits, rack kits, HV BMS, cabinets' },
      { label: 'Conversion route', value: 'Product review to written quote' },
    ],
    sections: [
      {
        title: 'Start from the European buying intent',
        paragraphs: [
          'A buyer searching for an EU warehouse battery kit may need a directly orderable 48V or 51.2V enclosure. A project owner searching for commercial energy storage cabinet Europe may need a configured C&I quotation instead. Separating those intents helps customers reach the correct product and reduces unclear inquiries.',
          'JKESS supports direct online ordering for selected products and written quotation review for larger quantities, project shipments, high-voltage BMS architecture, and configured C&I ESS cabinets.',
        ],
      },
      {
        title: 'What European buyers should prepare',
        paragraphs: [
          'A useful request should define the product type, delivery country, quantity, inverter or PCS compatibility needs, and whether the buyer expects a product-only shipment or a broader project scope.',
        ],
        bullets: [
          'For battery kits: cell model, enclosure format, BMS and LCD option, inverter protocol, quantity, and delivery postal code.',
          'For high-voltage BMS: pack voltage, module count, current class, PCS or EMS protocol, and contactor logic.',
          'For C&I cabinets: capacity target, AC power, cooling preference, site conditions, documentation, unloading, and installation boundary.',
          'For logistics: EU destination country, delivery city, address type, unloading access, deadline, and any customs or documentation requirements.',
        ],
      },
      {
        title: 'Country pages for more specific search traffic',
        paragraphs: [
          'Germany, France, Italy, the Netherlands, and Poland each have dedicated pages that connect local search wording to the same product and quotation path. These pages create clearer internal links for search engines and give buyers a country-specific checklist before contacting JKESS.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable 51.2V LiFePO4 enclosure kit for European residential and small commercial storage assembly.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount LiFePO4 enclosure kit for 19-inch cabinet and equipment-room battery projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BCU or BMU control boxes for high-voltage ESS rack integrators.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial energy storage cabinet for European project quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Does JKESS support EU shipping for battery kits?',
        answer: 'Selected battery kit orders can use the current EU shipping review path. Larger quantities, project shipments, remote delivery, or configured cabinet projects should request a written quotation.',
      },
      {
        question: 'Which European countries have dedicated JKESS market pages?',
        answer: 'The current Europe cluster includes Germany, France, Italy, the Netherlands, and Poland, with room to add more country pages as search data and sales priorities develop.',
      },
      {
        question: 'Should European C&I cabinet buyers use direct checkout?',
        answer: 'No. C&I cabinets are quotation-based because capacity, PCS power, cooling, documentation, freight, installation boundary, and site requirements must be confirmed.',
      },
    ],
    related: [
      {
        href: '/europe/eu-warehouse-battery-kit',
        label: 'EU warehouse battery kit checklist',
        description: 'Prepare delivery country, postal code, quantity, kit option, and freight review details.',
      },
      {
        href: '/europe/lifepo4-battery-kit-europe',
        label: 'LiFePO4 battery kit Europe',
        description: 'Compare caster and 6U rack LiFePO4 battery kit options for European buyers.',
      },
      {
        href: '/europe/48v-battery-enclosure-eu-shipping',
        label: '48V battery enclosure EU shipping',
        description: 'Confirm enclosure fit, BMS option, inverter protocol, and European delivery details.',
      },
      {
        href: '/europe/commercial-energy-storage-cabinet-europe',
        label: 'Commercial energy storage cabinet Europe',
        description: 'Prepare C&I cabinet capacity, PCS power, cooling, documentation, and delivery scope.',
      },
      {
        href: '/europe/germany-lifepo4-battery-kit',
        label: 'Germany LiFePO4 battery kits',
        description: 'Prepare German battery kit, EU shipping, and C&I cabinet quotation inputs.',
      },
      {
        href: '/europe/france-lifepo4-battery-kit',
        label: 'France battery storage quote planning',
        description: 'Review France-focused battery kit, high-voltage BMS, and cabinet quotation needs.',
      },
      {
        href: '/europe/italy-lifepo4-battery-kit',
        label: 'Italy 48V battery enclosure shipping',
        description: 'Plan Italy-focused 48V enclosure, rack kit, and commercial ESS requests.',
      },
      {
        href: '/europe/netherlands-lifepo4-battery-kit',
        label: 'Netherlands EU warehouse battery kit',
        description: 'Target Dutch buyers comparing battery kits, freight, and ESS cabinet scope.',
      },
      {
        href: '/europe/poland-lifepo4-battery-kit',
        label: 'Poland battery storage quotation',
        description: 'Prepare Polish battery kit, HV BMS, and C&I cabinet quotation details.',
      },
    ],
  },
  {
    path: 'europe/germany-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'Germany energy storage buyers',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for Germany',
    description:
      'Plan LiFePO4 battery kit, 48V battery enclosure, high-voltage BMS, and commercial energy storage cabinet purchases for Germany with EU shipping and project quotation support.',
    intro:
      'German buyers often compare low-voltage LiFePO4 battery kits, 48V or 51.2V battery enclosures, rack battery modules, and commercial energy storage cabinets before requesting a quotation. This page helps installers, distributors, and project owners prepare the product, documentation, and delivery details JKESS needs for Germany-focused review.',
    image: '/images/battery-kit-hero.webp',
    highlights: [
      { label: 'Target market', value: 'Germany and EU delivery projects' },
      { label: 'Core searches', value: 'LiFePO4 battery kit Europe' },
      { label: 'Product scope', value: '48V kits, HV BMS, C&I cabinets' },
      { label: 'Purchase path', value: 'Direct checkout or written quote' },
    ],
    sections: [
      {
        title: 'Battery kit selection for German installers',
        paragraphs: [
          'For residential and small commercial storage assembly, German buyers normally start with the battery format: floor-standing caster enclosure, 6U rack enclosure, or a configured C&I cabinet. The correct choice depends on cell model, inverter protocol, installation space, service access, documentation needs, and shipment size.',
          'JKESS battery kits are enclosure and integration-hardware products. Compatible LiFePO4 cells, inverter equipment, site cabling, installation, and commissioning are outside the standard package unless a written quotation states otherwise.',
        ],
      },
      {
        title: 'EU shipping and warehouse planning',
        paragraphs: [
          'For Germany, confirm whether the order can use the current EU direct-checkout path or whether it needs a manual shipping quotation because of quantity, unloading requirements, remote delivery, accessories, or project documentation.',
        ],
        bullets: [
          'Share the delivery city, postal code, delivery address type, and unloading limitations.',
          'Confirm whether the buyer needs enclosure-only supply or the option including LCD and BMS hardware.',
          'Provide inverter or PCS model details for CAN or RS485 compatibility review.',
          'For C&I cabinets, provide site information, AC power target, capacity target, cooling preference, and required documents.',
        ],
      },
      {
        title: 'When to request a project quotation',
        paragraphs: [
          'Request a quotation when the order includes several kits, a C&I high-voltage ESS cabinet, custom documentation, OEM requirements, unusual delivery conditions, or a larger project where freight, lead time, and included scope must be confirmed in writing.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable 51.2V LiFePO4 battery enclosure kit for German residential and small commercial assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount LiFePO4 battery enclosure for 19-inch cabinets and equipment-room installations.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial storage cabinet for German C&I projects requiring written quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Can German customers request EU shipping for JKESS battery kits?',
        answer: 'Yes. Germany is handled as an EU destination for website shipping review, but larger orders, remote delivery, or project shipments may still require a written quotation.',
      },
      {
        question: 'Are LiFePO4 cells included with the Battery Kit or 6U Battery Kit?',
        answer: 'No. The kits provide the enclosure and selected hardware package. Compatible LiFePO4 cells must be sourced separately unless a quotation says otherwise.',
      },
      {
        question: 'What should German C&I ESS buyers send before quotation?',
        answer: 'Send capacity target, AC power, site location, grid information, cooling preference, installation scope, documentation requirements, and delivery conditions.',
      },
    ],
    related: [
      {
        href: '/48v-lifepo4-battery-enclosure',
        label: '48V LiFePO4 battery enclosure planning',
        description: 'Check cell fit, BMS communication, inverter protocol, and 48V-class enclosure selection.',
      },
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet',
        description: 'Plan C&I cabinet capacity, PCS power, cooling, logistics, and project quotation scope.',
      },
    ],
  },
  {
    path: 'europe/france-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'France storage project planning',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for France',
    description:
      'Prepare a France-focused quotation for LiFePO4 battery kits, 48V battery enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU shipping review.',
    intro:
      'French residential solar installers, distributors, and C&I energy storage buyers can use this page to prepare a JKESS quotation request for 48V LiFePO4 battery enclosures, rack battery kits, high-voltage BMS control boxes, or configured commercial ESS cabinets.',
    image: '/images/6u-kit/1.webp',
    highlights: [
      { label: 'Target market', value: 'France and EU delivery projects' },
      { label: 'Buyer intent', value: 'Battery kit Europe and EU shipping' },
      { label: 'System classes', value: 'Residential, rack, and C&I ESS' },
      { label: 'Key check', value: 'Protocol, freight, documents, scope' },
    ],
    sections: [
      {
        title: 'Low-voltage battery enclosure planning',
        paragraphs: [
          'For 48V-class residential and small commercial projects in France, start with the cell format, enclosure style, inverter model, communication protocol, and installation space. A floor-standing caster kit can support movable battery placement, while a 6U rack kit can support cabinet-based installations.',
          'The battery cells are not included in the standard enclosure kit scope. Buyers should confirm cell dimensions, BMS option, display requirement, breaker layout, and communication needs before ordering.',
        ],
      },
      {
        title: 'Commercial cabinet quotation inputs',
        paragraphs: [
          'For C&I projects, a commercial battery storage cabinet quotation should define usable capacity, PCS power, cooling method, installation environment, monitoring interface, documentation requirements, and delivery terms.',
        ],
        bullets: [
          'Project use case: peak shaving, backup, solar self-consumption, or demand management.',
          'Delivery country, city, postal code, site access, and unloading requirements.',
          'Required documents, warranty expectations, commissioning scope, and remote monitoring needs.',
          'Whether the buyer needs cabinet-only supply or a broader package with PCS, EMS, cooling, and fire protection.',
        ],
      },
      {
        title: 'EU warehouse and freight review',
        paragraphs: [
          'For France, EU shipping may be available for suitable direct-checkout products, while multi-product or cabinet projects should be reviewed through a written quotation so freight, Incoterm, destination conditions, and included scope are clear.',
        ],
      },
    ],
    products: [
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount LiFePO4 enclosure for French installers using 19-inch equipment cabinets.',
      },
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable battery enclosure kit for 51.2V LiFePO4 storage assembly projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BCU or BMU control box options for ESS rack integrators.',
      },
    ],
    faqs: [
      {
        question: 'Can JKESS ship battery kits to France?',
        answer: 'France is an EU destination for shipping review. Direct checkout may apply to selected products, while larger or project-based orders should request a written quotation.',
      },
      {
        question: 'Can JKESS review inverter communication before shipment?',
        answer: 'Yes. Send the inverter model, CAN or RS485 protocol, firmware version, battery configuration, and selected kit option for review.',
      },
      {
        question: 'Is a C&I ESS cabinet priced online for France?',
        answer: 'No. Commercial cabinets are quoted because final capacity, PCS power, cooling, documents, freight, and project scope must be confirmed.',
      },
    ],
    related: [
      {
        href: '/can-rs485-bms-inverter-compatibility',
        label: 'CAN and RS485 compatibility checklist',
        description: 'Review protocol, pinout, firmware, and commissioning checks before ordering.',
      },
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage overview',
        description: 'Compare C&I cabinet capacity, cooling, AC power, and project scope.',
      },
    ],
  },
  {
    path: 'europe/italy-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'Italy solar storage buyers',
    title: 'LiFePO4 Battery Kits and Commercial ESS Cabinets for Italy',
    description:
      'Plan Italy-focused purchases for 48V LiFePO4 battery enclosures, rack battery kits, high-voltage BMS hardware, and C&I energy storage cabinets with EU shipping support.',
    intro:
      'Italian residential solar, small commercial, and C&I buyers often compare 48V LiFePO4 battery kit options with larger commercial energy storage cabinets. JKESS supports quotation review for enclosure kits, high-voltage BMS hardware, and configured ESS cabinet projects based on the real delivery and integration requirements.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Target market', value: 'Italy and EU delivery projects' },
      { label: 'Search intent', value: '48V battery enclosure EU shipping' },
      { label: 'Product range', value: 'Battery kits to C&I ESS cabinets' },
      { label: 'Project path', value: 'Product selection plus quote review' },
    ],
    sections: [
      {
        title: '48V and 51.2V battery kit choices',
        paragraphs: [
          'For Italian residential solar storage, a 48V-class LiFePO4 system commonly means a 16-series 51.2V nominal battery. The enclosure selection should be checked against the cell dimensions, BMS option, inverter communication protocol, cable route, and service clearance.',
          'A caster battery kit can support floor-standing installations where movement and access matter. A 6U rack kit can suit compact rack-based installations where cabinet depth, airflow, and front service access are already planned.',
        ],
      },
      {
        title: 'C&I cabinet projects in Italy',
        paragraphs: [
          'Commercial energy storage cabinet projects should be reviewed from the load profile, target AC power, energy capacity, cooling method, monitoring, fire protection, grid conditions, site access, and documentation requirements.',
        ],
        bullets: [
          'Provide project use case, capacity, AC power, duty cycle, and backup requirement.',
          'Confirm delivery city, postal code, unloading equipment, and any restricted-access conditions.',
          'Share PCS, EMS, grid, monitoring, and documentation requirements before quotation.',
        ],
      },
      {
        title: 'When direct checkout is not enough',
        paragraphs: [
          'If the order involves several kits, custom scope, commercial cabinets, documentation, or freight-sensitive delivery, request a quotation first so JKESS can confirm product scope, delivery terms, and lead time in writing.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable 51.2V LiFePO4 enclosure kit for Italian residential and small commercial storage assembly.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack enclosure kit for compact 51.2V LiFePO4 battery module projects.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial energy storage cabinet for Italy-focused project quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Can Italian customers use EU shipping for JKESS battery kits?',
        answer: 'Italy is treated as an EU destination for website shipping review. Larger, remote, or project shipments may require manual quotation.',
      },
      {
        question: 'Which kit is better for Italian residential solar storage?',
        answer: 'Use the caster kit when floor placement and movement are useful; use the 6U kit when the battery will sit in a 19-inch rack with planned depth, airflow, and cabling.',
      },
      {
        question: 'Can JKESS quote a commercial ESS cabinet for Italy?',
        answer: 'Yes. Send capacity, AC power, site conditions, cooling preference, delivery details, and required documentation for quotation review.',
      },
    ],
    related: [
      {
        href: '/48v-lifepo4-battery-enclosure',
        label: '48V battery enclosure planning',
        description: 'Review 48V-class enclosure fit, communication, and installation format.',
      },
      {
        href: '/high-voltage-bms-for-ess',
        label: 'High-voltage BMS for ESS',
        description: 'Plan BCU, BMU, PCS communication, and current-class requirements.',
      },
    ],
  },
  {
    path: 'europe/netherlands-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'Netherlands ESS buyers',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for the Netherlands',
    description:
      'Prepare Netherlands-focused quotations for LiFePO4 battery kits, 48V battery enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU delivery review.',
    intro:
      'Dutch buyers evaluating solar storage, battery enclosures, and commercial energy storage projects can use this page to prepare a focused JKESS quotation request. The main inputs are battery format, inverter or PCS compatibility, destination details, documentation requirements, and final supply boundary.',
    image: '/images/6u-kit/2.webp',
    highlights: [
      { label: 'Target market', value: 'Netherlands and EU logistics' },
      { label: 'Core phrase', value: 'EU warehouse battery kit' },
      { label: 'Format options', value: 'Caster, rack, HV BMS, C&I cabinet' },
      { label: 'Buyer need', value: 'Fast quotation and clear scope' },
    ],
    sections: [
      {
        title: 'Prepare a faster Netherlands quotation',
        paragraphs: [
          'For the Netherlands, provide the delivery city, postal code, delivery address type, quantity, selected product option, and whether the project requires direct checkout, bulk review, or commercial cabinet quotation.',
          'For low-voltage kits, include the intended cell model, inverter brand, CAN or RS485 requirement, and whether the buyer needs enclosure-only supply or the LCD and BMS option.',
        ],
      },
      {
        title: 'Commercial energy storage cabinet review',
        paragraphs: [
          'Dutch C&I storage projects may require a configured cabinet rather than separate components. The quotation should define the selected capacity, PCS power, cooling method, EMS or monitoring interface, documentation, delivery, and installation boundary.',
        ],
        bullets: [
          'Load profile, peak shaving objective, backup duration, or solar self-consumption target.',
          'Grid connection, AC voltage, PCS requirements, monitoring interface, and site constraints.',
          'Freight route, unloading, installation boundary, and required warranty or documentation terms.',
        ],
      },
      {
        title: 'EU delivery scope',
        paragraphs: [
          'Selected battery kit orders may be suitable for EU direct checkout, while multi-product, palletized, cabinet, or project shipments should use the quote form so freight terms and included services are confirmed before payment.',
        ],
      },
    ],
    products: [
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount LiFePO4 battery enclosure for compact 19-inch cabinet installations.',
      },
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing battery enclosure kit for movable 51.2V LiFePO4 storage assembly.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BCU and BMU control hardware for high-voltage ESS rack integrators.',
      },
    ],
    faqs: [
      {
        question: 'Does JKESS support battery kit delivery to the Netherlands?',
        answer: 'Yes. The Netherlands is an EU destination for shipping review, but the final delivery method depends on product type, quantity, address, and project scope.',
      },
      {
        question: 'Can the 6U kit be used in standard rack installations?',
        answer: 'It is designed for 19-inch rack projects, but cabinet depth, rail position, airflow, load rating, and cable routing must be confirmed before ordering.',
      },
      {
        question: 'When should Dutch buyers request a written quote?',
        answer: 'Request a quote for bulk purchases, C&I cabinets, custom documentation, remote delivery, OEM requirements, or multi-product shipments.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures',
        label: 'LiFePO4 battery enclosure selection',
        description: 'Compare enclosure formats, cell fit, and included hardware scope.',
      },
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet',
        description: 'Plan capacity, PCS power, cooling, safety documentation, and logistics.',
      },
    ],
  },
  {
    path: 'europe/poland-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'Poland battery storage planning',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for Poland',
    description:
      'Plan Poland-focused EU shipping and quotation review for LiFePO4 battery kits, 48V battery enclosures, high-voltage BMS control boxes, and commercial energy storage cabinets.',
    intro:
      'Polish residential storage installers, distributors, and commercial project owners can prepare a JKESS quotation request by defining the battery enclosure format, inverter or PCS compatibility, delivery conditions, and whether the purchase is a direct product order or a configured project.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Target market', value: 'Poland and EU shipping review' },
      { label: 'Search demand', value: 'LiFePO4 battery kit Europe' },
      { label: 'Product scope', value: '48V enclosure to C&I cabinet' },
      { label: 'Best CTA', value: 'Request product and freight quote' },
    ],
    sections: [
      {
        title: 'Battery enclosures for Poland projects',
        paragraphs: [
          'For Polish 48V-class battery projects, compare caster and rack enclosure formats from the actual installation environment. Floor-standing projects may value movement and access, while rack projects require cabinet-depth, rail-capacity, airflow, and cable-route checks.',
          'Confirm the cell model, dimensions, BMS package, LCD requirement, inverter communication protocol, and required documentation before ordering.',
        ],
      },
      {
        title: 'High-voltage and commercial ESS project inputs',
        paragraphs: [
          'For high-voltage BMS hardware or commercial energy storage cabinets, the quotation must be based on electrical architecture and project scope rather than product title alone.',
        ],
        bullets: [
          'For high-voltage BMS: pack voltage, cell count, module count, current class, PCS protocol, and contactor logic.',
          'For C&I cabinet: capacity target, AC power, cooling method, site environment, monitoring, and fire-protection requirements.',
          'For logistics: delivery city, postal code, address type, unloading method, freight requirement, and delivery deadline.',
        ],
      },
      {
        title: 'Why use a written quote for Poland',
        paragraphs: [
          'A written quotation is useful when the order involves bulk kits, high-voltage control hardware, C&I cabinets, documentation, or delivery details that can affect final landed cost and schedule.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable 51.2V LiFePO4 battery enclosure kit for Polish residential and small commercial assembly.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A high-voltage BMS control boxes for ESS rack engineering projects.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial battery storage cabinet for Poland-focused project quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Can JKESS quote battery kit shipments to Poland?',
        answer: 'Yes. Poland is an EU destination for shipping review. The final delivery method and cost depend on product type, quantity, address, and project requirements.',
      },
      {
        question: 'Can JKESS support both low-voltage and high-voltage projects for Poland?',
        answer: 'Yes. Low-voltage enclosure kits, high-voltage BMS control hardware, and configured C&I ESS cabinets can all be reviewed from project inputs.',
      },
      {
        question: 'What makes a Poland C&I cabinet quotation faster?',
        answer: 'Provide capacity, PCS power, application, site city, grid information, cooling preference, documentation needs, unloading conditions, and installation boundary.',
      },
    ],
    related: [
      {
        href: '/high-voltage-bms-for-ess',
        label: 'High-voltage BMS for ESS',
        description: 'Review BCU, BMU, current class, PCS communication, and quotation inputs.',
      },
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage overview',
        description: 'Compare C&I cabinet capacity, power, cooling, and final supply scope.',
      },
    ],
  },
  {
    path: 'europe/eu-warehouse-battery-kit',
    kind: 'solution',
    eyebrow: 'EU warehouse battery kit search',
    title: 'EU Warehouse Battery Kit Buying Checklist',
    description:
      'Use this EU warehouse battery kit checklist to prepare LiFePO4 battery enclosure, 6U rack kit, delivery country, quantity, inverter compatibility, and shipping quotation details.',
    intro:
      'Buyers searching for an EU warehouse battery kit usually want fast delivery, clear landed cost, and a battery enclosure that fits the planned cells and inverter. This page explains what to confirm before requesting a JKESS battery kit or rack kit quotation for European delivery.',
    image: '/images/battery-kit-hero.webp',
    highlights: [
      { label: 'Search intent', value: 'EU warehouse battery kit' },
      { label: 'Best fit', value: '48V / 51.2V LiFePO4 enclosure kits' },
      { label: 'Buyer check', value: 'Country, postal code, quantity, unloading' },
      { label: 'Next step', value: 'Direct checkout or written quote' },
    ],
    sections: [
      {
        title: 'What EU warehouse buyers normally need to confirm',
        paragraphs: [
          'Warehouse availability and delivery speed are only part of the buying decision. A battery kit still has to match the cell model, BMS option, inverter protocol, installation format, cable layout, and delivery conditions.',
          'For JKESS, the Battery Kit With Caster and 6U Battery Kit are enclosure and integration-hardware products. Compatible cells and site-side equipment are outside the standard scope unless a written quotation confirms otherwise.',
        ],
      },
      {
        title: 'Information that makes an EU quote faster',
        paragraphs: [
          'A short, complete request helps JKESS confirm whether a direct checkout path is suitable or whether the shipment needs manual freight review.',
        ],
        bullets: [
          'Delivery country, city, postal code, delivery address type, and unloading constraints.',
          'Product option, required quantity, expected delivery window, and whether the order is for resale or a project.',
          'Cell model, inverter model, CAN or RS485 requirement, and whether LCD plus BMS hardware is needed.',
          'Any documentation, OEM label, packing, pallet, or repeated-project requirements.',
        ],
      },
      {
        title: 'When to use the quotation form instead of checkout',
        paragraphs: [
          'Use the quote form when the order has multiple products, larger quantities, remote or restricted delivery, OEM requirements, or any condition that can affect freight, lead time, or final included scope.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable 51.2V LiFePO4 battery enclosure kit for European buyers comparing EU delivery options.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount battery enclosure kit for EU projects using 19-inch cabinets and modular battery rooms.',
      },
    ],
    faqs: [
      {
        question: 'Does EU warehouse availability guarantee the kit fits my cells?',
        answer: 'No. Shipping availability and mechanical compatibility are separate questions. Confirm cell dimensions, terminal layout, BMS option, and inverter communication before ordering.',
      },
      {
        question: 'Should I request a quote for several battery kits?',
        answer: 'Yes. Larger quantities may require freight, pallet, delivery, and volume pricing review before payment.',
      },
      {
        question: 'Are batteries or cells included in the enclosure kit?',
        answer: 'No. JKESS battery kits list the enclosure and selected hardware scope. Cells are separate unless the written quotation says otherwise.',
      },
    ],
    related: [
      {
        href: '/europe',
        label: 'Europe battery storage hub',
        description: 'Navigate EU battery kit, country page, 48V enclosure, and C&I ESS quotation paths.',
      },
      {
        href: '/europe/48v-battery-enclosure-eu-shipping',
        label: '48V battery enclosure EU shipping',
        description: 'Review delivery and compatibility details for 48V-class enclosure projects.',
      },
    ],
  },
  {
    path: 'europe/lifepo4-battery-kit-europe',
    kind: 'solution',
    eyebrow: 'LiFePO4 battery kit Europe',
    title: 'LiFePO4 Battery Kit Europe Selection Guide',
    description:
      'Compare LiFePO4 battery kit Europe options, including 48V caster enclosures, 6U rack battery kits, BMS and LCD options, inverter communication, and EU shipping review.',
    intro:
      'A European buyer searching for a LiFePO4 battery kit may need a movable 51.2V enclosure, a 6U rack battery kit, or a project quotation that combines several products. The right JKESS option depends on installation format, cell dimensions, electronics scope, inverter communication, and delivery country.',
    image: '/images/6u-kit/1.webp',
    highlights: [
      { label: 'Core keyword', value: 'LiFePO4 battery kit Europe' },
      { label: 'Voltage class', value: '48V / 51.2V battery projects' },
      { label: 'Formats', value: 'Caster enclosure and 6U rack kit' },
      { label: 'Critical check', value: 'Cells, BMS, inverter, delivery scope' },
    ],
    sections: [
      {
        title: 'Choose by installation format first',
        paragraphs: [
          'Floor-standing projects may prefer a caster enclosure because it improves movement and access during positioning. Rack-based projects may prefer a 6U kit when the site already has a 19-inch cabinet, planned airflow, service clearance, and front cable routing.',
          'Both choices require confirmation of cell fit, communication protocol, breaker and cable layout, and the exact included hardware package.',
        ],
      },
      {
        title: 'Confirm the electrical and communication boundary',
        paragraphs: [
          'A LiFePO4 kit can look mechanically correct but still fail project expectations if the BMS, inverter, and commissioning settings are not aligned.',
        ],
        bullets: [
          'Confirm inverter brand, model, firmware, CAN or RS485 profile, baud rate, and pinout.',
          'Confirm required BMS and LCD package or enclosure-only supply.',
          'Confirm cell model, nominal capacity, dimensions, terminal position, and busbar layout.',
          'Confirm country-specific delivery, documentation, warranty, and after-sales support expectations.',
        ],
      },
      {
        title: 'Use country pages for local delivery preparation',
        paragraphs: [
          'Germany, France, Italy, the Netherlands, and Poland have dedicated JKESS pages that translate the same kit-selection workflow into country-focused delivery and quotation checklists.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable LiFePO4 battery kit format for European residential and small commercial storage assembly.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount LiFePO4 battery kit for compact modular energy storage installations.',
      },
    ],
    faqs: [
      {
        question: 'Which JKESS kit is better for a European home battery project?',
        answer: 'Use the caster kit when floor placement and movement matter. Use the 6U kit when the battery will be installed in a suitable 19-inch rack with enough depth, airflow, and service access.',
      },
      {
        question: 'Does JKESS confirm inverter compatibility?',
        answer: 'JKESS can review the inverter model, protocol, firmware, pinout, voltage range, and selected BMS option before purchase.',
      },
      {
        question: 'Can one Europe quote include several kit types?',
        answer: 'Yes. Use the quote form for multi-product or volume requests so quantity, freight, and delivery conditions can be reviewed together.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures',
        label: 'LiFePO4 battery enclosures',
        description: 'Compare enclosure scope, cell fit, installation format, and included hardware.',
      },
      {
        href: '/europe/eu-warehouse-battery-kit',
        label: 'EU warehouse battery kit checklist',
        description: 'Prepare delivery, quantity, postal code, and freight review details for EU orders.',
      },
    ],
  },
  {
    path: 'europe/commercial-energy-storage-cabinet-europe',
    kind: 'solution',
    eyebrow: 'Commercial ESS cabinet Europe',
    title: 'Commercial Energy Storage Cabinet Europe Quotation Guide',
    description:
      'Prepare a commercial energy storage cabinet Europe quotation by defining capacity, PCS power, cooling method, site conditions, documentation, delivery country, and installation scope.',
    intro:
      'Commercial energy storage cabinet Europe searches usually come from project owners, EPCs, distributors, or integrators who need more than a web price. A C&I ESS cabinet must be quoted from the project capacity, power, thermal design, site conditions, delivery route, and final scope of supply.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Core keyword', value: 'Commercial energy storage cabinet Europe' },
      { label: 'Capacity family', value: '64.3kWh to 261kWh configurations' },
      { label: 'Power range', value: '30kW to 125kW AC project classes' },
      { label: 'Sales path', value: 'Written project quotation' },
    ],
    sections: [
      {
        title: 'Why C&I cabinets need quotation review',
        paragraphs: [
          'A commercial battery cabinet cannot be selected by kWh alone. Usable capacity, PCS power, cooling method, duty cycle, peak shaving target, backup duration, monitoring, fire protection, and grid requirements all affect the final system.',
          'The JKESS C&I cabinet product is quoted because the final included equipment and services must be defined in writing before production and delivery.',
        ],
      },
      {
        title: 'European project inputs to prepare',
        paragraphs: [
          'A complete project request helps JKESS review the cabinet configuration, delivery feasibility, and commercial scope.',
        ],
        bullets: [
          'Delivery country, site city, unloading access, installation location, ambient temperature, and available footprint.',
          'Target capacity, AC power, PV input if applicable, backup duration, load profile, and operating objective.',
          'Cooling preference, fire-protection needs, monitoring protocol, EMS requirements, and grid connection information.',
          'Documentation, warranty, installation, commissioning, training, freight, duty, tax, and Incoterm expectations.',
        ],
      },
      {
        title: 'Compare cabinet and component-only routes',
        paragraphs: [
          'A configured cabinet suits buyers who want coordinated battery modules, BMS, PCS, EMS, cooling, enclosure, monitoring, and documentation. Component-only purchases may suit integrators who already own system engineering, certification, and commissioning responsibility.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial and industrial energy storage cabinet for European project quotation review.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BCU and BMU control hardware for integrators building their own high-voltage ESS racks.',
      },
    ],
    faqs: [
      {
        question: 'Can a commercial energy storage cabinet be purchased directly online?',
        answer: 'No. C&I cabinets require quotation review because capacity, PCS power, cooling, documentation, freight, installation boundary, and site conditions vary by project.',
      },
      {
        question: 'What should European C&I buyers include in the first request?',
        answer: 'Include capacity, AC power, use case, site country, delivery city, ambient conditions, grid details, cooling preference, documentation needs, and installation scope.',
      },
      {
        question: 'Does the quotation include freight and installation?',
        answer: 'Only if those items are explicitly listed. The signed quotation controls freight, tax, duty, installation, commissioning, and training scope.',
      },
    ],
    related: [
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Review capacity, PCS power, cooling, logistics, and project scope inputs.',
      },
      {
        href: '/europe',
        label: 'Europe battery storage hub',
        description: 'Navigate battery kit, high-voltage BMS, C&I cabinet, and country pages.',
      },
    ],
  },
  {
    path: 'europe/48v-battery-enclosure-eu-shipping',
    kind: 'solution',
    eyebrow: '48V enclosure EU shipping',
    title: '48V Battery Enclosure EU Shipping Checklist',
    description:
      'Prepare a 48V battery enclosure EU shipping request by confirming 51.2V LiFePO4 kit format, cell fit, BMS option, inverter protocol, delivery country, and postal code.',
    intro:
      'A 48V battery enclosure EU shipping request should combine technical fit and delivery planning. The enclosure must match the selected LiFePO4 cells and inverter communication, while the shipment needs a clear country, postal code, quantity, and delivery condition.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Core keyword', value: '48V battery enclosure EU shipping' },
      { label: 'Battery platform', value: '16S 51.2V LiFePO4 class' },
      { label: 'Main formats', value: 'Caster enclosure or 6U rack kit' },
      { label: 'Delivery details', value: 'Country, postal code, unloading' },
    ],
    sections: [
      {
        title: 'Confirm the enclosure before shipping',
        paragraphs: [
          'Many 48V-class LiFePO4 projects use a 16S 51.2V nominal battery. Before arranging EU shipping, confirm that the selected enclosure fits the cell model, terminal layout, busbar plan, BMS hardware, LCD display, breaker layout, and cable route.',
          'The enclosure kit is not a finished battery unless a written quotation defines a broader supplied scope. Cells, inverter, external protection equipment, onsite assembly, and commissioning remain separate unless explicitly included.',
        ],
      },
      {
        title: 'Confirm the EU delivery conditions',
        paragraphs: [
          'Shipping review depends on destination and order details. A complete request reduces back-and-forth before payment.',
        ],
        bullets: [
          'Country, city, postal code, delivery address type, and unloading equipment.',
          'Quantity, selected option, expected arrival timing, and whether the order is for a project or resale.',
          'Any packaging, pallet, remote area, delivery appointment, documentation, or customs requirement.',
        ],
      },
      {
        title: 'Confirm inverter and BMS communication',
        paragraphs: [
          'CAN or RS485 on the product name is not enough. Share the inverter model, firmware, protocol, pinout, and commissioning requirements so the BMS option can be reviewed before shipment.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: '48V-class movable LiFePO4 enclosure kit for European delivery review.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount 51.2V LiFePO4 enclosure kit for EU cabinet-based installations.',
      },
    ],
    faqs: [
      {
        question: 'Is a 48V enclosure the same as a 51.2V LiFePO4 enclosure?',
        answer: 'Many 48V-class LiFePO4 systems use 16 cells in series and are described as 51.2V nominal. Confirm inverter voltage range and BMS settings before ordering.',
      },
      {
        question: 'What EU shipping details should I provide?',
        answer: 'Provide country, city, postal code, address type, unloading constraints, quantity, product option, and expected arrival timing.',
      },
      {
        question: 'Can JKESS ship a complete finished battery?',
        answer: 'This page focuses on enclosure kits. A broader battery or project supply scope must be confirmed through a written quotation.',
      },
    ],
    related: [
      {
        href: '/48v-lifepo4-battery-enclosure',
        label: '48V LiFePO4 enclosure selection',
        description: 'Review mechanical fit, BMS protocol, inverter match, and installation format.',
      },
      {
        href: '/europe/lifepo4-battery-kit-europe',
        label: 'LiFePO4 battery kit Europe',
        description: 'Compare caster and 6U rack battery kit options for European buyers.',
      },
    ],
  },
]

export function getNonBrandLandingPage(path: string) {
  return nonBrandLandingPages.find((page) => page.path === path)
}
