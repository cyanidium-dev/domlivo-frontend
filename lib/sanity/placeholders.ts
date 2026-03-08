export type PlaceholderType = 'property' | 'city' | 'blog' | 'hero' | 'logo' | 'generic';

/**
 * Local placeholder paths (primary fallback).
 * Files live in public/placeholders/ and are served at /placeholders/*
 *
 * Default: SVG placeholders (bundled). Replace with real jpg/png assets
 * and update paths to: property.jpg, city.jpg, blog.jpg, hero.jpg, logo.png, generic.jpg
 */
const LOCAL_PLACEHOLDER_PATHS: Record<PlaceholderType, string> = {
  property: '/placeholders/property.svg',
  city: '/placeholders/city.svg',
  blog: '/placeholders/blog.svg',
  hero: '/placeholders/hero.svg',
  logo: '/placeholders/logo.svg',
  generic: '/placeholders/generic.svg',
};

/**
 * External placeholder service (optional fallback only).
 * Used when local placeholder fails to load (e.g. file missing).
 */
export const EXTERNAL_PLACEHOLDER_FALLBACK: Record<PlaceholderType, string> = {
  property: 'https://placehold.co/600x450/e5e7eb/6b7280?text=Property',
  city: 'https://placehold.co/400x300/e5e7eb/6b7280?text=City',
  blog: 'https://placehold.co/600x340/e5e7eb/6b7280?text=Blog',
  hero: 'https://placehold.co/1920x1080/374151/9ca3af?text=Hero',
  logo: 'https://placehold.co/160x48/e5e7eb/6b7280?text=Logo',
  generic: 'https://placehold.co/600x400/e5e7eb/6b7280?text=Image',
};

/**
 * Returns the local placeholder path for the given type.
 * Local /placeholders/* assets are the default fallback source.
 * Add real image files to public/placeholders/ (see README in that folder).
 */
export function getPlaceholderByType(type: PlaceholderType): string {
  return LOCAL_PLACEHOLDER_PATHS[type];
}
