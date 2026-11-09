# Hanna K-Beauty prototype

A responsive Next.js 16 / React / TypeScript storefront using Tailwind CSS 4 and custom CSS. No additional dependencies were added.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if the local execution policy blocks `npm.ps1`.

## Routes and behavior

- `/`: homepage with search, five concern buttons, a six-product scroll-snap bestseller carousel, and Shop All.
- `/shop`: six photo-identified prototype products; `q` searches names, types, descriptions and concern labels; `concern` filters products. Filters combine, persist in URLs, and can be cleared. Empty results offer recovery.
- `/products/[slug]`: product details for each sample product. Unknown products show a 404.

Account and cart are disabled icon-only controls with accessible labels explaining their prototype status. Buying buttons remain disabled and marked as unavailable on product details. No authentication, stock tracking, backend, checkout or payments exist. Prices and discounts are temporary RON values. Stock is unconfirmed; bestseller placement and concern grouping are demo selections. Photo-based identification notes record uncertain variants.

## Editing the prototype

- Central catalog, stable IDs, identification notes, demo pricing, stock and concern mappings: `lib/catalog.ts`. Add/edit/remove entries here; cards, search and detail pages all use it.
- Carousel interaction: `components/product-carousel.tsx`. Shared photographic cards and price display: `components/product-card.tsx`.
- Shared header, footer, concern navigation and catalog grid: `components/store.tsx`.
- Logo: add `public/logo.jfif`; `components/logo.tsx` shows a circular text fallback on load failure.
- Hero: background photography is configured in `app/globals.css`; the live headline panel remains in `app/page.tsx`.
- Palette and responsive layouts: `app/globals.css`.

Direct homepage product links take one click; concern to product detail takes two. This supports the discovery target, but a measured average of 4.5 clicks or fewer requires user testing.

## Checks

```sh
npm run lint
npm run build
```

Read the bundled Next.js guides in `node_modules/next/dist/docs/` before making framework changes, as required by `AGENTS.md`.

## Development server lifecycle

Use exactly one development server at `http://localhost:3000` (`npm run dev`). Reuse it for subsequent changes and checks; do not start additional servers on other ports. The development command pins port 3000 and fails if occupied. Stop stale Next.js processes before clearing `.next` or replacing production build output. Run production builds with no production server using the same `.next` output.

## Product data conventions

`regularPriceRON` and optional `discountPriceRON` are numeric RON prices. `isBestseller` controls homepage inclusion; it is a demo merchandising flag. `stockStatus` supports `unconfirmed`, `in_stock` and `out_of_stock`, with every current entry unconfirmed. `legacySlugs` preserves old fictional prototype links by redirecting them to current sample products; it does not assert equivalence with the old fictional names. No database, cart, checkout or payment integration exists.
