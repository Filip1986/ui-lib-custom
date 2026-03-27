# FloatLabel
FloatLabel is a CSS-driven wrapper for form controls that positions a label inside the control at rest and moves it when the control is focused or filled.
## Import
```typescript
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
```
## API
### Inputs
| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'over' | 'in' | 'on'` | `'over'` | Controls floating label position behavior. |
## Usage
### Basic
```html
<uilib-float-label>
  <input placeholder=" " />
  <label>Username</label>
</uilib-float-label>
```
### Over Variant (default)
```html
<uilib-float-label variant="over">
  <input placeholder=" " />
  <label>Email</label>
</uilib-float-label>
```
### In Variant
```html
<uilib-float-label variant="in">
  <input placeholder=" " />
  <label>Email</label>
</uilib-float-label>
```
### On Variant
```html
<uilib-float-label variant="on">
  <input placeholder=" " />
  <label>Email</label>
</uilib-float-label>
```
### With Select Wrapper Components
```html
<uilib-float-label>
  <ui-lib-select [options]="cityOptions" />
  <label>City</label>
</uilib-float-label>
```
## CSS Variable Tokens
| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-float-label-color` | `var(--uilib-text-secondary-color, #6b7280)` | Resting label color. |
| `--uilib-float-label-active-color` | `var(--uilib-text-secondary-color, #6b7280)` | Label color when filled and not focused. |
| `--uilib-float-label-focus-color` | `var(--uilib-primary-color, #3b82f6)` | Label color while focused. |
| `--uilib-float-label-invalid-color` | `var(--uilib-error-color, #ef4444)` | Label color for invalid and dirty controls. |
| `--uilib-float-label-font-size` | `1rem` | Resting label font size. |
| `--uilib-float-label-active-font-size` | `0.75rem` | Floating label font size. |
| `--uilib-float-label-font-weight` | `normal` | Resting label font weight. |
| `--uilib-float-label-active-font-weight` | `normal` | Floating label font weight. |
| `--uilib-float-label-position-x` | `0.75rem` | Horizontal offset from inline start. |
| `--uilib-float-label-position-y` | `0.75rem` | Resting top position for textarea labels. |
| `--uilib-float-label-over-active-top` | `0` | Active top position for `over` variant. |
| `--uilib-float-label-in-active-top` | `0.25rem` | Active top position for `in` variant. |
| `--uilib-float-label-transition-duration` | `0.2s` | Label animation duration. |
| `--uilib-float-label-transition-timing` | `ease` | Label animation timing. |
| `--uilib-float-label-in-input-padding-top` | `1.5rem` | Top padding applied to children in `in` variant. |
| `--uilib-float-label-in-input-padding-bottom` | `0.5rem` | Bottom padding applied to children in `in` variant. |
| `--uilib-float-label-on-border-radius` | `4px` | Border radius for active `on` pill. |
| `--uilib-float-label-on-active-background` | `var(--uilib-surface-ground, #ffffff)` | Active `on` pill background. |
| `--uilib-float-label-on-active-padding` | `0 0.25rem` | Active `on` pill padding. |
## Integration Notes
- Native inputs and textareas must include a `placeholder` attribute (for example `placeholder=" "`) so `:not(:placeholder-shown)` can detect filled state.
- Wrapper form components that should work inside FloatLabel should expose these state classes on the host:
  - `uilib-filled`
  - `uilib-inputwrapper-filled`
  - `uilib-inputwrapper-focus`
- `FloatLabelComponent` uses `ViewEncapsulation.None` so projected content selectors (`:has(...)`) can cross component boundaries.
