import type { FilterResult } from "@/lib/filters";

/**
 * §5.1: "A filtered view that returns nothing because no issuer discloses
 * that field should say so explicitly, and name how many listings were
 * excluded for non-disclosure."
 */
export function EmptyState({ result }: { result: FilterResult }) {
  const { redemption, reserve, verification } = result.excludedForNonDisclosure;
  const total = redemption + reserve + verification;

  return (
    <div className="flex flex-col items-start gap-3 rounded-sm border border-dashed border-border-primary bg-surface-primary p-6">
      <p className="font-display text-[16px] font-extrabold tracking-[-0.16px] text-text-primary">
        No listings match these filters
      </p>
      {total > 0 ? (
        <div className="font-body text-[15px] leading-6 text-text-secondary">
          <p>That&apos;s not necessarily because nothing qualifies — most issuers simply haven&apos;t disclosed it:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {verification > 0 && (
              <li>
                {verification} listing{verification === 1 ? "" : "s"} excluded — no verification cadence published
              </li>
            )}
            {redemption > 0 && (
              <li>
                {redemption} listing{redemption === 1 ? "" : "s"} excluded — no redemption timeline published
              </li>
            )}
            {reserve > 0 && (
              <li>
                {reserve} listing{reserve === 1 ? "" : "s"} excluded — no reserve ledger published
              </li>
            )}
          </ul>
        </div>
      ) : (
        <p className="font-body text-[15px] leading-6 text-text-secondary">
          Try widening the asset class, chain, or yield range.
        </p>
      )}
    </div>
  );
}
