# Domlivo — Real Estate Platform

Production-ready real estate platform for Albania.

## 1. Folder Structure

```
domlivo-frontend/
├── app/
│   ├── [locale]/                    # Locale-based routing (sq, ru, en)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sale/
│   │   │   ├── page.tsx
│   │   │   └── [city]/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx   # district or type
│   │   ├── rent/
│   │   │   ├── page.tsx
│   │   │   └── [city]/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── cities/
│   │   │   └── page.tsx
│   │   └── property/
│   │       └── [slug]/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   ├── search/PropertySearch.tsx
│   ├── property/
│   ├── city/
│   ├── district/
│   └── ui/
├── features/
│   ├── property/
│   ├── city/
│   ├── district/
│   ├── agent/
│   └── search/
├── lib/
│   ├── sanity/          # client, sanityFetch, urlFor, queries
│   ├── seo/             # metadata, JSON-LD (FAQPage, RealEstateListing)
│   └── utils.ts
├── hooks/
├── store/               # Zustand
├── types/               # Property, PropertyImage, etc.
├── i18n/                # next-intl config
├── messages/            # sq, ru, en
├── .husky/pre-commit
└── middleware.ts        # next-intl
```

## 2. Installed Dependencies

| Category          | Package                                  |
| ----------------- | ---------------------------------------- |
| Core              | next, react, react-dom                   |
| Styling           | tailwindcss                              |
| CMS (integration) | next-sanity, @sanity/image-url           |
| Rich text         | @portabletext/react                      |
| Forms             | react-hook-form, @hookform/resolvers     |
| Validation        | zod                                      |
| Data fetching     | @tanstack/react-query                    |
| State             | zustand                                  |
| i18n              | next-intl                                |
| Maps              | mapbox-gl                                |
| Email             | resend                                   |
| Lint/Format       | eslint, prettier, eslint-config-prettier |
| Git hooks         | husky, lint-staged                       |

## 3. Architecture

### Routing

- **Locale-first**: All routes are prefixed with `/[locale]` (sq, ru, en).
- **SEO URLs**:
  - `/sq/sale`, `/sq/sale/tirana`, `/sq/sale/tirana/[slug]`
  - `/sq/rent`, `/sq/rent/durres`, `/sq/rent/durres/[slug]`
  - `/sq/property/[slug]`
  - `/sq/cities`
- **Conflict resolution**: `[district]` and `[type]` under `[city]` are merged into `[slug]`; the page resolves slug via CMS.

### Sanity Integration (frontend only)

- **Separate Sanity repo**: Studio and schemas live in a dedicated CMS repository.
- **Frontend integration** in `lib/sanity/`:
  - `client` — next-sanity client
  - `sanityFetch` — server-side fetch with Next.js cache (revalidate, tags)
  - `urlFor` — image URL builder for Sanity assets
  - `queries` — GROQ queries (PROPERTIES_LIST_QUERY, PROPERTY_BY_SLUG_QUERY)

### SEO

- Metadata helpers in `lib/seo/metadata.ts`
- JSON-LD: `faqPageSchema`, `realEstateListingSchema` in `lib/seo/json-ld.ts`

### Performance

- Server components by default
- Dynamic routes where needed
- Pagination-ready queries (8–12 items for landing sections)

### Env

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_MAPBOX_TOKEN`, `RESEND_API_KEY`

### Commands

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
```
