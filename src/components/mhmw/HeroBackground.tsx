/**
 * Stand-in for the Figma-exported hero photo (node "Frame 1358" / imgFrame1358
 * — a dusk photograph of a modern house). The MCP session hit Figma's
 * asset-download rate limit and the sandbox's egress policy blocks fetching
 * www.figma.com directly, so the real photo couldn't be pulled into the
 * repo. This is a hand-built CSS/SVG illustration in the same mood (dusk
 * sky, blocky modern facade, tree silhouettes) rather than a stock-photo
 * guess that could 404 — swap in the real export (`public/mhmw/hero.jpg`)
 * and point the <img>/background at it when you have it.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#8ba3bd]" aria-hidden="true">
      <div className="mhmw-kenburns absolute inset-0">
        {/* dusk sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7f9cbe] via-[#a9a08e] to-[#c9a37c]" />

        {/* distant tree line */}
        <svg
          className="absolute right-0 bottom-[36%] left-0 h-[18%] w-full opacity-70"
          viewBox="0 0 900 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 L0 60 Q40 30 90 55 T190 50 T290 58 T400 45 T520 60 T650 48 T780 58 T900 50 L900 100 Z" fill="#5b6b52" />
        </svg>

        {/* modern house — stacked blocky volumes */}
        <svg
          className="absolute right-[6%] bottom-0 h-[62%] w-[70%]"
          viewBox="0 0 700 420"
          preserveAspectRatio="xMidYMax meet"
        >
          <rect x="60" y="180" width="420" height="240" fill="#3b332c" />
          <rect x="60" y="180" width="420" height="18" fill="#5a4d3f" />
          <rect x="180" y="60" width="300" height="160" fill="#544738" />
          <rect x="180" y="60" width="300" height="14" fill="#6b5c49" />
          <rect x="0" y="230" width="150" height="190" fill="#2a2620" />
          {/* warm windows */}
          <rect x="210" y="100" width="70" height="90" fill="#f2c879" opacity="0.85" />
          <rect x="300" y="100" width="70" height="90" fill="#c9822f" opacity="0.6" />
          <rect x="100" y="260" width="50" height="130" fill="#f2c879" opacity="0.75" />
          <rect x="330" y="240" width="120" height="150" fill="#1c1a16" />
          <rect x="330" y="240" width="120" height="150" fill="#f2c879" opacity="0.18" />
          {/* vertical timber cladding accent */}
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x={490 + i * 4} y="120" width="1.6" height="300" fill="#241f19" opacity="0.5" />
          ))}
        </svg>

        {/* foreground trees */}
        <svg className="absolute bottom-0 left-0 h-[46%] w-[30%]" viewBox="0 0 260 260" preserveAspectRatio="xMidYMax meet">
          <rect x="118" y="150" width="10" height="110" fill="#2c2419" />
          <circle cx="123" cy="120" r="70" fill="#3f4a32" />
          <circle cx="70" cy="160" r="50" fill="#374330" />
          <circle cx="180" cy="170" r="55" fill="#333f29" />
        </svg>
        <svg className="absolute right-[2%] bottom-0 h-[30%] w-[16%]" viewBox="0 0 200 200" preserveAspectRatio="xMidYMax meet">
          <rect x="90" y="120" width="8" height="80" fill="#2c2419" />
          <circle cx="94" cy="95" r="55" fill="#465236" />
        </svg>

        {/* ground */}
        <div className="absolute right-0 bottom-0 left-0 h-[6%] bg-[#20201c]" />
      </div>

      {/* Figma spec: linear-gradient(rgba(102,102,102,.5) -> rgba(0,0,0,.5)) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(102,102,102,0.5)] to-[rgba(0,0,0,0.55)]" />
    </div>
  );
}
