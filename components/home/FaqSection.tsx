import { PortableText } from '@portabletext/react';
import { Accordion, AccordionItem } from '@heroui/react';
import { mapLocalizedString } from '@/lib/sanity/mappers';
import type { HomePage, FaqItem } from '@/lib/sanity/types';

interface FaqSectionProps {
  homePage: Pick<HomePage, 'faqEnabled' | 'faqTitle' | 'faqItems'>;
  locale: string;
}

function FaqAnswer({ item }: { item: FaqItem }) {
  const answer = item.answer;
  if (!answer) return null;
  if (typeof answer === 'string') return <p className="text-default-600">{answer}</p>;
  return (
    <div className="prose prose-sm prose-default max-w-none">
      <PortableText value={answer} />
    </div>
  );
}

export function FaqSection({ homePage, locale }: FaqSectionProps) {
  if (homePage.faqEnabled === false) return null;

  const title = mapLocalizedString(homePage.faqTitle, locale);
  const items = homePage.faqItems ?? [];

  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
        <Accordion variant="bordered">
          {items.map((item, i) => {
            const q =
              typeof item.question === 'object'
                ? mapLocalizedString(item.question, locale)
                : (item.question ?? '');
            if (!q) return null;
            return (
              <AccordionItem key={i} title={q} aria-label={q}>
                <FaqAnswer item={item} />
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
