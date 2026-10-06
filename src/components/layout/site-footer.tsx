import Image from "next/image";
import { links, site } from "@/lib/site";
import { ExternalLink } from "@/components/ui/primitives";

const columns = [
  {
    title: "Projects",
    items: [
      { label: "AgentSec on GitHub", href: links.agentsec.repo, external: true },
      { label: "AgentAuth on GitHub", href: links.agentauth.repo, external: true },
      { label: "AgentSec docs", href: links.agentsec.docs, external: true },
      { label: "AgentAuth protocol", href: links.agentauth.protocol, external: true },
    ],
  },
  {
    title: "Invaris Labs",
    items: [
      { label: "Writing", href: links.founder.blog, external: true },
      { label: "GitHub", href: links.githubOrg, external: true },
      { label: "X", href: links.xOrg, external: true },
      { label: "LinkedIn", href: links.linkedinOrg, external: true },
    ],
  },
  {
    title: "Founder",
    items: [
      { label: "Arunima on GitHub", href: links.founder.github, external: true },
      { label: "Arunima on LinkedIn", href: links.founder.linkedin, external: true },
      { label: "Contact", href: links.email, external: false },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div aria-hidden className="hairline-gradient absolute inset-x-0 top-0 h-px opacity-60" />
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_2fr]">
        <div>
          {/* The full logo, unmodified; its own dark field blends into the page. */}
          <Image
            src="/brand/invaris-labs-logo.png"
            alt="Invaris Labs"
            width={877}
            height={877}
            sizes="220px"
            className="-mb-8 -ml-7 -mt-10 h-auto w-[220px]"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="eyebrow text-[11px]">{c.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {c.items.map((it) =>
                  <li key={it.label}>
                    {it.external ? (
                      <ExternalLink href={it.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                        {it.label}
                      </ExternalLink>
                    ) : (
                      <a href={it.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                        {it.label}
                      </a>
                    )}
                  </li>,
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-5 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Invaris Labs.</p>
          <p>&quot;Invaris&quot; and &quot;AgentSec&quot; are trademarks of Invaris Labs.</p>
        </div>
      </div>
    </footer>
  );
}
