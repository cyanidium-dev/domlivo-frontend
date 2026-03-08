import Link from 'next/link';
import { Button } from '@heroui/react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mapLocalizedString, mapCtaLink } from '@/lib/sanity/mappers';
import type { HomePage, PropertyCardData } from '@/lib/sanity/types';

interface FeaturedPropertiesSectionProps {
  homePage: Pick<
    HomePage,
    'featuredEnabled' | 'featuredTitle' | 'featuredSubtitle' | 'featuredCta'
  >;
  properties: PropertyCardData[];
  locale: string;
}

export function FeaturedPropertiesSection({
  homePage,
  properties,
  locale,
}: FeaturedPropertiesSectionProps) {
  if (homePage.featuredEnabled === false) return null;

  const title = mapLocalizedString(homePage.featuredTitle, locale);
  const subtitle = mapLocalizedString(homePage.featuredSubtitle, locale);
  const cta = mapCtaLink(homePage.featuredCta, locale);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {properties.slice(0, 8).map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                locale={locale}
                href={`/${locale}/property/${p.slug ?? p._id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-default-500 py-8">No featured properties</p>
        )}
        {cta.href !== '#' && (
          <div className="text-center">
            <Button
              as={Link}
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              variant="bordered"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
