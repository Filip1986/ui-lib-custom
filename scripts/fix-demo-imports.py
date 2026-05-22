"""
Fix script for demo component warnings and errors.
1. Removes unused CodeSnippet / DocCodeExampleComponent from imports[]
2. Adds DocApiReferenceComponent import where <app-doc-api-reference> is used
3. Adds apiRows (and related) properties to components that reference them in templates
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(BASE, "projects", "demo", "src", "app", "pages")

# ── helpers ─────────────────────────────────────────────────────────────────

def read(path):
    return open(path, encoding="utf-8").read()

def write(path, content):
    open(path, "w", encoding="utf-8").write(content)

def remove_import_line(content, symbol):
    """Remove a standalone import line that imports `symbol`."""
    # Handles: import { Symbol } from '...' or import { A, Symbol, B } from '...'
    # Step 1: remove from multi-symbol import
    # e.g. remove ', Symbol' or 'Symbol, ' from import { A, Symbol } from '...'
    content = re.sub(
        r'(import\s*\{[^}]*),\s*' + re.escape(symbol) + r'(\s*\})',
        r'\1\2',
        content,
    )
    content = re.sub(
        r'(import\s*\{)\s*' + re.escape(symbol) + r'\s*,(\s*[^}]*\})',
        r'\1\2',
        content,
    )
    # Step 2: remove entire single-symbol import line
    content = re.sub(
        r'^\s*import\s*\{?\s*' + re.escape(symbol) + r'\s*\}?\s*from\s*[\'"][^\'"]+[\'"]\s*;\s*\n',
        '',
        content,
        flags=re.MULTILINE,
    )
    # Step 3: remove from imports[] array (standalone line like "    Symbol,")
    content = re.sub(
        r'^[ \t]*' + re.escape(symbol) + r'\s*,?\s*\n',
        '',
        content,
        flags=re.MULTILINE,
    )
    # Also handle trailing comma case when Symbol is last
    content = re.sub(
        r',\s*' + re.escape(symbol) + r'\s*(?=\s*\])',
        '',
        content,
    )
    return content


def remove_from_imports_array(content, symbol):
    """Remove just from the imports[] array, not from import statements."""
    content = re.sub(
        r'^[ \t]*' + re.escape(symbol) + r'\s*,\s*\n',
        '',
        content,
        flags=re.MULTILINE,
    )
    content = re.sub(
        r',\s*\n?[ \t]*' + re.escape(symbol) + r'(\s*,)',
        r'\1',
        content,
    )
    content = re.sub(
        r',\s*\n?[ \t]*' + re.escape(symbol) + r'(\s*\n[ \t]*\])',
        r'\1',
        content,
    )
    return content


def add_import_statement(content, import_line, after_pattern=None):
    """Add an import line at the end of the import block if not already present."""
    if import_line.split('{')[1].split('}')[0].strip().split(',')[0].strip() in content:
        return content
    # Find insertion point: after last import line
    lines = content.split('\n')
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.strip().startswith('import '):
            last_import_idx = i
    if last_import_idx >= 0:
        lines.insert(last_import_idx + 1, import_line)
        return '\n'.join(lines)
    return import_line + '\n' + content


def add_to_imports_array(content, symbol, after=None):
    """Add symbol to the @Component imports[] array."""
    if f'    {symbol},' in content or f'    {symbol}\n' in content:
        return content
    # Find the imports array
    if after and after in content:
        content = re.sub(
            r'(' + re.escape(after) + r',?\s*\n)',
            r'\1    ' + symbol + ',\n',
            content,
            count=1,
        )
    else:
        # Add before the closing bracket of imports: [ ... ]
        content = re.sub(
            r'(  imports:\s*\[[^\]]*?)(\s*\])',
            lambda m: m.group(1) + ',\n    ' + symbol + m.group(2),
            content,
            count=1,
            flags=re.DOTALL,
        )
    return content


def add_api_rows(content, rows_code):
    """Add apiRows property before the last closing } of the class."""
    if 'readonly apiRows' in content or 'apiRows:' in content:
        return content
    # Insert before the last closing brace
    last_brace = content.rfind('\n}')
    if last_brace == -1:
        return content
    return content[:last_brace] + '\n' + rows_code + '\n' + content[last_brace:]


# ── API rows definitions (per component) ────────────────────────────────────

API_ROWS = {

'bind': '''  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'uiLibBind',
      type: 'Record<string, unknown>',
      default: '{}',
      description:
        'An object whose keys are HTML attribute/property names and values are the values to apply. Falsy values remove the attribute; truthy values set it.',
    },
  ];''',

'cascade-select': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'options', type: 'unknown[]', default: '[]', description: 'The hierarchical option array.' },
    { name: 'optionLabel', type: 'string', default: "'label'", description: 'Property name for the display label.' },
    { name: 'optionValue', type: 'string | undefined', default: 'undefined', description: 'Property name for the value. Defaults to the entire option object.' },
    { name: 'optionGroupLabel', type: 'string', default: "'label'", description: 'Property name for the group label.' },
    { name: 'optionGroupChildren', type: 'string[]', default: "[]", description: 'Property path chain for nested children.' },
    { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder text shown when no value is selected.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | undefined", default: 'undefined', description: 'Design variant. Inherits global theme when not set.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading indicator.' },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    { name: 'fluid', type: 'boolean', default: 'false', description: 'Makes the component full-width.' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'Applies a filled background style.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
    { name: 'inputId', type: 'string', default: "''", description: 'Id of the inner input element.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the component.' },
    { name: 'ariaLabelledBy', type: 'string | null', default: 'null', description: 'Id of a labelling element.' },
  ];''',

'chart': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'data', type: "ChartData<'bar'> | null", default: 'null', description: 'Chart.js data configuration object.' },
    { name: 'options', type: "ChartOptions<'bar'> | null", default: 'null', description: 'Chart.js options object.' },
    { name: 'plugins', type: 'Plugin[]', default: '[]', description: 'Additional Chart.js plugins.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Predefined size preset.' },
    { name: 'responsive', type: 'boolean', default: 'true', description: 'Enables responsive resizing.' },
    { name: 'maintainAspectRatio', type: 'boolean', default: 'true', description: 'Keeps the configured aspect ratio.' },
    { name: 'ariaLabel', type: 'string', default: "'Chart'", description: 'Accessible label for the canvas element.' },
    { name: 'height', type: 'string | null', default: 'null', description: 'Explicit height (e.g. "400px").' },
    { name: 'width', type: 'string | null', default: 'null', description: 'Explicit width (e.g. "600px").' },
  ];''',

'color-picker': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'format', type: "'hex' | 'rgb' | 'hsb'", default: "'hex'", description: 'Color output format.' },
    { name: 'inline', type: 'boolean', default: 'false', description: 'Renders the picker inline instead of as a dropdown.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the color picker.' },
    { name: 'inputId', type: 'string', default: "''", description: 'Id of the trigger element.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
    { name: 'appendTo', type: "string | HTMLElement | 'body'", default: "'body'", description: 'Target for the overlay portal.' },
  ];''',

'data-view': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'value', type: 'T[]', description: 'Array of items to display. Required.', required: true },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading skeleton.' },
    { name: 'emptyMessage', type: 'string', default: "'No records found.'", description: 'Message shown when the list is empty.' },
    { name: 'gridColumns', type: 'number', default: '3', description: 'Number of columns in the grid layout.' },
    { name: 'gridGap', type: 'string', default: "'1rem'", description: 'CSS gap between grid cells.' },
    { name: 'dataKey', type: 'string | null', default: 'null', description: 'Property name used as the unique row key.' },
    { name: 'paginator', type: 'boolean', default: 'false', description: 'Enables pagination controls.' },
    { name: 'rows', type: 'number', default: '10', description: 'Rows per page when paginator is enabled.' },
    { name: 'totalRecords', type: 'number | null', default: 'null', description: 'Total record count for server-side pagination.' },
    { name: 'rowsPerPageOptions', type: 'number[] | null', default: 'null', description: 'Available page size options.' },
    { name: 'ariaLabel', type: 'string', default: "'Data list'", description: 'Accessible label for the data list region.' },
  ];''',

'date-picker': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'selectionMode', type: "'single' | 'multiple' | 'range'", default: "'single'", description: 'Controls single, multiple, or range selection.' },
    { name: 'dateFormat', type: 'string', default: "'mm/dd/yy'", description: 'Date display format string.' },
    { name: 'locale', type: 'DatePickerLocale', default: 'DEFAULT_LOCALE', description: 'Locale configuration for day/month names and first-day-of-week.' },
    { name: 'inline', type: 'boolean', default: 'false', description: 'Renders the calendar inline.' },
    { name: 'showIcon', type: 'boolean', default: 'false', description: 'Shows a calendar icon button.' },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Input placeholder text.' },
    { name: 'inputId', type: 'string', default: "''", description: 'ID for the inner input.' },
    { name: 'minDate', type: 'Date | null', default: 'null', description: 'Earliest selectable date.' },
    { name: 'maxDate', type: 'Date | null', default: 'null', description: 'Latest selectable date.' },
    { name: 'disabledDates', type: 'Date[]', default: '[]', description: 'Array of dates to disable.' },
    { name: 'disabledDays', type: 'number[]', default: '[]', description: 'Array of weekday indices (0=Sunday) to disable.' },
    { name: 'view', type: "'date' | 'month' | 'year'", default: "'date'", description: 'Calendar granularity.' },
    { name: 'numberOfMonths', type: 'number', default: '1', description: 'Number of months rendered side-by-side.' },
    { name: 'showTime', type: 'boolean', default: 'false', description: 'Adds time picker below the calendar.' },
    { name: 'hourFormat', type: "'12' | '24'", default: "'24'", description: 'Time format for the time picker.' },
  ];''',

'editor': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant. Inherits global theme when not set.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Editor size.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text shown in the empty editor.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the editor read-only.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the editor.' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'Applies a filled background style.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the editor region.' },
    { name: 'ariaLabelledBy', type: 'string | null', default: 'null', description: 'ID of an element labelling the editor.' },
  ];''',

'float-label': '''  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'over' | 'in' | 'on'",
      default: "'over'",
      description: "Controls the label animation style. 'over' floats above on focus; 'in' slides inside; 'on' stays on the border.",
    },
  ];''',

'focus-trap': '''  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'uiLibFocusTrap',
      type: 'boolean',
      default: 'false',
      description:
        'When true, keyboard focus is contained within the host element. Useful for modal dialogs and flyout menus.',
    },
  ];''',

'input-group': '''  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: '(no inputs)',
      type: '—',
      description: 'InputGroup is a structural wrapper. Place uilib-input-group-addon and form controls as children.',
    },
  ];''',

'input-mask': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'mask', type: 'string', default: "''", description: "Mask pattern, e.g. '(999) 999-9999'. 9=digit, a=alpha, *=alphanumeric or symbol." },
    { name: 'slotChar', type: 'string', default: "'_'", description: 'Character shown for empty mask slots.' },
    { name: 'autoClear', type: 'boolean', default: 'true', description: 'Clears the field when the input is incomplete on blur.' },
    { name: 'unmask', type: 'boolean', default: 'false', description: "When true, emits the raw unmasked value instead of the masked string." },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear icon to reset the value.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the input read-only.' },
    { name: 'placeholder', type: 'string | undefined', default: 'undefined', description: 'Placeholder text.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
    { name: 'fluid', type: 'boolean', default: 'false', description: 'Stretches the input to full width.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the input.' },
    { name: 'maskHint', type: 'string | null', default: 'null', description: 'Accessible hint announcing the expected format.' },
    { name: 'errorMessage', type: 'string | null', default: 'null', description: 'Error message rendered in an aria-live region.' },
  ];''',

'input-number': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'mode', type: "'decimal' | 'currency'", default: "'decimal'", description: 'Formatting mode.' },
    { name: 'format', type: 'boolean', default: 'true', description: 'Enables locale-aware number formatting.' },
    { name: 'locale', type: 'string | undefined', default: 'undefined', description: 'BCP 47 locale tag, e.g. "en-US".' },
    { name: 'currency', type: 'string | undefined', default: 'undefined', description: 'ISO 4217 currency code, e.g. "USD".' },
    { name: 'prefix', type: 'string', default: "''", description: 'Text prefix appended before the number.' },
    { name: 'suffix', type: 'string', default: "''", description: 'Text suffix appended after the number.' },
    { name: 'min', type: 'number | null', default: 'null', description: 'Minimum allowed value.' },
    { name: 'max', type: 'number | null', default: 'null', description: 'Maximum allowed value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step.' },
    { name: 'showButtons', type: 'boolean', default: 'false', description: 'Renders +/- spinner buttons.' },
    { name: 'buttonLayout', type: "'stacked' | 'horizontal' | 'vertical'", default: "'stacked'", description: 'Placement of the spinner buttons.' },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear icon.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Input placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the input read-only.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
  ];''',

'input-otp': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'length', type: 'number', default: '4', description: 'Number of OTP digit cells.' },
    { name: 'id', type: 'string | null', default: 'null', description: 'ID attribute for the wrapper element.' },
    { name: 'ariaLabel', type: 'string | null', default: "'One-time passcode'", description: 'ARIA label for the group.' },
    { name: 'ariaLabelledBy', type: 'string | null', default: 'null', description: 'ID of an element labelling the group.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes all cells read-only.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all cells.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the group as invalid.' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'Applies a filled background style.' },
    { name: 'integer', type: 'boolean', default: 'true', description: 'Restricts input to digits only.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cell size.' },
  ];''',

'inputs': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'id', type: 'string | null', default: 'null', description: 'ID for the underlying <input> element.' },
    { name: 'name', type: 'string | null', default: 'null', description: 'Name attribute for form submission.' },
    { name: 'label', type: 'string', default: "''", description: 'Visible label rendered above or inside the input.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'type', type: 'string', default: "'text'", description: 'HTML input type (text, email, password, …).' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    { name: 'error', type: 'string | null', default: 'null', description: 'Error message displayed below the field.' },
    { name: 'hint', type: 'string | null', default: 'null', description: 'Hint text displayed below the field.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the input read-only.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { name: 'showCounter', type: 'boolean', default: 'false', description: 'Shows a character counter (requires maxLength).' },
    { name: 'maxLength', type: 'number | null', default: 'null', description: 'Maximum character length.' },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear icon button.' },
    { name: 'showTogglePassword', type: 'boolean', default: 'false', description: 'Shows a toggle to reveal/hide the password.' },
  ];''',

'key-filter': '''  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'uilibKeyFilter',
      type: "KeyFilterPreset | RegExp",
      description: "Preset name ('alpha', 'alphaNum', 'num', 'int', 'pInt', 'money', 'email', 'hex') or a custom RegExp pattern. Required.",
      required: true,
    },
    { name: 'keyFilterBypass', type: 'boolean', default: 'false', description: 'When true, the filter is bypassed and all characters are allowed.' },
    { name: 'hintText', type: 'string | null', default: 'null', description: 'Screen-reader hint text injected via aria-describedby.' },
  ];''',

'knob': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment per key press.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Preset size.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'strokeWidth', type: 'number', default: '14', description: 'Arc stroke width in SVG units.' },
    { name: 'showValue', type: 'boolean', default: 'true', description: 'Renders the current value inside the knob.' },
    { name: 'valueTemplate', type: 'string | null', default: 'null', description: 'Template string for the value display, e.g. "{value}%".' },
    { name: 'valueColor', type: 'string | null', default: 'null', description: 'Fill colour of the value arc.' },
    { name: 'textColor', type: 'string | null', default: 'null', description: 'Colour of the value text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the knob.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the knob read-only.' },
    { name: 'ariaLabel', type: 'string | undefined', default: 'undefined', description: 'ARIA label for the knob.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
  ];''',

# mega-menu uses multiple named row arrays
'mega-menu': {
  'apiInputRows': '''  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'model', type: 'MegaMenuItem[]', default: '[]', description: 'Top-level menu items.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Mega menu orientation.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Menu size.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class.' },
    { name: 'ariaLabel', type: 'string', default: "'Menu'", description: 'ARIA label for the navigation landmark.' },
  ];''',
  'apiOutputRows': '''  public readonly apiOutputRows: readonly ApiPropRow[] = [
    { name: '(itemClick)', type: 'OutputEmitterRef<MouseEvent>', description: 'Emitted when a leaf item is clicked.' },
  ];''',
  'apiMenuItemRows': '''  public readonly apiMenuItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Item label text.' },
    { name: 'icon', type: 'string | undefined', description: 'CSS icon class.' },
    { name: 'items', type: 'MegaMenuSubColumn[][] | undefined', description: 'Sub-column groups revealed in the mega panel.' },
    { name: 'disabled', type: 'boolean | undefined', description: 'Disables the item.' },
    { name: 'routerLink', type: 'unknown', description: 'Router link value.' },
    { name: 'url', type: 'string | undefined', description: 'External href.' },
    { name: 'target', type: 'string | undefined', description: 'Link target attribute.' },
    { name: 'styleClass', type: 'string | undefined', description: 'Extra CSS classes.' },
  ];''',
  'apiSubColumnRows': '''  public readonly apiSubColumnRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Column header label.' },
    { name: 'items', type: 'MegaMenuSubItem[] | undefined', description: 'Items inside the column.' },
  ];''',
  'apiSubItemRows': '''  public readonly apiSubItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Item label text.' },
    { name: 'icon', type: 'string | undefined', description: 'CSS icon class.' },
    { name: 'disabled', type: 'boolean | undefined', description: 'Disables the item.' },
    { name: 'routerLink', type: 'unknown', description: 'Router link value.' },
    { name: 'url', type: 'string | undefined', description: 'External href.' },
    { name: 'separator', type: 'boolean | undefined', description: 'Renders a separator line instead of a clickable item.' },
  ];''',
},

# popover uses multiple named row arrays
'popover': {
  'apiInputRows': '''  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'header', type: 'string | null', default: 'null', description: 'Optional header text inside the popover.' },
    { name: 'showCloseButton', type: 'boolean', default: 'false', description: 'Renders a close button in the header.' },
    { name: 'dismissable', type: 'boolean', default: 'true', description: 'Closes the popover when clicking outside.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Closes the popover when pressing Escape.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class.' },
  ];''',
  'apiOutputRows': '''  public readonly apiOutputRows: readonly ApiPropRow[] = [
    { name: '(shown)', type: 'OutputEmitterRef<void>', description: 'Emitted after the popover becomes visible.' },
    { name: '(hidden)', type: 'OutputEmitterRef<void>', description: 'Emitted after the popover is fully hidden.' },
  ];''',
  'apiMethodRows': '''  public readonly apiMethodRows: readonly ApiPropRow[] = [
    { name: 'toggle(event)', type: 'void', description: 'Toggles the popover visibility relative to the event target.' },
    { name: 'show(event)', type: 'void', description: 'Shows the popover anchored to the event target element.' },
    { name: 'hide()', type: 'void', description: 'Hides the popover.' },
  ];''',
},

'scroll-panel': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant. Inherits global theme when null.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class applied to the host.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label for the scrollable region.' },
  ];''',

# scroll-top uses inputRows and propertyRows
'scroll-top': {
  'inputRows': '''  public readonly inputRows: readonly ApiPropRow[] = [
    { name: 'threshold', type: 'number', default: '400', description: 'Scroll distance in pixels before the button becomes visible.' },
    { name: 'target', type: "'window' | 'parent'", default: "'window'", description: "Scroll target. Use 'parent' for a scrollable container." },
    { name: 'icon', type: 'string', default: "'pi pi-arrow-up'", description: 'CSS class for the scroll-up icon.' },
    { name: 'behavior', type: "'smooth' | 'auto'", default: "'smooth'", description: 'Scroll animation behaviour.' },
    { name: 'buttonAriaLabel', type: 'string', default: "'Back to top'", description: 'ARIA label for the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class.' },
  ];''',
  'propertyRows': '''  public readonly propertyRows: readonly ApiPropRow[] = [
    { name: 'scrollUp()', type: 'void', description: 'Programmatically triggers the scroll-to-top action.' },
  ];''',
},

'scroller': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'items', type: 'unknown[] | null | undefined', default: 'null', description: 'Array of items to virtualise.' },
    { name: 'itemSize', type: 'number | [number, number]', default: '0', description: 'Height (vertical) or width (horizontal) of each item in pixels.' },
    { name: 'scrollHeight', type: 'string | undefined', default: 'undefined', description: 'CSS height of the scroll viewport.' },
    { name: 'scrollWidth', type: 'string | undefined', default: 'undefined', description: 'CSS width of the scroll viewport.' },
    { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Scroll axis.' },
    { name: 'step', type: 'number', default: '0', description: 'Buffer step count used for rendering beyond the visible area.' },
    { name: 'lazy', type: 'boolean', default: 'false', description: 'Enables lazy loading — emits (lazyLoad) events instead of pre-rendering.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables virtual scrolling and renders all items.' },
    { name: 'columns', type: 'unknown[] | null | undefined', default: 'null', description: 'Optional horizontal column data for two-dimensional scrolling.' },
    { name: 'showLoader', type: 'boolean', default: 'false', description: 'Shows a loading overlay during lazy loads.' },
  ];''',

'select': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of option objects ({ label, value, disabled? }).' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Select size.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multi-selection.' },
    { name: 'searchable', type: 'boolean', default: 'false', description: 'Adds a search input inside the dropdown.' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text shown when no value is selected.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading indicator.' },
    { name: 'label', type: 'string', default: "''", description: 'Visible label rendered above the select.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
  ];''',

'slider': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment.' },
    { name: 'range', type: 'boolean', default: 'false', description: 'Enables range selection with two handles.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Slider orientation.' },
    { name: 'animate', type: 'boolean', default: 'false', description: 'Animates thumb movement when clicking the track.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the slider read-only.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the slider thumb.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider size.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class.' },
  ];''',

# style-class uses apiInputRows
'style-class': {
  'apiInputRows': '''  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'uiLibStyleClass', type: 'string', description: 'CSS selector string or element reference pointing to the target element. Required.', required: true },
    { name: 'enterFromClass', type: 'string', default: "''", description: 'Class(es) applied at the start of the enter transition.' },
    { name: 'enterActiveClass', type: 'string', default: "''", description: 'Class(es) applied during the enter transition.' },
    { name: 'enterToClass', type: 'string', default: "''", description: 'Class(es) applied at the end of the enter transition.' },
    { name: 'enterDoneClass', type: 'string', default: "''", description: 'Class(es) that persist after the enter transition completes.' },
    { name: 'leaveFromClass', type: 'string', default: "''", description: 'Class(es) applied at the start of the leave transition.' },
    { name: 'leaveActiveClass', type: 'string', default: "''", description: 'Class(es) applied during the leave transition.' },
    { name: 'leaveToClass', type: 'string', default: "''", description: 'Class(es) applied at the end of the leave transition.' },
    { name: 'leaveDoneClass', type: 'string', default: "''", description: 'Class(es) that persist after the leave transition completes.' },
    { name: 'toggleClass', type: 'string', default: "''", description: 'Class(es) toggled on each trigger click (shorthand for enter/leave).' },
    { name: 'hideOnOutsideClick', type: 'boolean', default: 'false', description: 'Triggers the leave transition when clicking outside the target.' },
  ];''',
},

'tabs': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tab strip size.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation of the tab list.' },
    { name: 'activation', type: "'auto' | 'manual'", default: "'auto'", description: "Tab activation mode. 'auto' activates on focus/arrow; 'manual' requires Enter/Space." },
    { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'start'", description: 'Alignment of the tab buttons.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the tab list.' },
    { name: 'mode', type: "'default' | 'scrollable'", default: "'default'", description: 'Scrollable mode shows overflow tabs behind scroll buttons.' },
    { name: 'defaultValue', type: 'string | number | null', default: 'null', description: 'Initially selected tab value.' },
    { name: 'selectedValue', type: 'string | number | null', default: 'null', description: 'Controlled selected tab value.' },
    { name: 'lazy', type: 'boolean | LazyMode', default: 'false', description: 'Defers rendering of inactive tab panels.' },
    { name: 'closable', type: 'boolean', default: 'false', description: 'Shows a close button on each tab.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all tabs.' },
  ];''',

'textarea': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    { name: 'label', type: 'string', default: "''", description: 'Label text rendered above the textarea.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    { name: 'rows', type: 'number', default: '3', description: 'Initial visible row count.' },
    { name: 'maxRows', type: 'number | null', default: 'null', description: 'Maximum rows before scrolling appears (requires autoResize).' },
    { name: 'cols', type: 'number | null', default: 'null', description: 'Column count hint (native cols attribute).' },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'none'", description: 'Resize handle direction.' },
    { name: 'autoResize', type: 'boolean', default: 'false', description: 'Grows the textarea to fit its content.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the textarea read-only.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
  ];''',

'toggle-button': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'onLabel', type: 'string', default: "'Yes'", description: 'Label shown when the button is pressed.' },
    { name: 'offLabel', type: 'string', default: "'No'", description: 'Label shown when the button is not pressed.' },
    { name: 'onIcon', type: 'string | null', default: 'null', description: 'Icon class shown when pressed.' },
    { name: 'offIcon', type: 'string | null', default: 'null', description: 'Icon class shown when not pressed.' },
    { name: 'iconPos', type: "'left' | 'right'", default: "'left'", description: 'Icon position relative to the label.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label for the button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'autofocus', type: 'boolean', default: 'false', description: 'Autofocuses the button on init.' },
    { name: 'allowEmpty', type: 'boolean', default: 'true', description: 'When false, prevents deselection by clicking a pressed button.' },
    { name: 'variant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
    { name: 'styleClass', type: 'string | null', default: 'null', description: 'Additional CSS class.' },
  ];''',

'tooltip': '''  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'uiLibTooltip', type: 'string', default: "''", description: 'Tooltip text content.' },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred tooltip placement.' },
    { name: 'tooltipEvent', type: "'hover' | 'focus' | 'both'", default: "'hover'", description: 'Trigger event for the tooltip.' },
    { name: 'showDelay', type: 'number', default: '0', description: 'Delay in milliseconds before showing.' },
    { name: 'hideDelay', type: 'number', default: '0', description: 'Delay in milliseconds before hiding.' },
    { name: 'tooltipDisabled', type: 'boolean', default: 'false', description: 'Hides the tooltip entirely when true.' },
    { name: 'tooltipVariant', type: "'material' | 'bootstrap' | 'minimal' | null", default: 'null', description: 'Design variant.' },
  ];''',
}

# ── map from TS file path (relative) to component key ───────────────────────

TS_TO_COMP = {
    'animated-on-scroll/animated-on-scroll-demo.component.ts': 'animated-on-scroll',
    'autocomplete/autocomplete-demo.component.ts': 'autocomplete',
    'avatar/avatar-demo.component.ts': 'avatar',
    'badges/badges.component.ts': 'badges',
    'bind/bind-demo.component.ts': 'bind',
    'bottom-sheet/bottom-sheet-demo.component.ts': 'bottom-sheet',
    'cards/cards.component.ts': 'cards',
    'cascade-select/cascade-select-demo.component.ts': 'cascade-select',
    'chart/chart-demo.component.ts': 'chart',
    'chip/chip-demo.component.ts': 'chip',
    'color-picker/color-picker-demo.component.ts': 'color-picker',
    'data-view/data-view-demo.component.ts': 'data-view',
    'date-picker/date-picker-demo.component.ts': 'date-picker',
    'editor/editor-demo.component.ts': 'editor',
    'float-label/float-label-demo.ts': 'float-label',
    'focus-trap/focus-trap-demo.component.ts': 'focus-trap',
    'icon-field/icon-field-demo.component.ts': 'icon-field',
    'icons/icons-demo.component.ts': 'icons',
    'image/image-demo.component.ts': 'image',
    'image-compare/image-compare-demo.component.ts': 'image-compare',
    'input-group/input-group-demo.component.ts': 'input-group',
    'input-mask/input-mask-demo.component.ts': 'input-mask',
    'input-number/input-number-demo.component.ts': 'input-number',
    'input-otp/input-otp-demo.component.ts': 'input-otp',
    'inputs/inputs.component.ts': 'inputs',
    'key-filter/key-filter-demo.component.ts': 'key-filter',
    'knob/knob-demo.component.ts': 'knob',
    'layouts/composition-section.component.ts': 'layouts',
    'layouts/container-section.component.ts': 'layouts',
    'layouts/design-tokens-section.component.ts': 'layouts',
    'layouts/grid-section.component.ts': 'layouts',
    'layouts/inline-section.component.ts': 'layouts',
    'layouts/layouts.component.ts': 'layouts',
    'layouts/semantic-spacing-section.component.ts': 'layouts',
    'layouts/stack-section.component.ts': 'layouts',
    'listbox/listbox-demo.component.ts': 'listbox',
    'mega-menu/mega-menu-demo.component.ts': 'mega-menu',
    'menubar/menubar-demo.component.ts': 'menubar',
    'order-list/order-list-demo.component.ts': 'order-list',
    'organization-chart/organization-chart-demo.component.ts': 'organization-chart',
    'panel/panel-demo.component.ts': 'panel',
    'pick-list/pick-list-demo.component.ts': 'pick-list',
    'popover/popover-demo.component.ts': 'popover',
    'ripple/ripple-demo.component.ts': 'ripple',
    'scroll-panel/scroll-panel-demo.component.ts': 'scroll-panel',
    'scroll-top/scroll-top-demo.component.ts': 'scroll-top',
    'scroller/scroller-demo.component.ts': 'scroller',
    'select/select.component.ts': 'select',
    'select-buttons/select-buttons.component.ts': 'select-buttons',
    'slider/slider-demo.component.ts': 'slider',
    'split-button/split-button-demo.component.ts': 'split-button',
    'style-class/style-class-demo.component.ts': 'style-class',
    'tabs/tabs.component.ts': 'tabs',
    'tag/tag-demo.component.ts': 'tag',
    'textarea/textarea-demo.component.ts': 'textarea',
    'toggle-button/toggle-button-demo.component.ts': 'toggle-button',
    'tooltip/tooltip-demo.component.ts': 'tooltip',
    'tree-select/tree-select-demo.component.ts': 'tree-select',
}

DOC_API_REF_IMPORT = "import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';"
DOC_API_REF_TYPE_IMPORT = "import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';"


def fix_file(ts_path):
    try:
        content = read(ts_path)
    except Exception as e:
        print(f"  SKIP (read error): {e}")
        return

    # Find corresponding HTML template
    html_path = ts_path.replace('.ts', '.html')
    if not os.path.exists(html_path):
        m = re.search(r"templateUrl:\s*'\./(.*?)'", content)
        if m:
            html_path = os.path.join(os.path.dirname(ts_path), m.group(1))

    html_content = ''
    if os.path.exists(html_path):
        try:
            html_content = read(html_path)
        except Exception:
            pass

    uses_code_snippet_html = '<ui-lib-code-snippet' in html_content
    uses_doc_code_example_html = '<app-doc-code-example' in html_content
    uses_doc_api_ref_html = '<app-doc-api-reference' in html_content
    imports_code_snippet_ts = bool(re.search(r'import.*CodeSnippet', content))
    imports_doc_code_example_ts = bool(re.search(r'import.*DocCodeExampleComponent', content))
    imports_doc_api_ref_ts = 'DocApiReferenceComponent' in content
    has_api_rows = 'apiRows' in content or 'apiInputRows' in content or 'inputRows' in content

    changed = False

    # Remove unused CodeSnippet from imports
    if imports_code_snippet_ts and not uses_code_snippet_html:
        # Remove from import statement
        new = re.sub(r"^import\s*\{\s*CodeSnippet\s*\}\s*from\s*'[^']+'\s*;\s*\n", '', content, flags=re.MULTILINE)
        # Remove CodeSnippet from a multi-import line
        new = re.sub(r',\s*CodeSnippet(?=\s*[,}])', '', new)
        new = re.sub(r'(?<=\{)\s*CodeSnippet\s*,', '', new)
        # Remove from imports[] array
        new = re.sub(r'^[ \t]*CodeSnippet,?\s*\n', '', new, flags=re.MULTILINE)
        new = re.sub(r',\s*\n?[ \t]*CodeSnippet(?=\s*\n[ \t]*\])', '', new)
        if new != content:
            content = new
            changed = True
            print(f"  ✓ Removed CodeSnippet")

    # Remove unused DocCodeExampleComponent from imports
    if imports_doc_code_example_ts and not uses_doc_code_example_html:
        new = re.sub(r"^import\s*\{\s*DocCodeExampleComponent\s*\}\s*from\s*'[^']+'\s*;\s*\n", '', content, flags=re.MULTILINE)
        new = re.sub(r',\s*DocCodeExampleComponent(?=\s*[,}])', '', new)
        new = re.sub(r'(?<=\{)\s*DocCodeExampleComponent\s*,', '', new)
        new = re.sub(r'^[ \t]*DocCodeExampleComponent,?\s*\n', '', new, flags=re.MULTILINE)
        new = re.sub(r',\s*\n?[ \t]*DocCodeExampleComponent(?=\s*\n[ \t]*\])', '', new)
        if new != content:
            content = new
            changed = True
            print(f"  ✓ Removed DocCodeExampleComponent")

    # Add DocApiReferenceComponent if template uses it
    if uses_doc_api_ref_html and not imports_doc_api_ref_ts:
        # Add import statement
        lines = content.split('\n')
        last_import_idx = max((i for i, l in enumerate(lines) if l.strip().startswith('import ')), default=-1)
        if last_import_idx >= 0:
            lines.insert(last_import_idx + 1, DOC_API_REF_TYPE_IMPORT)
            lines.insert(last_import_idx + 1, DOC_API_REF_IMPORT)
        content = '\n'.join(lines)
        # Add to imports[] array — before the closing ]
        content = re.sub(
            r'(  imports:\s*\[)((?:[^]]*?))(]\s*,)',
            lambda m: m.group(1) + m.group(2).rstrip() + '\n    DocApiReferenceComponent,\n  ' + m.group(3).lstrip(']').lstrip(',').strip() + '],' if m.group(3).strip() != '],' else m.group(1) + m.group(2).rstrip() + '\n    DocApiReferenceComponent,\n  ],',
            content,
            flags=re.DOTALL,
        )
        # Simpler approach:
        if 'DocApiReferenceComponent,' not in content:
            # Find the imports array closing bracket
            content = re.sub(
                r'(\n  \],\n  templateUrl)',
                '\n    DocApiReferenceComponent,\n  ],\n  templateUrl',
                content,
                count=1,
            )
        changed = True
        print(f"  ✓ Added DocApiReferenceComponent import + imports[]")

    # Add apiRows if needed
    if uses_doc_api_ref_html and not has_api_rows:
        # Find the component key
        rel_path = os.path.relpath(ts_path, PAGES).replace('\\', '/')
        comp_key = TS_TO_COMP.get(rel_path, '')
        rows_data = API_ROWS.get(comp_key)

        if rows_data:
            if isinstance(rows_data, dict):
                # Multiple named row arrays
                all_rows = '\n'.join(rows_data.values())
            else:
                all_rows = rows_data

            # Insert before the last closing brace
            last_brace = content.rfind('\n}')
            if last_brace != -1:
                content = content[:last_brace] + '\n' + all_rows + '\n' + content[last_brace:]
                changed = True
                print(f"  ✓ Added apiRows for '{comp_key}'")
        else:
            # Fallback: empty placeholder
            placeholder = '''  public readonly apiRows: readonly ApiPropRow[] = [];'''
            last_brace = content.rfind('\n}')
            if last_brace != -1:
                content = content[:last_brace] + '\n' + placeholder + '\n' + content[last_brace:]
                changed = True
                print(f"  ✓ Added empty apiRows placeholder for '{comp_key}'")

    if changed:
        write(ts_path, content)


# ── main ─────────────────────────────────────────────────────────────────────

for root, dirs, files in sorted(os.walk(PAGES)):
    for f in sorted(files):
        if f.endswith('.ts') and not f.endswith('.spec.ts'):
            ts_path = os.path.join(root, f)
            rel = os.path.relpath(ts_path, PAGES).replace('\\', '/')
            print(f"\n{rel}")
            fix_file(ts_path)

print("\nDone.")

