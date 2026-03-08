import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { Button, Chip } from '@heroui/react';
import { mapLocalizedString, mapLocalizedText, mapCtaLink } from '@/lib/sanity/mappers';
import type { HomePage } from '@/lib/sanity/types';

interface AgentsSectionProps {
  homePage: Pick<
    HomePage,
    | 'agentsEnabled'
    | 'agentsTitle'
    | 'agentsSubtitle'
    | 'agentsText'
    | 'agentsBenefits'
    | 'agentsCta'
  >;
  locale: string;
}

export function AgentsSection({ homePage, locale }: AgentsSectionProps) {
  if (homePage.agentsEnabled === false) return null;

  const title = mapLocalizedString(homePage.agentsTitle, locale);
  const subtitle = mapLocalizedString(homePage.agentsSubtitle, locale);
  const agentsText = mapLocalizedText(homePage.agentsText, locale);
  const benefits = homePage.agentsBenefits ?? [];
  const cta = mapCtaLink(homePage.agentsCta, locale);

  return (
    <section className="py-16 px-4 bg-default-50">
      <div className="max-w-4xl mx-auto text-center">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {subtitle && <p className="text-xl text-gray-600 mb-4">{subtitle}</p>}
        {agentsText && (
          <div className="prose prose-gray max-w-none mx-auto mb-6">
            {typeof agentsText === 'string' ? (
              <p>{agentsText}</p>
            ) : Array.isArray(agentsText) ? (
              <PortableText value={agentsText} />
            ) : null}
          </div>
        )}
        {benefits.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((b, i) => {
              const label = typeof b === 'object' ? mapLocalizedString(b, locale) : String(b);
              return (
                <Chip key={i} variant="flat" className="bg-white border border-default-200">
                  {label}
                </Chip>
              );
            })}
          </div>
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
    </section>
  );
}
