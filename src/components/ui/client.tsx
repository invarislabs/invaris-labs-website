"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, Copy } from "./icons";
import { cx } from "./primitives";

/** Observes every `.reveal` element once and marks it visible on entry. */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          /* clipboard unavailable: leave state unchanged */
        }
      }}
      className={cx(
        "inline-flex size-8 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-ink-800 hover:text-fg",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

export type TabItem = { id: string; label: string; content: ReactNode; raw: string };

/** Accessible tabs (WAI-ARIA tabs pattern, automatic activation). */
export function CodeTabs({ tabs, caption, className }: { tabs: TabItem[]; caption?: string; className?: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={cx("overflow-hidden rounded-xl border border-line bg-ink-900/80", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-line pr-2">
        <div
          role="tablist"
          aria-label={caption ?? "Code examples"}
          onKeyDown={onKey}
          className="flex min-w-0 overflow-x-auto [scrollbar-width:none]"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cx(
                "relative shrink-0 px-4 py-3 font-mono text-xs transition-colors",
                i === active ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
              )}
            >
              {t.label}
              {i === active && (
                <span aria-hidden className="hairline-gradient absolute inset-x-3 -bottom-px h-px" />
              )}
            </button>
          ))}
        </div>
        <CopyButton text={tabs[active].raw} label={`Copy ${tabs[active].label}`} />
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={i !== active}
          className="min-w-0"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
