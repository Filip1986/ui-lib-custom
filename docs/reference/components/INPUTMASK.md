# InputMask Component
## Overview
`InputMaskComponent` provides structured input formatting for fixed-pattern values such as
phone numbers, dates, IDs, and mixed alphanumeric serials. It uses a pure internal mask engine
for parsing, optional sections, caret-safe edits, and model unmasking.
**Import**
```typescript
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
```
**Selector:** `uilib-input-mask`
**Location:** `projects/ui-lib-custom/src/lib/input-mask/input-mask.component.ts`
---
## Inputs
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `mask` | `string` | `''` | Mask expression (`9` digit, `a` letter, `*` alphanumeric, `?` optional marker). |
| `slotChar` | `string` | `'_'` | Placeholder character for editable slots. |
| `autoClear` | `boolean` | `true` | Clears incomplete required content on blur. |
| `keepBuffer` | `boolean` | `false` | Keeps placeholder buffer visible while editing/clearing. |
| `unmask` | `boolean` | `false` | Emits model as raw user characters only (without literals). |
| `showClear` | `boolean` | `false` | Shows clear icon when input has content and is enabled. |
| `type` | `string` | `'text'` | Native input type. |
| `characterPattern` | `string` | `'[A-Za-z]'` | Regex pattern used by `a` mask token. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for control density. |
| `filled` | `boolean` | `false` | Filled surface style. |
| `disabled` | `boolean` | `false` | Disables user interaction. |
| `readonly` | `boolean` | `false` | Prevents edits while keeping focus semantics. |
| `placeholder` | `string \| undefined` | `undefined` | Native placeholder text. |
| `autocomplete` | `string \| undefined` | `undefined` | Native autocomplete attribute value. |
| `name` | `string \| undefined` | `undefined` | Native form name attribute. |
| `fluid` | `boolean` | `false` | Expands host width to fill available container width. |
| `invalid` | `boolean` | `false` | Invalid state styling hook. |
---
## Outputs
| Output | Payload | Description |
| --- | --- | --- |
| `completed` | `InputMaskCompleteEvent` | Emitted when all required mask positions are completed. |
| `focused` | `Event` | Emitted on input focus. |
| `blurred` | `Event` | Emitted on input blur. |
| `inputChanged` | `Event` | Emitted after input value processing. |
| `cleared` | `void` | Emitted when clear action resets the control. |
### Output Type
```typescript
export interface InputMaskCompleteEvent {
  originalEvent: Event;
  value: string;
}
```
---
## Usage Examples
### Basic Phone Mask
```html
<uilib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="phone"
/>
```
### Optional Extension
```html
<uilib-input-mask
  mask="(999) 999-9999? x99999"
  [autoClear]="false"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="phoneWithExtension"
/>
```
### Unmasked Model Value
```html
<uilib-input-mask
  mask="(999) 999-9999"
  [unmask]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="rawPhone"
/>
```
### Reactive Forms
```html
<form [formGroup]="form">
  <uilib-input-mask mask="(999) 999-9999" formControlName="phone" />
</form>
```
```typescript
form = new FormGroup({
  phone: new FormControl<string | null>(null),
});
```
---
## Mask Tokens
| Token | Meaning |
| --- | --- |
| `9` | Numeric character (`0-9`) |
| `a` | Alphabetic character (uses `characterPattern`) |
| `*` | Alphanumeric character |
| `?` | Marks subsequent positions as optional |
Literals (such as `(`, `)`, `-`, `/`, spaces) are inserted automatically according to the mask.
---
## CSS Variables (Selected)
| Variable | Description |
| --- | --- |
| `--uilib-input-mask-padding-x` | Horizontal input padding |
| `--uilib-input-mask-padding-y` | Vertical input padding |
| `--uilib-input-mask-font-size` | Input text size |
| `--uilib-input-mask-border-radius` | Input border radius |
| `--uilib-input-mask-border-color` | Input border color |
| `--uilib-input-mask-bg` | Input background color |
| `--uilib-input-mask-text-color` | Input text color |
| `--uilib-input-mask-placeholder-color` | Placeholder text color |
| `--uilib-input-mask-focus-border-color` | Focus border color |
| `--uilib-input-mask-focus-ring` | Focus ring/shadow |
| `--uilib-input-mask-invalid-border-color` | Invalid state border color |
| `--uilib-input-mask-icon-color` | Clear icon color |
For the complete list and defaults, see:
- `docs/reference/systems/CSS_VARIABLES.md`
- `projects/ui-lib-custom/src/lib/input-mask/input-mask.component.scss`
---
## Accessibility Notes
- Uses native `<input>` semantics, so browser and AT form behavior is preserved.
- Supports standard focus/blur/touched interactions for Angular forms.
- Clear action is visually available only when content exists and control is enabled.
- Keyboard editing supports deletion/insertion while preserving mask literals and caret flow.
