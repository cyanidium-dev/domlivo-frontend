import Link from 'next/link';
import { Card, CardBody, Button } from '@heroui/react';
import { mapLocalizedString, mapCtaLink, mapCityCard } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface City {
  _id: string;
  name?: Record<string, string>;
  slug?: { current?: string };
  order?: number;
  language?: string;
}

interface PopularCitiesSectionProps {
  homePage: Pick<HomePage, 'citiesTitle' | 'citiesSubtitle' | 'citiesCta'>;
  cities: City[];
  locale: string;
}

export function PopularCitiesSection({ homePage, cities, locale }: PopularCitiesSectionProps) {
  const title = mapLocalizedString(homePage.citiesTitle, locale);
  const subtitle = mapLocalizedString(homePage.citiesSubtitle, locale);
  const cta = mapCtaLink(homePage.citiesCta, locale);

  return (
    <section className="py-16 px-4 bg-default-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-default-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {cities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {cities.map((city) => {
              const mapped = mapCityCard(city, locale);
              return (
                <Card
                  key={city._id}
                  as={Link}
                  href={`/${locale}/sale/${mapped.slug}`}
                  className="p-6 bg-white border border-default-200 hover:border-default-400 hover:shadow transition text-center"
                >
                  <CardBody className="p-0">
                    <span className="font-medium">{mapped.name}</span>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-default-500 py-8">No cities</p>
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
