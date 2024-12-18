// src/types/locale.ts
export type Locale = 'ru' | 'uz' | 'en';

export function isLocale(locale: string): locale is Locale {
  return ['ru', 'uz', 'en'].includes(locale);
}
