import Link from "next/link";

const LINKS = ["News", "About Us", "Contact Us"];

export function Nav() {
  return (
    <div className="mhmw-animate-down flex w-full items-center justify-end gap-[71px] px-8 py-6">
      <nav className="hidden items-center gap-4 font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize sm:flex">
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
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="hidden items-center justify-center px-4 py-2 font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize transition-opacity hover:opacity-80 sm:flex"
        >
          Login
        </Link>
        <div className="hidden h-6 w-px bg-white/30 sm:block" aria-hidden="true" />
        <button
          type="button"
          className="rounded-sm bg-mhmw-bg-soft px-4 py-2 font-mhmw-body text-[15px] font-semibold text-mhmw-text-black capitalize transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          Sell a home
        </button>
      </div>
    </div>
  );
}
