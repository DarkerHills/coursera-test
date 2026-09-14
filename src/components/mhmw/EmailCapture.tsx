"use client";

import { useState, type FormEvent } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="mhmw-animate-in flex w-full items-center justify-center rounded-sm border border-black/10 bg-mhmw-bg-soft py-2 pr-3 pl-3 shadow-sm"
        role="status"
      >
        <p className="font-mhmw-body text-[15px] font-semibold text-mhmw-text-black capitalize">
          You&apos;re on the list — we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 overflow-hidden rounded-sm border border-black/15 bg-white p-1.5 shadow-sm transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_rgba(31,61,58,0.15)] min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-0 min-[420px]:p-0 min-[420px]:pl-3"
      data-node-id="2902:41853"
    >
      <label htmlFor="mhmw-email" className="sr-only">
        Email address
      </label>
      <input
        id="mhmw-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email address"
        className="w-full min-w-0 bg-transparent px-2 py-2 font-mhmw-body text-[15px] font-semibold text-mhmw-text-black capitalize outline-none placeholder:text-mhmw-text-black/45 min-[420px]:px-0"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center justify-center gap-2 rounded-sm bg-mhmw-primary-button px-4 py-2 font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize transition-colors duration-200 hover:bg-mhmw-primary-button-hover"
      >
        Get early access
      </button>
    </form>
  );
}
