import { faqs } from "@/content/faq";
import { Inline } from "@/components/ui/inline";
import { Container, SectionHeader } from "@/components/ui/primitives";

/**
 * Frequently asked questions. Native <details> keeps the section short
 * without JavaScript, and the answers stay in the HTML for search engines
 * and assistive technology. The same list is published as FAQPage
 * structured data (see src/lib/structured-data.ts).
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="faq-title"
              label="FAQ"
              title="AI agent security, answered."
              lead="What AgentSec, AgentAuth and the AgentSec Dashboard do, what they test, and how they fit into the way you already build agents."
            />
          </div>

          <div className="reveal divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900/40">
            {faqs.map((f) => (
              <details key={f.id} id={`faq-${f.id}`} className="group scroll-mt-24">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 transition-colors hover:bg-ink-900/70 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-medium leading-snug text-fg sm:text-base">{f.question}</h3>
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M6 2v8M2 6h8" />
                    </svg>
                  </span>
                </summary>
                <p className="-mt-1 px-5 pb-6 text-[15px] leading-relaxed text-fg-muted sm:px-6">
                  <Inline text={f.answer} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
