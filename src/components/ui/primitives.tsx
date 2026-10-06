import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "./icons";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>
  );
}

/** External link that always opens safely in a new tab and announces it. */
export function ExternalLink({
  href,
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-4 h-10 text-sm font-medium transition-colors duration-200 whitespace-nowrap";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-fg text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-12px_rgb(94_231_249/0.45)]",
  secondary:
    "border border-line-strong bg-ink-900/60 text-fg hover:border-fg-subtle hover:bg-ink-850",
  ghost: "text-fg-muted hover:text-fg",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: "github" | "arrow";
  className?: string;
}) {
  const cls = cx(buttonBase, buttonVariants[variant], className);
  const content = (
    <>
      {icon === "github" && <GitHubIcon className="size-4" />}
      <span>{children}</span>
      {external ? (
        <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
      ) : icon === "arrow" ? (
        <ArrowRight className="size-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
  if (external) {
    return (
      <ExternalLink href={href} className={cls}>
        {content}
      </ExternalLink>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      {index && <span className="text-brand-cyan/80">{index}</span>}
      <span aria-hidden className="h-px w-6 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  lead,
  id,
  children,
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx("reveal max-w-3xl", className)}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2
        id={id}
        className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-fg sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {lead && <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{lead}</p>}
      {children}
    </header>
  );
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <code className={cx("font-mono text-[0.85em] text-fg", className)}>{children}</code>;
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-ink-900/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "li";
}) {
  return (
    <Tag
      className={cx(
        "relative rounded-xl border border-line bg-gradient-to-b from-ink-900 to-ink-950/60",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
