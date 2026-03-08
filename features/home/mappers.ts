import { getLocalizedValue } from '@/lib/sanity/localization';
import type { LocalizedString, LocalizedText, CtaLink, SanityImage } from '@/lib/sanity/types';
import type { PortableTextBlock } from '@portabletext/types';

export function text(field: LocalizedString | string | undefined, locale: string): string {
  return getLocalizedValue(field, locale);
}

export function textBlock(
  field: LocalizedText | string | undefined,
  locale: string
): string | PortableTextBlock[] {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const value = field[locale] ?? field.en ?? field.sq ?? field.ru ?? field.uk;
  return (typeof value === 'string' ? value : (value ?? '')) as string | PortableTextBlock[];
}

export function ctaHref(cta: CtaLink | undefined): string {
  return cta?.href ?? '#';
}

export function ctaLabel(cta: CtaLink | undefined, locale: string): string {
  if (!cta?.label) return '';
  return getLocalizedValue(cta.label as LocalizedString | string, locale) || (cta.href ?? '');
}

export function hasImage(image: SanityImage | null | undefined): boolean {
  return Boolean(image?.asset?._ref);
}
