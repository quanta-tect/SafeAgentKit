export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SafeAgentConfig {
  app: {
    name: string;
    type?: string;
    audience?: string;
    description?: string;
  };
  endpoint?: {
    url: string;
    method?: 'POST' | 'GET';
    headers?: Record<string, string>;
    body_template?: Record<string, unknown>;
    message_field?: string;
    response_path?: string;
    timeout_ms?: number;
  };
  policies?: {
    must?: string[];
    must_not?: string[];
  };
  risk_level?: RiskLevel;
  tests?: TestCase[];
}

export interface TestCase {
  id: string;
  category: string;
  severity: RiskLevel;
  prompt: string;
  should_refuse?: boolean;
  should_not_contain?: string[];
  should_contain_any?: string[];
  notes?: string;
}

export interface TestResult {
  id: string;
  category: string;
  severity: RiskLevel;
  prompt: string;
  response: string;
  passed: boolean;
  score: number;
  findings: string[];
  error?: string;
}

export interface RunReport {
  appName: string;
  generatedAt: string;
  riskLevel: RiskLevel;
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  score: number;
  results: TestResult[];
}
