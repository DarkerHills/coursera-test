// Domain types for Assay — an RWA discovery + trust layer.
// See the product doc (session context) §5 for the surfaces these back.

export type AssetClass =
  | "Real estate"
  | "U.S. Treasuries"
  | "Private credit"
  | "Commodities"
  | "Trade finance";

export type Chain = "Ethereum" | "Base" | "Polygon" | "Solana" | "Avalanche";

/**
 * Verification is modeled as a record of what the issuer actually published,
 * not a pre-baked state — "stale" is derived at render time relative to the
 * issuer's own stated cycle (product doc §5.4), never a fixed number of days.
 */
export type VerificationRecord =
  | {
      kind: "attested";
      lastVerifiedAt: string; // ISO date
      cycleDays: number; // issuer's own stated re-verification cadence
      verifier: string;
      method: string;
      scope: string; // what was actually verified — existence vs. unencumbered title, etc.
    }
  | {
      kind: "pending";
      pendingSince: string; // ISO date
      verifier: string;
      method: string;
      scope: string;
    }
  | {
      kind: "flagged";
      flaggedAt: string; // ISO date
      reason: string;
      verifier?: string;
      method?: string;
    }
  | { kind: "not_disclosed" };

export type DisclosedRange = { minDays: number; maxDays: number };

export type RedemptionInfo =
  | {
      disclosed: true;
      range: DisclosedRange;
      steps: { label: string; trigger: string }[];
    }
  | { disclosed: false };

export type SecondaryMarketInfo =
  | { available: true; depth: "deep" | "moderate" | "thin"; venue: string }
  | { available: true; depth: "unknown"; venue: string }
  | { available: false };

export type FundingSource =
  | "reserve_draw"
  | "rental_income"
  | "holder_capital_call"
  | "issuer_balance_sheet";

export type CostReserveInfo =
  | {
      disclosed: true;
      reserveBalanceUsd: number;
      monthlyKnownExpensesUsd: number;
      upcomingExpenses: { label: string; date: string; amountUsd: number }[];
      fundingSource: FundingSource;
      negativeMonthPlan: string;
      legalEntity: string;
    }
  | { disclosed: false };

export type ReserveTransparency = "available" | "not_disclosed";

export interface Listing {
  id: string;
  name: string;
  issuer: string;
  assetClass: AssetClass;
  chain: Chain;
  yieldPct: number | null; // stated yield; null = not disclosed
  minInvestmentUsd: number;
  description: string;
  docsUrl: string;
  verification: VerificationRecord;
  redemption: RedemptionInfo;
  secondaryMarket: SecondaryMarketInfo;
  reserveTransparency: ReserveTransparency;
  costReserve?: CostReserveInfo; // only present for assets with carrying costs (e.g. real estate)
  feesBps: number | null; // annual management fee, basis points; null = not disclosed
}

export interface Holding {
  listingId: string;
  units: number;
  costBasisUsd: number;
  acquiredAt: string; // ISO date
}
