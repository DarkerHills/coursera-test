import Link from "next/link";
import type { Holding, Listing } from "@/lib/types";
import { formatDate, formatUsd } from "@/lib/format";
import { VerificationChip } from "@/components/trust/VerificationChip";

/** §5.8: "each row carries its live verification chip." */
export function HoldingsTable({
  rows,
}: {
  rows: { holding: Holding; listing: Listing }[];
}) {
  return (
    <div className="scroll-x rounded-sm border border-border-secondary bg-surface-primary">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-border-secondary text-left">
            <Th>Holding</Th>
            <Th>Acquired</Th>
            <Th>Cost basis</Th>
            <Th>Verification</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ holding, listing }) => (
            <tr key={holding.listingId} className="border-b border-border-secondary last:border-b-0 hover:bg-surface-secondary">
              <td className="px-4 py-3">
                <Link href={`/listing/${listing.id}`} className="font-body text-[15px] font-bold text-text-primary hover:underline">
                  {listing.name}
                </Link>
                <p className="font-body text-[13px] text-text-secondary">
                  {listing.issuer} · {listing.assetClass}
                </p>
              </td>
              <td className="px-4 py-3 font-body text-[13px] text-text-secondary">
                {formatDate(holding.acquiredAt)}
              </td>
              <td className="px-4 py-3 font-body text-[15px] text-text-primary">
                {formatUsd(holding.costBasisUsd)}
              </td>
              <td className="px-4 py-3">
                <VerificationChip record={listing.verification} size="inline" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
      {children}
    </th>
  );
}
