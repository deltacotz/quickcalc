# TODO — Calculator

Backlog of future work. Nothing here blocks the current live site.

## Re-add affiliate CTAs (removed)

The finance-tool affiliate boxes were removed to avoid dead links. To re-add them:

1. Add an `affiliate` object to the relevant tool in `content/tools.ts`:
   ```ts
   affiliate: {
     cta: "Compare current mortgage rates",
     url: "https://YOUR-AFFILIATE-LINK",
     note: "This calculator is for estimation only and is not a loan offer.",
   },
   ```
2. Re-add the render in `app/tools/[slug]/page.tsx` (the `AffiliateCta` component is still in
   `components/AffiliateCta.tsx`).

Original slots (finance tools):
- **Mortgage** — "Compare current mortgage rates"
- **Loan** — "Check today's personal loan rates"
- **Compound interest** — "Open a brokerage or retirement account"

## Monetization & ops

- [x] Paste AdSense publisher ID into `ADSENSE_CLIENT` (done: `ca-pub-3764832370784513`, site verified).
- [ ] Wait for AdSense content review/approval, then turn on Auto ads (or create manual ad units).
- [x] Add a GA4 measurement ID (done: `G-JWGR6Z0QGC`).
- [x] Custom domain: `https://www.calculator.co.tz` is connected and set as `SITE_URL` (apex redirects to www).
- [ ] Integrate a Google-certified CMP before serving ads to EEA/UK visitors (use Google Privacy & Messaging — no code change needed).
- [x] Submit `https://www.calculator.co.tz/sitemap.xml` in Google Search Console (add both `www.calculator.co.tz` and `calculator.co.tz`).
- [ ] Choose an affiliate network and re-add the CTAs above.

## Future tools (next wave)

- [x] **Currency converter (USD ↔ TZS)** — live rates via open.er-api.com (free, no key).
- [x] **Time zone converter** — IANA time zones via the browser Intl API.
- [x] **Retirement / 401k calculator**
- [x] **Pregnancy due date calculator**
- [x] **Body fat % calculator** (US Navy method)
- [x] **Home/DIY** — paint calculator + amps↔watts.

Still optional later:
- [ ] More currency pairs — USD→KES, USD→UGX, EUR→TZS, etc. (one-line addition via `content/currency-pages.ts`).
- [ ] Flooring/concrete, BTU, and scientific calculators.
- [ ] More niche tools as search demand suggests.

## Local / Tanzania SEO

- [x] USD → TZS and TZS → USD preset converter pages (`/usd-to-tzs`, `/tzs-to-usd`).
- [x] Tanzania hub page (`/tanzania`).
- [x] Tanzania PAYE / take-home salary calculator (`/tools/tanzania-paye-calculator`).

## SEO / polish

- [x] Add explicit `canonical` to the home page and converter index (hub) pages (also added to the compliance pages).
- [x] iOS apple-touch-icon (180×180 PNG at `app/apple-icon.png`).

## Off-page SEO / backlinks

The plan to grow external links and referral traffic. Code items I can build; outreach/submission items are manual.

- [ ] Embeddable calculator widgets — `/embed/[slug]` route + an "Embed" button + copy-paste iframe snippet on each tool.
- [ ] Brand / press page (`/press`) — downloadable logo (SVG/PNG), site description, suggested anchor text.
- [ ] Outreach kit (`docs/outreach.md`) — directory list + guest-post pitch and social post templates.
- [ ] Submit to free tool directories & "best calculators" lists.
- [ ] Tanzania local citations (consistent name/address/phone).
- [ ] Guest posts / outreach to East Africa finance, tech and education sites.
- [ ] Q&A & community participation (Reddit, Quora, Tanzanian forums) — value-first, no spam.
- [ ] Social profiles (Facebook, X, LinkedIn, Instagram).
- [ ] Data-driven linkable asset (e.g. Tanzania salary / cost-of-living / tax reference).

## Maintenance & reliability

- [ ] Re-verify Tanzania PAYE tax bands each July (TRA budget changes) and update `lib/calculators/tanzania.ts`.
- [ ] Upgrade the currency-rate API from open.er-api.com to a paid/reliable FX provider if the converter grows.
- [ ] Confirm Core Web Vitals (LCP/CLS) in PageSpeed Insights once Google indexes.

## Localization (future)

- [ ] Swahili language version (larger effort — UI and content translation).
