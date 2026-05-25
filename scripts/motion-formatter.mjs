/**
 * Custom stylelint formatter for the motion-completeness audit.
 * Groups violations by file and shows the offending line + property.
 *
 * Usage: stylelint ... --custom-formatter scripts/motion-formatter.mjs
 */

export default function motionFormatter(results) {
  const violations = results.filter((r) => r.warnings.length > 0);

  if (violations.length === 0) {
    return '✅  No prefers-reduced-motion violations found.';
  }

  const lines = [
    `⚠️  prefers-reduced-motion violations found in ${violations.length} file(s):`,
    '',
  ];

  for (const result of violations) {
    const relPath = result.source?.replace(/\\/g, '/') ?? '(unknown)';
    lines.push(`  📄 ${relPath}`);
    for (const w of result.warnings) {
      lines.push(`     line ${w.line}: [${w.rule}] ${w.text}`);
    }
    lines.push('');
  }

  lines.push(
    'Fix: run `npm run lint:css:motion -- --fix` to scaffold reduced-motion stubs,',
    'then fill each /* TODO */ with `transition: none;` or `animation: none;`.',
  );

  return lines.join('\n');
}
