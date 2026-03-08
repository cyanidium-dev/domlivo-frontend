import type { Metadata } from 'next';

export function createMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
}: {
  title: string;
  description?: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url: string; width?: number; height?: number };
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domlivo.com';
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description ?? undefined,
      url,
      ...(ogImage && {
        images: [{ url: ogImage.url, width: ogImage.width, height: ogImage.height }],
      }),
    },
    alternates: {
      canonical: url,
    },
  };
}
