/**
 * Handles both /rent/[city]/[district] and /rent/[city]/[type]
 * Resolve slug as district or propertyType via CMS
 */
interface PageProps {
  params: Promise<{ locale: string; city: string; slug: string }>;
}

export default async function RentCitySlugPage({ params }: PageProps) {
  const { city, slug } = await params;
  return (
    <main>
      Rent in {city} / {slug} (placeholder)
    </main>
  );
}
