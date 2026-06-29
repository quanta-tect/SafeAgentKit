# Product Hunt launch

## Tagline

Open-source CLI that adds safety tests to AI apps and agents.

## Description

AI apps are becoming tool-using agents. That changes safety requirements: apps now need to protect users from prompt injection, privacy leaks, unsafe advice, and unauthorized actions.

SafeAgentKit is an open-source CLI that brings repeatable safety testing to the same workflow as unit tests.

Key features:
- YAML-based safety policies
- built-in tests for prompt injection, privacy, unsafe advice, tool misuse, unauthorized actions
- JSON and HTML reports
- score thresholds for CI/CD
- SVG safety badge generator
- policy templates for common AI app categories

Install:
```bash
npm install -g safeagentkit
safeagent init
safeagent test safeagent.yaml
```

Repo + docs:
https://github.com/quanta-tect/SafeAgentKit
https://quanta-tect.github.io/SafeAgentKit/

## Maker comment (first comment)

SafeAgentKit was originally built because I wanted AI safety checks to feel like normal unit tests.

The CLI is early, but functional. The evaluation engine is rule-based today. LLM-as-judge and hosted dashboard are planned based on feedback.

I’m looking for design partners who:
- ship AI apps or agents
- want stricter safety gates in CI
- care about prompt injection, privacy, and bad outputs

If that’s you, I’d love your feedback and use cases.

The first 10 AI builders can also get a free safety test review.

## First comment (social proof / community)

> Built this because as AI apps become agents, the risk surface changes fast.
> Testing for “does the answer look good?” is no longer enough.
> SafeAgentKit turns safety policies into repeatable, reviewable, CI-friendly tests.
>
> Would love feedback from teams shipping AI products.

## Screenshot ideas

1. Terminal:
```bash
npm install -g safeagentkit
safeagent init
safeagent test safeagent.yaml
```

2. HTML report:
- Show score, pass/fail, category breakdown.

3. SafeAgentKit score badge:
- SVG badge rendered in README or landing.

4. Policy YAML example:
- Show a clean `safeagent.yaml` config.

5. GitHub Actions CI workflow example:
- Show workflow that fails on bad score.

## FAQ

Q: Is this a runtime guardrail?
A: No. SafeAgentKit is a test runner, like unit tests for AI safety.

Q: Do I need an LLM API key?
A: No. The built-in tests are rule-based today.

Q: Does it replace human review?
A: No. It’s one layer in a broader safety and review process.

Q: Does it guarantee safety or compliance?
A: No. It helps catch common risks before production.

Q: Is the npm package free?
A: Yes. Open source under MIT.

Q: What’s the roadmap?
A: LLM-as-judge, hosted dashboard, scheduled tests, policy packs, and public hosted safety badges.
