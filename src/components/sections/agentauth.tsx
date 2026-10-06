import type { ReactNode } from "react";
import { links } from "@/lib/site";
import {
  apiKeyComparison,
  authHeader,
  cliGrants,
  cliIdentity,
  exampleDid,
  flowSteps,
  limitsJson,
  limitsTable,
  pyDelegate,
  pyService,
  verificationChecks,
} from "@/content/agentauth";
import { CodeSamples } from "@/components/ui/code";
import { Check, Cross } from "@/components/ui/icons";
import { Inline } from "@/components/ui/inline";
import { ButtonLink, Container, ExternalLink, SectionHeader } from "@/components/ui/primitives";

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

function Flow() {
  return (
    <figure aria-labelledby="auth-flow-caption" className="mt-14">
      <figcaption id="auth-flow-caption" className="sr-only">
        AgentAuth request flow: agent identity, signed request, scoped authority, delegation, verification.
      </figcaption>

      <div className="reveal rounded-2xl border border-line bg-ink-900/60 p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="break-all font-mono text-[13px] text-brand-cyan sm:text-sm">{exampleDid}</p>
          <p className="shrink-0 font-mono text-[11px] text-fg-subtle">
            └─ sha2-256 multihash of the agent&apos;s signed inception event
          </p>
        </div>
        <div className="mt-4 border-t border-line pt-4">
          <p className="break-all font-mono text-[11.5px] leading-relaxed text-fg-muted sm:text-[12.5px]">
            <span className="text-[#a5b4fc]">Authorization:</span>
            {authHeader.replace("Authorization:", "")}
          </p>
        </div>
      </div>

      <ol className="relative mt-4 grid gap-3 md:grid-cols-5 md:gap-0">
        {flowSteps.map((s, i) => (
          <li
            key={s.title}
            className="reveal relative flex md:block"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div className="relative h-full w-full rounded-xl border border-line bg-gradient-to-b from-ink-900 to-ink-950 p-5 md:mr-3 md:rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                {i < flowSteps.length - 1 && (
                  <span aria-hidden className="hidden font-mono text-xs text-brand-cyan/70 md:block">
                    →
                  </span>
                )}
              </div>
              <p className="mt-3 font-semibold text-fg">{s.title}</p>
              <p className="mt-2 truncate font-mono text-[11px] text-brand-cyan/90">{s.artifact}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                <Inline text={s.body} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Attenuation() {
  const rows = [
    {
      from: "arunima",
      fromKind: "human",
      to: "shopper",
      scope: "payments.*",
      facts: ["--budget 5000", "--per-call 2000", "--rate 10/60", "--depth 1"],
      tone: "border-brand-blue/50 bg-brand-blue/[0.08]",
    },
    {
      from: "shopper",
      fromKind: "agent",
      to: "helper",
      scope: "payments.buy",
      facts: ["--budget 3000", "per-call ≤ 2000", "rate ≤ 10/60", "depth 0"],
      tone: "border-brand-cyan/50 bg-brand-cyan/[0.07]",
    },
  ];
  return (
    <figure aria-labelledby="atten-caption" className="reveal rounded-2xl border border-line bg-ink-950/80 p-5 sm:p-7">
      <figcaption id="atten-caption" className="sr-only">
        Delegation narrows authority. arunima grants shopper payments.* with a 5000 USD-cent budget, 2000 per call,
        10 calls per 60 seconds and depth 1. shopper delegates payments.buy to helper with a 3000 budget and depth 0.
        A child grant with a 9000 budget would exceed its parent and is refused.
      </figcaption>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
        <span>authority</span>
        <span>narrower →</span>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <div key={r.to} className={i === 0 ? "w-full" : "ml-[8%] w-[92%] sm:ml-[16%] sm:w-[60%]"}>
            <div className={`rounded-lg border p-3.5 sm:p-4 ${r.tone}`}>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[12px]">
                <span className="text-fg">{r.from}</span>
                <span className="text-fg-subtle">({r.fromKind})</span>
                <span className="text-fg-subtle">──▶</span>
                <span className="text-fg">{r.to}</span>
              </div>
              <p className="mt-2 font-mono text-sm font-medium text-brand-cyan">{r.scope}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {r.facts.map((f) => (
                  <li key={f} className="rounded bg-ink-950/70 px-1.5 py-0.5 font-mono text-[10.5px] text-fg-muted">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="relative ml-[16%] sm:ml-[32%]">
          <div className="rounded-lg border border-dashed border-sev-critical/50 bg-sev-critical/[0.05] p-3.5 sm:p-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px]">
              <Cross className="size-4 text-sev-critical" />
              <span className="text-fg">shopper ──▶ helper</span>
              <span className="text-sev-critical">--budget 9000</span>
            </div>
            <p className="mt-1.5 text-[13px] text-fg-muted">Refused: a child grant can&apos;t exceed its parent on any limit.</p>
          </div>
        </div>
      </div>
      <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-fg-subtle">
        Example from the AgentAuth README. Amounts are integer USD-cents; floats are never signed.
      </p>
    </figure>
  );
}

export function AgentAuth() {
  return (
    <section id="agentauth" aria-labelledby="agentauth-title" className="relative scroll-mt-16 border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_50%_60%_at_80%_0%,rgb(94_231_249/0.08),transparent)]" />
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeader
            id="agentauth-title"
            index="02"
            label="AgentAuth"
            title="Give every agent an identity. Control what it can do."
            lead="AgentAuth gives each agent a self-certifying DID backed by an Ed25519 keypair. The agent proves who it is by signing every request. Capability grants say what it may do, and anyone can verify all of it without trusting the registry."
          />
          <div className="reveal flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href={links.agentauth.repo} external icon="github">
              View AgentAuth on GitHub
            </ButtonLink>
            <ButtonLink href={links.agentauth.protocol} external variant="secondary">
              Protocol spec
            </ButtonLink>
          </div>
        </div>

        <Flow />

        {/* Attenuation */}
        <div className="mt-24 grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SubHeading id="agentauth-atten" kicker="Delegation">
              Authority narrows as it&apos;s delegated. It never widens.
            </SubHeading>
            <div className="reveal mt-5 space-y-4 leading-relaxed text-fg-muted">
              <p>
                A person issues an agent a short-lived, scoped grant. The agent can pass a narrower slice to a
                sub-agent, and every action traces back to the human who authorized it.
              </p>
              <p>
                Scopes, audiences and validity windows only shrink, and depth strictly decreases. Limits on
                resources, spend, rate and uses can only tighten, and a hand-crafted grant that loosens one is
                rejected by the service.
              </p>
              <p>
                <span className="text-fg">Counters are shared across the chain.</span> Give an agent a 50 USD
                budget and let it hand two sub-agents 30 USD each: together they still can&apos;t spend more than
                50 USD.
              </p>
            </div>
            <ul className="reveal mt-8 grid gap-2 sm:grid-cols-2">
              {[
                ["Scopes", "tools.* covers tools.search"],
                ["Lifetimes", "15 min default · 24 h max"],
                ["Depth", "strictly decreases"],
                ["Expiry", "clamped to the parent's"],
              ].map(([k, v]) => (
                <li key={k} className="rounded-lg border border-line bg-ink-900/60 px-3.5 py-3">
                  <p className="eyebrow text-[10px]">{k}</p>
                  <p className="mt-1 font-mono text-[12px] text-fg">{v}</p>
                </li>
              ))}
            </ul>
          </div>
          <Attenuation />
        </div>

        {/* Controls */}
        <div className="mt-24">
          <SubHeading id="agentauth-controls" kicker="Control">
            Revoke it, rotate it, switch it off, cap it.
          </SubHeading>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {[
              {
                t: "Revocation that cascades",
                c: "POST /v1/revocations",
                d: "An issuer revokes one of its grants by id. Revoking a grant, or switching off any agent in the chain, cuts off everything below it.",
              },
              {
                t: "Kill switch",
                c: "agentauth deactivate did:agent:… --as arunima",
                d: "An agent can be killed by itself, or by the human or org controller that countersigned its creation.",
              },
              {
                t: "Rotation with pre-rotation",
                c: "agentauth rotate researcher",
                d: "The next key is committed in advance, so the current key alone can't rotate the identity. Relying parties pick up the new key automatically.",
              },
            ].map((x, i) => (
              <li key={x.t} className="reveal bg-ink-950 p-6" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <p className="font-semibold text-fg">{x.t}</p>
                <p className="mt-2 break-words font-mono text-[11px] text-brand-cyan/90">{x.c}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{x.d}</p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-4 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Grant limits and how they are enforced</caption>
              <thead className="bg-ink-900/70">
                <tr className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
                  <th scope="col" className="px-5 py-3 font-normal">Limit</th>
                  <th scope="col" className="px-5 py-3 font-normal">Meaning</th>
                  <th scope="col" className="hidden px-5 py-3 font-normal sm:table-cell">Enforced</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {limitsTable.map(([k, m, e]) => (
                  <tr key={k}>
                    <th scope="row" className="px-4 py-3 align-top font-mono sm:px-5 text-[12.5px] font-normal text-brand-cyan">
                      {k}
                    </th>
                    <td className="px-4 py-3 text-fg-muted sm:px-5">
                      <Inline text={m} />
                      <span className="mt-1 block font-mono text-[11px] text-fg-subtle sm:hidden">Enforced: {e}</span>
                    </td>
                    <td className="hidden px-5 py-3 font-mono text-[12px] text-fg-muted sm:table-cell">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="reveal mt-4 max-w-3xl text-sm leading-relaxed text-fg-subtle">
            Fail-closed: a resource-limited grant is refused at any endpoint that doesn&apos;t declare a resource,
            an unknown limit field invalidates the grant, and a mismatched spend unit is refused.
          </p>
        </div>

        {/* Code + verification */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <SubHeading id="agentauth-code" kicker="In practice">
              CLI, SDK and a FastAPI integration.
            </SubHeading>
            <div className="reveal mt-8">
              <CodeSamples
                caption="AgentAuth examples"
                samples={[
                  { id: "grants", label: "grants.sh", lang: "bash", code: cliGrants },
                  { id: "identity", label: "identity.sh", lang: "bash", code: cliIdentity },
                  { id: "delegate", label: "delegate.py", lang: "python", code: pyDelegate },
                  { id: "service", label: "service.py", lang: "python", code: pyService },
                  { id: "limits", label: "limits.json", lang: "json", code: limitsJson },
                ]}
              />
              <p className="mt-3 font-mono text-[11px] text-fg-subtle">Snippets from the AgentAuth README.</p>
            </div>
          </div>
          <div>
            <SubHeading id="agentauth-verify" kicker="Verification">
              What a service checks before it says yes.
            </SubHeading>
            <ul className="reveal mt-8 divide-y divide-line rounded-xl border border-line">
              {verificationChecks.map(([check, why]) => (
                <li key={check} className="flex gap-3 p-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                  <div>
                    <p className="text-sm text-fg">{check}</p>
                    <p className="mt-0.5 text-[13px] text-fg-subtle">{why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* API keys comparison */}
        <div className="mt-24">
          <SubHeading id="agentauth-why" kicker="Why not API keys?">
            Shared secrets were built for services, not agents.
          </SubHeading>
          <div className="reveal mt-10 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-2 bg-ink-900/70 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle sm:grid">
              <p className="px-5 py-3">API keys for agents</p>
              <p className="border-l border-line px-5 py-3">AgentAuth</p>
            </div>
            <ul className="divide-y divide-line">
              {apiKeyComparison.map(([problem, answer]) => (
                <li key={problem} className="grid sm:grid-cols-2">
                  <p className="flex gap-3 px-5 pb-1 pt-4 text-sm text-fg-muted sm:py-4">
                    <Cross className="mt-0.5 size-4 shrink-0 text-sev-critical/80" />
                    {problem}
                  </p>
                  <p className="flex gap-3 px-5 pb-4 pt-1 text-sm text-fg sm:border-l sm:border-line sm:py-4">
                    <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                    {answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Status */}
        <div className="reveal mt-12 flex flex-col gap-4 rounded-xl border border-line bg-ink-900/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-relaxed text-fg-muted">
            <span className="mr-2 rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[11px] text-fg">v0.3</span>
            Shipped: identity (v0.1), delegated grants (v0.2), limits (v0.3). Known gaps, like registry
            equivocation and the in-memory nonce cache, are documented in the threat model.
          </p>
          <div className="flex shrink-0 gap-4 text-sm">
            <ExternalLink href={links.agentauth.threatModel} className="font-medium text-fg hover:text-white">
              Threat model ↗
            </ExternalLink>
            <ExternalLink href={links.agentauth.roadmap} className="font-medium text-fg hover:text-white">
              Roadmap ↗
            </ExternalLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
