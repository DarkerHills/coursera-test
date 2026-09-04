import type { VerificationRecord } from "@/lib/types";
import { getVerificationDisplay, type VerificationDisplayState } from "@/lib/verification";
import { NOW } from "@/lib/now";
import { StatePill, type StateTone, type StatePillSize } from "@/components/ui/StatePill";
import { TimeStamp } from "@/components/ui/TimeStamp";

const TONE: Record<VerificationDisplayState, StateTone> = {
  verified: "success",
  pending: "info",
  stale: "warning",
  flagged: "danger",
  not_disclosed: "unknown",
};

const GLYPH: Record<VerificationDisplayState, string> = {
  verified: "✓",
  pending: "◐",
  stale: "⚠",
  flagged: "⚑",
  not_disclosed: "?",
};

/**
 * The core reusable component (product doc §5.4). Three sizes: `chip`
 * (directory), `inline` (compare table), and the label-only mode used inside
 * the full panel (see VerificationPanel). Color never carries the state
 * alone — every size pairs a glyph with a text label.
 */
export function VerificationChip({
  record,
  size = "chip",
  showTimestamp = true,
}: {
  record: VerificationRecord;
  size?: StatePillSize;
  showTimestamp?: boolean;
}) {
  const display = getVerificationDisplay(record, NOW);
  return (
    <StatePill tone={TONE[display.state]} size={size} icon={<span aria-hidden>{GLYPH[display.state]}</span>}>
      <span>
        {display.label}
        {showTimestamp && display.state !== "not_disclosed" && (
          <>
            {" · "}
            <TimeStamp relative={display.compact} absolute={display.absolute} />
          </>
        )}
      </span>
    </StatePill>
  );
}
