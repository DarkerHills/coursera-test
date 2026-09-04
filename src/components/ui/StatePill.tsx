import type { ReactNode } from "react";

export type StateTone = "success" | "warning" | "danger" | "info" | "unknown";

const TONE_CLASSES: Record<StateTone, string> = {
  success: "bg-state-success-subtle text-state-success-primary",
  warning: "bg-state-warning-subtle text-state-warning-primary",
  danger: "bg-state-danger-subtle text-state-danger-primary",
  info: "bg-state-info-subtle text-state-info-primary",
  unknown: "bg-state-unknown-subtle text-state-unknown-primary",
};

const SIZE_CLASSES = {
  chip: "px-2.5 py-1 text-[11px] gap-1",
  inline: "px-2 py-0.5 text-[11px] gap-1",
  panel: "px-3 py-1.5 text-[13px] gap-1.5",
} as const;

export type StatePillSize = keyof typeof SIZE_CLASSES;

/**
 * Subtle pill — pairs a glyph/icon with a label, color as reinforcement only
 * (design-system-notes.md). This is the base for every trust chip in Assay:
 * verification state, redemption window, reserve transparency.
 */
export function StatePill({
  tone,
  icon,
  children,
  size = "chip",
}: {
  tone: StateTone;
  icon?: ReactNode;
  children: ReactNode;
  size?: StatePillSize;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-pill font-chip font-semibold whitespace-nowrap ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]}`}
    >
      {icon}
      {children}
    </span>
  );
}
