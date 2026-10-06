import { Container, SectionHeader } from "@/components/ui/primitives";

const layers = [
  {
    product: "AgentSec",
    role: "TEST",
    question: "Does the agent behave safely?",
    when: "Before production · in CI on every pull request",
    body: "Adversarial scenarios against the whole workflow. Evidence for every failure: input, trace, violated policy, observed action.",
    accent: "from-brand-violet/25",
    text: "text-brand-violet",
    href: "#agentsec",
  },
  {
    product: "AgentAuth",
    role: "IDENTITY + AUTHORIZATION",
    question: "Who is the agent, and what is it allowed to do?",
    when: "At runtime · on every request",
    body: "A verifiable DID, signed requests, and scoped grants that narrow with delegation and cascade on revocation.",
    accent: "from-brand-cyan/20",
    text: "text-brand-cyan",
    href: "#agentauth",
  },
] as const;

export function SecurityStack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative border-t border-line">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            id="stack-title"
            label="The Invaris agent security stack"
            title="Behaviour and authority, secured separately."
            lead="AgentSec determines whether an agent behaves safely. AgentAuth determines who the agent is and what it is allowed to do. Together they're the beginning of the Invaris agent security stack."
          />

          <figure aria-labelledby="stack-caption" className="reveal">
            <figcaption id="stack-caption" className="sr-only">
              The Invaris agent security stack: AgentSec for testing, AgentAuth for identity and authorization,
              both around the agent.
            </figcaption>
            <div className="rounded-2xl border border-line bg-ink-950 p-3 sm:p-4">
              <div className="space-y-3">
                {layers.map((l) => (
                  <a
                    key={l.product}
                    href={l.href}
                    className={`group block rounded-xl border border-line bg-gradient-to-r ${l.accent} to-transparent p-5 transition-colors hover:border-line-strong sm:p-6`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-lg font-semibold text-fg">{l.product}</span>
                        <span aria-hidden className="font-mono text-fg-subtle">→</span>
                        <span className={`font-mono text-[12px] tracking-[0.14em] ${l.text}`}>{l.role}</span>
                      </div>
                      <span className="font-mono text-[10.5px] text-fg-subtle">{l.when}</span>
                    </div>
                    <p className="mt-4 text-[15px] font-medium text-fg">{l.question}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{l.body}</p>
                  </a>
                ))}
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-line-strong px-5 py-4">
                  <span className="size-2 rounded-full bg-brand-blue shadow-[0_0_12px_rgb(79_123_255/0.8)]" />
                  <span className="font-mono text-[12px] text-fg-muted">
                    autonomous agent · tools · data · sub-agents
                  </span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
