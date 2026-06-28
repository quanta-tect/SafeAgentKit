import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import type { SafeAgentConfig } from './types.js';

export function loadConfig(configPath = 'safeagent.yaml'): SafeAgentConfig {
  const resolved = path.resolve(process.cwd(), configPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  const raw = fs.readFileSync(resolved, 'utf8');
  const config = YAML.parse(raw) as SafeAgentConfig;
  validateConfig(config);
  return config;
}

export function validateConfig(config: SafeAgentConfig): void {
  if (!config || typeof config !== 'object') throw new Error('Config must be an object.');
  if (!config.app?.name) throw new Error('Config requires app.name.');
  if (config.endpoint && !config.endpoint.url) throw new Error('endpoint.url is required when endpoint is provided.');
  if (config.tests && !Array.isArray(config.tests)) throw new Error('tests must be an array.');
}
