import type { HomePage, SiteSettings, PropertyCardData, BlogPost } from '@/lib/sanity/types';

export interface HomePageProps {
  homePage: HomePage | null;
  siteSettings: SiteSettings | null;
  featuredProperties: PropertyCardData[];
  propertyTypes: {
    _id: string;
    name?: Record<string, string>;
    slug?: { current?: string };
    order?: number;
  }[];
  popularCities: {
    _id: string;
    name?: Record<string, string>;
    slug?: { current?: string };
    order?: number;
    language?: string;
  }[];
  blogPosts: BlogPost[];
  locale: string;
}
