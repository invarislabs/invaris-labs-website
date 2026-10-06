import { links } from "@/lib/site";
import { ArrowUpRight, GitHubIcon } from "@/components/ui/icons";
import { CommandLine } from "@/components/ui/code";
import { ButtonLink, Container, ExternalLink, SectionHeader } from "@/components/ui/primitives";

const repos = [
  {
    name: "invarislabs/invaris-agentsec",
    href: links.agentsec.repo,
    description:
      "Adversarial security testing for AI agents: prompt injection, tool misuse, memory poisoning and MCP scanning, with CI-ready regression testing and reports.",
    meta: ["Python", "Apache-2.0"],
    install: "pip install invaris-agentsec",
    actions: [
      { label: "Issues", href: links.agentsec.issues },
      { label: "Contributing", href: links.agentsec.contributing },
      { label: "Docs", href: links.agentsec.docs },
    ],
  },
  {
    name: "invarislabs/agent-auth",
    href: links.agentauth.repo,
    description:
      "Cryptographic identity and delegated authority for autonomous AI agents: self-certifying DIDs, signed requests instead of API keys, and scoped delegation chains with budgets and cascading revocation.",
    meta: ["Python", "v0.3"],
    install: 'pip install -e ".[dev]"',
    actions: [
      { label: "Issues", href: links.agentauth.issues },
      { label: "Architecture", href: links.agentauth.architecture },
      { label: "Threat model", href: links.agentauth.threatModel },
    ],
  },
] as const;

const areas = [
  "Adversarial test cases",
  "Agent & framework adapters",
  "MCP security testing",
  "Deterministic evaluators",
  "Trace schemas & interoperability",
  "Sandboxing & safe execution",
  "Docs & vulnerable examples",
];

export function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="oss-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
      </div>
      <Container className="relative py-20 sm:py-28">
        <SectionHeader
          id="oss-title"
          label="Open source"
          title="Built in the open. Read the code, break the tools."
          lead="Security infrastructure should be inspectable. Explore the code, try the tools against your own agents, open issues, contribute, and star the repositories if they're useful."
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {repos.map((r, i) => (
            <li
              key={r.name}
              className="reveal flex flex-col rounded-2xl border border-line bg-ink-950/90 p-6 sm:p-8"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="size-5 text-fg-muted" />
                <ExternalLink href={r.href} className="break-all font-mono text-[15px] text-fg hover:text-white">
                  {r.name}
                </ExternalLink>
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-fg-muted">{r.description}</p>
              <ul className="mt-5 flex gap-2" aria-label="Repository details">
                {r.meta.map((m) => (
                  <li key={m} className="rounded-md bg-ink-800/70 px-2 py-1 font-mono text-[11px] text-fg-muted">
                    {m}
                  </li>
                ))}
              </ul>
              <CommandLine command={r.install} className="mt-6 self-start" />
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
                <ButtonLink href={r.href} external icon="github" className="h-9">
                  Star on GitHub
                </ButtonLink>
                {r.actions.map((a) => (
                  <ExternalLink
                    key={a.label}
                    href={a.href}
                    className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg"
                  >
                    {a.label}
                    <ArrowUpRight className="size-3.5" />
                  </ExternalLink>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal mt-10 grid gap-8 rounded-2xl border border-line bg-ink-900/50 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h3 className="text-lg font-semibold text-fg">Where AgentSec welcomes contributions</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Both projects are under active development. If you&apos;re building an agent and want to be an early
              design partner, open a discussion or{" "}
              <a href={links.email} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                get in touch
              </a>
              .
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="rounded-md border border-line bg-ink-950/70 px-2.5 py-1.5 font-mono text-[11.5px] text-fg-muted">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
