# Assay

A discovery and trust layer for tokenized real-world assets (RWAs) — the place to check *before*
you buy an RWA token, surfacing the verification state, redemption terms, and reserve
transparency an issuer's own interface won't show you.

This is a frontend build of the Assay product doc (see session context / design brief), styled
with **Circle**, a design system extracted from a reference Figma file rather than invented —
see [`design-system/`](./design-system) for the extracted tokens and the rules behind them.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, tokens defined in `src/app/globals.css`)
- No backend — `src/lib/data.ts` is a hand-curated mock dataset standing in for the "manual
  research" v1 data source (product doc §10, open question 2)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
design-system/            tokens.json, design-system-notes.md — provenance + rules for Circle
src/lib/                  domain types, mock data, verification-state derivation, filters
src/components/ui/        Circle primitives: Badge, StatePill, Button, Card, CheckRow, StatTile…
src/components/trust/     the reusable trust chips: VerificationChip/Panel, Redemption/ReserveChip
src/components/explore/   directory: filters, table (desktop) + cards (mobile), empty state
src/components/compare/   2–4 listing comparison table, grouped by section
src/components/detail/    Liquidity vs. redemption, Cost & reserve, "Before you buy" checklist
src/components/portfolio/ holdings table, alerts, digest email preview
src/app/                  routes: / (Explore), /compare, /listing/[id], /portfolio
```

## Design decisions worth knowing about

- **"Not disclosed" is a first-class, neutral state everywhere** — never a blank cell, never
  "N/A". It's rendered with the same visual weight as every other state (product doc §2, §4.4).
- **Default directory sort is verification recency, not yield** — and deliberately *not* a
  composite disclosure-completeness score (product doc §10, open question 4; the doc's own stated
  lean is against it as a liability). See `src/lib/filters.ts`.
- **Staleness is relative to each issuer's own stated verification cycle**, computed at render
  time from `lastVerifiedAt` + `cycleDays` (never a fixed day count). See `src/lib/verification.ts`.
- **Sell vs. redeem never share a label, chip, or sentence** (product doc §4.1) — see
  `LiquidityRedemptionModule`, where the two paths are visually parallel but never merged.
- **Assay is informational-only for this build** (product doc §10, open question 1) — there's no
  purchase flow, so the pre-commit disclosure (§5.7) lives as the "Before you buy" checklist on
  the detail page rather than a purchase interstitial, and outbound links go to `docsUrl`.
