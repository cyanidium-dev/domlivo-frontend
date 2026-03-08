import {
  getHomePage,
  getSiteSettings,
  getFeaturedProperties,
  getPropertyTypes,
  getPopularCities,
  getBlogPosts,
} from '@/lib/sanity';
import { buildMetadataFromSeo } from '@/lib/seo/mappers';
import { mapLocalizedString } from '@/lib/sanity/mappers';
import {
  HeroSection,
  FeaturedPropertiesSection,
  PopularCitiesSection,
  PropertyTypesSection,
  InvestmentSection,
  AboutSection,
  AgentsSection,
  BlogSection,
  SeoTextSection,
  FaqSection,
  Footer,
} from '@/components/home';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const [homePage, siteSettings] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
  ]);

  const seo = homePage?.seo ?? siteSettings?.seo;
  const fallbackTitle = mapLocalizedString(siteSettings?.siteName, locale) || 'Domlivo';
  return buildMetadataFromSeo(seo, locale, `/${locale}`, {
    title: fallbackTitle,
    description: '',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  const [homePage, siteSettings, featuredProperties, propertyTypes, popularCities, blogPosts] =
    await Promise.all([
      getHomePage(locale),
      getSiteSettings(locale),
      getFeaturedProperties(),
      getPropertyTypes(),
      getPopularCities(locale),
      getBlogPosts(locale),
    ]);

  return (
    <>
      <main>
        <HeroSection data={homePage?.hero} locale={locale} />
        <FeaturedPropertiesSection
          homePage={homePage ?? {}}
          properties={featuredProperties}
          locale={locale}
        />
        <PopularCitiesSection homePage={homePage ?? {}} cities={popularCities} locale={locale} />
        <PropertyTypesSection
          homePage={homePage ?? {}}
          propertyTypes={propertyTypes}
          locale={locale}
        />
        <InvestmentSection homePage={homePage ?? {}} locale={locale} />
        <AboutSection homePage={homePage ?? {}} locale={locale} />
        <AgentsSection homePage={homePage ?? {}} locale={locale} />
        <BlogSection homePage={homePage ?? {}} posts={blogPosts} locale={locale} />
        <SeoTextSection homePage={homePage ?? {}} locale={locale} />
        <FaqSection homePage={homePage ?? {}} locale={locale} />
      </main>
      <Footer siteSettings={siteSettings} locale={locale} />
    </>
  );
}
