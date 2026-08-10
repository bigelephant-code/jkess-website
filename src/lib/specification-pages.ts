import type { NonBrandLandingPage } from '@/lib/non-brand-pages'

export const specificationLandingPages: NonBrandLandingPage[] = [
  {
    path: 'battery-enclosures/15kwh-lifepo4',
    kind: 'category',
    eyebrow: '15kWh-class battery enclosure',
    title: '15kWh LiFePO4 Battery Enclosure Kit for 51.2V Systems',
    seoTitle: '15kWh LiFePO4 Battery Enclosure Kit',
    description:
      'Review a 15kWh-class 51.2V LiFePO4 battery enclosure kit for compatible 280Ah to 320Ah cells, with enclosure-only or BMS and LCD package options.',
    intro:
      'A 15kWh-class LiFePO4 battery enclosure is intended for installers building a low-voltage 51.2V storage battery from separately sourced cells and validated electronics. The actual nominal energy depends on the selected cell capacity, series count, operating voltage, and completed battery configuration, so the enclosure should be selected from the exact cell model and system design rather than the marketing capacity alone.',
    image: '/images/battery-kit-hero.webp',
    highlights: [
      { label: 'Platform', value: '51.2V low-voltage LiFePO4' },
      { label: 'Capacity class', value: 'Approximately 15kWh after assembly' },
      { label: 'Cell range', value: 'Compatible 280Ah to 320Ah cells' },
      { label: 'Supply choice', value: 'Enclosure only or BMS + LCD' },
    ],
    sections: [
      {
        title: 'What “15kWh” means for an enclosure kit',
        paragraphs: [
          'The enclosure itself does not store energy. The completed battery capacity is determined by the installed cells, nominal system voltage, usable state-of-charge window, BMS settings, and inverter operating limits. The 15kWh description refers to a supported assembled capacity class after compatible cells and required electronics are installed.',
          'For purchasing and engineering, use the exact cell specification and expected usable energy rather than assuming every 15kWh-labelled battery has the same dimensions, current capability, or inverter compatibility.',
        ],
      },
      {
        title: 'Who this configuration is intended for',
        paragraphs: [
          'A movable floor-standing enclosure can suit residential solar backup, workshops, cabins, demonstration systems, and small commercial storage projects that need easier positioning than a fixed rack installation.',
        ],
        bullets: [
          'Projects using a 51.2V low-voltage battery architecture.',
          'Installers sourcing compatible LiFePO4 cells separately.',
          'Sites that need a caster base for movement during installation or service.',
          'Systems where the inverter protocol and protection design will be confirmed before commissioning.',
        ],
      },
      {
        title: 'Inputs required before ordering',
        paragraphs: [
          'Cell amp-hour rating is not enough to confirm mechanical fit. Provide the cell manufacturer, model, dimensions, terminal position, compression method, quantity, inverter model, communication protocol, cable layout, and destination country.',
          'Also confirm whether the project requires the enclosure-only package or the package containing the specified BMS and LCD hardware. Battery cells, inverter, charger, external breaker, external cabling, onsite assembly, and commissioning are not included unless separately quoted.',
        ],
      },
      {
        title: '15kWh enclosure versus a rack battery kit',
        paragraphs: [
          'Choose a floor-standing caster enclosure when mobility and direct floor placement are useful. Choose a 6U rack enclosure when the project is designed around a standard 19-inch cabinet, front service access, controlled rack airflow, and modular stacking. The completed electrical design remains project-specific in both cases.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Movable sheet-metal enclosure for 15kWh or 16kWh-class 51.2V LiFePO4 assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Rack Battery Kit',
        description: '19-inch rack-mount alternative for compact 51.2V LiFePO4 battery modules.',
      },
    ],
    faqs: [
      {
        question: 'Does the 15kWh enclosure include battery cells?',
        answer: 'No. Compatible LiFePO4 cells must be purchased separately. The selected web option covers only the enclosure and the BMS or LCD hardware specifically listed for that package.',
      },
      {
        question: 'Is the completed battery guaranteed to provide exactly 15kWh of usable energy?',
        answer: 'No. Nominal and usable energy depend on the selected cells, voltage, BMS limits, inverter limits, reserve margin, temperature, ageing, and the operating state-of-charge window.',
      },
      {
        question: 'Can the enclosure be connected to any 48V or 51.2V inverter?',
        answer: 'No. Voltage range, charge and discharge limits, CAN or RS485 protocol, firmware, cable pinout, breaker sizing, and commissioning settings must all be checked.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures/16kwh-lifepo4',
        label: '16kWh LiFePO4 enclosure',
        description: 'Compare the higher-capacity assembly class and the additional cell-selection considerations.',
      },
      {
        href: '/battery-enclosures',
        label: 'Battery enclosure selection guide',
        description: 'Review the full enclosure family, included scope, cell compatibility, and installation questions.',
      },
    ],
  },
  {
    path: 'battery-enclosures/16kwh-lifepo4',
    kind: 'category',
    eyebrow: '16kWh-class battery enclosure',
    title: '16kWh LiFePO4 Battery Enclosure for 280Ah to 320Ah Cells',
    seoTitle: '16kWh LiFePO4 Battery Enclosure',
    description:
      'Explore a 16kWh-class 51.2V LiFePO4 battery enclosure for compatible 280Ah to 320Ah cells, with optional BMS and LCD integration hardware.',
    intro:
      'A 16kWh-class enclosure is used when a low-voltage battery project targets more nominal energy within the supported 51.2V platform. Capacity is created by the installed cells rather than the enclosure, and final usable energy depends on the completed battery design, operating limits, conversion losses, reserve margin, temperature, and ageing assumptions.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Platform', value: '51.2V LiFePO4 assembly' },
      { label: 'Capacity class', value: 'Approximately 16kWh after assembly' },
      { label: 'Mechanical format', value: 'Floor-standing enclosure with caster base' },
      { label: 'Communication', value: 'CAN or RS485 with compatible BMS' },
    ],
    sections: [
      {
        title: 'When to evaluate a 16kWh-class configuration',
        paragraphs: [
          'A higher nominal-energy configuration may be evaluated when the project needs more backup duration, more solar self-consumption, or additional operating reserve than a smaller assembly can provide. The correct capacity should be calculated from measured loads and expected operating hours, not selected only because a larger number appears in a product title.',
          'For example, backup runtime depends on critical-load power, inverter efficiency, permitted depth of discharge, reserve state of charge, temperature, and battery ageing. A 16kWh nominal label is therefore not the same as 16kWh continuously available to the load.',
        ],
      },
      {
        title: 'Cell compatibility must be checked by model',
        paragraphs: [
          'The enclosure family supports specified 280Ah to 320Ah LiFePO4 configurations, but cells with similar amp-hour ratings can differ in width, height, depth, terminal layout, pressure requirements, and recommended busbar design.',
        ],
        bullets: [
          'Provide a dimensional drawing or official cell datasheet.',
          'Confirm terminal spacing, busbar arrangement, insulation, and compression method.',
          'Confirm continuous and peak current against the cells, BMS, breakers, cables, and inverter.',
          'Confirm whether the selected option includes only the enclosure or the specified BMS and LCD hardware.',
        ],
      },
      {
        title: 'Installation and movement considerations',
        paragraphs: [
          'Caster wheels can simplify positioning, but the assembled battery will be much heavier than the empty enclosure. Confirm floor loading, ramp gradients, thresholds, wheel locking, cable strain relief, service clearance, ventilation, and a safe method for moving or securing the completed unit.',
          'The product should not be treated as portable consumer equipment. Final installation, protection, earthing, isolation, and local compliance remain part of the system design.',
        ],
      },
      {
        title: '16kWh versus multiple rack modules',
        paragraphs: [
          'A single floor enclosure can reduce the number of external rack components, while several rack modules can offer modular service and staged expansion. The choice depends on room layout, cabinet availability, maintenance strategy, current sharing, inverter limits, and the desired system architecture.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing enclosure supporting 15kWh and 16kWh-class assembled battery configurations.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Rack Battery Kit',
        description: 'Rack-mounted option for projects that prefer a standard 19-inch cabinet architecture.',
      },
    ],
    faqs: [
      {
        question: 'Which cell capacity creates a 16kWh battery?',
        answer: 'The exact nominal energy depends on cell amp-hour capacity and the completed series configuration. JKESS must confirm the selected cell model and mechanical fit before the enclosure is ordered.',
      },
      {
        question: 'Is the caster enclosure suitable for outdoor installation?',
        answer: 'The product specification and final installation environment must be reviewed. Weather exposure, enclosure rating, temperature, humidity, ventilation, corrosion, water ingress, and local electrical requirements cannot be inferred from the capacity label.',
      },
      {
        question: 'Does the optional BMS guarantee inverter compatibility?',
        answer: 'No. The inverter model, protocol version, firmware, CAN or RS485 wiring, voltage limits, and commissioning settings must be confirmed.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures/15kwh-lifepo4',
        label: '15kWh LiFePO4 enclosure',
        description: 'Review the lower-capacity class and compare project runtime and installation requirements.',
      },
      {
        href: '/rack-battery-enclosures',
        label: '6U rack battery enclosures',
        description: 'Compare a floor-standing battery with modular 19-inch rack installation.',
      },
    ],
  },
  {
    path: 'high-voltage-bms/100a',
    kind: 'category',
    eyebrow: '100A high-voltage control option',
    title: '100A High-Voltage BMS BCU and BMU Control Hardware',
    description:
      'Review the 100A high-voltage BMS control option with BCU master and BMU slave boxes, active balancing, insulation monitoring, CAN, RS485, and isoSPI.',
    intro:
      'The 100A option is a high-voltage BMS control-hardware selection for battery racks whose engineered current requirements fall within the applicable control architecture. It is supplied as an individual BCU master or BMU slave control box, not as a complete battery pack, rack, PCS, or EMS system.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Current option', value: '100A control architecture' },
      { label: 'Master hardware', value: 'BCU master control box' },
      { label: 'Slave hardware', value: 'BMU-H5-16 cell monitoring' },
      { label: 'Interfaces', value: 'CAN, RS485, and isoSPI' },
    ],
    sections: [
      {
        title: 'When a 100A option may be considered',
        paragraphs: [
          'A 100A architecture may be evaluated for moderate-current commercial battery racks where pack voltage, PCS power, duty cycle, cable design, thermal conditions, and protection equipment are consistent with the selected control hardware.',
          'The number in the option name is not by itself a complete system rating. Continuous current, peak current, charge and discharge direction, ambient temperature, busbars, contactors, fuses, breakers, cells, modules, and PCS limits must be evaluated together.',
        ],
      },
      {
        title: 'BCU and BMU selection inputs',
        paragraphs: [
          'The required number of master and slave boxes depends on the module and rack architecture. Share the single-line diagram and battery topology before ordering.',
        ],
        bullets: [
          'Cell chemistry, cells in series, module count, rack count, and total pack voltage.',
          'Continuous and peak current, charge and discharge profile, and expected operating temperature.',
          'Contactor and pre-charge design, insulation monitoring, interlock, and protection requirements.',
          'PCS and EMS models, communication protocol documents, network topology, and remote monitoring needs.',
        ],
      },
      {
        title: 'Monitoring and communication functions',
        paragraphs: [
          'The high-voltage control platform includes master-level voltage, current, insulation, protection, and communication functions together with BMU cell-voltage and temperature collection. The BMU-H5-16 specification includes 2A bidirectional active balancing for applicable configurations.',
          'CAN or RS485 connectors do not guarantee compatibility with a PCS or EMS. Message identifiers, signal scaling, state logic, timing, baud rate, firmware, wiring, and commissioning parameters must match.',
        ],
      },
      {
        title: 'What the selected price covers',
        paragraphs: [
          'The web price applies to the selected 100A master control box or 100A slave control box only. Battery cells, battery modules, racks, high-voltage cables, contactors, PCS, EMS, complete packs, system engineering, installation, and commissioning are excluded unless separately quoted.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: '100A High Voltage BMS Option',
        description: 'Select an individual 100A BCU master or BMU slave control box for an engineered high-voltage rack.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'Configured C&I ESS Cabinet',
        description: 'Integrated project alternative where the quotation can define BMS, PCS, EMS, cooling, fire protection, and monitoring.',
      },
    ],
    faqs: [
      {
        question: 'Does the 100A option include both a BCU and all required BMUs?',
        answer: 'No. Each listed variant is one selected master or slave control box. Required quantities depend on the completed module and rack architecture.',
      },
      {
        question: 'Can the 100A BMS be used with any high-voltage PCS?',
        answer: 'No. Voltage range, current, protocol, state logic, contactor control, insulation monitoring, firmware, wiring, and commissioning must be reviewed against the specific PCS and EMS.',
      },
      {
        question: 'How do I decide between 100A and 200A?',
        answer: 'Use the full electrical design: continuous and peak current, voltage, power, duty cycle, thermal conditions, protection equipment, cable and contactor ratings, PCS limits, and future expansion requirements.',
      },
    ],
    related: [
      {
        href: '/high-voltage-bms/200a',
        label: '200A high-voltage BMS option',
        description: 'Compare the higher-current control option and the additional electrical-design requirements.',
      },
      {
        href: '/high-voltage-bms',
        label: 'High-voltage BMS selection guide',
        description: 'Review BCU and BMU roles, supply scope, protocol requirements, and project inputs.',
      },
    ],
  },
  {
    path: 'high-voltage-bms/200a',
    kind: 'category',
    eyebrow: '200A high-voltage control option',
    title: '200A High-Voltage BMS Control Kit for Battery Racks',
    description:
      'Explore the 200A high-voltage BMS control option with BCU master and BMU slave hardware, active balancing, insulation monitoring, CAN, RS485, and isoSPI.',
    intro:
      'The 200A high-voltage option is intended for engineered battery-rack architectures that require a higher current class than the 100A selection. The final system capability still depends on the cells, modules, busbars, cables, contactors, protection devices, thermal design, PCS, and operating duty cycle.',
    image: '/images/hv-kit/2.jpg',
    highlights: [
      { label: 'Current option', value: '200A control architecture' },
      { label: 'System type', value: 'Commercial high-voltage battery rack' },
      { label: 'Cell monitoring', value: '9 to 16 series per BMU slave' },
      { label: 'Active balancing', value: '2A bidirectional on BMU-H5-16' },
    ],
    sections: [
      {
        title: 'Why a project may require the 200A option',
        paragraphs: [
          'A higher-current architecture may be considered where the PCS power, rack voltage, charge or discharge rate, or short-duration power requirement exceeds the design target of a moderate-current system. The 200A option should not be selected merely to create an undefined safety margin.',
          'Higher current increases the importance of conductor sizing, connection resistance, heat generation, contactor capability, fuse coordination, pre-charge design, current measurement, enclosure temperature, and fault-energy analysis.',
        ],
      },
      {
        title: 'Electrical information required for review',
        paragraphs: [
          'Provide the complete battery and PCS architecture so the control-hardware selection can be checked against the real current path and protection design.',
        ],
        bullets: [
          'Total pack voltage, nominal and maximum cell voltage, series count, parallel paths, module count, and rack count.',
          'Continuous charge and discharge current, peak duration, expected C-rate, duty cycle, and ambient range.',
          'Busbar, cable, connector, fuse, breaker, contactor, current-sensor, pre-charge, and cooling specifications.',
          'PCS and EMS interface documents, control sequence, emergency shutdown, interlock, insulation, and remote-monitoring requirements.',
        ],
      },
      {
        title: '200A does not define the complete system power',
        paragraphs: [
          'Power is a function of operating voltage and current, but a theoretical multiplication is not a final equipment rating. The usable voltage range, transient limits, PCS capability, thermal restrictions, cell limits, state of charge, and protection settings determine the permitted operating envelope.',
          'The final engineering review must define continuous, peak, charge, discharge, and fault conditions separately.',
        ],
      },
      {
        title: 'Supply boundary and integration responsibility',
        paragraphs: [
          'Each web variant covers one selected 200A BCU master or BMU slave control box. The complete battery pack, battery cells, modules, racks, high-voltage harnesses, contactors, PCS, EMS, installation, commissioning, and certification work are not automatically included.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: '200A High Voltage BMS Option',
        description: 'Individual 200A master or slave control-box option for a validated commercial battery-rack design.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I Energy Storage Cabinet',
        description: 'Configured-to-order cabinet platform for customers who need a defined integrated project scope.',
      },
    ],
    faqs: [
      {
        question: 'Is the 200A option automatically better than 100A?',
        answer: 'No. The correct option is the one matched to the designed current, voltage, PCS, duty cycle, thermal conditions, protection equipment, cost, and future expansion plan.',
      },
      {
        question: 'Does the 200A option include contactors and high-voltage cabling?',
        answer: 'No. The listed product is the selected BMS control box. Contactors, cables, racks, cells, modules, PCS, EMS, and complete-system integration are excluded unless specifically quoted.',
      },
      {
        question: 'Can several battery racks communicate with one EMS?',
        answer: 'Multi-rack architectures can be engineered, but addressing, gateways, master coordination, protocol, protection hierarchy, PCS topology, and EMS control must be defined for the project.',
      },
    ],
    related: [
      {
        href: '/high-voltage-bms/100a',
        label: '100A high-voltage BMS option',
        description: 'Compare the moderate-current option before selecting the higher-current architecture.',
      },
      {
        href: '/commercial-energy-storage',
        label: 'Commercial ESS cabinet configurations',
        description: 'Review an integrated cabinet platform instead of separately engineering the battery rack.',
      },
    ],
  },
  {
    path: 'commercial-energy-storage/215kwh',
    kind: 'solution',
    eyebrow: '215.04kWh C&I cabinet configuration',
    title: '215kWh Commercial and Industrial Energy Storage Cabinet',
    seoTitle: '215kWh Commercial ESS Cabinet',
    description:
      'Review a configurable 215.04kWh C&I energy storage cabinet for peak shaving, solar self-consumption, demand management, and backup projects.',
    intro:
      'The 215.04kWh configuration is part of a configurable commercial and industrial energy storage cabinet platform. It may be evaluated for facilities that need a mid-to-large single-cabinet energy class for peak shaving, tariff optimization, solar self-consumption, renewable integration, or selected backup loads. The final quotation defines PCS power, voltage, cooling, fire protection, monitoring, and all supplied equipment.',
    image: '/images/tness-ci-ess/main-2.webp',
    highlights: [
      { label: 'Nominal configuration', value: 'Approximately 215.04kWh' },
      { label: 'Application class', value: 'Commercial and industrial storage' },
      { label: 'Cooling', value: 'Configuration-dependent air or liquid cooling' },
      { label: 'Supply scope', value: 'Defined by signed project quotation' },
    ],
    sections: [
      {
        title: 'Where a 215kWh cabinet may fit',
        paragraphs: [
          'A 215kWh-class cabinet can be evaluated where load peaks last long enough to require substantial energy but the project does not necessarily need the largest single-cabinet configuration in the product family. Typical objectives include reducing demand peaks, shifting solar energy into later tariff periods, maintaining selected critical loads, or supporting a controlled microgrid.',
          'Suitability cannot be determined from energy capacity alone. PCS power, load shape, event duration, grid voltage, solar generation, reserve requirements, cycling frequency, available space, and local rules must be assessed together.',
        ],
      },
      {
        title: 'How to estimate required usable energy',
        paragraphs: [
          'Begin with the power that must be supplied and the required duration. A simple power-times-time calculation produces an initial delivered-energy target, but the battery must also account for conversion losses, state-of-charge reserve, depth-of-discharge limits, degradation allowance, temperature, auxiliary consumption, and operating strategy.',
          'The 215.04kWh nominal configuration should therefore not be presented as 215.04kWh continuously available at the AC load. Final usable energy is configuration and operating-condition dependent.',
        ],
      },
      {
        title: 'Project information needed for a quotation',
        paragraphs: [
          'Provide enough site and operating data to define the cabinet, PCS, EMS, cooling, protection, shipping, and service boundary.',
        ],
        bullets: [
          'Measured interval load data, target peak reduction, backup load, duration, and operating objective.',
          'Grid voltage and frequency, transformer information, PV size, connection point, and export restrictions.',
          'Site country, ambient range, altitude, footprint, outdoor exposure, corrosion environment, and access route.',
          'Required PCS power, EMS functions, communications, fire protection, certification, freight, installation, and commissioning.',
        ],
      },
      {
        title: '215kWh compared with 261kWh',
        paragraphs: [
          'A 261kWh configuration offers more nominal energy in the product family and may support longer events, a larger reserve, or fewer cabinets for a given project target. A 215kWh configuration may be preferable where the load profile, footprint, cost, transport, or staged-expansion plan does not justify the larger energy class. The comparison should be based on usable lifecycle energy and project economics, not nominal kWh alone.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: '215.04kWh C&I ESS Configuration',
        description: 'Configured commercial cabinet platform with project-defined PCS, EMS, cooling, protection, and monitoring scope.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage BMS Control Hardware',
        description: 'Alternative for integrators engineering a separate high-voltage battery rack and system architecture.',
      },
    ],
    faqs: [
      {
        question: 'What PCS power is included with the 215kWh cabinet?',
        answer: 'The exact PCS power and model are configuration dependent and must be stated in the final quotation. The product family covers an overall AC power range of approximately 30kW to 125kW.',
      },
      {
        question: 'Is 215.04kWh the usable AC energy?',
        answer: 'No. It is a nominal configuration value. Usable AC energy depends on state-of-charge limits, conversion efficiency, reserve, temperature, auxiliary loads, degradation, and the operating strategy.',
      },
      {
        question: 'Are installation, freight, duty, and tax included?',
        answer: 'Only when explicitly included in the signed quotation. These items depend on destination, Incoterm, site scope, local requirements, and the selected service package.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage/261kwh',
        label: '261kWh C&I energy storage cabinet',
        description: 'Compare the larger single-cabinet energy class and site-planning considerations.',
      },
      {
        href: '/solutions/commercial-peak-shaving',
        label: 'Peak-shaving sizing guide',
        description: 'Use interval load data to estimate required PCS power and usable battery energy.',
      },
    ],
  },
  {
    path: 'commercial-energy-storage/261kwh',
    kind: 'solution',
    eyebrow: '261kWh C&I cabinet configuration',
    title: '261kWh Commercial Energy Storage Cabinet Configuration',
    seoTitle: '261kWh Commercial ESS Cabinet',
    description:
      'Explore a configurable 261kWh commercial energy storage cabinet for longer peak-shaving events, solar self-consumption, demand management, and backup projects.',
    intro:
      'The 261kWh configuration is the largest nominal energy option currently listed in the JKESS C&I cabinet family. It may be evaluated when a project needs more single-cabinet energy, longer dispatch duration, a larger backup reserve, or fewer parallel cabinets than a smaller configuration would require. The signed quotation remains the controlling document for all equipment, services, and performance boundaries.',
    image: '/images/tness-ci-ess/main-3.webp',
    highlights: [
      { label: 'Nominal configuration', value: 'Approximately 261kWh' },
      { label: 'Cabinet family power', value: '30kW to 125kW, configuration dependent' },
      { label: 'Outdoor design', value: 'IP55 cabinet platform' },
      { label: 'Monitoring options', value: 'WiFi, 4G, LAN, CAN, RS485, Ethernet' },
    ],
    sections: [
      {
        title: 'Applications for the larger cabinet energy class',
        paragraphs: [
          'A 261kWh-class cabinet can be evaluated for longer commercial load peaks, larger solar-energy shifts, industrial facilities, hotels, commercial centres, hospitals, campuses, and other projects that require substantial energy within one configured cabinet platform.',
          'A larger nominal capacity is not automatically the most economical choice. The design should compare event duration, PCS power, daily cycling, tariff value, backup reserve, installation cost, transport, floor space, maintenance access, and future expansion.',
        ],
      },
      {
        title: 'Site and logistics planning',
        paragraphs: [
          'The C&I product family includes large outdoor cabinets whose dimensions and weight vary by configuration. Confirm foundation design, floor loading, lifting points, crane or forklift access, transport route, door and gate clearances, cabinet spacing, cable trenches, ventilation clearances, fire separation, drainage, and service access before finalizing the order.',
          'Civil works, foundations, crane work, transformers, switchgear, site cabling, installation, commissioning, freight, duty, and tax are excluded unless specifically listed in the quotation.',
        ],
      },
      {
        title: 'Thermal management and duty cycle',
        paragraphs: [
          'The platform offers air-cooled and liquid-cooled configurations. Selection depends on power density, operating schedule, ambient temperature, solar exposure, altitude, footprint, acoustic requirements, maintenance capability, and target temperature uniformity.',
          'A high-energy cabinet with sustained high power or frequent cycles may have different thermal requirements from a cabinet used mainly for occasional backup. Provide the expected charge and discharge profile rather than only the nominal capacity.',
        ],
      },
      {
        title: 'Information required for configuration',
        paragraphs: [
          'A complete request should define the technical objective and commercial supply boundary.',
        ],
        bullets: [
          'Target usable energy, AC power, backup duration, peak-shaving target, cycles per day, and reserve state of charge.',
          'Grid and transformer details, PV input, PCS requirements, EMS functions, export limits, and monitoring interfaces.',
          'Ambient conditions, altitude, corrosion environment, outdoor location, footprint, access, foundation, and fire requirements.',
          'Destination, certification, warranty, shipping, installation, commissioning, training, spare parts, and documentation requirements.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: '261kWh C&I ESS Configuration',
        description: 'Largest nominal-energy configuration listed in the current JKESS commercial cabinet family.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage BMS Hardware',
        description: 'BCU and BMU hardware for integrators who need to engineer a custom high-voltage rack rather than a quoted cabinet.',
      },
    ],
    faqs: [
      {
        question: 'Does a 261kWh cabinet always provide longer backup than a 215kWh cabinet?',
        answer: 'It provides more nominal energy, but actual backup duration also depends on load power, PCS efficiency, usable state-of-charge range, reserve, temperature, auxiliary loads, degradation, and system settings.',
      },
      {
        question: 'Is liquid cooling standard on every 261kWh configuration?',
        answer: 'Cooling is configuration dependent. The final quotation must identify whether the selected cabinet uses air cooling or liquid cooling and list the supplied thermal-management equipment.',
      },
      {
        question: 'Can several 261kWh cabinets be combined?',
        answer: 'Multi-cabinet projects can be engineered, subject to PCS topology, EMS coordination, switchgear, transformer capacity, grid connection, communication, protection, site layout, and local requirements.',
      },
    ],
    related: [
      {
        href: '/commercial-energy-storage/215kwh',
        label: '215kWh C&I energy storage cabinet',
        description: 'Compare the smaller nominal-energy option and determine whether the larger cabinet is justified.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Air-cooled vs liquid-cooled ESS',
        description: 'Review thermal-management selection for high-energy commercial cabinet projects.',
      },
    ],
  },
]

export function getSpecificationLandingPage(path: string) {
  return specificationLandingPages.find((page) => page.path === path)
}
