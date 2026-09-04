import { getListing } from "./data";
import type { Listing } from "./types";

export const MIN_COMPARE = 2;
export const MAX_COMPARE = 4;

export function resolveCompareIds(searchParams: {
  [key: string]: string | string[] | undefined;
}): string[] {
  const raw = searchParams.id;
  const ids = raw ? (Array.isArray(raw) ? raw : [raw]) : [];
  // De-dupe, preserve order, cap at MAX_COMPARE.
  return Array.from(new Set(ids)).slice(0, MAX_COMPARE);
}

export function resolveCompareListings(ids: string[]): Listing[] {
  return ids.map(getListing).filter((l): l is Listing => Boolean(l));
}
