import type { ReactNode } from "react";
import { StatePill, type StateTone } from "./StatePill";

/**
 * Figma "StatChip" anatomy: tertiary uppercase label, a subtle-pill value,
 * plain caption below. Used for the Cost & Reserve module's stat tiles (§5.6).
 */
export function StatTile({
  label,
  value,
  tone,
  caption,
}: {
  label: string;
  value: ReactNode;
  tone?: StateTone;
  caption?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1.5 rounded-sm border border-border-secondary bg-surface-primary p-3.5">
      <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        {tone ? (
          <StatePill tone={tone} size="chip">
            {value}
          </StatePill>
        ) : (
          <span className="font-body text-[15px] font-bold text-text-primary">{value}</span>
        )}
        {caption && <span className="font-chip text-[11px] text-text-tertiary">{caption}</span>}
      </div>
    </div>
  );
}
