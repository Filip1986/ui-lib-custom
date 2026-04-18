# SplitButton Research (PrimeNG v19)

Source analyzed:
- `D:\Work\Personal\Github\ui-lib-custom\tmp\splitbutton-research\package\splitbutton\splitbutton.d.ts`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\splitbutton-research\package\splitbutton\splitbutton.interface.d.ts`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\splitbutton-research\package\fesm2022\primeng-splitbutton.mjs`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\splitbutton-research\package\api\menuitem.d.ts`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\splitbutton-research\package\fesm2022\primeng-tieredmenu.mjs` (for delegated menu behavior)

## API surface

### Selectors

| Item | Type | Default | Notes |
|---|---|---|---|
| `selector` | `'p-splitbutton' \| 'p-splitButton' \| 'p-split-button'` | n/a | PrimeNG selector aliases |

### Inputs

| Input | Type | Default (implementation) | Notes |
|---|---|---|---|
| `model` | `MenuItem[] \| undefined` | `undefined` | Passed to `p-tieredMenu` as popup model |
| `severity` | `'success' \| 'info' \| 'warn' \| 'danger' \| 'help' \| 'primary' \| 'secondary' \| 'contrast' \| null \| undefined` | `undefined` | Applied to both left and right buttons |
| `raised` | `boolean` | `false` | Adds `p-splitbutton-raised` |
| `rounded` | `boolean` | `false` | Adds `p-splitbutton-rounded` and rounded join handling |
| `text` | `boolean` | `false` | Text mode forwarded to both buttons |
| `outlined` | `boolean` | `false` | Outlined mode forwarded to both buttons |
| `size` | `'small' \| 'large' \| null \| undefined` | `null` | Also used in container class (`p-splitbutton-sm` / `p-splitbutton-lg`) |
| `plain` | `boolean` | `false` | Declared input; not used in SplitButton template bindings |
| `icon` | `string \| undefined` | `undefined` | Main action icon |
| `iconPos` | `'left' \| 'right'` | `'left'` | Main action icon position |
| `label` | `string \| undefined` | `undefined` | Main button label in default template |
| `tooltip` | `string \| undefined` | `undefined` | Main button tooltip only |
| `tooltipOptions` | `TooltipOptions \| undefined` | `undefined` | Main button tooltip options |
| `style` | `Record<string, any> \| null \| undefined` | `undefined` | Root inline style |
| `styleClass` | `string \| undefined` | `undefined` | Root class |
| `menuStyle` | `Record<string, any> \| null \| undefined` | `undefined` | Forwarded to popup menu |
| `menuStyleClass` | `string \| undefined` | `undefined` | Forwarded to popup menu |
| `dropdownIcon` | `string \| undefined` | `undefined` | Right-button icon class override |
| `appendTo` | `HTMLElement \| ElementRef \| TemplateRef<any> \| string \| null \| undefined \| any` | `'body'` | Forwarded to `p-tieredMenu` overlay target |
| `dir` | `string \| undefined` | `undefined` | Declared, not consumed directly in SplitButton template |
| `expandAriaLabel` | `string \| undefined` | `undefined` | Fallback `aria-label` for menu button |
| `showTransitionOptions` | `string` | `'.12s cubic-bezier(0, 0, 0.2, 1)'` | Forwarded to menu show animation |
| `hideTransitionOptions` | `string` | `'.1s linear'` | Forwarded to menu hide animation |
| `buttonProps` | `ButtonProps \| undefined` | `undefined` | Supports `ariaLabel` only |
| `menuButtonProps` | `MenuButtonProps \| undefined` | `undefined` | Supports `ariaLabel`, `ariaHasPopup`, `ariaExpanded`, `ariaControls` |
| `autofocus` | `boolean \| undefined` | `undefined` | Applied to main button |
| `disabled` | `boolean \| undefined` (accessor) | `undefined` | Setter syncs `buttonDisabled` + `menuButtonDisabled` |
| `tabindex` | `number \| undefined` | `undefined` | Applied to main button |
| `menuButtonDisabled` | `boolean` | `false` | Independent disable for right button |
| `buttonDisabled` | `boolean` | `false` | Independent disable for left button |

### Outputs

| Output | Type | Notes |
|---|---|---|
| `onClick` | `EventEmitter<MouseEvent>` | Main action button clicked |
| `onMenuHide` | `EventEmitter<any>` | Popup menu closed |
| `onMenuShow` | `EventEmitter<any>` | Popup menu opened |
| `onDropdownClick` | `EventEmitter<MouseEvent>` | Right button clicked |

### Template slots

| Slot | Type | Scope | Notes |
|---|---|---|---|
| `#content` | `TemplateRef<any>` | SplitButton | Replaces main button content |
| `#dropdownicon` | `TemplateRef<any>` | SplitButton | Replaces right-button icon when `dropdownIcon` input is not set |
| `#menuitemicon` | n/a in `SplitButton` | n/a | Not exposed by SplitButton API in v19 source; menu icon customization belongs to internal `TieredMenu` templates |

### Public methods

| Method | Signature | Behavior |
|---|---|---|
| `ngOnInit` | `(): void` | Generates `ariaId` |
| `ngAfterContentInit` | `(): void` | Resolves projected templates (`content`, `dropdownicon`) |
| `containerClass` | `get containerClass(): Record<string, boolean \| string>` | Computes root class map |
| `onDefaultButtonClick` | `(event: MouseEvent): void` | Emits `onClick`, hides menu |
| `onDropdownButtonClick` | `(event?: MouseEvent): void` | Emits `onDropdownClick`, toggles menu popup |
| `onDropdownButtonKeydown` | `(event: KeyboardEvent): void` | On `ArrowDown`/`ArrowUp`, opens/toggles menu |
| `onHide` | `(): void` | Sets expanded false, emits `onMenuHide` |
| `onShow` | `(): void` | Sets expanded true, emits `onMenuShow` |

## MenuItem reference

SplitButton itself does not render `MenuItem` rows directly; it passes `model` to `p-tieredMenu`. Actual field usage is delegated to `TieredMenu`/`TieredMenuSub`.

| MenuItem field | Consumed by SplitButton class/template | Consumed by delegated TieredMenu rendering | Notes |
|---|---|---|---|
| `label` | No | Yes | Label text + `aria-label` for each menuitem |
| `icon` | No | Yes | Rendered in item icon span |
| `command` | No | Yes | Called on item click with `{ originalEvent, item }` |
| `disabled` | No | Yes | Adds disabled classes and `aria-disabled` semantics |
| `separator` | No | Yes | Renders separator `<li role="separator">` |
| `url` | No | Yes | Used for non-router anchor `href` |
| `target` | No | Yes | Applied on anchor target |
| `routerLink` | No | Yes | Router anchor variant |
| `styleClass` | No | Yes | Applied to menuitem `<li>` |
| `visible` | No | Yes | Hidden when `visible === false` |
| `items` (nested) | No | Yes | Used to render nested submenus recursively |

Template vs pass-through split:
- SplitButton template only handles left button, right button, and wiring to `p-tieredMenu`.
- Menu item fields are consumed in TieredMenu template logic (anchors, icons, separator nodes, nested submenu nodes).

## DOM structure

PrimeNG SplitButton DOM:
1. Root wrapper: `<div class="p-splitbutton p-component ...">`
2. Left action button: `<button class="p-splitbutton-button" ...>`
3. Right menu-toggle button: `<button class="p-splitbutton-dropdown p-button-icon-only" ...>`
4. Popup panel: `<p-tieredMenu [popup]="true" ...>` rendered as menu overlay

Join treatment between left/right buttons:
- Left button removes end radius and right border:
  - `border-start-end-radius: 0`
  - `border-end-end-radius: 0`
  - `border-right: 0`
- Right button removes start radius:
  - `border-start-start-radius: 0`
  - `border-end-start-radius: 0`
- Focus-visible on either button sets `z-index: 1` to keep ring visible above adjacent segment.

## Severity/appearance integration

PrimeNG forwards the same visual inputs to both segments:
- Left button gets `[severity]`, `[text]`, `[outlined]`, `[size]`.
- Right button gets `[severity]`, `[text]`, `[outlined]`, `[size]`.

Container-level modifiers (`p-splitbutton-raised`, `p-splitbutton-rounded`) apply shape/elevation around the joined pair.

Observed gaps:
- `plain` is declared but not bound in SplitButton template.
- `raised` is a container class, not an input forwarded to both `pButton` directives.

## Dropdown panel rendering

SplitButton delegates dropdown rendering to `p-tieredMenu` popup mode.

Panel behavior from wiring:
- SplitButton passes `model`, `menuStyle`, `menuStyleClass`, `appendTo`, transition options.
- `p-tieredMenu` enforces popup overlay with root list `role="menu"` and item rows.

Menu item rendering characteristics (TieredMenu):
- Regular item rows: `<li role="menuitem">`
- Separator rows: `<li role="separator">`
- Anchors support `url/target` and `routerLink` paths.
- Item icon span binds `icon` and `iconStyle`.
- Nested items render recursive `<p-tieredmenusub>`.

## Keyboard interaction

### Main button (left)
- No SplitButton-specific handler; native button behavior applies (`Enter`/`Space` click).

### Menu button (right)
- `ArrowDown` or `ArrowUp`: calls dropdown toggle/open handler and `preventDefault()`.
- `Enter`/`Space`: native button click -> dropdown toggle.

### Menu list and menu items (delegated to TieredMenu)
Handled by TieredMenu key dispatcher:
- `ArrowDown` / `ArrowUp`: move to next/previous focusable item.
- `ArrowRight`: expand submenu (if grouped item).
- `ArrowLeft`: collapse to parent level.
- `Home` / `End`: jump to first/last valid item.
- `Enter` / `Space`: activate focused item (click action).
- `Escape`: close popup and restore focus.
- `Tab`: hide popup.
- Typeahead on printable characters: focus next matched item.

## Accessibility contract

### Main button
- `aria-label` uses `buttonProps?.ariaLabel` or `label` in custom-content mode.
- Standard button semantics (`type="button"`, disabled when `buttonDisabled` in default template).

### Menu button
- `aria-label`: `menuButtonProps?.ariaLabel || expandAriaLabel`
- `aria-haspopup`: `menuButtonProps?.ariaHasPopup || true`
- `aria-expanded`: `menuButtonProps?.ariaExpanded || isExpanded()`
- `aria-controls`: `menuButtonProps?.ariaControls || ariaId`

### Menu list and items (TieredMenu)
- Root list: `role="menu"`, `aria-activedescendant`, `aria-orientation="vertical"`.
- Item rows: `role="menuitem"`, `aria-disabled`, submenu rows expose `aria-haspopup="menu"` and `aria-expanded`.
- Separator rows: `role="separator"`.

## Independent disabled states

PrimeNG has three related inputs:
- `disabled` (setter)
- `buttonDisabled`
- `menuButtonDisabled`

Behavior from implementation:
- Setting `disabled` sets both `buttonDisabled` and `menuButtonDisabled` to the same value.
- `buttonDisabled` and `menuButtonDisabled` can still be set independently via their own inputs.

Practical matrix:
- `disabled=true` -> both segments disabled by default.
- `buttonDisabled=true`, `menuButtonDisabled=false` -> only left disabled.
- `buttonDisabled=false`, `menuButtonDisabled=true` -> only right disabled.
- `disabled=false` with segment-specific flags -> independent segment disable supported.

## Template customization

Exposed directly by SplitButton:
- `#content` for main action button content.
- `#dropdownicon` for right-button icon.

Not exposed directly by SplitButton:
- `#menuitemicon` is not an official SplitButton slot in analyzed v19 source.
- Menu item customization exists at TieredMenu level (`item`, `submenuicon`) but SplitButton does not project those templates itself.

## Divergence table (PrimeNG -> ui-lib-custom)

| PrimeNG concept | PrimeNG behavior | `ui-lib-custom` equivalent / divergence |
|---|---|---|
| Selector | `p-splitbutton` aliases | Use `ui-lib-split-button` |
| Inputs/outputs API | `@Input()`/`@Output()` with `EventEmitter` | Use `input()`, `model()`, `output()` signals |
| Size tokens | `'small' \| 'large'` (+ implicit default) | Normalize to `'sm' \| 'md' \| 'lg'` |
| Severity tokens | Includes `'warn'` alias | Keep `ButtonSeverity` mapping, normalize `'warn' -> 'warning'` like `ui-lib-button` |
| Appearance flags | `text`, `outlined`, `plain` booleans | Keep `text`/`outlined`; evaluate `plain` parity explicitly (Prime binding gap) |
| Variant system | Prime theme classes | Use library variant (`material`/`bootstrap`/`minimal`) via `ThemeConfigService` |
| Main + menu button props bag | `buttonProps`, `menuButtonProps` bags | Do not expose arbitrary prop bags; expose explicit typed inputs only |
| Menu model rendering | Delegated to Prime `TieredMenu` | Implement internal popup/menu rendering using library patterns (or scoped v1 subset) |
| Menu template keys | `content`, `dropdownicon` | Use library directives/slots with explicit names; no hidden pass-through |
| `appendTo` overlay target | Supports `body`/element/template refs | For v1, either host-attached panel or typed `appendTo` string/HTMLElement following existing `cascade-select` pattern |
| Tooltip integration | `tooltip` + `tooltipOptions` on main button only | v1 fallback to native `title` or explicit tooltip input; full tooltip entry-point integration deferred |
| Cross-entry imports | Prime internal package imports | Use package-path imports only (e.g. `ui-lib-custom/core`, `ui-lib-custom/theme`) |
| Template syntax | Uses `*ngIf`/`*ngFor` | Use Angular block syntax (`@if`, `@for`, `@switch`) |
| Nested menu handling | Full TieredMenu recursion | Defer nested submenu parity if needed for v1; keep top-level actions first |

## Button class reuse plan

Goal: visual parity with `ui-lib-button` without nesting `<ui-lib-button>` inside split-button internals.

Classes and semantics to reuse on both inner native `<button>` elements:
- Base + variant + size + severity + appearance:
  - `ui-lib-button`
  - `ui-lib-button--{variant}`
  - `ui-lib-button--size-{small|medium|large}`
  - `ui-lib-button--{severity}`
  - `ui-lib-button--appearance-{solid|outline|ghost}`
- State modifiers where applicable:
  - `ui-lib-button--disabled`
  - `ui-lib-button--loading` (if introduced for split-button)
  - `ui-lib-button--raised`
  - `ui-lib-button--rounded`
  - `ui-lib-button--text`
  - `ui-lib-button--outlined`

SplitButton-specific classes to add:
- `ui-lib-split-button` (root wrapper)
- `ui-lib-split-button__main` (left segment)
- `ui-lib-split-button__menu` (right segment)
- `ui-lib-split-button__panel` (popup menu)
- Join helpers:
  - `ui-lib-split-button__main--joined`
  - `ui-lib-split-button__menu--joined`

Styling reuse strategy:
- Reuse existing button CSS variable contracts (`--uilib-button-*`) for segment visuals.
- Add SplitButton-only variables for seam and split layout (`--uilib-split-button-gap`, `--uilib-split-button-seam-width`, panel offsets/z-index).
- Keep a11y focus ring handling consistent with `ui-lib-button` (`focus-visible` + focused class support).

## Existing library patterns to reuse (do not rebuild)

From `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.ts`:
- Outside-click close with host/panel containment checks.
- Optional host-vs-overlay mounting pattern (`appendTo`, panel class sync).
- Keyboard navigation structure using `KEYBOARD_KEYS` constants.
- Active descendant IDs for menu/list semantics.

From `projects/ui-lib-custom/src/lib/select/select.ts`:
- Compact popup open/close lifecycle (`openPanel`, `closePanel`, focus return).
- Disabled/loading guards before keyboard and click actions.

From `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`:
- Focus trap utility from `ui-lib-custom/core` when modal behavior is needed.
- Escape close and dismissable mask semantics.
- Scroll lock lifecycle if split-button ever supports modal-like overlays.

From `projects/ui-lib-custom/src/lib/button/button.ts` and `.scss`:
- Severity normalization and appearance precedence logic.
- Class naming conventions and CSS-variable-driven theme surface.

## Deferred features (v2)

- Nested submenu parity (`MenuItem.items`) beyond a minimal top-level action list.
- Full Tooltip entry-point integration (replace fallback title/native behavior).
- `appendTo` portal parity and richer overlay layering manager.
- Generic pass-through props (`buttonProps`, `menuButtonProps`) to stay out of v1 API.

