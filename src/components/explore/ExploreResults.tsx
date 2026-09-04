"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import type { FilterResult } from "@/lib/filters";
import { ListingTable } from "./ListingTable";
import { ListingCard } from "./ListingCard";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/Button";

const MIN_COMPARE = 2;
const MAX_COMPARE = 4;

export function ExploreResults({ result }: { result: FilterResult }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_COMPARE) {
        next.add(id);
      }
      return next;
    });
  }

  if (result.matched.length === 0) {
    return <EmptyState result={result} />;
  }

  const canCompare = selected.size >= MIN_COMPARE && selected.size <= MAX_COMPARE;
  const compareHref = `/compare?${Array.from(selected)
    .map((id) => `id=${encodeURIComponent(id)}`)
    .join("&")}`;

  return (
    <div className="flex flex-col gap-4 pb-20">
      <ListingTable listings={result.matched} selected={selected} onToggle={toggle} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        {result.matched.map((l: Listing) => (
          <ListingCard key={l.id} listing={l} selected={selected.has(l.id)} onToggle={toggle} />
        ))}
      </div>

      {selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border-secondary bg-surface-primary px-4 py-3 shadow-overlay">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <p className="font-body text-[15px] text-text-primary">
              {selected.size} selected
              {!canCompare && (
                <span className="ml-2 font-body text-[13px] text-text-secondary">
                  (choose {MIN_COMPARE}–{MAX_COMPARE} to compare)
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="font-body text-[13px] font-bold text-text-secondary underline decoration-dotted underline-offset-2"
              >
                Clear
              </button>
              {canCompare ? (
                <Link href={compareHref}>
                  <Button variant="primary" size="small">
                    Compare {selected.size}
                  </Button>
                </Link>
              ) : (
                <Button variant="primary" size="small" disabled>
                  Compare
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
