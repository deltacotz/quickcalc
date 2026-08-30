# QuickCalc — Free Calculators & Unit Converters

A Next.js + TypeScript site of free online calculators and unit converters, built to rank in
search and monetize with Google AdSense (plus affiliate links on finance tools).

## Stack

- **Next.js 16** (App Router, static generation) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **tsx** + Node's built-in test runner for formula tests

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static-generates ~490 pages)
npm run lint
npm test           # runs the 23 formula/unit tests
```

## What's included

- **13 calculator tools**, each a static page with intro, formula, worked examples, FAQ
  (`FAQPage` JSON-LD) and disclaimers:
  percentage, BMI, age, date difference, mortgage, loan, compound interest, salary→hourly,
  calorie/BMR/TDEE, tip, discount, fuel cost, and GPA.
- **8 unit-converter categories** (length, weight, temperature, area, volume, speed, data, time)
  with a category page **plus ~460 per-pair landing pages** (e.g. `/converters/length/miles-to-kilometers`)
  each with an instant converter, a conversion table and canonical/meta tags.
- Compliance pages (privacy, about, contact, terms), `sitemap.xml`, `robots.txt`, 404 page.

## Project layout

```
app/                 routes (tools, converters, compliance, sitemap, robots)
components/          UI: widgets (client) + page sections + AdSlot/AffiliateCta
content/tools.ts     per-tool editorial content (intro, formula, examples, FAQ)
lib/convert.ts       unit-conversion engine (factors + affine temperature)
lib/calculators/     pure, unit-tested formula functions per tool
lib/format.ts        number/currency formatting
lib/site.ts          ALL site config (brand, domain, ads, analytics) — edit this first
```

## Before launch — edit `lib/site.ts`

1. **`SITE_NAME`** — your brand name (currently `QuickCalc`).
2. **`SITE_URL`** — your real production domain (currently a `.example` placeholder).
   This drives canonicals and the sitemap.
3. **`CONTACT_EMAIL`** — your contact address.

## Monetization

### Google AdSense (primary)

1. Build traffic first, then apply at [AdSense](https://adsense.google.com). Bare calculator sites
   are frequently rejected for **"low-value content"** — this project mitigates that with original
   intro/formula/examples/FAQ on every page. Do **not** remove that content.
2. Paste your publisher ID into `ADSENSE_CLIENT` in `lib/site.ts` (e.g. `ca-pub-1234567890123456`).
   Ad slots render automatically once set; they show placeholder boxes until then.
3. **EEA/UK traffic:** Google requires a **Google-certified Consent Management Platform (CMP)**.
   Integrate one before serving ads to those regions.

### Affiliate (finance tools only)

Mortgage, loan and compound-interest pages render an affiliate CTA. Replace the placeholder URLs
in `content/tools.ts` with your real affiliate links. All affiliate links use
`rel="sponsored nofollow"` as required.

## SEO

- Each page has unique title/description, canonical URL, and `FAQPage`/`WebPage` JSON-LD.
- Add the domain to **Google Search Console** and submit the sitemap after deploy.
- GA4 is wired in `lib/site.ts` (`GA_MEASUREMENT_ID`); leave empty until you have an ID.

## Wave 2 ideas

Currency converter (needs a live FX API), time-zone converter, retirement/401k calculator,
pregnancy due date, and home/DIY calculators (paint, flooring, electrical).
