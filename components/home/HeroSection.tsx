import Link from 'next/link';
import { Button } from '@heroui/react';
import { AppImage } from '@/components/shared';
import { mapLocalizedString, mapCtaLink } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface HeroSectionProps {
  data: HomePage['hero'];
  locale: string;
}

export function HeroSection({ data, locale }: HeroSectionProps) {
  if (!data) return null;

  const title = mapLocalizedString(data.title, locale);
  const subtitle = mapLocalizedString(data.subtitle, locale);
  const shortLine = mapLocalizedString(data.shortLine, locale);
  const image = data.backgroundImage ?? data.image;
  const cta = mapCtaLink(data.cta, locale);

  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <AppImage
          image={image}
          alt=""
          fill
          fallbackType="hero"
          className="object-cover"
          sizes="100vw"
          priority
          sanityWidth={1920}
          sanityHeight={1080}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        {title && <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>}
        {subtitle && <p className="text-xl text-white/90 mb-2">{subtitle}</p>}
        {shortLine && <p className="text-lg text-white/80 mb-8">{shortLine}</p>}
        {cta.href !== '#' && (
          <Button
            as={Link}
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            color="default"
            variant="solid"
            className="bg-white text-gray-900 font-semibold hover:bg-gray-100"
          >
            {cta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
