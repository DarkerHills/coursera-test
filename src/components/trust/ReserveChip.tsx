import type { ReserveTransparency } from "@/lib/types";
import { StatePill, type StatePillSize } from "@/components/ui/StatePill";

/** Directory/compare chip (§5.1): "Ledger available" or "Not disclosed". */
export function ReserveChip({
  transparency,
  size = "chip",
}: {
  transparency: ReserveTransparency;
  size?: StatePillSize;
}) {
  if (transparency === "not_disclosed") {
    return (
      <StatePill tone="unknown" size={size} icon={<span aria-hidden>?</span>}>
        Not disclosed
      </StatePill>
    );
  }
  return (
    <StatePill tone="success" size={size} icon={<span aria-hidden>✓</span>}>
      Ledger available
    </StatePill>
  );
}
