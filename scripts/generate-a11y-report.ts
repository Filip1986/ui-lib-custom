/**
 * Generate a human-readable accessibility report from test results
 */
import * as fs from 'fs';
import * as path from 'path';

interface AxeViolation {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    target: string[];
    html: string;
    failureSummary: string;
  }>;
}

type AxeResults = {
  violations?: AxeViolation[];
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isAxeViolation = (value: unknown): value is AxeViolation => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  const nodes = record.nodes;
  return (
    typeof record.id === 'string' &&
    typeof record.impact === 'string' &&
    typeof record.description === 'string' &&
    typeof record.help === 'string' &&
    typeof record.helpUrl === 'string' &&
    Array.isArray(nodes) &&
    nodes.every((node) => {
      if (!node || typeof node !== 'object') {
        return false;
      }
      const nodeRecord = node as Record<string, unknown>;
      return (
        isStringArray(nodeRecord.target) &&
        typeof nodeRecord.html === 'string' &&
        typeof nodeRecord.failureSummary === 'string'
      );
    })
  );
};

const isAxeResults = (value: unknown): value is AxeResults => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  if (!('violations' in record)) {
    return true;
  }
  const violations = record.violations;
  return Array.isArray(violations) && violations.every(isAxeViolation);
};

function generateReport(resultsPath: string): string {
  const raw = fs.readFileSync(resultsPath, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  if (!isAxeResults(parsed)) {
    throw new Error('Invalid accessibility results format.');
  }
  const results: AxeResults = parsed;
  const violations: AxeViolation[] = results.violations ?? [];

  let report = '# Accessibility Test Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  if (violations.length === 0) {
    report += '✅ **No accessibility violations found!**\n';
    return report;
  }

  report += `❌ **${violations.length} violations found**\n\n`;

  violations.forEach((violation: AxeViolation, index: number): void => {
    report += `## ${index + 1}. ${violation.description}\n\n`;
    report += `- **Impact:** ${violation.impact}\n`;
    report += `- **Rule:** ${violation.id}\n`;
    report += `- **Help:** ${violation.help}\n`;
    report += `- **Documentation:** ${violation.helpUrl}\n\n`;

    report += '### Affected Elements:\n\n';
    violation.nodes.forEach((node, nodeIndex): void => {
      report += `${nodeIndex + 1}. \`${node.target.join(' ')}\`\n`;
      report += `   - HTML: \`${node.html.substring(0, 100)}...\`\n`;
      report += `   - Fix: ${node.failureSummary}\n\n`;
    });
  });

  return report;
}

if (require.main === module) {
  const resultsPath = process.argv[2] || './test-results/a11y-results.json';
  const report = generateReport(resultsPath);

  const outputPath = path.resolve('./test-results/a11y-report.md');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, report);
  console.warn(`Report generated: ${outputPath}`);
}

export { generateReport };
