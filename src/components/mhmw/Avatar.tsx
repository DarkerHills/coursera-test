/**
 * Stand-in for the Figma-exported reviewer headshots (Ellipse 2-5), which
 * couldn't be downloaded into the repo — see icons.tsx for why. Renders a
 * deterministic initials avatar instead of a broken/placeholder image.
 */

const PALETTE = [
  "#c98a5e", // Mercy Grace
  "#7a2f3b", // Charity Matthew
  "#d9b27c", // Kendly Ryan
  "#4a5560", // Timothy John
];

function hueFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return PALETTE[sum % PALETTE.length];
}

export function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-mhmw-body font-semibold text-mhmw-bg-default"
      style={{
        width: size,
        height: size,
        backgroundColor: hueFor(name),
        fontSize: size * 0.4,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
