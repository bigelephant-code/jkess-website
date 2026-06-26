import '@/lib/lang'

declare module '@/lib/lang' {
  function localizedPath(lang: string, path: string): string
}
