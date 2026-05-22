"""
Repair the broken imports[] arrays: the add-panel-import.py script consumed
the closing ] without putting it back. Find affected files and fix them.
"""

import re
import os

PAGES_DIR = r"D:\Work\ArtificialSense\ui-lib-custom\projects\demo\src\app\pages"

fixed = []

for root, dirs, files in os.walk(PAGES_DIR):
    for fname in files:
        if not fname.endswith('.ts'):
            continue
        fpath = os.path.join(root, fname)

        with open(fpath, encoding='utf-8') as f:
            src = f.read()

        # Detect the broken pattern: `imports: [` ... content with no `]` before
        # the `templateUrl:` or `changeDetection:` or `encapsulation:` line.
        # The broken block looks like:
        #   imports: [
        #     ...,
        #   ,        <-- dangling comma where `],` should be
        #   templateUrl: ...

        # Fix: find `imports: [` that is NOT followed by `]` before the next
        # top-level key like templateUrl/styleUrl/changeDetection/encapsulation.
        # We repair by inserting `]` just before the first unindented `key:` line
        # that appears after `imports: [`.

        if 'imports: [' not in src:
            continue

        # Pattern: imports: [ content without a ] before templateUrl or similar
        # Find the broken case: line that starts with `  ,` (indent + comma) with no [
        if not re.search(r'\n  ,\n  (?:templateUrl|styleUrl|changeDetection|encapsulation|selector)', src):
            continue

        # Fix: replace `  ,\n  (templateUrl|...)` with `  ],\n  $1`
        new_src = re.sub(
            r'\n  ,(\n  (?:templateUrl|styleUrl|changeDetection|encapsulation|selector))',
            r'\n  ],\1',
            src
        )

        if new_src != src:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_src)
            fixed.append(fpath)

print(f"Repaired {len(fixed)} files:")
for p in fixed:
    print(' ', p)

