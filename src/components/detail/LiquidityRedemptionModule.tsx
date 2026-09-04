import type { RedemptionInfo, SecondaryMarketInfo } from "@/lib/types";
import { formatRedemptionRange } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { StatePill } from "@/components/ui/StatePill";

// Bar scale: 270 days (this dataset's longest disclosed redemption) reads as
// a full-width bar. Selling reads as a hairline next to it on purpose — the
// layout is meant to hurt a little rather than compress the asymmetry away.
const SCALE_MAX_DAYS = 270;

/**
 * §5.5. The literal design goal: a reader who sees only this module can
 * correctly explain the difference between selling and redeeming afterward.
 * "Sell" and "redeem" never share a label, button, color, or sentence (§4.1).
 */
export function LiquidityRedemptionModule({
  redemption,
  secondaryMarket,
}: {
  redemption: RedemptionInfo;
  secondaryMarket: SecondaryMarketInfo;
}) {
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
        Selling vs. redeeming
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-xs border border-border-secondary bg-surface-secondary p-4">
          <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
            Sell on secondary market
          </p>
          <p className="font-body text-[20px] font-bold text-text-primary">Minutes</p>
          <Bar widthPct={2} tone="info" />
          {secondaryMarket.available ? (
            <p className="font-body text-[13px] leading-5 text-text-secondary">
              Depends on a buyer being there.{" "}
              {secondaryMarket.depth === "unknown"
                ? "Depth is not disclosed — treat quoted prices as indicative only."
                : secondaryMarket.depth === "thin"
                  ? "Depth is thin: a large sell may move the price or find no buyer at all."
                  : secondaryMarket.depth === "moderate"
                    ? "Moderate depth on " + secondaryMarket.venue + "."
                    : "Deep, active market on " + secondaryMarket.venue + "."}
            </p>
          ) : (
            <p className="font-body text-[13px] leading-5 text-text-secondary">
              No secondary market for this token — selling is not currently possible.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-xs border border-border-secondary bg-surface-secondary p-4">
          <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
            Redeem for the underlying
          </p>
          {redemption.disclosed ? (
            <>
              <p className="font-body text-[20px] font-bold text-text-primary">
                {formatRedemptionRange(redemption.range.minDays, redemption.range.maxDays)}
              </p>
              <Bar
                widthPct={Math.min(100, (redemption.range.maxDays / SCALE_MAX_DAYS) * 100)}
                tone="warning"
              />
            </>
          ) : (
            <>
              <StatePill tone="unknown" size="chip" icon={<span aria-hidden>?</span>}>
                Not disclosed
              </StatePill>
              <p className="font-body text-[13px] leading-5 text-text-secondary">
                No redemption timeline published. Treat this token as illiquid beyond the
                secondary market until the issuer states one.
              </p>
            </>
          )}
        </div>
      </div>

      {redemption.disclosed && (
        <div className="flex flex-col gap-2">
          <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
            What triggers each step
          </p>
          <ol className="flex flex-col gap-2">
            {redemption.steps.map((step, i) => (
              <li key={i} className="flex gap-3 rounded-xs border border-border-secondary p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-surface-brand font-chip text-[11px] font-semibold text-text-on-brand">
                  {i + 1}
                </span>
                <div>
                  <p className="font-body text-[15px] font-bold text-text-primary">{step.label}</p>
                  <p className="font-body text-[13px] text-text-secondary">{step.trigger}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Card>
  );
}

function Bar({ widthPct, tone }: { widthPct: number; tone: "info" | "warning" }) {
  const fill = tone === "info" ? "bg-state-info-primary" : "bg-state-warning-primary";
  return (
    <div className="h-2 w-full overflow-hidden rounded-pill bg-border-secondary">
      <div className={`h-full rounded-pill ${fill}`} style={{ width: `${Math.max(widthPct, 3)}%` }} />
    </div>
  );
}
