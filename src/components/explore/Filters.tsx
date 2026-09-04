"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ASSET_CLASSES, CHAINS } from "@/lib/filters";
import type { AssetClass, Chain } from "@/lib/types";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "trust", label: "Verification recency (default)" },
  { value: "yield_desc", label: "Yield: high to low" },
  { value: "yield_asc", label: "Yield: low to high" },
  { value: "min_investment_asc", label: "Minimum investment: low to high" },
  { value: "name_asc", label: "Name: A–Z" },
];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minYield, setMinYield] = useState(searchParams.get("minYield") ?? "");
  const [maxRedemptionDays, setMaxRedemptionDays] = useState(searchParams.get("maxRedemptionDays") ?? "");
  const [verifiedWithinDays, setVerifiedWithinDays] = useState(searchParams.get("verifiedWithinDays") ?? "");

  function navigate(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  function toggleMulti(key: string, value: string) {
    navigate((params) => {
      const current = params.getAll(key);
      params.delete(key);
      if (current.includes(value)) {
        current.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        [...current, value].forEach((v) => params.append(key, v));
      }
    });
  }

  function toggleReserve() {
    navigate((params) => {
      if (params.get("reserveLedger")) params.delete("reserveLedger");
      else params.set("reserveLedger", "1");
    });
  }

  function applyNumbers() {
    navigate((params) => {
      setOrDelete(params, "minYield", minYield);
      setOrDelete(params, "maxRedemptionDays", maxRedemptionDays);
      setOrDelete(params, "verifiedWithinDays", verifiedWithinDays);
    });
  }

  function setSort(sort: string) {
    navigate((params) => params.set("sort", sort));
  }

  function reset() {
    setMinYield("");
    setMaxRedemptionDays("");
    setVerifiedWithinDays("");
    router.push("/", { scroll: false });
  }

  const activeAssetClasses = new Set(searchParams.getAll("assetClass"));
  const activeChains = new Set(searchParams.getAll("chain"));
  const reserveLedgerOnly = Boolean(searchParams.get("reserveLedger"));

  return (
    <div className="flex flex-col gap-5 rounded-sm border border-border-secondary bg-surface-primary p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[16px] font-extrabold tracking-[-0.16px] text-text-primary">
          Filters
        </h2>
        <button
          type="button"
          onClick={reset}
          className="font-body text-[13px] font-bold text-text-secondary underline decoration-dotted underline-offset-2 hover:text-text-primary"
        >
          Reset all
        </button>
      </div>

      <FilterGroup label="Asset class">
        {ASSET_CLASSES.map((ac: AssetClass) => (
          <Chip key={ac} active={activeAssetClasses.has(ac)} onClick={() => toggleMulti("assetClass", ac)}>
            {ac}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Chain">
        {CHAINS.map((c: Chain) => (
          <Chip key={c} active={activeChains.has(c)} onClick={() => toggleMulti("chain", c)}>
            {c}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Trust filters — the ones no one else has">
        <Chip active={reserveLedgerOnly} onClick={toggleReserve}>
          Reserve ledger available
        </Chip>
      </FilterGroup>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <NumberField
          label="Min. yield (%)"
          value={minYield}
          onChange={setMinYield}
          onBlur={applyNumbers}
        />
        <NumberField
          label="Redemption under (days)"
          value={maxRedemptionDays}
          onChange={setMaxRedemptionDays}
          onBlur={applyNumbers}
        />
        <NumberField
          label="Verified within (days)"
          value={verifiedWithinDays}
          onChange={setVerifiedWithinDays}
          onBlur={applyNumbers}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[13px] font-bold text-text-secondary" htmlFor="sort">
          Sort by
        </label>
        <select
          id="sort"
          defaultValue={searchParams.get("sort") ?? "trust"}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xs border border-border-primary bg-surface-secondary px-3 py-2 font-body text-[15px] font-light text-text-primary"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  if (value.trim() === "") params.delete(key);
  else params.set(key, value);
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-body text-[13px] font-bold text-text-secondary">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-pill border px-2.5 py-1 font-chip text-[11px] font-semibold tracking-[0.44px] uppercase transition-colors ${
        active
          ? "border-surface-brand bg-surface-brand text-text-on-brand"
          : "border-border-primary bg-surface-primary text-text-secondary hover:bg-surface-secondary"
      }`}
    >
      {children}
    </button>
  );
}

function NumberField({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[13px] font-bold text-text-secondary">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={(e) => e.key === "Enter" && onBlur()}
        placeholder="Any"
        className="rounded-xs border border-border-primary bg-surface-secondary px-3 py-2 font-body text-[15px] font-light text-text-primary placeholder:text-text-tertiary"
      />
    </div>
  );
}
