/**
 * Hand-authored replacements for the icons/logo exported by Figma
 * (node 2903:42227 — Group 5 / Star 3 / CheckFat). The MCP session hit
 * Figma's asset-download rate limit and the sandbox's egress policy blocks
 * fetching www.figma.com directly, so the exact exported bytes couldn't be
 * pulled into the repo. These are redrawn to match the reference screenshot
 * as closely as possible — swap in the real exports if you have them.
 */

export function MhmwLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} data-node-id="2903:42165">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M1 13.5L6 6L11 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13.5L14 6L19 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 21V15.5H14V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-mhmw-display text-[19px] font-black tracking-[-0.01em] text-mhmw-bg-default">
        HMW
      </span>
    </div>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.75L14.86 8.63L21.33 9.58L16.67 14.12L17.77 20.56L12 17.52L6.23 20.56L7.33 14.12L2.67 9.58L9.14 8.63L12 2.75Z"
        fill="var(--mhmw-star)"
      />
    </svg>
  );
}

export function CheckFatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" data-name="CheckFat">
      <path
        d="M14.03 3.47a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.47 8.53a.75.75 0 1 1 1.06-1.06L6.25 10.19l6.72-6.72a.75.75 0 0 1 1.06 0Z"
        fill="var(--mhmw-bg-default)"
        stroke="var(--mhmw-bg-default)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Icon set for the "browse properties" landing page (node 2979:26811).
 * Most of these are hand-drawn approximations of the named Phosphor-style
 * glyphs (MagnifyingGlass, HouseLine, Barn, Building, GridNine, VideoCamera,
 * FadersHorizontal, Bed, Shower, Ruler) since Figma's asset API is
 * unreachable from this sandbox. Key and Warehouse below are the real
 * exports the user supplied directly.
 */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
    </svg>
  );
}

export function HouseLineIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function BarnIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3 11 12 4l9 7" />
      <path d="M4 10.5V20h16v-9.5" />
      <path d="M12 4v16" />
      <path d="M9 20v-5a3 3 0 0 1 6 0v5" />
    </svg>
  );
}

export function BuildingIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M9.5 7h1M13.5 7h1M9.5 11h1M13.5 11h1M9.5 15h1M13.5 15h1" />
      <path d="M10 21v-3h4v3" />
    </svg>
  );
}

export function GridNineIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3.5" y="3.5" width="5" height="5" rx="0.5" />
      <rect x="9.5" y="3.5" width="5" height="5" rx="0.5" />
      <rect x="15.5" y="3.5" width="5" height="5" rx="0.5" />
      <rect x="3.5" y="9.5" width="5" height="5" rx="0.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <rect x="15.5" y="9.5" width="5" height="5" rx="0.5" />
      <rect x="3.5" y="15.5" width="5" height="5" rx="0.5" />
      <rect x="9.5" y="15.5" width="5" height="5" rx="0.5" />
      <rect x="15.5" y="15.5" width="5" height="5" rx="0.5" />
    </svg>
  );
}

export function VideoCameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10.5 21 7v10l-5-3.5" />
    </svg>
  );
}

export function FadersHorizontalIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M4 7h9M17 7h3" />
      <circle cx="14" cy="7" r="2.3" />
      <path d="M4 17h3M11 17h9" />
      <circle cx="8" cy="17" r="2.3" />
    </svg>
  );
}

export function BedIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2M21 18v2" />
      <path d="M3 14h18" />
      <rect x="5" y="9.5" width="6" height="2.5" rx="0.6" />
    </svg>
  );
}

export function BathIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 3-1.7" />
      <path d="M6 19v2M16 19v2" />
    </svg>
  );
}

export function RulerIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3" y="8" width="18" height="8" rx="1.5" transform="rotate(-45 12 12)" />
      <path d="M9.5 9.5 11 11M12.5 6.5 14 8M6.5 12.5 8 14" />
    </svg>
  );
}

// Real exports supplied by the user (Key.svg / Warehouse.svg), recolored to
// currentColor so they inherit context like the rest of this set.
export function KeyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 39 39" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.9763 18.4241C13.4604 17.1405 13.1971 15.7695 13.2008 14.3861C13.2008 8.5991 17.8628 3.7901 23.6468 3.6056C25.1243 3.55635 26.5963 3.81098 27.9714 4.35371C29.3466 4.89644 30.5956 5.71572 31.6413 6.7608C32.6869 7.80589 33.5069 9.05452 34.0503 10.4294C34.5938 11.8042 34.8492 13.276 34.8008 14.7536C34.6103 20.5376 29.8013 25.1996 24.0143 25.1996C22.6309 25.2033 21.2599 24.94 19.9763 24.4241L18.0008 26.3996H14.4008V29.9996H10.8008V33.5996H6.00078C5.68252 33.5996 5.3773 33.4732 5.15225 33.2481C4.92721 33.0231 4.80078 32.7179 4.80078 32.3996V28.0961C4.80093 27.7783 4.92716 27.4735 5.15178 27.2486L13.9763 18.4241Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.9992 13.1996C27.9933 13.1996 28.7992 12.3937 28.7992 11.3996C28.7992 10.4055 27.9933 9.59961 26.9992 9.59961C26.0051 9.59961 25.1992 10.4055 25.1992 11.3996C25.1992 12.3937 26.0051 13.1996 26.9992 13.1996Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WarehouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 47 47" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M37.2523 36.6531L4.65035 28.5245" />
        <path d="M9.87691 7.56748L40.737 22.6822" />
        <path d="M29.1017 34.6222L31.4242 25.3074L15.1232 21.2431L12.8007 30.5579" />
        <path d="M30.264 29.9636L13.963 25.8993" />
        <path d="M38.5316 21.6023L34.9234 36.0738" />
        <path d="M12.0804 8.64722L6.97936 29.1064" />
      </g>
    </svg>
  );
}

export function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 20s-7.2-4.35-9.5-8.6C.86 8.1 2.3 4.8 5.6 4.2c1.9-.35 3.7.55 4.9 2.15C11.7 4.75 13.5 3.85 15.4 4.2c3.3.6 4.74 3.9 3.1 7.2C19.2 15.65 12 20 12 20Z" />
    </svg>
  );
}
