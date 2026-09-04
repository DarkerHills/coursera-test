import Link from "next/link";
import { holdings, getListing } from "@/lib/data";
import { NOW } from "@/lib/now";
import { getVerificationDisplay } from "@/lib/verification";

function alertCount(): number {
  return holdings.filter((h) => {
    const listing = getListing(h.listingId);
    if (!listing) return false;
    const display = getVerificationDisplay(listing.verification, NOW);
    return display.state === "stale" || display.state === "flagged";
  }).length;
}

export function NavBar() {
  const alerts = alertCount();
  return (
    <header className="border-b border-border-secondary bg-surface-primary">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xxs bg-surface-brand font-display text-[13px] font-extrabold text-text-on-brand">
            A
          </span>
          <span className="font-display text-[18px] font-extrabold tracking-[-0.18px] text-text-primary">
            assay
          </span>
        </Link>
        <nav className="flex items-center gap-1 font-body text-[15px] font-bold text-text-primary">
          <NavLink href="/">Explore</NavLink>
          <NavLink href="/compare">Compare</NavLink>
          <NavLink href="/portfolio">
            Portfolio
            {alerts > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-badge-danger-bg px-1 font-chip text-[11px] font-semibold text-badge-danger-text">
                {alerts}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center rounded-xxs px-3 py-2 hover:bg-surface-secondary">
      {children}
    </Link>
  );
}
