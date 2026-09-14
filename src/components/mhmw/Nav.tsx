import Link from "next/link";
import { MhmwLogo } from "./icons";

const LINKS = ["News", "About Us", "Contact Us"];

export function Nav() {
  return (
    <div className="mhmw-animate-down w-full bg-mhmw-grey-10 px-4 py-4 sm:px-8 sm:py-6">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-mhmw-bg-default">
          <MhmwLogo />
        </Link>
        <nav className="hidden items-center gap-4 font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize md:flex">
          {LINKS.map((link) => (
            <Link
              key={link}
              href="#"
              className="relative transition-opacity after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-mhmw-bg-default after:transition-all after:duration-300 hover:opacity-80 hover:after:w-full"
            >
              {link}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            className="hidden items-center justify-center font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize transition-opacity hover:opacity-80 sm:flex"
          >
            Login
          </Link>
          <div className="hidden h-6 w-px bg-white/25 sm:block" aria-hidden="true" />
          <button
            type="button"
            className="rounded-sm bg-mhmw-bg-soft px-3 py-2 font-mhmw-body text-[13px] font-semibold text-mhmw-text-black capitalize shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:px-4 sm:text-[15px]"
          >
            Sell a home
          </button>
        </div>
      </div>
    </div>
  );
}
