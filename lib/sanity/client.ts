import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-02-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Server-side fetch with Next.js cache options.
 * Use in Server Components.
 */
export async function sanityFetch<T>(options: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  const { query, params = {}, revalidate = 60, tags = [] } = options;
  return client.fetch<T>(query, params, {
    next: { revalidate: tags.length > 0 ? false : revalidate, tags },
  });
}
