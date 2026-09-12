import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getListing, listings } from "@/lib/data";
import { formatFeeBps, formatUsd, formatYield } from "@/lib/format";
import { VerificationChip } from "@/components/trust/VerificationChip";
import { VerificationPanel } from "@/components/trust/VerificationPanel";
import { RedemptionChip } from "@/components/trust/RedemptionChip";
import { ReserveChip } from "@/components/trust/ReserveChip";
import { LiquidityRedemptionModule } from "@/components/detail/LiquidityRedemptionModule";
import { CostReserveModule } from "@/components/detail/CostReserveModule";
import { BeforeYouBuyChecklist } from "@/components/detail/BeforeYouBuyChecklist";
import { Card } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  return { title: listing ? `${listing.name} — Assay` : "Listing not found — Assay" };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <p className="font-body text-[13px] font-bold text-text-secondary uppercase tracking-wide">
          {listing.assetClass} · {listing.chain}
        </p>
        <h1 className="font-display text-[28px] font-extrabold tracking-[-0.28px] text-text-primary sm:text-[32px]">
          {listing.name}
        </h1>
        <p className="font-body text-[15px] text-text-secondary">Issued by {listing.issuer}</p>
        <div className="flex flex-wrap gap-2">
          <VerificationChip record={listing.verification} size="chip" />
          <RedemptionChip redemption={listing.redemption} size="chip" />
          <ReserveChip transparency={listing.reserveTransparency} size="chip" />
        </div>
      </div>

      {/* 1. Trust panel */}
      <VerificationPanel record={listing.verification} />

      {/* 2. Liquidity vs redemption module */}
      <LiquidityRedemptionModule
        redemption={listing.redemption}
        secondaryMarket={listing.secondaryMarket}
      />

      {/* 3. Cost & reserve module — only for assets with carrying costs */}
      {listing.costReserve !== undefined && <CostReserveModule costReserve={listing.costReserve} />}

      {/* 4. Yield, terms, fees — deliberately fourth (product doc §5.3) */}
      <Card className="flex flex-col gap-4">
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
          Yield, terms & fees
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile label="Stated yield" value={formatYield(listing.yieldPct)} />
          <StatTile label="Annual management fee" value={formatFeeBps(listing.feesBps)} />
          <StatTile label="Minimum investment" value={formatUsd(listing.minInvestmentUsd)} />
        </div>
        <p className="font-body text-[13px] leading-5 text-text-tertiary">
          Stated yield is not guaranteed and is shown as published by the issuer, not audited by
          Assay.
        </p>
      </Card>

      {/* 5. Underlying asset description, docs, issuer profile */}
      <Card className="flex flex-col gap-3">
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
          About this asset
        </h2>
        <p className="font-body text-[15px] leading-6 text-text-secondary">{listing.description}</p>
        <a
          href={listing.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="font-body text-[15px] font-bold text-text-primary underline decoration-dotted underline-offset-2"
        >
          Issuer documentation ↗
        </a>
      </Card>

      {/* §5.7 fallback: Assay is informational-only, so this is the "Before you buy" checklist */}
      <BeforeYouBuyChecklist listing={listing} />

      <div className="flex flex-wrap items-center gap-3 border-t border-border-secondary pt-6">
        <ButtonLink href={listing.docsUrl} variant="primary" external>
          Continue to {listing.issuer} ↗
        </ButtonLink>
        <ButtonLink href="/portfolio" variant="secondary">
          Add to portfolio
        </ButtonLink>
      </div>
    </div>
  );
}
