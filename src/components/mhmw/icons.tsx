/**
 * Hand-authored replacements for the icons/logo exported by Figma
 * (node 2903:42227 — Group 5 / Star 3 / CheckFat). The MCP session hit
 * Figma's asset-download rate limit and the sandbox's egress policy blocks
 * fetching www.figma.com directly, so the exact exported bytes couldn't be
 * pulled into the repo. These are redrawn to match the reference screenshot
 * as closely as possible — swap in the real exports if you have them.
 */

export function MhmwLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} data-node-id="2903:42165">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M1 13.5L6 6L11 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13.5L14 6L19 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 21V15.5H14V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-mhmw-display text-[19px] font-black tracking-[-0.01em] text-mhmw-bg-default">
        HMW
      </span>
    </div>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.75L14.86 8.63L21.33 9.58L16.67 14.12L17.77 20.56L12 17.52L6.23 20.56L7.33 14.12L2.67 9.58L9.14 8.63L12 2.75Z"
        fill="var(--mhmw-star)"
      />
    </svg>
  );
}

export function CheckFatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" data-name="CheckFat">
      <path
        d="M14.03 3.47a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.47 8.53a.75.75 0 1 1 1.06-1.06L6.25 10.19l6.72-6.72a.75.75 0 0 1 1.06 0Z"
        fill="var(--mhmw-bg-default)"
        stroke="var(--mhmw-bg-default)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
