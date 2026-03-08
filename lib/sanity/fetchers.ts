import { sanityFetch } from './client';
import {
  HOME_PAGE_BY_LOCALE_QUERY,
  SITE_SETTINGS_BY_LOCALE_QUERY,
  CITY_PAGE_BY_SLUG_AND_LOCALE_QUERY,
  DISTRICT_PAGE_BY_SLUG_AND_LOCALE_QUERY,
  BLOG_POST_BY_SLUG_AND_LOCALE_QUERY,
  BLOG_POSTS_BY_LOCALE_QUERY,
  FEATURED_PROPERTIES_QUERY,
  PROPERTIES_BY_CITY_QUERY,
  PROPERTY_BY_SLUG_QUERY,
  PROPERTY_TYPES_QUERY,
  POPULAR_CITIES_QUERY,
} from './queries';
import type {
  HomePage,
  SiteSettings,
  CityPage,
  DistrictPage,
  BlogPost,
  PropertyCardData,
  PropertyPageData,
} from './types';

const DEFAULT_REVALIDATE = 60;
const LONG_REVALIDATE = 3600;

export async function getHomePage(locale: string): Promise<HomePage | null> {
  return sanityFetch<HomePage | null>({
    query: HOME_PAGE_BY_LOCALE_QUERY,
    params: { locale },
    revalidate: LONG_REVALIDATE,
    tags: ['homePage'],
  });
}

export async function getSiteSettings(locale: string): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_BY_LOCALE_QUERY,
    params: { locale },
    revalidate: LONG_REVALIDATE,
    tags: ['siteSettings'],
  });
}

export async function getCityPage(slug: string, locale: string): Promise<CityPage | null> {
  return sanityFetch<CityPage | null>({
    query: CITY_PAGE_BY_SLUG_AND_LOCALE_QUERY,
    params: { slug, locale },
    revalidate: DEFAULT_REVALIDATE,
    tags: ['city', `city:${slug}`],
  });
}

export async function getDistrictPage(
  citySlug: string,
  districtSlug: string,
  locale: string
): Promise<DistrictPage | null> {
  return sanityFetch<DistrictPage | null>({
    query: DISTRICT_PAGE_BY_SLUG_AND_LOCALE_QUERY,
    params: { citySlug, districtSlug, locale },
    revalidate: DEFAULT_REVALIDATE,
    tags: ['district', `district:${citySlug}-${districtSlug}`],
  });
}

export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>({
    query: BLOG_POST_BY_SLUG_AND_LOCALE_QUERY,
    params: { slug, locale },
    revalidate: DEFAULT_REVALIDATE,
    tags: ['blogPost', `blogPost:${slug}`],
  });
}

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const result = await sanityFetch<BlogPost[] | null>({
    query: BLOG_POSTS_BY_LOCALE_QUERY,
    params: { locale },
    revalidate: DEFAULT_REVALIDATE,
    tags: ['blogPost'],
  });
  return result ?? [];
}

export async function getFeaturedProperties(): Promise<PropertyCardData[]> {
  const result = await sanityFetch<PropertyCardData[] | null>({
    query: FEATURED_PROPERTIES_QUERY,
    revalidate: DEFAULT_REVALIDATE,
    tags: ['property'],
  });
  return result ?? [];
}

export async function getPropertiesByCity(
  citySlug: string,
  status?: string
): Promise<PropertyCardData[]> {
  const params = { citySlug, status: status ?? null };

  const result = await sanityFetch<PropertyCardData[] | null>({
    query: PROPERTIES_BY_CITY_QUERY,
    params,
    revalidate: DEFAULT_REVALIDATE,
    tags: ['property', `city:${citySlug}`],
  });
  return result ?? [];
}

export async function getPropertyBySlug(slug: string): Promise<PropertyPageData | null> {
  return sanityFetch<PropertyPageData | null>({
    query: PROPERTY_BY_SLUG_QUERY,
    params: { slug },
    revalidate: DEFAULT_REVALIDATE,
    tags: ['property', `property:${slug}`],
  });
}

export async function getPropertyTypes(): Promise<
  { _id: string; name?: Record<string, string>; slug?: { current?: string }; order?: number }[]
> {
  const result = await sanityFetch<
    | { _id: string; name?: Record<string, string>; slug?: { current?: string }; order?: number }[]
    | null
  >({
    query: PROPERTY_TYPES_QUERY,
    revalidate: LONG_REVALIDATE,
    tags: ['propertyType'],
  });
  return result ?? [];
}

export async function getPopularCities(
  locale: string
): Promise<
  {
    _id: string;
    name?: Record<string, string>;
    slug?: { current?: string };
    order?: number;
    language?: string;
  }[]
> {
  const result = await sanityFetch<
    | {
        _id: string;
        name?: Record<string, string>;
        slug?: { current?: string };
        order?: number;
        language?: string;
      }[]
    | null
  >({
    query: POPULAR_CITIES_QUERY,
    params: { locale },
    revalidate: LONG_REVALIDATE,
    tags: ['city'],
  });
  return result ?? [];
}
