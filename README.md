# Heaven Furniture Mart — Landing Page

Conversion-focused landing page for **Heaven Furniture Mart**, a bespoke furniture and interior styling studio on Agrabad Access Road, Chattogram.

## Stack

- **Next.js 16** (App Router, static prerender) · **React 19** · **TypeScript**
- **Tailwind CSS v4** with a brand token set (`src/app/globals.css`)
- `next/font` for Cormorant Garamond (display) + Manrope (body), self-hosted at build time
- `next/image` with AVIF/WebP, blur placeholders and art-directed hero (`<picture>` via `getImageProps`)
- No animation library — scroll reveals use one shared `IntersectionObserver` + CSS transitions, and respect `prefers-reduced-motion`

## Page structure

Hero → Brand intro → **3D showpiece** → Why Choose Heaven → Collections snapshot → Bespoke highlight → Social proof (MD quote, showroom, milestones) → Final CTA → Footer.

Every call-to-action on the page routes to the same WhatsApp conversation (`whatsappHref` in `src/lib/site.ts`). A sticky bar surfaces it on mobile once the hero scrolls away.

## 3D showpiece

`src/components/Showpiece.tsx` pins a WebGL scene (`src/components/three/`) for ~3 screens of scroll and turns a classic living set — a sofa flanked by two armchairs — one full revolution as the visitor scrolls, with craftsmanship callouts fading in at set angles. On portrait phones only the sofa is shown.

- Built with three.js + react-three-fiber + drei. The scene chunk (~275 KB gzipped) and the models (~575 KB total) load only when the section comes within 1.5 screens of the viewport; a transparent WebP poster stands in before that and wherever WebGL is unavailable.
- Renders on demand (`frameloop="demand"`), so nothing draws while the page is idle. `prefers-reduced-motion` gets a fixed three-quarter view and all callouts at once.
- Models are CC0 from [Poly Haven](https://polyhaven.com) (`Sofa 01`, `Arm Chair 01`) as stand-ins for Heaven's own pieces. To swap in a real Heaven model, drop a glTF into `public/models/` and optimise it:

  ```bash
  pnpm exec gltf-transform optimize piece.gltf public/models/piece.glb \
    --compress draco --texture-compress webp --texture-size 1024
  ```

  then point `SOFA_URL` / `CHAIR_URL` in `src/components/three/ShowpieceScene.tsx` at it. The camera fits any model automatically. Callout copy lives in `showpieceCallouts` in `src/lib/site.ts`.

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
