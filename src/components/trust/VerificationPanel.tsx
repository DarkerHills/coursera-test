import type { VerificationRecord } from "@/lib/types";
import { getVerificationDisplay } from "@/lib/verification";
import { NOW } from "@/lib/now";
import { Card } from "@/components/ui/Card";
import { VerificationChip } from "./VerificationChip";

/**
 * Full detail panel (§5.4): answers verified *what*, by *whom*, *how* —
 * attestation of existence isn't the same as attestation of unencumbered
 * title, and that gap is the whole P1 risk this panel exists to close.
 */
export function VerificationPanel({ record }: { record: VerificationRecord }) {
  const display = getVerificationDisplay(record, NOW);
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
          Trust panel
        </h2>
        <VerificationChip record={record} size="panel" />
      </div>

      <p className="font-body text-[15px] leading-6 text-text-secondary">{display.detail}</p>

      {display.state === "not_disclosed" ? (
        <div className="rounded-xs border border-dashed border-border-primary bg-surface-secondary p-3">
          <p className="font-body text-[13px] leading-5 text-text-secondary">
            No verifier, method, or scope has been published for this listing. Assay reports
            attestations it is given — it does not produce them (see docs for what the issuer
            has published directly).
          </p>
        </div>
      ) : (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="Verified what" value={display.scope} />
          <Field label="Verified by" value={display.verifier} />
          <Field label="Method" value={display.method} />
        </dl>
      )}
    </Card>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xs bg-surface-secondary p-3">
      <dt className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-body text-[13px] leading-5 text-text-primary">
        {value ?? "Not disclosed"}
      </dd>
    </div>
  );
}
