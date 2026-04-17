# SpeedDial Research (PrimeNG v19)

Source analyzed:
- `D:\Work\Personal\Github\ui-lib-custom\tmp\speeddial-research\speeddial.d.ts`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\speeddial-research\speeddial.interface.d.ts`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\speeddial-research\primeng-speeddial.mjs`
- `D:\Work\Personal\Github\ui-lib-custom\tmp\speeddial-research\menuitem.d.ts`

## API surface

### Selectors

| Item | Type | Default | Notes |
|---|---|---|---|
| `selector` | `'p-speeddial' \| 'p-speedDial' \| 'p-speed-dial'` | n/a | PrimeNG selector aliases |

### Inputs

| Input | Type | Default (implementation) | Notes |
|---|---|---|---|
| `id` | `string \| undefined` | auto-generated (`uuid('pn_id_')`) | Used for list/item ARIA ids |
| `model` | `MenuItem[] \| null` | `null` | Action model |
| `visible` | `boolean` | `false` | Controlled/uncontrolled visibility; setter binds outside click listener |
| `style` | `Record<string, any> \| null \| undefined` | `undefined` | Root inline style |
| `className` | `string \| undefined` | `undefined` | Root custom class |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'up-left' \| 'up-right' \| 'down-left' \| 'down-right' \| undefined` | `'up'` | Direction for linear/arc layouts |
| `transitionDelay` | `number` | `30` | Per-item stagger step in ms |
| `type` | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle' \| undefined` | `'linear'` | Layout mode |
| `radius` | `number` | `0` | Circle/semi/quarter radius; fallback `length * 20` |
| `mask` | `boolean` | `false` | Shows page-level mask element while visible |
| `disabled` | `boolean` | `false` | Disables trigger/action interaction |
| `hideOnClickOutside` | `boolean` | `true` | Enables document click close behavior |
| `buttonStyle` | `Record<string, any> \| null \| undefined` | `undefined` | Trigger inline style |
| `buttonClassName` | `string \| undefined` | `undefined` | Trigger class override |
| `maskStyle` | `Record<string, any> \| null \| undefined` | `undefined` | Mask inline style |
| `maskClassName` | `string \| undefined` | `undefined` | Mask class override |
| `showIcon` | `string \| undefined` | `undefined` | Trigger icon in closed state |
| `hideIcon` | `string \| undefined` | `undefined` | Trigger icon in opened state |
| `rotateAnimation` | `boolean` | `true` | Rotates trigger icon (`45deg`) when no `hideIcon` |
| `ariaLabel` | `string \| undefined` | `undefined` | Trigger ARIA label |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Trigger ARIA labelledby |
| `tooltipOptions` | `TooltipOptions` | `undefined` | Global tooltip options for items |
| `buttonProps` | `ButtonProps` | `undefined` | Pass-through props for Prime button |

### Outputs

| Output | Type | Default | Notes |
|---|---|---|---|
| `onVisibleChange` | `EventEmitter<boolean>` | new emitter | Emits on show/hide |
| `visibleChange` | `EventEmitter<boolean>` | new emitter | Two-way binding emitter |
| `onClick` | `EventEmitter<MouseEvent>` | new emitter | Trigger button click |
| `onShow` | `EventEmitter<Event>` | new emitter | Emitted in `show()` |
| `onHide` | `EventEmitter<Event>` | new emitter | Emitted in `hide()` |

### Template slots

| Slot | Type | Default | Notes |
|---|---|---|---|
| `button` | `TemplateRef<{ toggleCallback: Function }>` | internal default button | Replaces trigger template |
| `item` | `TemplateRef<{ $implicit: MenuItem[]; index: number; toggleCallback: Function }>` | internal default item button | Replaces each action item |
| `icon` | `TemplateRef<any>` | built-in `PlusIcon` fallback | Trigger icon template |

### Public methods

| Method | Signature | Default/State | Notes |
|---|---|---|---|
| `ngOnInit` | `(): void` | n/a | Generates `id` when missing |
| `ngAfterViewInit` | `(): void` | n/a | Measures button/item size delta for arc layouts |
| `ngAfterContentInit` | `(): void` | n/a | Maps projected templates |
| `show` | `(): void` | sets `_visible = true` | Emits show + binds outside click |
| `hide` | `(): void` | sets `_visible = false` | Emits hide + unbinds outside click |
| `onButtonClick` | `(event: MouseEvent): void` | n/a | Toggles show/hide + emits `onClick` |
| `onItemClick` | `(e: Event, item: MenuItem): void` | n/a | Runs `item.command` then hides |
| `onKeyDown` | `(event: KeyboardEvent): void` | n/a | Menu list keyboard dispatcher |
| `onFocus` | `(event: any): void` | sets `focused = true` | Menu focus handler |
| `onBlur` | `(event: any): void` | sets `focused = false` | Resets focused option async |
| `onArrowUp` | `(event: any): void` | n/a | Direction-aware move |
| `onArrowDown` | `(event: any): void` | n/a | Direction-aware move |
| `onArrowLeft` | `(event: any): void` | n/a | Direction-aware move |
| `onArrowRight` | `(event: any): void` | n/a | Direction-aware move |
| `onEndKey` | `(event: any): void` | n/a | Jump to last enabled |
| `onHomeKey` | `(event: any): void` | n/a | Jump to first enabled |
| `onEnterKey` | `(event: any): void` | n/a | Activates focused item |
| `onEscapeKey` | `(event: KeyboardEvent): void` | n/a | Hides and returns focus to trigger |
| `onTogglerKeydown` | `(event: KeyboardEvent): void` | n/a | Trigger keyboard dispatcher |
| `onTogglerArrowUp` | `(event: any): void` | n/a | Opens then focuses previous item |
| `onTogglerArrowDown` | `(event: any): void` | n/a | Opens then focuses next item |
| `navigateNextItem` | `(event: any): void` | n/a | Focuses next enabled item |
| `navigatePrevItem` | `(event: any): void` | n/a | Focuses previous enabled item |
| `findPrevOptionIndex` | `(index: any): number` | n/a | Disabled-aware previous index |
| `findNextOptionIndex` | `(index: any): number` | n/a | Disabled-aware next index |
| `changeFocusedOptionIndex` | `(index: any): void` | n/a | Updates `focusedOptionIndex` signal |
| `calculatePointStyle` | `(index: number): Record<string, string>` | uses `radius \| (length * 20)` | Returns item position style for radial layouts |
| `calculateTransitionDelay` | `(index: number): number` | step = `transitionDelay` | Stagger in/out timing |
| `containerClass` | `(): Record<string, boolean>` | n/a | Computes root class map |
| `buttonClass` | `(): string` | n/a | Computes trigger button class string |
| `buttonIconClass` | `get buttonIconClass(): string` | n/a | Uses `showIcon`/`hideIcon`/visibility |
| `getItemStyle` | `(index: number): Record<string, string>` | n/a | Merges delay + point style |
| `isClickableRouterLink` | `(item: MenuItem): boolean` | n/a | Checks `routerLink` + disabled state |
| `isOutsideClicked` | `(event: Event): boolean` | n/a | Outside-click predicate |
| `bindDocumentClickListener` | `(): void` | n/a | Adds document click close listener |
| `unbindDocumentClickListener` | `(): void` | n/a | Removes document click listener |
| `ngOnDestroy` | `(): void` | n/a | Cleanup |

## MenuModel reference

PrimeNG `SpeedDial` receives `MenuItem[]`, but in `v19.1.4` it only directly consumes a subset.

| MenuItem field | Consumed by SpeedDial | How it is used |
|---|---|---|
| `label` | Yes | Default button `aria-label`, fallback tooltip label (`getTooltipOptions`) |
| `icon` | Yes | Passed to default action button `[icon]` |
| `command` | Yes | Executed in `onItemClick` with `{ originalEvent, item }` |
| `disabled` | Yes | Disables action button and removes from keyboard navigation set |
| `tooltip` | No (direct) | Not read directly; tooltip is driven by `tooltipOptions` object |
| `url` | No (default template) | No anchor rendering in default template |
| `target` | No (default template) | No anchor rendering in default template |
| `routerLink` | Indirect/unused in default template | Checked by `isClickableRouterLink`, but default template does not use it |
| `styleClass` | No (default template) | Not bound in default template |
| `visible` | Yes | Sets `p-hidden` class when `visible === false` |

## Layout math

PrimeNG radial layouts use **absolute positioning** (`left`/`right`/`top`/`bottom`) and CSS `scale()` transitions, not per-item translate transforms.

### Formula summary

- `length = model.length`
- `radius = this.radius || length * 20`
- `circle`: `step = (2 * Math.PI) / length`
- `semi-circle`: `step = Math.PI / (length - 1)`
- `quarter-circle`: `step = Math.PI / (2 * (length - 1))`
- Shared item offsets:
  - `x = calc(radius * cos(step * index) + var(--item-diff-x, 0px))`
  - `y = calc(radius * sin(step * index) + var(--item-diff-y, 0px))`

`--item-diff-x` and `--item-diff-y` are measured in `ngAfterViewInit()` from button vs first-item size differences.

### Source snippet (item position computation)

```ts
calculatePointStyle(index) {
  const type = this.type;
  if (type !== 'linear') {
    const length = this.model.length;
    const radius = this.radius || length * 20;
    if (type === 'circle') {
      const step = (2 * Math.PI) / length;
      return {
        left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
        top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
      };
    }
    // ...semi-circle and quarter-circle direction mapping...
  }
  return {};
}
```

### Direction mapping details

- `semi-circle`
  - `up` -> `{ left: x, bottom: y }`
  - `down` -> `{ left: x, top: y }`
  - `left` -> `{ right: y, top: x }`
  - `right` -> `{ left: y, top: x }`
- `quarter-circle`
  - `up-left` -> `{ right: x, bottom: y }`
  - `up-right` -> `{ left: x, bottom: y }`
  - `down-left` -> `{ right: y, top: x }`
  - `down-right` -> `{ left: y, top: x }`

## Animation details

- Trigger rotate animation:
  - Class `p-speeddial-rotate` is added when `rotateAnimation === true` and `hideIcon` is not set.
  - Open state class `p-speeddial-open` applies `transform: rotate(45deg)`.
- Item open/close animation:
  - Base item: `transform: scale(0); opacity: 0;`
  - Open state: `transform: scale(1); opacity: 1;`
- Stagger delay per item (`transitionDelay`):
  - Opening: `index * transitionDelay`
  - Closing: `(length - index - 1) * transitionDelay`
- Mask fades with `opacity` transition (150ms).

## Keyboard interaction

### Trigger button (`onTogglerKeydown`)

- `ArrowDown`/`ArrowLeft` -> open + focus list + navigate to first enabled (direction-aware helper)
- `ArrowUp`/`ArrowRight` -> open + focus list + navigate reverse
- `Escape` -> hide and move focus back to trigger

### Menu list (`onKeyDown`)

- `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight` -> direction-aware item navigation
- `Home` -> first enabled item
- `End` -> last enabled item
- `Enter`/`Space` -> activate focused item (`onItemClick`)
- `Escape` -> close and focus trigger

Notes:
- Navigation filters disabled actions (`button.p-disabled`).
- Focus tracking uses `aria-activedescendant` with the currently focused `li` id.

## Accessibility contract

### Trigger

- `aria-expanded` reflects visibility
- `aria-haspopup="true"`
- `aria-controls="${id}_list"`
- `aria-label` and `aria-labelledby` pass-through inputs

### List

- `role="menu"`
- `tabindex="-1"` and programmatic focus on open-from-keyboard
- `aria-activedescendant` points to focused menuitem id while focused

### Items

- `<li role="menuitem" id="${id}_${i}">`
- Default internal button also has `role="menuitem"` + `aria-label=item.label`
- Disabled items stay in DOM but are not keyboard-selectable

### Live region

- None. PrimeNG SpeedDial does not use `aria-live` announcements.

## Mask behavior

- Mask is rendered only when `mask && visible`.
- Closing logic is not mask-specific: close occurs via document click listener if `hideOnClickOutside` is true.
- Mask click counts as outside click because mask is outside the container subtree.
- If `mask=true` and `hideOnClickOutside=false`, mask shows but outside click does not auto-close.
- Escape key closes regardless of `mask`.

## Divergence table (PrimeNG -> ui-lib-custom)

| PrimeNG concept | PrimeNG behavior | `ui-lib-custom` equivalent / divergence |
|---|---|---|
| Selector | `p-speeddial` aliases | Use `ui-lib-speed-dial` |
| Input API | `@Input()` + setters + `EventEmitter` | Use `input()`, `model()`, `output()` signals |
| Visibility API | `visible` + `visibleChange` + `onVisibleChange` | Keep `visible` as `model<boolean>`; retain one canonical change event (`visibleChange`) and optional `onShow`/`onHide` outputs |
| Variant term | Prime uses component-level classes + Prime theme | Keep library `variant` = `'material' \| 'bootstrap' \| 'minimal'`; do not overload with filled/outlined semantics |
| Button visual type | Prime `ButtonProps` passthrough | Use `ui-lib-button` trigger/actions with explicit `appearance`, `severity`, `size` unions |
| Size naming | Item action hardcoded `size='small'` | Use `size: 'sm' \| 'md' \| 'lg'` and map to CSS vars |
| Direction/type unions | As defined in Prime | Keep unions but type strictly in `speed-dial.types.ts` |
| Tooltip | Prime depends on `pTooltip`/`tooltipOptions` | V1 fallback: item `aria-label` + title-based or lightweight tooltip hook; full `ui-lib-custom/tooltip` integration can be deferred |
| Template syntax | `*ngIf`, `*ngFor` | Use Angular block syntax (`@if`, `@for`) |
| Keyboard constants | Hard-coded `event.code` strings | Reuse `KEYBOARD_KEYS` from `ui-lib-custom/core` |
| Outside click | Raw renderer document listener | Reuse existing outside-click/overlay patterns from `cascade-select` and/or dialog patterns |
| Focus handling | Focus list + `aria-activedescendant` | Reuse the same pattern used in `cascade-select` for active id and key loops |
| Escape close | Dedicated handler | Mirror `dialog` escape-close semantics (`closeOnEscape` style flag if needed) |
| Mask/backdrop | Optional mask div + outside click close | Reuse dialog-like mask semantics (`dismissableMask` naming considered) while keeping API minimal for v1 |
| Theming | Prime classes + token system | Use `--uilib-speed-dial-*` CSS vars and runtime variant classes |
| Cross-entry imports | Prime internal package imports | Use package-path imports only (`ui-lib-custom/core`, `ui-lib-custom/theme`, `ui-lib-custom/button`) |

## Reuse notes from existing `ui-lib-custom` patterns

- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`
  - Reuse escape-close handling style and optional mask dismissal semantics.
  - Focus trap exists in `ui-lib-custom/core` (`FocusTrap`) if SpeedDial later needs modal-like focus containment (likely not needed for v1).
- `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.ts`
  - Reuse keyboard structure (`KEYBOARD_KEYS` constants), `aria-activedescendant` pattern, and disabled-aware list navigation.
  - Reuse append/overlay positioning ideas only if SpeedDial actions are later detached from host (not required for basic radial host-relative layout).
- `projects/ui-lib-custom/src/lib/button/button.ts`
  - Reuse trigger/action rendering with existing `variant`, `appearance`, `size`, `severity` API and icon handling.

## Deferred features (v2)

- Full tooltip parity (`tooltipOptions` equivalent object and behavior matrix).
- Router link/url/target action rendering parity in default item template.
- Pass-through prop API equivalent to Prime `buttonProps`.
- Advanced RTL direction overrides and mirrored radial math.
- Additional a11y announcements (optional `aria-live` status updates when opening/closing).
- Fine-grained animation parity with Prime timing constants if design tokens diverge.

