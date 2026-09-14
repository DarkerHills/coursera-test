import { BedIcon, BathIcon, RulerIcon, HeartIcon } from "./icons";
import type { Listing } from "./listings";

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <div className="group flex w-full flex-col gap-3">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundImage: listing.hue }}
      >
        <button
          type="button"
          aria-label="Save listing"
          className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/85 text-mhmw-text-black backdrop-blur-sm transition-colors hover:text-red-500"
        >
          <HeartIcon className="size-4" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-mhmw-body text-[15px] font-semibold text-mhmw-text-black">{listing.title}</p>
      </div>
      <div className="flex items-center gap-2 font-mhmw-body text-[13px]">
        <span className="font-semibold text-mhmw-text-black">{listing.price}</span>
        <span className="truncate text-mhmw-text-black/50">{listing.address}</span>
      </div>
      <div className="flex items-center gap-4 border-t border-black/10 pt-2.5 text-mhmw-text-black/70">
        <span className="flex flex-col items-center gap-1 text-[11px]">
          <BedIcon className="size-[15px]" />
          {listing.beds} Beds
        </span>
        <span className="flex flex-col items-center gap-1 text-[11px]">
          <BathIcon className="size-[15px]" />
          {listing.baths} Baths
        </span>
        <span className="flex flex-col items-center gap-1 text-[11px]">
          <RulerIcon className="size-[15px]" />
          {listing.sqft} SQ FT
        </span>
      </div>
    </div>
  );
}
