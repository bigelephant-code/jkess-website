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

  if (product.slug !== 'battery-kit') return fallback

  const localized = lang === 'de'
    ? batteryKitGerman
    : lang === 'fr'
      ? batteryKitFrench
      : null

  if (!localized) return fallback

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
  }
}
