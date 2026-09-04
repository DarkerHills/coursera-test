import type { CostReserveInfo, FundingSource } from "@/lib/types";
import { formatDate, formatUsd } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";

const FUNDING_SOURCE_LABEL: Record<FundingSource, string> = {
  reserve_draw: "Reserve draw",
  rental_income: "Rental income",
  holder_capital_call: "Holder capital call",
  issuer_balance_sheet: "Issuer balance sheet",
};

/**
 * §5.6. "If only one line of this module can ship, ship [the cash-flow-negative
 * plan] one" — it's the actual unanswered question from the source thread, so
 * it gets its own full-width, high-contrast row rather than sitting in a grid
 * cell like the rest.
 */
export function CostReserveModule({ costReserve }: { costReserve: CostReserveInfo }) {
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="font-display text-[20px] font-extrabold tracking-[-0.2px] text-text-primary">
        Costs & reserves
      </h2>

      {!costReserve.disclosed ? (
        <div className="rounded-xs border border-dashed border-border-primary bg-surface-secondary p-4">
          <p className="font-body text-[15px] leading-6 text-text-secondary">
            This issuer has not disclosed a reserve balance, upcoming expenses, funding source, or
            what happens in a cash-flow-negative month. For an asset with ongoing carrying costs,
            that is a material gap — not a formality.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatTile
              label="Reserve balance"
              value={formatUsd(costReserve.reserveBalanceUsd)}
              tone={monthsCovered(costReserve) >= 3 ? "success" : "warning"}
              caption={`${monthsCovered(costReserve).toFixed(1)} months covered`}
            />
            <StatTile
              label="Known monthly expenses"
              value={formatUsd(costReserve.monthlyKnownExpensesUsd)}
            />
            <StatTile
              label="Funding source"
              value={FUNDING_SOURCE_LABEL[costReserve.fundingSource]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
              Known upcoming expenses
            </p>
            <div className="flex flex-col divide-y divide-border-secondary rounded-xs border border-border-secondary">
              {costReserve.upcomingExpenses.map((expense, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-3 py-2">
                  <div>
                    <p className="font-body text-[15px] text-text-primary">{expense.label}</p>
                    <p className="font-body text-[13px] text-text-secondary">{formatDate(expense.date)}</p>
                  </div>
                  <p className="font-body text-[15px] font-bold text-text-primary">
                    {formatUsd(expense.amountUsd)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xs border border-state-warning-primary/30 bg-state-warning-subtle p-4">
            <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-state-warning-primary uppercase">
              In a cash-flow-negative month
            </p>
            <p className="mt-1 font-body text-[15px] leading-6 text-text-primary">
              {costReserve.negativeMonthPlan}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border-secondary pt-4">
            <p className="font-chip text-[11px] font-semibold tracking-[0.44px] text-text-tertiary uppercase">
              Responsible legal entity
            </p>
            <p className="font-body text-[15px] font-bold text-text-primary">{costReserve.legalEntity}</p>
          </div>
        </>
      )}
    </Card>
  );
}

function monthsCovered(c: Extract<CostReserveInfo, { disclosed: true }>): number {
  if (c.monthlyKnownExpensesUsd <= 0) return Infinity;
  return c.reserveBalanceUsd / c.monthlyKnownExpensesUsd;
}
