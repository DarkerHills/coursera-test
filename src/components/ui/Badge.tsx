import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "brand" | "success" | "info" | "warning" | "danger";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-badge-neutral-bg text-badge-neutral-text",
  brand: "bg-badge-brand-bg text-badge-brand-text",
  success: "bg-badge-success-bg text-badge-success-text",
  info: "bg-badge-info-bg text-badge-info-text",
  warning: "bg-badge-warning-bg text-badge-warning-text",
  danger: "bg-badge-danger-bg text-badge-danger-text",
};

/**
 * Saturated pill — Figma "Badge" component. Reserved for a single, standalone
 * status callout (see design-system-notes.md); list/table density uses the
 * subtler StatePill instead.
 */
export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-pill px-2.5 py-1 font-chip text-[11px] font-semibold tracking-[0.44px] uppercase whitespace-nowrap ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
