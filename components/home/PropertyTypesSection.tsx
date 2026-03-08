import Link from 'next/link';
import { Chip, Button } from '@heroui/react';
import { mapLocalizedString, mapCtaLink, mapPropertyTypeCard } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface PropertyType {
  _id: string;
  name?: Record<string, string>;
  slug?: { current?: string };
  order?: number;
}

interface PropertyTypesSectionProps {
  homePage: Pick<HomePage, 'propertyTypesTitle' | 'propertyTypesSubtitle' | 'propertyTypesCta'>;
  propertyTypes: PropertyType[];
  locale: string;
}

export function PropertyTypesSection({
  homePage,
  propertyTypes,
  locale,
}: PropertyTypesSectionProps) {
  const title = mapLocalizedString(homePage.propertyTypesTitle, locale);
  const subtitle = mapLocalizedString(homePage.propertyTypesSubtitle, locale);
  const cta = mapCtaLink(homePage.propertyTypesCta, locale);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-default-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {propertyTypes.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {propertyTypes.map((pt) => {
              const mapped = mapPropertyTypeCard(pt, locale);
              return (
                <Chip
                  key={pt._id}
                  as={Link}
                  href={`/${locale}/sale?type=${mapped.slug}`}
                  size="lg"
                  variant="flat"
                  className="cursor-pointer hover:opacity-80"
                >
                  {mapped.name}
                </Chip>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-default-500 py-8">No property types</p>
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
