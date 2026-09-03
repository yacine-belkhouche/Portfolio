# Yacine Belkhouche — Portfolio

A single-page marketing site built with **Next.js (App Router)**, **Tailwind CSS v4**,
**Framer Motion** and **Supabase**.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev
```

Open http://localhost:3000.

## The portrait

`assets/me1-original.jpeg` is the untouched 1800×4000 source. `crop.mjs`
derives `public/profile.jpg` from it — an 1100-px-tall three-quarter crop,
1200×2182 at 181 KB (down from 2.7 MB). The hero frame is `aspect-[11/20]`,
matching that file exactly, so `object-cover` has nothing left to trim and the
composition is fixed in the asset rather than guessed at in CSS.

To recompose, edit the `CROP` rectangle in `crop.mjs` and re-run
`node crop.mjs`. If you change the output's aspect ratio, update
`aspect-[11/20]` in `components/portrait.tsx` to match. If the image is ever
missing, the hero falls back to a styled `YB` monogram plate rather than a
broken image.

## One thing to do before launch

1. **Create the Supabase table.** Paste `supabase/schema.sql` into the
   Supabase SQL editor and run it, then set the three keys in `.env.local`.
   Without them the contact form still validates and fails gracefully,
   pointing visitors at the email address instead.

## Structure

```
app/
  layout.tsx           metadata, fonts, JSON-LD structured data
  page.tsx             section composition
  globals.css          design tokens + utilities (Tailwind v4 @theme)
  robots.ts            robots.txt
  sitemap.ts           sitemap.xml
  api/contact/route.ts validated, rate-limited lead capture → Supabase
components/
  motion-primitives.tsx  Reveal, Stagger, WordsUp, Parallax, Spotlight, Counter
  site-header.tsx        condensing nav + mobile overlay
  hero.tsx / portrait.tsx
  about.tsx / services.tsx / process.tsx / contact.tsx / site-footer.tsx
lib/
  site.ts              name, phone, email, stats, stack — edit copy here
  supabase/            browser (anon) + server (service role) clients
supabase/schema.sql    leads table, constraints, RLS
```

## Design tokens

Colours, fonts and easing live in the `@theme` block at the top of
`app/globals.css`. Change `--color-gold` there to re-skin the whole site.

## Animation notes

Every animated component is a client component; the page shell stays a server
component. All motion respects `prefers-reduced-motion` — reveals collapse to a
plain opacity fade and parallax is disabled entirely.

## Performance

- Server components everywhere except the animated leaves
- `next/font` self-hosts Inter and Instrument Serif (no render-blocking request)
- `next/image` with AVIF/WebP and a `priority` hero portrait
- Security headers set in `next.config.mjs`

## Deploy

Push to GitHub and import on Vercel. Add the same four environment variables
from `.env.example` in the Vercel project settings, and set
`NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, Open Graph
tags and the sitemap resolve correctly.
