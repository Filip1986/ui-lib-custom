/**
 * Fixes files where DocSectionComponent import landed at the end of the file.
 * Moves it to the correct position after the last top-of-file import statement.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILES = [
  'projects/demo/src/app/pages/avatar/avatar-demo.component.ts',
  'projects/demo/src/app/pages/bind/bind-demo.component.ts',
  'projects/demo/src/app/pages/bottom-sheet/bottom-sheet-demo.component.ts',
  'projects/demo/src/app/pages/ripple/ripple-demo.component.ts',
  'projects/demo/src/app/pages/scroller/scroller-demo.component.ts',
  'projects/demo/src/app/pages/style-class/style-class-demo.component.ts',
  'projects/demo/src/app/pages/tag/tag-demo.component.ts',
];

const IMPORT_LINE = `import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';`;

for (const rel of FILES) {
  const filePath = join(__dirname, '..', rel);
  let src = readFileSync(filePath, 'utf8');

  // Remove the misplaced import at the end (and any leading newline before it)
  src = src.replace(/\n?import \{ DocSectionComponent \} from '\.\.\/\.\.\/shared\/doc-page\/doc-section\.component';\n?/g, '\n');

  // Find the last top-of-file import line (lines starting with 'import')
  const lines = src.split('\n');
  let lastImportLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ') || lines[i].startsWith('import{')) {
      lastImportLineIdx = i;
    } else if (lastImportLineIdx >= 0 && lines[i].trim() === '' && i > lastImportLineIdx + 3) {
      // Stop after a blank line that's well past the imports
      break;
    }
  }

  if (lastImportLineIdx < 0) {
    console.log(`⚠ Could not find import block in ${rel}`);
    continue;
  }

  // Insert after the last import line
  lines.splice(lastImportLineIdx + 1, 0, IMPORT_LINE);
  const result = lines.join('\n');

  writeFileSync(filePath, result, 'utf8');
  console.log(`✅ Fixed: ${rel}`);
}
