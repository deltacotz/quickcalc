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

- [ ] Paste AdSense publisher ID into `ADSENSE_CLIENT` in `lib/site.ts` (after AdSense approval).
- [x] Add a GA4 measurement ID (done: `G-JWGR6Z0QGC`).
- [x] Custom domain: `https://www.calculator.co.tz` is connected and set as `SITE_URL` (apex redirects to www).
- [ ] Integrate a Google-certified CMP before serving ads to EEA/UK visitors.
- [x] Submit `https://www.calculator.co.tz/sitemap.xml` in Google Search Console (add both `www.calculator.co.tz` and `calculator.co.tz`).
- [ ] Choose an affiliate network and re-add the CTAs above.

## Future tools (next wave)

- [x] **Currency converter (USD ↔ TZS)** — live rates via open.er-api.com (free, no key).
- [x] **Time zone converter** — IANA time zones via the browser Intl API.
- [x] **Retirement / 401k calculator**
- [x] **Pregnancy due date calculator**
- [x] **Body fat % calculator** (US Navy method)
- [x] **Home/DIY** — paint calculator + amps↔watts.

Still optional later: flooring/concrete, BTU, scientific calculator, and more niche tools.

## Local / Tanzania SEO

- [x] USD → TZS and TZS → USD preset converter pages (`/usd-to-tzs`, `/tzs-to-usd`).
- [x] Tanzania hub page (`/tanzania`).
- [x] Tanzania PAYE / take-home salary calculator (`/tools/tanzania-paye-calculator`).

## SEO / polish

- [x] Add explicit `canonical` to the home page and converter index (hub) pages (also added to the compliance pages).
- [x] iOS apple-touch-icon (180×180 PNG at `app/apple-icon.png`).
