import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { I18nProvider } from '@/i18n/client'
import { locales, isValidLocale, defaultLocale, localeMap } from '@/i18n/config'
import type { LangCode } from '@/i18n/config'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Pre-load translation files at build time
async function getMessages(locale: string): Promise<Record<string, string>> {
  try {
    return (await import(`../../../messages/${locale}.json`)).default
  } catch {
    return (await import(`../../../messages/${defaultLocale}.json`)).default
  }
}

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.code }))
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await props.params
  const lang = isValidLocale(langParam) ? langParam : defaultLocale

  return {
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [
          l.code === defaultLocale ? 'x-default' : l.code,
          `https://jkess-energy.com${l.code === defaultLocale ? '' : `/${l.code}`}`,
        ])
      ),
    },
  }
}

export default async function LangLayout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await props.params
  const validLang = isValidLocale(lang) ? lang : defaultLocale
  const localeDef = localeMap.get(validLang)!
  const messages = await getMessages(validLang)

  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <I18nProvider lang={validLang as LangCode} dir={localeDef.dir} messages={messages}>
        <CartProvider>
          {/* Only set html lang for non-English pages via a side-effect script */}
          {validLang !== 'en' && (
            <Script id="set-html-lang" strategy="afterInteractive">
              {`document.documentElement.lang="${validLang}";document.documentElement.dir="${localeDef.dir}";`}
            </Script>
          )}
          <Navbar />
          <main className="flex-1">{props.children}</main>
          <Footer />
        </CartProvider>
      </I18nProvider>
    </>
  )
}
