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
- [ ] Add a GA4 measurement ID to `GA_MEASUREMENT_ID` in `lib/site.ts`.
- [x] Custom domain: `https://www.calculator.co.tz` is connected and set as `SITE_URL` (apex redirects to www).
- [ ] Integrate a Google-certified CMP before serving ads to EEA/UK visitors.
- [ ] Submit `https://www.calculator.co.tz/sitemap.xml` in Google Search Console (add both `www.calculator.co.tz` and `calculator.co.tz`).
- [ ] Choose an affiliate network and re-add the CTAs above.

## Future tools (wave 2)

High-traffic candidates to add next, each as a new `content/tools.ts` entry + `lib/calculators/` function:

- **Currency converter (USD ↔ TZS)** — needs a live FX-rate API and a "last updated" timestamp. (The site now *supports* USD + TZS as display currencies across all money calculators, but has no live rate converter yet.)
- **Time zone converter** — high volume; needs tz data.
- **Retirement / 401k calculator** — strong finance affiliate fit.
- **Pregnancy due date calculator** — evergreen health traffic.
- **Body fat % calculator** — complements BMI.
- **Home/DIY calculators** — paint, flooring/concrete, electrical (amps ↔ watts), BTU.

## SEO / polish

- [ ] Add explicit `canonical` to the home page and converter index (hub) pages.
- [ ] Consider `HowTo` or `Calculator`-specific structured data beyond `FAQPage`.
- [ ] Add a sitemap submission reminder to the README's launch checklist.
