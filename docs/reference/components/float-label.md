# Float Label

**Selector:** `ui-lib-float-label`
**Entry point:** `import { FloatLabel } from 'ui-lib-custom/float-label'`

---

## Overview

FloatLabel wrapper component scaffold.

## API

### Inputs

| Name      | Type                | Default  | Description                                                 |
| --------- | ------------------- | -------- | ----------------------------------------------------------- |
| `variant` | `FloatLabelVariant` | `'over'` | Defines the positioning of the label relative to the input. |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                                                          |
| ----------------------------------------------------------------------------------------- |
| active/floated font-size CSS variable default is >= 11px (0.75rem)                        |
| applies in variant class only                                                             |
| applies on variant class                                                                  |
| auto-injects the single-space placeholder required by :placeholder-shown selectors        |
| mirrors the projected label id to ui-lib-select via aria-labelledby                       |
| passes axe in default state (variant=over)                                                |
| passes axe in filled state                                                                |
| passes axe in focused state                                                               |
| passes axe when the component auto-generates label/input wiring                           |
| passes axe with textarea                                                                  |
| passes axe with variant=in                                                                |
| passes axe with variant=on                                                                |
| reflects Input filled class and focus contract for nested input element                   |
| reflects Select wrapper state classes for filled and focus/open states                    |
| stylesheet uses :focus-within and :placeholder-shown-compatible selectors for float state |
| updates class when variant changes                                                        |
| uses themed label color tokens for resting, active, and focused states                    |
| variant=in applies correct host modifier class                                            |
| variant=on applies correct host modifier class                                            |
| variant=over applies correct host modifier class                                          |

## Usage Examples

```html
<!-- label floats above the input on focus/fill (over variant) -->
<uilib-float-label>
  <input id="username" type="text" placeholder=" " [(ngModel)]="username" />
  <label for="username">Username</label>
</uilib-float-label>

<!-- label floats inside the input (in variant) -->
<uilib-float-label variant="in">
  <input id="email" type="email" placeholder=" " [(ngModel)]="email" />
  <label for="email">Email</label>
</uilib-float-label>

<!-- label sits on the border of the input (on variant) -->
<uilib-float-label variant="on">
  <input id="city" type="text" placeholder=" " [(ngModel)]="city" />
  <label for="city">City</label>
</uilib-float-label>

<!-- works with ui-lib-input (note: set label="" to suppress internal label) -->
<uilib-float-label>
  <ui-lib-input id="first-name" label="" placeholder=" " [(ngModel)]="firstName" />
  <label for="first-name">First Name</label>
</uilib-float-label>

<!-- works with ui-lib-password -->
<uilib-float-label>
  <ui-lib-password inputId="account-password" [feedback]="false" placeholder=" " />
  <label for="account-password">Password</label>
</uilib-float-label>

<!-- works with textarea -->
<uilib-float-label>
  <textarea id="bio" placeholder=" " [(ngModel)]="bio"></textarea>
  <label for="bio">Bio</label>
</uilib-float-label>

<!-- works with ui-lib-select (external label id is mirrored to aria-labelledby) -->
<uilib-float-label>
  <ui-lib-select [options]="cityOptions" />
  <label>City</label>
</uilib-float-label>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#float-label)
- [Demo page](/components/float-label)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/float-label/README.md)

