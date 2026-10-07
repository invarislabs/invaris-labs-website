import type { ReactNode } from "react";
import { links } from "@/lib/site";
import { passResearchHref } from "@/content/writing";
import {
  checkGroups,
  facts,
  mcpScanFlags,
  policyYaml,
  principles,
  pytestSnippet,
  pythonApi,
  terminalSessions,
  workflow,
} from "@/content/agentsec";
import { CodeSamples, CommandLine } from "@/components/ui/code";
import { Check } from "@/components/ui/icons";
import { ButtonLink, Container, ExternalLink, Mono, SectionHeader, cx } from "@/components/ui/primitives";
import { AgentSecTerminal } from "./agentsec-terminal";

function SubHeading({ id, kicker, children }: { id: string; kicker: string; children: ReactNode }) {
  return (
    <div className="reveal">
      <p className="eyebrow text-[11px]">{kicker}</p>
      <h3 id={id} className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">
        {children}
      </h3>
    </div>
  );
}

export function AgentSec() {
  return (
    <section id="agentsec" aria-labelledby="agentsec-title" className="relative scroll-mt-16 border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_50%_60%_at_20%_0%,rgb(176_123_255/0.10),transparent)]" />
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeader
            id="agentsec-title"
            index="01"
            label="AgentSec"
            title="Test agents before they reach production."
            lead="AgentSec is an open-source framework for adversarial security and reliability testing. It runs stateful attack scenarios against complete agent workflows (LLMs, retrieval, memory, MCP servers, tools and sensitive actions), records the full execution trace, and checks that your security policy holds from the first step to the last."
          />
          <div className="reveal flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={links.agentsec.repo} external icon="github">
                View AgentSec on GitHub
              </ButtonLink>
              <ButtonLink href={links.agentsec.docs} external variant="secondary">
                Documentation
              </ButtonLink>
            </div>
            <CommandLine command="pip install invaris-agentsec" />
          </div>
        </div>

        {/* Terminal + policy */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="reveal min-w-0">
            <AgentSecTerminal sessions={terminalSessions} />
            <p className="mt-3 font-mono text-[11px] text-fg-subtle">
              Commands and output from the AgentSec README. Lines starting with # describe documented behaviour.
            </p>
          </div>
          <div className="reveal min-w-0" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <CodeSamples
              caption="AgentSec policy and API examples"
              samples={[
                { id: "policy", label: "agentsec.yaml", lang: "yaml", code: policyYaml },
                { id: "api", label: "Python API", lang: "python", code: pythonApi },
                { id: "pytest", label: "pytest", lang: "python", code: pytestSnippet },
              ]}
            />
            <p className="mt-3 font-mono text-[11px] text-fg-subtle">
              Policies declare what the agent may do. Tests assert behaviour, not a particular model response.
            </p>
          </div>
        </div>

        {/* What it tests */}
        <div className="mt-24" aria-labelledby="agentsec-tests">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SubHeading id="agentsec-tests" kicker="Coverage">
              What AgentSec tests
            </SubHeading>
            <p className="reveal max-w-xl text-pretty leading-relaxed text-fg-muted lg:justify-self-end">
              Every check is deterministic and opt-in by declaration. Findings are mapped to the{" "}
              <ExternalLink href={links.agentsec.owasp} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                OWASP Top 10 for Agentic Applications
              </ExternalLink>{" "}
              (ASI01–ASI10).
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
            {checkGroups.map((g, gi) => (
              <section
                key={g.title}
                aria-labelledby={`grp-${gi}`}
                className="reveal bg-ink-950 p-6 sm:p-7"
                style={{ ["--reveal-delay" as string]: `${gi * 80}ms` }}
              >
                <h4 id={`grp-${gi}`} className="text-base font-semibold text-fg">
                  {g.title}
                </h4>
                <p className="mt-1 text-sm text-fg-subtle">{g.summary}</p>
                <ul className="mt-6 space-y-5">
                  {g.checks.map((c) => (
                    <li key={c.name} className="border-l border-line-strong pl-4">
                      <p className="text-[15px] font-medium text-fg">{c.name}</p>
                      <p className="mt-1 font-mono text-[11px] text-brand-violet/90">{c.id}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="reveal mt-5 max-w-3xl text-sm leading-relaxed text-fg-subtle">
            Categories that need <Mono className="text-fg-muted">tool_effects</Mono> or{" "}
            <Mono className="text-fg-muted">agent_roles</Mono> build no scenarios without them, and a multi-agent
            scenario run against a system that reports no agent attribution is reported as{" "}
            <span className="text-fg-muted">not observable</span>, never as passed. Unauthorized financial and
            on-chain actions are covered by a bundled attack pack and the policy&apos;s{" "}
            <Mono className="text-fg-muted">spend_limits</Mono> /{" "}
            <Mono className="text-fg-muted">address_allowlist</Mono>.{" "}
            <ExternalLink
              href={passResearchHref}
              className="text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg"
            >
              What a passing test does and doesn&apos;t prove
            </ExternalLink>
            .
          </p>
        </div>

        {/* MCP */}
        <div className="mt-24">
          <div className="reveal relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950">
            <div aria-hidden className="hairline-gradient absolute inset-x-0 top-0 h-px" />
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr_1fr]">
              <div>
                <p className="eyebrow text-[11px]">MCP security</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
                  Scan the servers. Attack through them.
                </h3>
                <p className="mt-4 leading-relaxed text-fg-muted">
                  MCP servers hand agents tool descriptions and tool results, both of which can carry
                  instructions. AgentSec tests the server definitions statically and delivers adversarial
                  scenarios through MCP itself.
                </p>
                <ExternalLink
                  href={links.agentsec.mcp}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-white"
                >
                  MCP testing docs <span aria-hidden>↗</span>
                </ExternalLink>
              </div>

              <div className="rounded-xl border border-line bg-ink-950/70 p-5">
                <p className="font-mono text-[12px] text-brand-cyan">agentsec mcp scan</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Lists a server&apos;s tools, resources and prompts without calling, reading or fetching any of
                  them, and flags:
                </p>
                <ul className="mt-4 space-y-2">
                  {mcpScanFlags.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-fg">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line bg-ink-950/70 p-5">
                <p className="font-mono text-[12px] text-brand-cyan">agentsec test --mcp-listen</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  AgentSec becomes the MCP server your agent connects to, delivering the same adversarial
                  scenarios through MCP tool results.
                </p>
                <div className="mt-5 rounded-lg border border-line bg-ink-900 p-3 font-mono text-[11.5px] leading-relaxed">
                  <p className="text-fg-subtle"># agent ⇄ MCP ⇄ AgentSec</p>
                  <p className="mt-1 break-all text-fg">
                    <span className="text-brand-cyan">agentsec</span> test{" "}
                    <span className="text-[#93c5fd]">--mcp-listen</span> 127.0.0.1:8765
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
                  The MCP attack host has been run against a real LLM-backed agent (the Claude Code CLI, built-in tools disabled, every MCP tool
                  simulated), with results checked into the repo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-24" aria-labelledby="agentsec-workflow">
          <SubHeading id="agentsec-workflow" kicker="Workflow">
            Built for the way you already ship.
          </SubHeading>
          <p className="reveal mt-4 max-w-2xl leading-relaxed text-fg-muted">
            AgentSec is CI-first. Exit codes gate the job (<Mono>1</Mono> on findings, <Mono>2</Mono> on
            configuration errors), <Mono>--seed</Mono> makes runs reproducible, and reports compare across pull
            requests.
          </p>

          <ol className="relative mt-12 grid gap-3 lg:grid-cols-6 lg:gap-0">
            <div aria-hidden className="absolute left-[15px] top-4 bottom-4 w-px overflow-hidden bg-line-strong lg:left-4 lg:right-4 lg:top-[15px] lg:bottom-auto lg:h-px lg:w-auto">
              <span className="absolute inset-x-0 top-0 h-24 animate-flow-y bg-gradient-to-b from-transparent via-brand-violet to-transparent lg:hidden motion-reduce:hidden!" />
              <span className="absolute inset-y-0 left-0 hidden w-1/5 animate-flow bg-gradient-to-r from-transparent via-brand-cyan to-transparent [animation-duration:5s] lg:block motion-reduce:hidden!" />
            </div>
            {workflow.map((w, i) => (
              <li
                key={w.step}
                className="reveal relative grid grid-cols-[32px_1fr] gap-4 lg:block lg:pr-4"
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <span
                  className={cx(
                    "relative z-10 flex size-8 items-center justify-center rounded-full border bg-ink-950 font-mono text-[11px]",
                    i === workflow.length - 1 ? "border-brand-cyan/60 text-brand-cyan" : "border-line-strong text-fg-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pb-6 lg:mt-5 lg:pb-0">
                  <p className="font-medium text-fg">{w.step}</p>
                  <p className="mt-1.5 break-words font-mono text-[11px] text-brand-violet/90">{w.cmd}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{w.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Facts + principles */}
        <div className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-2">
          <dl className="reveal space-y-6">
            {facts.map((f) => (
              <div key={f.term} className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
                <dt className="eyebrow pt-0.5 text-[11px]">{f.term}</dt>
                <dd className="text-[15px] leading-relaxed text-fg-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="reveal grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {principles.map(([t, d]) => (
              <li key={t} className="bg-ink-950 p-5">
                <p className="font-medium text-fg">{t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
