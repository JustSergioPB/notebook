export const SUPPORTED_LANGS = ['en', 'es'] as const;
export type SupportedLangs = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLangs = 'es';