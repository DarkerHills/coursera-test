import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatUsd, formatYield } from "@/lib/format";
import { VerificationChip } from "@/components/trust/VerificationChip";
import { RedemptionChip } from "@/components/trust/RedemptionChip";
import { ReserveChip } from "@/components/trust/ReserveChip";
import { Card } from "@/components/ui/Card";

/** Mobile card — same trust chips as the table, reworked for a narrow viewport (§5.1). */
export function ListingCard({
  listing,
  selected,
  onToggle,
}: {
  listing: Listing;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/listing/${listing.id}`} className="min-w-0 flex-1">
          <p className="truncate font-body text-[15px] font-bold text-text-primary">{listing.name}</p>
          <p className="truncate font-body text-[13px] text-text-secondary">
            {listing.issuer} · {listing.assetClass} · {listing.chain}
          </p>
        </Link>
        <label className="flex shrink-0 items-center gap-1.5 font-body text-[13px] text-text-secondary">
          <input
            type="checkbox"
            aria-label={`Select ${listing.name} to compare`}
            checked={selected}
            onChange={() => onToggle(listing.id)}
            className="h-4 w-4 accent-[var(--color-surface-brand)]"
          />
          Compare
        </label>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="font-body text-[20px] font-bold text-text-primary">{formatYield(listing.yieldPct)}</span>
        <span className="font-body text-[13px] text-text-secondary">
          min. {formatUsd(listing.minInvestmentUsd)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <VerificationChip record={listing.verification} size="chip" />
        <RedemptionChip redemption={listing.redemption} size="chip" />
        <ReserveChip transparency={listing.reserveTransparency} size="chip" />
      </div>
    </Card>
  );
}
