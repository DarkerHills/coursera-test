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
        className="mhmw-animate-in flex w-full items-center justify-center rounded-sm border border-mhmw-bg-default bg-white/10 py-2 pr-3 pl-3 backdrop-blur-[2px]"
        role="status"
      >
        <p className="font-mhmw-body text-[15px] font-semibold text-mhmw-bg-default capitalize">
          You&apos;re on the list — we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between overflow-hidden rounded-sm border border-mhmw-bg-default bg-white/10 pl-3 backdrop-blur-[2px] transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_rgba(247,247,245,0.25)]"
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
        className="w-full bg-transparent py-2 font-mhmw-body text-[15px] font-semibold text-mhmw-bg-medium capitalize outline-none placeholder:text-mhmw-bg-medium"
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
