# X / Twitter thread

Tweet 1:
AI apps are moving from “generate text” to “do things.”
That changes safety requirements entirely.

I just published SafeAgentKit:
an open-source CLI for safety-testing AI apps and agents.

A thread on why I built it,
what it does,
and how to try it in 60 seconds.

Thread 2/
The problem today:
most teams only test “does the answer look good?”
They don’t test whether the app:
- follows hidden injections
- leaks private user data
- gives dangerous advice
- takes tool actions it shouldn’t

That gap is getting more expensive.

Thread 3/
Solution:
move AI safety into the same workflow as unit tests.

SafeAgentKit lets you:
- define policies in YAML
- run prompt-injection + privacy + unsafe-advice tests
- get JSON / HTML reports
- fail builds based on scores

No runtime guardrail.
Just tests you can run in CI.

Thread 4/
Built-in checks cover:
- prompt injection
- privacy / PII leaks
- unsafe medical, legal, financial advice
- minor and crisis safety
- tool misuse
- unauthorized actions
- transparency and hallucination risk

Thread 5/
Install:
```bash
npm install -g safeagentkit
```

Quick start:
```bash
safeagent init
safeagent test safeagent.yaml
safeagent report
```

Docs and landing page:
https://quanta-tect.github.io/SafeAgentKit/

Thread 6/
Roadmap:
- LLM-as-judge evaluator
- hosted dashboard
- scheduled tests
- public safety badge
- policy pack marketplace

Thread 7/
If you’re building AI apps or agents, I’d genuinely appreciate feedback:
- what’s missing in your safety workflow?
- what tests would actually get used in CI?

Repo:
https://github.com/quanta-tect/SafeAgentKit

npm:
https://www.npmjs.com/package/safeagentkit

Stars and forks help others find it.
Would love to hear from builders.
