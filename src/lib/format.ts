const NOT_DISCLOSED = "Not disclosed";

export function formatUsd(amount: number, opts?: { compact?: boolean }): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts?.compact ? 1 : 0,
    notation: opts?.compact ? "compact" : "standard",
  }).format(amount);
}

export function formatYield(pct: number | null): string {
  if (pct === null) return NOT_DISCLOSED;
  return `${pct.toFixed(1)}%`;
}

export function formatFeeBps(bps: number | null): string {
  if (bps === null) return NOT_DISCLOSED;
  return `${(bps / 100).toFixed(2)}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Whole-day difference, `from` minus reference "now". Positive = in the past. */
export function daysSince(iso: string, now: Date): number {
  const then = new Date(iso).getTime();
  const ms = now.getTime() - then;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function formatRelativeDays(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.round(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function formatRedemptionRange(minDays: number, maxDays: number): string {
  if (minDays === maxDays) return `${minDays} days`;
  return `${minDays}–${maxDays} days`;
}

export const NOT_DISCLOSED_LABEL = NOT_DISCLOSED;
