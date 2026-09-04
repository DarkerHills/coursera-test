import { holdings, getListing } from "@/lib/data";
import { formatUsd } from "@/lib/format";
import type { Holding, Listing } from "@/lib/types";
import { HoldingsTable } from "@/components/portfolio/HoldingsTable";
import { AlertsPanel, buildAlerts } from "@/components/portfolio/AlertsPanel";
import { DigestEmailPreview } from "@/components/portfolio/DigestEmailPreview";
import { StatTile } from "@/components/ui/StatTile";

export const metadata = { title: "Portfolio — Assay" };

export default function PortfolioPage() {
  const rows = holdings
    .map((holding) => {
      const listing = getListing(holding.listingId);
      return listing ? { holding, listing } : null;
    })
    .filter((r): r is { holding: Holding; listing: Listing } => r !== null);

  const alerts = buildAlerts(holdings, getListing);
  const totalCostBasis = rows.reduce((sum, r) => sum + r.holding.costBasisUsd, 0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] font-extrabold tracking-[-0.28px] text-text-primary sm:text-[32px]">
          Portfolio
        </h1>
        <p className="max-w-2xl font-body text-[15px] leading-6 text-text-secondary">
          The return-visit loop: when the backing behind something you hold goes stale, you hear
          it here — not from a forum post.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatTile label="Holdings" value={String(rows.length)} />
        <StatTile label="Total cost basis" value={formatUsd(totalCostBasis)} />
      </div>

      <AlertsPanel alerts={alerts} />

      <HoldingsTable rows={rows} />

      <DigestEmailPreview alerts={alerts} />
    </div>
  );
}
