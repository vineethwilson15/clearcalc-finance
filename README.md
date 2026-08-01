# ClearCalc Finance

Netlify-ready Next.js web app focused on high-intent finance calculators for SEO-driven growth.

## Included MVP pages

- Mortgage Calculator
- Loan Calculator
- Salary Calculator
- Tax Calculator
- US SEO template index at `/us`

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint + Prettier

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## SEO and monetization setup included

- Metadata for all pages
- `robots.ts` and `sitemap.ts`
- Production-ready AdSense component wiring with per-placement slot keys
- JSON-LD on dynamic template pages
- 30 US long-tail templates (`/us/[category]/[slug]`)
- 100 state-level pages (`/us/state-tax/[state]` + `/us/take-home-pay/[state]`)
- State-aware tax and take-home logic for all US state template routes
- Formula tables on dynamic template pages
- Scenario presets on core and state calculators
- Tax-year selector support (2024/2025/2026) in state tax and take-home calculators
- Internal linking blocks between related state pages
- State profile models (none/flat/progressive) with bracket-driven estimates
- Source/methodology + disclaimer blocks with freshness timestamps on state pages
- Conversion CTA modules on state pages to improve session depth
- Expanded progressive tax bracket models across additional states for finer estimates
- Official AdSense script loading and responsive `ins.adsbygoogle` unit rendering

## AdSense configuration

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` to your approved AdSense publisher ID.
3. Set each `NEXT_PUBLIC_ADSENSE_SLOT_*` variable to the matching ad unit slot ID.
4. Redeploy so env vars are available in production.

## Next phase

1. Replace example `.env` values with your live AdSense client and slot IDs.
2. Continue improving state-specific tax rules for niche/local edge cases.
