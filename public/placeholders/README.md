# Placeholder Images

**Local placeholders are the default fallback** when CMS images are missing.

## Default (bundled)

SVG placeholders are included and used by default:

- `property.svg`, `city.svg`, `blog.svg`, `hero.svg`, `logo.svg`, `generic.svg`

## Replacing with real assets

Add production-ready images and update `lib/sanity/placeholders.ts` to use them:

| File           | Use case         | Recommended size |
| -------------- | ---------------- | ---------------- |
| `property.jpg` | Property cards   | 600×450          |
| `city.jpg`     | City cards       | 400×300          |
| `blog.jpg`     | Blog covers      | 600×340          |
| `hero.jpg`     | Hero backgrounds | 1920×1080        |
| `logo.png`     | Logo fallback    | 160×48           |
| `generic.jpg`  | Generic fallback | 600×400          |

Update `LOCAL_PLACEHOLDER_PATHS` in `lib/sanity/placeholders.ts` to point to these files (e.g. `/placeholders/property.jpg`).
