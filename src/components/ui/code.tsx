import { highlight, type Lang } from "@/lib/highlight";
import { CodeTabs, CopyButton, type TabItem } from "./client";
import { cx } from "./primitives";

export function CodeBody({
  code,
  lang,
  className,
}: {
  code: string;
  lang: Lang;
  className?: string;
}) {
  return (
    <pre
      // Focusable so keyboard users can scroll long lines horizontally.
      tabIndex={0}
      className={cx(
        "overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.6] text-fg-muted sm:p-5 sm:text-[13px]",
        className,
      )}
    >
      <code>{highlight(code, lang)}</code>
    </pre>
  );
}

export function CodeBlock({
  code,
  lang,
  title,
  className,
}: {
  code: string;
  lang: Lang;
  title?: string;
  className?: string;
}) {
  return (
    <figure className={cx("overflow-hidden rounded-xl border border-line bg-ink-900/80", className)}>
      <figcaption className="flex items-center justify-between border-b border-line py-1 pl-4 pr-2">
        <span className="font-mono text-xs text-fg-subtle">{title ?? lang}</span>
        <CopyButton text={code} label={`Copy ${title ?? "code"}`} />
      </figcaption>
      <CodeBody code={code} lang={lang} />
    </figure>
  );
}

export type CodeSample = { id: string; label: string; lang: Lang; code: string };

export function CodeSamples({ samples, caption, className }: { samples: CodeSample[]; caption: string; className?: string }) {
  const tabs: TabItem[] = samples.map((s) => ({
    id: s.id,
    label: s.label,
    raw: s.code,
    content: <CodeBody code={s.code} lang={s.lang} className="max-h-[460px] overflow-y-auto focus-visible:outline-offset-[-2px]" />,
  }));
  return <CodeTabs tabs={tabs} caption={caption} className={className} />;
}

/** A single shell command with a copy button, e.g. an install line. */
export function CommandLine({ command, className }: { command: string; className?: string }) {
  return (
    <div
      className={cx(
        "inline-flex max-w-full items-center gap-3 rounded-lg border border-line bg-ink-900/80 py-1 pl-4 pr-1 font-mono text-[13px]",
        className,
      )}
    >
      <span aria-hidden className="select-none text-fg-subtle">
        $
      </span>
      <code className="truncate text-fg">{command}</code>
      <CopyButton text={command} label={`Copy command: ${command}`} />
    </div>
  );
}
