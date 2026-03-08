import type { PortableTextBlock } from '@portabletext/types';

// --- Localization ---
export type LocalizedString = Record<string, string>;
export type LocalizedText = Record<string, string | PortableTextBlock[]>;

// --- Sanity primitives ---
export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
}

// --- Shared components ---
export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
}

export interface CtaLink {
  label?: string;
  href?: string;
  external?: boolean;
}

export interface SocialLink {
  platform?: string;
  url?: string;
}

export interface FooterLink {
  label?: string;
  href?: string;
}

export interface FaqItem {
  question?: string;
  answer?: string | PortableTextBlock[];
}

export interface DistrictMetric {
  label?: string;
  value?: string;
}

export interface DistrictStat {
  label?: string;
  value?: string;
}

// --- Page data ---
export interface HomePage {
  _id: string;
  _type: 'homePage';
  language?: string;
  title?: LocalizedString;
  hero?: {
    title?: LocalizedString;
    subtitle?: LocalizedString;
    shortLine?: LocalizedString;
    backgroundImage?: SanityImage;
    cta?: CtaLink;
    image?: SanityImage;
  };
  featuredEnabled?: boolean;
  featuredTitle?: LocalizedString;
  featuredSubtitle?: LocalizedString;
  featuredCta?: CtaLink;
  citiesTitle?: LocalizedString;
  citiesSubtitle?: LocalizedString;
  citiesCta?: CtaLink;
  propertyTypesTitle?: LocalizedString;
  propertyTypesSubtitle?: LocalizedString;
  propertyTypesCta?: CtaLink;
  investmentTitle?: LocalizedString;
  investmentSubtitle?: LocalizedString;
  investmentBenefits?: LocalizedString[];
  investmentPrimaryImage?: SanityImage;
  investmentSecondaryImage?: SanityImage;
  investmentCta?: CtaLink;
  aboutTitle?: LocalizedString;
  aboutText?: LocalizedText;
  aboutBenefits?: LocalizedString[];
  agentsEnabled?: boolean;
  agentsTitle?: LocalizedString;
  agentsSubtitle?: LocalizedString;
  agentsText?: LocalizedText;
  agentsBenefits?: LocalizedString[];
  agentsCta?: CtaLink;
  blogEnabled?: boolean;
  blogTitle?: LocalizedString;
  blogSubtitle?: LocalizedString;
  blogCta?: CtaLink;
  seoText?: LocalizedText;
  faqEnabled?: boolean;
  faqTitle?: LocalizedString;
  faqItems?: FaqItem[];
  seo?: Seo;
  sections?: unknown[];
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  language?: string;
  siteName?: LocalizedString;
  siteTagline?: LocalizedString;
  logo?: SanityImage;
  contactEmail?: string;
  navLinks?: FooterLink[];
  footerLinks?: FooterLink[];
  footerQuickLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  copyrightText?: LocalizedString;
  seo?: Seo;
}

export interface CityPage {
  _id: string;
  _type: 'city';
  language?: string;
  name?: LocalizedString;
  slug?: { current?: string };
  description?: LocalizedText;
  image?: SanityImage;
  districts?: { _ref: string }[];
  seo?: Seo;
}

export interface DistrictPage {
  _id: string;
  _type: 'district';
  language?: string;
  name?: LocalizedString;
  slug?: { current?: string };
  city?: { _ref: string; slug?: { current?: string } };
  description?: LocalizedText;
  metrics?: DistrictMetric[];
  stats?: DistrictStat[];
  image?: SanityImage;
  seo?: Seo;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  language?: string;
  title?: LocalizedString;
  slug?: { current?: string };
  excerpt?: LocalizedString;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  publishedAt?: string;
  author?: { _ref: string };
  seo?: Seo;
}

// --- Property ---
export interface PropertyCardData {
  _id: string;
  title?: LocalizedString;
  slug?: string;
  price?: number;
  currency?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: LocalizedString | string;
  district?: LocalizedString | string;
  propertyType?: LocalizedString | string;
  mainImage?: SanityImage;
  shortDescription?: LocalizedString;
  featured?: boolean;
}

export interface PropertyPageData {
  _id: string;
  title?: LocalizedString;
  slug?: string;
  shortDescription?: LocalizedString;
  description?: LocalizedText;
  listingType?: string;
  price?: number;
  currency?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: {
    _id: string;
    name?: LocalizedString;
    slug?: { current?: string };
  };
  district?: {
    _id: string;
    name?: LocalizedString;
    slug?: { current?: string };
  };
  propertyType?: {
    _id: string;
    name?: LocalizedString;
    slug?: { current?: string };
  };
  features?: string[];
  gallery?: SanityImage[];
  agent?: {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
    photo?: SanityImage;
  };
  locationTags?: { _id: string; name?: LocalizedString }[];
  address?: LocalizedString;
  status?: string;
  seo?: Seo;
}
