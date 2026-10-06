import type { ReactNode } from "react";

/** Renders `backticked` spans in a plain string as inline code. */
export function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? (
      <code key={i} className="rounded bg-ink-800/80 px-1 py-px font-mono text-[0.86em] text-fg">
        {p.slice(1, -1)}
      </code>
    ) : (
      p
    ),
  );
}
