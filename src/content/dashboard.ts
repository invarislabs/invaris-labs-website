/**
 * AgentSec Dashboard copy and snippets. Everything here is taken from the
 * README of github.com/invarislabs/invaris-agentsec-dashboard. Check new
 * copy against that README so the site never describes a feature that
 * isn't built.
 */

export const uploadCommands = `# create a project and an upload token in the dashboard, then:
export AGENTSEC_TOKEN=asp_...
agentsec test --policy agentsec.yaml
agentsec upload .agentsec/report.json --server http://localhost:8000`;

export const runLocally = `pip install -e ".[dev]"

export AGENTSEC_ENV=development AGENTSEC_DEV_LOGIN=1
export DATABASE_URL=sqlite:///dashboard.db   # or Postgres 14+
export PUBLIC_URL=http://localhost:8000 SECRET_KEY=dev-only-change-me-0123456789-0123456789
alembic upgrade head
uvicorn app.main:create_app --factory --reload`;

export const runDocker = `# Postgres plus the app, development sign-in on
docker compose up --build`;

/** The pipeline from a test run to the hosted views. */
export const pipeline = [
  {
    title: "Test",
    artifact: "agentsec test",
    body: "AgentSec runs its scenarios against your agent and writes `report.json`, in CI or on your machine.",
  },
  {
    title: "Upload",
    artifact: "agentsec upload",
    body: "Or the AgentSec GitHub Action with `dashboard-url` and `dashboard-token`. Branch, commit, CI-run link and label are recorded.",
  },
  {
    title: "Review",
    artifact: "project · run · compare",
    body: "Every run of every agent in one place: findings with evidence, full traces, history, and what changed between any two runs.",
  },
] as const;

export const verdicts = [
  { label: "passed", tone: "text-ok border-ok/40" },
  { label: "findings", tone: "text-sev-critical border-sev-critical/40" },
  { label: "error", tone: "text-fg-muted border-line-strong" },
  { label: "not observable", tone: "text-fg-muted border-line-strong" },
  { label: "inconclusive", tone: "text-brand-cyan border-brand-cyan/40" },
] as const;

export const views = [
  {
    title: "Project page",
    tag: "history",
    body: "The latest run's verdict and how it changed from the run before, a findings-per-run chart by severity (filter by agent and branch), and every run with its CI link.",
  },
  {
    title: "Report views",
    tag: "OWASP ASI01–ASI10",
    body: "Scenario grid by attack category, attack vectors and tools called. Findings with evidence and `agentsec replay` commands, traces as timelines, the policy as run, and MCP scans.",
  },
  {
    title: "Attack goals and timelines",
    tag: "attack_goals",
    body: "For each achieved attack goal: which tool result delivered the payload, and which later tool call achieved the attacker's goal. The trace marks both events.",
  },
  {
    title: "Baseline vs hardened",
    tag: "compare",
    body: "Comparing two runs shows what each measured and every scenario whose verdict changed, so hardening that only stopped the agent reading the poisoned content isn't mistaken for a fix.",
  },
  {
    title: "Download and replay",
    tag: "report.json",
    body: "Download any run's original `report.json` and replay it locally. `agentsec replay` reports each finding as reproduced, not reproduced, inconclusive or error.",
  },
  {
    title: "Upload tokens",
    tag: "asp_…",
    body: "Per-project tokens that can only upload. Shown once, stored as SHA-256 hashes, revocable, with last-used times.",
  },
] as const;

export const securityPoints = [
  ["Report text is treated as hostile", "Inserted as text only, never parsed as HTML, under a strict CSP. Invisible characters and look-alike tool names are made visible."],
  ["Minimal GitHub sign-in", "Only the GitHub id, login, name and avatar are kept. The OAuth access token is used once to read the profile and discarded."],
  ["Signed, HttpOnly session cookies", "State-changing requests must come from the dashboard's own origin. Uploads use bearer tokens, never the cookie."],
  ["Not found and not allowed look the same", "Both return 404 across projects, reports and tokens."],
  ["Gzip bombs are refused", "Uploads may be gzip-compressed; the size limit is enforced after decompression."],
  ["Production refuses weak config", "It won't start with a weak `SECRET_KEY`, with development sign-in enabled, or without GitHub OAuth."],
] as const;

/** Free plan defaults, from `app/plans.py` via the README. */
export const freeLimits = [
  ["Projects per account", "10"],
  ["Runs kept per project", "500"],
  ["Retention", "90 days"],
  ["Largest report (uncompressed)", "25 MB"],
  ["Active upload tokens per project", "10"],
] as const;
