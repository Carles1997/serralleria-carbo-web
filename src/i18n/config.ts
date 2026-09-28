// Idiomes previstos al CONTEXT (§2.1). Només el català té contingut; ES i EN
// s'activaran quan existeixin content/es/ i content/en/ validats.
export const locales = ['ca', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ca';

export const localeLabels: Record<Locale, string> = {
  ca: 'Català',
  es: 'Castellano',
  en: 'English',
};
