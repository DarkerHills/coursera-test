import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatUsd, formatYield, formatFeeBps, formatRedemptionRange } from "@/lib/format";
import { VerificationChip } from "@/components/trust/VerificationChip";
import { ReserveChip } from "@/components/trust/ReserveChip";
import { StatePill } from "@/components/ui/StatePill";

const NOT_DISCLOSED = "Not disclosed";

/**
 * §5.2: rows grouped Basics / Trust & verification / Liquidity & redemption /
 * Costs & reserves / Access. A grey (unknown-tone) cell in a row of colored
 * cells has to read at a glance — every "not disclosed" cell here uses the
 * same StatePill(unknown) treatment used everywhere else in the product, on
 * purpose, so it holds its visual weight next to a disclosed neighbor rather
 * than receding.
 */
export function CompareTable({ listings }: { listings: Listing[] }) {
  const cols = listings.length;

  return (
    <div className="scroll-x rounded-sm border border-border-secondary bg-surface-primary">
      <div
        className="grid min-w-[720px]"
        style={{ gridTemplateColumns: `200px repeat(${cols}, minmax(200px, 1fr))` }}
      >
        {/* Header row */}
        <div className="border-b border-border-secondary bg-surface-secondary p-3" />
        {listings.map((l) => (
          <div
            key={l.id}
            className="border-b border-l border-border-secondary bg-surface-secondary p-3"
          >
            <Link href={`/listing/${l.id}`} className="font-body text-[15px] font-bold text-text-primary hover:underline">
              {l.name}
            </Link>
            <p className="font-body text-[13px] text-text-secondary">{l.issuer}</p>
          </div>
        ))}

        <SectionHeader cols={cols} title="Basics" />
        <Row label="Asset class" cells={listings.map((l) => <Plain key={l.id}>{l.assetClass}</Plain>)} />
        <Row label="Chain" cells={listings.map((l) => <Plain key={l.id}>{l.chain}</Plain>)} />
        <Row
          label="Minimum investment"
          cells={listings.map((l) => <Plain key={l.id}>{formatUsd(l.minInvestmentUsd)}</Plain>)}
        />
        <Row
          label="Annual fee"
          cells={listings.map((l) => <Plain key={l.id}>{formatFeeBps(l.feesBps)}</Plain>)}
        />
        <Row
          label="Stated yield"
          cells={listings.map((l) => (
            <span key={l.id} className="font-body text-[15px] font-bold text-text-primary">
              {formatYield(l.yieldPct)}
            </span>
          ))}
        />

        <SectionHeader cols={cols} title="Trust & verification" />
        <Row
          label="Verification state"
          cells={listings.map((l) => (
            <VerificationChip key={l.id} record={l.verification} size="inline" />
          ))}
        />
        <Row
          label="Verified what"
          cells={listings.map((l) => (
            <Plain key={l.id}>{l.verification.kind === "not_disclosed" ? NOT_DISCLOSED : (l.verification as { scope?: string }).scope ?? NOT_DISCLOSED}</Plain>
          ))}
        />
        <Row
          label="Verified by"
          cells={listings.map((l) => (
            <Plain key={l.id}>
              {l.verification.kind === "not_disclosed" || l.verification.kind === "flagged"
                ? (l.verification.kind === "flagged" ? l.verification.verifier ?? NOT_DISCLOSED : NOT_DISCLOSED)
                : l.verification.verifier}
            </Plain>
          ))}
        />

        <SectionHeader cols={cols} title="Liquidity & redemption" />
        <Row
          label="Sell on secondary market"
          cells={listings.map((l) => (
            <Plain key={l.id}>
              {l.secondaryMarket.available
                ? `Minutes · ${l.secondaryMarket.depth === "unknown" ? "depth not disclosed" : `${l.secondaryMarket.depth} depth`}`
                : "Not available"}
            </Plain>
          ))}
        />
        <Row
          label="Redeem for underlying"
          cells={listings.map((l) => (
            <Cell key={l.id}>
              {l.redemption.disclosed ? (
                <StatePill tone="info" size="inline">
                  {formatRedemptionRange(l.redemption.range.minDays, l.redemption.range.maxDays)}
                </StatePill>
              ) : (
                <StatePill tone="unknown" size="inline" icon={<span aria-hidden>?</span>}>
                  {NOT_DISCLOSED}
                </StatePill>
              )}
            </Cell>
          ))}
        />

        <SectionHeader cols={cols} title="Costs & reserves" />
        <Row
          label="Reserve ledger"
          cells={listings.map((l) => (
            <Cell key={l.id}>
              <ReserveChip transparency={l.reserveTransparency} size="inline" />
            </Cell>
          ))}
        />
        <Row
          label="Cash-flow-negative plan"
          cells={listings.map((l) => (
            <Plain key={l.id}>
              {l.costReserve === undefined
                ? "No carrying costs structure"
                : l.costReserve.disclosed
                  ? l.costReserve.negativeMonthPlan
                  : NOT_DISCLOSED}
            </Plain>
          ))}
        />
        <Row
          label="Responsible legal entity"
          cells={listings.map((l) => (
            <Plain key={l.id}>
              {l.costReserve === undefined ? "N/A" : l.costReserve.disclosed ? l.costReserve.legalEntity : NOT_DISCLOSED}
            </Plain>
          ))}
        />

        <SectionHeader cols={cols} title="Access" />
        <Row
          label="Docs"
          cells={listings.map((l) => (
            <a
              key={l.id}
              href={l.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-body text-[13px] font-bold text-text-primary underline decoration-dotted underline-offset-2"
            >
              Issuer docs ↗
            </a>
          ))}
        />
      </div>
    </div>
  );
}

function SectionHeader({ title, cols }: { title: string; cols: number }) {
  return (
    <div
      className="col-span-full border-b border-border-secondary bg-surface-secondary px-3 py-2"
      style={{ gridColumn: `span ${cols + 1} / span ${cols + 1}` }}
    >
      <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
        {title}
      </p>
    </div>
  );
}

function Row({ label, cells }: { label: string; cells: React.ReactNode[] }) {
  return (
    <>
      <div className="border-b border-border-secondary p-3 font-body text-[13px] font-bold text-text-secondary">
        {label}
      </div>
      {cells.map((cell, i) => (
        <div key={i} className="border-b border-l border-border-secondary p-3">
          {cell}
        </div>
      ))}
    </>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Plain({ children }: { children: React.ReactNode }) {
  return <span className="font-body text-[13px] leading-5 text-text-primary">{children}</span>;
}
