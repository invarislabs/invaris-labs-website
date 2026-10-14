import type { ReactNode } from "react";
import { links } from "@/lib/site";
import {
  freeLimits,
  notBuiltYet,
  pipeline,
  runDocker,
  runLocally,
  securityPoints,
  uploadCommands,
  verdicts,
  views,
} from "@/content/dashboard";
import { CodeSamples } from "@/components/ui/code";
import { Check } from "@/components/ui/icons";
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

function Pipeline() {
  return (
    <figure aria-labelledby="dash-flow-caption" className="mt-14">
      <figcaption id="dash-flow-caption" className="sr-only">
        From test to review: AgentSec writes report.json, agentsec upload or the GitHub Action sends it to the
        dashboard, and the dashboard shows every run with findings, traces, history and comparisons.
      </figcaption>
      <ol className="grid gap-3 md:grid-cols-3 md:gap-0">
        {pipeline.map((s, i) => (
          <li key={s.title} className="reveal flex md:block" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
            <div className="h-full w-full rounded-xl border border-line bg-gradient-to-b from-ink-900 to-ink-950 p-5 md:mr-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                {i < pipeline.length - 1 && (
                  <span aria-hidden className="hidden font-mono text-xs text-brand-blue md:block">
                    →
                  </span>
                )}
              </div>
              <p className="mt-3 font-semibold text-fg">{s.title}</p>
              <p className="mt-2 font-mono text-[11.5px] text-brand-blue">{s.artifact}</p>
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

export function Dashboard() {
  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="relative scroll-mt-16 border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_50%_60%_at_20%_0%,rgb(79_123_255/0.10),transparent)]"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeader
            id="dashboard-title"
            index="03"
            label="AgentSec Dashboard"
            title="Every AgentSec run, in one place."
            lead="The hosted dashboard for AgentSec reports. Teams upload the report.json files AgentSec writes from CI or their machines, and get every run of every agent together: findings with their evidence, full traces, history across runs, and what changed between any two runs."
          />
          <div className="reveal flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href={links.dashboard.repo} external icon="github">
              View the Dashboard on GitHub
            </ButtonLink>
            <ButtonLink href={links.dashboard.runLocally} external variant="secondary">
              Run it yourself
            </ButtonLink>
          </div>
        </div>

        <Pipeline />

        {/* Upload + verdicts */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="min-w-0">
            <SubHeading id="dashboard-upload" kicker="Sending reports">
              One command after the test run.
            </SubHeading>
            <p className="reveal mt-5 leading-relaxed text-fg-muted">
              Sign in with GitHub, create a project and a project upload token, then upload from your machine or
              from CI. In GitHub Actions, the AgentSec Action takes <Inline text="`dashboard-url`" /> and{" "}
              <Inline text="`dashboard-token`" /> inputs, and a failed upload is a warning, never a failed job.
            </p>
            <div className="reveal mt-8">
              <CodeSamples
                caption="AgentSec Dashboard examples"
                samples={[
                  { id: "upload", label: "upload.sh", lang: "bash", code: uploadCommands },
                  { id: "local", label: "run-locally.sh", lang: "bash", code: runLocally },
                  { id: "docker", label: "docker.sh", lang: "bash", code: runDocker },
                ]}
              />
              <p className="mt-3 font-mono text-[11px] text-fg-subtle">Snippets from the Dashboard README.</p>
            </div>
          </div>
          <div>
            <SubHeading id="dashboard-verdicts" kicker="Honest verdicts">
              Not reached isn&apos;t passed.
            </SubHeading>
            <ul className="reveal mt-6 flex flex-wrap gap-2" aria-label="Scenario verdicts">
              {verdicts.map((v) => (
                <li key={v.label} className={`rounded-md border px-2.5 py-1 font-mono text-[12px] ${v.tone}`}>
                  {v.label}
                </li>
              ))}
            </ul>
            <div className="reveal mt-6 space-y-4 leading-relaxed text-fg-muted">
              <p>
                Verdicts follow AgentSec. <span className="text-fg">Inconclusive</span> means the adversarial
                content never reached the agent: it didn&apos;t open the poisoned email or page, or stopped before a
                mid-task injection. Nothing was measured, so it is never shown or counted as passed.
              </p>
              <p>
                A finding whose scenario is inconclusive in the newer run is never counted as fixed, and rates are
                computed over tested scenarios only.
              </p>
              <p>
                The numbers come from AgentSec&apos;s own code, so the hosted dashboard, the local{" "}
                <Inline text="`agentsec dashboard`" /> and the CLI always agree.
              </p>
            </div>
          </div>
        </div>

        {/* Views */}
        <div className="mt-24">
          <SubHeading id="dashboard-views" kicker="What you see">
            Findings, evidence and history, run after run.
          </SubHeading>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {views.map((v, i) => (
              <li key={v.title} className="reveal bg-ink-950 p-6" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-fg">{v.title}</p>
                  <p className="font-mono text-[11px] text-brand-blue">{v.tag}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  <Inline text={v.body} />
                </p>
              </li>
            ))}
          </ul>
          <p className="reveal mt-4 max-w-3xl text-sm leading-relaxed text-fg-subtle">
            The dashboard shows what the report records and never presents findings as a model&apos;s behaviour. A
            scripted backend is labelled as a scripted stand-in.
          </p>
        </div>

        {/* Security + plan */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <SubHeading id="dashboard-security" kicker="Security">
              Built to display hostile reports.
            </SubHeading>
            <ul className="reveal mt-8 divide-y divide-line rounded-xl border border-line">
              {securityPoints.map(([point, detail]) => (
                <li key={point} className="flex gap-3 p-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                  <div>
                    <p className="text-sm text-fg">{point}</p>
                    <p className="mt-0.5 text-[13px] text-fg-subtle">
                      <Inline text={detail} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubHeading id="dashboard-plan" kicker="Pricing">
              Free at launch, open source, self-hostable.
            </SubHeading>
            <p className="reveal mt-5 leading-relaxed text-fg-muted">
              Everything in the repository is free and Apache-2.0. Run it with Docker on any container host with
              Postgres, or deploy it at no cost on Render and Neon. A few premium features will be added later;
              those will be paid and kept private.
            </p>
            <div className="reveal mt-6 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Free plan limits</caption>
                <thead className="bg-ink-900/70">
                  <tr className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
                    <th scope="col" className="px-4 py-3 font-normal">Free plan</th>
                    <th scope="col" className="px-4 py-3 text-right font-normal">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {freeLimits.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" className="px-4 py-2.5 font-normal text-fg-muted">
                        {k}
                      </th>
                      <td className="px-4 py-2.5 text-right font-mono text-[12.5px] text-fg">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="reveal mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <ExternalLink href={links.dashboard.deployFree} className="font-medium text-fg hover:text-white">
                Deploy for free ↗
              </ExternalLink>
              <ExternalLink href={links.dashboard.security} className="font-medium text-fg hover:text-white">
                Security details ↗
              </ExternalLink>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="reveal mt-12 flex flex-col gap-4 rounded-xl border border-line bg-ink-900/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-relaxed text-fg-muted">
            <span className="mr-2 rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[11px] text-fg">Not built yet</span>
            {notBuiltYet.join(", ")}. Today a project&apos;s runs are visible only to its owner.
          </p>
          <ExternalLink href={links.dashboard.issues} className="shrink-0 text-sm font-medium text-fg hover:text-white">
            Open an issue ↗
          </ExternalLink>
        </div>
      </Container>
    </section>
  );
}
