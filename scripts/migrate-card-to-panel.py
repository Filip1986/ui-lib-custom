"""
Migrate ui-lib-card showcase containers → ui-lib-panel variant="minimal"
across all demo pages.

Rules:
  - <ui-lib-card ...> → <ui-lib-panel variant="minimal">
  - </ui-lib-card>   → </ui-lib-panel>
  - <span card-header>…</span>  → removed (section <h2> already provides title)
  - <span card-subtitle>…</span> → unwrapped as <p class="demo-section__description">…</p>
    and placed just before the <ui-lib-panel> they belonged to
  - inline subtitle="…" attribute on the card tag → same: add description p before panel
  - In TS files: remove `Card` from import statements and imports[] arrays
"""

import re
import os
import sys

PAGES_DIR = r"D:\Work\ArtificialSense\ui-lib-custom\projects\demo\src\app\pages"

# ── helpers ──────────────────────────────────────────────────────────────────

def transform_html(src: str) -> str:
    lines = src.split('\n')
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]

        # ── closing tag ────────────────────────────────────────────────────
        if re.search(r'</ui-lib-card>', line):
            out.append(line.replace('</ui-lib-card>', '</ui-lib-panel>'))
            i += 1
            continue

        # ── opening tag (may be multi-line) ───────────────────────────────
        if re.search(r'<ui-lib-card\b', line):
            # Collect the full opening tag (until closing >)
            tag_lines = [line]
            j = i + 1
            while '>' not in tag_lines[-1] and j < len(lines):
                tag_lines.append(lines[j])
                j += 1
            full_tag = '\n'.join(tag_lines)

            # Extract inline subtitle="…"
            subtitle_attr = re.search(r'\bsubtitle="([^"]*)"', full_tag)
            subtitle_text = subtitle_attr.group(1) if subtitle_attr else None

            # Determine indent from the opening line
            indent = len(line) - len(line.lstrip())
            pad = ' ' * indent

            # Emit description paragraph if we got an inline subtitle
            if subtitle_text:
                out.append(f'{pad}<p class="demo-section__description">{subtitle_text}</p>')

            # Emit the replacement panel tag
            out.append(f'{pad}<ui-lib-panel variant="minimal">')

            i = j
            continue

        # ── card-header slot ───────────────────────────────────────────────
        # Single-line: <span card-header>…</span>
        if re.search(r'<\w[^>]*\bcard-header\b[^>]*>', line):
            # If it closes on the same line, drop the whole line
            if re.search(r'</\w+>', line):
                i += 1
                continue
            else:
                # Multi-line card-header → skip until closing tag
                tag_match = re.search(r'<(\w+)[^>]*\bcard-header\b', line)
                tag_name = tag_match.group(1) if tag_match else None
                if tag_name:
                    i += 1
                    while i < len(lines):
                        if re.search(rf'</{tag_name}>', lines[i]):
                            i += 1
                            break
                        i += 1
                    continue
                else:
                    i += 1
                    continue

        # ── card-subtitle slot ────────────────────────────────────────────
        if re.search(r'<\w[^>]*\bcard-subtitle\b[^>]*>', line):
            indent = len(line) - len(line.lstrip())
            pad = ' ' * indent
            tag_match = re.search(r'<(\w+)[^>]*\bcard-subtitle\b', line)
            tag_name = tag_match.group(1) if tag_match else 'span'

            if re.search(rf'</{tag_name}>', line):
                # Single-line subtitle – extract inner content
                inner = re.sub(rf'<{tag_name}[^>]*card-subtitle[^>]*>(.*?)</{tag_name}>', r'\1', line).strip()
                if inner:
                    out.append(f'{pad}<p class="demo-section__description">{inner}</p>')
                i += 1
                continue
            else:
                # Multi-line subtitle
                content_lines = []
                i += 1
                while i < len(lines):
                    if re.search(rf'</{tag_name}>', lines[i]):
                        i += 1
                        break
                    content_lines.append(lines[i].strip())
                    i += 1
                inner = ' '.join(content_lines).strip()
                if inner:
                    out.append(f'{pad}<p class="demo-section__description">{inner}</p>')
                continue

        out.append(line)
        i += 1

    return '\n'.join(out)


def transform_ts(src: str) -> str:
    # Remove standalone Card import line
    src = re.sub(r"^import\s*\{\s*Card\s*\}\s*from\s*'[^']*';\s*\n", '', src, flags=re.MULTILINE)

    # Remove Card from a multi-symbol import block: `import { A, Card, B } from '...'`
    src = re.sub(r',\s*Card\b', '', src)
    src = re.sub(r'\bCard\s*,', '', src)

    # Remove Card from imports array: `Card,\n` or `, Card` etc.
    src = re.sub(r'\bCard,\s*\n', '', src)
    src = re.sub(r',\s*\bCard\b', '', src)

    return src


# ── walk pages ───────────────────────────────────────────────────────────────

SKIP_HTML = {
    # cards page is the demo OF cards - keep it as-is
    'cards.component.html',
}

SKIP_TS = {
    'cards.component.ts',
}

changed_html = []
changed_ts   = []

for root, dirs, files in os.walk(PAGES_DIR):
    for fname in files:
        fpath = os.path.join(root, fname)

        if fname.endswith('.html') and fname not in SKIP_HTML:
            with open(fpath, encoding='utf-8') as f:
                original = f.read()
            if 'ui-lib-card' not in original:
                continue
            transformed = transform_html(original)
            if transformed != original:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(transformed)
                changed_html.append(fpath)

        elif fname.endswith('.ts') and fname not in SKIP_TS:
            with open(fpath, encoding='utf-8') as f:
                original = f.read()
            if 'Card' not in original:
                continue
            transformed = transform_ts(original)
            if transformed != original:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(transformed)
                changed_ts.append(fpath)

print(f"\nHTML files updated ({len(changed_html)}):")
for p in changed_html:
    print(' ', p)

print(f"\nTS files updated ({len(changed_ts)}):")
for p in changed_ts:
    print(' ', p)

