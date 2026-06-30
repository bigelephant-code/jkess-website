import '../navbar-right-balance.css'
import NavbarMegaMenuV2 from '@/components/NavbarMegaMenuV2'
import NavbarDockEffect from '@/components/NavbarDockEffect'
import Footer from '@/components/Footer'
import EcommerceAnalyticsTracker from '@/components/EcommerceAnalyticsTracker'
import CookieConsent from '@/components/CookieConsent'
import { CartProvider } from '@/context/CartContext'
import { I18nProvider } from '@/i18n/client'
import { locales, isValidLocale, defaultLocale, localeMap } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'
import { messageOverrides } from '@/i18n/message-overrides'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EKD19QGSMC'

async function getMessages(locale: LangCode): Promise<Record<string, string>> {
  let messages: Record<string, string>

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch {
    messages = (await import(`../../../messages/${defaultLocale}.json`)).default
  }

  return {
    ...messages,
    ...(messageOverrides[locale] || {}),
  }
}

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.code }))
}

export default async function LangLayout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await props.params
  const validLang = isValidLocale(lang) ? lang : defaultLocale
  const localeDef = localeMap.get(validLang)!
  const messages = await getMessages(validLang as LangCode)

  return (
    <>
      <I18nProvider lang={validLang as LangCode} dir={localeDef.dir} messages={messages}>
        <CartProvider>
          <NavbarMegaMenuV2 />
          <NavbarDockEffect />
          <CookieConsent gaId={GA_ID} />
          <EcommerceAnalyticsTracker />
          <main className="flex-1">{props.children}</main>
          <Footer />
        </CartProvider>
      </I18nProvider>
    </>
  )
}
