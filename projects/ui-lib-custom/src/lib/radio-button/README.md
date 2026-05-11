# RadioButton

**Selector:** `ui-lib-radio-button`
**Package:** `ui-lib-custom/radio-button`
**Content projection:** yes — alternative to the `label` input

> Radio buttons in a group must share the same `name` attribute. The component implements `ControlValueAccessor` — bind the shared group value via `ngModel` or a reactive `FormControl` on each radio; the one whose `value` matches becomes checked automatically.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string \| null` | `null` | Visible label text; projected content is an alternative |
| `inputId` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | Must be identical across all buttons in a group |
| `value` | `unknown` | `null` | The value this radio button represents in the group |
| `required` | `boolean` | `false` | Sets `aria-required` on the native input |
| `readonly` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | Sets `aria-disabled` on the native input |
| `tabindex` | `number` | `0` | Applied when the radio is checked (roving tabindex) |
| `autofocus` | `boolean` | `false` | |
| `ariaLabel` | `string \| null` | `null` | Used when no visible label is provided |
| `ariaLabelledby` | `string \| null` | `null` | Explicit override; takes precedence over the auto-generated label id |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `RadioButtonChangeEvent` | `{ value: unknown, originalEvent: Event }` — fires only when this button is selected |
| `focus` | `FocusEvent` | |
| `blur` | `FocusEvent` | |

## Keyboard Navigation

The component adds explicit arrow-key navigation on top of native browser radio group behaviour.

| Key | Action |
|-----|--------|
| `Tab` | Enters the group; browsers natively focus the selected radio (or the first if none selected) |
| `Shift+Tab` | Leaves the group |
| `ArrowDown` / `ArrowRight` | Moves focus to the next non-disabled radio, wrapping around; selects it |
| `ArrowUp` / `ArrowLeft` | Moves focus to the previous non-disabled radio, wrapping around; selects it |
| `Space` | Selects the currently focused radio (native browser behaviour) |

Disabled radios are automatically skipped during arrow-key navigation.

## Accessibility

### Group labeling

Wrap radio buttons in a `<fieldset>`/`<legend>` or a `role="radiogroup"` element. This is **consumer responsibility** — individual radio buttons do not add the group role themselves.

**Option A — `<fieldset>` / `<legend>` (recommended)**

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <ui-lib-radio-button name="contact" value="email" label="Email" [(ngModel)]="contact" />
  <ui-lib-radio-button name="contact" value="phone" label="Phone" [(ngModel)]="contact" />
</fieldset>
```

**Option B — explicit `role="radiogroup"` with `aria-labelledby`**

```html
<div role="radiogroup" aria-labelledby="contact-label" aria-required="true">
  <span id="contact-label">Preferred contact method</span>
  <ui-lib-radio-button name="contact" value="email" label="Email" [(ngModel)]="contact" />
  <ui-lib-radio-button name="contact" value="phone" label="Phone" [(ngModel)]="contact" />
</div>
```

## Usage

### With `ngModel`

```html
<fieldset>
  <legend>Size</legend>
  <ui-lib-radio-button name="size" label="Small" [value]="'sm'" [(ngModel)]="selectedSize" />
  <ui-lib-radio-button name="size" label="Medium" [value]="'md'" [(ngModel)]="selectedSize" />
  <ui-lib-radio-button name="size" label="Large" [value]="'lg'" [(ngModel)]="selectedSize" />
</fieldset>
```

### With `ReactiveFormsModule`

```html
<fieldset>
  <legend>Delivery</legend>
  <ui-lib-radio-button name="delivery" value="standard" label="Standard" [formControl]="deliveryCtrl" />
  <ui-lib-radio-button name="delivery" value="express" label="Express" [formControl]="deliveryCtrl" />
</fieldset>
```

```typescript
public readonly deliveryCtrl = new FormControl('standard');
```

### Disabled option

```html
<fieldset>
  <legend>Plan</legend>
  <ui-lib-radio-button name="plan" value="free" label="Free" [(ngModel)]="plan" />
  <ui-lib-radio-button name="plan" value="pro" label="Pro" [(ngModel)]="plan" />
  <ui-lib-radio-button name="plan" value="enterprise" label="Enterprise" [disabled]="true" [(ngModel)]="plan" />
</fieldset>
```

