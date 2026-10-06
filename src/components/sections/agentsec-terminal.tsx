"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { TermLine, TermSession } from "@/content/agentsec";
import { CopyButton } from "@/components/ui/client";
import { cx } from "@/components/ui/primitives";

const CHAR_MS = 26;
const LINE_MS = 55;

function lineClass(line: TermLine): string {
  if (line.kind === "note") return "text-fg-subtle";
  const t = line.text;
  if (t.startsWith("CRITICAL")) return "text-sev-critical";
  if (t.startsWith("HIGH")) return "text-sev-high";
  if (t.startsWith("MEDIUM")) return "text-sev-medium";
  if (t === "Invaris AgentSec") return "text-fg font-semibold";
  if (/passed$/.test(t)) return "text-ok";
  if (/findings$/.test(t)) return "text-sev-high";
  return "text-fg-muted";
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function AgentSecTerminal({ sessions }: { sessions: TermSession[] }) {
  const [active, setActive] = useState(0);
  // progress = [lineIndex, charIndex]; lineIndex === lines.length means done
  const [progress, setProgress] = useState<[number, number]>([0, 0]);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  const session = sessions[active];
  const lines = session.lines;
  const done = reduced || progress[0] >= lines.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const [li, ci] = progress;
    if (li >= lines.length) return;
    const line = lines[li];
    let delay = LINE_MS;
    let next: [number, number];
    if (line.kind === "cmd" && ci < line.text.length) {
      delay = ci === 0 ? 380 : CHAR_MS;
      next = [li, ci + 1];
    } else {
      next = [li + 1, 0];
      if (line.kind === "cmd") delay = 260;
    }
    const t = setTimeout(() => setProgress(next), delay);
    return () => clearTimeout(t);
  }, [progress, inView, reduced, lines]);

  const select = (i: number) => {
    setActive(i);
    setProgress([0, 0]);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % sessions.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + sessions.length) % sessions.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = sessions.length - 1;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const maxLines = Math.max(...sessions.map((s) => s.lines.length));
  const commands = lines.filter((l) => l.kind === "cmd").map((l) => l.text).join("\n");

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-xl border border-line bg-[#020817] shadow-[0_30px_80px_-40px_rgb(79_123_255/0.45)]"
    >
      <div className="flex items-center gap-3 border-b border-line pl-4 pr-2">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ink-700" />
          <span className="size-2.5 rounded-full bg-ink-700" />
          <span className="size-2.5 rounded-full bg-ink-700" />
        </div>
        <div
          role="tablist"
          aria-label="AgentSec CLI examples"
          onKeyDown={onKey}
          className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]"
        >
          {sessions.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-t-${s.id}`}
              aria-selected={i === active}
              aria-controls={`${uid}-p`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className={cx(
                "relative shrink-0 px-3 py-3 font-mono text-xs transition-colors",
                i === active ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
              )}
            >
              {s.label}
              {i === active && <span aria-hidden className="hairline-gradient absolute inset-x-2 -bottom-px h-px" />}
            </button>
          ))}
        </div>
        <CopyButton text={commands} label="Copy commands" />
      </div>

      <div role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t-${session.id}`} tabIndex={0}>
        {/* Full transcript for assistive tech; the animated copy is decorative. */}
        <pre className="sr-only">
          {lines.map((l) => (l.kind === "cmd" ? `$ ${l.text}` : l.text)).join("\n")}
        </pre>
        <pre
          aria-hidden
          className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.65] sm:p-5 sm:text-[13px]"
          style={{ minHeight: `calc(${maxLines * 1.65}em + 2.5rem)` }}
        >
          {lines.map((line, i) => {
            if (!done && i > progress[0]) return null;
            const typing = !done && i === progress[0];
            if (line.kind === "cmd") {
              const shown = typing ? line.text.slice(0, progress[1]) : line.text;
              return (
                <span key={i} className="block min-h-[1.65em] whitespace-pre">
                  <span className="select-none text-brand-violet">❯ </span>
                  <span className="text-fg">{shown}</span>
                  {typing && <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-brand-cyan/80" />}
                </span>
              );
            }
            if (typing) return null;
            return (
              <span key={i} className={cx("block min-h-[1.65em] whitespace-pre", lineClass(line))}>
                {line.text}
              </span>
            );
          })}
          {done && (
            <span className="block">
              <span className="select-none text-brand-violet">❯ </span>
              <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-fg-subtle/70" />
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}
