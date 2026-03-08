// --- Page queries ---

export const HOME_PAGE_BY_LOCALE_QUERY = `*[_type == "homePage" && language == $locale][0] {
  _id,
  _type,
  language,
  title,
  hero {
    title,
    subtitle,
    shortLine,
    backgroundImage,
    cta { label, href, external },
    image
  },
  featuredEnabled,
  featuredTitle,
  featuredSubtitle,
  featuredCta { label, href, external },
  citiesTitle,
  citiesSubtitle,
  citiesCta { label, href, external },
  propertyTypesTitle,
  propertyTypesSubtitle,
  propertyTypesCta { label, href, external },
  investmentTitle,
  investmentSubtitle,
  investmentBenefits[],
  investmentPrimaryImage,
  investmentSecondaryImage,
  investmentCta { label, href, external },
  aboutTitle,
  aboutText,
  aboutBenefits[],
  agentsEnabled,
  agentsTitle,
  agentsSubtitle,
  agentsText,
  agentsBenefits[],
  agentsCta { label, href, external },
  blogEnabled,
  blogTitle,
  blogSubtitle,
  blogCta { label, href, external },
  seoText,
  faqEnabled,
  faqTitle,
  faqItems[] { question, answer },
  seo { metaTitle, metaDescription, ogTitle, ogDescription, ogImage },
  sections
}`;

export const SITE_SETTINGS_BY_LOCALE_QUERY = `*[_type == "siteSettings" && language == $locale][0] {
  _id,
  _type,
  language,
  siteName,
  siteTagline,
  logo,
  contactEmail,
  navLinks[] { label, href },
  footerLinks[] { label, href },
  footerQuickLinks[] { label, href },
  socialLinks[] { platform, url },
  copyrightText,
  seo { metaTitle, metaDescription, ogImage }
}`;

export const CITY_PAGE_BY_SLUG_AND_LOCALE_QUERY = `*[_type == "city" && slug.current == $slug && language == $locale][0] {
  _id,
  _type,
  language,
  name,
  "slug": slug.current,
  description,
  image,
  seo { metaTitle, metaDescription, ogImage }
}`;

export const DISTRICT_PAGE_BY_SLUG_AND_LOCALE_QUERY = `*[_type == "district" && slug.current == $districtSlug && city->slug.current == $citySlug && language == $locale][0] {
  _id,
  _type,
  language,
  name,
  "slug": slug.current,
  "city": city->{ _id, "slug": slug.current },
  description,
  metrics[] { label, value },
  stats[] { label, value },
  image,
  seo { metaTitle, metaDescription, ogImage }
}`;

export const BLOG_POST_BY_SLUG_AND_LOCALE_QUERY = `*[_type == "blogPost" && slug.current == $slug && language == $locale][0] {
  _id,
  _type,
  language,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  publishedAt,
  "author": author->{ _id, name },
  seo { metaTitle, metaDescription, ogImage }
}`;

export const BLOG_POSTS_BY_LOCALE_QUERY = `*[_type == "blogPost" && language == $locale && defined(slug.current)] | order(publishedAt desc) [0...12] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`;

// --- Property queries (raw localized fields, use getLocalizedValue on frontend) ---

export const PROPERTIES_LIST_QUERY = `*[_type == "property" && defined(slug.current)] | order(_createdAt desc) [0...12] {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  area,
  bedrooms,
  bathrooms,
  "city": city->{ name },
  "district": district->{ name },
  "propertyType": propertyType->{ name },
  "mainImage": gallery[0],
  shortDescription
}`;

export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  listingType,
  price,
  currency,
  area,
  bedrooms,
  bathrooms,
  "city": city->{ _id, name, "slug": slug.current },
  "district": district->{ _id, name, "slug": slug.current },
  "propertyType": propertyType->{ _id, name, "slug": slug.current },
  features,
  gallery[],
  "agent": agent->{ _id, name, email, phone, photo },
  "locationTags": locationTags[]->{ _id, name },
  address,
  status,
  seo { metaTitle, metaDescription, ogImage }
}`;

export const FEATURED_PROPERTIES_QUERY = `*[_type == "property" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...8] {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  area,
  bedrooms,
  bathrooms,
  "city": city->{ name },
  "district": district->{ name },
  "propertyType": propertyType->{ name },
  "mainImage": gallery[0],
  shortDescription,
  featured
}`;

export const PROPERTIES_BY_CITY_QUERY = `*[_type == "property" && city->slug.current == $citySlug && defined(slug.current) && ($status == null || status == $status)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  area,
  bedrooms,
  bathrooms,
  "city": city->{ name },
  "district": district->{ name },
  "propertyType": propertyType->{ name },
  "mainImage": gallery[0],
  shortDescription
}`;

// --- Taxonomy queries ---

export const PROPERTY_TYPES_QUERY = `*[_type == "propertyType" && defined(slug.current)] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  order
}`;

export const POPULAR_CITIES_QUERY = `*[_type == "city" && defined(slug.current) && language == $locale && (popular == true || !defined(popular))] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  order,
  language
}`;
