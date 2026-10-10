/**
 * Single source of truth for site-wide constants and outbound links.
 * Every URL here was checked against the project READMEs, the GitHub
 * organisation page, or the founder's public profiles.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Invaris Labs",
  tagline: "Security infrastructure for autonomous AI agents.",
  description:
    "Invaris Labs builds open-source security infrastructure for autonomous AI agents: AgentSec for adversarial security and reliability testing, and AgentAuth for cryptographic agent identity and delegated authorization.",
  url: resolveSiteUrl(),
  /** True once a real public URL is configured (canonical tags are only emitted then). */
  hasPublicUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL),
} as const;

const AGENTSEC = "https://github.com/invarislabs/invaris-agentsec";
const AGENTAUTH = "https://github.com/invarislabs/agent-auth";

export const links = {
  githubOrg: "https://github.com/invarislabs",
  xOrg: "https://x.com/InvarisLabs",
  linkedinOrg: "https://www.linkedin.com/company/invarislabs",
  email: "mailto:arunimachaudhuri2020@gmail.com",

  agentsec: {
    repo: AGENTSEC,
    docs: `${AGENTSEC}/blob/main/docs/README.md`,
    mcp: `${AGENTSEC}/blob/main/docs/mcp-testing.md`,
    githubActions: `${AGENTSEC}/blob/main/docs/github-actions.md`,
    multiAgent: `${AGENTSEC}/blob/main/docs/multi-agent.md`,
    contributing: `${AGENTSEC}/blob/main/CONTRIBUTING.md`,
    security: `${AGENTSEC}/blob/main/SECURITY.md`,
    issues: `${AGENTSEC}/issues`,
    owasp:
      "https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/",
  },

  agentauth: {
    repo: AGENTAUTH,
    why: `${AGENTAUTH}/blob/main/docs/why.md`,
    architecture: `${AGENTAUTH}/blob/main/docs/architecture.md`,
    protocol: `${AGENTAUTH}/blob/main/docs/protocol.md`,
    threatModel: `${AGENTAUTH}/blob/main/docs/threat-model.md`,
    roadmap: `${AGENTAUTH}/blob/main/docs/roadmap.md`,
    issues: `${AGENTAUTH}/issues`,
  },

  founder: {
    github: "https://github.com/tinniaru3005",
    linkedin: "https://www.linkedin.com/in/arunima-chaudhuri/",
    x: "https://twitter.com/arunimastwt",
    blog: "https://arunima-chaudhuri.hashnode.dev",
  },
} as const;

export const nav = [
  { label: "Products", href: "#products" },
  { label: "AgentSec", href: "#agentsec" },
  { label: "AgentAuth", href: "#agentauth" },
  { label: "Writing", href: "#writing" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
] as const;
