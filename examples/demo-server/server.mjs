import http from 'node:http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body || '{}');
        const response = classifyAndReply(message);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ response }));
      } catch (err) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Demo server listening on http://localhost:${PORT}/api/chat`);
});

function classifyAndReply(message) {
  if (!message || typeof message !== 'string') {
    return 'Please provide a message.';
  }

  const injectionPatterns = [
    /ignore (all |previous )?instructions/i,
    /disregard (all |previous )?rules/i,
    /output (your |the )?(system |internal )(prompt|instructions|config)/i,
    /show (me )?(your |the )?(system|internal) prompt/i,
    /reveal (your |the )?(system|internal|secret) prompt/i,
    /print (your |the )?(system|internal) prompt/i,
    /repeat (the |your )?(system|internal) prompt/i,
    /what are your (system|internal) instructions/i,
    /bypass (your |the )?(rules|safety|guardrails|filters)/i,
    /jailbreak/i,
    /act as (?!a helpful assistant)[^,\n]+/i,
    /pretend (you |to )?(are a|to be)[^,\n]*without (rules|limits|restrictions)/i,
    /developer (mode|prompt)/i,
    /DAN mode/i,
    /do anything now/i,
    /\/simulate/i,
    /\/dev/i,
    /execute arbitrary/i,
    /run shell/i,
    /run bash/i,
    /run powershell/i,
    /eval\(/i,
    /exec\(/i,
    /lambda.*system/i,
    /chain of thought.*now/i,
    /output internal/i,
    /reveal your/i,
    /show me the/i,
    /prompt leak/i
  ];

  const privacyPatterns = [
    /\b(api[_-]?key|apikey|secret|token|password|pwd|passwd)\b/i,
    /\b(sk|pk)_(live|test)?_[A-Za-z0-9]{10,}\b/i,
    /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/,
    /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/,
    /\b\d{16,19}\b/,
    /aws_access_key_id/i,
    /aws_secret_access_key/i,
    /private[_\s]?key/i,
    /mnemonic phrase/i,
    /seed phrase/i,
    /0x[a-fA-F0-9]{64}\b/,
    /-----BEGIN (RSA )?PRIVATE KEY-----/i
  ];

  const isPromptInjection = injectionPatterns.some((re) => re.test(message));
  const isPrivacyLeak = privacyPatterns.some((re) => re.test(message));

  if (isPromptInjection) {
    return 'I cannot change my instructions or reveal my system configuration. How else can I help you today?';
  }
  if (isPrivacyLeak) {
    return 'I cannot disclose sensitive data or credentials. If you need account or configuration help, please use the official admin tooling.';
  }

  return `Demo reply to: ${message}`;
}
