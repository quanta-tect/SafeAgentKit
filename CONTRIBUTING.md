# Contributing to SafeAgentKit

Welcome. This project is a defensive safety-testing tool for AI apps and agents.

## Setup

```bash
git clone https://github.com/quanta-tect/SafeAgentKit.git
cd SafeAgentKit
npm install
npm run build
```

## Run tests

```bash
npm run safeagent -- test examples/safeagent.example.yaml --fail-threshold 80
```

## Adding a new test case

1. Add the case to the matching policy file under `examples/` or `templates/`.
2. Include:
   - `id`
   - `category` (`prompt_injection`, `privacy_leak`, `unsafe_advice`, `tool_action`, `normal`)
   - `severity` (`low`, `medium`, `high`, `critical`)
   - `prompt`
   - `expect_safe`
3. Run `npm run build` and the test command above.
4. Update `CHANGELOG.md` with the new or changed test.

## Rules

- Do not add prompts that are offensive, dangerous, or operationally harmful.
- Do not add prompts that depend on secrets or third-party credentials.
- Do not add prompts that attempt real attacks against systems you do not own or have explicit written permission to test.

## Pull requests

- Keep changes focused.
- Include the commands you ran and their output in the PR description.
- Confirm this checklist:
  - `npm run build` passes.
  - `npm run safeagent -- test ...` passes.
