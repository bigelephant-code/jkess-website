'use client'

import { createContext, useContext, useCallback } from 'react'
import type { LangCode } from './config'
import type enMessages from '../../messages/en.json'

type Messages = Record<string, string>

interface I18nContextValue {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  messages: Messages
  t: (key: string, fallback?: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  dir: 'ltr',
  messages: {},
  t: (key: string) => key,
})

export function I18nProvider({
  lang,
  dir,
  messages,
  children,
}: {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  messages: Messages
  children: React.ReactNode
}) {
  const t = useCallback(
    (key: string, fallback?: string) => messages[key] || fallback || key,
    [messages]
  )

  return (
    <I18nContext.Provider value={{ lang, dir, messages, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useTranslate() {
  return useContext(I18nContext).t
}
