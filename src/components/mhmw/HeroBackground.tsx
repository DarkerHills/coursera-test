/**
 * Hero photo (node "Frame 1358" in the Figma source — a dusk photograph of a
 * modern house). Real export supplied by the user; resized/compressed for
 * web delivery at public/hero.jpg.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#121212]" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed hero background, no responsive srcset needed */}
      <img src="/hero.jpg" alt="" className="mhmw-kenburns absolute inset-0 h-full w-full object-cover" />

      {/* Figma spec: linear-gradient(rgba(102,102,102,.5) -> rgba(0,0,0,.5)) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(102,102,102,0.5)] to-[rgba(0,0,0,0.55)]" />
    </div>
  );
}
