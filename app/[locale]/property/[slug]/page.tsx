import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { getPropertyBySlug } from '@/lib/sanity';
import { buildMetadataFromSeo } from '@/lib/seo/mappers';
import {
  mapLocalizedString,
  mapLocalizedText,
  mapPropertyTypeCard,
  mapCityCard,
  mapDistrictCard,
  mapLocationTag,
} from '@/lib/sanity/mappers';
import { AppImage } from '@/components/shared';
import { Chip, Card, CardBody } from '@heroui/react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: 'Not Found' };
  const title = mapLocalizedString(property.title, locale) || 'Property';
  const description = mapLocalizedString(property.shortDescription, locale) || '';
  return buildMetadataFromSeo(property.seo, locale, `/${locale}/property/${slug}`, {
    title,
    description,
  });
}

export default async function PropertyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const title = mapLocalizedString(property.title, locale) || 'Property';
  const shortDescription = mapLocalizedString(property.shortDescription, locale);
  const description = mapLocalizedText(property.description, locale);
  const address = mapLocalizedString(property.address, locale);
  const propertyType = property.propertyType
    ? mapPropertyTypeCard(
        {
          _id: property.propertyType._id,
          name: property.propertyType.name,
          slug: property.propertyType.slug,
        },
        locale
      )
    : null;
  const city = property.city
    ? mapCityCard(
        { _id: property.city._id, name: property.city.name, slug: property.city.slug },
        locale
      )
    : null;
  const district = property.district ? mapDistrictCard(property.district, locale) : null;
  const locationTags = (property.locationTags ?? []).map((tag) => mapLocationTag(tag, locale));

  const gallery = property.gallery ?? [];
  const mainImage = gallery[0];

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {mainImage && (
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <AppImage
                  image={mainImage}
                  alt={title}
                  fill
                  fallbackType="property"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  sanityWidth={1200}
                  sanityHeight={900}
                />
              </div>
            )}
            {gallery.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.slice(1, 7).map((img, i) => (
                  <div key={i} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <AppImage
                      image={img}
                      alt={`${title} - ${i + 2}`}
                      fill
                      fallbackType="property"
                      className="object-cover"
                      sizes="200px"
                      sanityWidth={400}
                      sanityHeight={300}
                    />
                  </div>
                ))}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              {shortDescription && (
                <p className="text-lg text-default-600 mb-6">{shortDescription}</p>
              )}
              {description && (
                <div className="prose prose-default max-w-none">
                  {typeof description === 'string' ? (
                    <p>{description}</p>
                  ) : (
                    <PortableText value={description} />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardBody className="gap-4">
                {property.price != null && (
                  <p className="text-2xl font-bold">
                    {property.price.toLocaleString()} {property.currency ?? 'EUR'}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {property.area != null && (
                    <Chip size="sm" variant="flat">
                      {property.area} m²
                    </Chip>
                  )}
                  {property.bedrooms != null && (
                    <Chip size="sm" variant="flat">
                      {property.bedrooms} bed
                    </Chip>
                  )}
                  {property.bathrooms != null && (
                    <Chip size="sm" variant="flat">
                      {property.bathrooms} bath
                    </Chip>
                  )}
                </div>
                {address && <p className="text-sm text-default-600">{address}</p>}
                <div className="flex flex-wrap gap-2 pt-2">
                  {city && city.slug && (
                    <Link href={`/${locale}/sale/${city.slug}`}>
                      <Chip
                        size="sm"
                        variant="bordered"
                        className="cursor-pointer hover:bg-default-100"
                      >
                        {city.name}
                      </Chip>
                    </Link>
                  )}
                  {district && district.citySlug && district.slug && (
                    <Link href={`/${locale}/rent/${district.citySlug}/${district.slug}`}>
                      <Chip
                        size="sm"
                        variant="bordered"
                        className="cursor-pointer hover:bg-default-100"
                      >
                        {district.name}
                      </Chip>
                    </Link>
                  )}
                  {propertyType && (
                    <Link href={`/${locale}/sale?type=${propertyType.slug}`}>
                      <Chip
                        size="sm"
                        variant="bordered"
                        className="cursor-pointer hover:bg-default-100"
                      >
                        {propertyType.name}
                      </Chip>
                    </Link>
                  )}
                  {locationTags.map((tag) =>
                    tag.name ? (
                      <Chip key={tag.id} size="sm" variant="flat">
                        {tag.name}
                      </Chip>
                    ) : null
                  )}
                </div>
              </CardBody>
            </Card>

            {property.agent && (
              <Card>
                <CardBody>
                  <h3 className="font-semibold mb-2">Agent</h3>
                  <div className="flex items-center gap-3">
                    {property.agent.photo && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <AppImage
                          image={property.agent.photo}
                          alt={property.agent.name ?? 'Agent'}
                          fill
                          fallbackType="generic"
                          className="object-cover"
                          sizes="48px"
                          sanityWidth={96}
                          sanityHeight={96}
                        />
                      </div>
                    )}
                    <div>
                      {property.agent.name && <p className="font-medium">{property.agent.name}</p>}
                      {property.agent.email && (
                        <a
                          href={`mailto:${property.agent.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {property.agent.email}
                        </a>
                      )}
                      {property.agent.phone && (
                        <a
                          href={`tel:${property.agent.phone}`}
                          className="text-sm text-primary hover:underline block"
                        >
                          {property.agent.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
