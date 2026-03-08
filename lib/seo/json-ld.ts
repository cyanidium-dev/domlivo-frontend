export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function realEstateListingSchema(property: {
  name: string;
  description?: string;
  url: string;
  price?: number;
  currency?: string;
  address?: string;
  numberOfRooms?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    url: property.url,
    ...(property.price && {
      offers: {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: property.currency ?? 'EUR',
      },
    }),
    ...(property.address && {
      address: { '@type': 'PostalAddress', streetAddress: property.address },
    }),
    ...(property.numberOfRooms && { numberOfRooms: property.numberOfRooms }),
  };
}
