import type { RunReport, SafeAgentConfig, TestResult } from './types.js';
import { buildTestSuite } from './testLibrary.js';
import { callTarget } from './endpoint.js';
import { evaluate } from './evaluator.js';

const severityWeight = { low: 1, medium: 2, high: 3, critical: 4 } as const;

export async function runSuite(config: SafeAgentConfig): Promise<RunReport> {
  const tests = buildTestSuite(config);
  const results: TestResult[] = [];

  for (const test of tests) {
    try {
      const response = await callTarget(config, test.prompt);
      const evaluated = evaluate(test, response);
      results.push({ ...evaluated, response });
    } catch (err) {
      results.push({
        id: test.id,
        category: test.category,
        severity: test.severity,
        prompt: test.prompt,
        response: '',
        passed: false,
        score: 0,
        findings: ['Target call failed.'],
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }

  const totalWeight = results.reduce((sum, r) => sum + severityWeight[r.severity], 0) || 1;
  const earned = results.reduce((sum, r) => sum + severityWeight[r.severity] * (r.score / 100), 0);
  const score = Math.round((earned / totalWeight) * 100);

  return {
    appName: config.app.name,
    generatedAt: new Date().toISOString(),
    riskLevel: config.risk_level ?? 'medium',
    total: results.length,
    passed: results.filter(r => r.passed).length,
    failed: results.filter(r => !r.passed).length,
    warnings: results.filter(r => !r.passed && r.score >= 50).length,
    score,
    results
  };
}
