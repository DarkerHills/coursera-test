import type { Listing } from "@/lib/types";
import { getVerificationDisplay } from "@/lib/verification";
import { NOW } from "@/lib/now";
import { Card } from "@/components/ui/Card";
import { CheckRow, type CheckRowState } from "@/components/ui/CheckRow";

interface ChecklistItem {
  state: CheckRowState;
  label: string;
  detail?: string;
}

/**
 * §5.7 fallback placement (Assay is informational-only for v1 — product doc
 * §10 Q1). Content is generated from what's actually missing or unusual about
 * *this* listing, so it never reads the same twice: a fully-disclosed listing
 * gets a short confirmation, a sparse one gets a longer, more specific list.
 */
export function BeforeYouBuyChecklist({ listing }: { listing: Listing }) {
  const items = buildChecklist(listing);
  const unknownCount = items.filter((i) => i.state !== "ok").length;

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
        Before you buy
      </h2>
      <p className="font-body text-[15px] leading-6 text-text-secondary">
        {unknownCount === 0
          ? "This issuer has disclosed every field Assay tracks for this listing."
          : unknownCount === 1
            ? "This issuer has disclosed most of what Assay tracks, with one gap below."
            : `This issuer has left ${unknownCount} of ${items.length} tracked fields undisclosed, listed below.`}
      </p>
      <div className="flex flex-col divide-y divide-border-secondary">
        {items.map((item, i) => (
          <CheckRow key={i} state={item.state} detail={item.detail}>
            {item.label}
          </CheckRow>
        ))}
      </div>
    </Card>
  );
}

function buildChecklist(listing: Listing): ChecklistItem[] {
  const verification = getVerificationDisplay(listing.verification, NOW);
  const items: ChecklistItem[] = [];

  if (verification.state === "verified") {
    items.push({ state: "ok", label: "Verification is current", detail: verification.absolute });
  } else if (verification.state === "not_disclosed") {
    items.push({ state: "unknown", label: "No verification schedule published" });
  } else if (verification.state === "pending") {
    items.push({ state: "warn", label: "Re-verification is in progress", detail: verification.relative });
  } else if (verification.state === "stale") {
    items.push({ state: "warn", label: "Verification is stale", detail: verification.relative });
  } else {
    items.push({ state: "warn", label: "A discrepancy has been flagged", detail: verification.detail });
  }

  items.push(
    listing.redemption.disclosed
      ? { state: "ok", label: "Redemption timeline is published" }
      : { state: "unknown", label: "No redemption timeline published" },
  );

  items.push(
    listing.reserveTransparency === "available"
      ? { state: "ok", label: "A reserve ledger is available" }
      : { state: "unknown", label: "No reserve ledger published" },
  );

  if (listing.costReserve !== undefined) {
    items.push(
      listing.costReserve.disclosed
        ? { state: "ok", label: "Carrying costs and reserve funding are disclosed" }
        : { state: "unknown", label: "Carrying costs and reserve funding are not disclosed" },
    );
  }

  items.push(
    listing.feesBps !== null
      ? { state: "ok", label: "Annual management fee is disclosed" }
      : { state: "unknown", label: "Annual management fee is not disclosed" },
  );

  if (listing.secondaryMarket.available) {
    items.push(
      listing.secondaryMarket.depth === "unknown"
        ? { state: "unknown", label: "Secondary market depth is not disclosed" }
        : listing.secondaryMarket.depth === "thin"
          ? { state: "warn", label: "Secondary market depth is thin" }
          : { state: "ok", label: "Secondary market has usable depth" },
    );
  } else {
    items.push({ state: "warn", label: "No secondary market exists for this token" });
  }

  return items;
}
