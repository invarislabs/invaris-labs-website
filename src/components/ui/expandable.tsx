"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cx } from "./primitives";

/**
 * Shows the first `collapsedHeight` of its content with a fade, plus a toggle
 * when (and only when) the content is taller than that. Keeps long replies
 * from stretching every card in a carousel to the height of the longest one.
 */
export function Expandable({
  children,
  collapsedHeight = 168,
  moreLabel = "Show full reply",
  lessLabel = "Show less",
}: {
  children: ReactNode;
  collapsedHeight?: number;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollHeight > collapsedHeight + 8);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [collapsedHeight]);

  const collapsed = overflows && !open;

  return (
    <div>
      <div
        id={id}
        ref={ref}
        className={cx("relative overflow-hidden", collapsed && "[mask-image:linear-gradient(to_bottom,black_60%,transparent)]")}
        style={collapsed ? { maxHeight: collapsedHeight } : undefined}
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="mt-2 font-mono text-[11px] text-brand-cyan/90 hover:text-brand-cyan"
        >
          {open ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  );
}
