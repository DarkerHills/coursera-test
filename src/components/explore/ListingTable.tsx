import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatYield } from "@/lib/format";
import { VerificationChip } from "@/components/trust/VerificationChip";
import { RedemptionChip } from "@/components/trust/RedemptionChip";
import { ReserveChip } from "@/components/trust/ReserveChip";

/** Dense comparison-first table — the default on desktop (§5.1). */
export function ListingTable({
  listings,
  selected,
  onToggle,
}: {
  listings: Listing[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="scroll-x hidden rounded-sm border border-border-secondary bg-surface-primary md:block">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-border-secondary text-left">
            <Th className="w-10" />
            <Th>Product</Th>
            <Th>Asset class</Th>
            <Th>Chain</Th>
            <Th>Yield</Th>
            <Th>Verification</Th>
            <Th>Redemption</Th>
            <Th>Reserves</Th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l.id} className="border-b border-border-secondary last:border-b-0 hover:bg-surface-secondary">
              <Td>
                <input
                  type="checkbox"
                  aria-label={`Select ${l.name} to compare`}
                  checked={selected.has(l.id)}
                  onChange={() => onToggle(l.id)}
                  className="h-4 w-4 accent-[var(--color-surface-brand)]"
                />
              </Td>
              <Td>
                <Link href={`/listing/${l.id}`} className="block">
                  <span className="font-body text-[15px] font-bold text-text-primary hover:underline">
                    {l.name}
                  </span>
                  <span className="block font-body text-[13px] text-text-secondary">{l.issuer}</span>
                </Link>
              </Td>
              <Td className="font-body text-[13px] text-text-secondary">{l.assetClass}</Td>
              <Td className="font-body text-[13px] text-text-secondary">{l.chain}</Td>
              <Td className="font-body text-[15px] font-bold text-text-primary">{formatYield(l.yieldPct)}</Td>
              <Td>
                <VerificationChip record={l.verification} size="inline" />
              </Td>
              <Td>
                <RedemptionChip redemption={l.redemption} size="inline" />
              </Td>
              <Td>
                <ReserveChip transparency={l.reserveTransparency} size="inline" />
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-border-secondary px-4 py-2 font-body text-[13px] text-text-secondary">
        Minimum investment shown on each listing&apos;s page · {listings.length} listing
        {listings.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
