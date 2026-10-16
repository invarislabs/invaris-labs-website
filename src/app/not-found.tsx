import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui/primitives";

// `noindex` keeps missing URLs out of search results; links on the page are
// still followed. Exported as 404.html, which Cloudflare Pages serves with a
// 404 status.
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Invaris Labs builds open-source security infrastructure for autonomous AI agents.",
  robots: { index: false, follow: true },
};

const destinations = [
  { label: "AgentSec", href: "/#agentsec", note: "Adversarial testing for AI agents" },
  { label: "AgentAuth", href: "/#agentauth", note: "Identity and delegated authority" },
  { label: "AgentSec Dashboard", href: "/#dashboard", note: "Every test run in one place" },
  { label: "FAQ", href: "/#faq", note: "AI agent security, answered" },
];

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-dvh items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>
      <Container className="relative py-20">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image src="/brand/invaris-mark-64.png" alt="" width={32} height={32} className="size-8 rounded-md" />
          <span className="font-sans text-[13px] font-medium uppercase tracking-[0.28em] text-fg">
            Invaris<span className="text-fg-muted"> Labs</span>
          </span>
        </Link>
        <p className="eyebrow mt-14 text-[11px]">404</p>
        <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-fg-muted sm:text-lg">
          The link may be out of date. Everything on the site lives on the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" icon="arrow">
            Go to the home page
          </ButtonLink>
          <ButtonLink href={links.githubOrg} variant="secondary" external icon="github">
            Invaris Labs on GitHub
          </ButtonLink>
        </div>
        <ul className="mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {destinations.map((d) => (
            <li key={d.href} className="bg-ink-950">
              <Link href={d.href} className="block p-5 transition-colors hover:bg-ink-900/80">
                <span className="block font-medium text-fg">{d.label}</span>
                <span className="mt-1 block text-sm text-fg-muted">{d.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
