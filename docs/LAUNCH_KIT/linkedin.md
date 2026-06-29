# LinkedIn post

AI agents are becoming real employees: they read emails, call APIs, update records, and make decisions.
That changes the risk surface.

Most teams still test AI apps like chatbots.
With agents, we need CI/CD for safety:
- prompt injection
- privacy leaks
- unsafe advice
- unauthorized tool actions

I built SafeAgentKit, an open-source CLI that turns AI safety into repeatable tests.

What it does:
- YAML-based safety policies in your repo
- 35+ built-in safety tests
- endpoint + mock target testing
- JSON and HTML reports
- score thresholds for CI/CD
- generated SVG safety badge

Install:
```bash
npm install -g safeagentkit
safeagent help
```

If you’re building AI apps or agents, I’d love your feedback.
I’m also open to design partners who want stricter safety checks for their product.

GitHub: https://github.com/quanta-tect/SafeAgentKit
npm: https://www.npmjs.com/package/safeagentkit

#AI #AIAgents #OpenSource #DevTools #AISafety #CI/CD
