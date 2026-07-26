export type TechnicalGuideSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type TechnicalGuideFaq = {
  question: string
  answer: string
}

export type TechnicalGuide = {
  slug: string
  eyebrow: string
  title: string
  /**
   * Short title used for the SERP/meta title only. The on-page H1 keeps the
   * longer descriptive `title`. Google truncates around 60 characters, and the
   * full title plus the brand suffix runs well past that on every guide.
   */
  seoTitle: string
  description: string
  image: string
  summary: string
  datePublished: string
  dateModified: string
  sections: TechnicalGuideSection[]
  takeaways: string[]
  /** Answers the question-form queries these guides already rank for. */
  faqs: TechnicalGuideFaq[]
  relatedProducts: string[]
  relatedLinks: Array<{ href: string; label: string }>
}

export const technicalGuides: TechnicalGuide[] = [
  {
    slug: 'bcu-vs-bmu',
    eyebrow: 'High-voltage BMS architecture',
    title: 'BCU vs BMU: Roles in a High-Voltage Battery Management System',
    seoTitle: 'BCU vs BMU: What a BMU Is in a Battery System',
    description:
      'What a BMU (battery monitoring unit) does, how it differs from a BCU master controller, and how the two work together for measurement, balancing, contactor control, and communication.',
    image: '/images/hv-kit/1.jpg',
    datePublished: '2026-06-29',
    dateModified: '2026-07-27',
    summary:
      'A high-voltage BMS normally divides control between a rack-level master and module-level slave boards. The BCU coordinates the battery rack, while BMUs collect individual cell data and perform module-level functions. The exact quantities and interfaces depend on the pack topology.',
    sections: [
      {
        title: 'What a BCU does',
        paragraphs: [
          'The battery control unit is the rack-level master. It receives cell and temperature information from BMUs, evaluates rack operating state, coordinates contactors and pre-charge logic, and communicates with the PCS, EMS, or supervisory controller.',
          'Depending on the architecture, the BCU can also process total voltage, current, insulation status, interlock state, alarms, state-of-charge estimates, and charge or discharge power limits.',
        ],
      },
      {
        title: 'What a BMU does',
        paragraphs: [
          'A battery monitoring unit is installed at module or cell-group level. It measures individual cell voltages and temperature channels, reports them to the master, and supports balancing when the selected hardware provides that function.',
          'One BMU does not automatically cover an entire rack. Required BMU quantity follows the number of series cells, module arrangement, channel count, and isolation and communication architecture.',
        ],
      },
      {
        title: 'Why the distinction matters during purchasing',
        paragraphs: [
          'A product option labelled “master” or “slave” is one control box, not a complete high-voltage battery system. A functioning rack normally needs the correct combination of BCU, BMUs, sensors, contactors, protection devices, harnesses, PCS or inverter interfaces, and commissioned firmware.',
        ],
        bullets: [
          'Provide the total cell count, module count, rack voltage, continuous current, and peak current.',
          'Provide the PCS and EMS model together with CAN or RS485 protocol documents.',
          'Define contactor, pre-charge, insulation-monitoring, emergency-stop, and interlock requirements.',
          'Confirm whether active balancing, remote monitoring, data logging, and OTA support are required.',
        ],
      },
      {
        title: 'Typical communication path',
        paragraphs: [
          'BMUs usually communicate upstream to the BCU through an isolated daisy-chain or field bus. The BCU then exchanges operating limits, measurements, status, and alarms with the PCS or EMS. Physical connectors alone do not prove interoperability; signal definitions, message identifiers, timing, scaling, state logic, firmware, and wiring must all match.',
        ],
      },
    ],
    takeaways: [
      'BCU means rack-level master control; BMU means module-level cell monitoring.',
      'The number of BMUs depends on cell and module topology, not simply rack power.',
      'A master or slave control box is not a complete battery pack.',
      'PCS and EMS compatibility must be verified from protocol documents and commissioning requirements.',
    ],
    faqs: [
      {
        question: 'What does BMU stand for?',
        answer:
          'BMU stands for battery monitoring unit. It is the module-level board in a battery management system that measures individual cell voltages and temperatures and reports them to the rack-level master controller.',
      },
      {
        question: 'What is a BMU in a battery system?',
        answer:
          'A BMU is installed at module or cell-group level. It collects cell voltage and temperature data, forwards the measurements upstream to the BCU, and supports cell balancing when the selected hardware provides that function. It does not control the rack on its own.',
      },
      {
        question: 'What is the difference between a BCU and a BMU?',
        answer:
          'The BCU is the rack-level master: it evaluates rack state, coordinates contactors and pre-charge logic, and communicates with the PCS or EMS. The BMU is the module-level slave that measures cells and reports to the BCU. One rack normally has one BCU and several BMUs.',
      },
      {
        question: 'How many BMUs does a battery rack need?',
        answer:
          'The quantity follows the number of series cells, the module arrangement, the voltage and temperature channel count of the selected BMU, and the isolation and communication architecture. It is not derived from rack power alone, so the cell and module topology must be confirmed before selection.',
      },
      {
        question: 'Is a BMU the same as a BMS?',
        answer:
          'No. BMS describes the complete battery management system. A BMU is one component inside it. A functioning high-voltage system normally needs the correct combination of BCU, BMUs, sensors, contactors, protection devices, harnesses, and commissioned firmware.',
      },
    ],
    relatedProducts: ['high-voltage-kit', 'tness-ci-ess-cabinet'],
    relatedLinks: [
      { href: '/high-voltage-bms', label: 'High-voltage BMS selection guide' },
      { href: '/high-voltage-bms/100a', label: '100A high-voltage BMS option' },
      { href: '/high-voltage-bms/200a', label: '200A high-voltage BMS option' },
    ],
  },
  {
    slug: 'can-vs-rs485-battery-communication',
    eyebrow: 'Battery communication guide',
    title: 'CAN vs RS485 for Battery, Inverter, PCS, and EMS Communication',
    seoTitle: 'CAN vs RS485: Which to Use for Battery Communication',
    description:
      'The practical difference between CAN and RS485 for battery communication: topology, protocol compatibility, wiring, termination, addressing, baud rate, and commissioning checks.',
    image: '/images/hv-kit/3.jpg',
    datePublished: '2026-06-29',
    dateModified: '2026-07-27',
    summary:
      'CAN and RS485 describe physical and data-link communication methods, but neither name defines the application protocol. Two devices can both have CAN or RS485 ports and still be incompatible if message formats, addresses, timing, scaling, or state logic differ.',
    sections: [
      {
        title: 'CAN in battery systems',
        paragraphs: [
          'CAN is widely used for deterministic communication between a BMS and inverter, PCS, vehicle controller, or EMS gateway. It supports multi-node networks, message identifiers, error detection, arbitration, and robust operation in electrically noisy environments.',
          'Compatibility requires more than matching CAN connectors. Both devices must use the same baud rate, identifier format, message definitions, update intervals, scaling, byte order, and operating-state sequence.',
        ],
      },
      {
        title: 'RS485 in battery systems',
        paragraphs: [
          'RS485 is a differential physical layer often paired with Modbus RTU or a manufacturer-specific protocol. It is commonly used for monitoring, configuration, daisy-chained equipment, meters, and EMS integration.',
          'The installer must confirm node addresses, master and slave roles, baud rate, parity, stop bits, register map, cable topology, termination, and grounding strategy.',
        ],
      },
      {
        title: 'Which one should a project use?',
        paragraphs: [
          'Use the interface and protocol officially supported by both devices. A project should not choose CAN or RS485 only from theoretical speed or cable length. The available protocol, required control functions, network topology, commissioning tools, service capability, and existing system architecture are usually more important.',
        ],
        bullets: [
          'Obtain the exact inverter, PCS, EMS, and BMS model numbers.',
          'Request protocol documents or a verified compatibility statement for the firmware versions involved.',
          'Confirm cable pinout, shield connection, termination resistance, and maximum network length.',
          'Test charge and discharge limits, alarms, contactor state, state of charge, and fault recovery during commissioning.',
        ],
      },
      {
        title: 'Common causes of communication failure',
        paragraphs: [
          'Frequent causes include swapped differential wires, missing termination, duplicated addresses, wrong baud rate, incorrect pinout, unsupported firmware, incompatible message maps, and equipment that expects a different master-slave relationship.',
        ],
      },
    ],
    takeaways: [
      'CAN or RS485 support alone does not confirm device compatibility.',
      'Protocol documents, firmware, cable pinout, and commissioning tests are required.',
      'CAN is often used for real-time BMS-to-inverter control; RS485 is common for monitoring and Modbus-style networks.',
      'Use the interface officially supported by the complete system rather than selecting from a generic comparison.',
    ],
    faqs: [
      {
        question: 'What is the difference between CAN and RS485?',
        answer:
          'RS485 defines a differential physical layer, usually paired with Modbus RTU or a manufacturer protocol. CAN defines both a physical and data-link layer with message identifiers, arbitration, and error detection. Neither name specifies the application protocol, so two devices can share an interface and still be incompatible.',
      },
      {
        question: 'Should a battery use CAN or RS485 to talk to an inverter?',
        answer:
          'Use the interface and protocol officially supported by both devices for the firmware versions involved. CAN is common for real-time BMS-to-inverter control; RS485 is common for monitoring, meters, and Modbus-style networks. Theoretical speed or cable length should not drive the decision.',
      },
      {
        question: 'Can a CAN device communicate with an RS485 device?',
        answer:
          'Not directly. They are different electrical layers and require a gateway or a device with both interfaces. Even then, the application protocol, register or message map, scaling, and state logic must be translated correctly.',
      },
      {
        question: 'Why is my BMS not communicating with the inverter?',
        answer:
          'Frequent causes are swapped differential wires, missing termination resistance, duplicated node addresses, wrong baud rate, incorrect cable pinout, unsupported firmware, incompatible message maps, and equipment that expects a different master-slave relationship.',
      },
    ],
    relatedProducts: ['battery-kit', '6u-battery-kit', 'high-voltage-kit'],
    relatedLinks: [
      { href: '/guides/how-to-match-bms-with-inverter', label: 'How to match a BMS with an inverter' },
      { href: '/high-voltage-bms', label: 'High-voltage BMS hardware' },
      { href: '/battery-enclosures', label: 'Low-voltage battery enclosure selection' },
    ],
  },
  {
    slug: '280ah-vs-314ah-lifepo4-cells',
    eyebrow: 'LiFePO4 cell selection',
    title: '280Ah vs 314Ah LiFePO4 Cells for Battery Enclosure Projects',
    seoTitle: '280Ah vs 314Ah LiFePO4 Cells: How to Choose',
    description:
      'How 280Ah and 314Ah LiFePO4 cells differ in nominal energy, dimensions, terminals, current, compression, thermal design, and lifecycle requirements for enclosure projects.',
    image: '/images/battery-kit-system.webp',
    datePublished: '2026-06-29',
    dateModified: '2026-07-27',
    summary:
      'A higher amp-hour rating can increase nominal energy, but capacity alone does not confirm that a cell fits an enclosure or suits a battery design. Mechanical dimensions, terminal layout, current limits, compression, thermal behaviour, quality documentation, and the completed BMS and inverter design must also be checked.',
    sections: [
      {
        title: 'Nominal energy difference',
        paragraphs: [
          'For the same series count and nominal cell voltage, a 314Ah cell provides more nominal energy than a 280Ah cell. The completed battery’s usable AC energy will still be lower than the nominal calculation because of operating limits, reserve state of charge, conversion losses, temperature, auxiliary loads, and ageing allowance.',
        ],
      },
      {
        title: 'Mechanical compatibility comes first',
        paragraphs: [
          'Cells with similar capacity labels can differ in width, depth, height, terminal spacing, terminal type, vent location, case construction, and recommended compression. An enclosure should be confirmed from an official dimensional drawing and the exact cell model rather than a generic “280Ah” or “314Ah” description.',
        ],
        bullets: [
          'Compare cell width, height, depth, terminal position, and insulation clearances.',
          'Confirm busbar geometry, torque requirements, compression method, and expansion allowance.',
          'Check total assembled weight, floor loading, rack load, and handling method.',
          'Confirm temperature-sensor placement, airflow, and service access.',
        ],
      },
      {
        title: 'Electrical and lifecycle review',
        paragraphs: [
          'The cell datasheet should be reviewed for continuous and peak charge and discharge current, voltage limits, temperature limits, recommended state-of-charge window, cycle-life test conditions, and storage requirements. A higher capacity value does not automatically mean higher power capability or longer life under every duty cycle.',
        ],
      },
      {
        title: 'Information to send before ordering an enclosure',
        paragraphs: [
          'Provide the cell manufacturer and model, official datasheet, dimensional drawing, quantity, series and parallel configuration, BMS model, inverter model, current target, and intended operating environment. JKESS can then confirm whether the enclosure and selected hardware match the project inputs.',
        ],
      },
    ],
    takeaways: [
      '314Ah generally provides more nominal energy than 280Ah at the same voltage and series count.',
      'Capacity does not confirm physical fit or terminal compatibility.',
      'Use the exact cell datasheet and dimensional drawing before ordering an enclosure.',
      'Usable system energy depends on the complete battery, inverter, operating limits, and ageing assumptions.',
    ],
    faqs: [
      {
        question: 'Is a 314Ah cell better than a 280Ah cell?',
        answer:
          'Not automatically. At the same nominal voltage and series count a 314Ah cell provides more nominal energy, but a higher capacity rating does not by itself mean higher power capability, longer life, or a physical fit in an existing enclosure.',
      },
      {
        question: 'Will 314Ah cells fit an enclosure designed for 280Ah cells?',
        answer:
          'Only if the dimensional drawing confirms it. Cells with similar capacity labels can differ in width, depth, height, terminal spacing, terminal type, vent location, and recommended compression. Confirm fit from the exact cell model rather than the capacity label.',
      },
      {
        question: 'How much usable energy does a 314Ah battery actually deliver?',
        answer:
          'Less than the nominal calculation. Usable AC energy is reduced by operating voltage limits, reserve state of charge, conversion losses, temperature, auxiliary loads, and an ageing allowance over the design life.',
      },
    ],
    relatedProducts: ['battery-kit', '6u-battery-kit'],
    relatedLinks: [
      { href: '/battery-enclosures/15kwh-lifepo4', label: '15kWh LiFePO4 enclosure' },
      { href: '/battery-enclosures/16kwh-lifepo4', label: '16kWh LiFePO4 enclosure' },
      { href: '/rack-battery-enclosures', label: '6U rack battery enclosures' },
    ],
  },
  {
    slug: 'how-to-match-bms-with-inverter',
    eyebrow: 'Compatibility checklist',
    title: 'How to Match a Battery BMS With an Inverter or PCS',
    seoTitle: 'How to Match a BMS With an Inverter: Checklist',
    description:
      'A step-by-step checklist for matching a battery BMS to an inverter or PCS: voltage window, current limits, protocol, firmware, contactor logic, protection limits, and commissioning tests.',
    image: '/images/battery-kit-display.webp',
    datePublished: '2026-06-29',
    dateModified: '2026-07-27',
    summary:
      'A BMS and inverter must be compatible electrically and through communication. Matching only the nominal battery voltage or connector type is not enough. The completed system must agree on voltage limits, current limits, protocol, wiring, operating states, alarms, and fault recovery.',
    sections: [
      {
        title: 'Check the electrical operating window',
        paragraphs: [
          'Confirm the inverter or PCS minimum and maximum DC voltage against the battery’s cell count, charge limit, discharge limit, and expected voltage under load. Also compare continuous and peak charge and discharge current with the cells, BMS, contactors, cables, breakers, busbars, and thermal design.',
        ],
      },
      {
        title: 'Check the communication protocol',
        paragraphs: [
          'Confirm whether the equipment uses CAN, RS485, Modbus, or another protocol and obtain the exact protocol version. Match baud rate, identifier or register map, scaling, byte order, update rate, cable pinout, termination, addresses, and master-slave roles.',
        ],
      },
      {
        title: 'Check operating-state logic',
        paragraphs: [
          'The inverter and BMS must agree on charge enable, discharge enable, contactor state, pre-charge sequence, current limits, state of charge, alarms, warnings, shutdown conditions, and restart behaviour. A system can exchange data yet still operate incorrectly if state logic differs.',
        ],
        bullets: [
          'Confirm normal startup and shutdown sequence.',
          'Test low- and high-voltage warnings and protective shutdowns.',
          'Test temperature, current, insulation, and communication-loss responses where applicable.',
          'Verify how the system recovers after a fault and whether manual acknowledgement is required.',
        ],
      },
      {
        title: 'Commission before full-power operation',
        paragraphs: [
          'Begin with controlled settings and verify measurements on both devices. Confirm voltage, current direction, state of charge, charge and discharge limits, alarms, and contactor behaviour before increasing power. Record firmware versions, settings, cable pinout, and protocol files for future service.',
        ],
      },
    ],
    takeaways: [
      'Match DC voltage range and current limits before checking communication.',
      'A shared CAN or RS485 connector does not prove protocol compatibility.',
      'Firmware, message maps, wiring, and state logic must match.',
      'Complete controlled commissioning before full-power operation.',
    ],
    faqs: [
      {
        question: 'How do I know if a BMS is compatible with my inverter?',
        answer:
          'Compare the inverter or PCS DC voltage window against the battery cell count and charge and discharge limits, compare continuous and peak current against the full current path, then confirm the communication protocol from official protocol documents for the exact firmware versions.',
      },
      {
        question: 'Does a matching CAN port mean the BMS and inverter will work together?',
        answer:
          'No. A shared connector does not prove compatibility. Baud rate, identifier or register map, scaling, byte order, update rate, addresses, master-slave roles, and operating-state logic must all agree before the system will run correctly.',
      },
      {
        question: 'What should be tested during commissioning?',
        answer:
          'Start with controlled settings and verify voltage, current direction, state of charge, and charge and discharge limits on both devices. Test low- and high-voltage warnings, protective shutdowns, communication-loss response, and fault recovery before increasing power.',
      },
    ],
    relatedProducts: ['battery-kit', '6u-battery-kit', 'high-voltage-kit'],
    relatedLinks: [
      { href: '/guides/can-vs-rs485-battery-communication', label: 'CAN vs RS485 communication' },
      { href: '/guides/bcu-vs-bmu', label: 'BCU vs BMU architecture' },
      { href: '/shipping-quote', label: 'Request compatibility review' },
    ],
  },
]

export function getTechnicalGuide(slug: string) {
  return technicalGuides.find((guide) => guide.slug === slug)
}
