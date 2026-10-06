"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { links, nav } from "@/lib/site";
import { Close, GitHubIcon, Menu } from "@/components/ui/icons";
import { cx, ExternalLink } from "@/components/ui/primitives";

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="#top" className={cx("group flex items-center gap-2.5", className)}>
      <Image
        src="/brand/invaris-mark.png"
        alt=""
        width={32}
        height={32}
        priority
        className="size-8 rounded-md"
      />
      <span className="font-sans text-[13px] font-medium uppercase tracking-[0.28em] text-fg">
        Invaris<span className="text-fg-muted"> Labs</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <ExternalLink
                href={links.githubOrg}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong px-3 text-sm text-fg transition-colors hover:border-fg-subtle hover:bg-ink-850"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </ExternalLink>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <Close className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-line bg-ink-950/95 md:hidden"
      >
        <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base text-fg-muted hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ExternalLink
              href={links.githubOrg}
              className="flex items-center gap-2 rounded-md px-2 py-3 text-base text-fg"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </ExternalLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
