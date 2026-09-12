import { listings } from "@/lib/data";
import { NOW } from "@/lib/now";
import { applyFilters, parseFilters, sortListings } from "@/lib/filters";
import { Filters } from "@/components/explore/Filters";
import { ExploreResults } from "@/components/explore/ExploreResults";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFilters(resolvedParams);
  const result = applyFilters(listings, filters, NOW);
  result.matched = sortListings(result.matched, filters.sort, NOW);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] font-extrabold tracking-[-0.28px] text-text-primary sm:text-[32px]">
          Explore RWA products
        </h1>
        <p className="max-w-2xl font-body text-[15px] leading-6 text-text-secondary">
          The place to check before you buy an RWA token. Every listing carries the same three
          trust chips — verification, redemption window, and reserve transparency — whether the
          issuer has published them or not.
        </p>
      </div>

      <Filters />

      <ExploreResults result={result} />
    </div>
  );
}
