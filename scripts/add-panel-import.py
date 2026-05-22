"""
Add `Panel` import from 'ui-lib-custom/panel' to every demo TS file that
uses ui-lib-panel in its template but doesn't already import Panel.
"""

import re
import os

PAGES_DIR = r"D:\Work\ArtificialSense\ui-lib-custom\projects\demo\src\app\pages"
PANEL_IMPORT = "import { Panel } from 'ui-lib-custom/panel';"

changed = []

for root, dirs, files in os.walk(PAGES_DIR):
    for fname in files:
        if not fname.endswith('.ts'):
            continue
        fpath = os.path.join(root, fname)

        # Check if the corresponding HTML uses ui-lib-panel
        html_path = fpath.replace('.ts', '.html')
        # Handle special case like float-label-demo.ts / float-label-demo.html
        if not os.path.exists(html_path):
            continue

        with open(html_path, encoding='utf-8') as f:
            html = f.read()
        if 'ui-lib-panel' not in html:
            continue

        with open(fpath, encoding='utf-8') as f:
            src = f.read()

        # Skip if Panel is already imported
        if re.search(r'\bPanel\b', src):
            continue

        # ── 1. Add import statement ──────────────────────────────────────
        # Insert after the last `import … from '…';` line before the @Component decorator
        last_import_match = None
        for m in re.finditer(r'^import\s+.*?;\s*$', src, re.MULTILINE):
            last_import_match = m
        if last_import_match:
            insert_pos = last_import_match.end()
            src = src[:insert_pos] + '\n' + PANEL_IMPORT + src[insert_pos:]
        else:
            # Fallback: prepend
            src = PANEL_IMPORT + '\n' + src

        # ── 2. Add Panel to the imports[] array in @Component ────────────
        # Find `imports: [` and insert Panel as the first element
        def add_panel_to_imports(match):
            bracket_content = match.group(1)
            # Avoid duplicates
            if re.search(r'\bPanel\b', bracket_content):
                return match.group(0)
            # Add Panel as first item
            stripped = bracket_content.lstrip()
            leading_ws = bracket_content[:len(bracket_content) - len(stripped)]
            return 'imports: [' + leading_ws + 'Panel,\n    ' + stripped

        src = re.sub(
            r'imports:\s*\[([^\]]*?)\]',
            add_panel_to_imports,
            src,
            count=1,
            flags=re.DOTALL
        )

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(src)
        changed.append(fpath)

print(f"Added Panel import to {len(changed)} files:")
for p in changed:
    print(' ', p)

