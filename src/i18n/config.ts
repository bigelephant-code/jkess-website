export type LangCode = 'en' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pt' |
  'sv' | 'da' | 'fi' |
  'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'el' |
  'hr' | 'sl' | 'lt' | 'lv' | 'et' |
  'ru' | 'uk' |
  'fa' | 'tr'

export interface LocaleDef {
  code: LangCode
  name: string
  englishName: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export const locales: LocaleDef[] = [
  { code: 'en', name: 'English', englishName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', englishName: 'German', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', name: 'Français', englishName: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', englishName: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', name: 'Italiano', englishName: 'Italian', flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', englishName: 'Dutch', flag: '🇳🇱', dir: 'ltr' },
  { code: 'pt', name: 'Português', englishName: 'Portuguese', flag: '🇵🇹', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', englishName: 'Swedish', flag: '🇸🇪', dir: 'ltr' },
  { code: 'da', name: 'Dansk', englishName: 'Danish', flag: '🇩🇰', dir: 'ltr' },
  { code: 'fi', name: 'Suomi', englishName: 'Finnish', flag: '🇫🇮', dir: 'ltr' },
  { code: 'pl', name: 'Polski', englishName: 'Polish', flag: '🇵🇱', dir: 'ltr' },
  { code: 'cs', name: 'Čeština', englishName: 'Czech', flag: '🇨🇿', dir: 'ltr' },
  { code: 'sk', name: 'Slovenčina', englishName: 'Slovak', flag: '🇸🇰', dir: 'ltr' },
  { code: 'hu', name: 'Magyar', englishName: 'Hungarian', flag: '🇭🇺', dir: 'ltr' },
  { code: 'ro', name: 'Română', englishName: 'Romanian', flag: '🇷🇴', dir: 'ltr' },
  { code: 'bg', name: 'Български', englishName: 'Bulgarian', flag: '🇧🇬', dir: 'ltr' },
  { code: 'el', name: 'Ελληνικά', englishName: 'Greek', flag: '🇬🇷', dir: 'ltr' },
  { code: 'hr', name: 'Hrvatski', englishName: 'Croatian', flag: '🇭🇷', dir: 'ltr' },
  { code: 'sl', name: 'Slovenščina', englishName: 'Slovenian', flag: '🇸🇮', dir: 'ltr' },
  { code: 'lt', name: 'Lietuvių', englishName: 'Lithuanian', flag: '🇱🇹', dir: 'ltr' },
  { code: 'lv', name: 'Latviešu', englishName: 'Latvian', flag: '🇱🇻', dir: 'ltr' },
  { code: 'et', name: 'Eesti', englishName: 'Estonian', flag: '🇪🇪', dir: 'ltr' },
  { code: 'ru', name: 'Русский', englishName: 'Russian', flag: '🇷🇺', dir: 'ltr' },
  { code: 'uk', name: 'Українська', englishName: 'Ukrainian', flag: '🇺🇦', dir: 'ltr' },
  { code: 'fa', name: 'فارسی', englishName: 'Persian', flag: '🇮🇷', dir: 'rtl' },
  { code: 'tr', name: 'Türkçe', englishName: 'Turkish', flag: '🇹🇷', dir: 'ltr' },
]

export const defaultLocale: LangCode = 'en'

export const localeMap = new Map<LangCode, LocaleDef>(locales.map((l) => [l.code, l]))

export function isValidLocale(code: string): code is LangCode {
  return localeMap.has(code as LangCode)
}
