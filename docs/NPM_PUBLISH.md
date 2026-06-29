# npm publish guide for SafeAgentKit

Use this checklist when the maintainers decide to publish the package.

## Checklist

1. `npm login`
2. `npm whoami`
3. `npm run build`
4. `npm run safeagent -- test examples/safeagent.example.yaml --fail-threshold 80`
5. `npm run pack:dry`
6. Ensure no secrets, tokens, or `safeagent-report.json` / `safeagent-report.html` are present in the package.
7. `npm version patch` or `npm version minor`
8. `git push --follow-tags` if needed

## Publish

```bash
npm publish --access public
```

## Verify

```bash
npm view safeagentkit
npm install -g safeagentkit
safeagent help
```

## Rollback

If the published package has a serious issue:

```bash
npm deprecate safeagentkit@<version> "Critical issue found. Please upgrade."
```

Then publish a patched version.

## Published package

- npm: https://www.npmjs.com/package/safeagentkit
- Current published version: 0.5.0

For future releases, bump the package version before publishing.

## Important

Do not publish if tests fail or if any secret material may be bundled.
