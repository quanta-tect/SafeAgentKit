# Show HN: SafeAgentKit – safety tests for AI apps and agents

I built SafeAgentKit because AI apps are moving from “generate text” to “do things”:
read emails, call APIs, update CRMs, run tools, and make decisions.
That means safety can’t be a one-time checklist.
It needs to be repeatable, reviewable, and CI-friendly.

SafeAgentKit is an open-source CLI that helps developers catch:
- prompt injection
- privacy leaks
- unsafe advice
- unauthorized agent actions

before production.

Install:
```bash
npm install -g safeagentkit
```

Run:
```bash
safeagent init
safeagent test safeagent.yaml
```

Links:
- GitHub: https://github.com/quanta-tect/SafeAgentKit
- npm: https://www.npmjs.com/package/safeagentkit
- Landing: https://quanta-tect.github.io/SafeAgentKit/

I’d love feedback from people building AI apps or agents.
What safety checks do you currently run in CI?
