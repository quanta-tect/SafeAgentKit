import fs from 'node:fs';
import path from 'node:path';
import type { RunReport } from './types.js';

export function saveJsonReport(report: RunReport, output = 'safeagent-report.json'): string {
  const resolved = path.resolve(process.cwd(), output);
  fs.writeFileSync(resolved, JSON.stringify(report, null, 2));
  return resolved;
}

export function loadJsonReport(input = 'safeagent-report.json'): RunReport {
  const resolved = path.resolve(process.cwd(), input);
  if (!fs.existsSync(resolved)) throw new Error(`Report file not found: ${input}. Run safeagent test first.`);
  return JSON.parse(fs.readFileSync(resolved, 'utf8')) as RunReport;
}

export function saveHtmlReport(report: RunReport, output = 'safeagent-report.html'): string {
  const html = renderHtml(report);
  const resolved = path.resolve(process.cwd(), output);
  fs.writeFileSync(resolved, html);
  return resolved;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function statusColor(score: number): string {
  if (score >= 90) return '#16a34a';
  if (score >= 75) return '#65a30d';
  if (score >= 50) return '#d97706';
  return '#dc2626';
}

export function renderHtml(report: RunReport): string {
  const color = statusColor(report.score);
  const rows = report.results.map(r => `
    <article class="card ${r.passed ? 'pass' : 'fail'}">
      <div class="row">
        <div>
          <h3>${escapeHtml(r.id)} <span>${escapeHtml(r.category)}</span></h3>
          <p class="severity">Severity: ${escapeHtml(r.severity)} · Score: ${r.score}/100</p>
        </div>
        <strong class="pill">${r.passed ? 'PASS' : 'FAIL'}</strong>
      </div>
      <details>
        <summary>Prompt, response, and findings</summary>
        <h4>Prompt</h4><pre>${escapeHtml(r.prompt)}</pre>
        <h4>Response</h4><pre>${escapeHtml(r.response || r.error || '')}</pre>
        <h4>Findings</h4><ul>${r.findings.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
      </details>
    </article>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SafeAgentKit Report - ${escapeHtml(report.appName)}</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f8fafc; color: #0f172a; }
    header { background: radial-gradient(circle at top left, #dbeafe, transparent 36%), linear-gradient(135deg, #0f172a, #172554); color: white; padding: 48px 24px; }
    main { max-width: 1040px; margin: -32px auto 64px; padding: 0 20px; }
    .hero { max-width: 1040px; margin: auto; }
    .hero h1 { font-size: clamp(32px, 5vw, 56px); margin: 0 0 12px; letter-spacing: -0.04em; }
    .hero p { margin: 0; color: #bfdbfe; font-size: 18px; }
    .summary { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px; margin-bottom: 20px; }
    .metric, .card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 18px 50px rgba(15, 23, 42, .08); }
    .metric { padding: 20px; }
    .metric small { color: #64748b; display: block; margin-bottom: 8px; }
    .metric b { font-size: 30px; }
    .score b { color: ${color}; }
    .card { padding: 18px; margin: 14px 0; }
    .row { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
    h2 { margin-top: 34px; }
    h3 { margin: 0 0 6px; }
    h3 span { font-size: 13px; color: #475569; border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 999px; margin-left: 6px; }
    .severity { color: #64748b; margin: 0; }
    .pill { border-radius: 999px; padding: 7px 11px; font-size: 12px; background: #fee2e2; color: #991b1b; }
    .pass .pill { background: #dcfce7; color: #166534; }
    details { margin-top: 14px; }
    summary { cursor: pointer; color: #1d4ed8; font-weight: 700; }
    pre { white-space: pre-wrap; word-break: break-word; background: #0f172a; color: #dbeafe; border-radius: 14px; padding: 14px; overflow: auto; }
    footer { color: #64748b; text-align: center; padding: 40px 20px; }
    @media (max-width: 800px) { .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  </style>
</head>
<body>
<header><div class="hero"><h1>SafeAgentKit Report</h1><p>${escapeHtml(report.appName)} · Generated ${escapeHtml(report.generatedAt)}</p></div></header>
<main>
  <section class="summary">
    <div class="metric score"><small>Overall score</small><b>${report.score}</b></div>
    <div class="metric"><small>Total tests</small><b>${report.total}</b></div>
    <div class="metric"><small>Passed</small><b>${report.passed}</b></div>
    <div class="metric"><small>Failed</small><b>${report.failed}</b></div>
    <div class="metric"><small>Risk level</small><b>${escapeHtml(report.riskLevel)}</b></div>
  </section>
  <h2>Results</h2>
  ${rows}
</main>
<footer>Generated by SafeAgentKit. This report supports safety testing, but does not guarantee absolute safety or compliance.</footer>
</body>
</html>`;
}
