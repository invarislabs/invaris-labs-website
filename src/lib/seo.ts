/**
 * Search and sharing copy for the site, in one place so the <title>, meta
 * description, social cards, structured data and llms.txt stay consistent.
 *
 * Every claim here comes from the AgentSec, AgentAuth and AgentSec Dashboard
 * READMEs (via the content files). Keep it that way: no features, numbers or
 * customers that the projects don't document.
 */
import { links, site } from "@/lib/site";

/** Canonical origin with a trailing slash, as submitted to search engines. */
export const canonicalUrl = `${site.url}/`;

/** ~55 characters so it isn't truncated in results. Keyword first, brand last. */
export const pageTitle = "AI Agent Security Testing & Agent Identity | Invaris Labs";

/** ~150 characters: the length Google shows before cutting off a snippet. */
export const pageDescription =
  "Open-source AI agent security: AgentSec tests agents for prompt injection, tool misuse and MCP poisoning, and AgentAuth gives them verifiable identity.";

/** Shorter line for social cards, where the image already carries the brand. */
export const socialDescription =
  "Open-source tools to test AI agents adversarially before production and give them verifiable identity and scoped authority.";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Invaris Labs: security infrastructure for autonomous AI agents. AgentSec, AgentSec Dashboard and AgentAuth.",
} as const;

/** Meta keywords are ignored by Google but still read by some engines. Kept short and accurate. */
export const keywords = [
  "AI agent security",
  "AI agent security testing",
  "prompt injection testing",
  "MCP security",
  "AI red teaming",
  "adversarial testing for AI agents",
  "OWASP Top 10 for Agentic Applications",
  "agent authentication",
  "agent identity",
  "delegated authorization",
  "AgentSec",
  "AgentAuth",
];

export type ProductSeo = {
  id: "agentsec" | "agentauth" | "dashboard";
  name: string;
  alternateName?: string;
  description: string;
  category: string;
  features: readonly string[];
  requirements: string;
  repo: string;
  license?: string;
  extraSameAs?: readonly string[];
  downloadUrl?: string;
};

const APACHE_2 = "https://www.apache.org/licenses/LICENSE-2.0";

export const productSeo: readonly ProductSeo[] = [
  {
    id: "agentsec",
    name: "AgentSec",
    alternateName: "Invaris AgentSec",
    description:
      "Open-source framework for adversarial security and reliability testing of AI agents. Runs stateful attack scenarios against complete agent workflows (LLMs, retrieval, memory, MCP servers and tools), records the execution trace, and checks every step against a declared security policy.",
    category: "SecurityApplication",
    features: [
      "Direct and indirect prompt injection testing",
      "Tool-output and MCP server poisoning tests",
      "MCP server scanning for poisoned tool descriptions, tool shadowing and rug pulls",
      "Memory poisoning and unsafe retrieved document tests",
      "Unauthorized tool use and action-without-authorization checks",
      "Secret and sensitive-data leakage detection",
      "Multi-agent privilege abuse tests",
      "Findings mapped to the OWASP Top 10 for Agentic Applications (ASI01-ASI10)",
      "CLI, pytest plugin and GitHub Action; reports in JSON, HTML, Markdown and SARIF",
    ],
    requirements: "Python",
    repo: links.agentsec.repo,
    license: APACHE_2,
    extraSameAs: ["https://pypi.org/project/invaris-agentsec/"],
    downloadUrl: "https://pypi.org/project/invaris-agentsec/",
  },
  {
    id: "agentauth",
    name: "AgentAuth",
    description:
      "Cryptographic identity and delegated authorization for AI agents. Each agent gets a self-certifying DID backed by an Ed25519 keypair and signs every request instead of sending an API key; scoped capability grants can be delegated to sub-agents but only narrow.",
    category: "SecurityApplication",
    features: [
      "Self-certifying agent DIDs backed by Ed25519 keys",
      "Signed requests instead of API keys or bearer tokens",
      "Short-lived, scoped capability grants",
      "Delegation chains that only narrow scope, audience, lifetime and limits",
      "Spend, rate, use and resource limits shared across the chain",
      "Cascading revocation, kill switches and key rotation with pre-rotation",
      "CLI, Python SDK and FastAPI integration",
    ],
    requirements: "Python",
    repo: links.agentauth.repo,
  },
  {
    id: "dashboard",
    name: "AgentSec Dashboard",
    description:
      "Open-source hosted dashboard for AgentSec reports. Teams upload the report.json AgentSec writes from CI or their machines and see every run of every agent with findings and evidence, full traces, history across runs and run-to-run comparison.",
    category: "DeveloperApplication",
    features: [
      "Upload AgentSec reports with agentsec upload or the AgentSec GitHub Action",
      "Findings with evidence and agentsec replay commands",
      "Scenario traces and attack-goal timelines",
      "Baseline vs hardened run comparison",
      "Inconclusive scenarios are never counted as passed",
      "Self-hostable with Docker",
    ],
    requirements: "A web browser. Self-hosting needs Docker, or Python 3.11+ with Postgres 14+ (SQLite for a quick look).",
    repo: links.dashboard.repo,
    license: APACHE_2,
  },
];
