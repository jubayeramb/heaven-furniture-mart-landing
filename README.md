# Heaven Furniture Mart — Landing Page

Conversion-focused landing page for **Heaven Furniture Mart**, a bespoke furniture and interior styling studio on Agrabad Access Road, Chattogram.

## Stack

- **Next.js 16** (App Router, static prerender) · **React 19** · **TypeScript**
- **Tailwind CSS v4** with a brand token set (`src/app/globals.css`)
- `next/font` for Cormorant Garamond (display) + Manrope (body), self-hosted at build time
- `next/image` with AVIF/WebP, blur placeholders and art-directed hero (`<picture>` via `getImageProps`)
- No animation library — scroll reveals use one shared `IntersectionObserver` + CSS transitions, and respect `prefers-reduced-motion`

## Page structure

Hero → Brand intro → Why Choose Heaven → Collections snapshot → Bespoke highlight → Social proof (MD quote, showroom, milestones) → Final CTA → Footer.

Every call-to-action on the page routes to the same WhatsApp conversation (`whatsappHref` in `src/lib/site.ts`). A sticky bar surfaces it on mobile once the hero scrolls away.

## Content

All copy, contact details, socials and milestones live in one place: `src/lib/site.ts`. Photos in `src/assets/images/` are Heaven Furniture Mart's own product and showroom photography from their Facebook page and YouTube channel, cropped and colour-balanced.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://heavenfurnituremart.com`) in production so Open Graph and JSON-LD URLs are absolute.
