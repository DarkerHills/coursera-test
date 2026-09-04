import type { RedemptionInfo } from "@/lib/types";
import { formatRedemptionRange } from "@/lib/format";
import { StatePill, type StatePillSize } from "@/components/ui/StatePill";

/** Directory/compare chip (§5.1): "60–180 days" or "Not disclosed" — never a point estimate (§6). */
export function RedemptionChip({ redemption, size = "chip" }: { redemption: RedemptionInfo; size?: StatePillSize }) {
  if (!redemption.disclosed) {
    return (
      <StatePill tone="unknown" size={size} icon={<span aria-hidden>?</span>}>
        Not disclosed
      </StatePill>
    );
  }
  return (
    <StatePill tone="info" size={size}>
      {formatRedemptionRange(redemption.range.minDays, redemption.range.maxDays)}
    </StatePill>
  );
}
