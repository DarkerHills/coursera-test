"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  HouseLineIcon,
  BarnIcon,
  BuildingIcon,
  GridNineIcon,
  VideoCameraIcon,
  FadersHorizontalIcon,
} from "./icons";
import { PropertyCard } from "./PropertyCard";
import { listings } from "./listings";

const CATEGORIES = [
  { key: "all", label: "All", icon: HouseLineIcon },
  { key: "multi", label: "Multi family", icon: BarnIcon },
  { key: "single", label: "Single family", icon: BuildingIcon },
] as const;

const VIEWS = [
  { key: "lists", label: "Lists", icon: GridNineIcon },
  { key: "reels", label: "Reels", icon: VideoCameraIcon },
] as const;

export function PropertyBrowse() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["key"]>("all");
  const [view, setView] = useState<(typeof VIEWS)[number]["key"]>("lists");

  return (
    <section
      className="relative z-10 mx-4 -mt-24 rounded-2xl bg-mhmw-bg-default p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:mx-8 sm:p-8 md:-mt-32 lg:mx-auto lg:max-w-[920px] lg:p-10"
      data-node-id="2979:26878"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full max-w-[420px] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 shadow-sm">
          <SearchIcon className="size-4 shrink-0 text-mhmw-text-black/50" />
          <input
            type="text"
            placeholder="Search for City, Address, School, ZIP code"
            className="w-full bg-transparent font-mhmw-body text-[13px] text-mhmw-text-black outline-none placeholder:text-mhmw-text-black/45"
          />
        </label>
        <Link
          href="#"
          className="shrink-0 self-start font-mhmw-body text-[13px] font-semibold text-mhmw-text-black underline-offset-2 hover:underline sm:self-auto"
        >
          Login/sign up
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          {CATEGORIES.map(({ key, label, icon: Icon }) => {
            const active = category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex flex-col items-center gap-1.5 text-[11px] font-semibold transition-colors ${
                  active ? "text-mhmw-primary-button" : "text-mhmw-text-black/55 hover:text-mhmw-text-black"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          {VIEWS.map(({ key, label, icon: Icon }) => {
            const active = view === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                className={`flex flex-col items-center gap-1.5 text-[11px] font-semibold transition-colors ${
                  active ? "text-mhmw-primary-button" : "text-mhmw-text-black/55 hover:text-mhmw-text-black"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 border-t border-black/10 pt-6">
        <button
          type="button"
          className="flex items-center gap-1.5 font-mhmw-body text-[13px] font-semibold text-mhmw-text-black/70 transition-colors hover:text-mhmw-text-black"
        >
          <FadersHorizontalIcon className="size-4" />
          Filter
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {listings.map((listing, i) => (
          <div key={i} className="mhmw-animate-in" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
            <PropertyCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
