import type { Alert } from "./AlertsPanel";

/**
 * §5.8: "Design the notification, the in-app inbox state, and the digest
 * email." This is a static preview of that digest — same neutral, non-FOMO
 * copy rules as the rest of the product (§6): report, don't editorialize.
 */
export function DigestEmailPreview({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
        Weekly digest email — preview
      </p>
      <div className="overflow-hidden rounded-sm border border-border-secondary bg-surface-primary shadow-card">
        <div className="border-b border-border-secondary bg-surface-secondary px-4 py-3">
          <p className="font-body text-[13px] text-text-secondary">
            <span className="font-bold text-text-primary">Assay</span> · digest@assay.example
          </p>
          <p className="mt-0.5 font-body text-[15px] font-bold text-text-primary">
            {alerts.length === 0
              ? "Your holdings are current — nothing to review this week"
              : `${alerts.length} of your holdings need a look this week`}
          </p>
        </div>
        <div className="flex flex-col gap-4 px-4 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-xxs bg-surface-brand font-display text-[11px] font-extrabold text-text-on-brand">
              A
            </span>
            <span className="font-display text-[15px] font-extrabold tracking-[-0.15px] text-text-primary">
              assay
            </span>
          </div>

          {alerts.length === 0 ? (
            <p className="font-body text-[15px] leading-6 text-text-secondary">
              Every listing in your portfolio is within its issuer&apos;s stated verification
              cycle. We&apos;ll email you the moment that changes.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {alerts.map((a, i) => (
                <li key={i} className="rounded-xs border border-border-secondary p-3">
                  <p className="font-body text-[15px] leading-6 text-text-primary">{a.message}</p>
                </li>
              ))}
            </ul>
          )}

          <p className="font-body text-[13px] text-text-tertiary">
            You&apos;re receiving this because you hold at least one tokenized RWA tracked by
            Assay. Manage alert preferences in your portfolio settings.
          </p>
        </div>
      </div>
    </div>
  );
}
