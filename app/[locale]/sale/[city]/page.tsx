interface PageProps {
  params: Promise<{ locale: string; city: string }>;
}

export default async function SaleCityPage({ params }: PageProps) {
  const { city } = await params;
  return <main>Sale in {city} (placeholder)</main>;
}
