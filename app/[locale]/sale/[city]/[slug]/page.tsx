/**
 * Handles both /sale/[city]/[district] and /sale/[city]/[type]
 * Resolve slug as district or propertyType via CMS
 */
interface PageProps {
  params: Promise<{ locale: string; city: string; slug: string }>;
}

export default async function SaleCitySlugPage({ params }: PageProps) {
  const { city, slug } = await params;
  return (
    <main>
      Sale in {city} / {slug} (placeholder)
    </main>
  );
}
