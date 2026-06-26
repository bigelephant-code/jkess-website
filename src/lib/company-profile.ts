export const companyProfile = {
  teamStartYear: 2017,
  companyFoundedYear: 2023,
  brandLaunchYear: 2024,
  factoryBuildingAreaSqm: 70000,
  factoryLandAreaMu: 120,
  employees: '700+',
  rdEmployees: '100+',
  exportMarkets: '200+',
  annualCapacityGWh: 2.1,
  salesEmail: 'zhou@jkess.com',
  companyName: 'JKBMS Electronic Technology Co.,Ltd',
  brandName: 'JKESS',
  aboutParagraphs: [
    'The team behind JKESS began working in the new energy and energy storage sector in 2017. JKBMS Electronic Technology Co.,Ltd was formally established in 2023, followed by the launch of the JKESS energy storage brand in 2024.',
    'Today, the company operates a 70,000-square-meter manufacturing facility on a 120-mu site, supported by more than 700 full-time employees, including over 100 R&D professionals. Current annual production capacity reaches 2.1 GWh.',
    'JKESS products and solutions are supplied to customers across more than 200 countries and regions. The company provides BMS control hardware, battery enclosure kits, high-voltage battery management systems, and configured commercial and industrial energy storage cabinet solutions.',
  ],
} as const

export const companyStats = {
  established: String(companyProfile.teamStartYear),
  manufacturingBase: String(companyProfile.factoryBuildingAreaSqm),
  marketsReached: companyProfile.exportMarkets,
  employees: companyProfile.employees,
} as const

export const companyFacts = [
  { label: 'Team Established', value: String(companyProfile.teamStartYear) },
  { label: 'JKBMS Founded', value: String(companyProfile.companyFoundedYear) },
  { label: 'JKESS Brand Launched', value: String(companyProfile.brandLaunchYear) },
  { label: 'Factory Building Area', value: '70,000 m²' },
  { label: 'Factory Site Area', value: '120 mu' },
  { label: 'Full-time Employees', value: companyProfile.employees },
  { label: 'R&D Professionals', value: companyProfile.rdEmployees },
  { label: 'Current Annual Capacity', value: '2.1 GWh' },
  { label: 'Countries & Regions Served', value: companyProfile.exportMarkets },
] as const

export const companyMilestones = [
  {
    year: '2017',
    period: '2017-2022',
    title: 'TEAM FOUNDATION',
    content: [
      'The founding team entered the new energy sector and began developing battery management and energy storage products.',
      'Early product development and customer projects established the technical foundation for the future JKBMS and JKESS businesses.',
    ],
  },
  {
    year: '2023',
    period: '2023',
    title: 'JKBMS ESTABLISHED',
    content: [
      'JKBMS Electronic Technology Co.,Ltd was formally established to expand battery management technology, engineering, manufacturing, and international sales capabilities.',
      'The organization strengthened its R&D, supply chain, testing, and production teams for energy storage applications.',
    ],
  },
  {
    year: '2024',
    period: '2024-2025',
    title: 'JKESS BRAND LAUNCHED',
    content: [
      'The JKESS brand was launched for battery kits, high-voltage BMS control systems, and commercial and industrial energy storage solutions.',
      'International distribution and project support expanded across residential, commercial, industrial, and renewable energy applications.',
    ],
  },
  {
    year: '2026',
    period: 'Current Scale',
    title: 'GLOBAL EXPANSION',
    content: [
      'JKESS now operates a 70,000 m² factory on a 120-mu site with 700+ full-time employees, including 100+ R&D professionals.',
      'Current annual production capacity reaches 2.1 GWh, with products and solutions supplied across 200+ countries and regions.',
    ],
  },
] as const
