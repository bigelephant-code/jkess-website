import type { LangCode } from '@/i18n/config'

const copy: Record<LangCode, [pending: string, kit: string]> = {
  en: ['Price to be confirmed', 'Kit'],
  de: ['Preis noch zu bestätigen', 'Bausatz'],
  fr: ['Prix à confirmer', 'Kit'],
  es: ['Precio por confirmar', 'Kit'],
  it: ['Prezzo da confermare', 'Kit'],
  nl: ['Prijs nog te bevestigen', 'Bouwpakket'],
  pt: ['Preço a confirmar', 'Kit'],
  sv: ['Pris ej fastställt', 'Byggsats'],
  da: ['Pris afventer bekræftelse', 'Byggesæt'],
  fi: ['Hinta vahvistetaan myöhemmin', 'Asennussarja'],
  pl: ['Cena do potwierdzenia', 'Zestaw'],
  cs: ['Cena bude potvrzena', 'Sada'],
  sk: ['Cena bude potvrdená', 'Súprava'],
  hu: ['Az ár még nem végleges', 'Készlet'],
  ro: ['Prețul urmează să fie confirmat', 'Kit'],
  bg: ['Цената предстои да бъде потвърдена', 'Комплект'],
  el: ['Η τιμή θα επιβεβαιωθεί', 'Κιτ'],
  hr: ['Cijena čeka potvrdu', 'Komplet'],
  sl: ['Cena še ni potrjena', 'Komplet'],
  lt: ['Kaina bus patvirtinta', 'Rinkinys'],
  lv: ['Cena tiks apstiprināta', 'Komplekts'],
  et: ['Hind kinnitatakse hiljem', 'Komplekt'],
  ru: ['Цена уточняется', 'Комплект'],
  uk: ['Ціна уточнюється', 'Комплект'],
  fa: ['قیمت هنوز تأیید نشده است', 'کیت'],
  tr: ['Fiyat henüz kesinleşmedi', 'Kit'],
}

export function getProductVariantCopy(lang: string) {
  const [pricePending, kit] = copy[lang as LangCode] || copy.en
  return { pricePending, ccsIncludes: `${kit} + LCD + BMS + CCS` }
}
