import type { Metadata } from 'next';
import { mapSeoData as mapSeoDataFromSanity } from '@/lib/sanity/mappers';
import { urlFor } from '@/lib/sanity';
import type { Seo, SanityImage } from '@/lib/sanity/types';

/** Resolve localized metaTitle, metaDescription, ogTitle, ogDescription from SEO object. */
export function mapSeoData(seo: Seo | null | undefined, locale: string) {
  return mapSeoDataFromSanity(seo, locale);
}

function getOgImageUrl(ogImage: SanityImage | null | undefined): string | undefined {
  if (!ogImage?.asset?._ref) return undefined;
  return urlFor(ogImage).width(1200).height(630).url();
}

/** Build Next.js Metadata from Sanity SEO object. */
export function buildMetadataFromSeo(
  seo: Seo | null | undefined,
  locale: string,
  path: string,
  fallbackSeo?: { title?: string; description?: string }
): Metadata {
  const mapped = mapSeoData(seo, locale);
  const title = mapped.metaTitle || fallbackSeo?.title || 'Domlivo';
  const description = mapped.metaDescription || fallbackSeo?.description || '';
  const ogTitle = mapped.ogTitle || title;
  const ogDescription = mapped.ogDescription || description;
  const ogImageUrl = getOgImageUrl(mapped.ogImage);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domlivo.com';
  const url = `${baseUrl}${path}`;

  return {
    title,
    description: description || undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription || undefined,
      url,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    alternates: {
      canonical: url,
    },
  };
}
