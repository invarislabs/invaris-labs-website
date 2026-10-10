"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "./primitives";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4">
      {dir === "left" ? <path d="M10 3.5 5.5 8l4.5 4.5" /> : <path d="M6 3.5 10.5 8 6 12.5" />}
    </svg>
  );
}

/**
 * Horizontal, scroll-snapping carousel. One slide per view on small screens,
 * two from `md` up. Native scrolling (touch, trackpad, arrow keys on the
 * focused track) keeps working; the buttons and dots just drive it.
 */
export function Carousel({ slides, label }: { slides: ReactNode[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const behavior = (): ScrollBehavior =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    setActive(Math.min(slides.length - 1, Math.round(el.scrollLeft / step)));
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, [slides.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: behavior() });
  };

  const page = (dir: -1 | 1) => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (el && first) el.scrollBy({ left: dir * (first.offsetWidth + 16), behavior: behavior() });
  };

  const btn =
    "inline-flex size-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-fg-subtle hover:bg-ink-850 disabled:cursor-default disabled:opacity-35 disabled:hover:border-line-strong disabled:hover:bg-transparent";

  return (
    <section aria-roledescription="carousel" aria-label={label}>
      {/* Slides are relative so absolutely positioned descendants (e.g. sr-only
          text) are clipped by the track instead of widening the page. */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={`${label}: use arrow keys to scroll`}
        className="relative -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] focus-visible:outline-offset-4 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="relative flex w-full shrink-0 snap-start md:w-[calc(50%-8px)]"
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={cx(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-brand-cyan" : "w-1.5 bg-line-strong group-hover:bg-fg-subtle",
                )}
              />
            </button>
          ))}
          <span className="ml-2 font-mono text-[11px] text-fg-subtle" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => page(-1)} disabled={atStart} aria-label="Previous">
            <Chevron dir="left" />
          </button>
          <button type="button" className={btn} onClick={() => page(1)} disabled={atEnd} aria-label="Next">
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
