"use client";

import { useState } from "react";

/**
 * Relative time by default, absolute always reachable — product doc §5.4:
 * "Relative time on the chip, absolute date on hover/tap. Always both available."
 * Hover works for desktop; click/tap toggles for touch devices; `title` is the
 * no-JS/screen-reader fallback.
 */
export function TimeStamp({ relative, absolute }: { relative: string; absolute: string }) {
  const [open, setOpen] = useState(false);
  if (relative === absolute) return <span>{relative}</span>;
  return (
    <span
      className="group relative inline-block cursor-help underline decoration-dotted decoration-text-tertiary underline-offset-2"
      title={absolute}
      tabIndex={0}
      onClick={() => setOpen((v) => !v)}
      onBlur={() => setOpen(false)}
    >
      {relative}
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 rounded-xs bg-surface-brand px-2 py-1 font-chip text-[11px] whitespace-nowrap text-text-on-brand shadow-overlay transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 group-focus:opacity-100`}
      >
        {absolute}
      </span>
    </span>
  );
}
