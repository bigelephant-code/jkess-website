export interface DownloadFile {
  name: string
  url: string
  description?: string
  updated?: string
}

export interface DownloadCategory {
  label: string
  description: string
  audience: string
  hidden?: boolean
  files: DownloadFile[]
}

const allDownloadCategories: DownloadCategory[] = [
  {
    label: 'BMS Protection Board',
    description: 'Legacy protection board documents kept in the repository for historical reference.',
    audience: 'Legacy BMS support',
    hidden: true,
    files: [
      { name: 'JK-B15A24S Active Balancer Protection Board Manual V11.6.1', url: '/downloads/BMS-Protection-Board/JK-B15A24S-Active-Balancer-Protection-Board-Manual-V11.6.1.pdf' },
      { name: 'JK-B2A16S-TH Active Balancer Manual V11.5.1', url: '/downloads/BMS-Protection-Board/JK-B2A16S-TH-Active-Balancer-Manual-V11.5.1.pdf' },
      { name: 'JK-B2A24S Active Balancer Manual V11.5.1', url: '/downloads/BMS-Protection-Board/JK-B2A24S-Active-Balancer-Manual-V11.5.1.pdf' },
      { name: 'JK-B2A25S-RP Active Balancer Relay Protection Board Manual V1.4', url: '/downloads/BMS-Protection-Board/JK-B2A25S-RP-Active-Balancer-Relay-Protection-Board-Manual-V1.4.pdf' },
      { name: 'JK-B2A8S Active Balancer Manual V11.6.2', url: '/downloads/BMS-Protection-Board/JK-B2A8S-Active-Balancer-Manual-V11.6.2.pdf' },
      { name: 'JK-B4A24S Active Balancer Manual V11.1.1', url: '/downloads/BMS-Protection-Board/JK-B4A24S-Active-Balancer-Manual-V11.1.1.pdf' },
      { name: 'JK-B5A24S Active Balancer Protection Board Manual V11.0.1', url: '/downloads/BMS-Protection-Board/JK-B5A24S-Active-Balancer-Protection-Board-Manual-V11.0.1.pdf' },
      { name: 'JK-B5A25S-60P Manual V8.0', url: '/downloads/BMS-Protection-Board/JK-B5A25S-60P-Manual-V8.0.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V15.1.2', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V15.1.2.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V15.1.3 (Mounting Ears)', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V15.1.3-wiht-Mounting-Ears.pdf' },
      { name: 'JK-BD4AxxS-6PRG Active Balancer Protection Board Manual V17.1.1', url: '/downloads/BMS-Protection-Board/JK-BD4AxxS-6PRG-Active-Balancer-Protection-Board-Manual-V17.1.1.pdf' },
      { name: 'JK-WB2A8S-10P-15P-20P-30P Active Balancer Protection Board Manual V1.0', url: '/downloads/BMS-Protection-Board/JK-WB2A8S-10P-15P-20P-30P-Active-Balancer-Protection-Board-Manual-V1.0.pdf' },
      { name: 'JK-WB2A8S-30P Active Balancer Protection Board Manual V15.0.1', url: '/downloads/BMS-Protection-Board/JK-WB2A8S-30P-Active-Balancer-Protection-Board-Manual-V15.0.1.pdf' },
      { name: 'JK-WBD6AxxS-15P Active Balancer External Protection Board Specification', url: '/downloads/BMS-Protection-Board/JK-WBD6AxxS-15P-Active-Balancer-External-Protection-Board-Specification.pdf' },
      { name: 'NY-B2A16S-TH Active Balancer Manual V16.0.2', url: '/downloads/BMS-Protection-Board/NY-B2A16S-TH-Active-Balancer-Manual-V16.0.2.pdf' },
      { name: 'Active Balancer Manual JK-B2A4S V2.1 (Independent Power)', url: '/downloads/BMS-Protection-Board/Active-Balancer-Manual-JK-B2A4S-V2.1-Independent-Power.pdf' },
      { name: 'Protection Board Parameter Settings Manual V2.0', url: '/downloads/BMS-Protection-Board/Protection-Board-Parameter-Settings-Manual-V2.0.pdf' },
      { name: 'Protection Board Parameter Settings Manual V2.2', url: '/downloads/BMS-Protection-Board/Protection-Board-Parameter-Settings-Manual-V2.2.pdf' },
    ],
  },
  {
    label: 'Balancing Capacitors',
    description: 'Active balancing and capacitor manuals for battery maintenance and balancing projects.',
    audience: 'Balancing hardware selection',
    files: [
      { name: 'EK-24S10EB Balancing Capacitor Manual V1.2.1', url: '/downloads/Balancing-Capacitors/EK-24S10EB-Balancing-Capacitor-Manual-V1.2.1.pdf' },
      { name: 'EK-24S15EB Balancing Capacitor Manual V1.61', url: '/downloads/Balancing-Capacitors/EK-24S15EB-Balancing-Capacitor-Manual-V1.61.pdf' },
      { name: 'EK-24S4EB Balancing Capacitor Manual V1.0', url: '/downloads/Balancing-Capacitors/EK-24S4EB-Balancing-Capacitor-Manual-V1.0.pdf' },
      { name: 'EK-24S8EB Balancing Capacitor Manual V1.2.1', url: '/downloads/Balancing-Capacitors/EK-24S8EB-Balancing-Capacitor-Manual-V1.2.1.pdf' },
      { name: 'NEEY Smart Active Balancer Specification', url: '/downloads/Balancing-Capacitors/NEEY-Smart-Active-Balancer-Specification.pdf' },
      { name: 'Capacitor Manual', url: '/downloads/Balancing-Capacitors/Capacitor-Manual.pdf' },
    ],
  },
  {
    label: 'Kits',
    description: 'JKESS battery box manuals, 6U rack battery kit specifications, and enclosure documents for low-voltage LiFePO4 assembly projects.',
    audience: 'Battery enclosure buyers',
    files: [
      { name: '6U Lithium Battery Kit Specification 3.2', url: '/downloads/Kits/6U-Lithium-Battery-Kit-Specification-3.2.pdf', description: 'JKESS 6U rack battery box specification for 51.2V LiFePO4 ESS rack mount battery module assembly.' },
      { name: 'Roller Lithium Battery Sheet Metal Kit Manual', url: '/downloads/Kits/Roller-Lithium-Battery-Sheet-Metal-Kit-Manual.pdf', description: 'JKESS battery box manual for the caster battery enclosure kit used in movable residential and small commercial storage assembly.' },
    ],
  },
  {
    label: 'Accessory Manuals',
    description: 'Display, communication, alarm, and accessory manuals for system integration support.',
    audience: 'Installers and integrators',
    files: [
      { name: '3.2-Inch Display Manual V1.0', url: '/downloads/Accessory-Manuals/3.2-Inch-Display-Manual-V1.0.pdf' },
      { name: '4.3-Inch Display DW Manual V1.1', url: '/downloads/Accessory-Manuals/4.3-Inch-Display-DW-Manual-V1.1.pdf' },
      { name: '4.3-Inch Display ZX Manual V2.0 (2024.04.09)', url: '/downloads/Accessory-Manuals/4.3-Inch-Display-ZX-Manual-V2.0-20240409.pdf' },
      { name: 'JK-BLMK-5A V3.0 Battery Parallel Module Manual', url: '/downloads/Accessory-Manuals/JK-BLMK-5A-V3.0-Battery-Parallel-Module-Manual.pdf' },
      { name: 'JK-QB2A8S-20P Active Balancer Protection Board Manual V17.0.2', url: '/downloads/Accessory-Manuals/JK-QB2A8S-20P-Active-Balancer-Protection-Board-Manual-V17.0.2.pdf' },
      { name: 'LCD-2.0-LY Display Manual V1.1', url: '/downloads/Accessory-Manuals/LCD-2.0-LY-Display-Manual-V1.1.pdf' },
      { name: 'MK-30V-P2.5FDS Product Specification', url: '/downloads/Accessory-Manuals/MK-30V-P2.5FDS-Product-Specification.pdf' },
      { name: 'P-Link-CR Communication Interface Board Manual V1.0', url: '/downloads/Accessory-Manuals/P-Link-CR-Communication-Interface-Board-Manual-V1.0.pdf' },
      { name: 'USB-TTL Isolation Module Manual', url: '/downloads/Accessory-Manuals/USB-TTL-Isolation-Module-Manual.pdf' },
      { name: 'Smart Positioning Terminal ZX03 Zhixun Specification', url: '/downloads/Accessory-Manuals/Smart-Positioning-Terminal-ZX03-Zhixun-Specification.pdf' },
      { name: 'Voice Alarm Manual V1.0', url: '/downloads/Accessory-Manuals/Voice-Alarm-Manual-V1.0.pdf' },
    ],
  },
  {
    label: 'High Voltage',
    description: 'High-voltage BCU, BMU module, EMS, and ESS BMS controller specifications for engineered battery racks.',
    audience: 'C&I ESS engineers',
    files: [
      { name: 'BCU-B3 Energy Storage Controller Specification', url: '/downloads/High-Voltage/BCU-B3-Energy-Storage-Controller-Specification.docx', description: 'Master BCU controller specification for high-voltage ESS BMS architecture.' },
      { name: 'EMS-E2 Energy Management Unit Specification', url: '/downloads/High-Voltage/EMS-E2-Energy-Management-Unit-Specification.pdf', description: 'Peak shaving EMS and energy management unit document for C&I ESS monitoring and control integration.' },
      { name: 'HV-B6U Slave Control Box Specification V1.0 (2026.06.01)', url: '/downloads/High-Voltage/HV-B6U-Slave-Control-Box-Specification-V1.0-20260601.docx', updated: '2026-06-01', description: 'BMU slave control box specification for high-voltage battery rack sampling, monitoring, and ESS BMS architecture.' },
      { name: 'HV-BC250 Specification (2026.05.20)', url: '/downloads/High-Voltage/HV-BC250-Specification-20260520.pdf', updated: '2026-05-20', description: 'High-voltage BMS controller specification for 250A-class commercial ESS control applications.' },
    ],
  },
]

export const downloadCategories = allDownloadCategories.filter((category) => !category.hidden)

export const downloadFiles = downloadCategories.flatMap((category) =>
  category.files.map((file) => ({
    ...file,
    category: category.label,
  }))
)

export function getDownloadFileType(url: string) {
  return url.split('.').pop()?.toUpperCase() || 'FILE'
}

export function getDownloadFileVersion(name: string) {
  const version = name.match(/\bV\d+(?:\.\d+){0,3}\b/i)?.[0]
  if (version) return version.toUpperCase()
  const dottedDate = name.match(/\b20\d{2}\.\d{2}\.\d{2}\b/)?.[0]
  if (dottedDate) return dottedDate
  return 'Current'
}
