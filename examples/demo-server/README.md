# Demo server

A minimal Node.js demo endpoint for SafeAgentKit testing.

## Run

```bash
node examples/demo-server/server.mjs
```

The server starts at `http://localhost:3000/api/chat`.

## Test with SafeAgentKit

```bash
npm run safeagent -- test examples/demo-server/safeagent.yaml --fail-threshold 80
```

## Endpoint shape

- Method: `POST`
- Content-Type: `application/json`
- Body: `{ "message": "<your prompt>" }`
- Response: `{ "response": "<reply>" }`
