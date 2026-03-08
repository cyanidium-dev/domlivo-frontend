export { client, sanityFetch } from './client';
export { urlFor } from './image';
export { getPlaceholderByType } from './placeholders';
export type { PlaceholderType } from './placeholders';
export {
  normalizeLocale,
  getLocalizedValue,
  ALLOWED_LOCALES,
  DEFAULT_LOCALE,
} from './localization';
export type { Locale, LocalizedObject } from './localization';
export * from './queries';
export * from './fetchers';
export * from './types';
