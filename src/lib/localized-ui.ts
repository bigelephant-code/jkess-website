import { guideCopy } from '@/lib/products'

export type GuideCopy = typeof guideCopy.en
export type GuideCopyKey = keyof GuideCopy

export function getLocalizedGuide(lang: string): GuideCopy {
  return guideCopy[lang as keyof typeof guideCopy] || guideCopy.en
}

export function getLocalizedUiCopy(lang: string) {
  const guide = getLocalizedGuide(lang)

  if (lang === 'en') {
    return {
      explore: 'Explore',
      viewOverview: 'View overview',
      changeLanguage: 'Change language',
      currentLanguage: 'Current language',
      viewCart: 'View cart',
      items: 'items',
      toggleNavigation: 'Toggle navigation menu',
      documents: 'Documents',
      categories: 'Categories',
      manuals: 'Manuals',
      searchManuals: 'Search manuals',
      searchDocuments: 'Search technical documents',
      allDocuments: 'All Documents',
      showAllDocuments: 'Show all technical documents',
      showDocuments: 'Show documents',
      nextStep: 'Next Step',
      browseProducts: 'Browse matching products',
      requestProjectQuote: 'Request project quote',
      noMatchingDocuments: 'No matching documents',
      tryAnotherDocument: 'Try another product name or document type.',
      documentsAvailable: 'documents available',
      document: 'document',
      updated: 'Updated',
      download: 'Download',
      documentHelpPrefix: 'All documents are hosted directly on our servers. Need help finding a document?',
      contactUs: 'Contact us',
      copyEmail: 'Copy request',
      documentHelpSuffix: "and we'll help you out.",
      technicalLibraryFaq: 'Technical Library FAQ',
      technicalLibraryFaqDesc: 'Common questions about JKESS manuals, datasheets, and technical document support.',
      companyProfile: 'Verified Company Profile',
      companyGlance: 'Company at a Glance',
      companyGlanceDesc:
        "The following figures use the company's current unified public information and are applied consistently across the JKESS website.",
      aboutFaq: 'About JKESS FAQ',
      aboutFaqDesc:
        'Key information about JKESS company history, manufacturing scale, offices, logistics, and international project support.',
      liveBrief: 'Live Brief',
      curatedUpdates: 'Curated Updates',
      researchLenses: 'Research Lenses',
      signalHistory: 'Signal History',
      leadStory: 'Lead Story',
      source: 'Source',
      refineFeed: 'Refine Feed',
      searchNews: 'Search energy news',
      topic: 'Topic',
      allTopics: 'All Topics',
      year: 'Year',
      allYears: 'All Years',
      applyInsight: 'Apply the Insight',
      discussProject: 'Discuss a project',
      showing: 'Showing',
      updates: 'updates',
      noMatchingNews: 'No matching news',
      tryAnotherNews: 'Try another topic, year, or keyword.',
      itemsLabel: 'items',
      readSource: 'Read Source',
      readMore: 'Read More',
      technicalGuides: 'Technical Guides',
      euCompliance: 'EU Compliance',
      qualityManufacturing: 'Quality & Manufacturing',
      requestQuote: 'Request a Quote',
      relevantProducts: 'Relevant products',
      viewProductDetails: 'View product details',
      requestSupport: 'Request configuration support',
      viewDownloads: 'View technical downloads',
      beforeQuote: 'Before requesting a quote',
      prepareInputs: 'Prepare the project inputs',
      prepareInputsBody:
        'Include the target voltage, capacity, power, quantity, application, compatible equipment, destination country, site conditions, and required delivery scope.',
      startInquiry: 'Start a technical inquiry',
      continueSpec: 'Continue from the requirement to the product specification',
      faqEyebrow: 'Frequently asked questions',
      faqTitle: 'Selection questions',
      relatedPages: 'Related technical pages',
      destinationCountry: 'Destination country',
      estimatedQuantity: 'Estimated quantity',
      projectTimeline: 'Project timeline',
    }
  }

  return {
    explore: guide.europe,
    viewOverview: guide.europe,
    changeLanguage: guide.europe,
    currentLanguage: guide.europe,
    viewCart: guide.quote,
    items: guide.lifepo4Europe,
    toggleNavigation: guide.europe,
    documents: guide.europe,
    categories: guide.lifepo4Europe,
    manuals: guide.enclosureEu,
    searchManuals: guide.europe,
    searchDocuments: guide.europe,
    allDocuments: guide.europe,
    showAllDocuments: guide.europe,
    showDocuments: guide.europe,
    nextStep: guide.quote,
    browseProducts: guide.lifepo4Europe,
    requestProjectQuote: guide.quote,
    noMatchingDocuments: guide.europe,
    tryAnotherDocument: guide.desc,
    documentsAvailable: guide.europe,
    document: guide.europe,
    updated: guide.quote,
    download: guide.europe,
    documentHelpPrefix: guide.desc,
    contactUs: guide.quote,
    copyEmail: guide.quote,
    documentHelpSuffix: guide.desc,
    technicalLibraryFaq: guide.europe,
    technicalLibraryFaqDesc: guide.desc,
    companyProfile: guide.europe,
    companyGlance: guide.commercialEurope,
    companyGlanceDesc: guide.desc,
    aboutFaq: guide.europe,
    aboutFaqDesc: guide.desc,
    liveBrief: guide.europe,
    curatedUpdates: guide.europe,
    researchLenses: guide.commercialEurope,
    signalHistory: guide.lifepo4Europe,
    leadStory: guide.europe,
    source: guide.europe,
    refineFeed: guide.europe,
    searchNews: guide.europe,
    topic: guide.lifepo4Europe,
    allTopics: guide.europe,
    year: guide.europe,
    allYears: guide.europe,
    applyInsight: guide.quote,
    discussProject: guide.quote,
    showing: guide.europe,
    updates: guide.europe,
    noMatchingNews: guide.europe,
    tryAnotherNews: guide.desc,
    itemsLabel: guide.europe,
    readSource: guide.europe,
    readMore: guide.europe,
    technicalGuides: guide.europe,
    euCompliance: guide.enclosureEu,
    qualityManufacturing: guide.quote,
    requestQuote: guide.quote,
    relevantProducts: guide.lifepo4Europe,
    viewProductDetails: guide.quote,
    requestSupport: guide.quote,
    viewDownloads: guide.europe,
    beforeQuote: guide.quote,
    prepareInputs: guide.enclosureEu,
    prepareInputsBody: guide.desc,
    startInquiry: guide.quote,
    continueSpec: guide.desc,
    faqEyebrow: guide.europe,
    faqTitle: guide.quote,
    relatedPages: guide.europe,
    destinationCountry: guide.enclosureEu,
    estimatedQuantity: guide.quote,
    projectTimeline: guide.quote,
  }
}

export function localizedCategoryLabel(lang: string, label: string) {
  const guide = getLocalizedGuide(lang)
  if (lang === 'en') return label

  const labels: Record<string, string> = {
    All: guide.europe,
    Market: guide.europe,
    Technology: guide.hvEss,
    Policy: guide.enclosureEu,
    Industry: guide.commercialEurope,
    'BMS Protection Board': guide.hvEss,
    'Balancing Capacitors': guide.canRs485,
    Kits: guide.lifepo4Europe,
    'Accessory Manuals': guide.enclosureEu,
    'High Voltage': guide.hvEss,
  }

  return labels[label] || guide.europe
}

const navGroupLabels = {
  en: { solutions: 'Solutions', resources: 'Resources', company: 'Company' },
  de: { solutions: 'Lösungen', resources: 'Ressourcen', company: 'Unternehmen' },
  fr: { solutions: 'Solutions', resources: 'Ressources', company: 'Entreprise' },
  es: { solutions: 'Soluciones', resources: 'Recursos', company: 'Empresa' },
  it: { solutions: 'Soluzioni', resources: 'Risorse', company: 'Azienda' },
  nl: { solutions: 'Oplossingen', resources: 'Bronnen', company: 'Bedrijf' },
  pt: { solutions: 'Soluções', resources: 'Recursos', company: 'Empresa' },
  sv: { solutions: 'Lösningar', resources: 'Resurser', company: 'Företag' },
  da: { solutions: 'Løsninger', resources: 'Ressourcer', company: 'Virksomhed' },
  fi: { solutions: 'Ratkaisut', resources: 'Resurssit', company: 'Yritys' },
  pl: { solutions: 'Rozwiązania', resources: 'Zasoby', company: 'Firma' },
  cs: { solutions: 'Řešení', resources: 'Zdroje', company: 'Společnost' },
  sk: { solutions: 'Riešenia', resources: 'Zdroje', company: 'Spoločnosť' },
  hu: { solutions: 'Megoldások', resources: 'Források', company: 'Vállalat' },
  ro: { solutions: 'Soluții', resources: 'Resurse', company: 'Companie' },
  bg: { solutions: 'Решения', resources: 'Ресурси', company: 'Компания' },
  el: { solutions: 'Λύσεις', resources: 'Πόροι', company: 'Εταιρεία' },
  hr: { solutions: 'Rješenja', resources: 'Resursi', company: 'Tvrtka' },
  sl: { solutions: 'Rešitve', resources: 'Viri', company: 'Podjetje' },
  lt: { solutions: 'Sprendimai', resources: 'Ištekliai', company: 'Įmonė' },
  lv: { solutions: 'Risinājumi', resources: 'Resursi', company: 'Uzņēmums' },
  et: { solutions: 'Lahendused', resources: 'Ressursid', company: 'Ettevõte' },
  ru: { solutions: 'Решения', resources: 'Ресурсы', company: 'Компания' },
  uk: { solutions: 'Рішення', resources: 'Ресурси', company: 'Компанія' },
  fa: { solutions: 'راهکارها', resources: 'منابع', company: 'شرکت' },
  tr: { solutions: 'Çözümler', resources: 'Kaynaklar', company: 'Şirket' },
} as const

export function localizedNavGroupLabel(lang: string, key: string, fallback: string) {
  const labels = navGroupLabels[lang as keyof typeof navGroupLabels]
  return labels?.[key as keyof typeof labels] || fallback
}

export function localizedNavItem(lang: string, label: string, href: string, description: string) {
  const guide = getLocalizedGuide(lang)
  if (lang === 'en') return { label, description }

  const lower = `${label} ${href}`.toLowerCase()
  let localizedLabel = guide.europe

  if (lower.includes('battery-enclosure') || lower.includes('48v')) localizedLabel = guide.enclosureEu
  else if (lower.includes('rack') || lower.includes('6u')) localizedLabel = guide.rackPlanning
  else if (lower.includes('high-voltage') || lower.includes('bcu')) localizedLabel = guide.hvEss
  else if (lower.includes('commercial') || lower.includes('cabinet') || lower.includes('peak')) localizedLabel = guide.commercialEurope
  else if (lower.includes('air-cooled') || lower.includes('liquid')) localizedLabel = guide.cooling
  else if (lower.includes('downloads')) localizedLabel = guide.europe
  else if (lower.includes('eu-compliance')) localizedLabel = guide.enclosureEu
  else if (lower.includes('can') || lower.includes('rs485') || lower.includes('inverter')) localizedLabel = guide.canRs485
  else if (lower.includes('280ah') || lower.includes('314ah')) localizedLabel = guide.lifepo4Europe
  else if (lower.includes('quality')) localizedLabel = guide.quote
  else if (lower.includes('shipping-quote')) localizedLabel = guide.quote
  else if (lower.includes('contact')) localizedLabel = guide.quote
  else if (lower.includes('authorized') || lower.includes('distributor')) {
    localizedLabel = lang === 'de' ? 'Autorisierte Vertriebspartner' : label
  }

  return { label: localizedLabel, description: guide.desc }
}

export function getDealerRecruitmentCopy(lang: string) {
  const guide = getLocalizedGuide(lang)
  if (lang === 'en') {
    return {
      emailSubject: 'JKESS Global Distributor Application',
      title: 'JKESS is recruiting distributors and local partners worldwide',
      desc:
        'We are opening cooperation opportunities for companies that can develop local battery storage channels, support installers, and serve residential, commercial, and industrial ESS projects.',
      apply: 'Apply to become a distributor',
      whatsapp: 'Talk on WhatsApp',
      copiedEmail: 'Email copied',
      copyEmail: 'Copy email',
      copyEmailAria: 'Copy distributor application email address',
      fitLabel: 'Partner fit',
      contactPage: 'Send a partnership inquiry',
      authorizedDistributors: 'View authorized distributors',
      profiles: [
        'Solar and energy storage distributors',
        'Battery system integrators',
        'EPC and C&I project developers',
        'Local service and installation partners',
      ],
      signals: [
        { label: 'Open territories', value: 'Europe, Americas, Middle East, Asia-Pacific, Africa' },
        { label: 'Product lines', value: 'Battery kits, high-voltage BMS, C&I ESS cabinets' },
        { label: 'Commercial support', value: 'Delivery review, documentation, volume quote support' },
        { label: 'Technical support', value: 'Product training, compatibility review, project input checks' },
      ],
    }
  }

  return {
    emailSubject: guide.quote,
    title: guide.europe,
    desc: guide.desc,
    apply: guide.quote,
    whatsapp: guide.quote,
    copiedEmail: guide.quote,
    copyEmail: guide.quote,
    copyEmailAria: guide.quote,
    fitLabel: guide.commercialEurope,
    contactPage: guide.quote,
    authorizedDistributors: lang === 'de' ? 'Autorisierte Vertriebspartner ansehen' : 'View authorized distributors',
    profiles: [guide.lifepo4Europe, guide.hvEss, guide.commercialEurope, guide.quote],
    signals: [
      { label: guide.europe, value: guide.lifepo4Europe },
      { label: guide.lifepo4Europe, value: `${guide.enclosureEu} / ${guide.hvEss} / ${guide.commercialEurope}` },
      { label: guide.quote, value: guide.desc },
      { label: guide.canRs485, value: guide.desc },
    ],
  }
}
