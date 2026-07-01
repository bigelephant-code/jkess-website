export interface ProductSpec {
  key: string
  value: string
}

export interface ProductFaq {
  question: string
  answer: string
}

export interface ProductUseCases {
  applications: string[]
  compatibleSystems: string[]
  selectionNotes: string[]
}

export interface ProductSeoContent {
  projectFit: string
  installationNotes: string[]
  procurementNotes: string[]
}

export interface ProductBuyingGuideLink {
  href: string
  title: string
  description: string
}

export interface Product {
  slug: string
  name: string
  category: string
  categoryLabel: string
  tagline: string
  description: string
  included: string[]
  notIncluded: string[]
  features: string[]
  specs: ProductSpec[]
  images: string[]
  type: 'shop' | 'inquiry'
  variants?: { label: string; price?: string }[]
  detailImages?: string[]
}

export const guideCopy = {
  en: {
    desc: 'Open a related planning page for product selection, EU shipping, compatibility, and quotation preparation.',
    europe: 'Europe battery storage buying hub',
    quote: 'Product and shipping quote request',
    lifepo4Europe: 'LiFePO4 battery kit Europe',
    enclosureEu: '48V battery enclosure EU shipping',
    rackVsFloor: 'Rack vs floor-standing battery kit',
    rackPlanning: '6U rack battery enclosure planning',
    hvEss: 'High-voltage BMS for ESS',
    currentCompare: '100A vs 200A high-voltage BMS',
    bcuBmu: 'BCU vs BMU technical guide',
    canRs485: 'CAN/RS485 inverter compatibility',
    commercialEurope: 'Commercial energy storage cabinet Europe',
    commercialCabinet: 'Commercial battery storage cabinet planning',
    kitVsCabinet: 'Battery kit vs C&I ESS cabinet',
    cooling: 'Air-cooled vs liquid-cooled ESS',
  },
  de: {
    desc: 'Öffnen Sie eine passende Planungsseite für Produktauswahl, EU-Versand, Kompatibilität und Angebotsvorbereitung.',
    europe: 'Europäischer Kaufratgeber für Batteriespeicher',
    quote: 'Produkt- und Versandangebot anfordern',
    lifepo4Europe: 'LiFePO4-Batterie-Kit für Europa',
    enclosureEu: '48V-Batteriegehäuse mit EU-Versand',
    rackVsFloor: 'Rack-Kit im Vergleich zum Standgehäuse',
    rackPlanning: 'Planung für 6U-Rack-Batteriegehäuse',
    hvEss: 'Hochvolt-BMS für ESS',
    currentCompare: '100A gegen 200A Hochvolt-BMS',
    bcuBmu: 'Technischer Leitfaden BCU gegen BMU',
    canRs485: 'CAN/RS485-Kompatibilität mit Wechselrichtern',
    commercialEurope: 'Gewerblicher Energiespeicherschrank für Europa',
    commercialCabinet: 'Planung gewerblicher Batteriespeicherschränke',
    kitVsCabinet: 'Batterie-Kit gegen C&I-ESS-Schrank',
    cooling: 'Luftgekühltes gegen flüssigkeitsgekühltes ESS',
  },
  fr: {
    desc: 'Ouvrez une page de planification liée à la sélection du produit, à la livraison UE, à la compatibilité et au devis.',
    europe: 'Guide d’achat européen du stockage batterie',
    quote: 'Demande de devis produit et livraison',
    lifepo4Europe: 'Kit batterie LiFePO4 pour l’Europe',
    enclosureEu: 'Boîtier batterie 48V avec livraison UE',
    rackVsFloor: 'Kit rack ou boîtier au sol',
    rackPlanning: 'Planification du boîtier batterie rack 6U',
    hvEss: 'BMS haute tension pour ESS',
    currentCompare: 'BMS haute tension 100A ou 200A',
    bcuBmu: 'Guide technique BCU ou BMU',
    canRs485: 'Compatibilité onduleur CAN/RS485',
    commercialEurope: 'Armoire de stockage d’énergie commerciale Europe',
    commercialCabinet: 'Planification d’armoire de stockage batterie commerciale',
    kitVsCabinet: 'Kit batterie ou armoire ESS C&I',
    cooling: 'ESS refroidi par air ou par liquide',
  },
  es: {
    desc: 'Abra una página relacionada para selección de producto, envío UE, compatibilidad y preparación de cotización.',
    europe: 'Guía europea de compra de almacenamiento en baterías',
    quote: 'Solicitud de cotización de producto y envío',
    lifepo4Europe: 'Kit de batería LiFePO4 para Europa',
    enclosureEu: 'Caja de batería 48V con envío UE',
    rackVsFloor: 'Kit rack frente a caja de suelo',
    rackPlanning: 'Planificación de caja de batería rack 6U',
    hvEss: 'BMS de alto voltaje para ESS',
    currentCompare: 'BMS de alto voltaje 100A frente a 200A',
    bcuBmu: 'Guía técnica BCU frente a BMU',
    canRs485: 'Compatibilidad CAN/RS485 con inversor',
    commercialEurope: 'Armario comercial de almacenamiento de energía para Europa',
    commercialCabinet: 'Planificación de armario comercial de baterías',
    kitVsCabinet: 'Kit de batería frente a armario ESS C&I',
    cooling: 'ESS refrigerado por aire frente a líquido',
  },
  it: {
    desc: 'Apri una pagina collegata per scelta prodotto, spedizione UE, compatibilità e preparazione del preventivo.',
    europe: 'Guida europea all’acquisto di sistemi di accumulo',
    quote: 'Richiesta preventivo prodotto e spedizione',
    lifepo4Europe: 'Kit batteria LiFePO4 per l’Europa',
    enclosureEu: 'Box batteria 48V con spedizione UE',
    rackVsFloor: 'Kit rack o box da pavimento',
    rackPlanning: 'Pianificazione box batteria rack 6U',
    hvEss: 'BMS ad alta tensione per ESS',
    currentCompare: 'BMS alta tensione 100A o 200A',
    bcuBmu: 'Guida tecnica BCU o BMU',
    canRs485: 'Compatibilità inverter CAN/RS485',
    commercialEurope: 'Armadio commerciale di accumulo energia per l’Europa',
    commercialCabinet: 'Pianificazione armadio commerciale batterie',
    kitVsCabinet: 'Kit batteria o armadio ESS C&I',
    cooling: 'ESS raffreddato ad aria o a liquido',
  },
  nl: {
    desc: 'Open een gerelateerde planningspagina voor productkeuze, EU-verzending, compatibiliteit en offertevoorbereiding.',
    europe: 'Europese koopgids voor batterijopslag',
    quote: 'Product- en verzendofferte aanvragen',
    lifepo4Europe: 'LiFePO4-batterijkit voor Europa',
    enclosureEu: '48V batterijbehuizing met EU-verzending',
    rackVsFloor: 'Rackkit versus vloerstaande behuizing',
    rackPlanning: 'Planning voor 6U rack-batterijbehuizing',
    hvEss: 'Hoogspannings-BMS voor ESS',
    currentCompare: '100A versus 200A hoogspannings-BMS',
    bcuBmu: 'Technische gids BCU versus BMU',
    canRs485: 'CAN/RS485-compatibiliteit met omvormer',
    commercialEurope: 'Commerciële energieopslagkast voor Europa',
    commercialCabinet: 'Planning commerciële batterijopslagkast',
    kitVsCabinet: 'Batterijkit versus C&I ESS-kast',
    cooling: 'Luchtgekoelde versus vloeistofgekoelde ESS',
  },
  pt: {
    desc: 'Abra uma página relacionada para seleção de produto, envio UE, compatibilidade e preparação de cotação.',
    europe: 'Guia europeu de compra de armazenamento em baterias',
    quote: 'Pedido de cotação de produto e envio',
    lifepo4Europe: 'Kit de bateria LiFePO4 para a Europa',
    enclosureEu: 'Caixa de bateria 48V com envio UE',
    rackVsFloor: 'Kit rack versus caixa de chão',
    rackPlanning: 'Planeamento de caixa de bateria rack 6U',
    hvEss: 'BMS de alta tensão para ESS',
    currentCompare: 'BMS de alta tensão 100A versus 200A',
    bcuBmu: 'Guia técnico BCU versus BMU',
    canRs485: 'Compatibilidade CAN/RS485 com inversor',
    commercialEurope: 'Armário comercial de armazenamento de energia para a Europa',
    commercialCabinet: 'Planeamento de armário comercial de baterias',
    kitVsCabinet: 'Kit de bateria versus armário ESS C&I',
    cooling: 'ESS arrefecido a ar versus líquido',
  },
  sv: {
    desc: 'Öppna en relaterad planeringssida för produktval, EU-frakt, kompatibilitet och offertförberedelse.',
    europe: 'Europeisk köpguide för batterilagring',
    quote: 'Begär produkt- och fraktoffert',
    lifepo4Europe: 'LiFePO4-batterikit för Europa',
    enclosureEu: '48V batterihölje med EU-frakt',
    rackVsFloor: 'Rackkit jämfört med golvstående hölje',
    rackPlanning: 'Planering för 6U rackbatterihölje',
    hvEss: 'Högspännings-BMS för ESS',
    currentCompare: '100A jämfört med 200A högspännings-BMS',
    bcuBmu: 'Teknisk guide BCU jämfört med BMU',
    canRs485: 'CAN/RS485-kompatibilitet med växelriktare',
    commercialEurope: 'Kommersiellt energilagringsskåp för Europa',
    commercialCabinet: 'Planering av kommersiellt batterilagringsskåp',
    kitVsCabinet: 'Batterikit jämfört med C&I ESS-skåp',
    cooling: 'Luftkylt jämfört med vätskekylt ESS',
  },
  da: {
    desc: 'Åbn en relateret planlægningsside for produktvalg, EU-forsendelse, kompatibilitet og tilbudsforberedelse.',
    europe: 'Europæisk købsguide til batterilagring',
    quote: 'Anmod om produkt- og fragttilbud',
    lifepo4Europe: 'LiFePO4-batterisæt til Europa',
    enclosureEu: '48V batterikabinet med EU-forsendelse',
    rackVsFloor: 'Rack-sæt kontra gulvstående kabinet',
    rackPlanning: 'Planlægning af 6U rack-batterikabinet',
    hvEss: 'Højspændings-BMS til ESS',
    currentCompare: '100A kontra 200A højspændings-BMS',
    bcuBmu: 'Teknisk guide BCU kontra BMU',
    canRs485: 'CAN/RS485-kompatibilitet med inverter',
    commercialEurope: 'Kommercielt energilagringskabinet til Europa',
    commercialCabinet: 'Planlægning af kommercielt batterilagringskabinet',
    kitVsCabinet: 'Batterisæt kontra C&I ESS-kabinet',
    cooling: 'Luftkølet kontra væskekølet ESS',
  },
  fi: {
    desc: 'Avaa liittyvä suunnittelusivu tuotteen valintaan, EU-toimitukseen, yhteensopivuuteen ja tarjoukseen.',
    europe: 'Euroopan akkuvarastoinnin osto-opas',
    quote: 'Tuote- ja toimitustarjouspyyntö',
    lifepo4Europe: 'LiFePO4-akkusarja Eurooppaan',
    enclosureEu: '48V akkukotelo EU-toimituksella',
    rackVsFloor: 'Räkkisarja verrattuna lattiamalliseen koteloon',
    rackPlanning: '6U räkkikotelon suunnittelu',
    hvEss: 'Korkeajännite-BMS ESS-järjestelmiin',
    currentCompare: '100A tai 200A korkeajännite-BMS',
    bcuBmu: 'Tekninen opas BCU tai BMU',
    canRs485: 'CAN/RS485-yhteensopivuus invertterin kanssa',
    commercialEurope: 'Kaupallinen energiavarastokaappi Eurooppaan',
    commercialCabinet: 'Kaupallisen akkuvarastokaapin suunnittelu',
    kitVsCabinet: 'Akkusarja tai C&I ESS -kaappi',
    cooling: 'Ilmajäähdytteinen tai nestejäähdytteinen ESS',
  },
  pl: {
    desc: 'Otwórz powiązaną stronę planowania wyboru produktu, wysyłki w UE, kompatybilności i oferty.',
    europe: 'Europejski przewodnik zakupu magazynów energii',
    quote: 'Zapytanie o produkt i wysyłkę',
    lifepo4Europe: 'Zestaw baterii LiFePO4 dla Europy',
    enclosureEu: 'Obudowa baterii 48V z wysyłką UE',
    rackVsFloor: 'Zestaw rack kontra obudowa stojąca',
    rackPlanning: 'Planowanie obudowy baterii rack 6U',
    hvEss: 'Wysokonapięciowy BMS dla ESS',
    currentCompare: 'BMS wysokiego napięcia 100A lub 200A',
    bcuBmu: 'Przewodnik techniczny BCU lub BMU',
    canRs485: 'Kompatybilność CAN/RS485 z falownikiem',
    commercialEurope: 'Komercyjna szafa magazynu energii dla Europy',
    commercialCabinet: 'Planowanie komercyjnej szafy bateryjnej',
    kitVsCabinet: 'Zestaw baterii lub szafa ESS C&I',
    cooling: 'ESS chłodzony powietrzem lub cieczą',
  },
  cs: {
    desc: 'Otevřete související plánovací stránku pro výběr produktu, dopravu v EU, kompatibilitu a nabídku.',
    europe: 'Evropský průvodce nákupem bateriových úložišť',
    quote: 'Žádost o nabídku produktu a dopravy',
    lifepo4Europe: 'Bateriová sada LiFePO4 pro Evropu',
    enclosureEu: '48V bateriová skříň s dopravou v EU',
    rackVsFloor: 'Racková sada oproti stojací skříni',
    rackPlanning: 'Plánování 6U rackové bateriové skříně',
    hvEss: 'Vysokonapěťový BMS pro ESS',
    currentCompare: '100A nebo 200A vysokonapěťový BMS',
    bcuBmu: 'Technická příručka BCU nebo BMU',
    canRs485: 'Kompatibilita CAN/RS485 se střídačem',
    commercialEurope: 'Komerční skříň energetického úložiště pro Evropu',
    commercialCabinet: 'Plánování komerční bateriové skříně',
    kitVsCabinet: 'Bateriová sada nebo skříň C&I ESS',
    cooling: 'Vzduchem nebo kapalinou chlazený ESS',
  },
  sk: {
    desc: 'Otvorte súvisiacu plánovaciu stránku pre výber produktu, dopravu v EÚ, kompatibilitu a ponuku.',
    europe: 'Európsky nákupný sprievodca batériovým úložiskom',
    quote: 'Žiadosť o ponuku produktu a dopravy',
    lifepo4Europe: 'Batériová sada LiFePO4 pre Európu',
    enclosureEu: '48V batériová skriňa s dopravou v EÚ',
    rackVsFloor: 'Racková sada oproti stojacej skrini',
    rackPlanning: 'Plánovanie 6U rackovej batériovej skrine',
    hvEss: 'Vysokonapäťový BMS pre ESS',
    currentCompare: '100A alebo 200A vysokonapäťový BMS',
    bcuBmu: 'Technická príručka BCU alebo BMU',
    canRs485: 'Kompatibilita CAN/RS485 s meničom',
    commercialEurope: 'Komerčná skriňa energetického úložiska pre Európu',
    commercialCabinet: 'Plánovanie komerčnej batériovej skrine',
    kitVsCabinet: 'Batériová sada alebo skriňa C&I ESS',
    cooling: 'Vzduchom alebo kvapalinou chladený ESS',
  },
  hu: {
    desc: 'Nyisson meg egy kapcsolódó tervezési oldalt termékválasztáshoz, EU-s szállításhoz, kompatibilitáshoz és ajánlathoz.',
    europe: 'Európai akkumulátoros energiatároló vásárlási útmutató',
    quote: 'Termék- és szállítási ajánlatkérés',
    lifepo4Europe: 'LiFePO4 akkumulátor készlet Európába',
    enclosureEu: '48V akkumulátorház EU-s szállítással',
    rackVsFloor: 'Rack készlet vagy álló ház',
    rackPlanning: '6U rack akkumulátorház tervezése',
    hvEss: 'Nagyfeszültségű BMS ESS-hez',
    currentCompare: '100A vagy 200A nagyfeszültségű BMS',
    bcuBmu: 'BCU vagy BMU műszaki útmutató',
    canRs485: 'CAN/RS485 inverter-kompatibilitás',
    commercialEurope: 'Kereskedelmi energiatároló szekrény Európába',
    commercialCabinet: 'Kereskedelmi akkumulátorszekrény tervezése',
    kitVsCabinet: 'Akkumulátor készlet vagy C&I ESS szekrény',
    cooling: 'Léghűtéses vagy folyadékhűtéses ESS',
  },
  ro: {
    desc: 'Deschideți o pagină de planificare pentru selecția produsului, livrare UE, compatibilitate și ofertă.',
    europe: 'Ghid european de achiziție pentru stocare cu baterii',
    quote: 'Cerere de ofertă produs și livrare',
    lifepo4Europe: 'Kit baterie LiFePO4 pentru Europa',
    enclosureEu: 'Carcasă baterie 48V cu livrare UE',
    rackVsFloor: 'Kit rack față de carcasă de podea',
    rackPlanning: 'Planificare carcasă baterie rack 6U',
    hvEss: 'BMS de înaltă tensiune pentru ESS',
    currentCompare: 'BMS înaltă tensiune 100A sau 200A',
    bcuBmu: 'Ghid tehnic BCU sau BMU',
    canRs485: 'Compatibilitate CAN/RS485 cu invertorul',
    commercialEurope: 'Dulap comercial de stocare energie pentru Europa',
    commercialCabinet: 'Planificare dulap comercial de baterii',
    kitVsCabinet: 'Kit baterie sau dulap ESS C&I',
    cooling: 'ESS răcit cu aer sau lichid',
  },
  bg: {
    desc: 'Отворете свързана страница за избор на продукт, доставка в ЕС, съвместимост и оферта.',
    europe: 'Европейско ръководство за покупка на батерийно съхранение',
    quote: 'Заявка за оферта за продукт и доставка',
    lifepo4Europe: 'LiFePO4 батериен комплект за Европа',
    enclosureEu: '48V батериен корпус с доставка в ЕС',
    rackVsFloor: 'Рак комплект срещу подов корпус',
    rackPlanning: 'Планиране на 6U рак батериен корпус',
    hvEss: 'Високоволтов BMS за ESS',
    currentCompare: '100A или 200A високоволтов BMS',
    bcuBmu: 'Техническо ръководство BCU или BMU',
    canRs485: 'CAN/RS485 съвместимост с инвертор',
    commercialEurope: 'Търговски шкаф за енергийно съхранение за Европа',
    commercialCabinet: 'Планиране на търговски батериен шкаф',
    kitVsCabinet: 'Батериен комплект или C&I ESS шкаф',
    cooling: 'ESS с въздушно или течно охлаждане',
  },
  el: {
    desc: 'Ανοίξτε σχετική σελίδα σχεδιασμού για επιλογή προϊόντος, αποστολή ΕΕ, συμβατότητα και προσφορά.',
    europe: 'Ευρωπαϊκός οδηγός αγοράς αποθήκευσης μπαταριών',
    quote: 'Αίτημα προσφοράς προϊόντος και αποστολής',
    lifepo4Europe: 'Κιτ μπαταρίας LiFePO4 για την Ευρώπη',
    enclosureEu: 'Περίβλημα μπαταρίας 48V με αποστολή ΕΕ',
    rackVsFloor: 'Κιτ rack ή επιδαπέδιο περίβλημα',
    rackPlanning: 'Σχεδιασμός περιβλήματος μπαταρίας rack 6U',
    hvEss: 'BMS υψηλής τάσης για ESS',
    currentCompare: 'BMS υψηλής τάσης 100A ή 200A',
    bcuBmu: 'Τεχνικός οδηγός BCU ή BMU',
    canRs485: 'Συμβατότητα CAN/RS485 με inverter',
    commercialEurope: 'Εμπορικό ερμάριο αποθήκευσης ενέργειας για Ευρώπη',
    commercialCabinet: 'Σχεδιασμός εμπορικού ερμαρίου μπαταριών',
    kitVsCabinet: 'Κιτ μπαταρίας ή ερμάριο C&I ESS',
    cooling: 'ESS με αέρα ή υγρή ψύξη',
  },
  hr: {
    desc: 'Otvorite povezanu stranicu za odabir proizvoda, EU dostavu, kompatibilnost i pripremu ponude.',
    europe: 'Europski vodič za kupnju baterijske pohrane',
    quote: 'Zahtjev za ponudu proizvoda i dostave',
    lifepo4Europe: 'LiFePO4 baterijski komplet za Europu',
    enclosureEu: '48V baterijsko kućište s EU dostavom',
    rackVsFloor: 'Rack komplet naspram podnog kućišta',
    rackPlanning: 'Planiranje 6U rack baterijskog kućišta',
    hvEss: 'Visokonaponski BMS za ESS',
    currentCompare: '100A ili 200A visokonaponski BMS',
    bcuBmu: 'Tehnički vodič BCU ili BMU',
    canRs485: 'CAN/RS485 kompatibilnost s inverterom',
    commercialEurope: 'Komercijalni ormar za pohranu energije za Europu',
    commercialCabinet: 'Planiranje komercijalnog baterijskog ormara',
    kitVsCabinet: 'Baterijski komplet ili C&I ESS ormar',
    cooling: 'ESS hlađen zrakom ili tekućinom',
  },
  sl: {
    desc: 'Odprite povezano načrtovalno stran za izbiro izdelka, dostavo v EU, združljivost in ponudbo.',
    europe: 'Evropski nakupni vodnik za baterijsko shranjevanje',
    quote: 'Zahteva za ponudbo izdelka in dostave',
    lifepo4Europe: 'Baterijski komplet LiFePO4 za Evropo',
    enclosureEu: '48V baterijsko ohišje z dostavo v EU',
    rackVsFloor: 'Rack komplet ali talno ohišje',
    rackPlanning: 'Načrtovanje 6U rack baterijskega ohišja',
    hvEss: 'Visokonapetostni BMS za ESS',
    currentCompare: '100A ali 200A visokonapetostni BMS',
    bcuBmu: 'Tehnični vodnik BCU ali BMU',
    canRs485: 'Združljivost CAN/RS485 z inverterjem',
    commercialEurope: 'Komercialna omara za shranjevanje energije za Evropo',
    commercialCabinet: 'Načrtovanje komercialne baterijske omare',
    kitVsCabinet: 'Baterijski komplet ali C&I ESS omara',
    cooling: 'ESS z zračnim ali tekočinskim hlajenjem',
  },
  lt: {
    desc: 'Atidarykite susijusį planavimo puslapį produkto pasirinkimui, ES siuntimui, suderinamumui ir pasiūlymui.',
    europe: 'Europos baterijų kaupimo pirkimo gidas',
    quote: 'Produkto ir siuntimo pasiūlymo užklausa',
    lifepo4Europe: 'LiFePO4 baterijos komplektas Europai',
    enclosureEu: '48V baterijos korpusas su ES siuntimu',
    rackVsFloor: 'Rack komplektas arba pastatomas korpusas',
    rackPlanning: '6U rack baterijos korpuso planavimas',
    hvEss: 'Aukštos įtampos BMS ESS sistemoms',
    currentCompare: '100A arba 200A aukštos įtampos BMS',
    bcuBmu: 'Techninis vadovas BCU arba BMU',
    canRs485: 'CAN/RS485 suderinamumas su inverteriu',
    commercialEurope: 'Komercinė energijos kaupimo spinta Europai',
    commercialCabinet: 'Komercinės baterijų spintos planavimas',
    kitVsCabinet: 'Baterijos komplektas arba C&I ESS spinta',
    cooling: 'Oru arba skysčiu aušinama ESS',
  },
  lv: {
    desc: 'Atveriet saistītu plānošanas lapu produkta izvēlei, ES piegādei, saderībai un piedāvājumam.',
    europe: 'Eiropas bateriju uzkrāšanas pirkšanas ceļvedis',
    quote: 'Produkta un piegādes piedāvājuma pieprasījums',
    lifepo4Europe: 'LiFePO4 baterijas komplekts Eiropai',
    enclosureEu: '48V baterijas korpuss ar ES piegādi',
    rackVsFloor: 'Rack komplekts vai grīdas korpuss',
    rackPlanning: '6U rack baterijas korpusa plānošana',
    hvEss: 'Augstsprieguma BMS ESS sistēmām',
    currentCompare: '100A vai 200A augstsprieguma BMS',
    bcuBmu: 'Tehniskais ceļvedis BCU vai BMU',
    canRs485: 'CAN/RS485 saderība ar invertoru',
    commercialEurope: 'Komerciāls enerģijas uzkrāšanas skapis Eiropai',
    commercialCabinet: 'Komerciāla bateriju skapja plānošana',
    kitVsCabinet: 'Baterijas komplekts vai C&I ESS skapis',
    cooling: 'Ar gaisu vai šķidrumu dzesēta ESS',
  },
  et: {
    desc: 'Avage seotud planeerimisleht tootevaliku, EL-i tarne, ühilduvuse ja pakkumise jaoks.',
    europe: 'Euroopa akusalvestuse ostujuhend',
    quote: 'Toote ja tarne hinnapäring',
    lifepo4Europe: 'LiFePO4 akukomplekt Euroopale',
    enclosureEu: '48V akukorpus EL-i tarnega',
    rackVsFloor: 'Rack-komplekt või põrandakorpus',
    rackPlanning: '6U rack-akukorpuse planeerimine',
    hvEss: 'Kõrgepinge BMS ESS jaoks',
    currentCompare: '100A või 200A kõrgepinge BMS',
    bcuBmu: 'Tehniline juhend BCU või BMU',
    canRs485: 'CAN/RS485 ühilduvus inverteriga',
    commercialEurope: 'Kommertsenergia salvestuskapp Euroopale',
    commercialCabinet: 'Kommertsakukapi planeerimine',
    kitVsCabinet: 'Akukomplekt või C&I ESS kapp',
    cooling: 'Õhk- või vedelikjahutusega ESS',
  },
  ru: {
    desc: 'Откройте связанную страницу для выбора продукта, доставки по ЕС, совместимости и подготовки предложения.',
    europe: 'Европейский гид по покупке батарейных накопителей',
    quote: 'Запрос предложения по продукту и доставке',
    lifepo4Europe: 'Комплект батареи LiFePO4 для Европы',
    enclosureEu: 'Корпус батареи 48V с доставкой по ЕС',
    rackVsFloor: 'Rack-комплект или напольный корпус',
    rackPlanning: 'Планирование корпуса батареи rack 6U',
    hvEss: 'Высоковольтный BMS для ESS',
    currentCompare: 'Высоковольтный BMS 100A или 200A',
    bcuBmu: 'Техническое руководство BCU или BMU',
    canRs485: 'Совместимость CAN/RS485 с инвертором',
    commercialEurope: 'Коммерческий шкаф накопителя энергии для Европы',
    commercialCabinet: 'Планирование коммерческого батарейного шкафа',
    kitVsCabinet: 'Комплект батареи или шкаф C&I ESS',
    cooling: 'ESS с воздушным или жидкостным охлаждением',
  },
  uk: {
    desc: 'Відкрийте пов’язану сторінку планування для вибору продукту, доставки в ЄС, сумісності та пропозиції.',
    europe: 'Європейський гід із купівлі батарейних накопичувачів',
    quote: 'Запит пропозиції щодо продукту та доставки',
    lifepo4Europe: 'Комплект батареї LiFePO4 для Європи',
    enclosureEu: 'Корпус батареї 48V з доставкою в ЄС',
    rackVsFloor: 'Rack-комплект або підлоговий корпус',
    rackPlanning: 'Планування корпусу батареї rack 6U',
    hvEss: 'Високовольтний BMS для ESS',
    currentCompare: 'Високовольтний BMS 100A або 200A',
    bcuBmu: 'Технічний посібник BCU або BMU',
    canRs485: 'Сумісність CAN/RS485 з інвертором',
    commercialEurope: 'Комерційна шафа накопичення енергії для Європи',
    commercialCabinet: 'Планування комерційної батарейної шафи',
    kitVsCabinet: 'Комплект батареї або шафа C&I ESS',
    cooling: 'ESS з повітряним або рідинним охолодженням',
  },
  fa: {
    desc: 'یک صفحه برنامه‌ریزی مرتبط برای انتخاب محصول، ارسال در اتحادیه اروپا، سازگاری و آماده‌سازی پیشنهاد باز کنید.',
    europe: 'راهنمای خرید اروپایی ذخیره‌سازی باتری',
    quote: 'درخواست قیمت محصول و ارسال',
    lifepo4Europe: 'کیت باتری LiFePO4 برای اروپا',
    enclosureEu: 'محفظه باتری 48V با ارسال اتحادیه اروپا',
    rackVsFloor: 'کیت رک در برابر محفظه ایستاده',
    rackPlanning: 'برنامه‌ریزی محفظه باتری رک 6U',
    hvEss: 'BMS ولتاژ بالا برای ESS',
    currentCompare: 'BMS ولتاژ بالا 100A یا 200A',
    bcuBmu: 'راهنمای فنی BCU یا BMU',
    canRs485: 'سازگاری CAN/RS485 با اینورتر',
    commercialEurope: 'کابینت تجاری ذخیره انرژی برای اروپا',
    commercialCabinet: 'برنامه‌ریزی کابینت تجاری باتری',
    kitVsCabinet: 'کیت باتری یا کابینت C&I ESS',
    cooling: 'ESS با خنک‌کاری هوا یا مایع',
  },
  tr: {
    desc: 'Ürün seçimi, AB sevkiyatı, uyumluluk ve teklif hazırlığı için ilgili planlama sayfasını açın.',
    europe: 'Avrupa batarya depolama satın alma rehberi',
    quote: 'Ürün ve kargo teklifi talebi',
    lifepo4Europe: 'Avrupa için LiFePO4 batarya kiti',
    enclosureEu: 'AB sevkiyatlı 48V batarya kasası',
    rackVsFloor: 'Rack kiti veya zemin tipi kasa',
    rackPlanning: '6U rack batarya kasası planlama',
    hvEss: 'ESS için yüksek voltaj BMS',
    currentCompare: '100A veya 200A yüksek voltaj BMS',
    bcuBmu: 'BCU veya BMU teknik rehberi',
    canRs485: 'CAN/RS485 inverter uyumluluğu',
    commercialEurope: 'Avrupa için ticari enerji depolama kabini',
    commercialCabinet: 'Ticari batarya depolama kabini planlama',
    kitVsCabinet: 'Batarya kiti veya C&I ESS kabini',
    cooling: 'Hava soğutmalı veya sıvı soğutmalı ESS',
  },
}

type GuideCopyKey = keyof typeof guideCopy.en

function guideText(lang: string, key: GuideCopyKey) {
  return (guideCopy[lang as keyof typeof guideCopy] || guideCopy.en)[key]
}

const guideSectionCopy = {
  en: ['Buying guides and planning pages', 'Continue with focused pages for EU shipping, product selection, compatibility, and project quotation planning.'],
  de: ['Kaufleitfäden und Planungsseiten', 'Weiter zu passenden Seiten für EU-Versand, Produktauswahl, Kompatibilität und Projektangebot.'],
  fr: ['Guides d’achat et pages de planification', 'Continuez vers des pages dédiées à la livraison UE, au choix du produit, à la compatibilité et au devis.'],
  es: ['Guías de compra y páginas de planificación', 'Continúe con páginas enfocadas en envío UE, selección de producto, compatibilidad y cotización.'],
  it: ['Guide all’acquisto e pagine di pianificazione', 'Continua con pagine dedicate a spedizione UE, scelta prodotto, compatibilità e preventivo.'],
  nl: ['Koopgidsen en planningspagina’s', 'Ga verder met pagina’s voor EU-verzending, productkeuze, compatibiliteit en projectofferte.'],
  pt: ['Guias de compra e páginas de planeamento', 'Continue com páginas sobre envio UE, seleção de produto, compatibilidade e cotação.'],
  sv: ['Köpguider och planeringssidor', 'Fortsätt med sidor för EU-frakt, produktval, kompatibilitet och projektoffert.'],
  da: ['Købsguider og planlægningssider', 'Fortsæt med sider om EU-forsendelse, produktvalg, kompatibilitet og projekttilbud.'],
  fi: ['Osto-oppaat ja suunnittelusivut', 'Jatka sivuille, jotka käsittelevät EU-toimitusta, tuotevalintaa, yhteensopivuutta ja tarjousta.'],
  pl: ['Przewodniki zakupowe i strony planowania', 'Przejdź do stron o wysyłce UE, wyborze produktu, kompatybilności i ofercie projektu.'],
  cs: ['Nákupní průvodci a plánovací stránky', 'Pokračujte na stránky pro dopravu v EU, výběr produktu, kompatibilitu a nabídku projektu.'],
  sk: ['Nákupní sprievodcovia a plánovacie stránky', 'Pokračujte na stránky pre dopravu v EÚ, výber produktu, kompatibilitu a projektovú ponuku.'],
  hu: ['Vásárlási útmutatók és tervezési oldalak', 'Folytassa az EU-s szállítás, termékválasztás, kompatibilitás és ajánlat oldalain.'],
  ro: ['Ghiduri de cumpărare și pagini de planificare', 'Continuați cu pagini despre livrare UE, selecția produsului, compatibilitate și ofertă.'],
  bg: ['Ръководства за покупка и страници за планиране', 'Продължете към страници за доставка в ЕС, избор на продукт, съвместимост и оферта.'],
  el: ['Οδηγοί αγοράς και σελίδες σχεδιασμού', 'Συνεχίστε σε σελίδες για αποστολή ΕΕ, επιλογή προϊόντος, συμβατότητα και προσφορά.'],
  hr: ['Vodiči za kupnju i stranice planiranja', 'Nastavite na stranice za EU dostavu, odabir proizvoda, kompatibilnost i ponudu.'],
  sl: ['Nakupni vodniki in načrtovalne strani', 'Nadaljujte na strani za dostavo v EU, izbiro izdelka, združljivost in ponudbo.'],
  lt: ['Pirkimo gidai ir planavimo puslapiai', 'Tęskite puslapiuose apie ES siuntimą, produkto pasirinkimą, suderinamumą ir pasiūlymą.'],
  lv: ['Pirkšanas ceļveži un plānošanas lapas', 'Turpiniet ar lapām par ES piegādi, produkta izvēli, saderību un piedāvājumu.'],
  et: ['Ostujuhendid ja planeerimislehed', 'Jätkake lehtedega EL-i tarne, tootevaliku, ühilduvuse ja pakkumise kohta.'],
  ru: ['Руководства по покупке и страницы планирования', 'Перейдите к страницам о доставке по ЕС, выборе продукта, совместимости и предложении.'],
  uk: ['Посібники з купівлі та сторінки планування', 'Перейдіть до сторінок про доставку в ЄС, вибір продукту, сумісність і пропозицію.'],
  fa: ['راهنماهای خرید و صفحات برنامه‌ریزی', 'به صفحات مربوط به ارسال اتحادیه اروپا، انتخاب محصول، سازگاری و پیشنهاد پروژه بروید.'],
  tr: ['Satın alma rehberleri ve planlama sayfaları', 'AB sevkiyatı, ürün seçimi, uyumluluk ve proje teklifi sayfalarıyla devam edin.'],
}

export function getProductBuyingGuideSectionCopy(lang: string) {
  const [title, description] = guideSectionCopy[lang as keyof typeof guideSectionCopy] || guideSectionCopy.en
  return { title, description }
}

export function getProductSeoContent(product: Product): ProductSeoContent {
  if (product.slug === 'battery-kit') {
    return {
      projectFit:
        'This caster battery enclosure kit is intended for low-voltage LiFePO4 projects where installers need a movable enclosure and optional integrated monitoring hardware. It is commonly selected for residential backup, small commercial storage, outdoor work power, and demonstration systems after compatible cells are installed.',
      installationNotes: [
        'Confirm cell dimensions, inverter communication compatibility, and cable layout before assembly.',
        'Reserve enough floor clearance for caster movement, cable bend radius, and ventilation.',
        'Select Enclosure + LCD + BMS when integrated protection and local monitoring are required.',
      ],
      procurementNotes: [
        'Share target assembled capacity, cell brand, inverter model, and destination country for compatibility confirmation.',
        'For repeat projects, confirm enclosure color, logo, wiring layout, and selected hardware package.',
      ],
    }
  }

  if (product.slug === '6u-battery-kit') {
    return {
      projectFit:
        'The 6U Battery Kit is a 19-inch rack-mount enclosure and integration kit for building a compact LiFePO4 battery module. It fits residential solar backup, telecom rooms, small commercial backup systems, and off-grid equipment rooms after compatible cells are installed.',
      installationNotes: [
        'Confirm rack depth, front service clearance, cell dimensions, and cabinet airflow before installation.',
        'Plan parallel capacity, breaker sizing, and communication addresses before scaling multiple units.',
        'Verify CAN or RS485 compatibility with the selected inverter during commissioning.',
      ],
      procurementNotes: [
        'Provide rack layout, target assembled capacity, inverter brand, cell specification, and required quantity.',
        'Select Enclosure + LCD + BMS for integrated electronics, or Enclosure Only when electronics are sourced separately.',
      ],
    }
  }

  if (product.slug === 'high-voltage-kit') {
    return {
      projectFit:
        'The High Voltage BMS Control Kit is designed for commercial and industrial battery racks where BCU master and BMU slave control hardware coordinates voltage sampling, current detection, insulation monitoring, active balancing, and communication with PCS or EMS equipment.',
      installationNotes: [
        'Confirm total pack voltage, cell count, current rating, and required master/slave box quantities before ordering.',
        'Reserve isolated wiring routes for high-voltage detection, communication, and safety interlock circuits.',
        'Match CAN, RS485, or isoSPI communication requirements with the PCS and EMS design.',
      ],
      procurementNotes: [
        'Choose 100A for moderate-current racks and 200A when higher current capability is required.',
        'Share the single-line diagram, pack configuration, PCS model, and protection requirements for engineering review.',
      ],
    }
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return {
      projectFit:
        'The C&I High Voltage ESS Cabinet is a configurable integrated cabinet platform for commercial energy storage projects such as peak shaving, backup power, solar self-consumption, demand management, and industrial park energy optimization. The final supply scope is defined in the project quotation.',
      installationNotes: [
        'Confirm outdoor placement, foundation, ventilation clearance, ambient temperature, and fire protection requirements.',
        'Choose air cooling or liquid cooling according to power density, duty cycle, and site thermal conditions.',
        'Coordinate PCS, EMS, grid connection, and monitoring interfaces during project design.',
      ],
      procurementNotes: [
        'Share capacity target, AC power, PV input needs, grid standard, site photos, and delivery country.',
        'The final quotation confirms battery modules, PCS, EMS, cooling, fire protection, monitoring, and other included components.',
      ],
    }
  }

  return {
    projectFit: product.description,
    installationNotes: ['Confirm system voltage, communication method, installation environment, and safety requirements.'],
    procurementNotes: ['Contact JKESS with project drawings and quantity requirements for configuration support.'],
  }
}

export function getProductBuyingGuideLinks(product: Product, lang = 'en'): ProductBuyingGuideLink[] {
  const sharedEurope = [
    {
      href: '/europe',
      title: guideText(lang, 'europe'),
      description: guideText(lang, 'desc'),
    },
    {
      href: '/shipping-quote',
      title: guideText(lang, 'quote'),
      description: guideText(lang, 'desc'),
    },
  ]

  if (product.slug === 'battery-kit') {
    return [
      {
        href: '/europe/lifepo4-battery-kit-europe',
        title: guideText(lang, 'lifepo4Europe'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/europe/48v-battery-enclosure-eu-shipping',
        title: guideText(lang, 'enclosureEu'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        title: guideText(lang, 'rackVsFloor'),
        description: guideText(lang, 'desc'),
      },
      ...sharedEurope,
    ]
  }

  if (product.slug === '6u-battery-kit') {
    return [
      {
        href: '/rack-battery-enclosures',
        title: guideText(lang, 'rackPlanning'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/compare/rack-vs-floor-standing-battery-kit',
        title: guideText(lang, 'rackVsFloor'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/europe/lifepo4-battery-kit-europe',
        title: guideText(lang, 'lifepo4Europe'),
        description: guideText(lang, 'desc'),
      },
      ...sharedEurope,
    ]
  }

  if (product.slug === 'high-voltage-kit') {
    return [
      {
        href: '/high-voltage-bms-for-ess',
        title: guideText(lang, 'hvEss'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/compare/100a-vs-200a-high-voltage-bms',
        title: guideText(lang, 'currentCompare'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/guides/bcu-vs-bmu',
        title: guideText(lang, 'bcuBmu'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/can-rs485-bms-inverter-compatibility',
        title: guideText(lang, 'canRs485'),
        description: guideText(lang, 'desc'),
      },
    ]
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return [
      {
        href: '/europe/commercial-energy-storage-cabinet-europe',
        title: guideText(lang, 'commercialEurope'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/commercial-battery-storage-cabinet',
        title: guideText(lang, 'commercialCabinet'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/compare/battery-kit-vs-ci-ess-cabinet',
        title: guideText(lang, 'kitVsCabinet'),
        description: guideText(lang, 'desc'),
      },
      {
        href: '/guides/air-cooled-vs-liquid-cooled-ess',
        title: guideText(lang, 'cooling'),
        description: guideText(lang, 'desc'),
      },
      ...sharedEurope,
    ]
  }

  return sharedEurope
}

export function getProductUseCases(product: Product): ProductUseCases {
  if (product.slug === 'battery-kit') {
    return {
      applications: [
        'Home backup power and residential solar storage assembly projects',
        'Movable battery systems for workshops, cabins, and outdoor work sites',
        'Small commercial storage projects that need easy movement and positioning',
      ],
      compatibleSystems: [
        '51.2V low-voltage LiFePO4 battery systems',
        'CAN 2.0 / RS485 inverter communication environments',
        '280Ah to 320Ah LFP cell configurations',
      ],
      selectionNotes: [
        'Choose Enclosure + LCD + BMS when integrated monitoring and protection hardware is required.',
        'Choose Enclosure Only when cells, BMS, display, and related electronics are sourced separately.',
        'Battery cells must be purchased separately for every option.',
      ],
    }
  }

  if (product.slug === '6u-battery-kit') {
    return {
      applications: [
        '19-inch rack solar battery assembly projects for homes and commercial sites',
        'Telecom backup power and equipment room energy storage',
        'Off-grid and hybrid inverter systems needing modular rack expansion',
      ],
      compatibleSystems: [
        'Standard 19-inch cabinet and rack installations',
        '51.2V LiFePO4 battery storage platforms',
        'CAN 2.0 / RS485 compatible inverter and monitoring systems',
      ],
      selectionNotes: [
        'Choose Enclosure + LCD + BMS for integrated monitoring and protection hardware.',
        'Choose Enclosure Only when the project uses separately sourced electronics.',
        'The stated supported capacity applies only after compatible cells are installed.',
      ],
    }
  }

  if (product.slug === 'high-voltage-kit') {
    return {
      applications: [
        'Commercial and industrial high-voltage energy storage systems',
        'PCS and EMS integrated battery racks requiring BCU and BMU coordination',
        'High-voltage battery clusters with active balancing and remote monitoring',
      ],
      compatibleSystems: [
        '100A or 200A high-voltage battery control architectures',
        'PCS / EMS systems using CAN, RS485, or isoSPI communication',
        'LFP, NMC, LMO, and LTO battery chemistry configurations',
      ],
      selectionNotes: [
        'Each listed price applies to the selected master or slave control box only.',
        'Confirm master and slave box quantities based on pack count, voltage, and EMS design.',
        'Battery cells, modules, racks, PCS, and EMS equipment are not included.',
      ],
    }
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return {
      applications: [
        'Commercial peak shaving, demand management, and time-of-use optimization',
        'Industrial park, hospital, hotel, and commercial center backup power',
        'Solar self-consumption and renewable energy storage projects',
      ],
      compatibleSystems: [
        '30kW to 125kW AC power commercial and industrial projects',
        'Outdoor IP55 ESS installations with air-cooled or liquid-cooled design',
        'WiFi, 4G, LAN, CAN, RS485, and Ethernet monitoring environments',
      ],
      selectionNotes: [
        'Request a quotation after the final capacity, PCS power, cooling method, and site conditions are defined.',
        'The quotation is the controlling document for the final included equipment and services.',
        'Confirm fire suppression, anti-corrosion, communication, installation, and commissioning requirements during project design.',
      ],
    }
  }

  return {
    applications: [product.description],
    compatibleSystems: ['JKESS energy storage projects'],
    selectionNotes: ['Contact JKESS for configuration support.'],
  }
}

export function getProductFaqs(product: Product): ProductFaq[] {
  if (product.slug === 'battery-kit') {
    return [
      {
        question: 'Are battery cells included with the Battery Kit (With Caster)?',
        answer: 'No. The kit is supplied as enclosure and assembly hardware, with optional LCD and BMS depending on the selected variant. Compatible 280Ah to 320Ah LiFePO4 cells must be purchased separately.',
      },
      {
        question: 'What is included in each Battery Kit option?',
        answer: 'Enclosure Only supplies the enclosure hardware and caster base. Enclosure + LCD + BMS also includes the specified display and BMS hardware. Refer to the final packing list for the exact accessories supplied.',
      },
      {
        question: 'Where is the caster battery kit typically used?',
        answer: 'It is suitable for home backup, mobile power, small commercial storage, and semi-outdoor battery assembly projects that need easy movement and positioning.',
      },
      {
        question: 'Can the Battery Kit be shipped to Europe?',
        answer: 'European Union delivery addresses can use the current direct-checkout shipping rule where available. For bulk quantities, remote areas, or project delivery requirements, request a written quotation before ordering.',
      },
      {
        question: 'When should I request a quote instead of using direct checkout?',
        answer: 'Request a quote if the order includes multiple kits, repeat-project quantities, special packing, remote delivery, distributor resale, or any delivery condition that affects freight, unloading, customs, documentation, or final landed cost.',
      },
      {
        question: 'Can JKESS confirm inverter compatibility before I order?',
        answer: 'Yes. Share the inverter brand, model, firmware version, CAN or RS485 requirement, cell plan, and selected BMS option so JKESS can review whether the selected package is suitable before purchase.',
      },
      {
        question: 'Can JKESS support OEM color, logo, or repeat project requirements?',
        answer: 'Yes. Share the target quantity, color requirement, logo placement, cell plan, inverter model, and destination country so JKESS can review feasible OEM or repeat-project options.',
      },
    ]
  }

  if (product.slug === '6u-battery-kit') {
    return [
      {
        question: 'Are battery cells included with the 6U Battery Kit?',
        answer: 'No. The stated 15kWh capacity is the supported assembled configuration after compatible LiFePO4 cells are installed. Battery cells must be purchased separately.',
      },
      {
        question: 'What is the application of the 6U Battery Kit?',
        answer: 'The kit is designed for 19-inch rack battery assembly projects, residential solar storage, telecom backup, commercial backup power, and off-grid systems.',
      },
      {
        question: 'Can the 6U Battery Kit be expanded in parallel?',
        answer: 'Yes. After compatible cells and electronics are installed, multiple modules can be planned for parallel expansion subject to BMS, inverter, breaker, and cabling requirements.',
      },
      {
        question: 'Is the 6U Battery Kit suitable for EU residential solar storage projects?',
        answer: 'It can be used in EU-oriented residential or small commercial storage assembly projects when the final battery cells, BMS, inverter communication, protection devices, and installation rules are confirmed by the installer.',
      },
      {
        question: 'Does the 6U Battery Kit include the rack cabinet?',
        answer: 'No. The product is a 6U battery enclosure and assembly hardware kit. The external 19-inch rack cabinet, battery cells, inverter, external breakers, cabling, installation, and commissioning are not included unless separately confirmed.',
      },
      {
        question: 'Can I order 6U kits for several EU installation sites?',
        answer: 'Yes, but multi-site or bulk orders should be reviewed by quotation so product options, quantities, packaging, delivery addresses, unloading conditions, and documentation requirements can be confirmed before payment.',
      },
      {
        question: 'What information should I provide before buying several 6U kits?',
        answer: 'Provide the inverter model, target capacity, rack layout, cell specification, quantity, destination country, and any documentation requirements so JKESS can confirm the correct option and shipping route.',
      },
    ]
  }

  if (product.slug === 'high-voltage-kit') {
    return [
      {
        question: 'What is included in the listed High Voltage Kit price?',
        answer: 'The price applies only to the selected 100A or 200A BCU master control box or BMU slave control box. Battery cells, battery modules, battery racks, PCS, EMS, and complete battery packs are not included.',
      },
      {
        question: 'What is the High Voltage Kit used for?',
        answer: 'It is BMS control hardware for high-voltage energy storage systems requiring master control, slave monitoring, active balancing, insulation monitoring, and PCS or EMS communication.',
      },
      {
        question: 'Does the High Voltage Kit support remote monitoring?',
        answer: 'Remote OTA upgrades and IoT monitoring can be supported depending on the final system architecture and selected supporting services.',
      },
      {
        question: 'How do I choose between the 100A and 200A High Voltage Kit options?',
        answer: 'Choose based on the full electrical design, including continuous current, peak current, pack voltage, PCS power, thermal design, contactors, fuses, cables, and duty cycle. JKESS can review the selection before purchase.',
      },
      {
        question: 'Can JKESS review PCS or EMS communication compatibility?',
        answer: 'Yes. Send the PCS or EMS model, protocol requirement, voltage range, current rating, contactor logic, and project diagram so JKESS can review CAN, RS485, or isoSPI integration requirements.',
      },
      {
        question: 'How many BCU and BMU boxes does one project need?',
        answer: 'The required quantity depends on rack count, module arrangement, series cell count, voltage range, current class, communication topology, and EMS design. Send the pack diagram and JKESS can review the master and slave control box quantities.',
      },
      {
        question: 'Can the High Voltage Kit be used for European commercial ESS projects?',
        answer: 'Yes. It can be reviewed for European high-voltage ESS projects when the PCS, EMS, grid interface, safety interlock, documentation, and delivery requirements are defined before ordering.',
      },
    ]
  }

  if (product.slug === 'tness-ci-ess-cabinet') {
    return [
      {
        question: 'What capacity range does the C&I High Voltage ESS Cabinet cover?',
        answer: 'The cabinet platform covers configurations from 64.3kWh to 261kWh, including air-cooled and liquid-cooled commercial and industrial storage systems.',
      },
      {
        question: 'What is included with a C&I ESS Cabinet order?',
        answer: 'The final quotation defines the exact supply scope, including the selected cabinet, battery modules, BMS, PCS, EMS, cooling, fire suppression, monitoring, accessories, and services where specified.',
      },
      {
        question: 'How do customers order the C&I High Voltage ESS Cabinet?',
        answer: 'This product is supplied through project quotation because the final configuration depends on capacity, cooling method, PCS requirements, site conditions, certification, installation, and communication needs.',
      },
      {
        question: 'Can the C&I ESS Cabinet be configured for European projects?',
        answer: 'Yes. Share the delivery country, grid connection requirements, capacity target, AC power, site environment, compliance documents required by the customer, and installation scope for project review.',
      },
      {
        question: 'Does the quotation include freight, duty, tax, or onsite installation?',
        answer: 'Only the signed written quotation defines whether freight, duty, tax, installation, commissioning, training, or site services are included. Items not listed in the quotation should be treated as excluded.',
      },
      {
        question: 'What information is needed for a faster C&I ESS Cabinet quotation?',
        answer: 'Provide the target capacity, AC power, backup duration, site country and address type, grid requirements, cooling preference, operating environment, fire protection expectations, installation boundary, and required documentation.',
      },
      {
        question: 'Can one quotation cover several European project sites?',
        answer: 'Yes. Send the country, city, quantity, target capacity, site conditions, and delivery schedule for each site so JKESS can review whether the same cabinet configuration and logistics route can be used.',
      },
    ]
  }

  return [{ question: `What is ${product.name} used for?`, answer: product.description }]
}

const productCatalog: Product[] = [
  {
    slug: 'battery-kit',
    name: 'Battery Kit (With Caster)',
    category: 'battery-kit',
    categoryLabel: 'Caster Battery Enclosure Kit',
    tagline: 'Movable LiFePO4 battery enclosure kit with optional BMS and LCD',
    description:
      'The JKESS Roller Battery Kit is a heavy-duty enclosure and assembly hardware kit for building a movable 51.2V LiFePO4 storage battery. It supports 280Ah to 320Ah cells and 15kWh or 16kWh assembled configurations after compatible cells are installed. Choose either the enclosure-only package or the package with the specified BMS and LCD. Battery cells are not included.',
    included: [
      'Heavy-duty sheet-metal enclosure with caster base',
      'Internal mechanical and connection hardware supplied with the selected package',
      'LCD display and BMS only when the Enclosure + LCD + BMS option is selected',
      'Standard packing list and applicable product documentation',
    ],
    notIncluded: [
      'LiFePO4 battery cells',
      'Inverter, charger, external breaker, and external cabling',
      'Onsite assembly, installation, and commissioning',
      'Any component not listed in the selected variant or final packing list',
    ],
    features: [
      'Heavy-duty caster wheels for easier movement and positioning',
      'Sheet-metal enclosure with IP54-rated enclosure design',
      'Supports 280Ah to 320Ah LiFePO4 cell configurations',
      'Optional BMS and LCD package for monitoring and protection hardware',
      'CAN / RS485 communication when the compatible BMS package is selected',
      'Designed for 15kWh or 16kWh assembled battery configurations',
      'Scalable project design subject to inverter, BMS, breaker, and cabling requirements',
      '1-year warranty for the supplied JKESS hardware',
    ],
    specs: [
      { key: 'Product Type', value: 'Battery enclosure and assembly hardware kit' },
      { key: 'Supported Assembled Capacity', value: '15kWh / 16kWh after compatible cells are installed' },
      { key: 'Battery Cells Included', value: 'No' },
      { key: 'Package Options', value: 'Enclosure Only / Enclosure + LCD + BMS' },
      { key: 'Compatible Cells', value: '280Ah ~ 320Ah LFP (LiFePO4)' },
      { key: 'Enclosure', value: 'Sheet-metal, IP54-rated design' },
      { key: 'Dimensions', value: '835 × 400 × 280 mm' },
      { key: 'Weight', value: '~28 kg empty, configuration dependent' },
      { key: 'Mobility', value: '4 heavy-duty caster wheels, 2 with brakes' },
      { key: 'Communication', value: 'CAN 2.0 / RS485 with compatible BMS option' },
      { key: 'Warranty', value: '1 year for supplied hardware' },
    ],
    images: [
      '/images/battery-kit-hero.webp',
      '/images/battery-kit-system.webp',
      '/images/battery-kit-front.webp',
      '/images/battery-kit-side.webp',
      '/images/battery-kit-rear.webp',
      '/images/battery-kit-display.webp',
    ],
    type: 'shop',
    variants: [
      { label: 'Enclosure + LCD + BMS', price: '$400.00' },
      { label: 'Enclosure Only', price: '$300.00' },
    ],
    detailImages: [
      '/images/battery-kit-detail/1.webp',
      '/images/battery-kit-detail/2.webp',
      '/images/battery-kit-detail/3.webp',
      '/images/battery-kit-detail/4.webp',
      '/images/battery-kit-detail/5.webp',
      '/images/battery-kit-detail/6.webp',
      '/images/battery-kit-detail/7.webp',
      '/images/battery-kit-detail/8.webp',
      '/images/battery-kit-detail/9.webp',
      '/images/battery-kit-detail/10.webp',
      '/images/battery-kit-detail/11.webp',
      '/images/battery-kit-detail/12.webp',
      '/images/battery-kit-detail/13.webp',
      '/images/battery-kit-detail/14.webp',
      '/images/battery-kit-detail/15.webp',
      '/images/battery-kit-detail/16.webp',
    ],
  },
  {
    slug: 'high-voltage-kit',
    name: 'High Voltage Kit',
    category: 'high-voltage-kit',
    categoryLabel: 'High Voltage BMS Control Kit',
    tagline: 'BCU and BMU control hardware for high-voltage battery systems',
    description:
      'The JKESS High Voltage Kit is modular BMS control hardware for high-voltage energy storage systems. Customers select an individual 100A or 200A BCU master control box or BMU slave control box. The selected price applies only to that control box. Battery cells, battery modules, battery racks, PCS, EMS, and complete battery packs are not included.',
    included: [
      'The selected 100A or 200A BCU master control box or BMU slave control box',
      'Embedded control and communication hardware provided with that selected model',
      'Standard accessories and documentation listed in the model packing list',
      'Configuration guidance based on project information supplied to JKESS',
    ],
    notIncluded: [
      'Battery cells, battery modules, and complete battery packs',
      'Additional master or slave control boxes not selected in the order',
      'Battery rack, high-voltage cabling, contactors, PCS, EMS, and inverter equipment',
      'System engineering, onsite installation, and commissioning unless separately quoted',
    ],
    features: [
      'BCU-B3 master control with ISO 26262-oriented functional safety design and 1500V detection',
      'BMU-H5-16 slave control with ±5mV accuracy and 2A bidirectional active balancing',
      'SOC / SOH / SOP estimation based on the battery model',
      '9 to 16 series cell voltage and 8-channel temperature collection per slave',
      'Remote OTA and IoT monitoring support depending on final architecture',
      'Multi-level power isolation and high EMC immunity',
      'CAN / RS485 / isoSPI communication with compatible PCS and EMS equipment',
      'Supports LFP, NMC, LMO, and LTO battery system designs',
    ],
    specs: [
      { key: 'Product Type', value: 'High-voltage BMS control hardware' },
      { key: 'Order Scope', value: 'One selected master or slave control box per ordered unit' },
      { key: 'Battery Included', value: 'No' },
      { key: 'Master Control', value: 'BCU-B3 — ISO 26262-oriented design, 1500V detection' },
      { key: 'Slave Control', value: 'BMU-H5-16 — 16-cell, 2A active balancing' },
      { key: 'Voltage Accuracy', value: '±5mV BMU / ≤1% BCU total voltage' },
      { key: 'Current Detection', value: '-300A ~ +300A, ≤1% accuracy' },
      { key: 'Insulation', value: '≥20MΩ, high-voltage interlock' },
      { key: 'Communication', value: 'CAN ×2 / RS485 ×4 / isoSPI daisy-chain' },
      { key: 'Operating Temperature', value: '-25°C ~ +85°C' },
    ],
    images: [
      '/images/hv-kit/1.jpg',
      '/images/hv-kit/2.jpg',
      '/images/hv-kit/3.jpg',
      '/images/hv-kit/4.jpg',
      '/images/hv-kit/5.jpg',
      '/images/hv-kit/6.jpg',
    ],
    detailImages: [
      '/images/hv-kit-pdf-detail/page-01.webp',
      '/images/hv-kit-pdf-detail/page-02.webp',
      '/images/hv-kit-pdf-detail/page-03.webp',
      '/images/hv-kit-pdf-detail/page-04.webp',
      '/images/hv-kit-pdf-detail/page-05.webp',
      '/images/hv-kit-pdf-detail/page-06.webp',
      '/images/hv-kit-pdf-detail/page-07.webp',
      '/images/hv-kit-pdf-detail/page-08.webp',
      '/images/hv-kit-pdf-detail/page-09.webp',
      '/images/hv-kit-pdf-detail/page-10.webp',
    ],
    type: 'shop',
    variants: [
      { label: '100A Master Control Box', price: '$1020.00' },
      { label: '100A Slave Control Box', price: '$390.00' },
      { label: '200A Master Control Box', price: '$1180.00' },
      { label: '200A Slave Control Box', price: '$420.00' },
    ],
  },
  {
    slug: 'tness-ci-ess-cabinet',
    name: 'C&I High Voltage ESS Cabinet',
    category: 'commercial-ess',
    categoryLabel: 'Configurable C&I ESS Cabinet',
    tagline: 'Configured-to-order integrated energy storage cabinet for commercial and industrial projects',
    description:
      'The C&I High Voltage ESS Cabinet is a configurable integrated cabinet platform for commercial and industrial energy storage projects. Available configurations cover approximately 64.3kWh to 261kWh with air-cooled or liquid-cooled options. The final quotation defines the exact battery modules, BMS, PCS, EMS, cooling, fire suppression, monitoring, accessories, installation support, and other supplied items.',
    included: [
      'The ESS cabinet and factory-integrated components specifically listed in the project quotation',
      'Selected battery modules, BMS, PCS, EMS, cooling, fire protection, and monitoring where specified',
      'Factory assembly and testing for the quoted configuration',
      'Technical documentation and remote support listed in the quotation',
    ],
    notIncluded: [
      'Civil works, foundation, crane work, and site preparation unless quoted',
      'Site AC/DC cabling, switchgear, transformer, and grid interconnection unless quoted',
      'Onsite installation, commissioning, travel, and training unless quoted',
      'Any equipment, certification, freight, duty, tax, or service not included in the final quotation',
    ],
    features: [
      'Capacity configurations from approximately 64.3kWh to 261kWh',
      'Modular cabinet architecture with quick-connect battery modules',
      'Integrated BMS with active balancing in applicable configurations',
      'Air-cooled and liquid-cooled options',
      'Outdoor IP55 cabinet design with up to C4 anti-corrosion protection',
      'Multi-level electrical protection according to selected configuration',
      'Pack-level and cabinet-level fire protection options',
      'WiFi, 4G, LAN, CAN, RS485, and Ethernet monitoring options',
    ],
    specs: [
      { key: 'Product Type', value: 'Configured-to-order C&I energy storage cabinet' },
      { key: 'Final Supply Scope', value: 'Defined by the signed project quotation' },
      { key: 'Capacity Range', value: '64.3kWh / 80.4kWh / 100.3kWh / 112.5kWh / 120.57kWh / 215.04kWh / 241kWh / 261kWh' },
      { key: 'Cooling Options', value: 'Intelligent air cooling / liquid cooling' },
      { key: 'Battery Chemistry', value: 'LFP 3.2V 280Ah / 314Ah cells, configuration dependent' },
      { key: 'AC Power Range', value: '30kW ~ 125kW' },
      { key: 'PV Input Range', value: '45.5kW ~ 200kW maximum, configuration dependent' },
      { key: 'DC Voltage Range', value: '165.5V ~ 949V, configuration dependent' },
      { key: 'Round-trip Efficiency', value: '≥88%, configuration dependent' },
      { key: 'Protection Rating', value: 'IP55 outdoor cabinet, up to C4 anti-corrosion level' },
      { key: 'Communication', value: 'WiFi / 4G / LAN / CAN / RS485 / Ethernet, configuration dependent' },
      { key: 'Operating Temperature', value: '-20°C ~ 55°C' },
      { key: 'Dimensions Range', value: '1050 × 1150 × 1820 mm to 1200 × 1490 × 2472 mm' },
      { key: 'Weight Range', value: '≤850 kg to approximately 2700 kg, configuration dependent' },
    ],
    images: [
      '/images/tness-ci-ess/main-1.webp',
      '/images/tness-ci-ess/main-2.webp',
      '/images/tness-ci-ess/main-3.webp',
      '/images/tness-ci-ess/main-4.webp',
      '/images/tness-ci-ess/main-5.webp',
    ],
    detailImages: [
      '/images/tness-ci-ess-detail/page-01.webp',
      '/images/tness-ci-ess-detail/page-02.webp',
      '/images/tness-ci-ess-detail/page-03.webp',
      '/images/tness-ci-ess-detail/page-04.webp',
      '/images/tness-ci-ess-detail/page-05.webp',
      '/images/tness-ci-ess-detail/page-06.webp',
      '/images/tness-ci-ess-detail/page-07.webp',
      '/images/tness-ci-ess-detail/page-08.webp',
      '/images/tness-ci-ess-detail/page-09.webp',
      '/images/tness-ci-ess-detail/page-10.webp',
      '/images/tness-ci-ess-detail/page-11.webp',
      '/images/tness-ci-ess-detail/page-12.webp',
    ],
    type: 'inquiry',
  },
  {
    slug: '6u-battery-kit',
    name: '6U Battery Kit',
    category: 'battery-kit',
    categoryLabel: '6U Rack Battery Enclosure Kit',
    tagline: '6U rack-mount LiFePO4 enclosure kit with optional BMS and LCD',
    description:
      'The JKESS 6U Battery Kit (JKLU015) is a 19-inch rack-mount enclosure and assembly hardware kit for building a 51.2V LiFePO4 battery module. The supported 15kWh capacity applies after compatible cells are installed. Choose either the enclosure-only package or the package with the specified BMS and 4.3-inch LCD. Battery cells are not included.',
    included: [
      '6U sheet-metal enclosure for standard 19-inch rack installation',
      'Internal mechanical and connection hardware supplied with the selected package',
      '4.3-inch LCD and BMS only when the Enclosure + LCD + BMS option is selected',
      'Standard packing list and applicable product documentation',
    ],
    notIncluded: [
      'LiFePO4 battery cells',
      'External rack cabinet, inverter, charger, breaker, and external cabling',
      'Onsite assembly, installation, and commissioning',
      'Any component not listed in the selected variant or final packing list',
    ],
    features: [
      '6U rack-mount form factor for standard 19-inch cabinets',
      'Supports a 51.2V 15kWh assembled configuration after compatible cells are installed',
      'Optional intelligent BMS with active balancing',
      'Optional 4.3-inch LCD for voltage, current, temperature, and SOC monitoring',
      'CAN / RS485 communication with compatible electronics',
      'Modular design for planned parallel expansion',
      'Compatible with inverter protocols subject to model and firmware confirmation',
      '1-year warranty for the supplied JKESS hardware',
    ],
    specs: [
      { key: 'Model', value: 'JKLU015' },
      { key: 'Product Type', value: '6U rack battery enclosure and assembly hardware kit' },
      { key: 'Supported Assembled Capacity', value: '15kWh after compatible cells are installed' },
      { key: 'Battery Cells Included', value: 'No' },
      { key: 'Nominal Voltage', value: '51.2V assembled configuration' },
      { key: 'Package Options', value: 'Enclosure Only / Enclosure + LCD + BMS' },
      { key: 'Form Factor', value: '6U rack-mount, 19-inch' },
      { key: 'Cell Chemistry', value: 'LiFePO4 compatible' },
      { key: 'Communication', value: 'CAN 2.0 / RS485 with compatible BMS option' },
      { key: 'Display', value: 'Optional 4.3-inch LCD touch display' },
      { key: 'Operating Temperature', value: '-20°C ~ 60°C, component dependent' },
      { key: 'Protection Rating', value: 'IP20 indoor enclosure design' },
      { key: 'Dimensions', value: '715 × 472 × 270 mm' },
      { key: 'Weight', value: '~25 kg empty, configuration dependent' },
      { key: 'Warranty', value: '1 year for supplied hardware' },
    ],
    images: [
      '/images/6u-kit/1.webp',
      '/images/6u-kit/2.webp',
      '/images/6u-kit/3.webp',
      '/images/6u-kit/4.webp',
      '/images/6u-kit/5.webp',
      '/images/6u-kit/6.webp',
    ],
    detailImages: [
      '/images/6u-kit-detail/1.webp',
      '/images/6u-kit-detail/2.webp',
      '/images/6u-kit-detail/3.webp',
      '/images/6u-kit-detail/4.webp',
      '/images/6u-kit-detail/5.webp',
      '/images/6u-kit-detail/6.webp',
      '/images/6u-kit-detail/7.webp',
      '/images/6u-kit-detail/8.webp',
      '/images/6u-kit-detail/9.webp',
      '/images/6u-kit-detail/10.webp',
      '/images/6u-kit-detail/11.webp',
      '/images/6u-kit-detail/12.webp',
      '/images/6u-kit-detail/14.webp',
      '/images/6u-kit-detail/15.webp',
      '/images/6u-kit-detail/16.webp',
    ],
    type: 'shop',
    variants: [
      { label: 'Enclosure + LCD + BMS', price: '$380.00' },
      { label: 'Enclosure Only', price: '$280.00' },
    ],
  },
]

const productDisplayOrder = ['battery-kit', '6u-battery-kit', 'high-voltage-kit', 'tness-ci-ess-cabinet']

const getProductDisplayIndex = (slug: string) => {
  const index = productDisplayOrder.indexOf(slug)
  return index === -1 ? productDisplayOrder.length : index
}

export const products: Product[] = [...productCatalog].sort(
  (a, b) => getProductDisplayIndex(a.slug) - getProductDisplayIndex(b.slug)
)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter((item) => item.slug !== product.slug && item.category === product.category)
  const otherProducts = products.filter((item) => item.slug !== product.slug && item.category !== product.category)
  return [...sameCategory, ...otherProducts].slice(0, limit)
}
