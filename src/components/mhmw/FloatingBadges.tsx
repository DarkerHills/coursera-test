import { KeyIcon, WarehouseIcon } from "./icons";

// Decorative tilted cards scattered around the headline (node 2979:26811 —
// "MacBook Air - 447/449/450/451"). Two are real listing photos (the exact
// ones the Figma source left blank/untextured — "plain photo-style bubbles
// with no icon" in the metadata), the other two carry a real icon (Key,
// Warehouse). All four are user-supplied assets.
const BADGES = [
  { left: "9%", top: "42%", rotate: "-8deg", kind: "photo", src: "/listing-exterior.png" },
  { left: "13%", top: "78%", rotate: "6deg", kind: "icon", Icon: KeyIcon },
  { left: "91%", top: "38%", rotate: "8deg", kind: "icon", Icon: WarehouseIcon },
  { left: "87%", top: "78%", rotate: "-6deg", kind: "photo", src: "/listing-interior.png" },
] as const;

export function FloatingBadges() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {BADGES.map((badge, i) => (
        // Two nested elements on purpose: the outer one is a zero-size anchor
        // that owns the fade-up entrance (mhmw-animate-in drives its own
        // `transform`); the inner one owns the permanent centering + tilt.
        // Sharing one element between them would have the animation's
        // `transform` keyframes clobber the tilt once the fade-in finishes.
        <div
          key={i}
          className="mhmw-animate-in absolute"
          style={{ left: badge.left, top: badge.top, animationDelay: `${400 + i * 120}ms` }}
        >
          <div
            className="absolute size-28 rounded-2xl border border-black/5 bg-white p-2 shadow-[0_16px_32px_rgba(0,0,0,0.14)] lg:size-36"
            style={{ left: 0, top: 0, transform: `translate(-50%, -50%) rotate(${badge.rotate})` }}
          >
            {badge.kind === "photo" ? (
              // eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative thumbnail
              <img src={badge.src} alt="" className="size-full rounded-xl object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center rounded-xl bg-mhmw-bg-soft text-mhmw-text-black">
                <badge.Icon className="size-9 lg:size-11" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
