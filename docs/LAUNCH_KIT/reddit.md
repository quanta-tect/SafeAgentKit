# Reddit posts (build-in-public / feedback-seeking)

## Variant A — r/SideProject

Title:
I built an open-source CLI for AI safety testing (prompt injection, privacy leaks, unsafe advice)

Body:
I’ve been working on SafeAgentKit, a small CLI that lets you add safety tests to AI apps and agents.

Why:
My own apps started calling tools and updating data. I wanted something like unit tests, but for safety.

It can test:
- prompt injection
- privacy leaks
- unsafe advice
- unauthorized actions

Install:
```bash
npm install -g safeagentkit
safeagent init
safeagent test safeagent.yaml
```

Repo:
https://github.com/quanta-tect/SafeAgentKit

I’m not trying to sell anything. I just want feedback from people building real AI products.
What would make this actually useful in your workflow?

---

## Variant B — r/SaaS

Title:
Open-source CI checks for AI apps and agents

Body:
Most AI apps today only check “does it return text?”.
As AI apps become agents that take actions, I think teams will also need safety checks before production.

I made SafeAgentKit:
- YAML-based safety policies
- built-in red-team style tests
- JSON / HTML reports
- score thresholds for CI/CD

```bash
npm install -g safeagentkit
```

If you run an AI SaaS, I’d love to know:
- Are you testing for prompt injection or unsafe outputs?
- If not, what’s stopping you?

Repo:
https://github.com/quanta-tect/SafeAgentKit

---

## Variant C — r/LocalLLaMA / r/MachineLearning

Title:
Small open-source tool for evaluating AI agent safety

Body:
I’m sharing a project more than advertising it:
SafeAgentKit is a CLI that runs safety tests against AI apps and agents.

It’s not a guardrail runtime.
It’s a test runner:
```bash
npm install -g safeagentkit
safeagent test safeagent.yaml
```

Today it is rule-based.
The goal is to make “AI safety tests” as normal as unit tests.

Curious whether researchers or engineers here think this kind of testing is useful.
What test categories would you want?

Repo:
https://github.com/quanta-tect/SafeAgentKit
