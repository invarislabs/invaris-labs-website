import { Container, SectionHeader } from "@/components/ui/primitives";

const capabilities = [
  ["read", "sensitive data"],
  ["invoke", "tools"],
  ["call", "APIs"],
  ["modify", "systems"],
  ["delegate", "work to sub-agents"],
  ["message", "other agents"],
  ["perform", "actions with real consequences"],
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              id="about-title"
              label="About Invaris Labs"
              title="A new execution model needs its own security infrastructure."
            />
            <div className="reveal mt-6 max-w-xl space-y-4 text-pretty leading-relaxed text-fg-muted sm:text-lg">
              <p>
                Traditional software follows execution paths someone wrote down. Agents interpret untrusted
                input, choose their own tools, retain memory and make decisions at runtime. A single poisoned
                document or tool response can change what they do.
              </p>
              <p>
                Invaris Labs is building security infrastructure for that model: open, testable and verifiable
                without asking anyone to trust a black box.
              </p>
            </div>
          </div>

          <figure className="reveal self-center" aria-labelledby="about-cap">
            <figcaption id="about-cap" className="eyebrow mb-4 text-[11px]">
              Agents are increasingly able to
            </figcaption>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900/40">
              {capabilities.map(([verb, obj], i) => (
                <li key={verb} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="w-6 font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="w-20 font-mono text-[13px] text-brand-cyan">{verb}</span>
                  <span className="text-[15px] text-fg">{obj}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </Container>
    </section>
  );
}
