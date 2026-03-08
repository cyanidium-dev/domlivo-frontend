interface PageProps {
  params: Promise<{ locale: string; city: string }>;
}

export default async function RentCityPage({ params }: PageProps) {
  const { city } = await params;
  return <main>Rent in {city} (placeholder)</main>;
}
