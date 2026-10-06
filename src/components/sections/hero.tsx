import { links } from "@/lib/site";
import { ButtonLink, Container, cx } from "@/components/ui/primitives";
import { CommandLine } from "@/components/ui/code";

const reads = [
  { label: "User prompts", tag: "input" },
  { label: "Retrieved documents", tag: "untrusted" },
  { label: "Tool & MCP results", tag: "untrusted" },
  { label: "Memory", tag: "persistent" },
];

const acts = [
  { label: "Tools · MCP servers", tag: "invoke" },
  { label: "APIs & databases", tag: "modify" },
  { label: "Sub-agents", tag: "delegate" },
  { label: "Payments", tag: "irreversible" },
];

function Connector() {
  return (
    <div aria-hidden className="flex justify-center py-1">
      <div className="relative h-7 w-px overflow-hidden bg-line-strong">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-flow-y bg-gradient-to-b from-transparent via-brand-cyan to-transparent motion-reduce:hidden!" />
      </div>
    </div>
  );
}

function NodeList({ title, items }: { title: string; items: typeof reads }) {
  return (
    <div>
      <p className="eyebrow mb-2.5 text-[10px]">{title}</p>
      <ul className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <li
            key={it.label}
            className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-line bg-ink-900/80 px-3 py-2"
          >
            <span className="text-[13px] leading-tight text-fg">{it.label}</span>
            <span
              className={cx(
                "hidden shrink-0 font-mono text-[10px] min-[420px]:inline",
                it.tag === "untrusted" || it.tag === "irreversible" ? "text-sev-high/90" : "text-fg-subtle",
              )}
            >
              {it.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroDiagram() {
  return (
    <figure
      aria-labelledby="hero-diagram-caption"
      className="relative animate-enter rounded-2xl border border-line bg-ink-950/70 [animation-delay:150ms] p-4 shadow-[0_40px_120px_-60px_rgb(79_123_255/0.5)] backdrop-blur-[2px] sm:p-6"
    >
      <figcaption id="hero-diagram-caption" className="sr-only">
        An autonomous agent reads user prompts, retrieved documents, tool and MCP results and memory, then
        acts through tool calls, APIs, sub-agents and payments. AgentSec tests this workflow adversarially
        before production. AgentAuth gives the agent a cryptographic identity and checks scoped authority on
        every request.
      </figcaption>

      {/* AgentSec band */}
      <div className="flex items-center gap-3 rounded-lg border border-brand-violet/25 bg-brand-violet/[0.06] px-3 py-2">
        <span className="rounded bg-brand-violet/15 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-brand-violet">
          AGENTSEC
        </span>
        <span className="text-[12px] text-fg-muted">Adversarial scenarios across the whole workflow, before production</span>
      </div>

      <div className="my-4 sm:my-5">
        <NodeList title="Reads" items={reads} />
        <Connector />
        <div className="relative mx-auto w-full max-w-[340px]">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(79_123_255/0.28),transparent)] blur-xl"
          />
          <div className="relative rounded-xl border border-brand-blue/40 bg-ink-900 px-4 py-3.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-semibold tracking-tight text-fg">Agent</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">autonomous</p>
            </div>
            <p className="mt-2 truncate rounded bg-ink-800 px-2 py-1 font-mono text-[11px] text-brand-cyan">
              did:agent:QmfJZCnu…GjQmDRiMxux
            </p>
            <p className="mt-2 font-mono text-[10.5px] text-fg-subtle">Ed25519 · signs every request</p>
          </div>
        </div>
        <Connector />
        <NodeList title="Acts" items={acts} />
      </div>

      {/* AgentAuth band */}
      <div className="flex items-center gap-3 rounded-lg border border-brand-cyan/25 bg-brand-cyan/[0.05] px-3 py-2">
        <span className="rounded bg-brand-cyan/15 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-brand-cyan">
          AGENTAUTH
        </span>
        <span className="text-[12px] text-fg-muted">Identity and scoped, delegable authority, verified on every request</span>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background: grid + restrained brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(109_94_252/0.22),rgb(56_189_248/0.08),transparent)] blur-2xl" />
      </div>

      <Container className="relative pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/70 py-1 pl-1 pr-3 font-mono text-[11px] text-fg-muted">
              <span className="rounded-full bg-gradient-to-r from-brand-violet/30 to-brand-cyan/30 px-2 py-0.5 text-fg">
                Open source
              </span>
              AgentSec · AgentAuth
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.1rem]"
            >
              Security infrastructure for <span className="text-gradient">autonomous AI agents.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              Agents read private data, invoke tools, delegate work, talk to other agents and take
              actions with real consequences. Application security and identity systems weren&apos;t
              designed for software that decides what to do at runtime.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              Invaris Labs builds the infrastructure to <span className="text-fg">test</span> how agents
              behave, and to <span className="text-fg">identify and authorize</span> what they do.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#agentsec" icon="arrow">
                Explore AgentSec
              </ButtonLink>
              <ButtonLink href="#agentauth" variant="secondary" icon="arrow">
                Explore AgentAuth
              </ButtonLink>
              <ButtonLink href={links.githubOrg} variant="ghost" external icon="github">
                GitHub
              </ButtonLink>
            </div>
            <CommandLine command="pip install invaris-agentsec" className="mt-8" />
          </div>

          <HeroDiagram />
        </div>
      </Container>
    </section>
  );
}
