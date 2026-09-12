"use client";

import { useEffect, useRef, useState } from "react";
import { MhmwLogo, StarIcon, CheckFatIcon } from "./icons";
import { Avatar } from "./Avatar";

const REVIEWS = [
  { name: "Mercy Grace", quote: "Bought my first house here, it was seamless and secure", rating: 5 },
  { name: "Charity Matthew", quote: "Got a house that matches my aesthetics and lifestyle", rating: 5 },
  { name: "Kendly Ryan", quote: "Buying a home here is so seamless", rating: 5 },
  { name: "Timothy John", quote: "No Agents involved?!", rating: 5 },
] as const;

const FEATURES = [
  "Story-driven Home Discovery",
  "Intelligent Home Valuation",
  "Verified Property Listing",
  "Advanced Fraud Protection",
  "Smart AI Form Assistance",
] as const;

// Figma node 2903:42227 defines two variants of this sidebar — "Default"
// (Reviews) and "Variant2" (Features). The brief asks for them to alternate
// automatically, with Features shown first.
const SLIDES = [
  { key: "features", label: "Features" },
  { key: "reviews", label: "Reviews" },
] as const;

const DWELL_MS = 5000;

function Divider() {
  return <div className="h-px w-full bg-white/15" aria-hidden="true" />;
}

export function Sidebar() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <aside
      className="relative flex h-auto min-h-[440px] w-full max-w-[404px] shrink-0 flex-col gap-16 overflow-hidden bg-mhmw-grey-10 px-8 py-6 lg:h-[832px]"
      data-node-id="2903:42226"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mhmw-animate-down shrink-0">
        <MhmwLogo />
      </div>

      <div className="relative min-h-0 flex-1">
        <SlidePanel visible={active === 0} labelledBy="mhmw-tab-features">
          <Heading title="Features" />
          <ul className="flex w-full max-w-[232px] flex-col items-start gap-2">
            {FEATURES.map((feature, i) => (
              <li
                key={feature}
                className="mhmw-animate-in flex items-center gap-1 py-1 pr-4 pl-1"
                style={{ animationDelay: `${90 + i * 70}ms` }}
              >
                <CheckFatIcon className="size-4 shrink-0" />
                <p className="font-mhmw-body text-[13px] font-semibold leading-[15.6px] whitespace-nowrap text-mhmw-bg-default">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </SlidePanel>

        <SlidePanel visible={active === 1} labelledBy="mhmw-tab-reviews">
          <Heading title="Reviews" />
          <div className="flex w-full max-w-[292px] flex-col items-start gap-4">
            {REVIEWS.map((review, i) => (
              <div key={review.name} className="flex w-full flex-col gap-4">
                {i > 0 && <Divider />}
                <div
                  className="mhmw-animate-in flex flex-col items-start gap-2"
                  style={{ animationDelay: `${90 + i * 90}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={review.name} />
                    <p className="font-mhmw-body text-[15px] font-semibold leading-6 whitespace-nowrap text-mhmw-bg-default capitalize">
                      {review.name}
                    </p>
                  </div>
                  <p className="font-mhmw-body text-[15px] leading-6 text-mhmw-bg-default">{review.quote}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <StarIcon key={s} className="size-6" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SlidePanel>
      </div>

      <div className="flex shrink-0 items-center gap-2" role="tablist" aria-label="Sidebar highlights">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.key}
            id={`mhmw-tab-${slide.key}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className="group flex items-center gap-2 py-1"
          >
            <span
              className={`h-1.5 rounded-pill transition-all duration-500 ease-out ${
                active === i ? "w-6 bg-mhmw-bg-default" : "w-1.5 bg-white/25 group-hover:bg-white/40"
              }`}
            />
            <span className="sr-only">{slide.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Heading({ title }: { title: string }) {
  return (
    <div className="mhmw-animate-in flex w-full flex-col items-start gap-2">
      <h2 className="font-mhmw-display w-full text-[26px] leading-[31.2px] font-bold text-mhmw-bg-medium">
        {title}
      </h2>
      <div className="h-px w-full bg-white/20" />
    </div>
  );
}

function SlidePanel({
  visible,
  labelledBy,
  children,
}: {
  visible: boolean;
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      aria-labelledby={labelledBy}
      aria-hidden={!visible}
      className={`flex w-full flex-col items-start gap-8 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "relative opacity-100" : "pointer-events-none absolute inset-0 -translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
