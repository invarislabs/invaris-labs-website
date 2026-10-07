/**
 * Articles shown in the Writing section, newest first.
 * Descriptions are written from the articles themselves, so check them
 * against the published post when you edit one.
 */

export type Article = {
  /** Short label shown above the title, e.g. "Guide", "Essay", "Research". */
  kind: string;
  title: string;
  description: string;
  topics: readonly string[];
  href: string;
};

export const articles: readonly Article[] = [
  {
    kind: "Research",
    title: "What Does a Passing Agent Security Test Actually Prove?",
    description:
      "A research note on what an AgentSec pass is made of. Runs against seven frameworks, two memory stores and the Claude Code CLI show five ways to pass without the agent resisting anything, and why passes need the same evidence findings get.",
    topics: ["Observability", "Harness validity", "Evaluator precision"],
    href: "https://arunima-chaudhuri.hashnode.dev/what-does-a-passing-agent-security-test-actually-prove",
  },
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
];

/** The research note on false passes, linked from the AgentSec section. */
export const passResearchHref = articles[0].href;
