import { links } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, PenIcon, XIcon } from "@/components/ui/icons";
import { Container, ExternalLink, SectionLabel } from "@/components/ui/primitives";

const areas = [
  "Distributed systems",
  "Peer-to-peer protocols",
  "Ethereum protocol research",
  "AI agent security",
  "Open-source engineering",
];

const profiles = [
  { label: "GitHub", handle: "tinniaru3005", href: links.founder.github, Icon: GitHubIcon },
  { label: "LinkedIn", handle: "arunima-chaudhuri", href: links.founder.linkedin, Icon: LinkedInIcon },
  { label: "X", handle: "@arunimastwt", href: links.founder.x, Icon: XIcon },
  { label: "Writing", handle: "Hashnode", href: links.founder.blog, Icon: PenIcon },
];

export function Founder() {
  return (
    <section aria-labelledby="founder-title" className="relative border-t border-line">
      <Container className="py-20 sm:py-24">
        <div className="reveal grid gap-10 rounded-2xl border border-line bg-gradient-to-br from-ink-900 to-ink-950 p-6 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-12">
          <div
            aria-hidden
            className="flex size-20 items-center justify-center rounded-2xl border border-line-strong bg-ink-850 font-mono text-xl text-fg"
          >
            <span className="text-gradient font-semibold">AC</span>
          </div>

          <div className="max-w-2xl">
            <SectionLabel>Founder</SectionLabel>
            <h2 id="founder-title" className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Arunima Chaudhuri
            </h2>
            <p className="mt-4 leading-relaxed text-fg-muted">
              Arunima founded Invaris Labs and builds AgentSec and AgentAuth. She is a Research Engineer at
              Status, previously interned at Status, Hyperledger and Solana Labs, and holds an M.Tech in Computer
              Science and Engineering from NIT Warangal (2025).
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of work">
              {areas.map((a) => (
                <li
                  key={a}
                  className="rounded-md border border-line bg-ink-950/60 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" aria-label="Arunima Chaudhuri elsewhere">
            {profiles.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <ExternalLink
                  href={href}
                  className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2.5 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-fg">{label}</span>
                    <span className="font-mono text-[11px] text-fg-subtle">{handle}</span>
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
