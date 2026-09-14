"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  HamburgerIcon,
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
      className="relative z-10 mx-3 -mt-10 rounded-2xl bg-mhmw-bg-default p-4 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:mx-6 sm:-mt-14 sm:p-6 md:-mt-16 lg:mx-auto lg:max-w-[960px] lg:p-8"
      data-node-id="2979:26878"
    >
      {/* mini header: hamburger + logo / search / login — node "Frame 573" + "Frame 177" + "Frame 175" */}
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4">
        <div className="flex items-center gap-2 text-mhmw-text-black">
          <button type="button" aria-label="Menu" className="transition-opacity hover:opacity-60">
            <HamburgerIcon className="size-5" />
          </button>
          <span className="font-mhmw-display text-[15px] font-black tracking-[-0.01em]">MHMW</span>
        </div>

        <label className="mx-auto flex w-full max-w-[420px] items-center gap-2 rounded-full border border-black/10 bg-white py-2.5 pr-2.5 pl-4 shadow-sm">
          <SearchIcon className="size-4 shrink-0 text-mhmw-accent-purple" />
          <input
            type="text"
            placeholder="Search for City, Address, School, ZIP code"
            className="w-full min-w-0 bg-transparent font-mhmw-body text-[13px] text-mhmw-text-black outline-none placeholder:text-mhmw-text-black/45"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mhmw-accent-purple text-white transition-colors hover:bg-mhmw-accent-purple-hover"
          >
            <SearchIcon className="size-4" />
          </button>
        </label>

        <Link
          href="#"
          className="self-start rounded-full bg-mhmw-primary-button px-4 py-2 text-center font-mhmw-body text-[13px] font-semibold text-mhmw-bg-default capitalize transition-colors hover:bg-mhmw-primary-button-hover sm:self-auto sm:justify-self-end"
        >
          Login/sign up
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5 sm:gap-6">
          {CATEGORIES.map(({ key, label, icon: Icon }) => {
            const active = category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex flex-col items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  active ? "text-mhmw-accent-purple" : "text-mhmw-text-black/55 hover:text-mhmw-text-black"
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
                  active ? "text-mhmw-accent-purple" : "text-mhmw-text-black/55 hover:text-mhmw-text-black"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-black/10 pt-5 sm:mt-8 sm:pt-6">
        <button
          type="button"
          className="flex items-center gap-1.5 font-mhmw-body text-[13px] font-semibold text-mhmw-text-black/70 transition-colors hover:text-mhmw-text-black"
        >
          <FadersHorizontalIcon className="size-4" />
          Filter
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
        {listings.map((listing, i) => (
          <div key={i} className="mhmw-animate-in" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
            <PropertyCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
