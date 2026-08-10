import { guideCopy } from '@/lib/products'

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
  /**
   * English-only override for the SERP/meta title. The on-page H1 keeps the
   * longer descriptive `title`. Set where Search Console shows the page ranking
   * for a phrasing the H1 does not contain literally. Localized variants drop
   * this so translated titles are never replaced by English text.
   */
  seoTitle?: string
  description: string
  intro: string
  image: string
  highlights: NonBrandPageHighlight[]
  sections: NonBrandPageSection[]
  products: NonBrandPageProduct[]
  faqs: NonBrandPageFaq[]
  related: NonBrandPageLink[]
}

type EuropeanCountryPageConfig = {
  country: string
  code: string
  adjective: string
  slug: string
  image: string
  priorityPhrase: string
  buyerFocus: string
}

const existingEuropeanCountryConfigs: EuropeanCountryPageConfig[] = [
  {
    country: 'Germany',
    code: 'DE',
    adjective: 'German',
    slug: 'germany-lifepo4-battery-kit',
    image: '/images/battery-kit-hero.webp',
    priorityPhrase: 'LiFePO4 battery kit Europe, EU shipping, and C&I cabinet quotation review',
    buyerFocus: 'installers, distributors, and project owners',
  },
  {
    country: 'France',
    code: 'FR',
    adjective: 'French',
    slug: 'france-lifepo4-battery-kit',
    image: '/images/6u-kit/1.webp',
    priorityPhrase: 'battery kit Europe, EU shipping, and commercial ESS planning',
    buyerFocus: 'residential solar installers, distributors, and C&I energy storage buyers',
  },
  {
    country: 'Italy',
    code: 'IT',
    adjective: 'Italian',
    slug: 'italy-lifepo4-battery-kit',
    image: '/images/battery-kit-system.webp',
    priorityPhrase: '48V battery enclosure EU shipping and commercial ESS quotation support',
    buyerFocus: 'residential solar, small commercial, and C&I buyers',
  },
  {
    country: 'Netherlands',
    code: 'NL',
    adjective: 'Dutch',
    slug: 'netherlands-lifepo4-battery-kit',
    image: '/images/6u-kit/2.webp',
    priorityPhrase: 'EU warehouse battery kit search and fast quotation preparation',
    buyerFocus: 'solar storage, battery enclosure, and commercial project buyers',
  },
  {
    country: 'Poland',
    code: 'PL',
    adjective: 'Polish',
    slug: 'poland-lifepo4-battery-kit',
    image: '/images/tness-ci-ess/main-1.webp',
    priorityPhrase: 'LiFePO4 battery kit Europe and C&I ESS quotation details',
    buyerFocus: 'residential storage installers, distributors, and commercial project owners',
  },
]

const additionalEuropeanCountryConfigs: EuropeanCountryPageConfig[] = [
  {
    country: 'Spain',
    code: 'ES',
    adjective: 'Spanish',
    slug: 'spain-lifepo4-battery-kit',
    image: '/images/battery-kit-system.webp',
    priorityPhrase: 'solar self-consumption and 48V battery enclosure projects',
    buyerFocus: 'residential solar installers, distributors, and commercial project buyers',
  },
  {
    country: 'Austria',
    code: 'AT',
    adjective: 'Austrian',
    slug: 'austria-lifepo4-battery-kit',
    image: '/images/6u-kit/3.webp',
    priorityPhrase: 'EU warehouse battery kit shipping and mountain-region delivery review',
    buyerFocus: 'installers and integrators comparing rack kits, caster kits, and C&I cabinet quotations',
  },
  {
    country: 'Belgium',
    code: 'BE',
    adjective: 'Belgian',
    slug: 'belgium-lifepo4-battery-kit',
    image: '/images/battery-kit-hero.webp',
    priorityPhrase: 'EU logistics, distributor resale, and commercial ESS planning',
    buyerFocus: 'battery storage distributors, EPCs, and solar storage buyers',
  },
  {
    country: 'Sweden',
    code: 'SE',
    adjective: 'Swedish',
    slug: 'sweden-lifepo4-battery-kit',
    image: '/images/tness-ci-ess/main-2.webp',
    priorityPhrase: 'cold-climate battery kit planning and commercial ESS quotation review',
    buyerFocus: 'Nordic solar storage buyers and commercial energy storage project owners',
  },
  {
    country: 'Denmark',
    code: 'DK',
    adjective: 'Danish',
    slug: 'denmark-lifepo4-battery-kit',
    image: '/images/6u-kit/2.webp',
    priorityPhrase: 'compact rack battery kits and C&I ESS cabinet quotation planning',
    buyerFocus: 'installers, distributors, and project buyers comparing EU delivery routes',
  },
  {
    country: 'Portugal',
    code: 'PT',
    adjective: 'Portuguese',
    slug: 'portugal-lifepo4-battery-kit',
    image: '/images/battery-kit-system.webp',
    priorityPhrase: 'solar storage battery kit Europe searches and EU shipping review',
    buyerFocus: 'solar installers, residential storage buyers, and small commercial ESS buyers',
  },
]

function buildEuropeanCountryPage(config: EuropeanCountryPageConfig): NonBrandLandingPage {
  return {
    path: `europe/${config.slug}`,
    kind: 'solution',
    eyebrow: `${config.country} battery storage buyers`,
    title: `LiFePO4 Battery Kits and ESS Cabinets for ${config.country}`,
    description:
      `${config.country} quotations for LiFePO4 battery kits, 48V enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU shipping.`,
    intro:
      `${config.adjective} ${config.buyerFocus} can use this page to prepare a JKESS quotation request for 48V LiFePO4 battery enclosures, rack battery kits, high-voltage BMS control boxes, or configured commercial ESS cabinets. The page focuses on ${config.priorityPhrase}.`,
    image: config.image,
    highlights: [
      { label: 'Target market', value: `${config.country} and EU delivery projects` },
      { label: 'Core search', value: 'LiFePO4 battery kit Europe' },
      { label: 'Product route', value: '48V enclosure, HV BMS, C&I cabinet' },
      { label: 'Next step', value: 'Direct checkout or written quote' },
    ],
    sections: [
      {
        title: `Battery kit planning for ${config.country}`,
        paragraphs: [
          `For ${config.country}, buyers usually begin by comparing the battery format: floor-standing caster enclosure, 6U rack enclosure, high-voltage BMS control hardware, or a configured commercial energy storage cabinet. The right path depends on cell model, inverter protocol, installation space, documentation needs, shipment size, and final responsibility for assembly and commissioning.`,
          'JKESS battery kits are enclosure and integration-hardware products. Compatible LiFePO4 cells, inverter equipment, site cabling, installation, and commissioning are outside the standard package unless a written quotation confirms otherwise.',
        ],
      },
      {
        title: `EU shipping and quotation inputs for ${config.country}`,
        paragraphs: [
          `A faster ${config.country} quotation should include the delivery city, postal code, delivery address type, unloading access, selected product option, required quantity, and whether the order is for resale, installation, or a configured project.`,
        ],
        bullets: [
          'For battery kits: cell model, enclosure format, BMS and LCD option, inverter protocol, quantity, and delivery postal code.',
          'For high-voltage BMS: pack voltage, module count, current class, PCS or EMS protocol, and contactor logic.',
          'For C&I cabinets: capacity target, AC power, cooling preference, site conditions, documentation, unloading, and installation boundary.',
          'For logistics: delivery city, address type, unloading limitations, requested Incoterm, deadline, and any documentation requirements.',
        ],
      },
      {
        title: `When ${config.adjective} buyers should request a written quote`,
        paragraphs: [
          'Request a written quotation when the order includes several kits, bulk resale, special packing, high-voltage BMS architecture, configured C&I cabinets, custom documentation, or delivery conditions that can affect freight, lead time, and included scope.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: `Movable 51.2V LiFePO4 battery enclosure kit for ${config.adjective.toLowerCase()} residential and small commercial assembly projects.`,
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: `Rack-mount LiFePO4 battery enclosure for ${config.adjective.toLowerCase()} 19-inch cabinet and equipment-room installations.`,
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: `100A and 200A BCU or BMU control boxes for ${config.adjective.toLowerCase()} high-voltage ESS rack integrators.`,
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: `Configured commercial energy storage cabinet for ${config.country}-focused project quotation review.`,
      },
    ],
    faqs: [
      {
        question: `Can JKESS ship battery kits to ${config.country}?`,
        answer: `${config.country} is handled as an EU destination for website shipping review. Larger quantities, remote delivery, or project shipments may still require a written quotation before payment.`,
      },
      {
        question: `Are LiFePO4 cells included with JKESS battery kits for ${config.country}?`,
        answer: 'No. The kits provide the enclosure and selected hardware package. Compatible LiFePO4 cells must be sourced separately unless a written quotation says otherwise.',
      },
      {
        question: `What should ${config.adjective.toLowerCase()} C&I ESS buyers send before quotation?`,
        answer: 'Send capacity target, AC power, site location, grid information, cooling preference, installation scope, documentation requirements, delivery conditions, and any commissioning or monitoring expectations.',
      },
    ],
    related: [
      {
        href: '/europe',
        label: 'Europe battery storage hub',
        description: 'Navigate EU battery kit, country page, 48V enclosure, and C&I ESS quotation paths.',
      },
      {
        href: '/europe/eu-warehouse-battery-kit',
        label: 'EU warehouse battery kit checklist',
        description: 'Prepare delivery country, postal code, quantity, kit option, and freight review details.',
      },
      {
        href: '/europe/commercial-energy-storage-cabinet-europe',
        label: 'Commercial energy storage cabinet Europe',
        description: 'Prepare C&I cabinet capacity, PCS power, cooling, documentation, and delivery scope.',
      },
      {
        href: '/can-rs485-bms-inverter-compatibility',
        label: 'CAN and RS485 compatibility checklist',
        description: 'Review protocol, pinout, firmware, and commissioning checks before ordering.',
      },
    ],
  }
}

const allEuropeanCountryConfigs = [...existingEuropeanCountryConfigs, ...additionalEuropeanCountryConfigs]

function mkCountryCopy(words: {
  buyers: string
  title: string
  description: string
  intro: string
  targetMarket: string
  coreSearch: string
  productRoute: string
  nextStep: string
  euDelivery: string
  directOrQuote: string
  planning: string
  planningBody: string
  scopeBody: string
  inputs: string
  inputsBody: string
  quote: string
  quoteBody: string
  shipQ: string
  shipA: string
  cellsQ: string
  cellsA: string
  cabinetQ: string
  cabinetA: string
}) {
  return {
    buyers: words.buyers,
    title: (country: string) => `${words.title} ${country}`,
    description: (country: string) => `${words.description} ${country}.`,
    intro: (country: string) => `${words.intro} ${country}.`,
    targetMarket: words.targetMarket,
    coreSearch: words.coreSearch,
    productRoute: words.productRoute,
    nextStep: words.nextStep,
    euDelivery: words.euDelivery,
    directOrQuote: words.directOrQuote,
    planningTitle: (country: string) => `${words.planning} ${country}`,
    planningBody: words.planningBody,
    scopeBody: words.scopeBody,
    inputsTitle: words.inputs,
    inputsBody: words.inputsBody,
    quoteTitle: words.quote,
    quoteBody: words.quoteBody,
    faqShip: (country: string) => `${words.shipQ} ${country}?`,
    faqShipAnswer: (country: string) => `${country}: ${words.shipA}`,
    faqCells: (country: string) => `${words.cellsQ} ${country}?`,
    faqCellsAnswer: words.cellsA,
    faqCabinet: words.cabinetQ,
    faqCabinetAnswer: words.cabinetA,
  }
}

const countryPageCopy = {
  en: {
    buyers: 'battery storage buyers',
    title: (country: string) => `LiFePO4 Battery Kits and ESS Cabinets for ${country}`,
    description: (country: string) => `${country} quotations for LiFePO4 battery kits, 48V enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU shipping.`,
    intro: (country: string) => `Buyers in ${country} can use this page to prepare a JKESS quotation request for 48V LiFePO4 battery enclosures, rack battery kits, high-voltage BMS control boxes, or configured commercial ESS cabinets.`,
    targetMarket: 'Target market',
    coreSearch: 'Core search',
    productRoute: 'Product route',
    nextStep: 'Next step',
    euDelivery: 'EU delivery projects',
    directOrQuote: 'Direct checkout or written quote',
    planningTitle: (country: string) => `Battery kit planning for ${country}`,
    planningBody: 'Compare floor-standing caster enclosures, 6U rack enclosures, high-voltage BMS control hardware, and configured commercial energy storage cabinets from the real installation, inverter, documentation, delivery, and project scope.',
    scopeBody: 'JKESS battery kits are enclosure and integration-hardware products. Compatible LiFePO4 cells, inverter equipment, site cabling, installation, and commissioning are outside the standard package unless a written quotation confirms otherwise.',
    inputsTitle: 'EU shipping and quotation inputs',
    inputsBody: 'A faster quotation should include delivery city, postal code, address type, unloading access, selected option, quantity, and whether the order is for resale, installation, or a configured project.',
    quoteTitle: 'When to request a written quote',
    quoteBody: 'Request a written quotation for several kits, bulk resale, special packing, high-voltage BMS architecture, configured C&I cabinets, custom documentation, or freight-sensitive delivery.',
    faqShip: (country: string) => `Can JKESS ship battery kits to ${country}?`,
    faqShipAnswer: (country: string) => `${country} is handled as an EU destination for website shipping review. Larger quantities, remote delivery, or project shipments may still require a written quotation before payment.`,
    faqCells: (country: string) => `Are LiFePO4 cells included with JKESS battery kits for ${country}?`,
    faqCellsAnswer: 'No. The kits provide the enclosure and selected hardware package. Compatible LiFePO4 cells must be sourced separately unless a written quotation says otherwise.',
    faqCabinet: 'What should C&I ESS buyers send before quotation?',
    faqCabinetAnswer: 'Send capacity target, AC power, site location, grid information, cooling preference, installation scope, documentation requirements, delivery conditions, and monitoring expectations.',
  },
  de: {
    buyers: 'Käufer von Batteriespeichern',
    title: (country: string) => `LiFePO4-Batterie-Kits und ESS-Schränke für ${country}`,
    description: (country: string) => `Bereiten Sie Angebote für ${country} zu LiFePO4-Batterie-Kits, 48V-Gehäusen, Hochvolt-BMS und gewerblichen Energiespeicherschränken mit EU-Versandprüfung vor.`,
    intro: (country: string) => `Käufer in ${country} können diese Seite nutzen, um eine JKESS-Anfrage für 48V-LiFePO4-Gehäuse, Rack-Kits, Hochvolt-BMS oder konfigurierte gewerbliche ESS-Schränke vorzubereiten.`,
    targetMarket: 'Zielmarkt', coreSearch: 'Kernsuche', productRoute: 'Produktpfad', nextStep: 'Nächster Schritt', euDelivery: 'EU-Lieferprojekte', directOrQuote: 'Direktkauf oder schriftliches Angebot',
    planningTitle: (country: string) => `Batterie-Kit-Planung für ${country}`,
    planningBody: 'Vergleichen Sie Standgehäuse mit Rollen, 6U-Rack-Gehäuse, Hochvolt-BMS-Hardware und konfigurierte gewerbliche Energiespeicherschränke anhand von Installation, Wechselrichter, Dokumentation, Lieferung und Projektumfang.',
    scopeBody: 'JKESS-Batterie-Kits sind Gehäuse- und Integrationshardware. LiFePO4-Zellen, Wechselrichter, Standortverkabelung, Installation und Inbetriebnahme sind nicht enthalten, sofern kein schriftliches Angebot dies bestätigt.',
    inputsTitle: 'EU-Versand und Angebotsdaten',
    inputsBody: 'Für ein schnelleres Angebot nennen Sie Stadt, Postleitzahl, Adresstyp, Entladung, gewählte Option, Menge und ob es um Wiederverkauf, Installation oder ein konfiguriertes Projekt geht.',
    quoteTitle: 'Wann ein schriftliches Angebot nötig ist',
    quoteBody: 'Fordern Sie ein Angebot für mehrere Kits, Wiederverkauf, Sonderverpackung, Hochvolt-BMS, C&I-Schränke, spezielle Dokumente oder frachtsensible Lieferung an.',
    faqShip: (country: string) => `Kann JKESS Batterie-Kits nach ${country} liefern?`,
    faqShipAnswer: (country: string) => `${country} gilt als EU-Ziel für die Versandprüfung. Größere Mengen, abgelegene Lieferorte oder Projektlieferungen können ein schriftliches Angebot erfordern.`,
    faqCells: (country: string) => `Sind LiFePO4-Zellen bei JKESS-Kits für ${country} enthalten?`,
    faqCellsAnswer: 'Nein. Die Kits enthalten das Gehäuse und die gewählte Hardware. Kompatible LiFePO4-Zellen müssen separat beschafft werden, sofern kein Angebot etwas anderes bestätigt.',
    faqCabinet: 'Welche Angaben brauchen C&I-ESS-Käufer vor dem Angebot?',
    faqCabinetAnswer: 'Senden Sie Kapazität, AC-Leistung, Standort, Netzdaten, Kühlwunsch, Installationsumfang, Dokumente, Lieferbedingungen und Monitoring-Anforderungen.',
  },
  fr: {
    buyers: 'acheteurs de stockage batterie',
    title: (country: string) => `Kits batterie LiFePO4 et armoires ESS pour ${country}`,
    description: (country: string) => `Préparez des devis pour ${country} concernant kits LiFePO4, boîtiers 48V, BMS haute tension et armoires ESS commerciales avec vérification de livraison UE.`,
    intro: (country: string) => `Les acheteurs en ${country} peuvent préparer une demande JKESS pour boîtiers LiFePO4 48V, kits rack, BMS haute tension ou armoires ESS commerciales configurées.`,
    targetMarket: 'Marché cible', coreSearch: 'Recherche principale', productRoute: 'Parcours produit', nextStep: 'Étape suivante', euDelivery: 'Projets avec livraison UE', directOrQuote: 'Paiement direct ou devis écrit',
    planningTitle: (country: string) => `Planification des kits batterie pour ${country}`,
    planningBody: 'Comparez boîtiers au sol à roulettes, boîtiers rack 6U, matériel BMS haute tension et armoires ESS commerciales configurées selon l’installation, l’onduleur, les documents, la livraison et le périmètre projet.',
    scopeBody: 'Les kits batterie JKESS sont des boîtiers et matériels d’intégration. Cellules LiFePO4, onduleur, câblage site, installation et mise en service sont exclus sauf confirmation écrite.',
    inputsTitle: 'Livraison UE et données de devis',
    inputsBody: 'Pour un devis plus rapide, indiquez ville, code postal, type d’adresse, déchargement, option choisie, quantité et usage revente, installation ou projet configuré.',
    quoteTitle: 'Quand demander un devis écrit',
    quoteBody: 'Demandez un devis pour plusieurs kits, revente, emballage spécial, architecture BMS haute tension, armoires C&I, documents spécifiques ou livraison sensible au fret.',
    faqShip: (country: string) => `JKESS peut-il livrer des kits batterie vers ${country} ?`,
    faqShipAnswer: (country: string) => `${country} est traité comme destination UE pour la vérification de livraison. Les grandes quantités ou projets peuvent nécessiter un devis écrit.`,
    faqCells: (country: string) => `Les cellules LiFePO4 sont-elles incluses pour ${country} ?`,
    faqCellsAnswer: 'Non. Les kits comprennent le boîtier et le matériel sélectionné. Les cellules LiFePO4 compatibles sont à acheter séparément sauf mention dans le devis.',
    faqCabinet: 'Quelles informations envoyer pour une armoire ESS C&I ?',
    faqCabinetAnswer: 'Envoyez capacité, puissance AC, site, données réseau, refroidissement, périmètre d’installation, documents, livraison et exigences de supervision.',
  },
  es: mkCountryCopy({ buyers: 'compradores de almacenamiento en baterías', title: 'Kits de batería LiFePO4 y armarios ESS para', description: 'Prepare cotizaciones de kits LiFePO4, cajas 48V, BMS de alto voltaje y armarios ESS comerciales para', intro: 'Los compradores pueden preparar una solicitud JKESS para cajas LiFePO4 48V, kits rack, BMS de alto voltaje o armarios ESS comerciales configurados en', targetMarket: 'Mercado objetivo', coreSearch: 'Búsqueda principal', productRoute: 'Ruta de producto', nextStep: 'Siguiente paso', euDelivery: 'proyectos con entrega UE', directOrQuote: 'Pago directo o cotización escrita', planning: 'Planificación de kits de batería para', planningBody: 'Compare cajas con ruedas, cajas rack 6U, hardware BMS de alto voltaje y armarios ESS comerciales según instalación, inversor, documentación, entrega y alcance del proyecto.', scopeBody: 'Los kits JKESS son cajas y hardware de integración. Las celdas LiFePO4, inversor, cableado, instalación y puesta en marcha no están incluidos salvo cotización escrita.', inputs: 'Envío UE y datos para cotización', inputsBody: 'Indique ciudad, código postal, tipo de dirección, descarga, opción, cantidad y si es reventa, instalación o proyecto configurado.', quote: 'Cuándo pedir una cotización escrita', quoteBody: 'Pida cotización para varios kits, reventa, embalaje especial, BMS de alto voltaje, armarios C&I, documentación o entrega sensible al flete.', shipQ: '¿Puede JKESS enviar kits de batería a', shipA: 'es destino UE para revisión de envío; cantidades grandes o proyectos pueden requerir cotización escrita.', cellsQ: '¿Incluyen celdas LiFePO4 los kits JKESS para', cellsA: 'No. Los kits incluyen la caja y el hardware seleccionado. Las celdas LiFePO4 compatibles se compran por separado salvo cotización.', cabinetQ: '¿Qué deben enviar los compradores de ESS C&I?', cabinetA: 'Envíe capacidad, potencia AC, ubicación, red, refrigeración, alcance de instalación, documentos, entrega y requisitos de monitorización.' }),
  it: mkCountryCopy({ buyers: 'acquirenti di accumulo batterie', title: 'Kit batteria LiFePO4 e armadi ESS per', description: 'Prepara preventivi per kit LiFePO4, box 48V, BMS alta tensione e armadi ESS commerciali per', intro: 'Gli acquirenti possono preparare una richiesta JKESS per box LiFePO4 48V, kit rack, BMS alta tensione o armadi ESS commerciali configurati in', targetMarket: 'Mercato target', coreSearch: 'Ricerca principale', productRoute: 'Percorso prodotto', nextStep: 'Passo successivo', euDelivery: 'progetti con consegna UE', directOrQuote: 'Checkout diretto o preventivo scritto', planning: 'Pianificazione kit batteria per', planningBody: 'Confronta box con ruote, box rack 6U, hardware BMS alta tensione e armadi ESS commerciali in base a installazione, inverter, documenti, consegna e ambito progetto.', scopeBody: 'I kit JKESS sono box e hardware di integrazione. Celle LiFePO4, inverter, cablaggio, installazione e avviamento non sono inclusi salvo preventivo scritto.', inputs: 'Spedizione UE e dati per preventivo', inputsBody: 'Indica città, CAP, tipo indirizzo, scarico, opzione, quantità e se si tratta di rivendita, installazione o progetto configurato.', quote: 'Quando richiedere un preventivo scritto', quoteBody: 'Richiedi preventivo per più kit, rivendita, imballo speciale, BMS alta tensione, armadi C&I, documenti o consegna sensibile al trasporto.', shipQ: 'JKESS può spedire kit batteria in', shipA: 'è una destinazione UE per revisione spedizione; quantità elevate o progetti possono richiedere preventivo scritto.', cellsQ: 'Le celle LiFePO4 sono incluse nei kit JKESS per', cellsA: 'No. I kit includono il box e l’hardware selezionato. Le celle LiFePO4 compatibili sono acquistate separatamente salvo preventivo.', cabinetQ: 'Cosa devono inviare gli acquirenti ESS C&I?', cabinetA: 'Inviare capacità, potenza AC, sito, rete, raffreddamento, ambito installazione, documenti, consegna e monitoraggio.' }),
  nl: mkCountryCopy({ buyers: 'kopers van batterijopslag', title: 'LiFePO4-batterijkits en ESS-kasten voor', description: 'Bereid offertes voor LiFePO4-kits, 48V behuizingen, hoogspannings-BMS en commerciële ESS-kasten voor', intro: 'Kopers kunnen een JKESS-aanvraag voorbereiden voor 48V LiFePO4-behuizingen, rackkits, hoogspannings-BMS of geconfigureerde commerciële ESS-kasten in', targetMarket: 'Doelmarkt', coreSearch: 'Belangrijkste zoekterm', productRoute: 'Productroute', nextStep: 'Volgende stap', euDelivery: 'projecten met EU-levering', directOrQuote: 'Direct afrekenen of schriftelijke offerte', planning: 'Planning van batterijkits voor', planningBody: 'Vergelijk verrijdbare behuizingen, 6U rackbehuizingen, hoogspannings-BMS en commerciële ESS-kasten op installatie, omvormer, documentatie, levering en projectscope.', scopeBody: 'JKESS-kits zijn behuizing en integratiehardware. LiFePO4-cellen, omvormer, bekabeling, installatie en inbedrijfstelling zijn uitgesloten tenzij schriftelijk bevestigd.', inputs: 'EU-verzending en offertegegevens', inputsBody: 'Geef stad, postcode, adrestype, lossen, optie, hoeveelheid en doel zoals wederverkoop, installatie of geconfigureerd project.', quote: 'Wanneer een schriftelijke offerte nodig is', quoteBody: 'Vraag offerte voor meerdere kits, wederverkoop, speciale verpakking, hoogspannings-BMS, C&I-kasten, documentatie of vrachtgevoelige levering.', shipQ: 'Kan JKESS batterijkits verzenden naar', shipA: 'is een EU-bestemming voor verzendcontrole; grotere aantallen of projecten kunnen een schriftelijke offerte vereisen.', cellsQ: 'Zijn LiFePO4-cellen inbegrepen bij JKESS-kits voor', cellsA: 'Nee. De kits bevatten de behuizing en gekozen hardware. Compatibele LiFePO4-cellen worden apart gekocht tenzij de offerte anders zegt.', cabinetQ: 'Wat moeten C&I ESS-kopers sturen?', cabinetA: 'Stuur capaciteit, AC-vermogen, locatie, netgegevens, koeling, installatiescope, documenten, levering en monitoringvereisten.' }),
  pt: mkCountryCopy({ buyers: 'compradores de armazenamento em baterias', title: 'Kits de bateria LiFePO4 e armários ESS para', description: 'Prepare cotações de kits LiFePO4, caixas 48V, BMS de alta tensão e armários ESS comerciais para', intro: 'Os compradores podem preparar uma solicitação JKESS para caixas LiFePO4 48V, kits rack, BMS de alta tensão ou armários ESS comerciais configurados em', targetMarket: 'Mercado-alvo', coreSearch: 'Pesquisa principal', productRoute: 'Rota de produto', nextStep: 'Próximo passo', euDelivery: 'projetos com entrega UE', directOrQuote: 'Pagamento direto ou cotação escrita', planning: 'Planeamento de kits de bateria para', planningBody: 'Compare caixas com rodas, caixas rack 6U, hardware BMS de alta tensão e armários ESS comerciais conforme instalação, inversor, documentação, entrega e escopo.', scopeBody: 'Os kits JKESS são caixas e hardware de integração. Células LiFePO4, inversor, cablagem, instalação e comissionamento não estão incluídos salvo cotação escrita.', inputs: 'Envio UE e dados de cotação', inputsBody: 'Informe cidade, código postal, tipo de endereço, descarga, opção, quantidade e se é revenda, instalação ou projeto configurado.', quote: 'Quando pedir cotação escrita', quoteBody: 'Peça cotação para vários kits, revenda, embalagem especial, BMS de alta tensão, armários C&I, documentos ou entrega sensível ao frete.', shipQ: 'A JKESS pode enviar kits de bateria para', shipA: 'é destino UE para revisão de envio; quantidades maiores ou projetos podem exigir cotação escrita.', cellsQ: 'As células LiFePO4 estão incluídas nos kits JKESS para', cellsA: 'Não. Os kits incluem a caixa e o hardware selecionado. Células LiFePO4 compatíveis são compradas separadamente salvo cotação.', cabinetQ: 'O que compradores ESS C&I devem enviar?', cabinetA: 'Envie capacidade, potência AC, local, rede, refrigeração, escopo de instalação, documentos, entrega e monitorização.' }),
  sv: mkCountryCopy({ buyers: 'köpare av batterilagring', title: 'LiFePO4-batterikit och ESS-skåp för', description: 'Förbered offerter för LiFePO4-kit, 48V höljen, högspännings-BMS och kommersiella ESS-skåp för', intro: 'Köpare kan förbereda en JKESS-förfrågan för 48V LiFePO4-höljen, rackkit, högspännings-BMS eller konfigurerade kommersiella ESS-skåp i', targetMarket: 'Målmarknad', coreSearch: 'Huvudsökning', productRoute: 'Produktväg', nextStep: 'Nästa steg', euDelivery: 'projekt med EU-leverans', directOrQuote: 'Direktköp eller skriftlig offert', planning: 'Planering av batterikit för', planningBody: 'Jämför rullbara höljen, 6U rackhöljen, högspännings-BMS och kommersiella ESS-skåp efter installation, växelriktare, dokument, leverans och projektscope.', scopeBody: 'JKESS-kit är höljen och integrationshårdvara. LiFePO4-celler, växelriktare, kablage, installation och driftsättning ingår inte utan skriftlig offert.', inputs: 'EU-frakt och offertuppgifter', inputsBody: 'Ange stad, postnummer, adresstyp, lossning, alternativ, antal och om det gäller återförsäljning, installation eller konfigurerat projekt.', quote: 'När skriftlig offert behövs', quoteBody: 'Begär offert för flera kit, återförsäljning, specialpackning, högspännings-BMS, C&I-skåp, dokument eller fraktkänslig leverans.', shipQ: 'Kan JKESS skicka batterikit till', shipA: 'är en EU-destination för fraktgranskning; större antal eller projekt kan kräva skriftlig offert.', cellsQ: 'Ingår LiFePO4-celler i JKESS-kit för', cellsA: 'Nej. Kiten innehåller hölje och vald hårdvara. Kompatibla LiFePO4-celler köps separat om inte offerten anger annat.', cabinetQ: 'Vad ska C&I ESS-köpare skicka?', cabinetA: 'Skicka kapacitet, AC-effekt, plats, nätdata, kylning, installationsscope, dokument, leverans och övervakningskrav.' }),
  da: mkCountryCopy({ buyers: 'købere af batterilagring', title: 'LiFePO4-batterisæt og ESS-kabinetter til', description: 'Forbered tilbud på LiFePO4-sæt, 48V kabinetter, højspændings-BMS og kommercielle ESS-kabinetter til', intro: 'Købere kan forberede en JKESS-forespørgsel for 48V LiFePO4-kabinetter, rack-sæt, højspændings-BMS eller konfigurerede kommercielle ESS-kabinetter i', targetMarket: 'Målmarked', coreSearch: 'Kernesøgning', productRoute: 'Produktrute', nextStep: 'Næste trin', euDelivery: 'projekter med EU-levering', directOrQuote: 'Direkte checkout eller skriftligt tilbud', planning: 'Planlægning af batterisæt til', planningBody: 'Sammenlign kabinetter med hjul, 6U rackkabinetter, højspændings-BMS og kommercielle ESS-kabinetter efter installation, inverter, dokumenter, levering og projektscope.', scopeBody: 'JKESS-sæt er kabinetter og integrationshardware. LiFePO4-celler, inverter, kabler, installation og idriftsættelse er ikke inkluderet uden skriftligt tilbud.', inputs: 'EU-forsendelse og tilbudsdata', inputsBody: 'Angiv by, postnummer, adressetype, aflæsning, valgmulighed, mængde og om det er videresalg, installation eller konfigureret projekt.', quote: 'Hvornår skriftligt tilbud er nødvendigt', quoteBody: 'Anmod om tilbud for flere sæt, videresalg, specialpakning, højspændings-BMS, C&I-kabinetter, dokumenter eller fragtfølsom levering.', shipQ: 'Kan JKESS sende batterisæt til', shipA: 'er en EU-destination til forsendelsesgennemgang; større mængder eller projekter kan kræve skriftligt tilbud.', cellsQ: 'Er LiFePO4-celler inkluderet i JKESS-sæt til', cellsA: 'Nej. Sættene indeholder kabinet og valgt hardware. Kompatible LiFePO4-celler købes separat medmindre tilbuddet siger andet.', cabinetQ: 'Hvad skal C&I ESS-købere sende?', cabinetA: 'Send kapacitet, AC-effekt, placering, netdata, køling, installationsscope, dokumenter, levering og overvågningskrav.' }),
  pl: mkCountryCopy({ buyers: 'kupujący magazyny energii', title: 'Zestawy baterii LiFePO4 i szafy ESS dla', description: 'Przygotuj oferty zestawów LiFePO4, obudów 48V, BMS wysokiego napięcia i komercyjnych szaf ESS dla', intro: 'Kupujący mogą przygotować zapytanie JKESS dla obudów LiFePO4 48V, zestawów rack, BMS wysokiego napięcia lub konfigurowanych komercyjnych szaf ESS w', targetMarket: 'Rynek docelowy', coreSearch: 'Główna fraza', productRoute: 'Ścieżka produktu', nextStep: 'Następny krok', euDelivery: 'projekty z dostawą UE', directOrQuote: 'Zakup bezpośredni lub pisemna oferta', planning: 'Planowanie zestawów baterii dla', planningBody: 'Porównaj obudowy na kołach, obudowy rack 6U, BMS wysokiego napięcia i komercyjne szafy ESS według instalacji, falownika, dokumentów, dostawy i zakresu projektu.', scopeBody: 'Zestawy JKESS to obudowy i hardware integracyjny. Ogniwa LiFePO4, falownik, okablowanie, instalacja i uruchomienie nie są zawarte bez pisemnej oferty.', inputs: 'Wysyłka UE i dane do oferty', inputsBody: 'Podaj miasto, kod pocztowy, typ adresu, rozładunek, opcję, ilość oraz czy to odsprzedaż, instalacja czy projekt konfigurowany.', quote: 'Kiedy poprosić o pisemną ofertę', quoteBody: 'Poproś o ofertę dla wielu zestawów, odsprzedaży, specjalnego pakowania, BMS HV, szaf C&I, dokumentów lub dostawy zależnej od frachtu.', shipQ: 'Czy JKESS może wysłać zestawy baterii do', shipA: 'jest miejscem dostawy UE do weryfikacji wysyłki; większe ilości lub projekty mogą wymagać pisemnej oferty.', cellsQ: 'Czy ogniwa LiFePO4 są w zestawach JKESS dla', cellsA: 'Nie. Zestawy obejmują obudowę i wybrany hardware. Kompatybilne ogniwa LiFePO4 kupuje się osobno, chyba że oferta stanowi inaczej.', cabinetQ: 'Co powinni wysłać kupujący ESS C&I?', cabinetA: 'Wyślij pojemność, moc AC, lokalizację, dane sieci, chłodzenie, zakres instalacji, dokumenty, dostawę i wymagania monitoringu.' }),
}

const countryPageFallbackLocales = ['fi', 'cs', 'sk', 'hu', 'ro', 'bg', 'el', 'hr', 'sl', 'lt', 'lv', 'et', 'ru', 'uk', 'fa', 'tr'] as const

function countryCopy(lang: string) {
  if (lang === 'de') return countryPageCopy.de
  if (lang === 'fr') return countryPageCopy.fr
  if (lang === 'es') return countryPageCopy.es
  if (lang === 'it') return countryPageCopy.it
  if (lang === 'nl') return countryPageCopy.nl
  if (lang === 'pt') return countryPageCopy.pt
  if (lang === 'sv') return countryPageCopy.sv
  if (lang === 'da') return countryPageCopy.da
  if (lang === 'pl') return countryPageCopy.pl
  if (countryPageFallbackLocales.includes(lang as typeof countryPageFallbackLocales[number])) {
    const guide = guideCopy[lang as keyof typeof guideCopy] || guideCopy.en
    return mkCountryCopy({
      buyers: guide.europe,
      title: `${guide.lifepo4Europe} / ${guide.commercialEurope} -`,
      description: `${guide.desc}`,
      intro: `${guide.desc}`,
      targetMarket: guide.europe,
      coreSearch: guide.lifepo4Europe,
      productRoute: guide.commercialEurope,
      nextStep: guide.quote,
      euDelivery: guide.enclosureEu,
      directOrQuote: guide.quote,
      planning: `${guide.lifepo4Europe} -`,
      planningBody: guide.desc,
      scopeBody: guide.quote,
      inputs: guide.enclosureEu,
      inputsBody: guide.desc,
      quote: guide.quote,
      quoteBody: guide.desc,
      shipQ: guide.enclosureEu,
      shipA: guide.desc,
      cellsQ: guide.lifepo4Europe,
      cellsA: guide.desc,
      cabinetQ: guide.commercialEurope,
      cabinetA: guide.desc,
    })
  }
  return countryPageCopy.en
}

function localizedCountryName(lang: string, config: EuropeanCountryPageConfig) {
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(config.code) || config.country
  } catch {
    return config.country
  }
}

function localizedGuide(lang: string) {
  return guideCopy[lang as keyof typeof guideCopy] || guideCopy.en
}

function localizedTopic(path: string, guide: typeof guideCopy.en) {
  if (path.includes('solar-self-consumption')) return guide.commercialEurope
  if (path.includes('commercial-backup-power')) return guide.commercialEurope
  if (path.includes('ev-charging-station')) return guide.commercialEurope
  if (path.includes('factory-energy-storage')) return guide.commercialEurope
  if (path.includes('warehouse-supermarket')) return guide.commercialEurope
  if (path.includes('quote-preparation')) return guide.quote
  if (path.includes('rack')) return guide.rackPlanning
  if (path.includes('high-voltage') || path.includes('100a-vs-200a') || path.includes('bcu')) return guide.hvEss
  if (path.includes('commercial') || path.includes('cabinet') || path.includes('peak-shaving')) return guide.commercialEurope
  if (path.includes('can-rs485') || path.includes('inverter')) return guide.canRs485
  if (path.includes('europe')) return guide.lifepo4Europe
  if (path.includes('compare')) return guide.rackVsFloor
  return guide.enclosureEu
}

function localizedRelatedLabel(href: string, guide: typeof guideCopy.en) {
  const path = href.replace(/^\//, '')
  if (path.includes('rack')) return guide.rackVsFloor
  if (path.includes('high-voltage') || path.includes('100a-vs-200a') || path.includes('bcu') || path.includes('bmu')) return guide.hvEss
  if (path.includes('cooling')) return guide.cooling
  if (path.includes('commercial') || path.includes('cabinet')) return guide.commercialEurope
  if (path.includes('can-rs485') || path.includes('inverter')) return guide.canRs485
  if (path.includes('europe')) return guide.lifepo4Europe
  return guide.enclosureEu
}

function localizeGenericNonBrandLandingPage(page: NonBrandLandingPage, lang: string): NonBrandLandingPage {
  const guide = localizedGuide(lang)
  const topic = localizedTopic(page.path, guide)
  const secondary = page.path.includes('commercial') ? guide.cooling : guide.enclosureEu

  return {
    ...page,
    eyebrow: guide.europe,
    title: topic,
    // The English SERP-title override must not leak into translated pages.
    seoTitle: undefined,
    description: guide.desc,
    intro: guide.desc,
    highlights: [
      { label: guide.lifepo4Europe, value: topic },
      { label: guide.enclosureEu, value: secondary },
      { label: guide.commercialEurope, value: guide.quote },
      { label: guide.hvEss, value: guide.canRs485 },
    ],
    sections: [
      {
        title: topic,
        paragraphs: [guide.desc, guide.quote],
        bullets: [guide.enclosureEu, guide.hvEss, guide.commercialEurope, guide.canRs485],
      },
      {
        title: secondary,
        paragraphs: [guide.desc],
      },
      {
        title: guide.quote,
        paragraphs: [guide.desc],
      },
    ],
    products: page.products.map((product) => ({
      ...product,
      description: guide.desc,
    })),
    faqs: [
      { question: topic, answer: guide.desc },
      { question: guide.enclosureEu, answer: guide.desc },
      { question: guide.quote, answer: guide.desc },
    ],
    related: page.related.map((link) => ({
      ...link,
      label: localizedRelatedLabel(link.href, guide),
      description: guide.desc,
    })),
  }
}

function buildLocalizedEuropeanCountryPage(config: EuropeanCountryPageConfig, lang: string): NonBrandLandingPage {
  const copy = countryCopy(lang)
  const country = localizedCountryName(lang, config)
  const guide = localizedGuide(lang)

  return {
    path: `europe/${config.slug}`,
    kind: 'solution',
    eyebrow: `${country} ${copy.buyers}`,
    title: copy.title(country),
    description: copy.description(country),
    intro: copy.intro(country),
    image: config.image,
    highlights: [
      { label: copy.targetMarket, value: `${country} ${copy.euDelivery}` },
      { label: copy.coreSearch, value: guide.lifepo4Europe },
      { label: copy.productRoute, value: `${guide.enclosureEu} / ${guide.hvEss}` },
      { label: copy.nextStep, value: copy.directOrQuote },
    ],
    sections: [
      {
        title: copy.planningTitle(country),
        paragraphs: [copy.planningBody, copy.scopeBody],
      },
      {
        title: copy.inputsTitle,
        paragraphs: [copy.inputsBody],
        bullets: [
          `${guide.lifepo4Europe} / ${guide.enclosureEu}`,
          `${guide.hvEss} / ${guide.currentCompare}`,
          `${guide.commercialEurope} / ${guide.cooling}`,
          `${guide.quote} / ${guide.europe}`,
        ],
      },
      {
        title: copy.quoteTitle,
        paragraphs: [copy.quoteBody],
      },
    ],
    products: [
      { slug: 'battery-kit', label: 'Battery Kit With Caster', description: copy.planningBody },
      { slug: '6u-battery-kit', label: '6U Battery Kit', description: copy.inputsBody },
      { slug: 'high-voltage-kit', label: 'High Voltage Kit', description: copy.quoteBody },
      { slug: 'tness-ci-ess-cabinet', label: 'C&I High Voltage ESS Cabinet', description: copy.faqCabinetAnswer },
    ],
    faqs: [
      { question: copy.faqShip(country), answer: copy.faqShipAnswer(country) },
      { question: copy.faqCells(country), answer: copy.faqCellsAnswer },
      { question: copy.faqCabinet, answer: copy.faqCabinetAnswer },
    ],
    related: [
      { href: '/europe', label: copy.title('Europe'), description: copy.intro('Europe') },
      { href: '/europe/eu-warehouse-battery-kit', label: copy.inputsTitle, description: copy.inputsBody },
      { href: '/europe/commercial-energy-storage-cabinet-europe', label: copy.faqCabinet, description: copy.faqCabinetAnswer },
      { href: '/can-rs485-bms-inverter-compatibility', label: copy.productRoute, description: copy.scopeBody },
    ],
  }
}

export function localizeNonBrandLandingPage(page: NonBrandLandingPage, lang: string): NonBrandLandingPage {
  if (lang === 'en') return page
  const config = allEuropeanCountryConfigs.find((item) => page.path === `europe/${item.slug}`)
  return config ? buildLocalizedEuropeanCountryPage(config, lang) : localizeGenericNonBrandLandingPage(page, lang)
}

const baseNonBrandLandingPages: NonBrandLandingPage[] = [
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
      {
        href: '/energy-storage-enclosures',
        label: 'Energy storage enclosures',
        description: 'Compare enclosure formats for lithium battery projects before fixing the mechanical scope.',
      },
      {
        href: '/ess-rack-mount-battery-modules',
        label: 'Rack-mount battery modules',
        description: 'Check module height, depth, and rack layout when the project uses 19-inch equipment cabinets.',
      },
      {
        href: '/battery-box-manual',
        label: 'Battery box manual and assembly documents',
        description: 'Read the assembly, wiring, and commissioning documentation supplied with each enclosure kit.',
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
      {
        href: '/ess-rack-mount-battery-modules',
        label: 'ESS rack-mount battery modules',
        description: 'Review module dimensions, mounting, and stacking limits for rack-based assemblies.',
      },
    ],
  },
  {
    path: 'high-voltage-bms',
    kind: 'category',
    eyebrow: 'BCU and BMU control architecture',
    title: 'High-Voltage BMS Hardware for Commercial Energy Storage',
    seoTitle: 'High-Voltage BMS Hardware: BCU and BMU Boxes',
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
      {
        href: '/bmu-battery-module',
        label: 'BMU battery module unit',
        description: 'Understand what the BMU slave control box measures and reports back to the BCU master.',
      },
    ],
  },
  {
    path: 'commercial-energy-storage',
    kind: 'category',
    eyebrow: 'Commercial and industrial BESS',
    title: '64.3kWh to 261kWh Commercial Energy Storage Cabinets',
    description:
      'Configurable C&I energy storage cabinets from 64.3kWh to 261kWh with 30kW to 125kW AC power, air or liquid cooling, and IP55 outdoor design.',
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
      {
        href: '/ess-cooling-system',
        label: 'ESS cooling system selection',
        description: 'Match the cooling method to duty cycle, climate, service access, and lifecycle targets.',
      },
      {
        href: '/applications/factory-energy-storage-system',
        label: 'Factory energy storage system',
        description: 'See how manufacturing load profiles drive cabinet capacity, PCS power, and dispatch rules.',
      },
    ],
  },
  {
    path: 'solutions/commercial-peak-shaving',
    kind: 'solution',
    eyebrow: 'Demand management solution',
    title: 'Commercial Battery Storage for Peak Shaving',
    // Picks up the container/cabinet phrasings ("peak shaving battery
    // containers", ~63rd) so the enclosure-format intent lands here rather than
    // on /peak-shaving-battery-storage, which now owns the EMS phrasings.
    seoTitle: 'Peak Shaving Battery Containers and ESS Cabinets',
    description:
      'Peak shaving battery containers vs commercial ESS cabinets: capacity, PCS power, installation space, outdoor rating, and grid connection.',
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
      'Compare air-cooled and liquid-cooled energy storage cabinets by thermal uniformity, power density, maintenance, climate, noise, and cost.',
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
      {
        href: '/ess-cooling-system',
        label: 'ESS cooling system selection',
        description: 'Continue from the comparison to the full cooling selection inputs and quotation scope.',
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
      {
        href: '/battery-box-manual',
        label: 'Battery box manual',
        description: 'Check the assembly and wiring documentation before planning a 48V or 51.2V build.',
      },
      {
        href: '/energy-storage-enclosures',
        label: 'Energy storage enclosure formats',
        description: 'Compare floor-standing, rack, and outdoor enclosure routes for the same cell format.',
      },
    ],
  },
  {
    path: 'high-voltage-bms-for-ess',
    kind: 'category',
    eyebrow: 'ESS rack control hardware',
    title: 'High Voltage BMS for ESS Battery Racks',
    description:
      'High-voltage BMS hardware for ESS projects: BCU master control, BMU slave monitoring, 100A and 200A options, and PCS communication.',
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
      {
        href: '/bmu-battery-module',
        label: 'BMU battery module unit',
        description: 'Review module-level monitoring, balancing, and communication back to the master controller.',
      },
    ],
  },
  {
    path: 'commercial-battery-storage-cabinet',
    kind: 'solution',
    eyebrow: 'C&I energy storage planning',
    title: 'Commercial Battery Storage Cabinet Planning Guide',
    description:
      'Plan a commercial battery storage cabinet: capacity, PCS power, cooling method, outdoor rating, communication, and safety documentation.',
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
      {
        href: '/applications/warehouse-supermarket-battery-storage',
        label: 'Warehouse and supermarket storage',
        description: 'See how refrigeration and lighting load profiles change the cabinet configuration.',
      },
    ],
  },
  {
    path: 'can-rs485-bms-inverter-compatibility',
    kind: 'guide',
    eyebrow: 'Communication compatibility',
    title: 'CAN and RS485 BMS Inverter Compatibility Checklist',
    description:
      'Check BMS and inverter compatibility over CAN or RS485: protocol, firmware, pinout, baud rate, message map, and commissioning tests.',
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
      'JKESS LiFePO4 battery kits, 48V enclosures, high-voltage BMS hardware, and commercial ESS cabinet quotation paths for European buyers.',
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
          'Germany, France, Italy, the Netherlands, Poland, Spain, Austria, Belgium, Sweden, Denmark, and Portugal each have dedicated pages that connect local search wording to the same product and quotation path. These pages create clearer internal links for search engines and give buyers a country-specific checklist before contacting JKESS.',
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
        answer: 'The current Europe cluster includes Germany, France, Italy, the Netherlands, Poland, Spain, Austria, Belgium, Sweden, Denmark, and Portugal, with room to add more country pages as search data and sales priorities develop.',
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
      {
        href: '/europe/spain-lifepo4-battery-kit',
        label: 'Spain solar storage battery kits',
        description: 'Prepare Spanish battery kit, inverter compatibility, EU shipping, and C&I cabinet inputs.',
      },
      {
        href: '/europe/austria-lifepo4-battery-kit',
        label: 'Austria EU warehouse battery kit',
        description: 'Plan Austrian rack kit, caster kit, delivery, and commercial ESS quotation details.',
      },
      {
        href: '/europe/belgium-lifepo4-battery-kit',
        label: 'Belgium battery storage distributor quote',
        description: 'Prepare Belgian product, resale, logistics, and commercial ESS buying requirements.',
      },
      {
        href: '/europe/sweden-lifepo4-battery-kit',
        label: 'Sweden battery kit and ESS quote',
        description: 'Review Swedish battery kit, cold-climate planning, HV BMS, and C&I cabinet inputs.',
      },
      {
        href: '/europe/denmark-lifepo4-battery-kit',
        label: 'Denmark rack battery kit planning',
        description: 'Prepare Danish 6U rack kit, EU shipping, inverter, and C&I ESS quotation details.',
      },
      {
        href: '/europe/portugal-lifepo4-battery-kit',
        label: 'Portugal LiFePO4 battery kits',
        description: 'Plan Portuguese solar storage kit, EU delivery, and commercial ESS cabinet requests.',
      },
    ],
  },
  {
    path: 'europe/germany-lifepo4-battery-kit',
    kind: 'solution',
    eyebrow: 'Germany energy storage buyers',
    title: 'LiFePO4 Battery Kits and ESS Cabinets for Germany',
    description:
      'LiFePO4 battery kits, 48V enclosures, high-voltage BMS, and commercial energy storage cabinets for Germany with EU shipping and quotation support.',
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
      'France quotations for LiFePO4 battery kits, 48V enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU shipping.',
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
    seoTitle: 'LiFePO4 Battery Kits for Italy',
    description:
      'Italy purchases of 48V LiFePO4 enclosures, rack battery kits, high-voltage BMS hardware, and C&I energy storage cabinets with EU shipping.',
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
    seoTitle: 'LiFePO4 Battery Kits for the Netherlands',
    description:
      'Netherlands quotations for LiFePO4 battery kits, 48V enclosures, high-voltage BMS hardware, and commercial energy storage cabinets with EU delivery.',
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
      'Poland EU shipping and quotation review for LiFePO4 battery kits, 48V enclosures, high-voltage BMS boxes, and commercial energy storage cabinets.',
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
      'EU warehouse battery kit checklist: LiFePO4 enclosure, 6U rack kit, delivery country, quantity, inverter compatibility, and shipping details.',
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
      'LiFePO4 battery kit options for Europe: 48V caster enclosures, 6U rack kits, BMS and LCD choices, inverter communication, and EU shipping.',
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
    seoTitle: 'Commercial ESS Cabinet Europe Quotation',
    description:
      'Prepare a commercial energy storage cabinet quotation for Europe: capacity, PCS power, cooling method, site conditions, and delivery country.',
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
      '48V battery enclosure EU shipping: confirm 51.2V LiFePO4 kit format, cell fit, BMS option, inverter protocol, and delivery country.',
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
  {
    path: 'compare',
    kind: 'category',
    eyebrow: 'Battery storage comparison guides',
    title: 'Battery Kit, BMS, and ESS Cabinet Comparison Guides',
    description:
      'Compare JKESS enclosure kits, 48V and 51.2V LiFePO4 platforms, rack and floor-standing formats, and 100A or 200A high-voltage BMS options.',
    intro:
      'Comparison pages help buyers move from a general search to a practical purchase path. Use these guides to understand whether a project needs a 48V-class enclosure kit, a rack-mount battery kit, a high-voltage BMS control box, or a configured commercial energy storage cabinet.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Guide type', value: 'Procurement and engineering comparisons' },
      { label: 'Main products', value: 'Battery kits, HV BMS, C&I ESS cabinets' },
      { label: 'Buyer output', value: 'Clearer product and quote route' },
      { label: 'Best use', value: 'Early selection before quotation' },
    ],
    sections: [
      {
        title: 'Use comparisons before requesting a quote',
        paragraphs: [
          'A buyer may search with a voltage, current, cabinet format, or application keyword without knowing the best product route. A comparison page helps separate mechanical fit, electrical architecture, delivery scope, and commercial quotation needs.',
          'The goal is not to replace engineering review. It is to help customers send JKESS better project inputs, choose the right product page, and avoid treating an enclosure, a BMS control box, and a complete C&I cabinet as interchangeable items.',
        ],
      },
      {
        title: 'What these guides compare',
        paragraphs: [
          'The comparison cluster focuses on decisions that repeatedly affect JKESS inquiries.',
        ],
        bullets: [
          '48V vs 51.2V wording for LiFePO4 battery enclosure projects.',
          'Rack-mount 6U kits vs floor-standing caster enclosure kits.',
          '100A vs 200A high-voltage BMS control hardware for ESS racks.',
          'Battery enclosure kits vs configured C&I energy storage cabinets.',
        ],
      },
      {
        title: 'How to turn a comparison into a quote request',
        paragraphs: [
          'After choosing the likely route, provide voltage, capacity, current, quantity, compatible inverter or PCS, delivery country, site conditions, and required documentation. The written quotation remains the controlling commercial document.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing 51.2V LiFePO4 enclosure kit for residential and small commercial assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount 51.2V LiFePO4 enclosure kit for compact modular battery installations.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BCU or BMU control boxes for high-voltage ESS rack projects.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial energy storage cabinet for project quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Can a comparison page determine final product compatibility?',
        answer: 'No. It can guide the likely product route, but final compatibility depends on cells, inverter or PCS, wiring, protection design, site conditions, and commissioning settings.',
      },
      {
        question: 'Should I request a quote after reading a comparison guide?',
        answer: 'Yes, if the project involves multiple products, bulk quantity, EU delivery review, high-voltage BMS design, or configured C&I cabinet scope.',
      },
      {
        question: 'What is the biggest mistake buyers make?',
        answer: 'The common mistake is treating an enclosure kit, BMS control box, and complete ESS cabinet as the same supply scope. They solve different procurement problems.',
      },
    ],
    related: [
      {
        href: '/compare/48v-vs-51-2v-lifepo4-battery',
        label: '48V vs 51.2V LiFePO4 battery',
        description: 'Understand common voltage wording before selecting a 16S enclosure kit.',
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        label: 'Rack vs floor-standing battery kit',
        description: 'Compare cabinet installation and caster enclosure project requirements.',
      },
      {
        href: '/compare/100a-vs-200a-high-voltage-bms',
        label: '100A vs 200A high-voltage BMS',
        description: 'Choose current class from PCS power, duty cycle, thermal design, and protection hardware.',
      },
      {
        href: '/compare/battery-kit-vs-ci-ess-cabinet',
        label: 'Battery kit vs C&I ESS cabinet',
        description: 'Compare component-level enclosure buying with configured commercial cabinet projects.',
      },
    ],
  },
  {
    path: 'compare/48v-vs-51-2v-lifepo4-battery',
    kind: 'guide',
    eyebrow: 'Voltage wording comparison',
    title: '48V vs 51.2V LiFePO4 Battery: What Buyers Should Check',
    seoTitle: '48V vs 51.2V LiFePO4 Battery',
    description:
      'Compare 48V and 51.2V LiFePO4 battery wording for enclosure projects, including 16S cell count, inverter voltage range, BMS settings, and quotation inputs.',
    intro:
      'Many LiFePO4 batteries sold into 48V-class solar storage projects are built as 16 cells in series with a 51.2V nominal voltage. The words 48V and 51.2V often point to the same voltage class, but buyers still need to confirm inverter limits, BMS settings, cell count, and enclosure fit before ordering.',
    image: '/images/battery-kit-display.webp',
    highlights: [
      { label: 'Common wording', value: '48V class and 51.2V nominal' },
      { label: 'Typical chemistry', value: '16S LiFePO4 battery architecture' },
      { label: 'Main risk', value: 'Voltage label without inverter review' },
      { label: 'Product route', value: 'Battery enclosure kit selection' },
    ],
    sections: [
      {
        title: 'Why both names appear in the market',
        paragraphs: [
          'Lead-acid systems historically used 48V wording, while LiFePO4 batteries are often described from their nominal cell voltage. A 16S LiFePO4 battery uses 16 cells at about 3.2V nominal each, which gives 51.2V nominal.',
          'This does not mean every product or inverter setting is automatically compatible. Charge voltage, discharge cutoff, current limits, communication, and protection logic still need project review.',
        ],
      },
      {
        title: 'What to confirm before selecting an enclosure',
        paragraphs: [
          'The enclosure is only one part of the completed battery. Start with the actual cell model and inverter rather than the voltage phrase alone.',
        ],
        bullets: [
          'Cell count, cell dimensions, terminal layout, busbar route, and compression method.',
          'Inverter voltage window, charge voltage, low-voltage cutoff, and supported battery protocol.',
          'BMS current rating, CAN or RS485 settings, cable pinout, and firmware profile.',
          'Whether the project needs enclosure-only supply or the package including LCD and BMS hardware.',
        ],
      },
      {
        title: 'How this affects EU shipping requests',
        paragraphs: [
          'For EU delivery, the quote should state the selected enclosure format, quantity, delivery country, postal code, and whether cells or other components are excluded. This avoids confusion between a battery enclosure kit and a finished battery pack.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing enclosure kit for 48V-class and 51.2V nominal LiFePO4 assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount 51.2V LiFePO4 enclosure kit for compact battery module projects.',
      },
    ],
    faqs: [
      {
        question: 'Is 48V the same as 51.2V for LiFePO4 batteries?',
        answer: 'Often they refer to the same 16S LiFePO4 voltage class, but the inverter voltage window and BMS settings must still be confirmed.',
      },
      {
        question: 'Can I choose an enclosure from voltage only?',
        answer: 'No. Confirm cell model, dimensions, terminal position, BMS hardware, inverter protocol, and installation format before ordering.',
      },
      {
        question: 'Do JKESS enclosure kits include battery cells?',
        answer: 'No. Compatible LiFePO4 cells are not included unless a written quotation specifically says otherwise.',
      },
    ],
    related: [
      {
        href: '/48v-lifepo4-battery-enclosure',
        label: '48V LiFePO4 battery enclosure selection',
        description: 'Plan enclosure fit, BMS protocol, inverter matching, and installation format.',
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        label: 'Rack vs floor-standing battery kit',
        description: 'Compare 6U rack installation with a caster enclosure format.',
      },
    ],
  },
  {
    path: 'compare/rack-vs-floor-standing-battery-kit',
    kind: 'guide',
    eyebrow: 'Battery enclosure format comparison',
    title: 'Rack Battery Kit vs Floor-Standing Battery Kit',
    description:
      'Rack-mount 6U battery kits vs floor-standing caster kits: installation space, service access, airflow, cable routing, and EU shipping.',
    intro:
      'A rack battery kit and a floor-standing battery kit can both support 51.2V LiFePO4 assembly projects, but they solve different installation problems. The best choice depends on cabinet availability, floor space, service access, airflow, cable route, quantity, and how the completed battery will be maintained.',
    image: '/images/6u-kit/2.webp',
    highlights: [
      { label: 'Rack format', value: '6U, 19-inch cabinet installation' },
      { label: 'Floor format', value: 'Caster enclosure for movable placement' },
      { label: 'Main decision', value: 'Room layout and service strategy' },
      { label: 'Shared check', value: 'Cells, BMS, inverter, delivery scope' },
    ],
    sections: [
      {
        title: 'When a rack kit can be the better route',
        paragraphs: [
          'A 6U rack kit can fit projects where the site already has a suitable 19-inch cabinet, controlled airflow, front service access, and a plan for multiple modular battery units.',
          'Rack width alone is not enough. Cabinet depth, rail position, load rating, cable bend radius, breaker location, and service clearance must all be confirmed.',
        ],
      },
      {
        title: 'When a floor-standing caster kit can be better',
        paragraphs: [
          'A floor-standing caster enclosure can suit rooms where movement, direct floor access, and simple positioning are more important than rack modularity. It can also reduce the need for a separate rack cabinet in some small projects.',
        ],
        bullets: [
          'Use rack format when cabinet infrastructure, module stacking, and front service are already planned.',
          'Use floor-standing format when movement, floor placement, and direct access are more practical.',
          'Check total assembled weight, floor loading, cable route, and ventilation in both cases.',
          'Confirm cells, BMS, LCD, inverter protocol, and included hardware before purchase.',
        ],
      },
      {
        title: 'Shipping and quotation differences',
        paragraphs: [
          'Rack kits and floor-standing kits may have different packaging, handling, and quantity considerations. For EU delivery, provide product option, quantity, delivery postal code, address type, and unloading constraints before payment.',
        ],
      },
    ],
    products: [
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount enclosure kit for 19-inch cabinet LiFePO4 battery projects.',
      },
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing movable enclosure kit for 51.2V LiFePO4 battery assembly.',
      },
    ],
    faqs: [
      {
        question: 'Is a rack battery kit always easier to expand?',
        answer: 'Not always. Rack systems can support modular planning, but expansion still depends on BMS addressing, inverter limits, breaker sizing, cabling, current sharing, and rack capacity.',
      },
      {
        question: 'Does a floor-standing kit require less engineering?',
        answer: 'No. It may simplify placement, but the completed battery still needs correct cell fit, BMS settings, protection, wiring, inverter communication, and commissioning.',
      },
      {
        question: 'Which format is better for EU delivery?',
        answer: 'That depends on quantity, packaging, destination, unloading conditions, and delivery address type. Use the quote form for bulk or project shipments.',
      },
    ],
    related: [
      {
        href: '/rack-battery-enclosures',
        label: '6U rack battery enclosures',
        description: 'Plan 19-inch rack depth, airflow, service clearance, and module expansion.',
      },
      {
        href: '/battery-enclosures',
        label: 'LiFePO4 battery enclosures',
        description: 'Compare floor-standing and rack battery enclosure options.',
      },
    ],
  },
  {
    path: 'compare/100a-vs-200a-high-voltage-bms',
    kind: 'guide',
    eyebrow: 'High-voltage BMS current comparison',
    title: '100A vs 200A High-Voltage BMS: Selection Inputs',
    description:
      'Compare 100A and 200A high-voltage BMS control hardware by PCS power, pack voltage, current rating, contactors, busbars, and thermal design.',
    intro:
      'The choice between 100A and 200A high-voltage BMS hardware should come from the complete ESS rack design, not from a desire for the largest number. PCS power, pack voltage, current profile, thermal design, conductors, contactors, fuses, and protection logic all affect the correct selection.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Options compared', value: '100A and 200A HV BMS hardware' },
      { label: 'Product scope', value: 'Selected BCU or BMU control box' },
      { label: 'Main input', value: 'PCS power and current profile' },
      { label: 'Key warning', value: 'Current class is not complete system power' },
    ],
    sections: [
      {
        title: 'When 100A may be sufficient',
        paragraphs: [
          'A 100A control architecture may suit moderate-current commercial battery racks where the PCS power, pack voltage, cable design, contactor selection, thermal conditions, and duty cycle are consistent with that current class.',
          'It can be the more appropriate choice when the system does not need the added conductor, protection, and thermal requirements of a higher-current architecture.',
        ],
      },
      {
        title: 'When 200A may be required',
        paragraphs: [
          'A 200A option may be considered when PCS power, rack voltage, charge or discharge rate, or short-duration duty cycle requires a higher current path. The rest of the system must also be designed for the higher current.',
        ],
        bullets: [
          'Check busbar, cable, connector, fuse, breaker, contactor, and current-sensor ratings.',
          'Check heat generation, enclosure temperature, cooling path, and operating duty cycle.',
          'Check PCS limits, pre-charge design, insulation monitoring, interlock, and protection thresholds.',
          'Confirm whether the order needs a master control box, slave control box, or a project-specific combination.',
        ],
      },
      {
        title: 'What the listed product includes',
        paragraphs: [
          'The High Voltage Kit listing covers the selected 100A or 200A BCU master control box or BMU slave control box. Battery cells, modules, racks, high-voltage harnesses, contactors, PCS, EMS, installation, and commissioning are excluded unless separately quoted.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BCU or BMU control-box options for engineered high-voltage ESS racks.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet route when the buyer needs a broader integrated system quotation.',
      },
    ],
    faqs: [
      {
        question: 'Is the 200A BMS automatically better than 100A?',
        answer: 'No. Higher current is only useful when the complete rack design, conductors, contactors, thermal path, PCS, and protection system are designed for it.',
      },
      {
        question: 'Does the 100A or 200A option include all BMUs?',
        answer: 'No. Each listed variant is one selected control box. Required quantities depend on the rack topology and final system design.',
      },
      {
        question: 'Can JKESS review which current class fits my project?',
        answer: 'Yes. Send voltage range, PCS power, current profile, module count, protection design, and communication requirements for review.',
      },
    ],
    related: [
      {
        href: '/high-voltage-bms/100a',
        label: '100A high-voltage BMS option',
        description: 'Review moderate-current BCU and BMU selection inputs.',
      },
      {
        href: '/high-voltage-bms/200a',
        label: '200A high-voltage BMS option',
        description: 'Review higher-current control hardware and system boundaries.',
      },
      {
        href: '/bmu-battery-module',
        label: 'BMU battery module unit',
        description: 'Check how many slave units the chosen master current rating has to supervise.',
      },
    ],
  },
  {
    path: 'compare/battery-kit-vs-ci-ess-cabinet',
    kind: 'guide',
    eyebrow: 'Product scope comparison',
    title: 'Battery Kit vs C&I ESS Cabinet: Which Route Fits the Project?',
    seoTitle: 'Battery Kit vs C&I ESS Cabinet',
    description:
      'LiFePO4 battery enclosure kit vs configured C&I ESS cabinet: supply scope, engineering responsibility, capacity, PCS integration, and cooling.',
    intro:
      'A battery kit and a C&I ESS cabinet are not different sizes of the same product. A battery kit is an enclosure and selected integration-hardware route for building a battery from separately sourced cells. A C&I ESS cabinet is a configured project product that can include battery modules, BMS, PCS, EMS, cooling, fire protection, monitoring, and documentation when quoted.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Battery kit route', value: 'Component-level enclosure purchase' },
      { label: 'Cabinet route', value: 'Configured commercial ESS project' },
      { label: 'Main difference', value: 'Supply scope and engineering responsibility' },
      { label: 'Quotation need', value: 'Essential for C&I cabinet projects' },
    ],
    sections: [
      {
        title: 'Choose a battery kit when the project owns integration',
        paragraphs: [
          'A battery kit can make sense when the buyer or installer already controls the cell selection, BMS configuration, inverter matching, protection design, assembly, testing, and commissioning process.',
          'The kit helps define the mechanical enclosure and selected hardware scope, but it does not automatically include cells, inverter, site installation, or a complete energy storage system.',
        ],
      },
      {
        title: 'Choose a C&I cabinet when the project needs system scope',
        paragraphs: [
          'A C&I cabinet route is more appropriate when the project needs coordinated battery modules, BMS, PCS, EMS, cooling, enclosure, fire protection, monitoring, factory testing, and documentation.',
        ],
        bullets: [
          'Use battery kits for residential, rack, demo, or small commercial assembly projects with known cells and electronics.',
          'Use C&I cabinets for peak shaving, backup, solar self-consumption, and commercial sites needing a configured system.',
          'Request cabinet quotation with load profile, capacity target, AC power, site conditions, grid data, and delivery scope.',
          'Confirm whether freight, duty, tax, installation, commissioning, and training are included or excluded.',
        ],
      },
      {
        title: 'How to avoid scope confusion',
        paragraphs: [
          'Before comparing prices, compare the included items. A low-cost enclosure kit and a configured ESS cabinet serve different procurement responsibilities. The signed written quotation should define the final scope for any project beyond simple product purchase.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Enclosure and selected hardware route for floor-standing 51.2V LiFePO4 assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount enclosure route for compact LiFePO4 battery module assembly.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial ESS cabinet route for project quotation review.',
      },
    ],
    faqs: [
      {
        question: 'Is a battery kit a complete energy storage system?',
        answer: 'No. It is an enclosure and selected hardware package. Cells, inverter, protection equipment, assembly, installation, and commissioning are separate unless quoted.',
      },
      {
        question: 'Why does the C&I ESS cabinet require a quote?',
        answer: 'The final capacity, PCS power, cooling, fire protection, monitoring, documentation, freight, and services vary by project and must be confirmed in writing.',
      },
      {
        question: 'Can one project use both routes?',
        answer: 'Yes. Some buyers purchase low-voltage kits for smaller systems and request a configured C&I cabinet for commercial sites, but the scope should be separated clearly.',
      },
    ],
    related: [
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Plan capacity, PCS power, cooling, safety documentation, and logistics.',
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        label: 'Rack vs floor-standing battery kit',
        description: 'Compare two low-voltage enclosure routes before considering C&I cabinets.',
      },
    ],
  },
]

const searchConsoleLandingPages: NonBrandLandingPage[] = [
  {
    path: 'battery-box-manual',
    kind: 'guide',
    eyebrow: 'JKESS battery box documents',
    title: 'JKESS Battery Box Manual and Battery Kit Downloads',
    description:
      'Find JKESS battery box manual downloads, 6U rack battery kit specifications, roller battery enclosure documents, LCD manuals, and BMS resources.',
    intro:
      'Customers searching for a JKESS battery box manual usually need the correct enclosure document before assembly, installation, or quotation review. This page points buyers to the current battery kit downloads and explains which document fits each enclosure route.',
    image: '/images/downloads-banner-bg.webp',
    highlights: [
      { label: 'Primary search', value: 'JKESS battery box manual' },
      { label: 'Covered products', value: 'Caster battery box and 6U rack kit' },
      { label: 'Document types', value: 'Manuals, specifications, LCD, BMS support' },
      { label: 'Next step', value: 'Download files or request confirmation' },
    ],
    sections: [
      {
        title: 'Which manual should a battery box buyer use?',
        paragraphs: [
          'Use the roller lithium battery sheet metal kit manual for the floor-standing caster battery enclosure route. Use the 6U lithium battery kit specification when the project is based on a 19-inch rack-mount battery module.',
          'If the project also includes LCD, BMS, communication accessories, or high-voltage control hardware, review the accessory and high-voltage downloads together with the product page.',
        ],
        bullets: [
          'Check the product form factor before downloading: floor-standing caster box or 6U rack enclosure.',
          'Confirm cell dimensions, BMS option, LCD requirement, inverter protocol, and cable route before assembly.',
          'Use the Downloads page when searching for JKESS battery box manual, JK BA424S manual, or battery kit datasheet terms.',
        ],
      },
      {
        title: 'When to ask JKESS before assembly',
        paragraphs: [
          'A manual does not replace project confirmation. Send the cell model, inverter model, BMS requirement, quantity, destination country, and installation environment if the battery box is being used for a customer project or resale order.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing JKESS battery box route for 51.2V LiFePO4 enclosure projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount battery enclosure route for compact 51.2V LiFePO4 module projects.',
      },
    ],
    faqs: [
      {
        question: 'Where can I download the JKESS battery box manual?',
        answer: 'Use the Downloads page and open the Kits category for the roller battery enclosure manual and 6U battery kit specification.',
      },
      {
        question: 'Is the manual enough to confirm cell compatibility?',
        answer: 'No. Confirm the exact cell dimensions, terminal layout, BMS hardware, inverter protocol, and enclosure option before ordering or assembly.',
      },
      {
        question: 'Does JKESS provide BMS and LCD manuals?',
        answer: 'Yes. Accessory, BMS, and high-voltage control documents are listed in the technical Downloads library where available.',
      },
    ],
    related: [
      {
        href: '/downloads',
        label: 'JKESS downloads',
        description: 'Open battery kit manuals, specifications, BMS documents, LCD manuals, and high-voltage control files.',
      },
      {
        href: '/battery-enclosures',
        label: 'Battery enclosure selection guide',
        description: 'Choose the correct battery box route before using the manual for assembly planning.',
      },
    ],
  },
  {
    path: 'ess-cooling-system',
    kind: 'guide',
    eyebrow: 'ESS cooling system selection',
    title: 'ESS Cooling System Guide: Air-Cooled and Liquid-Cooled Storage',
    seoTitle: 'ESS Cooling System: Air vs Liquid Cooling',
    description:
      'Compare ESS cooling options for commercial storage cabinets: air cooling vs liquid cooling, duty cycle, climate, maintenance, and cost.',
    intro:
      'Cooling is one of the main design choices in a commercial energy storage system. Buyers searching for ESS cooling, air-cooling ESS, or air cooled energy storage system should compare the thermal method against power density, ambient conditions, operating schedule, service capability, and final cabinet scope.',
    image: '/images/tness-ci-ess/main-3.webp',
    highlights: [
      { label: 'Search intent', value: 'ESS cooling system' },
      { label: 'Common options', value: 'Air cooling and liquid cooling' },
      { label: 'Main inputs', value: 'Duty cycle, C-rate, climate, footprint' },
      { label: 'Product route', value: 'Configured C&I ESS cabinet' },
    ],
    sections: [
      {
        title: 'How air-cooled energy storage is evaluated',
        paragraphs: [
          'An air cooled energy storage system uses controlled airflow, fans, ducts, heat exchangers, and cabinet control logic to manage battery temperature. It can be appropriate when power density, ambient conditions, dust exposure, acoustic limits, and service expectations fit the project.',
        ],
        bullets: [
          'Review airflow path, filter access, fan redundancy, cabinet spacing, and room ventilation.',
          'Confirm ambient temperature, altitude, humidity, dust, salt mist, and outdoor exposure.',
          'Check whether the cabinet duty cycle creates short peaks or sustained high thermal load.',
        ],
      },
      {
        title: 'When liquid cooling should be reviewed',
        paragraphs: [
          'Liquid cooling is often reviewed when high cabinet density, sustained charge or discharge, hot ambient conditions, or tighter cell temperature uniformity is required. It can improve thermal control, but introduces pumps, coolant circuits, leak detection, and additional service requirements.',
        ],
      },
      {
        title: 'Quotation inputs for the cooling system',
        paragraphs: [
          'Send the required kWh, PCS power, operating schedule, charge and discharge duration, installation country, minimum and maximum ambient temperature, available footprint, and maintenance constraints. The final quotation should identify the supplied thermal-management system.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configurable commercial cabinet platform with project-specific air-cooled or liquid-cooled options.',
      },
    ],
    faqs: [
      {
        question: 'Is air cooling enough for every ESS cabinet?',
        answer: 'No. Air cooling can be suitable for many projects, but cabinet density, duty cycle, climate, and temperature-uniformity requirements must be reviewed.',
      },
      {
        question: 'Is liquid cooling always better?',
        answer: 'No. Liquid cooling can support tighter thermal control, but it adds coolant circuits, pumps, leak monitoring, and service requirements.',
      },
      {
        question: 'Can JKESS quote both cooling routes?',
        answer: 'Selected C&I cabinet configurations can be reviewed with intelligent air cooling or liquid cooling depending on the project scope.',
      },
    ],
    related: [
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'Air-cooled vs liquid-cooled ESS',
        description: 'Detailed comparison of thermal-management choices for commercial ESS cabinets.',
      },
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Plan capacity, PCS power, cooling method, site conditions, and quote scope.',
      },
    ],
  },
  {
    path: 'peak-shaving-battery-storage',
    kind: 'solution',
    eyebrow: 'Commercial peak shaving ESS',
    title: 'Peak Shaving With Battery Energy Storage Systems',
    // This page's strongest signal is "peak shaving ems" (~30th). Leaning the
    // SERP title into EMS/sizing keeps it from competing with
    // /solutions/commercial-peak-shaving for the same container queries.
    seoTitle: 'Peak Shaving EMS and Battery Storage Sizing',
    description:
      'How a peak shaving EMS dispatches battery storage: interval load data, demand-charge rules, target kW reduction, PCS power, and usable kWh.',
    intro:
      'Peak shaving uses battery energy storage to reduce short grid-import peaks that drive demand charges or contracted-capacity limits. The correct system cannot be selected from cabinet kWh alone; it must be sized from load data, tariff structure, peak duration, PCS power, EMS strategy, and reserve requirements.',
    image: '/images/tness-ci-ess/main-2.webp',
    highlights: [
      { label: 'Main search', value: 'Peak shaving with battery storage' },
      { label: 'Control layer', value: 'EMS, PCS, meter, dispatch threshold' },
      { label: 'Sizing input', value: 'Interval load data and tariff rules' },
      { label: 'Product route', value: 'C&I ESS cabinet quotation' },
    ],
    sections: [
      {
        title: 'What data is needed before sizing',
        paragraphs: [
          'The most useful starting point is measured 15-minute or finer interval load data. This shows how high the peaks are, how long they last, how often they repeat, and whether the battery has time to recharge between events.',
        ],
        bullets: [
          'Demand charge rules, contracted capacity, tariff periods, and export restrictions.',
          'Target kW reduction, required backup reserve, and allowable state-of-charge window.',
          'Existing solar generation, generators, EV charging, large motors, or variable production loads.',
        ],
      },
      {
        title: 'Battery containers and cabinets for peak shaving',
        paragraphs: [
          'Some buyers search for peak shaving battery containers, while others need compact commercial ESS cabinets. The right enclosure format depends on required capacity, PCS power, installation space, outdoor rating, fire protection, grid connection, and service access.',
        ],
      },
      {
        title: 'EMS logic matters',
        paragraphs: [
          'A peak-shaving EMS must decide when to discharge, how much reserve to keep, when to recharge, and how to avoid creating a second peak later in the billing period. Communication with meters, PCS, BMS, and site monitoring should be confirmed before quotation.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial ESS cabinet route for peak shaving, backup, and solar self-consumption projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BMS control hardware route for integrators building custom high-voltage ESS racks.',
      },
    ],
    faqs: [
      {
        question: 'Can peak shaving be sized from one electricity bill?',
        answer: 'Usually not. Bills show monthly charges, but interval data is needed to understand peak duration, frequency, and dispatch timing.',
      },
      {
        question: 'Does peak shaving require an EMS?',
        answer: 'Yes. The battery needs control logic connected to metering, PCS, BMS, and site constraints to discharge at the right time.',
      },
      {
        question: 'Can the same battery provide backup power?',
        answer: 'Yes, but backup reserve reduces the energy available for peak shaving unless the system is sized for both objectives.',
      },
    ],
    related: [
      {
        href: '/solutions/commercial-peak-shaving',
        label: 'Commercial peak shaving sizing',
        description: 'Review the existing peak-shaving solution page and required project inputs.',
      },
      {
        href: '/commercial-energy-storage',
        label: 'Commercial energy storage overview',
        description: 'Compare capacity, PCS power, cooling, monitoring, and quotation scope.',
      },
      {
        href: '/applications/factory-energy-storage-system',
        label: 'Factory energy storage system',
        description: 'Apply the same demand-charge logic to a manufacturing site with shift-based load peaks.',
      },
    ],
  },
  {
    path: 'bmu-battery-module',
    kind: 'guide',
    eyebrow: 'BMU and ESS BMS guide',
    title: 'BMU Battery Module Unit and Slave Control Box Selection',
    // Definitional BMU queries ("what is a bmu", "bmu meaning") are left to
    // /guides/bcu-vs-bmu, which already outranks this page on them. This page
    // targets the hardware-selection intent instead so the two stop competing.
    seoTitle: 'BMU Battery Module Unit and Slave Control Box',
    description:
      'BMU slave control box selection for an ESS BMS: module-level cell monitoring, balancing, and reporting to the BCU master over CAN or RS485.',
    intro:
      'A BMU, or battery monitoring unit, is normally the module-level control and measurement layer in a high-voltage battery management system. Buyers searching for BMU battery, BMU module, or BMU BMS hardware are usually specifying how many slave units a rack needs and how they report to the BCU master.',
    image: '/images/hv-kit/1.jpg',
    highlights: [
      { label: 'Primary term', value: 'BMU battery module' },
      { label: 'System role', value: 'Cell voltage and temperature monitoring' },
      { label: 'Master layer', value: 'BCU coordinates rack control' },
      { label: 'Interfaces', value: 'CAN, RS485, isolated internal bus' },
    ],
    sections: [
      {
        title: 'What a BMU does',
        paragraphs: [
          'A BMU typically collects cell voltage, temperature, balancing status, and module-level diagnostic information. It sends this information upstream to the BCU or rack master controller so the system can calculate limits, alarms, and operating status.',
        ],
        bullets: [
          'Monitors cell and temperature channels assigned to the module or slave box.',
          'Supports balancing or reports balancing status depending on the architecture.',
          'Communicates with the BCU, which then interfaces with PCS, EMS, or inverter systems.',
        ],
      },
      {
        title: 'Why BMU quantity is project-specific',
        paragraphs: [
          'One BMU is not automatically enough for a rack. Required quantity depends on cell count, module layout, channel count, isolation design, wiring route, and the selected high-voltage BMS architecture.',
        ],
      },
      {
        title: 'BMU, BCU, CAN, and RS485 compatibility',
        paragraphs: [
          'Physical ports are not enough to prove compatibility. Confirm protocol, message map, address handling, baud rate, firmware version, state logic, alarms, and commissioning settings before purchasing ESS BMS hardware.',
        ],
      },
    ],
    products: [
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: '100A and 200A BCU or BMU control-box options for engineered high-voltage ESS racks.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet route when the buyer needs complete system scope instead of BMS hardware only.',
      },
    ],
    faqs: [
      {
        question: 'What is a BMU in battery systems?',
        answer: 'A BMU is a battery monitoring unit used to collect module-level cell and temperature information and report it to the rack-level controller.',
      },
      {
        question: 'Is a BMU the same as a complete BMS?',
        answer: 'No. A BMU is one part of the BMS architecture. A complete system also needs master control, sensors, contactors, wiring, protection, and communication logic.',
      },
      {
        question: 'Can JKESS help select BMU quantity?',
        answer: 'Yes. Send rack voltage, cell count, module arrangement, current requirement, PCS interface, and communication requirements for review.',
      },
    ],
    related: [
      {
        href: '/guides/bcu-vs-bmu',
        label: 'BCU vs BMU guide',
        description: 'Compare master and slave controller roles in high-voltage BMS architecture.',
      },
      {
        href: '/can-rs485-bms-inverter-compatibility',
        label: 'CAN and RS485 compatibility',
        description: 'Check communication requirements before selecting BMS hardware.',
      },
    ],
  },
  {
    path: 'ess-rack-mount-battery-modules',
    kind: 'category',
    eyebrow: 'Rack battery enclosure planning',
    title: 'ESS Rack Mount Battery Modules and 6U Enclosures',
    description:
      'ESS rack-mount battery modules: 6U enclosures, 19-inch rack fit, airflow, service access, cell compatibility, and BMS wiring.',
    intro:
      'Rack mount battery modules are common in telecom rooms, residential storage cabinets, and compact commercial ESS assemblies. Before selecting a 6U enclosure, confirm rack depth, rail load, airflow, cable routing, cell dimensions, BMS option, and service access.',
    image: '/images/6u-kit/1.webp',
    highlights: [
      { label: 'Search intent', value: 'ESS rack mount battery modules' },
      { label: 'Form factor', value: '6U, 19-inch rack enclosure' },
      { label: 'Main checks', value: 'Depth, airflow, cell fit, wiring' },
      { label: 'Product route', value: '6U Battery Kit' },
    ],
    sections: [
      {
        title: 'Mechanical rack checks',
        paragraphs: [
          'A rack-mount battery enclosure must fit the actual cabinet, not only the nominal 19-inch width. Depth, rail position, front and rear clearance, floor loading, cable bend radius, and service access should be confirmed before ordering.',
        ],
      },
      {
        title: 'Electrical integration checks',
        paragraphs: [
          'The completed rack battery module needs compatible cells, BMS current rating, LCD or communication accessories, inverter protocol, protection hardware, and commissioning settings. Enclosure selection should follow these electrical inputs.',
        ],
        bullets: [
          'Confirm 51.2V nominal 16S LiFePO4 platform requirements.',
          'Confirm CAN or RS485 communication and inverter protocol before assembly.',
          'Confirm airflow path and heat generation for the intended current profile.',
        ],
      },
    ],
    products: [
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount 51.2V LiFePO4 enclosure kit for compact battery module projects.',
      },
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing enclosure alternative when rack infrastructure is not available.',
      },
    ],
    faqs: [
      {
        question: 'Is every 6U battery kit compatible with every rack?',
        answer: 'No. Confirm rack depth, rail rating, mounting position, airflow, cable route, and service clearance.',
      },
      {
        question: 'Are cells included in the rack battery module enclosure?',
        answer: 'No. JKESS enclosure kits do not include cells unless a written quotation states otherwise.',
      },
      {
        question: 'Can JKESS review rack cabinet compatibility?',
        answer: 'Yes. Send rack dimensions, target cells, BMS option, inverter model, quantity, and destination country.',
      },
    ],
    related: [
      {
        href: '/rack-battery-enclosures',
        label: 'Rack battery enclosures',
        description: 'Review 6U enclosure planning details and product options.',
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        label: 'Rack vs floor-standing battery kit',
        description: 'Compare rack and caster enclosure formats before purchase.',
      },
    ],
  },
  {
    path: 'energy-storage-enclosures',
    kind: 'category',
    eyebrow: 'Battery enclosure manufacturing',
    title: 'Energy Storage Enclosures for Lithium Battery Projects',
    seoTitle: 'Energy Storage Enclosures for Lithium Projects',
    description:
      'Energy storage enclosures for lithium battery projects: battery box manufacturing, 48V LiFePO4 kits, 6U rack enclosures, and C&I cabinet scope.',
    intro:
      'Energy storage enclosure searches can refer to several different products: a low-voltage battery box, a 6U rack battery enclosure, high-voltage BMS control hardware, or a configured commercial ESS cabinet. The right route depends on whether the buyer needs only mechanical enclosure supply or a broader engineered system.',
    image: '/images/battery-kit-system.webp',
    highlights: [
      { label: 'Search intent', value: 'Energy storage enclosures' },
      { label: 'Material route', value: 'Sheet-metal battery enclosure kits' },
      { label: 'Battery platform', value: '48V / 51.2V LiFePO4 projects' },
      { label: 'Project route', value: 'Enclosure kit or C&I cabinet' },
    ],
    sections: [
      {
        title: 'Enclosure kit versus complete ESS cabinet',
        paragraphs: [
          'A battery enclosure kit helps house cells and selected integration hardware. It is not automatically a complete energy storage system. A C&I ESS cabinet can include a wider project scope such as modules, BMS, PCS, EMS, cooling, fire protection, monitoring, and documentation when quoted.',
        ],
      },
      {
        title: 'Lithium battery enclosure manufacturing checks',
        paragraphs: [
          'Before comparing enclosure options, confirm cell dimensions, compression needs, busbar route, insulation clearance, terminal position, BMS hardware, cable exits, weight, ventilation, and installation environment.',
        ],
        bullets: [
          'Use floor-standing caster enclosure when movement and direct floor access matter.',
          'Use 6U rack enclosure when 19-inch cabinet infrastructure and modular stacking are planned.',
          'Use C&I cabinet quotation when the project requires PCS, EMS, cooling, and broader system documentation.',
        ],
      },
    ],
    products: [
      {
        slug: 'battery-kit',
        label: 'Battery Kit With Caster',
        description: 'Floor-standing energy storage enclosure for compatible 51.2V LiFePO4 assembly projects.',
      },
      {
        slug: '6u-battery-kit',
        label: '6U Battery Kit',
        description: 'Rack-mount energy storage enclosure for compact 51.2V LiFePO4 module projects.',
      },
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured commercial cabinet route when the buyer needs a complete system quotation.',
      },
    ],
    faqs: [
      {
        question: 'Does an energy storage enclosure include battery cells?',
        answer: 'JKESS enclosure kits do not include cells unless a written quotation specifically includes them.',
      },
      {
        question: 'Can JKESS support enclosure manufacturing for lithium batteries?',
        answer: 'JKESS supplies battery enclosure kit routes and configured ESS cabinet routes. Final scope depends on the selected product and quotation.',
      },
      {
        question: 'Which enclosure should I choose?',
        answer: 'Choose from cell dimensions, installation format, BMS and inverter requirements, service access, logistics, and whether the project needs a complete cabinet system.',
      },
    ],
    related: [
      {
        href: '/battery-enclosures',
        label: 'LiFePO4 battery enclosures',
        description: 'Review floor-standing and rack battery enclosure options.',
      },
      {
        href: '/compare/battery-kit-vs-ci-ess-cabinet',
        label: 'Battery kit vs C&I ESS cabinet',
        description: 'Understand the difference between enclosure supply and complete cabinet quotation.',
      },
    ],
  },
  {
    path: 'commercial-ess-cabinet-manufacturer',
    kind: 'solution',
    eyebrow: 'C&I ESS sourcing',
    title: 'Commercial ESS Cabinet Manufacturer and Custom Sourcing Guide',
    // Ranks ~3rd for "c&i ess custom sourcing" with no clicks. The old SERP
    // title ran to 68 characters and never showed the literal "C&I" the buyer
    // typed, so nothing in the result matched their query visually.
    seoTitle: 'C&I ESS Cabinet Custom Sourcing & Manufacturing',
    description:
      'C&I ESS cabinet custom sourcing: configuration, cooling, PCS, EMS, BMS, certification documents, lead time, and what to send for a quotation.',
    intro:
      'Buyers searching for an ESS cabinet manufacturer or C&I ESS custom sourcing usually need more than a product card. A commercial cabinet quotation should define capacity, AC power, PCS, EMS, BMS, cooling, fire protection, site conditions, documentation, shipping, and installation boundary.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Search intent', value: 'Commercial ESS cabinet manufacturer' },
      { label: 'Project type', value: 'Industrial and commercial energy storage cabinet' },
      { label: 'Scope', value: 'Battery modules, PCS, EMS, BMS, cooling' },
      { label: 'Commercial path', value: 'Custom quotation review' },
    ],
    sections: [
      {
        title: 'What custom sourcing must define',
        paragraphs: [
          'A C&I ESS cabinet should be sourced from a written project scope, not only a model name. The quotation should state included capacity, PCS power, cooling method, communication, monitoring, safety equipment, documents, freight, and any excluded installation work.',
        ],
        bullets: [
          'Application: peak shaving, backup, solar self-consumption, demand management, or hybrid use.',
          'Site inputs: country, ambient temperature, altitude, grid voltage, footprint, access, and maintenance limits.',
          'Commercial inputs: delivery term, documentation, warranty, commissioning support, and quantity.',
        ],
      },
      {
        title: 'When to choose a cabinet instead of parts',
        paragraphs: [
          'A cabinet route is better when the buyer needs coordinated system scope. Component sourcing can work for experienced integrators, but they must own the engineering responsibility for rack design, PCS compatibility, protection, thermal design, and commissioning.',
        ],
      },
      {
        title: 'C&I energy storage system cases',
        paragraphs: [
          'Typical C&I cases include demand-charge reduction, backup for critical loads, solar self-consumption, EV charging support, and facility energy management. Each case changes the required power, energy, EMS logic, and reserve strategy.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Quotation-based commercial cabinet platform for configured C&I energy storage projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BMS control hardware route for integrators sourcing components for custom ESS racks.',
      },
    ],
    faqs: [
      {
        question: 'Can JKESS act as a commercial ESS cabinet manufacturer for custom projects?',
        answer: 'JKESS can review configured C&I cabinet projects and provide quotation-based supply scope according to the final project requirements.',
      },
      {
        question: 'Why is the C&I cabinet not sold with a fixed online price?',
        answer: 'Capacity, PCS power, cooling, documentation, shipping, installation boundary, and site requirements vary by project, so the final scope must be quoted.',
      },
      {
        question: 'What should I send for C&I ESS custom sourcing?',
        answer: 'Send application, target capacity, AC power, site country, grid information, cooling preference, monitoring needs, delivery scope, and required documents.',
      },
    ],
    related: [
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Prepare the technical inputs needed for an accurate cabinet quotation.',
      },
      {
        href: '/peak-shaving-battery-storage',
        label: 'Peak shaving battery storage',
        description: 'Review a common C&I use case before cabinet sizing.',
      },
      {
        href: '/applications/solar-self-consumption-battery-storage',
        label: 'Solar self-consumption battery storage',
        description: 'Plan PV surplus capture, EMS control, and cabinet configuration inputs.',
      },
      {
        href: '/quote-preparation/commercial-ess-project-checklist',
        label: 'Commercial ESS quote checklist',
        description: 'Prepare load data, site conditions, documents, logistics, and project scope before requesting a quote.',
      },
    ],
  },
  {
    path: 'applications/solar-self-consumption-battery-storage',
    kind: 'solution',
    eyebrow: 'Solar self-consumption storage',
    title: 'Battery Storage for Solar Self-Consumption in Commercial Sites',
    seoTitle: 'Solar Self-Consumption Battery Storage',
    description:
      'Commercial battery storage for solar self-consumption: PV surplus capture, PCS sizing, EMS control, backup reserve, and cooling.',
    intro:
      'Commercial solar self-consumption projects use battery storage to capture PV energy that would otherwise be exported, curtailed, or used at a lower value. The storage system should be sized from PV production, load profile, tariff rules, export limits, backup reserve, and site operating schedule.',
    image: '/images/tness-ci-ess/main-2.webp',
    highlights: [
      { label: 'Application', value: 'Commercial solar self-consumption' },
      { label: 'Main inputs', value: 'PV curve, load profile, export rules' },
      { label: 'Control layer', value: 'EMS, PCS, BMS, meter integration' },
      { label: 'Product route', value: 'Configured C&I ESS cabinet quotation' },
    ],
    sections: [
      {
        title: 'Start from PV production and site load',
        paragraphs: [
          'A solar storage cabinet should not be selected from PV capacity alone. The useful battery capacity depends on how much daytime PV surplus exists, when the site consumes power, whether export is limited, and how much energy should be reserved for backup.',
          'For a faster review, provide PV inverter capacity, historical generation data where available, interval load data, export rules, AC connection point, and the target operating objective.',
        ],
        bullets: [
          'Shift daytime PV surplus into evening or tariff-peak periods.',
          'Reduce export, curtailment, or low-value grid feed-in where local rules allow.',
          'Reserve part of the battery for backup only when the electrical architecture supports it.',
        ],
      },
      {
        title: 'How the cabinet configuration is reviewed',
        paragraphs: [
          'The correct cabinet configuration depends on usable kWh, PCS power, charge duration, discharge duration, cooling method, outdoor rating, monitoring, and local documentation requirements. The final quotation should define whether PV coupling, EMS logic, installation, and commissioning are included or excluded.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet route for solar self-consumption, backup reserve, and commercial energy management.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BMS control hardware route for integrators building custom high-voltage PV storage racks.',
      },
    ],
    faqs: [
      {
        question: 'Can battery storage increase solar self-consumption?',
        answer: 'Yes, when there is usable PV surplus and the EMS can charge and discharge according to load, tariff, export, and reserve rules.',
      },
      {
        question: 'What data is needed for a solar storage quote?',
        answer: 'Send PV capacity, inverter model, generation profile, load data, export rules, target backup reserve, site country, and available installation space.',
      },
      {
        question: 'Is this the same as peak shaving?',
        answer: 'Not exactly. Solar self-consumption focuses on PV energy use, while peak shaving focuses on reducing demand peaks. One system can be designed for both if the capacity and control strategy allow it.',
      },
    ],
    related: [
      {
        href: '/peak-shaving-battery-storage',
        label: 'Peak shaving battery storage',
        description: 'Compare demand reduction with solar self-consumption control objectives.',
      },
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Prepare capacity, PCS power, cooling, and project quote inputs.',
      },
    ],
  },
  {
    path: 'applications/commercial-backup-power-battery-storage',
    kind: 'solution',
    eyebrow: 'Commercial backup storage',
    title: 'Commercial Backup Power Battery Storage Planning Guide',
    seoTitle: 'Commercial Backup Power Battery Storage',
    description:
      'Plan commercial backup power with battery storage: critical-load selection, backup duration, PCS power, transfer architecture, and reserve strategy.',
    intro:
      'Backup power projects require a different review from simple energy shifting. The first question is which loads must stay online, how long they must run, and whether the site electrical design supports automatic transfer, islanding, or only supported load backup.',
    image: '/images/tness-ci-ess/main-4.webp',
    highlights: [
      { label: 'Application', value: 'Commercial backup power' },
      { label: 'Sizing basis', value: 'Critical load kW and backup hours' },
      { label: 'Electrical review', value: 'Transfer, islanding, protection' },
      { label: 'Product route', value: 'Configured C&I ESS cabinet' },
    ],
    sections: [
      {
        title: 'Define critical loads before capacity',
        paragraphs: [
          'A backup storage system should be sized from the supported load list rather than the total site load. Separate critical lighting, servers, controls, security, refrigeration, pumps, production equipment, or emergency circuits from non-critical loads.',
        ],
        bullets: [
          'List each critical load, rated power, startup current, and required backup duration.',
          'Confirm whether the battery must support black start, UPS-like transfer, or longer-duration backup.',
          'Review local electrical code, transfer equipment, protection coordination, and grid interconnection rules.',
        ],
      },
      {
        title: 'Reserve strategy and daily operation',
        paragraphs: [
          'If the same battery is also used for peak shaving or solar self-consumption, the EMS must reserve enough state of charge for backup. This reserve reduces the energy available for daily economic dispatch unless the system is sized for both functions.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Quotation-based cabinet platform for commercial backup, peak shaving, and solar storage projects.',
      },
    ],
    faqs: [
      {
        question: 'Can a C&I battery cabinet replace a generator?',
        answer: 'It can support selected backup loads when designed correctly, but generator replacement depends on runtime, load profile, transfer architecture, local rules, and redundancy requirements.',
      },
      {
        question: 'What should I send for backup sizing?',
        answer: 'Send the critical-load list, required backup duration, single-line diagram, site voltage, transfer requirement, installation country, and any grid or fire-safety documentation needs.',
      },
      {
        question: 'Can backup and peak shaving run on the same battery?',
        answer: 'Yes, but the EMS must reserve state of charge for backup, and this reserve must be included in the system sizing.',
      },
    ],
    related: [
      {
        href: '/applications/solar-self-consumption-battery-storage',
        label: 'Solar self-consumption battery storage',
        description: 'Plan PV surplus capture and backup reserve together.',
      },
      {
        href: '/peak-shaving-battery-storage',
        label: 'Peak shaving battery storage',
        description: 'Review demand-charge reduction and EMS dispatch requirements.',
      },
      {
        href: '/applications/warehouse-supermarket-battery-storage',
        label: 'Warehouse and supermarket storage',
        description: 'Compare backup priorities for sites where refrigeration cannot be interrupted.',
      },
    ],
  },
  {
    path: 'applications/ev-charging-station-battery-storage',
    kind: 'solution',
    eyebrow: 'EV charging site storage',
    title: 'Battery Storage for EV Charging Stations',
    description:
      'Battery storage for EV charging stations: grid capacity limits, peak shaving, solar charging, charger power, and EMS control.',
    intro:
      'EV charging sites can create sharp demand peaks that exceed transformer capacity or increase demand charges. Battery storage can buffer charger load, support solar charging, and reduce grid peaks when the PCS, EMS, and charger control strategy are designed together.',
    image: '/images/tness-ci-ess/main-5.webp',
    highlights: [
      { label: 'Application', value: 'EV charging station battery storage' },
      { label: 'Main issue', value: 'Grid capacity and demand peaks' },
      { label: 'Sizing input', value: 'Charger power, sessions, daily energy' },
      { label: 'Product route', value: 'C&I ESS cabinet quotation' },
    ],
    sections: [
      {
        title: 'Review charger power and grid limits',
        paragraphs: [
          'A battery can help when the charging site has limited grid capacity, expensive peak demand, or variable solar generation. The system must be reviewed against charger count, charger rating, session timing, transformer capacity, grid contract, and expected utilization.',
        ],
        bullets: [
          'Number of AC or DC chargers and maximum simultaneous power.',
          'Expected daily charging sessions, average energy per session, and peak arrival periods.',
          'Grid capacity, transformer rating, demand charges, export limits, and PV generation if present.',
        ],
      },
      {
        title: 'EMS coordination is essential',
        paragraphs: [
          'The EMS should decide when to charge from grid or PV, when to discharge into charging peaks, and how much reserve to keep for site backup or grid constraints. Communication with chargers, meters, PCS, and BMS should be confirmed before quotation.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet platform for EV charging support, peak shaving, and solar charging sites.',
      },
    ],
    faqs: [
      {
        question: 'Can battery storage reduce EV charging demand peaks?',
        answer: 'Yes, if the PCS power, usable kWh, EMS logic, and grid metering are designed around charger demand and utilization.',
      },
      {
        question: 'What data is needed for an EV charging ESS quote?',
        answer: 'Send charger quantity, charger power, utilization estimate, grid capacity, tariff rules, PV information, site country, and installation space.',
      },
      {
        question: 'Can the cabinet support fast chargers directly?',
        answer: 'The final electrical architecture depends on charger type, PCS design, AC or DC coupling, protection, metering, and local interconnection rules.',
      },
    ],
    related: [
      {
        href: '/peak-shaving-battery-storage',
        label: 'Peak shaving with battery storage',
        description: 'Review how batteries reduce short commercial demand peaks.',
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        label: 'ESS cooling system guide',
        description: 'Check thermal-management choices for high-duty charging sites.',
      },
    ],
  },
  {
    path: 'applications/factory-energy-storage-system',
    kind: 'solution',
    eyebrow: 'Factory ESS planning',
    title: 'Factory Energy Storage System for Peak Shaving and Backup',
    seoTitle: 'Factory Energy Storage for Peak Shaving',
    description:
      'Factory energy storage systems for peak shaving, backup power, and solar self-consumption, with EMS control and load data review.',
    intro:
      'Factories often combine high demand peaks, production schedules, motor loads, solar generation, and critical backup needs. A factory ESS should be reviewed from interval load data, production constraints, transformer capacity, backup priorities, and site installation conditions.',
    image: '/images/tness-ci-ess/main-1.webp',
    highlights: [
      { label: 'Application', value: 'Factory energy storage system' },
      { label: 'Use cases', value: 'Peak shaving, backup, solar self-use' },
      { label: 'Key data', value: 'Load profile and production schedule' },
      { label: 'Product route', value: 'C&I ESS cabinet' },
    ],
    sections: [
      {
        title: 'Map the factory load profile',
        paragraphs: [
          'Factory storage sizing should start with measured load data and production timing. Large motors, compressors, furnaces, pumps, HVAC, and process equipment can create short peaks that require a different power-to-energy ratio than office or retail loads.',
        ],
        bullets: [
          'Provide interval load data and production schedule by shift.',
          'Identify critical loads that require backup and non-critical loads that can be shed.',
          'Confirm transformer capacity, grid contract, tariff rules, and expansion plans.',
        ],
      },
      {
        title: 'Installation and safety review',
        paragraphs: [
          'The quotation should define cabinet location, outdoor rating, cooling method, fire protection, access for service, crane or forklift route, electrical boundary, monitoring, and local documentation requirements.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet platform for factory peak shaving, backup, and solar self-consumption.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BMS control hardware route for factory integrators building custom ESS racks.',
      },
    ],
    faqs: [
      {
        question: 'What factory data is needed before sizing ESS?',
        answer: 'Send interval load data, tariff rules, critical load list, production schedule, transformer capacity, backup needs, site country, and available installation space.',
      },
      {
        question: 'Can a factory ESS reduce demand charges?',
        answer: 'Yes, when peak events are predictable enough and the PCS, usable kWh, EMS logic, and metering support peak shaving.',
      },
      {
        question: 'Can the same system support solar self-consumption?',
        answer: 'Yes, if PV generation, load timing, battery capacity, and EMS priorities are reviewed together.',
      },
    ],
    related: [
      {
        href: '/peak-shaving-battery-storage',
        label: 'Peak shaving battery storage',
        description: 'Review demand reduction inputs for factory load profiles.',
      },
      {
        href: '/applications/commercial-backup-power-battery-storage',
        label: 'Commercial backup battery storage',
        description: 'Plan backup reserve and critical-load support.',
      },
    ],
  },
  {
    path: 'applications/warehouse-supermarket-battery-storage',
    kind: 'solution',
    eyebrow: 'Warehouse and retail storage',
    title: 'Battery Storage for Warehouses and Supermarkets',
    description:
      'Battery storage for warehouses and supermarkets: refrigeration backup, peak shaving, solar self-consumption, and EV charging support.',
    intro:
      'Warehouses and supermarkets can have steady daytime loads, refrigeration equipment, HVAC peaks, rooftop solar, and growing EV charging demand. Battery storage can support peak shaving, backup reserve, and solar self-consumption when the site load and critical equipment are defined clearly.',
    image: '/images/tness-ci-ess/main-3.webp',
    highlights: [
      { label: 'Application', value: 'Warehouse and supermarket battery storage' },
      { label: 'Common loads', value: 'Refrigeration, HVAC, lighting, EV charging' },
      { label: 'Use cases', value: 'Backup, peak shaving, solar self-use' },
      { label: 'Product route', value: 'C&I ESS cabinet quotation' },
    ],
    sections: [
      {
        title: 'Separate critical refrigeration and normal loads',
        paragraphs: [
          'For supermarkets and cold-chain warehouses, backup requirements should separate refrigeration, controls, lighting, and safety systems from non-critical loads. The battery reserve strategy depends on how long critical loads must run during an outage.',
        ],
        bullets: [
          'List refrigeration compressors, HVAC, lighting, controls, and emergency systems separately.',
          'Confirm rooftop PV generation and daytime load overlap.',
          'Review EV charging plans because charger peaks can change the storage size.',
        ],
      },
      {
        title: 'Economic and operational review',
        paragraphs: [
          'The storage value can come from demand reduction, PV self-consumption, backup protection, or EV charging support. Each objective changes the battery reserve, discharge schedule, and EMS priorities.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Configured cabinet route for warehouse, retail, refrigeration, and EV charging support.',
      },
    ],
    faqs: [
      {
        question: 'Can battery storage support supermarket refrigeration backup?',
        answer: 'Yes, if critical refrigeration loads, startup current, backup duration, transfer architecture, and reserve strategy are correctly designed.',
      },
      {
        question: 'What information should a warehouse send for a quote?',
        answer: 'Send load data, critical equipment list, PV capacity, EV charging plan, backup duration, site country, and available outdoor or indoor installation space.',
      },
      {
        question: 'Can one cabinet support both peak shaving and backup?',
        answer: 'Yes, but backup reserve must be included in the sizing and EMS dispatch strategy.',
      },
    ],
    related: [
      {
        href: '/applications/commercial-backup-power-battery-storage',
        label: 'Commercial backup power storage',
        description: 'Plan critical-load backup and reserve requirements.',
      },
      {
        href: '/applications/ev-charging-station-battery-storage',
        label: 'EV charging station battery storage',
        description: 'Review charger peak buffering and grid-capacity constraints.',
      },
    ],
  },
  {
    path: 'quote-preparation/commercial-ess-project-checklist',
    kind: 'guide',
    eyebrow: 'ESS quote preparation',
    title: 'Commercial ESS Project Quote Preparation Checklist',
    description:
      'What to send for a commercial ESS quote: load data, target application, capacity, PCS power, cooling, site conditions, and installation boundary.',
    intro:
      'A complete quote request helps suppliers review the correct commercial ESS cabinet configuration faster. Use this checklist before asking for a C&I energy storage cabinet, peak-shaving battery, backup storage system, solar self-consumption battery, or EV charging site storage.',
    image: '/images/contact-banner-bg.webp',
    highlights: [
      { label: 'Best use', value: 'Before requesting a C&I ESS quotation' },
      { label: 'Application inputs', value: 'Peak shaving, backup, solar, EV charging' },
      { label: 'Technical inputs', value: 'Load data, PCS power, cooling, grid data' },
      { label: 'Commercial inputs', value: 'Delivery country, documents, installation scope' },
    ],
    sections: [
      {
        title: 'Project objective',
        paragraphs: [
          'State the primary and secondary objectives. A cabinet used only for peak shaving is sized differently from a system that must also reserve energy for backup or absorb PV surplus.',
        ],
        bullets: [
          'Peak shaving or contracted-capacity reduction.',
          'Solar self-consumption or export limitation.',
          'Backup power for critical loads.',
          'EV charging support or grid-capacity buffering.',
        ],
      },
      {
        title: 'Technical data to send',
        paragraphs: [
          'Send enough data for an initial configuration review. If measured data is not available, provide the best current design estimates and clearly mark them as estimates.',
        ],
        bullets: [
          'Interval load data, monthly bills, tariff rules, and grid capacity.',
          'Target kWh, PCS kW, backup duration, PV capacity, and charger power where relevant.',
          'Site country, ambient temperature range, altitude, humidity, dust, corrosion, and available footprint.',
          'Required cooling method, fire protection, communication, monitoring, and documentation.',
        ],
      },
      {
        title: 'Commercial and logistics scope',
        paragraphs: [
          'Clarify whether the quote should include freight, customs documents, taxes, installation support, commissioning, training, spare parts, and service. Items not listed in the final written quotation should be treated as excluded.',
        ],
      },
    ],
    products: [
      {
        slug: 'tness-ci-ess-cabinet',
        label: 'C&I High Voltage ESS Cabinet',
        description: 'Quotation-based cabinet platform for commercial and industrial storage projects.',
      },
      {
        slug: 'high-voltage-kit',
        label: 'High Voltage Kit',
        description: 'BMS control hardware route when the buyer owns rack engineering responsibility.',
      },
    ],
    faqs: [
      {
        question: 'Can JKESS quote without load data?',
        answer: 'An initial discussion is possible, but accurate sizing for peak shaving, backup, or solar self-consumption requires load and site data.',
      },
      {
        question: 'What is the most common missing input?',
        answer: 'The most common missing inputs are interval load data, backup-load list, site voltage, cooling requirement, and final delivery scope.',
      },
      {
        question: 'Does the quote include installation?',
        answer: 'Only if installation, commissioning, training, or travel support are expressly included in the signed quotation.',
      },
    ],
    related: [
      {
        href: '/commercial-ess-cabinet-manufacturer',
        label: 'Commercial ESS cabinet custom sourcing',
        description: 'Review what must be defined before sourcing a configured cabinet.',
      },
      {
        href: '/commercial-battery-storage-cabinet',
        label: 'Commercial battery storage cabinet planning',
        description: 'Understand capacity, PCS power, cooling, and site-review inputs.',
      },
    ],
  },
]

export const nonBrandLandingPages: NonBrandLandingPage[] = [
  ...baseNonBrandLandingPages,
  ...additionalEuropeanCountryConfigs.map(buildEuropeanCountryPage),
  ...searchConsoleLandingPages,
]

export function getNonBrandLandingPage(path: string) {
  return nonBrandLandingPages.find((page) => page.path === path)
}
