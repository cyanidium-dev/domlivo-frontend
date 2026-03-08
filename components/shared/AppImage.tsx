'use client';

import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import { getPlaceholderByType } from '@/lib/sanity/placeholders';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { PlaceholderType } from '@/lib/sanity/placeholders';

function isValidSanityImage(
  src: SanityImageSource | null | undefined
): src is NonNullable<SanityImageSource> {
  if (src == null) return false;
  if (typeof src === 'string') return src.length > 0;
  return Boolean((src as { asset?: { _ref?: string } })?.asset?._ref);
}

export interface AppImageProps {
  image?: SanityImageSource | null;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackType?: PlaceholderType;
  sizes?: string;
  priority?: boolean;
  /** Sanity width for urlFor when image exists */
  sanityWidth?: number;
  /** Sanity height for urlFor when image exists */
  sanityHeight?: number;
}

function getSafeAlt(alt: string | undefined, fallbackType: PlaceholderType): string {
  if (alt?.trim()) return alt;
  const labels: Record<PlaceholderType, string> = {
    property: 'Property image',
    city: 'City',
    blog: 'Blog post',
    hero: 'Hero background',
    logo: 'Logo',
    generic: 'Image',
  };
  return labels[fallbackType];
}

export function AppImage({
  image,
  alt,
  width,
  height,
  fill = false,
  className = '',
  fallbackType = 'generic',
  sizes,
  priority = false,
  sanityWidth = 800,
  sanityHeight = 600,
}: AppImageProps) {
  const [useFallback, setUseFallback] = useState(false);
  const hasValidImage = !useFallback && isValidSanityImage(image);

  const src = hasValidImage
    ? urlFor(image).width(sanityWidth).height(sanityHeight).url()
    : getPlaceholderByType(fallbackType);

  const safeAlt = getSafeAlt(alt, fallbackType);

  const handleError = () => setUseFallback(true);

  const baseClassName = ['object-cover', 'rounded-lg', className].filter(Boolean).join(' ');

  if (fill) {
    return (
      <Image
        src={src}
        alt={safeAlt}
        fill
        className={baseClassName}
        sizes={sizes ?? '100vw'}
        priority={priority}
        onError={handleError}
      />
    );
  }

  const w = width ?? 600;
  const h = height ?? 400;

  return (
    <Image
      src={src}
      alt={safeAlt}
      width={w}
      height={h}
      className={baseClassName}
      priority={priority}
      onError={handleError}
    />
  );
}
