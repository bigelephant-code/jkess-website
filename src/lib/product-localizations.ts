import type { Product, ProductFaq, ProductSeoContent, ProductUseCases } from '@/lib/products'
import { getProductFaqs, getProductSeoContent, getProductUseCases } from '@/lib/products'

export interface LocalizedPurchaseNotice {
  title: string
  description: string
  schemaValue: string
  metadataSentence: string
}

export type LocalizedProduct = Product & {
  localizedFaqs?: ProductFaq[]
}

export interface LocalizedProductPageContent {
  product: LocalizedProduct
  useCases: ProductUseCases
  seoContent: ProductSeoContent
  purchaseNotice: LocalizedPurchaseNotice | null
  shippingMetadataSentence?: string
  isLocalized?: boolean
}

const batteryKitGerman = {
  product: {
    name: 'JKESS Batteriegehäuse-Bausatz mit Rollen',
    categoryLabel: 'Batteriegehäuse-Bausatz mit Rollen',
    tagline: 'Mobiler LiFePO4-Batteriegehäuse-Bausatz mit optionalem BMS und LCD',
    description:
      'Der JKESS Batteriebausatz mit Rollen ist ein robustes Gehäuse- und Montageset zum Aufbau eines mobilen 51,2-V-LiFePO4-Speichers. Er unterstützt Zellen mit 280 Ah bis 320 Ah und ermöglicht nach dem Einbau kompatibler Zellen Speicherkonfigurationen mit 15 kWh oder 16 kWh. Zur Auswahl stehen das reine Gehäusepaket oder das Paket mit dem angegebenen BMS und LCD. Batteriezellen sind nicht enthalten.',
    included: [
      'Robustes Blechgehäuse mit Rollenunterbau',
      'Interne mechanische Teile und Verbindungskomponenten entsprechend dem gewählten Paket',
      'LCD-Anzeige und BMS nur bei Auswahl der Option Gehäuse + LCD + BMS',
      'Standard-Packliste und zutreffende Produktdokumentation',
    ],
    notIncluded: [
      'LiFePO4-Batteriezellen',
      'Wechselrichter, Ladegerät, externer Leistungsschalter und externe Verkabelung',
      'Montage, Installation und Inbetriebnahme vor Ort',
      'Komponenten, die nicht in der gewählten Variante oder der endgültigen Packliste aufgeführt sind',
    ],
    features: [
      'Robuste Rollen für einfacheres Bewegen und Positionieren',
      'Blechgehäuse mit Gehäuseausführung nach Schutzart IP54',
      'Geeignet für LiFePO4-Zellkonfigurationen mit 280 Ah bis 320 Ah',
      'Optionales BMS- und LCD-Paket für Überwachung und Schutz',
      'CAN- und RS485-Kommunikation bei Auswahl eines kompatiblen BMS-Pakets',
      'Ausgelegt für fertig montierte Batteriesysteme mit 15 kWh oder 16 kWh',
      'Skalierbare Projektauslegung abhängig von Wechselrichter, BMS, Schutzschalter und Verkabelung',
      'Ein Jahr Garantie auf die von JKESS gelieferten Hardwarekomponenten',
    ],
    specs: [
      { key: 'Produkttyp', value: 'Batteriegehäuse- und Montagehardware-Bausatz' },
      { key: 'Unterstützte montierte Kapazität', value: '15 kWh / 16 kWh nach Einbau kompatibler Zellen' },
      { key: 'Batteriezellen enthalten', value: 'Nein' },
      { key: 'Paketoptionen', value: 'Nur Gehäuse / Gehäuse + LCD + BMS' },
      { key: 'Kompatible Zellen', value: '280 Ah bis 320 Ah LFP (LiFePO4)' },
      { key: 'Gehäuse', value: 'Blechgehäuse, Ausführung nach IP54' },
      { key: 'Abmessungen', value: '835 × 400 × 280 mm' },
      { key: 'Gewicht', value: 'ca. 28 kg leer, abhängig von der Konfiguration' },
      { key: 'Mobilität', value: 'Vier robuste Rollen, davon zwei mit Bremse' },
      { key: 'Kommunikation', value: 'CAN 2.0 / RS485 mit kompatibler BMS-Option' },
      { key: 'Garantie', value: 'Ein Jahr auf die gelieferte Hardware' },
    ],
  },
  useCases: {
    applications: [
      'Hausnotstrom und Montageprojekte für private Solarspeicher',
      'Mobile Batteriesysteme für Werkstätten, Hütten und Außeneinsätze',
      'Kleine gewerbliche Speicherprojekte mit Bedarf an einfacher Bewegung und Positionierung',
    ],
    compatibleSystems: [
      'Niedervolt-LiFePO4-Batteriesysteme mit 51,2 V',
      'Wechselrichterumgebungen mit CAN 2.0 oder RS485',
      'LFP-Zellkonfigurationen mit 280 Ah bis 320 Ah',
    ],
    selectionNotes: [
      'Gehäuse + LCD + BMS wählen, wenn integrierte Überwachungs- und Schutzhardware benötigt wird.',
      'Nur Gehäuse wählen, wenn Zellen, BMS, Anzeige und weitere Elektronik separat beschafft werden.',
      'Batteriezellen müssen bei jeder Option separat gekauft werden.',
    ],
  },
  seoContent: {
    projectFit:
      'Dieser Batteriegehäuse-Bausatz mit Rollen ist für Niedervolt-LiFePO4-Projekte vorgesehen, bei denen ein mobiles Gehäuse und optional integrierte Überwachungshardware benötigt werden. Nach dem Einbau kompatibler Zellen eignet er sich typischerweise für private Notstromversorgung, kleine gewerbliche Speicher, mobile Arbeitsstromversorgung und Demonstrationssysteme.',
    installationNotes: [
      'Vor der Montage Zellabmessungen, Wechselrichter-Kommunikation und Kabelführung bestätigen.',
      'Ausreichend Bodenfreiheit für Rollenbewegung, Kabelbiegeradius und Belüftung einplanen.',
      'Gehäuse + LCD + BMS wählen, wenn integrierter Schutz und lokale Überwachung erforderlich sind.',
    ],
    procurementNotes: [
      'Für die Kompatibilitätsprüfung gewünschte Gesamtkapazität, Zellmarke, Wechselrichtermodell und Lieferland angeben.',
      'Bei wiederkehrenden Projekten Gehäusefarbe, Logo, Verdrahtungsaufbau und gewünschtes Hardwarepaket bestätigen.',
    ],
  },
  faqs: [
    {
      question: 'Sind im Batteriebausatz mit Rollen Batteriezellen enthalten?',
      answer:
        'Nein. Das Set wird als Gehäuse- und Montagehardware geliefert; je nach gewählter Variante sind zusätzlich LCD und BMS enthalten. Kompatible LiFePO4-Zellen mit 280 Ah bis 320 Ah müssen separat gekauft werden.',
    },
    {
      question: 'Was ist in den einzelnen Batteriebausatz-Optionen enthalten?',
      answer:
        'Die Option Nur Gehäuse umfasst das Gehäuse, den Rollenunterbau und die zugehörige Montagehardware. Die Option Gehäuse + LCD + BMS enthält zusätzlich die angegebene Anzeige- und BMS-Hardware. Für den exakten Lieferumfang gilt die endgültige Packliste.',
    },
    {
      question: 'Für welche Anwendungen ist der Batteriebausatz mit Rollen geeignet?',
      answer:
        'Er eignet sich für private Notstromversorgung, mobile Arbeitsstromsysteme, kleine gewerbliche Speicher und Batterie-Montageprojekte, bei denen eine einfache Bewegung und Positionierung erforderlich ist.',
    },
  ],
  purchaseNotice: {
    title: 'Batteriezellen sind nicht enthalten',
    description:
      'Dieses Angebot umfasst ausschließlich die Hardware des Batteriebausatzes. Der angezeigte Preis gilt für das Gehäuse sowie nur für die BMS- und LCD-Hardware, die in der gewählten Option ausdrücklich genannt ist. Kompatible LiFePO4-Zellen müssen separat gekauft werden.',
    schemaValue: 'Nein — kompatible LiFePO4-Batteriezellen werden separat verkauft',
    metadataSentence: 'Batteriezellen sind nicht enthalten.',
  },
  shippingMetadataSentence:
    ' Lieferadressen in der EU erhalten kostenlosen Standardversand; für ausgewählte Ziele außerhalb der EU gilt eine feste Versandpauschale von 150 US-Dollar pro Bestellung.',
}

const batteryKitFrench = {
  product: {
    name: 'Kit de boîtier de batterie JKESS sur roulettes',
    categoryLabel: 'Kit de boîtier de batterie sur roulettes',
    tagline: 'Kit de boîtier LiFePO4 mobile avec BMS et écran LCD en option',
    description:
      'Le kit batterie JKESS sur roulettes est un ensemble robuste de boîtier et de matériel d’assemblage destiné à la construction d’un système de stockage LiFePO4 mobile de 51,2 V. Il prend en charge des cellules de 280 Ah à 320 Ah et permet d’obtenir, après installation de cellules compatibles, des configurations assemblées de 15 kWh ou 16 kWh. Vous pouvez choisir le boîtier seul ou l’ensemble comprenant le BMS et l’écran LCD spécifiés. Les cellules de batterie ne sont pas incluses.',
    included: [
      'Boîtier robuste en tôle avec base à roulettes',
      'Éléments mécaniques internes et matériel de connexion fournis selon l’option sélectionnée',
      'Écran LCD et BMS uniquement avec l’option Boîtier + LCD + BMS',
      'Liste de colisage standard et documentation produit applicable',
    ],
    notIncluded: [
      'Cellules de batterie LiFePO4',
      'Onduleur, chargeur, disjoncteur externe et câblage externe',
      'Assemblage, installation et mise en service sur site',
      'Tout composant non indiqué dans la variante sélectionnée ou la liste de colisage finale',
    ],
    features: [
      'Roulettes robustes facilitant le déplacement et le positionnement',
      'Boîtier en tôle conçu selon un niveau de protection IP54',
      'Compatible avec des configurations de cellules LiFePO4 de 280 Ah à 320 Ah',
      'Ensemble BMS et LCD en option pour la surveillance et la protection',
      'Communication CAN et RS485 avec l’option BMS compatible',
      'Conçu pour des configurations de batterie assemblées de 15 kWh ou 16 kWh',
      'Conception évolutive sous réserve des exigences de l’onduleur, du BMS, du disjoncteur et du câblage',
      'Garantie d’un an sur le matériel JKESS fourni',
    ],
    specs: [
      { key: 'Type de produit', value: 'Kit de boîtier de batterie et de matériel d’assemblage' },
      { key: 'Capacité assemblée prise en charge', value: '15 kWh / 16 kWh après installation de cellules compatibles' },
      { key: 'Cellules de batterie incluses', value: 'Non' },
      { key: 'Options du kit', value: 'Boîtier seul / Boîtier + LCD + BMS' },
      { key: 'Cellules compatibles', value: 'LFP (LiFePO4) de 280 Ah à 320 Ah' },
      { key: 'Boîtier', value: 'Tôle, conception selon IP54' },
      { key: 'Dimensions', value: '835 × 400 × 280 mm' },
      { key: 'Poids', value: 'Environ 28 kg à vide, selon la configuration' },
      { key: 'Mobilité', value: 'Quatre roulettes robustes, dont deux avec frein' },
      { key: 'Communication', value: 'CAN 2.0 / RS485 avec l’option BMS compatible' },
      { key: 'Garantie', value: 'Un an sur le matériel fourni' },
    ],
  },
  useCases: {
    applications: [
      'Alimentation de secours résidentielle et projets d’assemblage de stockage solaire domestique',
      'Systèmes de batterie mobiles pour ateliers, chalets et chantiers extérieurs',
      'Petits projets de stockage commercial nécessitant un déplacement et un positionnement faciles',
    ],
    compatibleSystems: [
      'Systèmes de batterie LiFePO4 basse tension de 51,2 V',
      'Environnements d’onduleurs utilisant CAN 2.0 ou RS485',
      'Configurations de cellules LFP de 280 Ah à 320 Ah',
    ],
    selectionNotes: [
      'Choisir Boîtier + LCD + BMS lorsqu’une surveillance et une protection intégrées sont nécessaires.',
      'Choisir Boîtier seul lorsque les cellules, le BMS, l’écran et les autres composants électroniques sont achetés séparément.',
      'Les cellules de batterie doivent être achetées séparément pour toutes les options.',
    ],
  },
  seoContent: {
    projectFit:
      'Ce kit de boîtier de batterie sur roulettes est destiné aux projets LiFePO4 basse tension nécessitant un boîtier mobile et, en option, du matériel de surveillance intégré. Après installation de cellules compatibles, il convient notamment aux systèmes de secours résidentiels, au petit stockage commercial, à l’alimentation mobile de chantier et aux systèmes de démonstration.',
    installationNotes: [
      'Vérifier les dimensions des cellules, la compatibilité de communication avec l’onduleur et le cheminement des câbles avant l’assemblage.',
      'Prévoir un dégagement suffisant pour le déplacement sur roulettes, le rayon de courbure des câbles et la ventilation.',
      'Choisir Boîtier + LCD + BMS lorsqu’une protection intégrée et une surveillance locale sont nécessaires.',
    ],
    procurementNotes: [
      'Indiquer la capacité assemblée visée, la marque des cellules, le modèle d’onduleur et le pays de destination pour confirmer la compatibilité.',
      'Pour les projets récurrents, confirmer la couleur du boîtier, le logo, le schéma de câblage et l’ensemble matériel sélectionné.',
    ],
  },
  faqs: [
    {
      question: 'Les cellules de batterie sont-elles incluses avec le kit sur roulettes ?',
      answer:
        'Non. Le kit comprend le boîtier et le matériel d’assemblage ; l’écran LCD et le BMS sont ajoutés selon la variante choisie. Les cellules LiFePO4 compatibles de 280 Ah à 320 Ah doivent être achetées séparément.',
    },
    {
      question: 'Que comprend chaque option du kit batterie ?',
      answer:
        'L’option Boîtier seul comprend le boîtier, la base à roulettes et le matériel d’assemblage associé. L’option Boîtier + LCD + BMS ajoute l’écran et le matériel BMS spécifiés. La liste de colisage finale définit le contenu exact livré.',
    },
    {
      question: 'Dans quels projets utilise-t-on généralement ce kit sur roulettes ?',
      answer:
        'Il convient aux systèmes de secours résidentiels, à l’alimentation mobile, au petit stockage commercial et aux projets d’assemblage de batteries nécessitant un déplacement et un positionnement faciles.',
    },
  ],
  purchaseNotice: {
    title: 'Les cellules de batterie ne sont pas incluses',
    description:
      'Cette offre concerne uniquement le matériel du kit batterie. Le prix affiché couvre le boîtier et seulement le BMS et l’écran LCD expressément prévus dans l’option sélectionnée. Les cellules LiFePO4 compatibles doivent être achetées séparément.',
    schemaValue: 'Non — les cellules de batterie LiFePO4 compatibles sont vendues séparément',
    metadataSentence: 'Les cellules de batterie ne sont pas incluses.',
  },
  shippingMetadataSentence:
    ' Les adresses de livraison dans l’UE bénéficient de la livraison standard gratuite ; certaines destinations hors UE sont soumises à des frais fixes de 150 $ US par commande.',
}

type ConciseProductLocalization = {
  name: string
  categoryLabel: string
  tagline: string
  description: string
  faqs?: ProductFaq[]
}

const conciseEuProductLocalizations: Record<string, Record<string, ConciseProductLocalization>> = {
  de: {
    '6u-battery-kit': {
      name: 'JKESS 6U Batteriegehäuse-Bausatz',
      categoryLabel: '6U Rack-Batteriegehäuse',
      tagline: '6U LiFePO4-Rackgehäuse mit optionalem BMS und LCD',
      description:
        'Der JKESS 6U Battery Kit ist ein 19-Zoll-Gehäuse- und Montageset für den Aufbau eines kompakten 51,2-V-LiFePO4-Batteriemoduls. Die unterstützte 15-kWh-Konfiguration gilt nach dem Einbau kompatibler Zellen. Batteriezellen sind nicht enthalten.',
      faqs: [
        { question: 'Sind Batteriezellen enthalten?', answer: 'Nein. Kompatible LiFePO4-Zellen müssen separat beschafft werden.' },
        { question: 'Wofür wird das 6U-Gehäuse eingesetzt?', answer: 'Es eignet sich für 19-Zoll-Rackprojekte, Heimspeicher, Telekom-Backup und kleine gewerbliche Backup-Systeme.' },
      ],
    },
    'high-voltage-kit': {
      name: 'JKESS Hochvolt-BMS-Kit',
      categoryLabel: 'Hochvolt-BMS-Steuerhardware',
      tagline: 'BCU- und BMU-Steuerhardware für Hochvolt-Batteriesysteme',
      description:
        'Das JKESS Hochvolt-Kit umfasst einzelne BCU-Master- oder BMU-Slave-Steuerboxen für kommerzielle Hochvolt-Energiespeicher. Der angezeigte Preis gilt nur für die ausgewählte Steuerbox, nicht für Zellen, Module, Racks, PCS oder EMS.',
      faqs: [
        { question: 'Ist das Hochvolt-Kit ein kompletter Batteriespeicher?', answer: 'Nein. Es handelt sich um ausgewählte BMS-Steuerhardware für ein projektspezifisch ausgelegtes System.' },
        { question: 'Wie wähle ich 100A oder 200A?', answer: 'Die Auswahl hängt von Spannung, Strom, PCS, Duty Cycle, Schutzkomponenten und der vollständigen Systemarchitektur ab.' },
      ],
    },
    'tness-ci-ess-cabinet': {
      name: 'C&I Hochvolt-ESS-Schrank',
      categoryLabel: 'Konfigurierbarer C&I ESS-Schrank',
      tagline: 'Projektbezogen konfigurierter Energiespeicherschrank für Gewerbe und Industrie',
      description:
        'Der C&I Hochvolt-ESS-Schrank ist eine konfigurierbare Plattform für gewerbliche und industrielle Speicherprojekte. Verfügbare Konfigurationen decken etwa 64,3 kWh bis 261 kWh ab; der endgültige Lieferumfang wird im Projektangebot festgelegt.',
      faqs: [
        { question: 'Ist der ESS-Schrank ein Standardpaket?', answer: 'Nein. Kapazität, PCS, EMS, Kühlung, Brandschutz und Services werden im Angebot definiert.' },
        { question: 'Welche Projektdaten werden benötigt?', answer: 'Benötigt werden Kapazität, AC-Leistung, Standortland, Netzstandard, Lastprofil, Kühlung und Installationsumfang.' },
      ],
    },
  },
  fr: {
    '6u-battery-kit': {
      name: 'Kit batterie JKESS 6U',
      categoryLabel: 'Boîtier batterie rack 6U',
      tagline: 'Boîtier LiFePO4 rack 19 pouces avec BMS et écran LCD en option',
      description:
        'Le kit batterie JKESS 6U est un boîtier rack 19 pouces destiné à construire un module LiFePO4 compact de 51,2 V. La capacité de 15 kWh s’applique après l’installation de cellules compatibles. Les cellules de batterie ne sont pas incluses.',
      faqs: [
        { question: 'Les cellules de batterie sont-elles incluses ?', answer: 'Non. Les cellules LiFePO4 compatibles doivent être achetées séparément.' },
        { question: 'Dans quels projets utilise-t-on le kit 6U ?', answer: 'Il convient aux racks 19 pouces, au stockage solaire résidentiel, au secours télécom et aux petits systèmes commerciaux.' },
      ],
    },
    'high-voltage-kit': {
      name: 'Kit BMS haute tension JKESS',
      categoryLabel: 'Matériel BMS haute tension',
      tagline: 'Boîtiers BCU et BMU pour systèmes de batterie haute tension',
      description:
        'Le kit haute tension JKESS fournit du matériel BMS modulaire pour les systèmes de stockage commerciaux. Le prix affiché concerne uniquement le boîtier BCU maître ou BMU esclave sélectionné, sans cellules, modules, racks, PCS ni EMS.',
      faqs: [
        { question: 'Le kit haute tension est-il un système complet ?', answer: 'Non. Il s’agit de matériel de contrôle BMS sélectionné pour une architecture de batterie conçue séparément.' },
        { question: 'Comment choisir entre 100A et 200A ?', answer: 'Le choix dépend de la tension, du courant, du PCS, du cycle d’utilisation, de la protection et de l’architecture complète.' },
      ],
    },
    'tness-ci-ess-cabinet': {
      name: 'Armoire ESS C&I haute tension',
      categoryLabel: 'Armoire ESS C&I configurable',
      tagline: 'Armoire de stockage d’énergie configurée sur projet pour les applications commerciales et industrielles',
      description:
        'L’armoire ESS C&I haute tension est une plateforme configurable pour les projets de stockage commerciaux et industriels. Les configurations couvrent environ 64,3 kWh à 261 kWh avec refroidissement par air ou liquide selon le projet.',
      faqs: [
        { question: 'Comment commander cette armoire ESS ?', answer: 'Elle est fournie sur devis car la capacité, le PCS, l’EMS, le refroidissement et le site déterminent la configuration finale.' },
        { question: 'Quelles applications sont visées ?', answer: 'Écrêtage de pointe, autoconsommation solaire, secours, gestion de la demande et projets industriels.' },
      ],
    },
  },
  es: {
    'battery-kit': {
      name: 'Kit de batería JKESS con ruedas',
      categoryLabel: 'Caja de batería LiFePO4 con ruedas',
      tagline: 'Caja móvil para batería LiFePO4 con BMS y pantalla LCD opcionales',
      description:
        'El kit de batería JKESS con ruedas es una caja metálica robusta para montar un sistema LiFePO4 móvil de 51,2 V. Admite celdas compatibles de 280 Ah a 320 Ah y configuraciones ensambladas de 15 kWh o 16 kWh. Las celdas no están incluidas.',
      faqs: [
        { question: '¿Incluye celdas de batería?', answer: 'No. Las celdas LiFePO4 compatibles se compran por separado.' },
        { question: '¿Dónde se usa este kit?', answer: 'Se usa en respaldo residencial, almacenamiento solar, talleres y pequeños proyectos comerciales que necesitan movilidad.' },
      ],
    },
    '6u-battery-kit': {
      name: 'Kit de batería JKESS 6U',
      categoryLabel: 'Caja de batería rack 6U',
      tagline: 'Caja LiFePO4 de 19 pulgadas con BMS y LCD opcionales',
      description:
        'El kit de batería JKESS 6U es una caja de montaje en rack de 19 pulgadas para construir un módulo LiFePO4 compacto de 51,2 V. La capacidad de 15 kWh se consigue después de instalar celdas compatibles. Las celdas no están incluidas.',
      faqs: [
        { question: '¿Es compatible con cualquier rack?', answer: 'No. Deben confirmarse profundidad, ventilación, carga del rack y cableado.' },
        { question: '¿Incluye celdas?', answer: 'No. El kit incluye la caja y el hardware indicado para la opción seleccionada.' },
      ],
    },
    'high-voltage-kit': {
      name: 'Kit BMS de alta tensión JKESS',
      categoryLabel: 'Hardware BMS de alta tensión',
      tagline: 'Cajas BCU y BMU para sistemas de batería de alta tensión',
      description:
        'El kit de alta tensión JKESS proporciona hardware BMS modular para sistemas comerciales de almacenamiento. El precio corresponde a una caja BCU maestra o BMU esclava seleccionada; no incluye celdas, módulos, racks, PCS ni EMS.',
      faqs: [
        { question: '¿Qué incluye el precio?', answer: 'Una caja de control maestra o esclava seleccionada, según la variante elegida.' },
        { question: '¿CAN o RS485 garantizan compatibilidad?', answer: 'No. También deben coincidir protocolo, firmware, cableado, mensajes y puesta en marcha.' },
      ],
    },
    'tness-ci-ess-cabinet': {
      name: 'Armario ESS C&I de alta tensión',
      categoryLabel: 'Armario ESS C&I configurable',
      tagline: 'Armario de almacenamiento para proyectos comerciales e industriales',
      description:
        'El armario ESS C&I de alta tensión es una plataforma configurable para almacenamiento comercial e industrial. Cubre configuraciones aproximadas de 64,3 kWh a 261 kWh con opciones de refrigeración por aire o líquido, según el proyecto.',
      faqs: [
        { question: '¿Cómo se compra este producto?', answer: 'Se suministra por cotización porque la configuración depende del sitio y del alcance técnico.' },
        { question: '¿Qué aplicaciones cubre?', answer: 'Peak shaving, autoconsumo solar, respaldo, gestión de demanda y proyectos industriales.' },
      ],
    },
  },
  it: {
    'battery-kit': {
      name: 'Kit batteria JKESS con ruote',
      categoryLabel: 'Contenitore batteria LiFePO4 con ruote',
      tagline: 'Contenitore mobile LiFePO4 con BMS e LCD opzionali',
      description:
        'Il kit batteria JKESS con ruote è un contenitore robusto per assemblare un sistema LiFePO4 mobile da 51,2 V. Supporta celle compatibili da 280 Ah a 320 Ah e configurazioni da 15 kWh o 16 kWh dopo l’installazione delle celle. Le celle non sono incluse.',
    },
    '6u-battery-kit': {
      name: 'Kit batteria JKESS 6U',
      categoryLabel: 'Contenitore rack batteria 6U',
      tagline: 'Contenitore rack 19 pollici per modulo LiFePO4 con BMS e LCD opzionali',
      description:
        'Il kit batteria JKESS 6U è un contenitore rack da 19 pollici per realizzare un modulo LiFePO4 compatto da 51,2 V. La capacità di 15 kWh richiede celle compatibili installate separatamente.',
    },
    'high-voltage-kit': {
      name: 'Kit BMS ad alta tensione JKESS',
      categoryLabel: 'Hardware BMS ad alta tensione',
      tagline: 'Hardware BCU e BMU per sistemi batteria ad alta tensione',
      description:
        'Il kit ad alta tensione JKESS comprende hardware BMS modulare per sistemi di accumulo commerciali. Il prezzo riguarda la singola scatola BCU master o BMU slave selezionata e non include celle, moduli, rack, PCS o EMS.',
    },
    'tness-ci-ess-cabinet': {
      name: 'Armadio ESS C&I ad alta tensione',
      categoryLabel: 'Armadio ESS C&I configurabile',
      tagline: 'Armadio di accumulo configurato su progetto per applicazioni commerciali e industriali',
      description:
        'L’armadio ESS C&I ad alta tensione è una piattaforma configurabile per progetti di accumulo energetico commerciali e industriali, con capacità indicative da 64,3 kWh a 261 kWh e raffreddamento ad aria o liquido.',
    },
  },
  nl: {
    'battery-kit': {
      name: 'JKESS batterijbehuizing met wielen',
      categoryLabel: 'LiFePO4 batterijbehuizing met wielen',
      tagline: 'Mobiele LiFePO4-behuizing met optionele BMS en LCD',
      description:
        'De JKESS batterijset met wielen is een robuuste behuizing voor het bouwen van een mobiel 51,2 V LiFePO4-systeem. De set ondersteunt compatibele cellen van 280 Ah tot 320 Ah en 15 kWh of 16 kWh configuraties na assemblage. Batterijcellen zijn niet inbegrepen.',
    },
    '6u-battery-kit': {
      name: 'JKESS 6U batterijset',
      categoryLabel: '6U rack-batterijbehuizing',
      tagline: '19-inch LiFePO4 rackbehuizing met optionele BMS en LCD',
      description:
        'De JKESS 6U batterijset is een 19-inch rackbehuizing voor een compact 51,2 V LiFePO4-batterijmodule. De ondersteunde 15 kWh configuratie vereist afzonderlijk geïnstalleerde compatibele cellen.',
    },
    'high-voltage-kit': {
      name: 'JKESS hoogspannings-BMS-kit',
      categoryLabel: 'Hoogspannings-BMS hardware',
      tagline: 'BCU- en BMU-hardware voor hoogspanningsbatterijsystemen',
      description:
        'De JKESS hoogspanningskit levert modulaire BMS-hardware voor commerciële energieopslag. De prijs geldt voor de gekozen BCU-masterbox of BMU-slavebox en omvat geen cellen, modules, racks, PCS of EMS.',
    },
    'tness-ci-ess-cabinet': {
      name: 'C&I hoogspannings-ESS-kast',
      categoryLabel: 'Configureerbare C&I ESS-kast',
      tagline: 'Projectmatig geconfigureerde energieopslagkast voor commerciële en industriële toepassingen',
      description:
        'De C&I hoogspannings-ESS-kast is een configureerbaar platform voor commerciële en industriële energieopslagprojecten met capaciteiten van circa 64,3 kWh tot 261 kWh.',
    },
  },
  pl: {
    'battery-kit': {
      name: 'Zestaw obudowy baterii JKESS z kółkami',
      categoryLabel: 'Obudowa baterii LiFePO4 z kółkami',
      tagline: 'Mobilna obudowa LiFePO4 z opcjonalnym BMS i LCD',
      description:
        'Zestaw baterii JKESS z kółkami to wytrzymała obudowa do budowy mobilnego systemu LiFePO4 51,2 V. Obsługuje kompatybilne ogniwa 280 Ah do 320 Ah oraz konfiguracje 15 kWh lub 16 kWh po montażu. Ogniwa nie są zawarte w zestawie.',
    },
    '6u-battery-kit': {
      name: 'Zestaw baterii JKESS 6U',
      categoryLabel: 'Obudowa baterii rack 6U',
      tagline: 'Obudowa rack 19 cali dla modułu LiFePO4 z opcjonalnym BMS i LCD',
      description:
        'Zestaw baterii JKESS 6U to obudowa rack 19 cali do budowy kompaktowego modułu LiFePO4 51,2 V. Obsługiwana konfiguracja 15 kWh wymaga osobno zakupionych kompatybilnych ogniw.',
    },
    'high-voltage-kit': {
      name: 'Zestaw BMS wysokiego napięcia JKESS',
      categoryLabel: 'Sprzęt BMS wysokiego napięcia',
      tagline: 'Sterowniki BCU i BMU dla systemów baterii wysokiego napięcia',
      description:
        'Zestaw wysokiego napięcia JKESS obejmuje modułowy sprzęt BMS do komercyjnych systemów magazynowania energii. Cena dotyczy wybranej skrzynki BCU master lub BMU slave i nie obejmuje ogniw, modułów, racków, PCS ani EMS.',
    },
    'tness-ci-ess-cabinet': {
      name: 'Szafa ESS C&I wysokiego napięcia',
      categoryLabel: 'Konfigurowalna szafa ESS C&I',
      tagline: 'Szafa magazynowania energii konfigurowana dla projektów komercyjnych i przemysłowych',
      description:
        'Szafa ESS C&I wysokiego napięcia to konfigurowalna platforma dla komercyjnych i przemysłowych projektów magazynowania energii, obejmująca konfiguracje około 64,3 kWh do 261 kWh.',
    },
  },
}

const euShippingMetadataSentence: Record<string, string> = {
  de: ' EU-Lieferadressen erhalten kostenlosen Standardversand; ausgewählte Nicht-EU-Ziele haben eine feste Versandpauschale von 150 US-Dollar pro Bestellung.',
  fr: ' Les adresses de livraison dans l’UE bénéficient de la livraison standard gratuite ; certaines destinations hors UE ont des frais fixes de 150 $ US par commande.',
  es: ' Las direcciones de entrega en la UE incluyen envío estándar gratuito; algunos destinos fuera de la UE tienen un cargo fijo de 150 USD por pedido.',
  it: ' Gli indirizzi di consegna nell’UE includono la spedizione standard gratuita; alcune destinazioni extra UE prevedono un costo fisso di 150 USD per ordine.',
  nl: ' EU-leveringsadressen krijgen gratis standaardverzending; geselecteerde niet-EU-bestemmingen hebben een vast tarief van 150 USD per bestelling.',
  pl: ' Adresy dostawy w UE mają bezpłatną wysyłkę standardową; wybrane kraje poza UE mają stałą opłatę 150 USD za zamówienie.',
}

function concisePurchaseNotice(product: Product, lang: string): LocalizedPurchaseNotice | null {
  if (!['de', 'fr', 'es', 'it', 'nl', 'pl'].includes(lang)) return null
  if (product.slug === 'tness-ci-ess-cabinet') return null

  const labels: Record<string, LocalizedPurchaseNotice> = {
    de: {
      title: product.slug === 'high-voltage-kit' ? 'Batteriezellen und Packs sind nicht enthalten' : 'Batteriezellen sind nicht enthalten',
      description: 'Dieses Angebot umfasst nur die auf der Produktseite angegebene JKESS-Hardware. Zellen, komplette Packs und externe Systemkomponenten sind nicht enthalten, sofern sie nicht schriftlich bestätigt wurden.',
      schemaValue: 'Nein — Batteriezellen und nicht ausdrücklich genannte Systemkomponenten werden separat verkauft',
      metadataSentence: 'Batteriezellen sind nicht enthalten.',
    },
    fr: {
      title: product.slug === 'high-voltage-kit' ? 'Cellules et packs batterie non inclus' : 'Les cellules de batterie ne sont pas incluses',
      description: 'Cette offre couvre uniquement le matériel JKESS indiqué sur la page produit. Les cellules, packs complets et composants système externes sont exclus sauf confirmation écrite.',
      schemaValue: 'Non — les cellules et composants non indiqués sont vendus séparément',
      metadataSentence: 'Les cellules de batterie ne sont pas incluses.',
    },
    es: {
      title: product.slug === 'high-voltage-kit' ? 'No incluye celdas ni paquetes de batería' : 'Las celdas de batería no están incluidas',
      description: 'Esta oferta cubre solo el hardware JKESS indicado en la página del producto. Las celdas, paquetes completos y componentes externos se venden por separado salvo confirmación escrita.',
      schemaValue: 'No — las celdas y los componentes no indicados se venden por separado',
      metadataSentence: 'Las celdas de batería no están incluidas.',
    },
    it: {
      title: product.slug === 'high-voltage-kit' ? 'Celle e pacchi batteria non inclusi' : 'Le celle batteria non sono incluse',
      description: 'L’offerta include solo l’hardware JKESS indicato nella pagina prodotto. Celle, pacchi completi e componenti esterni sono esclusi salvo conferma scritta.',
      schemaValue: 'No — celle e componenti non indicati sono venduti separatamente',
      metadataSentence: 'Le celle batteria non sono incluse.',
    },
    nl: {
      title: product.slug === 'high-voltage-kit' ? 'Batterijcellen en packs zijn niet inbegrepen' : 'Batterijcellen zijn niet inbegrepen',
      description: 'Deze aanbieding omvat alleen de JKESS-hardware die op de productpagina is vermeld. Cellen, complete packs en externe systeemcomponenten zijn uitgesloten tenzij schriftelijk bevestigd.',
      schemaValue: 'Nee — cellen en niet genoemde componenten worden afzonderlijk verkocht',
      metadataSentence: 'Batterijcellen zijn niet inbegrepen.',
    },
    pl: {
      title: product.slug === 'high-voltage-kit' ? 'Ogniwa i pakiety baterii nie są zawarte' : 'Ogniwa baterii nie są zawarte',
      description: 'Oferta obejmuje wyłącznie sprzęt JKESS wskazany na stronie produktu. Ogniwa, kompletne pakiety i zewnętrzne komponenty systemu są wyłączone, chyba że potwierdzono je pisemnie.',
      schemaValue: 'Nie — ogniwa i niewymienione komponenty są sprzedawane osobno',
      metadataSentence: 'Ogniwa baterii nie są zawarte.',
    },
  }

  return labels[lang] ?? null
}

export function getLocalizedProductPageContent(
  product: Product,
  lang: string
): LocalizedProductPageContent {
  const fallback: LocalizedProductPageContent = {
    product: {
      ...product,
      localizedFaqs: getProductFaqs(product),
    },
    useCases: getProductUseCases(product),
    seoContent: getProductSeoContent(product),
    purchaseNotice: null,
  }

  const localized = product.slug === 'battery-kit'
    ? lang === 'de'
      ? batteryKitGerman
      : lang === 'fr'
        ? batteryKitFrench
        : null
    : null

  if (localized) {
    return {
      product: {
        ...product,
        ...localized.product,
        specs: localized.product.specs,
        included: localized.product.included,
        notIncluded: localized.product.notIncluded,
        features: localized.product.features,
        localizedFaqs: localized.faqs,
      },
      useCases: localized.useCases,
      seoContent: localized.seoContent,
      purchaseNotice: localized.purchaseNotice,
      shippingMetadataSentence: localized.shippingMetadataSentence,
      isLocalized: true,
    }
  }

  const concise = conciseEuProductLocalizations[lang]?.[product.slug]
  if (!concise) return fallback

  return {
    ...fallback,
    product: {
      ...fallback.product,
      name: concise.name,
      categoryLabel: concise.categoryLabel,
      tagline: concise.tagline,
      description: concise.description,
      localizedFaqs: concise.faqs ?? fallback.product.localizedFaqs,
    },
    purchaseNotice: concisePurchaseNotice(product, lang),
    shippingMetadataSentence: product.type === 'shop'
      ? euShippingMetadataSentence[lang]
      : undefined,
    isLocalized: true,
  }
}
