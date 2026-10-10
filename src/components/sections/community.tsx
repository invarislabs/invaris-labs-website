import { highlight, sources, threads, type Platform } from "@/content/community";
import { cx } from "@/components/ui/primitives";
import { ArrowUpRight, XIcon } from "@/components/ui/icons";
import { Inline } from "@/components/ui/inline";
import { Carousel } from "@/components/ui/carousel";
import { Container, ExternalLink, SectionHeader } from "@/components/ui/primitives";

const platformName: Record<Platform, string> = { x: "X", hashnode: "Hashnode" };

function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-0.5 font-mono text-[10.5px] text-fg-subtle">
      {platform === "x" ? (
        <>
          <XIcon className="size-3" />
          <span className="sr-only">{platformName[platform]}</span>
        </>
      ) : (
        <>
          <span aria-hidden className="font-sans font-bold">#</span>
          {platformName[platform]}
        </>
      )}
    </span>
  );
}

export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="relative scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="community-title"
            label="Community"
            title="Questions from people building agents."
            lead="Developers asked hard questions about AgentSec when it launched. Here they are, word for word, with the answers."
          />
          <ul className="reveal flex flex-col gap-2 text-sm lg:items-end">
            {(Object.keys(sources) as Platform[]).map((p) => (
              <li key={p}>
                <ExternalLink
                  href={sources[p].href}
                  className="inline-flex items-center gap-1.5 font-medium text-fg-muted hover:text-fg"
                >
                  {sources[p].label} <ArrowUpRight className="size-3.5" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>


        <figure className="reveal mt-14 grid gap-8 rounded-2xl border border-line bg-gradient-to-br from-ink-900 to-ink-950 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan/90">
              <XIcon className="size-3" />
              <span>Post that resonated</span>
            </div>
            <blockquote cite={highlight.href} className="mt-4 space-y-2">
              <p className="text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">{highlight.text[0]}</p>
              {highlight.text.slice(1).map((line) => (
                <p key={line} className="leading-relaxed text-fg-muted">
                  {line}
                </p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-sm text-fg-muted">
              {highlight.author.name}
              <span className="ml-1.5 font-mono text-[12px] text-fg-subtle">{highlight.author.handle}</span>
              <span className="text-fg-subtle"> · {highlight.postedOn}</span>
            </figcaption>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {highlight.stats.map((st) => (
                <div
                  key={st.label}
                  className={cx("bg-ink-950 p-4 sm:p-5", "emphasis" in st && st.emphasis && "bg-brand-cyan/[0.06]")}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{st.label}</dt>
                  <dd
                    className={cx(
                      "mt-1 text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
                      "emphasis" in st && st.emphasis ? "text-brand-cyan" : "text-fg",
                    )}
                  >
                    {st.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-fg-subtle">
              <span>As of {highlight.asOf}</span>
              <ExternalLink href={highlight.href} className="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
                View post on X <ArrowUpRight className="size-3.5" />
              </ExternalLink>
            </p>
          </div>
        </figure>

        <div className="reveal mt-10">
          <Carousel
            label="Community questions about AgentSec"
            slides={threads.map((t) => (
              <article key={t.author.name} className="flex w-full flex-col rounded-2xl border border-line bg-ink-900/40 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan/90">{t.topic}</p>
                    <PlatformBadge platform={t.platform} />
                  </div>

                  <figure className="mt-5">
                    <blockquote cite={t.href ?? sources[t.platform].href} className="text-[15px] leading-relaxed text-fg">
                      <p>{t.text}</p>
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-fg-muted">
                      {t.author.name}
                      {t.author.handle && <span className="ml-1.5 font-mono text-[12px] text-fg-subtle">{t.author.handle}</span>}
                    </figcaption>
                  </figure>

                  {t.reply && (
                    <figure className="mt-5 border-l border-brand-violet/40 pl-4">
                      <blockquote cite={t.href ?? sources[t.platform].href} className="text-sm leading-relaxed text-fg-muted">
                        <p>
                          <Inline text={t.reply} />
                        </p>
                      </blockquote>
                      <figcaption className="mt-2 font-mono text-[11px] text-fg-subtle">Arunima Chaudhuri · reply</figcaption>
                    </figure>
                  )}

                  <div className="mt-auto pt-6">
                    <ExternalLink
                      href={t.href ?? sources[t.platform].href}
                      className="inline-flex items-center gap-1 text-[13px] text-fg-subtle hover:text-fg"
                    >
                      View on {platformName[t.platform]} <ArrowUpRight className="size-3.5" />
                    </ExternalLink>
                  </div>
              </article>
            ))}
          />
        </div>
      </Container>
    </section>
  );
}
