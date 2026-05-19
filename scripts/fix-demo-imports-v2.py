"""
Robust fix script for demo component warnings and errors.
Uses precise marker-based patching instead of regex on raw file content.
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(BASE, "projects", "demo", "src", "app", "pages")

DOC_API_REF_IMPORT = "import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';"
DOC_API_REF_TYPE_IMPORT = "import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';"


def read(path):
    return open(path, encoding="utf-8").read()


def write(path, content):
    open(path, "w", encoding="utf-8").write(content)


def get_import_section_end(lines):
    """Return the index of the last line that starts with 'import '."""
    last = -1
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("import "):
            last = i
        elif stripped.startswith("@Component") or stripped.startswith("export "):
            break
    return last


def remove_symbol_from_imports_array(lines, symbol):
    """Remove `symbol,` or `symbol` lines from the @Component imports array."""
    result = []
    for line in lines:
        stripped = line.strip().rstrip(",")
        if stripped == symbol:
            continue
        result.append(line)
    return result


def remove_import_statement(lines, symbol):
    """Remove any 'import { symbol }' top-level (not inside string) line."""
    result = []
    scope_depth = 0
    in_template = False
    template_char = None

    for i, line in enumerate(lines):
        # Track template literals very roughly — only remove lines that
        # are clearly standalone import statements (start of line after trimming)
        stripped = line.strip()

        # If we're in a template literal context, keep the line as-is
        if in_template:
            result.append(line)
            # Count backtick-end (very rough)
            if line.rstrip().endswith("`") or line.rstrip().endswith("`;"):
                in_template = False
            continue

        # Detect start of template literal string (a line that opens ` but doesn't close it)
        if "`" in line:
            bt_count = line.count("`")
            if bt_count % 2 == 1:  # odd → opens but doesn't close
                in_template = True
                result.append(line)
                continue

        # For actual import lines (symbol removal)
        if stripped.startswith("import ") and symbol in line and scope_depth == 0:
            # Match import { symbol } or import { A, symbol, B }
            # Only remove if the whole import is just for `symbol`
            m_single = re.match(r"\s*import\s*\{\s*" + re.escape(symbol) + r"\s*\}\s*from\s*['\"][^'\"]+['\"]\s*;", line)
            if m_single:
                continue  # Remove this line entirely

            # Remove from multi-symbol import
            m_multi = re.match(r"(\s*import\s*\{)([^}]+)(\}\s*from\s*['\"][^'\"]+['\"]\s*;)", line)
            if m_multi:
                prefix = m_multi.group(1)
                symbols_str = m_multi.group(2)
                suffix = m_multi.group(3)
                symbols = [s.strip() for s in symbols_str.split(",")]
                symbols = [s for s in symbols if s and s != symbol]
                if symbols:
                    line = prefix + " " + ", ".join(symbols) + " " + suffix + "\n"
                    result.append(line)
                continue  # if no symbols left, skip the line

        result.append(line)

    return result


def add_import_statements(lines, imports_to_add):
    """Add import statements after the last top-level import line."""
    last_import_idx = get_import_section_end(lines)
    if last_import_idx < 0:
        return imports_to_add + lines

    # Insert after last import
    new_lines = lines[:last_import_idx + 1] + imports_to_add + lines[last_import_idx + 1:]
    return new_lines


def add_to_component_imports_array(lines, symbol):
    """Add symbol to the @Component imports array. Find '  ],\n  templateUrl' pattern."""
    # Find the imports: [ ... ] section
    in_imports = False
    bracket_depth = 0
    result = []
    inserted = False

    for i, line in enumerate(lines):
        stripped = line.strip()

        if not in_imports and re.match(r"\s*imports:\s*\[", line):
            in_imports = True
            bracket_depth = 1
            result.append(line)
            # If same-line close: imports: []
            if re.match(r"\s*imports:\s*\[\s*\]", line):
                in_imports = False
                bracket_depth = 0
            continue

        if in_imports:
            bracket_depth += line.count("[") - line.count("]")
            if bracket_depth <= 0:
                # This is the closing ] line
                in_imports = False
                if not inserted:
                    result.append(f"    {symbol},\n")
                    inserted = True
            result.append(line)
            continue

        result.append(line)

    return result


def add_class_property(lines, prop_code):
    """Add one or more property lines before the last } of the class."""
    # Find the last `}` at column 0 (end of class)
    last_brace_idx = -1
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == "}":
            last_brace_idx = i
            break

    if last_brace_idx < 0:
        return lines

    prop_lines = [l + "\n" if not l.endswith("\n") else l for l in prop_code.split("\n")]
    return lines[:last_brace_idx] + ["\n"] + prop_lines + lines[last_brace_idx:]


# ── API rows definitions (per component) ────────────────────────────────────

API_ROWS = {

"bind": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    {',
    '      name: \'uiLibBind\',',
    '      type: \'Record<string, unknown>\',',
    '      default: \'{}\',',
    '      description:',
    '        \'An object whose keys are HTML attribute/property names and values are the values to apply.\',',
    '    },',
    '  ];',
],

"cascade-select": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'options\', type: \'unknown[]\', default: \'[]\', description: \'The hierarchical option array.\' },',
    '    { name: \'optionLabel\', type: \'string\', default: "\'label\'", description: \'Property name for the display label.\' },',
    '    { name: \'optionValue\', type: \'string | undefined\', default: \'undefined\', description: \'Property name for the value.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'Select\'", description: \'Placeholder text.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | undefined", default: \'undefined\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Component size.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the component.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '    { name: \'loading\', type: \'boolean\', default: \'false\', description: \'Shows a loading indicator.\' },',
    '    { name: \'showClear\', type: \'boolean\', default: \'false\', description: \'Shows a clear button.\' },',
    '    { name: \'fluid\', type: \'boolean\', default: \'false\', description: \'Makes the component full-width.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label.\' },',
    '  ];',
],

"chart": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'data\', type: "ChartData<\'bar\'> | null", default: \'null\', description: \'Chart.js data configuration.\' },',
    '    { name: \'options\', type: "ChartOptions<\'bar\'> | null", default: \'null\', description: \'Chart.js options object.\' },',
    '    { name: \'plugins\', type: \'Plugin[]\', default: \'[]\', description: \'Additional Chart.js plugins.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Predefined size preset.\' },',
    '    { name: \'responsive\', type: \'boolean\', default: \'true\', description: \'Enables responsive resizing.\' },',
    '    { name: \'maintainAspectRatio\', type: \'boolean\', default: \'true\', description: \'Keeps the configured aspect ratio.\' },',
    '    { name: \'ariaLabel\', type: \'string\', default: "\'Chart\'", description: \'Accessible label for the canvas element.\' },',
    '    { name: \'height\', type: \'string | null\', default: \'null\', description: \'Explicit height.\' },',
    '    { name: \'width\', type: \'string | null\', default: \'null\', description: \'Explicit width.\' },',
    '  ];',
],

"color-picker": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'format\', type: "\'hex\' | \'rgb\' | \'hsb\'", default: "\'hex\'", description: \'Color output format.\' },',
    '    { name: \'inline\', type: \'boolean\', default: \'false\', description: \'Renders the picker inline instead of as a dropdown.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the color picker.\' },',
    '    { name: \'inputId\', type: \'string\', default: "\'\'", description: \'Id of the trigger element.\' },',
    '    { name: \'tabindex\', type: \'number\', default: \'0\', description: \'Tab order index.\' },',
    '  ];',
],

"data-view": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'value\', type: \'T[]\', description: \'Array of items to display. Required.\', required: true },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Component size.\' },',
    '    { name: \'loading\', type: \'boolean\', default: \'false\', description: \'Shows a loading skeleton.\' },',
    '    { name: \'emptyMessage\', type: \'string\', default: "\'No records found.\'", description: \'Message when the list is empty.\' },',
    '    { name: \'gridColumns\', type: \'number\', default: \'3\', description: \'Number of columns in the grid layout.\' },',
    '    { name: \'paginator\', type: \'boolean\', default: \'false\', description: \'Enables pagination controls.\' },',
    '    { name: \'rows\', type: \'number\', default: \'10\', description: \'Rows per page when paginator is enabled.\' },',
    '    { name: \'ariaLabel\', type: \'string\', default: "\'Data list\'", description: \'Accessible label for the data list region.\' },',
    '  ];',
],

"date-picker": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'selectionMode\', type: "\'single\' | \'multiple\' | \'range\'", default: "\'single\'", description: \'Controls single, multiple, or range selection.\' },',
    '    { name: \'dateFormat\', type: \'string\', default: "\'mm/dd/yy\'", description: \'Date display format string.\' },',
    '    { name: \'inline\', type: \'boolean\', default: \'false\', description: \'Renders the calendar inline.\' },',
    '    { name: \'showIcon\', type: \'boolean\', default: \'false\', description: \'Shows a calendar icon button.\' },',
    '    { name: \'showClear\', type: \'boolean\', default: \'false\', description: \'Shows a clear button.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'\'", description: \'Input placeholder text.\' },',
    '    { name: \'minDate\', type: \'Date | null\', default: \'null\', description: \'Earliest selectable date.\' },',
    '    { name: \'maxDate\', type: \'Date | null\', default: \'null\', description: \'Latest selectable date.\' },',
    '    { name: \'view\', type: "\'date\' | \'month\' | \'year\'", default: "\'date\'", description: \'Calendar granularity.\' },',
    '    { name: \'showTime\', type: \'boolean\', default: \'false\', description: \'Adds time picker below the calendar.\' },',
    '    { name: \'hourFormat\', type: "\'12\' | \'24\'", default: "\'24\'", description: \'Time format.\' },',
    '  ];',
],

"editor": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Editor size.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'\'", description: \'Placeholder text in the empty editor.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes the editor read-only.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the editor.\' },',
    '    { name: \'filled\', type: \'boolean\', default: \'false\', description: \'Applies a filled background style.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label for the editor region.\' },',
    '  ];',
],

"float-label": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    {',
    '      name: \'variant\',',
    '      type: "\'over\' | \'in\' | \'on\'",',
    '      default: "\'over\'",',
    '      description: "Controls the label animation style.",',
    '    },',
    '  ];',
],

"focus-trap": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    {',
    '      name: \'uiLibFocusTrap\',',
    '      type: \'boolean\',',
    '      default: \'false\',',
    '      description: \'When true, keyboard focus is contained within the host element.\',',
    '    },',
    '  ];',
],

"input-group": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    {',
    '      name: \'(no inputs)\',',
    '      type: \'—\',',
    '      description: \'InputGroup is a structural wrapper. Place uilib-input-group-addon and form controls as children.\',',
    '    },',
    '  ];',
],

"input-mask": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'mask\', type: \'string\', default: "\'\'", description: "Mask pattern, e.g. \'(999) 999-9999\'." },',
    '    { name: \'slotChar\', type: \'string\', default: "\'_\'", description: \'Character shown for empty mask slots.\' },',
    '    { name: \'autoClear\', type: \'boolean\', default: \'true\', description: \'Clears the field when incomplete on blur.\' },',
    '    { name: \'unmask\', type: \'boolean\', default: \'false\', description: \'Emits the raw unmasked value.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Input size.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the input.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes the input read-only.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label for the input.\' },',
    '    { name: \'maskHint\', type: \'string | null\', default: \'null\', description: \'Accessible hint for the expected format.\' },',
    '    { name: \'errorMessage\', type: \'string | null\', default: \'null\', description: \'Error message in an aria-live region.\' },',
    '  ];',
],

"input-number": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'mode\', type: "\'decimal\' | \'currency\'", default: "\'decimal\'", description: \'Formatting mode.\' },',
    '    { name: \'prefix\', type: \'string\', default: "\'\'", description: \'Text prefix.\' },',
    '    { name: \'suffix\', type: \'string\', default: "\'\'", description: \'Text suffix.\' },',
    '    { name: \'min\', type: \'number | null\', default: \'null\', description: \'Minimum allowed value.\' },',
    '    { name: \'max\', type: \'number | null\', default: \'null\', description: \'Maximum allowed value.\' },',
    '    { name: \'step\', type: \'number\', default: \'1\', description: \'Increment/decrement step.\' },',
    '    { name: \'showButtons\', type: \'boolean\', default: \'false\', description: \'Renders +/- spinner buttons.\' },',
    '    { name: \'buttonLayout\', type: "\'stacked\' | \'horizontal\' | \'vertical\'", default: "\'stacked\'", description: \'Button placement.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the input.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '  ];',
],

"input-otp": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'length\', type: \'number\', default: \'4\', description: \'Number of OTP digit cells.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: "\'One-time passcode\'", description: \'ARIA label for the group.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes all cells read-only.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables all cells.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the group as invalid.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Cell size.\' },',
    '  ];',
],

"inputs": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'label\', type: \'string\', default: "\'\'", description: \'Visible label rendered above or inside the input.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Input size.\' },',
    '    { name: \'type\', type: \'string\', default: "\'text\'", description: \'HTML input type.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'\'", description: \'Placeholder text.\' },',
    '    { name: \'error\', type: \'string | null\', default: \'null\', description: \'Error message below the field.\' },',
    '    { name: \'hint\', type: \'string | null\', default: \'null\', description: \'Hint text below the field.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the input.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes the input read-only.\' },',
    '    { name: \'required\', type: \'boolean\', default: \'false\', description: \'Marks the field as required.\' },',
    '    { name: \'showClear\', type: \'boolean\', default: \'false\', description: \'Shows a clear icon button.\' },',
    '  ];',
],

"key-filter": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    {',
    '      name: \'uilibKeyFilter\',',
    '      type: "KeyFilterPreset | RegExp",',
    '      description: "Preset name or a custom RegExp pattern. Required.",',
    '      required: true,',
    '    },',
    '    { name: \'keyFilterBypass\', type: \'boolean\', default: \'false\', description: \'When true, the filter is bypassed.\' },',
    '    { name: \'hintText\', type: \'string | null\', default: \'null\', description: \'Screen-reader hint text.\' },',
    '  ];',
],

"knob": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'min\', type: \'number\', default: \'0\', description: \'Minimum value.\' },',
    '    { name: \'max\', type: \'number\', default: \'100\', description: \'Maximum value.\' },',
    '    { name: \'step\', type: \'number\', default: \'1\', description: \'Value increment per key press.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Preset size.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'strokeWidth\', type: \'number\', default: \'14\', description: \'Arc stroke width in SVG units.\' },',
    '    { name: \'showValue\', type: \'boolean\', default: \'true\', description: \'Renders the current value inside the knob.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the knob.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes the knob read-only.\' },',
    '    { name: \'ariaLabel\', type: \'string | undefined\', default: \'undefined\', description: \'ARIA label for the knob.\' },',
    '  ];',
],

"mega-menu": [
    '  public readonly apiInputRows: readonly ApiPropRow[] = [',
    '    { name: \'model\', type: \'MegaMenuItem[]\', default: \'[]\', description: \'Top-level menu items.\' },',
    '    { name: \'orientation\', type: "\'horizontal\' | \'vertical\'", default: "\'horizontal\'", description: \'Mega menu orientation.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Menu size.\' },',
    '    { name: \'ariaLabel\', type: \'string\', default: "\'Menu\'", description: \'ARIA label for the navigation landmark.\' },',
    '  ];',
    '  public readonly apiOutputRows: readonly ApiPropRow[] = [',
    '    { name: \'(itemClick)\', type: \'OutputEmitterRef<MouseEvent>\', description: \'Emitted when a leaf item is clicked.\' },',
    '  ];',
    '  public readonly apiMenuItemRows: readonly ApiPropRow[] = [',
    '    { name: \'label\', type: \'string | undefined\', description: \'Item label text.\' },',
    '    { name: \'icon\', type: \'string | undefined\', description: \'CSS icon class.\' },',
    '    { name: \'items\', type: \'MegaMenuSubColumn[][] | undefined\', description: \'Sub-column groups.\' },',
    '    { name: \'disabled\', type: \'boolean | undefined\', description: \'Disables the item.\' },',
    '  ];',
    '  public readonly apiSubColumnRows: readonly ApiPropRow[] = [',
    '    { name: \'label\', type: \'string | undefined\', description: \'Column header label.\' },',
    '    { name: \'items\', type: \'MegaMenuSubItem[] | undefined\', description: \'Items inside the column.\' },',
    '  ];',
    '  public readonly apiSubItemRows: readonly ApiPropRow[] = [',
    '    { name: \'label\', type: \'string | undefined\', description: \'Item label text.\' },',
    '    { name: \'icon\', type: \'string | undefined\', description: \'CSS icon class.\' },',
    '    { name: \'disabled\', type: \'boolean | undefined\', description: \'Disables the item.\' },',
    '  ];',
],

"popover": [
    '  public readonly apiInputRows: readonly ApiPropRow[] = [',
    '    { name: \'header\', type: \'string | null\', default: \'null\', description: \'Optional header text inside the popover.\' },',
    '    { name: \'showCloseButton\', type: \'boolean\', default: \'false\', description: \'Renders a close button in the header.\' },',
    '    { name: \'dismissable\', type: \'boolean\', default: \'true\', description: \'Closes the popover when clicking outside.\' },',
    '    { name: \'closeOnEscape\', type: \'boolean\', default: \'true\', description: \'Closes the popover when pressing Escape.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '  ];',
    '  public readonly apiOutputRows: readonly ApiPropRow[] = [',
    '    { name: \'(shown)\', type: \'OutputEmitterRef<void>\', description: \'Emitted after the popover becomes visible.\' },',
    '    { name: \'(hidden)\', type: \'OutputEmitterRef<void>\', description: \'Emitted after the popover is fully hidden.\' },',
    '  ];',
    '  public readonly apiMethodRows: readonly ApiPropRow[] = [',
    '    { name: \'toggle(event)\', type: \'void\', description: \'Toggles the popover visibility relative to the event target.\' },',
    '    { name: \'show(event)\', type: \'void\', description: \'Shows the popover anchored to the event target element.\' },',
    '    { name: \'hide()\', type: \'void\', description: \'Hides the popover.\' },',
    '  ];',
],

"scroll-panel": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'styleClass\', type: \'string | null\', default: \'null\', description: \'Additional CSS class applied to the host.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'Accessible label for the scrollable region.\' },',
    '  ];',
],

"scroll-top": [
    '  public readonly inputRows: readonly ApiPropRow[] = [',
    '    { name: \'threshold\', type: \'number\', default: \'400\', description: \'Scroll distance in pixels before the button becomes visible.\' },',
    '    { name: \'target\', type: "\'window\' | \'parent\'", default: "\'window\'", description: "Scroll target." },',
    '    { name: \'icon\', type: \'string\', default: "\'pi pi-arrow-up\'", description: \'CSS class for the scroll-up icon.\' },',
    '    { name: \'behavior\', type: "\'smooth\' | \'auto\'", default: "\'smooth\'", description: \'Scroll animation behaviour.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Button size.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'styleClass\', type: \'string | null\', default: \'null\', description: \'Additional CSS class.\' },',
    '  ];',
    '  public readonly propertyRows: readonly ApiPropRow[] = [',
    '    { name: \'scrollUp()\', type: \'void\', description: \'Programmatically triggers the scroll-to-top action.\' },',
    '  ];',
],

"scroller": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'items\', type: \'unknown[] | null | undefined\', default: \'null\', description: \'Array of items to virtualise.\' },',
    '    { name: \'itemSize\', type: \'number | [number, number]\', default: \'0\', description: \'Height or width of each item in pixels.\' },',
    '    { name: \'scrollHeight\', type: \'string | undefined\', default: \'undefined\', description: \'CSS height of the scroll viewport.\' },',
    '    { name: \'orientation\', type: "\'vertical\' | \'horizontal\' | \'both\'", default: "\'vertical\'", description: \'Scroll axis.\' },',
    '    { name: \'lazy\', type: \'boolean\', default: \'false\', description: \'Enables lazy loading.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables virtual scrolling.\' },',
    '    { name: \'showLoader\', type: \'boolean\', default: \'false\', description: \'Shows a loading overlay during lazy loads.\' },',
    '  ];',
],

"select": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'options\', type: \'SelectOption[]\', default: \'[]\', description: \'Array of option objects.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Select size.\' },',
    '    { name: \'multiple\', type: \'boolean\', default: \'false\', description: \'Allows multi-selection.\' },',
    '    { name: \'searchable\', type: \'boolean\', default: \'false\', description: \'Adds a search input inside the dropdown.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'Select...\'", description: \'Placeholder text.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the select.\' },',
    '    { name: \'label\', type: \'string\', default: "\'\'", description: \'Visible label rendered above the select.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '  ];',
],

"slider": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'min\', type: \'number\', default: \'0\', description: \'Minimum value.\' },',
    '    { name: \'max\', type: \'number\', default: \'100\', description: \'Maximum value.\' },',
    '    { name: \'step\', type: \'number\', default: \'1\', description: \'Value increment.\' },',
    '    { name: \'range\', type: \'boolean\', default: \'false\', description: \'Enables range selection.\' },',
    '    { name: \'orientation\', type: "\'horizontal\' | \'vertical\'", default: "\'horizontal\'", description: \'Slider orientation.\' },',
    '    { name: \'animate\', type: \'boolean\', default: \'false\', description: \'Animates thumb movement.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the slider.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label for the slider thumb.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Slider size.\' },',
    '  ];',
],

"style-class": [
    '  public readonly apiInputRows: readonly ApiPropRow[] = [',
    '    { name: \'uiLibStyleClass\', type: \'string\', description: \'CSS selector for the target element. Required.\', required: true },',
    '    { name: \'enterActiveClass\', type: \'string\', default: "\'\'", description: \'Class(es) applied during the enter transition.\' },',
    '    { name: \'leaveActiveClass\', type: \'string\', default: "\'\'", description: \'Class(es) applied during the leave transition.\' },',
    '    { name: \'enterToClass\', type: \'string\', default: "\'\'", description: \'Class(es) applied at the end of the enter transition.\' },',
    '    { name: \'leaveToClass\', type: \'string\', default: "\'\'", description: \'Class(es) applied at the end of the leave transition.\' },',
    '    { name: \'toggleClass\', type: \'string\', default: "\'\'", description: \'Class(es) toggled on each trigger click.\' },',
    '    { name: \'hideOnOutsideClick\', type: \'boolean\', default: \'false\', description: \'Triggers the leave transition when clicking outside.\' },',
    '  ];',
],

"tabs": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Tab strip size.\' },',
    '    { name: \'orientation\', type: "\'horizontal\' | \'vertical\'", default: "\'horizontal\'", description: \'Orientation of the tab list.\' },',
    '    { name: \'activation\', type: "\'auto\' | \'manual\'", default: "\'auto\'", description: "Tab activation mode." },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label for the tab list.\' },',
    '    { name: \'defaultValue\', type: \'string | number | null\', default: \'null\', description: \'Initially selected tab value.\' },',
    '    { name: \'selectedValue\', type: \'string | number | null\', default: \'null\', description: \'Controlled selected tab value.\' },',
    '    { name: \'closable\', type: \'boolean\', default: \'false\', description: \'Shows a close button on each tab.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables all tabs.\' },',
    '  ];',
],

"textarea": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Component size.\' },',
    '    { name: \'label\', type: \'string\', default: "\'\'", description: \'Label text rendered above the textarea.\' },',
    '    { name: \'placeholder\', type: \'string\', default: "\'\'", description: \'Placeholder text.\' },',
    '    { name: \'rows\', type: \'number\', default: \'3\', description: \'Initial visible row count.\' },',
    '    { name: \'autoResize\', type: \'boolean\', default: \'false\', description: \'Grows the textarea to fit its content.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the textarea.\' },',
    '    { name: \'readonly\', type: \'boolean\', default: \'false\', description: \'Makes the textarea read-only.\' },',
    '    { name: \'invalid\', type: \'boolean\', default: \'false\', description: \'Marks the field as invalid.\' },',
    '  ];',
],

"toggle-button": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'onLabel\', type: \'string\', default: "\'Yes\'", description: \'Label shown when pressed.\' },',
    '    { name: \'offLabel\', type: \'string\', default: "\'No\'", description: \'Label shown when not pressed.\' },',
    '    { name: \'onIcon\', type: \'string | null\', default: \'null\', description: \'Icon class when pressed.\' },',
    '    { name: \'offIcon\', type: \'string | null\', default: \'null\', description: \'Icon class when not pressed.\' },',
    '    { name: \'ariaLabel\', type: \'string | null\', default: \'null\', description: \'ARIA label for the button.\' },',
    '    { name: \'disabled\', type: \'boolean\', default: \'false\', description: \'Disables the button.\' },',
    '    { name: \'size\', type: "\'sm\' | \'md\' | \'lg\'", default: "\'md\'", description: \'Button size.\' },',
    '    { name: \'variant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '  ];',
],

"tooltip": [
    '  public readonly apiRows: readonly ApiPropRow[] = [',
    '    { name: \'uiLibTooltip\', type: \'string\', default: "\'\'", description: \'Tooltip text content.\' },',
    '    { name: \'tooltipPosition\', type: "\'top\' | \'bottom\' | \'left\' | \'right\'", default: "\'top\'", description: \'Preferred tooltip placement.\' },',
    '    { name: \'tooltipEvent\', type: "\'hover\' | \'focus\' | \'both\'", default: "\'hover\'", description: \'Trigger event for the tooltip.\' },',
    '    { name: \'showDelay\', type: \'number\', default: \'0\', description: \'Delay in ms before showing.\' },',
    '    { name: \'hideDelay\', type: \'number\', default: \'0\', description: \'Delay in ms before hiding.\' },',
    '    { name: \'tooltipDisabled\', type: \'boolean\', default: \'false\', description: \'Hides the tooltip entirely when true.\' },',
    '    { name: \'tooltipVariant\', type: "\'material\' | \'bootstrap\' | \'minimal\' | null", default: \'null\', description: \'Design variant.\' },',
    '  ];',
],
}

# ── map from TS file path (relative) to component key ───────────────────────

TS_TO_COMP = {
    "bind/bind-demo.component.ts": "bind",
    "cascade-select/cascade-select-demo.component.ts": "cascade-select",
    "chart/chart-demo.component.ts": "chart",
    "color-picker/color-picker-demo.component.ts": "color-picker",
    "data-view/data-view-demo.component.ts": "data-view",
    "date-picker/date-picker-demo.component.ts": "date-picker",
    "editor/editor-demo.component.ts": "editor",
    "float-label/float-label-demo.ts": "float-label",
    "focus-trap/focus-trap-demo.component.ts": "focus-trap",
    "input-group/input-group-demo.component.ts": "input-group",
    "input-mask/input-mask-demo.component.ts": "input-mask",
    "input-number/input-number-demo.component.ts": "input-number",
    "input-otp/input-otp-demo.component.ts": "input-otp",
    "inputs/inputs.component.ts": "inputs",
    "key-filter/key-filter-demo.component.ts": "key-filter",
    "knob/knob-demo.component.ts": "knob",
    "mega-menu/mega-menu-demo.component.ts": "mega-menu",
    "popover/popover-demo.component.ts": "popover",
    "scroll-panel/scroll-panel-demo.component.ts": "scroll-panel",
    "scroll-top/scroll-top-demo.component.ts": "scroll-top",
    "scroller/scroller-demo.component.ts": "scroller",
    "select/select.component.ts": "select",
    "slider/slider-demo.component.ts": "slider",
    "style-class/style-class-demo.component.ts": "style-class",
    "tabs/tabs.component.ts": "tabs",
    "textarea/textarea-demo.component.ts": "textarea",
    "toggle-button/toggle-button-demo.component.ts": "toggle-button",
    "tooltip/tooltip-demo.component.ts": "tooltip",
}


def fix_file(ts_path):
    try:
        content = read(ts_path)
    except Exception as e:
        print(f"  SKIP: {e}")
        return

    # Find corresponding HTML template
    html_path = ts_path.replace(".ts", ".html")
    if not os.path.exists(html_path):
        m = re.search(r"templateUrl:\s*'\./(.*?)'", content)
        if m:
            html_path = os.path.join(os.path.dirname(ts_path), m.group(1))

    html_content = ""
    if os.path.exists(html_path):
        try:
            html_content = read(html_path)
        except Exception:
            pass

    uses_code_snippet_html = "<ui-lib-code-snippet" in html_content
    uses_doc_code_example_html = "<app-doc-code-example" in html_content
    uses_doc_api_ref_html = "<app-doc-api-reference" in html_content

    # Detect in TOP-LEVEL import section only (first N lines before @Component)
    component_start = content.find("@Component")
    if component_start < 0:
        component_start = len(content)
    header = content[:component_start]

    imports_code_snippet_ts = bool(re.search(r"^import\b.*\bCodeSnippet\b", header, re.MULTILINE))
    imports_doc_code_example_ts = bool(re.search(r"^import\b.*\bDocCodeExampleComponent\b", header, re.MULTILINE))
    imports_doc_api_ref_ts = bool(re.search(r"^import\b.*\bDocApiReferenceComponent\b", header, re.MULTILINE))
    has_api_rows = ("readonly apiRows" in content or "readonly apiInputRows" in content or "readonly inputRows" in content)

    changed = False
    lines = content.splitlines(keepends=True)

    # 1. Remove CodeSnippet from @Component imports[] array (not from import statements)
    if imports_code_snippet_ts and not uses_code_snippet_html:
        new_lines = remove_import_statement(lines, "CodeSnippet")
        new_lines = remove_symbol_from_imports_array(new_lines, "CodeSnippet")
        if new_lines != lines:
            lines = new_lines
            changed = True
            print("  Removed CodeSnippet")

    # 2. Remove DocCodeExampleComponent from @Component imports[] array
    if imports_doc_code_example_ts and not uses_doc_code_example_html:
        new_lines = remove_import_statement(lines, "DocCodeExampleComponent")
        new_lines = remove_symbol_from_imports_array(new_lines, "DocCodeExampleComponent")
        if new_lines != lines:
            lines = new_lines
            changed = True
            print("  Removed DocCodeExampleComponent")

    # 3. Add DocApiReferenceComponent if needed
    if uses_doc_api_ref_html and not imports_doc_api_ref_ts:
        # Add import statements
        new_imports = [
            DOC_API_REF_IMPORT + "\n",
            DOC_API_REF_TYPE_IMPORT + "\n",
        ]
        lines = add_import_statements(lines, new_imports)
        # Add to @Component imports array
        lines = add_to_component_imports_array(lines, "DocApiReferenceComponent")
        changed = True
        print("  Added DocApiReferenceComponent")

    # 4. Add apiRows property
    if uses_doc_api_ref_html and not has_api_rows:
        rel = os.path.relpath(ts_path, PAGES).replace("\\", "/")
        comp_key = TS_TO_COMP.get(rel, "")
        prop_lines = API_ROWS.get(comp_key)
        if prop_lines:
            lines = add_class_property(lines, "\n".join(prop_lines))
            changed = True
            print(f"  Added apiRows for '{comp_key}'")
        else:
            fallback = ['  public readonly apiRows: readonly ApiPropRow[] = [];']
            lines = add_class_property(lines, "\n".join(fallback))
            changed = True
            print(f"  Added empty apiRows placeholder for '{comp_key}'")

    if changed:
        write(ts_path, "".join(lines))


# ── main ─────────────────────────────────────────────────────────────────────

for root, dirs, files in sorted(os.walk(PAGES)):
    for f in sorted(files):
        if f.endswith(".ts") and not f.endswith(".spec.ts"):
            ts_path = os.path.join(root, f)
            rel = os.path.relpath(ts_path, PAGES).replace("\\", "/")
            print(rel)
            fix_file(ts_path)

print("\nDone.")

