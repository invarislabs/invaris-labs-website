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

export type Thread = {
  platform: Platform;
  /** Short label for what the exchange is about. */
  topic: string;
  author: { name: string; handle?: string };
  text: string;
  /**
   * Arunima's reply, if the exchange includes one worth showing. Separate
   * paragraphs with a blank line; lines starting with "- " render as a list.
   */
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
    platform: "hashnode",
    topic: "Inconclusive ≠ pass",
    author: { name: "Kartik N V J K" },
    text: "The read_inbox trace is the scariest kind of green: the poisoned body was never fetched because the agent never called open_email, and it still counted as a pass. I've seen the same thing in my own evals where a RAG agent never retrieved the adversarial doc and the score looked like resistance. Splitting that into inconclusive feels right. How do you keep teams from reading a pile of inconclusives as passes on dashboards?",
    reply:
      "Agreed, a run that never fetched the poisoned body is the scariest kind of green. A few rules, all in one shared module so the CLI, compare and both dashboards can’t drift apart:\n\n- The finding rate is calculated over tested scenarios only. If nothing was tested, it’s null, not 0%.\n- Coverage (tested / total) sits right next to it, so “0 findings, 20% coverage” reads as “we barely measured,” not “safe.”\n- A run with inconclusive scenarios is never labelled “all passed,” and the CLI prints a warning that N scenarios were inconclusive, not passed.\n- In compare, a finding is never called “fixed” if that scenario was inconclusive in the newer run. Not reaching the poisoned doc doesn’t count as a fix.\n\nIf you’d like to try it on your RAG evals, I’d love to know whether the delivery tracking catches your case: github.com/invarislabs/invaris-agentsec",
    href: "https://hashnode.com/posts/the-agent-never-opened-the-email-engineering-test-verdicts-that-know-what-the-agent-actually-saw/6acd2d8da159f761e244e51b/comment/6ace618946d7036803872ec7",
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
    topic: "Exposure vs. ordering",
    author: { name: "Adam Lewis" },
    text: "Exposure tracking and causal ordering both have to line up before the inconclusive status can be attached to anything. Exposure tracking gets you the first half and causal ordering the second. Can the two disagree, and what does the harness report when they do? If the ordering is reconstructed from the agent's own logs, the verdict inherits whatever the agent decided to record, which is the same trust problem the verdict is meant to solve.",
    reply:
      "Good question. In the default setup they can’t disagree, because they come from the same place. AgentSec runs the simulated tools itself, so it is the one that serves the poisoned email. Exposure is the harness’s own record of the tool result that carried the injection, and every event gets one sequence number from the harness. A finding needs a goal-matching call with a higher sequence number than delivery, and calls before delivery don’t count. Nothing is rebuilt from the agent’s logs.\n\nYour concern does apply to agents that run their own tools and report them back to us. Then the trace is the agent’s account, and the verdict inherits whatever it chose to record. Those events are flagged `executed_by_agent` in the report, but flagging isn’t verification. The real fix is observing independently, below the agent: for example, logging network egress per test case. That’s on the roadmap.",
    href: "https://hashnode.com/posts/the-agent-never-opened-the-email-engineering-test-verdicts-that-know-what-the-agent-actually-saw/6acd2d8da159f761e244e51b/comment/6ace98180cb76c6fa8f2a8de",
  },
  {
    platform: "x",
    topic: "Names the call, not a banner",
    author: { name: "剑的 AI 实验室", handle: "@swordBluesy" },
    text: "Catching an agent doing something I never asked only counts if the report names the tool call. I will look for that call, not a warning banner.",
    reply:
      "Fully agree. Happy to have you try to break it. AgentSec reports the offending call itself, not a warning. If you find a case where it flags without naming the call, I’d treat that as a bug.",
    href: "https://x.com/swordBluesy/status/2109297972219658649",
  },
  {
    platform: "x",
    topic: "Injection from pages & email",
    author: { name: "Wyatt Brocato", handle: "@thewyattbrocato" },
    text: "most of the nasty stuff doesn't come thru the chat box either, it's hidden in the page or email the agent reads mid-task. does it cover that?",
    reply:
      "Yep. Indirect injection and tool-output poisoning are their own attack categories, plus checks for untrusted content getting executed or used to leak private data. Anything a tool returns (page, email) is untrusted. Dedicated inbox/browser pack is next.",
    href: "https://x.com/thewyattbrocato/status/2109312921746698488",
  },
  {
    platform: "hashnode",
    topic: "Null, not 0.0",
    author: { name: "Salman Parvez" },
    text: "Giving \"not measured\" its own value all the way to the last consumer is the part I'd copy. A finding rate of null reads as no measurement, where 0.0 reads as perfect. We label figures the same way at ML Systems up in Rhode Island: measured, modeled, or aspirational.",
    reply:
      "Thanks Salman, that’s exactly the reasoning. A 0.0 that really means “we never checked” is worse than no number, because it looks like proof. Your measured / modeled / aspirational split is a nice way to put it, and I like that it makes the confidence visible right next to the figure.\n\nAgentSec is open source if you’d like to try it: GitHub. If you have agents in your stack at ML Systems, I’d love to hear what it catches and what it misses. And if you find it useful, a star helps more people find it.",
    href: "https://hashnode.com/posts/the-agent-never-opened-the-email-engineering-test-verdicts-that-know-what-the-agent-actually-saw/6acd2d8da159f761e244e51b/comment/6acd578b52d15945e868bb8f",
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
