import { BedIcon, BathIcon, RulerIcon, HeartIcon } from "./icons";
import type { Listing } from "./listings";

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <div className="group flex w-full flex-col gap-3">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-mhmw-bg-soft transition-transform duration-300 group-hover:-translate-y-1"
        style={!listing.image ? { backgroundImage: listing.hue } : undefined}
      >
        {listing.image && (
          // eslint-disable-next-line @next/next/no-img-element -- fixed-size card thumbnail, no responsive srcset needed
          <img src={listing.image} alt="" className="size-full object-cover" />
        )}
        <button
          type="button"
          aria-label="Save listing"
          className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/85 text-mhmw-text-black backdrop-blur-sm transition-colors hover:text-red-500"
        >
          <HeartIcon className="size-4" />
        </button>
      </div>
      <p className="truncate font-mhmw-body text-[16px] font-semibold text-mhmw-text-black">{listing.title}</p>
      <div className="flex items-center justify-between gap-2 font-mhmw-body">
        <span className="text-[17px] font-bold text-mhmw-text-black">{listing.price}</span>
        <span className="truncate text-[13px] text-mhmw-text-muted">{listing.address}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-lg bg-mhmw-bg-soft py-2.5 text-[11px] font-medium text-mhmw-text-black/75">
          <BedIcon className="size-4" />
          {listing.beds} Beds
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-mhmw-bg-soft py-2.5 text-[11px] font-medium text-mhmw-text-black/75">
          <BathIcon className="size-4" />
          {listing.baths} Baths
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-mhmw-bg-soft py-2.5 text-[11px] font-medium text-mhmw-text-black/75">
          <RulerIcon className="size-4" />
          {listing.sqft} SQ FT
        </div>
      </div>
    </div>
  );
}
