import { KeyIcon, WarehouseIcon } from "./icons";

// Decorative circular badges scattered around the headline (node 2979:26811
// — "MacBook Air - 447/449/450/451"). Two carry an icon (Key, Warehouse);
// the other two are plain photo-style bubbles in the source with no icon —
// rendered here as soft gradient swatches since the real thumbnails
// couldn't be pulled from Figma (see icons.tsx).
const BADGES = [
  { left: "9%", top: "30%", icon: null, gradient: "linear-gradient(135deg,#cbb994,#7c6547)" },
  { left: "13.8%", top: "54.3%", icon: KeyIcon, gradient: "linear-gradient(135deg,#e7d2ad,#a3784a)" },
  { left: "86.2%", top: "54.3%", icon: null, gradient: "linear-gradient(135deg,#a9b6a1,#5c6b52)" },
  { left: "89.3%", top: "40%", icon: WarehouseIcon, gradient: "linear-gradient(135deg,#c9b6c9,#6f6a8c)" },
] as const;

export function FloatingBadges() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {BADGES.map(({ left, top, icon: Icon, gradient }, i) => (
        <div
          key={i}
          className="mhmw-animate-in absolute size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 shadow-lg lg:size-28"
          style={{ left, top, backgroundImage: gradient, animationDelay: `${400 + i * 120}ms` }}
        >
          {Icon && (
            <div className="flex size-full items-center justify-center rounded-full bg-black/20 text-mhmw-bg-default">
              <Icon className="size-6 lg:size-8" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
