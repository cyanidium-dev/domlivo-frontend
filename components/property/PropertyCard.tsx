import Link from 'next/link';
import { Card, CardBody, Chip } from '@heroui/react';
import { AppImage } from '@/components/shared';
import { mapPropertyCard } from '@/lib/sanity/mappers';
import type { PropertyCardData } from '@/lib/sanity/types';

interface PropertyCardProps {
  property: PropertyCardData;
  locale: string;
  href: string;
}

export function PropertyCard({ property, locale, href }: PropertyCardProps) {
  const mapped = mapPropertyCard(property, locale);

  return (
    <Link href={href} className="block h-full">
      <Card className="h-full overflow-hidden border border-default-200 transition hover:border-default-400 hover:shadow-lg">
        <div className="aspect-[4/3] relative overflow-hidden bg-default-100">
          <AppImage
            image={mapped.mainImage}
            alt={mapped.title}
            fill
            fallbackType="property"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            sanityWidth={600}
            sanityHeight={450}
          />
        </div>
        <CardBody className="gap-2">
          {mapped.title && <h3 className="font-semibold text-lg line-clamp-1">{mapped.title}</h3>}
          <div className="flex flex-wrap gap-1">
            {[mapped.city, mapped.district, mapped.propertyType].filter(Boolean).map((item, i) => (
              <Chip key={i} size="sm" variant="flat">
                {item}
              </Chip>
            ))}
          </div>
          {mapped.price != null && (
            <p className="font-semibold text-foreground">
              {mapped.price.toLocaleString()} {mapped.currency}
            </p>
          )}
          {mapped.area != null && <p className="text-sm text-default-500">{mapped.area} m²</p>}
        </CardBody>
      </Card>
    </Link>
  );
}
