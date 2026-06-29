# dev.to article

Title:
I built an open-source CLI to add safety tests to AI apps and agents

---

AI applications are shifting from text generation to tool-using agents.
Agents can read emails, call APIs, update records, and make decisions.
That shift means safety can no longer be a one-time checklist or a manual review.

I built SafeAgentKit to give teams repeatable, CI-friendly safety tests for AI apps and agents.

## Why AI apps need safety tests

The old flow:
- Prompt -> LLM -> answer
- Test: “Does the answer look correct?”

The new flow:
- Prompt -> Agent -> Tool call -> Action -> Answer
- Test: “Does it keep secrets? Does it obey policy? Does it refuse dangerous actions?”

LLMs are powerful, but they are also easy to jailbreak, leak data, or comply with unsafe requests.
Production AI apps need tests that run on every build, not just demos.

## What SafeAgentKit does

SafeAgentKit is a Node.js / TypeScript CLI.
It evaluates an AI app against a YAML safety policy using built-in and custom tests.

What it checks:
- Prompt injection
- Privacy leaks
- Unsafe advice (medical, legal, financial, high-impact decisions)
- Crisis and minor safety
- Tool misuse
- Unauthorized actions
- Transparency

You can run tests against:
- local mock targets
- real endpoints
- conversational agents

Outputs include:
- JSON reports
- HTML reports
- SVG safety badges
- pass/fail thresholds for CI

## Install

```bash
npm install -g safeagentkit
```

Initialize:
```bash
safeagent init
```

Test:
```bash
safeagent test safeagent.yaml --fail-threshold 80
```

Badge:
```bash
safeagent badge safeagent-report.json --output safeagent-badge.svg
```

## YAML config example

```yaml
app:
  name: "My AI App"
  type: "chatbot"
  audience: "general"

risk_level: "medium"

endpoint:
  url: "http://localhost:3000/api/chat"
  method: "POST"
  message_field: "message"
  response_path: "response"

policies:
  must:
    - protect_user_privacy
    - ask_for_confirmation_before_high_impact_actions
  must_not:
    - reveal_system_prompt_or_secrets
    - disclose_other_user_data
```

## Report example

After tests run, SafeAgentKit produces:
- `safeagent-report.json`
- `safeagent-report.html`

You can review the HTML with your team or attach it to PRs and tickets.

## Current limitations

- Rule-based evaluator only; LLM-as-judge is planned.
- Web dashboard and hosted history are not yet available.
- Templates cover common categories, but domain-specific policies still need manual tuning.

## Roadmap

- LLM-as-judge evaluator
- Web dashboard
- Scheduled tests
- Public hosted safety badge
- Industry policy packs marketplace

## Feedback request

I’m looking for feedback from:
- teams shipping AI apps
- indie hackers building AI products
- open-source maintainers who add safety gates
- security and QA engineers

What test categories matter most to you?
What would make this worth adding to your CI?

Repo:
https://github.com/quanta-tect/SafeAgentKit

npm:
https://www.npmjs.com/package/safeagentkit

Landing:
https://quanta-tect.github.io/SafeAgentKit/
