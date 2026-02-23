/**
 * Generate a human-readable accessibility report from test results.
 */
const fs = require('fs');
const path = require('path');

function generateReport(resultsPath) {
  const raw = fs.readFileSync(resultsPath, 'utf-8');
  const results = JSON.parse(raw);

  let report = '# Accessibility Test Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  if (!results.violations || results.violations.length === 0) {
    report += '✅ **No accessibility violations found!**\n';
    return report;
  }

  report += `❌ **${results.violations.length} violations found**\n\n`;

  results.violations.forEach((violation, index) => {
    report += `## ${index + 1}. ${violation.description}\n\n`;
    report += `- **Impact:** ${violation.impact}\n`;
    report += `- **Rule:** ${violation.id}\n`;
    report += `- **Help:** ${violation.help}\n`;
    report += `- **Documentation:** ${violation.helpUrl}\n\n`;

    report += '### Affected Elements:\n\n';
    violation.nodes.forEach((node, nodeIndex) => {
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
  console.log(`Report generated: ${outputPath}`);
}

module.exports = { generateReport };

