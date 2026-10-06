import { links } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/icons";
import { Container, ExternalLink, SectionHeader } from "@/components/ui/primitives";

const articles = [
  {
    kind: "Guide",
    title: "Allowed Isn't Authorized: Testing What Your AI Agent Does With the Permissions It Already Has",
    description:
      "A hands-on guide to AgentSec 0.7's authority checks: did the task authorize this effect, where did private data go, did the agent's report match its trace, whose resource did it touch, and which agent acted on whose authority.",
    topics: ["tool_effects", "Multi-agent", "AgentSec 0.7"],
    href: "https://arunima-chaudhuri.hashnode.dev/allowed-isn-t-authorized-testing-what-your-ai-agent-does-with-the-permissions-it-already-has",
  },
  {
    kind: "Guide",
    title: "AgentSec 101: How to Stop Your AI Agent From Going Rogue — A Beginner to Pro Guide",
    description:
      "A hands-on walkthrough from installing AgentSec and attacking a deliberately vulnerable practice agent, to writing a policy for your own agent, then on to replay, regression comparison, GitHub Actions, model-assisted judging and MCP server scanning.",
    topics: ["Policies", "CI", "MCP scanning"],
    href: "https://arunima-chaudhuri.hashnode.dev/agentsec-101-how-to-stop-your-ai-agent-from-going-rogue-a-beginner-to-pro-guide",
  },
  {
    kind: "Essay",
    title: "I Asked My Coding Agent for a Yes or No. It Made a Commit.",
    description:
      "I asked a coding agent whether something was right or wrong. Instead of a yes or no, it made the changes and committed them. On the boundary between what an agent is asked to do and what it is able to do, why a document should never be able to grant an agent permission it didn't have, and how that led to AgentSec.",
    topics: ["User intent", "Prompt injection", "AgentSec"],
    href: "https://arunima-chaudhuri.hashnode.dev/i-asked-my-coding-agent-for-a-yes-or-no-it-made-a-commit",
  },
] as const;

export function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="relative scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="writing-title"
            label="Research & writing"
            title="Notes from building agent security in the open."
            lead="Technical writing by Arunima Chaudhuri on how agents fail, and how to test for it."
          />
          <ExternalLink
            href={links.founder.blog}
            className="reveal inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
          >
            All writing on Hashnode <ArrowUpRight className="size-3.5" />
          </ExternalLink>
        </div>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.href} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-ink-900/40 p-6 transition-colors duration-200 hover:border-line-strong hover:bg-ink-900/80 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan/90">{a.kind}</p>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-fg-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </div>
                <h3 className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-fg sm:text-[1.3rem]">
                  <ExternalLink href={a.href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                    {a.title}
                  </ExternalLink>
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-fg-muted">{a.description}</p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <ul className="flex flex-wrap gap-2" aria-label="Topics">
                    {a.topics.map((t) => (
                      <li key={t} className="rounded-md bg-ink-800/70 px-2 py-1 font-mono text-[11px] text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                    Read article <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <p className="mt-4 font-mono text-[11px] text-fg-subtle">Arunima Chaudhuri · Hashnode</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
