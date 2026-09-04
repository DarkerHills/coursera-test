import { listings } from "@/lib/data";
import { resolveCompareIds, resolveCompareListings, MIN_COMPARE, MAX_COMPARE } from "@/lib/compare";
import { CompareTable } from "@/components/compare/CompareTable";
import { CompareControls } from "@/components/compare/CompareControls";
import { ButtonLink } from "@/components/ui/Button";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const ids = resolveCompareIds(resolvedParams);
  const compared = resolveCompareListings(ids);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] font-extrabold tracking-[-0.28px] text-text-primary sm:text-[32px]">
          Compare
        </h1>
        <p className="max-w-2xl font-body text-[15px] leading-6 text-text-secondary">
          A grey chip next to a colored one is the whole point of this page — it means one issuer
          disclosed something the other didn&apos;t.
        </p>
      </div>

      <CompareControls currentIds={compared.map((l) => l.id)} allListings={listings} />

      {compared.length < MIN_COMPARE ? (
        <div className="flex flex-col items-start gap-3 rounded-sm border border-dashed border-border-primary bg-surface-primary p-6">
          <p className="font-body text-[15px] leading-6 text-text-secondary">
            Pick at least {MIN_COMPARE} listings to compare (up to {MAX_COMPARE}). Use the picker
            above, or select listings from Explore.
          </p>
          <ButtonLink href="/" variant="secondary" size="small">
            Go to Explore
          </ButtonLink>
        </div>
      ) : (
        <CompareTable listings={compared} />
      )}
    </div>
  );
}
