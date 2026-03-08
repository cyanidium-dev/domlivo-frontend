import Link from 'next/link';
import { Button } from '@heroui/react';
import { AppImage } from '@/components/shared';
import { mapLocalizedString, mapCtaLink } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface InvestmentSectionProps {
  homePage: Pick<
    HomePage,
    | 'investmentTitle'
    | 'investmentSubtitle'
    | 'investmentBenefits'
    | 'investmentPrimaryImage'
    | 'investmentSecondaryImage'
    | 'investmentCta'
  >;
  locale: string;
}

export function InvestmentSection({ homePage, locale }: InvestmentSectionProps) {
  const title = mapLocalizedString(homePage.investmentTitle, locale);
  const subtitle = mapLocalizedString(homePage.investmentSubtitle, locale);
  const benefits = homePage.investmentBenefits ?? [];
  const primaryImage = homePage.investmentPrimaryImage;
  const secondaryImage = homePage.investmentSecondaryImage;
  const cta = mapCtaLink(homePage.investmentCta, locale);

  if (!title && !subtitle && benefits.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-default-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
          {benefits.length > 0 && (
            <ul className="space-y-2">
              {benefits.map((b, i) => {
                const label = typeof b === 'object' ? mapLocalizedString(b, locale) : String(b);
                return (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {cta.href !== '#' && (
            <Button
              as={Link}
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              color="default"
              variant="solid"
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              {cta.label}
            </Button>
          )}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <AppImage
              image={primaryImage}
              alt="Investment"
              fill
              fallbackType="generic"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              sanityWidth={600}
              sanityHeight={450}
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden mt-8">
            <AppImage
              image={secondaryImage}
              alt="Investment"
              fill
              fallbackType="generic"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              sanityWidth={600}
              sanityHeight={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
