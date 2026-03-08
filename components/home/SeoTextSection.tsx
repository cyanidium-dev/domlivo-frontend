import { PortableText } from '@portabletext/react';
import { mapLocalizedText } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface SeoTextSectionProps {
  homePage: Pick<HomePage, 'seoText'>;
  locale: string;
}

export function SeoTextSection({ homePage, locale }: SeoTextSectionProps) {
  const seoText = mapLocalizedText(homePage.seoText, locale);

  if (!seoText) return null;

  return (
    <section className="py-12 px-4 bg-default-50">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-sm prose-gray max-w-none">
          {typeof seoText === 'string' ? <p>{seoText}</p> : <PortableText value={seoText} />}
        </div>
      </div>
    </section>
  );
}
