# ColorPicker Architecture and API Design

## Goal

Define a `ui-lib-color-picker` architecture that matches library conventions:
- standalone + `OnPush` + `ViewEncapsulation.None`
- signal inputs/outputs
- strict explicit typing
- CVA compatibility for template-driven and reactive forms
- token-driven styling across `material`, `bootstrap`, and `minimal` variants

## Public Types

Source file: `projects/ui-lib-custom/src/lib/color-picker/color-picker.types.ts`

- `ColorFormat = 'hex' | 'rgb' | 'hsb'`
- `ColorPickerMode = 'popup' | 'inline'`
- `ColorPickerVariant = 'material' | 'bootstrap' | 'minimal'`
- `RgbColor` interface (`r`, `g`, `b` in `0-255`)
- `HsbColor` interface (`h` in `0-359`, `s`/`b` in `0-100`)
- `ColorPickerValue = string | RgbColor | HsbColor | null`
- `ColorPickerChangeEvent = { originalEvent: Event; value: ColorPickerValue }`

## Component API Contract

### Inputs (signal-based)

| Input | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `InputSignal<ColorPickerValue>` | `null` | Current externally bound value; normalized internally to HSB for interaction. |
| `format` | `InputSignal<ColorFormat>` | `'hex'` | Outbound model format. |
| `inline` | `InputSignal<boolean>` | `false` | `false` = popup trigger + panel, `true` = always visible panel. |
| `variant` | `InputSignal<ColorPickerVariant | null>` | `null` | Resolved via `ThemeConfigService.variant()` when not set. |
| `disabled` | `InputSignal<boolean>` | `false` | Merged with CVA disabled state. |
| `inputId` | `InputSignal<string>` | `''` | Hidden/native input id for forms and labels. |
| `tabindex` | `InputSignal<number>` | `0` | Trigger focus order in popup mode. |
| `appendTo` | `InputSignal<string | HTMLElement>` | `'body'` | Reserved for future portal mounting; v1 remains anchored in-place. |

### Outputs

| Output | Type | Emitted when |
| --- | --- | --- |
| `onChange` | `OutputEmitterRef<ColorPickerChangeEvent>` | Color value changes via pointer or keyboard interaction. |
| `onShow` | `OutputEmitterRef<void>` | Popup panel is opened (popup mode only). |
| `onHide` | `OutputEmitterRef<void>` | Popup panel is closed (popup mode only). |

## Host Binding Contract

The component host class/state contract:

- `class: 'ui-lib-colorpicker'`
- `class.ui-lib-colorpicker--inline: inline()`
- `class.ui-lib-colorpicker--disabled: disabled()`
- `class.ui-lib-colorpicker--material: variant() === 'material'`
- `class.ui-lib-colorpicker--bootstrap: variant() === 'bootstrap'`
- `class.ui-lib-colorpicker--minimal: variant() === 'minimal'`

Additional expected runtime classes:
- `ui-lib-colorpicker--open` (popup mode, panel visible)
- Angular form state classes (`ng-touched`, `ng-dirty`, `ng-invalid`) from CVA usage

## CVA Design

The component implements full `ControlValueAccessor`:

- `writeValue(value: ColorPickerValue): void`
  - Normalize incoming value into internal HSB state.
  - Handle `null` safely and clear internal selection.
- `registerOnChange(fn: (value: ColorPickerValue) => void): void`
  - Store callback and emit in requested `format`.
- `registerOnTouched(fn: () => void): void`
  - Store callback and call on popup close, blur, or inline interaction blur.
- `setDisabledState(isDisabled: boolean): void`
  - Merge with `disabled` input into effective disabled state.

Model flow:
1. External value -> normalize with `toHsbColor()`.
2. Interaction updates HSB coordinates.
3. Emit formatted value via `formatColorValue(hsb, format())`.

## Internal Architecture

### Building blocks

1. **Color utilities (`color-utils.ts`)**
   - Pure conversion and normalization functions.
   - Hex/RGB/HSB conversion in one shared utility module.

2. **Spectrum panel (2D saturation/brightness)**
   - CSS gradient background.
   - Pointer tracking maps `x` -> saturation, `y` -> brightness.
   - Keyboard arrows adjust saturation/brightness with step constants.

3. **Hue slider (1D)**
   - Vertical or horizontal gradient rail.
   - Pointer and keyboard updates hue `0-359`.

4. **Preview swatch / trigger**
   - Inline mode: value preview only.
   - Popup mode: trigger for open/close + current color indicator.

5. **Popup panel behavior (v1)**
   - Anchored, in-place panel (same family as `select` and `cascade-select`).
   - Click-outside and Escape close behavior.
   - `appendTo` accepted as API, but portal behavior deferred.

### Runtime state model

```text
External model (hex/rgb/hsb/null)
  -> normalize to HSB internal state
  -> render swatch + spectrum + hue
  -> pointer/keyboard update HSB
  -> convert to configured format
  -> emit CVA change + onChange
```

## CSS Variable Contract

The component styling surface uses these variables:

- `--uilib-colorpicker-trigger-width`
- `--uilib-colorpicker-trigger-height`
- `--uilib-colorpicker-trigger-border-radius`
- `--uilib-colorpicker-trigger-border-color`
- `--uilib-colorpicker-panel-width`
- `--uilib-colorpicker-panel-padding`
- `--uilib-colorpicker-panel-bg`
- `--uilib-colorpicker-panel-border-color`
- `--uilib-colorpicker-panel-border-radius`
- `--uilib-colorpicker-panel-shadow`
- `--uilib-colorpicker-hue-slider-width`
- `--uilib-colorpicker-hue-slider-height`
- `--uilib-colorpicker-selector-size`
- `--uilib-colorpicker-transition-duration`

## Accessibility Contract

- Popup trigger is keyboard reachable (`tabindex`) and toggles with `Space`/`Enter`.
- Popup closes with `Escape` and returns focus to trigger.
- Spectrum and hue controls support arrow-key adjustments.
- Disabled state blocks pointer and keyboard interaction and sets `aria-disabled="true"`.
- ARIA labels are required for controls lacking visible text labels.

## Deferred Items (Post-v1)

- True `appendTo` portal mounting and collision-aware overlay positioning.
- Shared overlay utility in `ui-lib-custom/core`.
- Advanced transition option parity (`showTransitionOptions` / `hideTransitionOptions`) as configurable motion inputs.

