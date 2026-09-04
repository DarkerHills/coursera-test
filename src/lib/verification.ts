import type { VerificationRecord } from "./types";
import { daysSince, formatDate, formatRelativeDays } from "./format";

export type VerificationDisplayState =
  | "verified"
  | "pending"
  | "stale"
  | "flagged"
  | "not_disclosed";

export interface VerificationDisplay {
  state: VerificationDisplayState;
  /** Short label for chip-density UI. */
  label: string;
  /**
   * Chip-safe relative time — no cycle math, no flag reason, so a table row
   * of chips never blows out its column width. Full context lives in
   * `relative`/`detail` and surfaces in the tooltip (`absolute`) and panel.
   */
  compact: string;
  /** Fuller relative-time sentence, for one-line contexts like the checklist. */
  relative: string;
  /** Absolute date/detail shown on hover/tap — always available alongside `compact`. */
  absolute: string;
  /** One line explaining the state — used in compare rows and empty-state copy. */
  detail: string;
  verifier?: string;
  method?: string;
  scope?: string;
}

/**
 * Derives display state from the raw record + a reference "now".
 * Stale is relative to the issuer's *own* stated cycle (product doc §5.4) —
 * never an absolute day count.
 */
export function getVerificationDisplay(
  record: VerificationRecord,
  now: Date,
): VerificationDisplay {
  switch (record.kind) {
    case "not_disclosed":
      return {
        state: "not_disclosed",
        label: "Not disclosed",
        compact: "No verification schedule published",
        relative: "No verification schedule published",
        absolute: "No verification schedule published",
        detail: "This issuer has not published a verification cadence for this listing.",
      };
    case "pending": {
      const since = formatDate(record.pendingSince);
      return {
        state: "pending",
        label: "Pending",
        compact: `In review since ${since}`,
        relative: `In review since ${since}`,
        absolute: `In review since ${since}`,
        detail: "Re-verification is in progress.",
        verifier: record.verifier,
        method: record.method,
        scope: record.scope,
      };
    }
    case "flagged": {
      const since = formatDate(record.flaggedAt);
      return {
        state: "flagged",
        label: "Flagged",
        compact: `flagged ${since}`,
        relative: `${record.reason} — flagged ${since}`,
        absolute: `${record.reason} — flagged ${since}`,
        detail: record.reason,
        verifier: record.verifier,
        method: record.method,
      };
    }
    case "attested": {
      const days = daysSince(record.lastVerifiedAt, now);
      const isStale = days > record.cycleDays;
      const lastVerified = formatDate(record.lastVerifiedAt);
      if (isStale) {
        return {
          state: "stale",
          label: "Stale",
          compact: formatRelativeDays(days),
          relative: `Last verified ${formatRelativeDays(days)} — cycle is ${record.cycleDays} days`,
          absolute: `Last verified ${lastVerified} — cycle is ${record.cycleDays} days`,
          detail: `Past its own ${record.cycleDays}-day cycle with no new attestation.`,
          verifier: record.verifier,
          method: record.method,
          scope: record.scope,
        };
      }
      return {
        state: "verified",
        label: "Verified",
        compact: formatRelativeDays(days),
        relative: `Verified ${formatRelativeDays(days)}`,
        absolute: `Last verified ${lastVerified} — cycle is ${record.cycleDays} days`,
        detail: `Confirmed within the issuer's stated ${record.cycleDays}-day cycle.`,
        verifier: record.verifier,
        method: record.method,
        scope: record.scope,
      };
    }
  }
}

/** Sort weight for the directory's default "disclosure recency" sort — lower is better. */
export function verificationSortWeight(record: VerificationRecord, now: Date): number {
  const display = getVerificationDisplay(record, now);
  switch (display.state) {
    case "verified":
      return 0;
    case "pending":
      return 1;
    case "stale":
      return 2;
    case "flagged":
      return 3;
    case "not_disclosed":
      return 4;
  }
}
