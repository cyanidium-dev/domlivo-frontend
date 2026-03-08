import { PortableText } from '@portabletext/react';
import { mapLocalizedString, mapLocalizedText } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface AboutSectionProps {
  homePage: Pick<HomePage, 'aboutTitle' | 'aboutText' | 'aboutBenefits'>;
  locale: string;
}

export function AboutSection({ homePage, locale }: AboutSectionProps) {
  const title = mapLocalizedString(homePage.aboutTitle, locale);
  const aboutText = mapLocalizedText(homePage.aboutText, locale);
  const benefits = homePage.aboutBenefits ?? [];

  if (!title && !aboutText && benefits.length === 0) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
        {aboutText && (
          <div className="prose prose-gray max-w-none mb-8">
            {typeof aboutText === 'string' ? (
              <p>{aboutText}</p>
            ) : (
              <PortableText value={aboutText} />
            )}
          </div>
        )}
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
      </div>
    </section>
  );
}
