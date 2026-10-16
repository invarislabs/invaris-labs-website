/**
 * Frequently asked questions, shown in the FAQ section and published as
 * FAQPage structured data. Answers are written from the AgentSec, AgentAuth
 * and AgentSec Dashboard READMEs; the visible text and the structured data
 * come from this one list, so they can't disagree.
 *
 * Backticks mark inline code. They're rendered as <code> on the page and
 * removed in structured data.
 */

export type Faq = { id: string; question: string; answer: string };

export const faqs: readonly Faq[] = [
  {
    id: "what-is-invaris-labs",
    question: "What is Invaris Labs?",
    answer:
      "Invaris Labs builds open-source security infrastructure for autonomous AI agents: AgentSec for adversarial security and reliability testing, the AgentSec Dashboard for keeping every test run and its evidence in one place, and AgentAuth for cryptographic agent identity and delegated authorization.",
  },
  {
    id: "what-is-agentsec",
    question: "What is AgentSec?",
    answer:
      "AgentSec is an open-source Python framework for testing AI agents adversarially. It runs stateful attack scenarios against a complete agent workflow (the LLM, retrieval, memory, MCP servers, tools and sensitive actions), records the execution trace, and checks every step against a security policy you declare in `agentsec.yaml`. Install it with `pip install invaris-agentsec`.",
  },
  {
    id: "what-does-agentsec-test",
    question: "Which AI agent security risks does AgentSec test for?",
    answer:
      "Direct and indirect prompt injection, tool-output and MCP-server poisoning, unsafe retrieved documents, memory poisoning, unauthorized tool use, actions the task never authorized, dangerous tool chains, identity and session confusion, multi-agent privilege abuse, secret and sensitive-data leakage, loops and budget overruns, deceptive action reports, and behavioural regressions between runs. Findings are mapped to the OWASP Top 10 for Agentic Applications (ASI01–ASI10).",
  },
  {
    id: "red-teaming",
    question: "Is AgentSec an AI red-teaming or penetration-testing tool?",
    answer:
      "It automates the adversarial part. AgentSec plays the attacker against your agent with seeded, reproducible scenarios and judges the outcome with deterministic checks against your policy, so the same attacks can run in CI on every pull request. It is a framework you run yourself, not a hosted or manual penetration-testing service.",
  },
  {
    id: "mcp-security",
    question: "How does AgentSec test MCP servers?",
    answer:
      "In two ways. `agentsec mcp scan` lists a server's tools, resources and prompts without calling them and flags poisoned tool descriptions, hidden characters, tool shadowing, homoglyph tool names, misleading annotations, forbidden or unlisted tools, and rug pulls. `agentsec test --mcp-listen` makes AgentSec the MCP server your agent connects to, so attack scenarios arrive through MCP tool results.",
  },
  {
    id: "ci",
    question: "How does AgentSec run in CI?",
    answer:
      "AgentSec is CI-first. It exits with code 1 on findings and 2 on configuration errors, `--seed` makes runs reproducible, and `agentsec compare` diffs reports across pull requests. It ships a pytest plugin and a packaged GitHub Action, and writes SARIF for GitHub Code Scanning alongside terminal, JSON, HTML and Markdown reports.",
  },
  {
    id: "local",
    question: "Does AgentSec send my agent's traces to a hosted service?",
    answer:
      "No. AgentSec runs locally by default, so private traces stay on your machine. Uploading a report to the AgentSec Dashboard is a separate, explicit step with `agentsec upload`.",
  },
  {
    id: "what-is-agentauth",
    question: "What is AgentAuth?",
    answer:
      "AgentAuth provides cryptographic identity and delegated authorization for AI agents. Each agent gets a self-certifying DID backed by an Ed25519 keypair and signs every request. Short-lived capability grants say what it may do; an agent can delegate a narrower grant to a sub-agent, and a service can verify the whole chain without trusting the registry.",
  },
  {
    id: "api-keys",
    question: "Why not just give AI agents API keys?",
    answer:
      "Shared secrets leak through logs, prompts and tool output, and a leaked key can be replayed anywhere. With AgentAuth the private key never leaves the agent: each request carries a signature bound to its method, path, body, audience, a timestamp and a single-use nonce. Delegated grants can only narrow, revocation cascades down the chain, and an optional human or organization controller holds a kill switch.",
  },
  {
    id: "what-is-dashboard",
    question: "What is the AgentSec Dashboard?",
    answer:
      "A hosted dashboard for AgentSec reports. Teams upload the `report.json` AgentSec writes from CI or their machines and see every run of every agent in one place: findings with their evidence, full traces, history across runs, and what changed between any two runs. Its code is open source and it can be self-hosted with Docker.",
  },
  {
    id: "open-source",
    question: "Are the tools open source?",
    answer:
      "Yes. AgentSec, AgentAuth and the AgentSec Dashboard are developed in the open on GitHub under the invarislabs organization. AgentSec and the AgentSec Dashboard are licensed under Apache-2.0.",
  },
];

/** Plain text for structured data: inline-code backticks removed. */
export function faqPlainText(text: string): string {
  return text.replace(/`([^`]+)`/g, "$1");
}
