# Circle — design system notes

Extracted from the Figma file `Ml7pn8kazowJZLyWNOn268` ("Screen"), pages **Components** and **Screens**. The file itself is a different product's UI (a deal-flow/fund-screening tool) — Assay borrows its *visual system* (type, color, spacing, component anatomy), not its content or IA. Tokens are in `tokens.json` / `src/app/globals.css`. This file documents the *rules*, so new Assay components stay in the same language instead of improvising.

## Typeface roles — three fonts, each with one job

- **JetBrains Mono, Extrabold** — display/headline face. Used for page titles and card headlines in the source ("Create an account"). Tight negative tracking (-1%). Reads as instrument-panel/ledger, not marketing — kept it for exactly that reason on a trust product.
- **Sora** — the UI workhorse. **Bold (700)** for interactive labels and field labels (buttons, input labels). **Light (300)** for input values/placeholder and longer body copy. Never mix a third weight in; the source only ever uses these two.
- **Poppins, SemiBold** — small-caps-scale chip/badge/caption text (11–13px), always with the state color as text color when on a subtle/light background, or reversed to white/pale on a saturated fill. This is the type used specifically for the trust vocabulary (Badge, CheckRow, StatChip) — reuse it for every new trust-status label so verification chips, redemption chips and reserve chips read as one family.

Never use Sora or JetBrains Mono for a status pill — Poppins SemiBold is the "this is a state, not a sentence" signal.

## Color roles

- `text.primary` / `text.secondary` / `text.tertiary` step down in emphasis in that order. `text.tertiary` is specifically the source's "muted / not-yet-known" tone (used on the CheckRow "unknown" glyph and StatChip's secondary number) — this is why it's the natural base for Assay's "Not disclosed" treatment rather than a generic gray.
- `surface.brand` (#0a0a0a, near-black) is the one high-contrast fill in the system — reserved for the single primary action per view (primary button, brand badge). Don't use it decoratively.
- Semantic colors come in **two strengths**, and the source is consistent about which surfaces use which:
  - **Saturated** (`badge.success/info/warning/danger`) — solid, high-chroma fill with a pale text color on top. Used only on the standalone `Badge` component.
  - **Subtle** (`state.*.primary` / `state.*.subtle`) — a pale tint background with a saturated-but-darker text/icon color. Used on `CheckRow` and `StatChip`. This is the pairing to use for anything that sits inline in a list or table row (verification chips in a directory table, trust chips on a card) — the saturated Badge treatment is too loud at list density and is reserved for single, standalone status callouts.
- Color alone never carries a state in the source (CheckRow pairs a glyph — ✓ / ⚠ / ? — with the color; Badge pairs a text label with the fill). Assay's verification/redemption/reserve chips follow the same rule: icon or glyph + label text, color is reinforcement only.

## Spacing rhythm

Gaps and padding are always one of `space.1/2/3/4` (4/8/12/16px) at component scale — e.g. Button padding is `space.3 space.2` (medium) or `space.2 space.1` (small); form-field gaps are `space.2`; card padding is `space.4`. Page-level layout (section gaps, grid gutters) extrapolates the same rhythm upward (`space.6`, `space.8`, `space.12`) since the source components never needed to lay out a full page.

## Component anatomy (from source)

- **Button** — `radius.xxs` (2px, deliberately sharp next to the pill-shaped badges — buttons and status pills are visually distinct families). Primary = `surface.brand` fill + `text.on-brand` label, Sora Bold 15px. Secondary = no fill, `text.primary` label, same type. Two sizes (`medium`: `space.3`/`space.2` padding, `small`: `space.2`/`space.1`), optional leading icon. Hover on primary is a subtle vertical gradient darken/lighten, not a color swap.
- **Badge** — pill (`radius.lg`), `space.2` horizontal / `space.1` vertical padding, Poppins SemiBold 11px uppercase, saturated fill. One of 6 tones (neutral/brand/success/info/warning/danger). This is the component Assay's **verification state chip** (5.4) is built on — map Verified→success, Pending→info, Stale→warning, Flagged→danger, Not disclosed→neutral (never danger — absence of disclosure is reported neutrally per the product doc, not penalized visually).
- **CheckRow** — glyph (✓ success / ⚠ warning / ? unknown) + label, `space.2` gap, `text.primary` for the label regardless of state (only the glyph carries color). This is the exact anatomy for Assay's **pre-commit "Before you buy" checklist** (5.7) and Compare's per-row unknown treatment (5.2) — a row of CheckRows where the "?" rows are what the whole product is trying to reduce.
- **StatChip** — bordered card (`radius.sm`, `border.secondary`), tertiary-colored uppercase label on top, then a subtle-pill value + a plain secondary number below. Directly reusable for Assay's directory **trust chips** and the detail page's cost/reserve stat tiles (5.6) — swap "FUND FIT / Strong / 100" for e.g. "RESERVE / 4.2 months / covers Q3 tax".
- **Form field** — label (Sora Bold 15px) above a bordered input (`surface.secondary` fill, `border.primary`, `radius.xs`, `space.3`/`space.2` padding, Sora Light 15px value/placeholder in `text.secondary`). Used for Explore's filter inputs.

## Rule for "Not disclosed"

The source has no built-in empty/unknown state for Badge — CheckRow's "unknown" (`?`, `text.tertiary`) is the closest analog and is what Assay's Not-disclosed chip is modeled on: neutral gray, a glyph rather than a blank, never the danger/warning palette. Treat "Not disclosed" as its own first-class tone (`state.unknown`), not a disabled/faded version of another tone — full opacity, same type weight as every other state, so it never reads as "broken."
