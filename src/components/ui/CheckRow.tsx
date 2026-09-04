export type CheckRowState = "ok" | "warn" | "unknown";

const GLYPH: Record<CheckRowState, string> = { ok: "✓", warn: "⚠", unknown: "?" };
const COLOR: Record<CheckRowState, string> = {
  ok: "text-state-success-primary",
  warn: "text-state-warning-primary",
  unknown: "text-state-unknown-primary",
};

/**
 * Figma "CheckRow" anatomy: glyph + label, only the glyph carries color.
 * Backs the pre-commit "Before you buy" checklist (§5.7) and Compare's
 * per-row unknown treatment (§5.2).
 */
export function CheckRow({
  state,
  children,
  detail,
}: {
  state: CheckRowState;
  children: React.ReactNode;
  detail?: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <span
        className={`flex h-5 w-4 shrink-0 items-center justify-center font-chip text-sm font-semibold ${COLOR[state]}`}
        aria-hidden
      >
        {GLYPH[state]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-body text-[15px] leading-6 text-text-primary">{children}</p>
        {detail && <p className="font-body text-[13px] leading-5 text-text-secondary">{detail}</p>}
      </div>
    </div>
  );
}
