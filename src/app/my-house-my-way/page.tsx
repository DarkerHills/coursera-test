import type { Metadata } from "next";
import { Nav } from "@/components/mhmw/Nav";
import { FloatingBadges } from "@/components/mhmw/FloatingBadges";
import { EmailCapture } from "@/components/mhmw/EmailCapture";
import { PropertyBrowse } from "@/components/mhmw/PropertyBrowse";
import { MhmwLogo } from "@/components/mhmw/icons";

export const metadata: Metadata = {
  title: "My House My Way — find a house that suits the ways you live",
  description:
    "Search homes by city, address, school or ZIP — browse verified listings built around the way you actually live.",
};

export default function MyHouseMyWayPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-mhmw-grey-10" data-node-id="2979:26811">
      {/* mhmw-ruled-bg lives on this shared wrapper, not on the hero div and
          PropertyBrowse individually — two elements each independently
          painting the same repeating-linear-gradient from their own origin
          don't phase-align where the panel's negative margin overlaps the
          hero, which showed up as a visible seam right at that edge. One
          continuous paint behind both fixes it by construction. */}
      <div className="mhmw-ruled-bg">
        <div className="relative isolate overflow-hidden">
          <Nav />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 py-12 sm:py-24 lg:py-32">
            <FloatingBadges />
            <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 text-center sm:gap-6">
              <h1
                className="mhmw-animate-in font-mhmw-display text-[26px] leading-[1.2] font-black text-mhmw-text-black sm:text-[31px] sm:leading-[37.2px]"
                style={{ animationDelay: "150ms" }}
              >
                Find a house that suits the ways you live
              </h1>
              <div className="mhmw-animate-in w-full" style={{ animationDelay: "260ms" }}>
                <EmailCapture />
              </div>
            </div>
          </div>
        </div>

        <PropertyBrowse />
      </div>

      <footer className="mt-16 border-t border-white/10 px-6 py-10 sm:mt-24 sm:px-8" data-node-id="2979:27218">
        <div className="mx-auto flex max-w-[920px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-mhmw-bg-default">
            <MhmwLogo />
          </div>
          <p className="font-mhmw-body text-[13px] text-mhmw-bg-medium">
            © {new Date().getFullYear()} My House My Way. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
