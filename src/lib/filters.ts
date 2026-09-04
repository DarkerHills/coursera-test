import type { AssetClass, Chain, Listing } from "./types";
import { daysSince } from "./format";
import { verificationSortWeight } from "./verification";

export const ASSET_CLASSES: AssetClass[] = [
  "Real estate",
  "U.S. Treasuries",
  "Private credit",
  "Commodities",
  "Trade finance",
];

export const CHAINS: Chain[] = ["Ethereum", "Base", "Polygon", "Solana", "Avalanche"];

export type SortKey = "trust" | "yield_desc" | "yield_asc" | "min_investment_asc" | "name_asc";

export interface FilterState {
  assetClass: AssetClass[];
  chain: Chain[];
  minYield?: number;
  maxRedemptionDays?: number;
  verifiedWithinDays?: number;
  reserveLedgerOnly: boolean;
  sort: SortKey;
}

type RawSearchParams = { [key: string]: string | string[] | undefined };

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function toNumber(v: string | string[] | undefined): number | undefined {
  const s = Array.isArray(v) ? v[0] : v;
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export function parseFilters(searchParams: RawSearchParams): FilterState {
  const sortRaw = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;
  const sort: SortKey =
    sortRaw === "yield_desc" ||
    sortRaw === "yield_asc" ||
    sortRaw === "min_investment_asc" ||
    sortRaw === "name_asc"
      ? sortRaw
      : "trust";

  return {
    assetClass: toArray(searchParams.assetClass).filter((v): v is AssetClass =>
      (ASSET_CLASSES as string[]).includes(v),
    ),
    chain: toArray(searchParams.chain).filter((v): v is Chain => (CHAINS as string[]).includes(v)),
    minYield: toNumber(searchParams.minYield),
    maxRedemptionDays: toNumber(searchParams.maxRedemptionDays),
    verifiedWithinDays: toNumber(searchParams.verifiedWithinDays),
    reserveLedgerOnly: toArray(searchParams.reserveLedger).length > 0,
    sort,
  };
}

export interface FilterResult {
  matched: Listing[];
  excludedForNonDisclosure: {
    redemption: number;
    reserve: number;
    verification: number;
  };
}

/**
 * Applies filters and separately counts how many listings were excluded
 * specifically *because a trust field wasn't disclosed* — the empty state
 * (§5.1) has to name that number, not just say "no results."
 */
export function applyFilters(listings: Listing[], filters: FilterState, now: Date): FilterResult {
  let excludedRedemption = 0;
  let excludedReserve = 0;
  let excludedVerification = 0;

  const matched = listings.filter((l) => {
    if (filters.assetClass.length > 0 && !filters.assetClass.includes(l.assetClass)) return false;
    if (filters.chain.length > 0 && !filters.chain.includes(l.chain)) return false;
    if (filters.minYield !== undefined && (l.yieldPct === null || l.yieldPct < filters.minYield))
      return false;

    if (filters.maxRedemptionDays !== undefined) {
      if (!l.redemption.disclosed) {
        excludedRedemption++;
        return false;
      }
      if (l.redemption.range.maxDays > filters.maxRedemptionDays) return false;
    }

    if (filters.verifiedWithinDays !== undefined) {
      if (l.verification.kind !== "attested") {
        excludedVerification++;
        return false;
      }
      if (daysSince(l.verification.lastVerifiedAt, now) > filters.verifiedWithinDays) return false;
    }

    if (filters.reserveLedgerOnly) {
      if (l.reserveTransparency !== "available") {
        excludedReserve++;
        return false;
      }
    }

    return true;
  });

  return {
    matched,
    excludedForNonDisclosure: {
      redemption: excludedRedemption,
      reserve: excludedReserve,
      verification: excludedVerification,
    },
  };
}

export function sortListings(listings: Listing[], sort: SortKey, now: Date): Listing[] {
  const copy = [...listings];
  switch (sort) {
    case "yield_desc":
      return copy.sort((a, b) => (b.yieldPct ?? -1) - (a.yieldPct ?? -1));
    case "yield_asc":
      return copy.sort((a, b) => (a.yieldPct ?? Infinity) - (b.yieldPct ?? Infinity));
    case "min_investment_asc":
      return copy.sort((a, b) => a.minInvestmentUsd - b.minInvestmentUsd);
    case "name_asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "trust":
    default:
      // Default sort (§5.1): verification recency, not yield, not a composite
      // disclosure score — see design-system-notes.md / §10 Q4 for why a
      // composite score was rejected as an editorial liability.
      return copy.sort((a, b) => {
        const wa = verificationSortWeight(a.verification, now);
        const wb = verificationSortWeight(b.verification, now);
        if (wa !== wb) return wa - wb;
        if (a.verification.kind === "attested" && b.verification.kind === "attested") {
          return daysSince(a.verification.lastVerifiedAt, now) - daysSince(b.verification.lastVerifiedAt, now);
        }
        return a.name.localeCompare(b.name);
      });
  }
}
