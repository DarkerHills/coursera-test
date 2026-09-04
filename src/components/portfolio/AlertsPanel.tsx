import Link from "next/link";
import type { Holding, Listing } from "@/lib/types";
import { getVerificationDisplay } from "@/lib/verification";
import { NOW } from "@/lib/now";
import { daysSince } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { StatePill } from "@/components/ui/StatePill";

export interface Alert {
  listing: Listing;
  severity: "warning" | "danger";
  message: string;
}

export function buildAlerts(holdings: Holding[], resolve: (id: string) => Listing | undefined): Alert[] {
  const alerts: Alert[] = [];
  for (const h of holdings) {
    const listing = resolve(h.listingId);
    if (!listing) continue;
    const display = getVerificationDisplay(listing.verification, NOW);
    if (display.state === "stale" && listing.verification.kind === "attested") {
      const days = daysSince(listing.verification.lastVerifiedAt, NOW);
      alerts.push({
        listing,
        severity: "warning",
        // Matches the exact retention-mechanic copy from the product doc §5.8.
        message: `The backing on ${listing.name} hasn't been re-verified in ${days} days.`,
      });
    }
    if (display.state === "flagged") {
      alerts.push({
        listing,
        severity: "danger",
        message: `A discrepancy was flagged on ${listing.name}: ${display.detail}`,
      });
    }
  }
  return alerts;
}

/** In-app alert inbox — the retention mechanic (§5.8): the one surface where the product reaches out. */
export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
          Alerts
        </h2>
        {alerts.length > 0 && (
          <span className="rounded-pill bg-badge-danger-bg px-2 py-0.5 font-chip text-[11px] font-semibold text-badge-danger-text">
            {alerts.length} open
          </span>
        )}
      </div>

      {alerts.length === 0 ? (
        <p className="font-body text-[15px] leading-6 text-text-secondary">
          No staleness or discrepancy alerts right now — every holding is within its issuer&apos;s
          stated verification cycle.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border-secondary">
          {alerts.map((a, i) => (
            <li key={i} className="flex items-start justify-between gap-3 py-3">
              <div className="flex items-start gap-3">
                <StatePill tone={a.severity === "danger" ? "danger" : "warning"} size="chip">
                  {a.severity === "danger" ? "Flagged" : "Stale"}
                </StatePill>
                <p className="font-body text-[15px] leading-6 text-text-primary">{a.message}</p>
              </div>
              <Link
                href={`/listing/${a.listing.id}`}
                className="shrink-0 font-body text-[13px] font-bold text-text-secondary underline decoration-dotted underline-offset-2 hover:text-text-primary"
              >
                Review
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
