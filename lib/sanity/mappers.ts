import { getLocalizedValue } from './localization';
import type {
  LocalizedString,
  LocalizedText,
  Seo,
  CtaLink,
  FooterLink,
  SanityImage,
  PropertyCardData,
  BlogPost,
} from './types';
import type { PortableTextBlock } from '@portabletext/types';

type Locale = string;

/** Extract localized text/block from field (string or PortableText). */
export function mapLocalizedText(
  field: LocalizedText | string | null | undefined,
  locale: Locale
): string | PortableTextBlock[] {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const value =
    (field as LocalizedText)[locale] ??
    (field as LocalizedText).en ??
    (field as LocalizedText).sq ??
    (field as LocalizedText).ru ??
    (field as LocalizedText).uk;
  return (typeof value === 'string' ? value : (value ?? [])) as string | PortableTextBlock[];
}

/** Extract localized string from field. Safe fallback to empty string. */
export function mapLocalizedString(
  field: LocalizedString | string | null | undefined,
  locale: Locale
): string {
  return getLocalizedValue(field, locale);
}

/** Map SEO object to resolved strings for locale. */
export function mapSeoData(
  seo: Seo | null | undefined,
  locale: Locale
): {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: SanityImage | null;
} {
  if (!seo) {
    return { metaTitle: '', metaDescription: '', ogTitle: '', ogDescription: '', ogImage: null };
  }
  return {
    metaTitle: mapLocalizedString(seo.metaTitle as LocalizedString | string, locale),
    metaDescription: mapLocalizedString(seo.metaDescription as LocalizedString | string, locale),
    ogTitle: mapLocalizedString(seo.ogTitle as LocalizedString | string, locale),
    ogDescription: mapLocalizedString(seo.ogDescription as LocalizedString | string, locale),
    ogImage: seo.ogImage ?? null,
  };
}

/** Map CTA link to localized label and href. */
export function mapCtaLink(cta: CtaLink | null | undefined, locale: Locale) {
  if (!cta) return { label: '', href: '#' };
  return {
    label: mapLocalizedString(cta.label as LocalizedString | string, locale) || (cta.href ?? '#'),
    href: cta.href ?? '#',
    external: cta.external ?? false,
  };
}

/** Map footer link to localized label and href. */
export function mapFooterLink(link: FooterLink | null | undefined, locale: Locale) {
  if (!link) return { label: '', href: '#' };
  return {
    label: mapLocalizedString(link.label as LocalizedString | string, locale) || (link.href ?? '#'),
    href: link.href ?? '#',
  };
}

/** Property type card shape from CMS (name + slug). */
interface PropertyTypeRaw {
  _id: string;
  name?: LocalizedString | string;
  slug?: { current?: string };
  order?: number;
}

export function mapPropertyTypeCard(
  type: PropertyTypeRaw | null | undefined,
  locale: Locale
): { id: string; name: string; slug: string } {
  if (!type) return { id: '', name: '', slug: '' };
  return {
    id: type._id,
    name: mapLocalizedString(type.name, locale) || 'Type',
    slug: type.slug?.current ?? type._id,
  };
}

/** Location tag shape from CMS. */
interface LocationTagRaw {
  _id: string;
  name?: LocalizedString | string;
}

export function mapLocationTag(
  tag: LocationTagRaw | null | undefined,
  locale: Locale
): { id: string; name: string } {
  if (!tag) return { id: '', name: '' };
  return {
    id: tag._id,
    name: mapLocalizedString(tag.name, locale) || '',
  };
}

/** City card shape from CMS. */
interface CityRaw {
  _id: string;
  name?: LocalizedString | string;
  slug?: { current?: string };
  order?: number;
}

export function mapCityCard(city: CityRaw | null | undefined, locale: Locale) {
  if (!city) return { id: '', name: '', slug: '' };
  return {
    id: city._id,
    name: mapLocalizedString(city.name, locale) || 'City',
    slug: city.slug?.current ?? city._id,
  };
}

/** District card shape from CMS. */
interface DistrictRaw {
  _id: string;
  name?: LocalizedString | string;
  slug?: { current?: string } | string;
  city?: { slug?: { current?: string } | string };
}

function resolveSlug(slug: { current?: string } | string | undefined): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current ?? '';
}

export function mapDistrictCard(
  district: DistrictRaw | null | undefined,
  locale: Locale
): { id: string; name: string; slug: string; citySlug: string } {
  if (!district) return { id: '', name: '', slug: '', citySlug: '' };
  const cs = district.city?.slug;
  const citySlug =
    typeof cs === 'string' ? cs : ((cs as { current?: string } | undefined)?.current ?? '');
  return {
    id: district._id,
    name: mapLocalizedString(district.name, locale) || 'District',
    slug: resolveSlug(district.slug) || district._id,
    citySlug,
  };
}

function resolveLocalizedField(
  field: LocalizedString | string | { name?: LocalizedString } | null | undefined,
  locale: Locale
): string {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  if ('name' in field && field.name) return mapLocalizedString(field.name, locale);
  return mapLocalizedString(field as LocalizedString, locale);
}

/** Map property card data for display. */
export function mapPropertyCard(
  property: PropertyCardData | null | undefined,
  locale: Locale
): {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  currency: string;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  city: string;
  district: string;
  propertyType: string;
  mainImage: SanityImage | null;
  shortDescription: string;
} {
  if (!property) {
    return {
      id: '',
      title: '',
      slug: '',
      price: null,
      currency: 'EUR',
      area: null,
      bedrooms: null,
      bathrooms: null,
      city: '',
      district: '',
      propertyType: '',
      mainImage: null,
      shortDescription: '',
    };
  }
  return {
    id: property._id,
    title: mapLocalizedString(property.title, locale) || 'Property',
    slug: property.slug ?? property._id,
    price: property.price ?? null,
    currency: property.currency ?? 'EUR',
    area: property.area ?? null,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    city: resolveLocalizedField(property.city, locale),
    district: resolveLocalizedField(property.district, locale),
    propertyType: resolveLocalizedField(property.propertyType, locale),
    mainImage: property.mainImage ?? null,
    shortDescription: mapLocalizedString(property.shortDescription, locale),
  };
}

/** Map blog post for card display. */
export function mapBlogCard(
  post: BlogPost | null | undefined,
  locale: Locale
): {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: SanityImage | null;
  publishedAt: string | null;
} {
  if (!post) {
    return { id: '', title: '', slug: '', excerpt: '', coverImage: null, publishedAt: null };
  }
  const slug = typeof post.slug === 'string' ? post.slug : (post.slug?.current ?? post._id);
  return {
    id: post._id,
    title: mapLocalizedString(post.title, locale) || 'Blog post',
    slug,
    excerpt: mapLocalizedString(post.excerpt, locale),
    coverImage: post.coverImage ?? null,
    publishedAt: post.publishedAt ?? null,
  };
}

/** Map full blog post for detail page. */
export function mapBlogPost(
  post: BlogPost | null | undefined,
  locale: Locale
): {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[] | null;
  coverImage: SanityImage | null;
  publishedAt: string | null;
  author: { id: string; name: string } | null;
} {
  if (!post) {
    return {
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      body: null,
      coverImage: null,
      publishedAt: null,
      author: null,
    };
  }
  const slug = typeof post.slug === 'string' ? post.slug : (post.slug?.current ?? post._id);
  const author = post.author as { _id?: string; name?: string } | undefined;
  return {
    id: post._id,
    title: mapLocalizedString(post.title, locale) || 'Blog post',
    slug,
    excerpt: mapLocalizedString(post.excerpt, locale),
    body: post.body ?? null,
    coverImage: post.coverImage ?? null,
    publishedAt: post.publishedAt ?? null,
    author: author ? { id: author._id ?? '', name: author.name ?? '' } : null,
  };
}
