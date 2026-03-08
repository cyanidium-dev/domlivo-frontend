export const ALLOWED_LOCALES = ['en', 'ru', 'uk', 'sq'] as const;
export type Locale = (typeof ALLOWED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Normalize locale string to allowed value.
 * Fallback: en
 */
export function normalizeLocale(locale: string): Locale {
  const lower = locale.toLowerCase();
  if (ALLOWED_LOCALES.includes(lower as Locale)) {
    return lower as Locale;
  }
  return DEFAULT_LOCALE;
}

export type LocalizedObject = Partial<Record<Locale, string>>;

/**
 * Extract localized value from a field.
 * Rules:
 * - return field[locale] if non-empty
 * - otherwise return field[fallback]
 * - otherwise return first non-empty value
 * - otherwise return empty string
 */
export function getLocalizedValue(
  field: LocalizedObject | string | null | undefined,
  locale: string,
  fallback: Locale = DEFAULT_LOCALE
): string {
  const normalizedLocale = normalizeLocale(locale) as Locale;
  const normalizedFallback = normalizeLocale(fallback) as Locale;

  if (field == null) return '';

  if (typeof field === 'string') {
    return field.trim() || '';
  }

  const obj = field as LocalizedObject;

  const byLocale = obj[normalizedLocale]?.trim();
  if (byLocale) return byLocale;

  const byFallback = obj[normalizedFallback]?.trim();
  if (byFallback) return byFallback;

  const firstNonEmpty = ALLOWED_LOCALES.map((l) => obj[l]?.trim()).find(Boolean);
  return firstNonEmpty ?? '';
}
