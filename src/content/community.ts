/**
 * Public questions and comments about AgentSec, quoted verbatim from the
 * launch thread on X and the comments on the "Allowed Isn't Authorized" post.
 * Keep quotes word for word and link each one to where it was posted.
 *
 * Order matters: the carousel shows the first entries first, so put the
 * strongest exchanges at the top.
 */

export const sources = {
  x: {
    label: "Launch thread on X",
    href: "https://x.com/arunimastwt/status/2108250243108384808",
  },
  hashnode: {
    label: "Comments on “Allowed Isn't Authorized”",
    href: "https://arunima-chaudhuri.hashnode.dev/allowed-isn-t-authorized-testing-what-your-ai-agent-does-with-the-permissions-it-already-has",
  },
} as const;

export type Platform = keyof typeof sources;

/**
 * A post that resonated, shown above the carousel. Engagement numbers are a
 * snapshot: update them (and `asOf`) together, never one without the other.
 */
export const highlight = {
  href: "https://x.com/arunimastwt/status/2108714123060281473",
  author: { name: "Arunima Chaudhuri", handle: "@arunimastwt" },
  postedOn: "10 Oct 2026",
  text: [
    "The scariest AI agent attack? One where nothing gets hacked.",
    "No stolen credentials. No broken permissions.",
    "Just an AI agent using tools it's already allowed to access — to do something it shouldn't.",
    "That's what we're testing with AgentSec.",
  ],
  asOf: "11 Oct 2026",
  stats: [
    { label: "Bookmarks", value: "31", emphasis: true },
    { label: "Views", value: "1,576" },
    { label: "Likes", value: "32" },
    { label: "Reposts", value: "5" },
  ],
} as const;

export type Thread = {
  platform: Platform;
  /** Short label for what the exchange is about. */
  topic: string;
  author: { name: string; handle?: string };
  text: string;
  /** Arunima's reply, if the exchange includes one worth showing. */
  reply?: string;
  /** Direct link to this exchange, if it lives outside the platform's main thread. */
  href?: string;
};

export const threads: readonly Thread[] = [
  {
    platform: "x",
    topic: "Evidence & replay",
    author: { name: "DVARA", handle: "@dvarahq" },
    text: "Nice, testing agents the way an attacker would is overdue. One request: tag each finding with the tool call and arguments that triggered it. That turns a failed test into a rule you can enforce at the call, and lets you re-run to prove the fix holds.",
    reply:
      "It already does. Every finding carries the exact trace events behind it: tool name, arguments, sequence number. `agentsec replay` re-runs just that finding against the fixed agent to prove the fix holds. Enforcing it at call time is the runtime half we're prototyping now.",
  },
  {
    platform: "x",
    topic: "Correct tool, wrong intent",
    author: { name: "Animesh Shaw", handle: "@animesh_infosec" },
    text: "This is the category classic threat modeling completely misses — CVE-style frameworks assume the vulnerability is in the code, not in a decision the agent was authorized to make. ‘Correct tool, wrong intent’ isn’t a permissions bug, RBAC can’t see it.",
    reply:
      "Exactly. The tool call is valid, the permission exists, the code has no bug. What’s wrong is that this task never authorized it. You can only catch that by comparing what the agent did against what the user actually asked for, per task, not per role.",
    href: "https://x.com/animesh_infosec/status/2108920682344227060",
  },
  {
    platform: "x",
    topic: "Multi-agent delegation",
    author: { name: "Harley Lewis Foote", handle: "@harleyfoote_" },
    text: "mcp attacks are basically confused deputy again, server trusts the client, client trusts the agent, agent gets owned. does it test permissions across that whole chain or just per tool",
    reply:
      "Across the chain. AgentSec 0.7 records who acted and who delegated (including MCP clientInfo), then checks that authority only narrows as it's handed down. A planner can't launder a forbidden call through an executor. Confused deputy is one of the test cases.",
  },
  {
    platform: "hashnode",
    topic: "Not observable ≠ pass",
    author: { name: "Salman Parvez" },
    text: "“When a scenario can't be judged, it isn't a pass” is the line that stuck with me. I'd want the same rule for records: an entry nobody could judge carries that state, it doesn't default to green. I also like that question five asks on whose authority, not only which agent.",
    reply:
      "Yeah, exactly. If something can't be judged, that should stay visible instead of quietly turning into “safe.” And I agree — knowing whose authority the agent acted on matters just as much as knowing which agent acted.",
  },
  {
    platform: "hashnode",
    topic: "Task intent",
    author: { name: "Kartik N V J K" },
    text: "Allowed is not authorized is the right distinction, and the yes-or-no question that turned into a commit is the perfect origin story: the agent held the tool rights but had no authorization for that effect. The five authority questions are what an allowlist structurally cannot answer. When you check 'did the task authorize this effect', how do you represent the task's intent so tool_effects can be matched against it?",
    reply:
      "Great question, Kartik! The idea is to capture the user's original request as the source of authority, then evaluate tool effects against what that request actually permits — not just which tools the agent can access. The tricky part is translating natural-language intent into explicit constraints without assuming permissions the user never granted. That's one of the problems I'm exploring with AgentSec!",
  },
  {
    platform: "x",
    topic: "Per-hop audit",
    author: { name: "AXIALIS | Desktop App Tools", handle: "@AxialisSoftware" },
    text: "Does the audit show which hop narrowed the scope, or only the final effective authority?",
    reply:
      "Per hop. The finding names the agent in the chain that lacked the authority, the effects it was missing, and the full path (planner -> researcher -> executor). Every trace event also carries actor + delegated_by, so you can audit each hand-off.",
  },
  {
    platform: "x",
    topic: "Verifying a fix",
    author: { name: "Spoorthi", handle: "@spoorthiv20" },
    text: "Can you replay a captured attack after changing the agent permissions? That would make it easier to tell whether the fix actually closes the hole.",
    reply:
      "Yes, that's exactly what `agentsec replay` does. Change the permissions, point it at the new policy, and each finding comes back REPRODUCED or NOT REPRODUCED. `agentsec compare` diffs two full runs, so you can gate CI on it.",
  },
];
