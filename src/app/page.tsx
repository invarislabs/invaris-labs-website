import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/ui/client";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { AgentSec } from "@/components/sections/agentsec";
import { AgentAuth } from "@/components/sections/agentauth";
import { Dashboard } from "@/components/sections/dashboard";
import { SecurityStack } from "@/components/sections/stack";
import { Writing } from "@/components/sections/writing";
import { Community } from "@/components/sections/community";
import { Faq } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { Founder } from "@/components/sections/founder";
import { OpenSource } from "@/components/sections/open-source";
import { JsonLd } from "@/components/seo/json-ld";
import { homeStructuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-fg px-4 py-2 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div id="top" />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Products />
        <AgentSec />
        <AgentAuth />
        <Dashboard />
        <SecurityStack />
        <Writing />
        <Community />
        <Faq />
        <About />
        <Founder />
        <OpenSource />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
