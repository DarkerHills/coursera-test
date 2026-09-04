"use client";

import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/types";
import { MAX_COMPARE } from "@/lib/compare";

export function CompareControls({
  currentIds,
  allListings,
}: {
  currentIds: string[];
  allListings: Listing[];
}) {
  const router = useRouter();
  const available = allListings.filter((l) => !currentIds.includes(l.id));

  function navigate(ids: string[]) {
    const params = ids.map((id) => `id=${encodeURIComponent(id)}`).join("&");
    router.push(`/compare?${params}`);
  }

  function remove(id: string) {
    navigate(currentIds.filter((i) => i !== id));
  }

  function add(id: string) {
    if (!id || currentIds.length >= MAX_COMPARE) return;
    navigate([...currentIds, id]);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {currentIds.length < MAX_COMPARE && available.length > 0 && (
        <label className="flex items-center gap-2 font-body text-[13px] text-text-secondary">
          Add a listing
          <select
            defaultValue=""
            onChange={(e) => add(e.target.value)}
            className="rounded-xs border border-border-primary bg-surface-secondary px-2 py-1.5 font-body text-[13px] text-text-primary"
          >
            <option value="" disabled>
              Choose…
            </option>
            {available.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {currentIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentIds.map((id) => {
            const listing = allListings.find((l) => l.id === id);
            if (!listing) return null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => remove(id)}
                className="rounded-pill border border-border-primary bg-surface-primary px-2.5 py-1 font-chip text-[11px] font-semibold text-text-secondary hover:bg-surface-secondary"
              >
                {listing.name} ✕
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
