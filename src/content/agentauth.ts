/**
 * AgentAuth content. Snippets are copied verbatim from the AgentAuth README.
 */

export const exampleDid = "did:agent:QmfJZCnucexGhSZqdsAcKnFcv4RxyhPFMUiGjQmDRiMxux";

export const authHeader = `Authorization: AgentSig did="…",kid="…#key-1",aud="api.example.com",ts="…",nonce="…",sig="…"`;

export const flowSteps = [
  {
    title: "Agent identity",
    artifact: "did:agent:Qm…",
    body: "A self-certifying DID derived from the agent's own Ed25519 key material and signed inception event. The registry can't mint or reassign it.",
  },
  {
    title: "Signed request",
    artifact: "Authorization: AgentSig …",
    body: "Every request is signed over method, path, body, audience, timestamp and a single-use nonce. No API key or bearer token crosses the wire.",
  },
  {
    title: "Scoped authority",
    artifact: "AgentGrant",
    body: "A short-lived capability grant: `iss` lets `sub` do `scope` at `aud` until `exp`. Default 15 minutes, maximum 24 hours.",
  },
  {
    title: "Delegation",
    artifact: "scope ⊆ parent · depth − 1",
    body: "An agent can pass a narrower slice to a sub-agent. Scopes, audiences, validity windows and limits only shrink.",
  },
  {
    title: "Verification",
    artifact: "root_policy",
    body: "The service checks every link, that the leaf signed the request, that the root is a principal it trusts, and that nothing is revoked.",
  },
] as const;

export const apiKeyComparison = [
  [
    "Shared secrets leak through logs, prompts and tool output",
    "Private key never leaves the agent; requests carry signatures",
  ],
  [
    "A leaked key can be replayed anywhere, forever",
    "Signatures are bound to method, path, body, audience (host), a timestamp and a single-use nonce",
  ],
  [
    "Identity = whatever the issuer's database says",
    "DID is derived from the agent's own key material; the registry can't mint or reassign it",
  ],
  [
    "Rotation means coordinating a new secret everywhere",
    "Rotate with one call; relying parties pick up the new key automatically",
  ],
  [
    "Stolen key = full takeover",
    "Pre-rotation: the next key is committed in advance, so the current key alone can't rotate the identity",
  ],
  [
    "No link between an agent and who's responsible for it",
    "Optional controller (a human or org DID) countersigns the agent's creation and holds a kill switch",
  ],
] as const;

export const verificationChecks = [
  ["Every link is signed by its issuer's current key", "No forged or stale grants"],
  ["Each issuer is the previous link's subject", "The chain is unbroken"],
  ["Scopes, audiences and validity only shrink; depth strictly decreases", "Delegation can't escalate"],
  ["The leaf's subject is the agent that signed the request", "A stolen grant is useless to anyone else"],
  ["The request signature covers the AgentGrant header", "The agent asserts which authority it's using"],
  ["The root issuer is a principal the service trusts", "The service decides whose word counts"],
  ["Nothing in the chain is deactivated or revoked", "Revocation and kill switches cascade"],
] as const;

export const limitsTable = [
  ["resources", "What the call may touch: an exact pattern, or a prefix ending in `*`", "Per call"],
  ["spend.per_call", "Max amount for one call", "Per call"],
  ["spend.total", "Max amount across all calls under this grant", "Shared ledger"],
  ["rate", "Max `count` calls per `per` seconds (sliding window)", "Shared ledger"],
  ["uses", "Max total calls", "Shared ledger"],
] as const;

export const cliGrants = `agentauth serve &                                            # registry :8000
agentauth init arunima
agentauth init researcher --controller arunima
agentauth init summarizer --controller researcher

# arunima → researcher (may delegate once) → summarizer (search only)
agentauth grant arunima researcher --scope 'tools.*' --aud 127.0.0.1:9000 --depth 1 -o researcher.grant
agentauth grant researcher summarizer --scope tools.search --aud 127.0.0.1:9000 \\
          --parent researcher.grant -o summarizer.grant
agentauth inspect summarizer.grant

# Revoke the root grant; the summarizer loses access too
agentauth revoke arunima <grant-id-from-inspect>

# Limits: a 50 USD budget (max 20 USD per call, 10 calls/min) that can be split once
agentauth grant arunima shopper --scope 'payments.*' --aud 127.0.0.1:9000 --depth 1 \\
          --budget 5000 --per-call 2000 --rate 10/60 -o pay.grant
agentauth grant shopper helper --scope payments.buy --aud 127.0.0.1:9000 \\
          --budget 3000 --parent pay.grant -o helper.grant       # --budget 9000 would be refused`;

export const cliIdentity = `agentauth serve --db agentauth.db &     # registry on 127.0.0.1:8000

agentauth init arunima --meta kind=human                  # a human principal
agentauth init researcher --controller arunima \\
                          --meta model=claude             # an agent she owns
agentauth whoami researcher             # authenticated call, signed with the agent's key
agentauth rotate researcher             # move to the pre-committed key
agentauth resolve did:agent:… --verify  # replay the full log locally
agentauth agents arunima                # everything arunima controls
agentauth deactivate did:agent:… --as arunima             # kill switch`;

export const pyDelegate = `from agentauth import Limits

root  = human.grant(researcher.did, ["tools.*"], ["tools.example.com"], ttl=900, depth=1,
                    limits=Limits.build(resources=["repo:acme/*"], rate=(30, 60)))
chain = researcher.grant(summarizer.did, ["tools.search"], ["tools.example.com"], parent=root,
                         limits=Limits.build(resources=["repo:acme/website"], uses=20))

httpx.post("https://tools.example.com/search", json={"q": "…"}, auth=summarizer.httpx_auth(chain))
reg.revoke_grant(human, root.leaf.id)   # summarizer is cut off too`;

export const pyService = `from agentauth import GrantVerifier, RegistryRevocationChecker, trust_principals
from agentauth.integrations import fastapi_authorizer

reg  = RegistryClient("https://registry.example.com")
keys = RegistryKeyResolver(reg, ttl=30)
require = fastapi_authorizer(
    RequestVerifier(keys, audiences={"tools.example.com"}),
    GrantVerifier(keys,
                  root_policy=trust_principals({ORG_DID: ["tools.*"]}),
                  revoked=RegistryRevocationChecker(reg, ttl=5)),
)

@app.post("/search")
def search(body: dict, agent = Depends(require("tools.search"))):
    return {"caller": agent.did, "on_behalf_of": agent.principal, "chain": agent.via}`;

export const limitsJson = `"limits": {
  "resources": ["/reports/*", "repo:acme/website"],
  "spend":     {"unit": "USD-cents", "per_call": 2000, "total": 5000},
  "rate":      {"count": 10, "per": 60},
  "uses":      100
}`;
