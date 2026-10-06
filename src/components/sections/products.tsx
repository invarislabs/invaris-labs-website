import Link from "next/link";
import { links } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Container, ExternalLink, SectionHeader } from "@/components/ui/primitives";

const products = [
  {
    id: "agentsec",
    index: "01",
    name: "AgentSec",
    role: "TEST",
    accent: "text-brand-violet",
    question: "Does the agent behave safely?",
    summary:
      "Open-source adversarial security and reliability testing. Runs stateful attack scenarios against complete agent workflows and verifies your policy holds throughout.",
    meta: ["Python", "Apache-2.0", "CLI · pytest · GitHub Action"],
    repo: links.agentsec.repo,
    repoLabel: "invarislabs/invaris-agentsec",
  },
  {
    id: "agentauth",
    index: "02",
    name: "AgentAuth",
    role: "IDENTITY + AUTHORIZATION",
    accent: "text-brand-cyan",
    question: "Who is the agent, and what may it do?",
    summary:
      "Cryptographic identity and delegated authority. Self-certifying DIDs, signed requests instead of API keys, and scoped grants that only narrow as they're delegated.",
    meta: ["Python", "v0.3", "CLI · SDK · FastAPI"],
    repo: links.agentauth.repo,
    repoLabel: "invarislabs/agent-auth",
  },
] as const;

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="relative border-t border-line">
      <Container className="py-20 sm:py-28">
        <SectionHeader
          id="products-title"
          label="Products"
          title={
            <>
              Two open-source projects for agents <br className="hidden sm:block" />
              that act with real authority.
            </>
          }
          lead="One tests how an agent behaves under attack. The other gives it a verifiable identity and bounds what it is allowed to do."
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {products.map((p, i) => (
            <li
              key={p.id}
              className="reveal group relative flex flex-col rounded-2xl border border-line bg-gradient-to-b from-ink-900 to-ink-950 p-6 transition-colors hover:border-line-strong sm:p-8"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-fg-subtle">{p.index}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg">{p.name}</h3>
                </div>
                <span className={`rounded-md border border-line-strong px-2 py-1 font-mono text-[10px] tracking-[0.14em] ${p.accent}`}>
                  {p.role}
                </span>
              </div>
              <p className="mt-6 text-lg font-medium text-fg">{p.question}</p>
              <p className="mt-3 leading-relaxed text-fg-muted">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${p.name} at a glance`}>
                {p.meta.map((m) => (
                  <li key={m} className="rounded-md bg-ink-800/70 px-2 py-1 font-mono text-[11px] text-fg-muted">
                    {m}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-sm">
                <Link href={`#${p.id}`} className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-white">
                  How {p.name} works <ArrowRight className="size-3.5" />
                </Link>
                <ExternalLink
                  href={p.repo}
                  className="inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-subtle hover:text-fg"
                >
                  {p.repoLabel}
                  <ArrowUpRight className="size-3.5" />
                </ExternalLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
