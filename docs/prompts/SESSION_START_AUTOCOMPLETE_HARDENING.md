# Session Prompt — AutoComplete Component Hardening

> **Retroactive hardening record** — this prompt documents the completed hardening of the AutoComplete
> component (2026-05-10) and serves as:
> 1. An accurate record of every issue found, diagnosed, and fixed.
> 2. A forward-passing of all lessons learned from Dialog → Drawer → Select → AutoComplete.
> 3. A template for the next combobox-pattern component: **CascadeSelect** (Tier 3, #25).
>
> To run a fresh hardening session on another component, copy the inner code block, adjust the
> component name and specific concerns, and paste it as the first message in a new agent session.

---

## Prompt

```
You are a senior Angular framework architect and elite UI systems engineer working on ui-lib-custom — a next-generation Angular UI ecosystem with a current strategic commitment to Elite Accessibility as its signature strength.

---

## Step 1 — Read these files before doing anything else (in this order)

1. `AI_AGENT_CONTEXT.md` — current milestone, component inventory, recent handoffs
2. `LIBRARY_CONVENTIONS.md` — all architectural rules and the bash.exe terminal requirement
3. `docs/VISION.md` — strategic north star, especially the "Committed — Elite Accessibility" section
4. `docs/COMPONENT_SCORES.md` — the hardening backlog; AutoComplete is #3 in Tier 1
5. `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md` — the 6-phase workflow you will follow
6. `projects/ui-lib-custom/src/lib/autocomplete/README.md` — the component API contract

Then read the full component source:
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.html`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.scss`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.types.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.constants.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.spec.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.a11y.spec.ts` (if it exists)

Also read the completed hardening sessions for patterns to follow:
- `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts` — signal viewChild, queueMicrotask focus
- `projects/ui-lib-custom/src/lib/drawer/drawer.ts` — module-level ID counter, FocusTrap
- `projects/ui-lib-custom/src/lib/select/select.ts` — targeted click listener, CSS ::before group labels

Do not write any code until you have read all of the above.

---

## Step 2 — Your task

Evolve the AutoComplete component through the 6-phase workflow defined in
`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The current committed wow factor for this library is **Elite Accessibility**.
The key a11y concern for AutoComplete (from the hardening backlog) is:
> Combobox with live region announcements, `aria-activedescendant`

Run **Phase 3 first (Accessibility Audit)** — this is the priority phase given the wow factor.
Then continue with Phases 1, 2, 4, 5, 6.

---

### Architecture concerns (Phase 1)

1. **`@HostListener('document:click')` global listener** — If the component uses `@HostListener('document:click', ['$event'])`, it registers a listener that fires on EVERY click in the app even when the panel is closed. Replace with a targeted approach: store a named arrow-function field on the class and register/remove it via `DOCUMENT.addEventListener`/`removeEventListener` only during `showPanel()`/`hidePanel()` (and in `ngOnDestroy()`). The stored field reference ensures `add` and `remove` receive the same function reference.

   ```typescript
   private readonly docClickHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
     const targetNode: Node | null = event.target as Node | null;
     const clickedInsideHost: boolean =
       targetNode !== null && this.hostElement.nativeElement.contains(targetNode);
     const panel: HTMLElement | null = this.panelElement()?.nativeElement ?? null;
     const clickedInsidePanel: boolean =
       targetNode !== null && panel?.contains(targetNode) === true;
     if (!clickedInsideHost && !clickedInsidePanel) {
       this.hidePanel();
     }
   };
   ```

   `showPanel()` ends with: `this.documentRef.addEventListener('click', this.docClickHandler);`
   `hidePanel()` starts with: `this.documentRef.removeEventListener('click', this.docClickHandler);`
   `ngOnDestroy()` also calls: `this.documentRef.removeEventListener('click', this.docClickHandler);`

2. **`CommonModule` import** — If the component imports `CommonModule`, replace it with the specific directives actually used (typically only `NgTemplateOutlet` from `@angular/common`). `CommonModule` is a blanket import that includes many unused directives and prevents tree-shaking.

3. **`@HostListener` duplicate** — If the component binds the same event handler in both `host: { '(keydown)': 'onKeydown($event)' }` metadata AND `@HostListener('keydown', [...])` on the method body, Angular registers two separate listeners = every keydown fires the handler **twice**. Remove the `@HostListener` decorator. Keep only the `host` metadata binding.

---

### Accessibility concerns (Phase 3 — priority)

4. **Combobox ARIA 1.2 pattern on the text input** — The `<input>` is the combobox. It must have:
   - `role="combobox"` (explicit — do not rely on implicit)
   - `aria-haspopup="listbox"`
   - `aria-expanded` bound to `panelVisible() ? 'true' : 'false'`
   - `aria-controls` bound to the listbox id **only when the panel is open** (`panelVisible() ? listboxId : null`) — never point to an element that doesn't exist in the DOM
   - `aria-autocomplete="list"` — tells AT that filtering occurs
   - `aria-activedescendant` bound to the focused option id (or null when none focused or panel closed)
   - `[attr.aria-invalid]` bound to `invalid() ? 'true' : null`
   - `autocomplete="off"` — prevents browser autocomplete from obscuring the result list

5. **Icon buttons must use inline SVG, not raw characters** — Every interactive button whose visible content is a Unicode character (×, ×, v, ▾, etc.) must be replaced with:
   - An inline `<svg>` with `aria-hidden="true"` and `focusable="false"` for the visual icon
   - A descriptive `aria-label` on the `<button>` itself
   - Do NOT use Unicode characters or text nodes as the sole visual content of interactive buttons

   Specifically:
   - Chip remove button: inline SVG X path, `aria-label="Remove {chipLabel}"`
   - Clear button: inline SVG X path, `aria-label="Clear"`
   - Dropdown button: inline SVG chevron path, `aria-label="Show options"`

6. **`role="listbox"` panel must have an accessible name** — axe-core rule `aria-input-field-name` flags any `role="listbox"` element that has no accessible name. The panel must have `[attr.aria-label]="listboxLabel()"` where `listboxLabel()` is a computed signal that returns `ariaLabel() ?? 'Suggestions'`. Without the fallback, tests without an explicit `ariaLabel` input will fail the axe check.

   ```typescript
   protected readonly listboxLabel: Signal<string> = computed<string>((): string => {
     return this.ariaLabel() ?? 'Suggestions';
   });
   ```

7. **Chip list: use `<div role="group">` not `<ul role="group">`** — If the chip container is a `<ul>` with `role="group"`, its `<li>` children retain their implicit `role="listitem"`. The `listitem` role requires a list/menu/menubar parent; `role="group"` does not qualify. axe-core flags this as a `listitem` violation. Fix: change the chip container from `<ul>`/`<li>` to `<div>`/`<div>`. CSS class selectors are unaffected; only the element types change. The container keeps `role="group"` and `aria-label="Selected items"`. Chip items have no explicit role but do have `aria-label` for their label content.

   **Do NOT use `role="listbox"` on the chip container.** The chip container holds selected token badges, not a selection listbox. A `role="listbox"` requires all children to be `role="option"`, but the `<input>` chip wrapper is not an option. `role="group"` correctly models the container as a labelled region.

8. **Option groups: no DOM label divs inside `role="listbox"`** — A `role="listbox"` may only own `role="option"` and `role="group"` children. Any other element type (including a `<div>` with custom label content) is an `aria-required-children` violation in axe-core. Use the same pattern established in Select hardening:
   - Group container: `<div role="group" [attr.aria-label]="getGroupLabel(groupOption)">`
   - Visual group header: CSS `::before { content: attr(aria-label); ... }` pseudo-element — NOT a DOM child
   - If a custom `groupTemplate` is needed, render it in an `aria-hidden="true"` div BEFORE (outside) the `role="group"` container, never inside it

   ```html
   @if (groupTemplate()) {
     <div class="ui-autocomplete-option-group-header" aria-hidden="true">
       <ng-container *ngTemplateOutlet="groupTemplate(); context: { $implicit: groupOption }"></ng-container>
     </div>
   }
   <div class="ui-autocomplete-option-group" role="group" [attr.aria-label]="getGroupLabel(groupOption)">
     @for (...) {
       <div role="option" ...>...</div>
     }
   </div>
   ```

   ```scss
   ui-lib-autocomplete .ui-autocomplete-option-group::before {
     content: attr(aria-label);
     display: block;
     padding: 0.35rem 0.75rem;
     font-size: 0.75rem;
     font-weight: 600;
     text-transform: uppercase;
     letter-spacing: 0.04em;
     pointer-events: none;
     user-select: none;
   }
   ```

9. **`aria-setsize` and `aria-posinset` on all options** — Every `role="option"` element in every render path (flat, virtual-scroll, grouped) must include:
   - `[attr.aria-setsize]="visibleOptions().length"` — total count of all options (use the flattened total for grouped mode)
   - `[attr.aria-posinset]="optionIndex + 1"` — 1-based position of this option

10. **Live region for result count** — A visually-hidden `aria-live="polite"` region announces the number of available suggestions when they arrive. It must be **always in the DOM** (outside `@if (panelVisible())`) so the browser observes the text change and announces it. The region starts empty and is populated by a computed signal.

    ```html
    <div class="ui-autocomplete-sr-live" aria-live="polite" aria-atomic="true">{{ resultsAnnouncement() }}</div>
    ```

    ```typescript
    protected readonly resultsAnnouncement: Signal<string> = computed<string>((): string => {
      if (!this.panelVisible() || this.loading()) return '';
      const count: number = this.visibleOptions().length;
      if (count === 0) return '';
      return count === 1 ? '1 result available' : `${count} results available`;
    });
    ```

    ```scss
    ui-lib-autocomplete .ui-autocomplete-sr-live {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    ```

11. **Create / expand `autocomplete.a11y.spec.ts`** — The comprehensive a11y spec must cover:
    - **Closed state (7 tests):** `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded="false"`, `aria-autocomplete="list"`, `aria-controls` is null when closed, `aria-activedescendant` is null when closed, no panel in DOM
    - **Open state (8 tests):** `aria-expanded="true"`, `aria-controls` resolves to panel, panel has `role="listbox"`, options have `role="option"`, options have `aria-selected="false"`, `aria-setsize` = total count, `aria-posinset` starting at 1, first option focused via `aria-activedescendant`
    - **Keyboard navigation (7 tests):** ArrowDown opens panel, Enter selects and closes, Escape closes, ArrowDown moves `aria-activedescendant`, ArrowUp moves it, Home goes to first, End goes to last
    - **Multiple / chip mode (6 tests):** chip container has `role="group"`, chip container has `aria-label="Selected items"`, chips have descriptive `aria-label`, remove button contains "Remove" in aria-label, remove button uses SVG not raw character, panel stays open after chip selection
    - **Disabled state (2 tests):** input has `disabled` attribute, ArrowDown does not open panel
    - **Dropdown + clear (4 tests):** dropdown button has `aria-label="Show options"`, dropdown button uses SVG with `aria-hidden="true"`, clear button has `aria-label="Clear"`, clear button uses SVG with `aria-hidden="true"`
    - **Grouped options (5 tests):** group containers have `role="group"`, groups have correct `aria-label`, no DOM label divs (`.ui-autocomplete-option-group-label` count = 0), all options have `role="option"`, options have `aria-setsize` = total of all grouped items
    - **Live region (6 tests):** live region always in DOM, has `aria-live="polite"` and `aria-atomic="true"`, empty when panel closed, announces "N results available" for N > 1, announces "1 result available" for 1, empty when panel closes
    - **axe-core (7 tests):** closed state, open state with flat options, multiple with chips, multiple with open panel, grouped open state, disabled state, dropdown with clear button

---

## Step 3 — After all 6 phases are complete

1. Score the component using the Scoring Session Template from `docs/COMPONENT_SCORES.md`
2. Update the AutoComplete row in `docs/COMPONENT_SCORES.md` with the actual scores
3. Update the Queue status for AutoComplete from ⏳ to ✅ or 🔄 depending on outcome
4. Run the full verification suite:
   - `npx.cmd jest --testPathPatterns=autocomplete --no-coverage`
   - `npx.cmd jest --testPathPatterns=entry-points --no-coverage`
   - `npx.cmd eslint projects/ui-lib-custom/src/lib/autocomplete/ --max-warnings 0`
   - `npx.cmd ng build ui-lib-custom`
5. Append a session handoff block to `AI_AGENT_CONTEXT.md → ## Recent Handoffs`

---

## Non-negotiable rules for this session

- Use `bash.exe` for ALL terminal commands — never PowerShell (ESLint exits code 1 in PowerShell even on success)
- Use `npx.cmd` and `npm.cmd` if bare `npx`/`npm` fail due to `.ps1` shim restrictions
- Every change must pass ESLint at `--max-warnings 0` before being considered done
- When any a11y trade-off arises, always go further, not less
- Do not modify `LIBRARY_CONVENTIONS.md`, `AGENTS.md`, `CLAUDE.md`, or `docs/VISION.md`
- The component uses `ViewEncapsulation.None` + `OnPush` + standalone — never change these

### Critical rules inherited from prior hardening sessions

- **[Dialog lesson] `triggerEventHandler` for OnPush/zoneless tests** — In a zoneless `OnPush` component, direct property assignment (`component.foo = 'bar'`) does NOT mark the component dirty and will not trigger change detection. Use `fixture.debugElement.triggerEventHandler('click', event)` for host events, or write to a `WritableSignal` on the host component and call `fixture.detectChanges()`.

- **[Drawer lesson] Optional-chain lint trap** — `myVar?.method()` where `myVar` is a type cast like `something as MyType` (without `| null`) triggers `@typescript-eslint/no-unnecessary-condition` because TypeScript believes the cast type is never null. Always include `| null` in cast types when the value may actually be null at runtime: `something as MyType | null`.

- **[Select lesson] Do NOT use raw Unicode in interactive controls** — × (multiplication sign), x, v, ▾, etc. are announced by screen readers and provide poor tactile affordance. Every icon inside a button or other interactive element must be an inline SVG with `aria-hidden="true"` and `focusable="false"`. The button itself keeps a descriptive `aria-label`.

- **[Select lesson] CSS `::before { content: attr(aria-label) }` for group headers** — Inside `role="listbox"`, the only valid owned children are `role="group"` and `role="option"`. Any other element triggers `aria-required-children` violations in axe-core. Visual group headers must be rendered via `::before` pseudo-element using `content: attr(aria-label)` on the `role="group"` element itself — not as a DOM child.

- **[AutoComplete lesson] `<ul role="group">` + `<li>` = axe violation** — `<li>` has an implicit `role="listitem"` which requires a list/menu/menubar parent. When a `<ul>` has `role="group"` applied, it is no longer a list from ARIA's perspective, so the `<li>` children lose their valid parent context. axe-core fires the `listitem` rule. Fix: change both the container and its children to `<div>` elements. CSS class selectors are unaffected.

- **[AutoComplete lesson] `role="listbox"` requires an accessible name** — axe-core rule `aria-input-field-name` requires all "input field" roles (including `listbox`) to have an accessible name via `aria-label`, `aria-labelledby`, or `title`. Always add `[attr.aria-label]="listboxLabel()"` to the panel, where `listboxLabel()` falls back to a default string when the consumer provides no `ariaLabel` input.

- **[AutoComplete lesson] `DebugElement.componentInstance` lint pattern** — `DebugElement.componentInstance` is typed as `any` in Angular's typedefs. Directly accessing it triggers `@typescript-eslint/no-unsafe-member-access`. Use a double-cast to suppress this cleanly without a disable comment:
  ```typescript
  function getComponentInstance(fixture: ComponentFixture<unknown>): MyComponent {
    const debugEl: DebugElement = fixture.debugElement.query(By.directive(MyComponent));
    return (debugEl as unknown as { componentInstance: MyComponent }).componentInstance;
  }
  ```

- **[AutoComplete lesson] `?.textContent?.trim()` optional-chain lint** — `element?.textContent?.trim()` where `textContent` is `string | null` raises `no-unnecessary-condition` on the second `?.` in some TypeScript configurations. Prefer: `(element?.textContent ?? '').trim()`.

- **[AutoComplete lesson] axe diagnostic pattern** — When axe tests fail without obvious cause, write a temporary diagnostic spec (e.g. `axe-debug.spec.ts`) that imports `axe` from `jest-axe` and logs `results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.html) }))` before asserting `true`. Run the diagnostic spec, read the exact rule IDs, then delete the file. Never commit diagnostic specs.

---

## Success criteria

The session is complete when:
- All 6 phases have been run and improvements applied
- `autocomplete.a11y.spec.ts` has ≥ 50 tests covering the full combobox ARIA pattern, keyboard nav, chip mode, groups, live region, and axe-core automated checks
- All 10 scorecard categories have been evaluated and recorded in `docs/COMPONENT_SCORES.md`
- ESLint, build, and Jest all pass with zero errors / zero warnings
- The AutoComplete component scores ≥ 8 in every category, OR a clear plan exists for remaining gaps
- The session handoff is written in `AI_AGENT_CONTEXT.md`

Begin by reading the files listed in Step 1. Report what you find before proposing any changes.
```

---

## Notes for the session

### ARIA combobox pattern for AutoComplete (ARIA 1.2 / APG)

AutoComplete is a "list autocomplete with automatic selection" combobox. The structure differs from Select in one key way: the text `<input>` IS the combobox, not a wrapper host element.

```
<input role="combobox"
       aria-haspopup="listbox"
       aria-expanded="true|false"
       aria-controls="→ listbox id (only when panel open)"
       aria-autocomplete="list"
       aria-activedescendant="→ active option id | null">

[chip container, multiple mode only]
  <div role="group" aria-label="Selected items">
    <div class="chip" aria-label="{label}">             ← no role="option" (not a listbox selection)
      <button aria-label="Remove {label}"><svg aria-hidden="true">...</svg></button>
    </div>
    <div class="input-chip">                            ← wraps the <input> above
  </div>

[panel, @if panelVisible()]
  <div role="listbox"
       id="→ listboxId"
       aria-label="→ listboxLabel() (required for aria-input-field-name rule)">

    [flat options]
      <div role="option" id="..." aria-selected="true|false"
           aria-setsize="{total}" aria-posinset="{1..n}">

    [grouped options — role="group" may only contain role="option" children]
      <div class="group-header" aria-hidden="true">   ← custom groupTemplate mount point (outside group)
      <div role="group" aria-label="{group label}">   ← visual label via CSS ::before {content: attr(aria-label)}
        <div role="option" ...>
      </div>

[live region — always in DOM, outside @if(panelVisible())]
  <div class="sr-live" aria-live="polite" aria-atomic="true">{{ resultsAnnouncement() }}</div>
```

### Key differences from Select that affect the ARIA strategy

| Concern | Select | AutoComplete |
|---|---|---|
| Who is the combobox? | Host element (`ui-lib-select`) | The text `<input>` |
| Panel trigger | Click on host | User typing / ArrowDown / dropdown button |
| Multiple selection | `aria-multiselectable` on listbox | Chip tokens in `role="group"` container |
| Search/filter | Optional `searchable` mode | Always — typing IS the filter |
| Group headers | `role="group"` + CSS `::before` | Same pattern |
| Listbox accessible name | `aria-label` on panel | `aria-label` on panel with fallback `'Suggestions'` |

### Axe violations you will encounter

Diagnose all axe failures using the diagnostic pattern from the non-negotiable rules above. Common violations in this component:

| axe Rule ID | Element | Cause | Fix |
|---|---|---|---|
| `aria-input-field-name` | `[role="listbox"]` panel | No accessible name | Add `[attr.aria-label]="listboxLabel()"` with `?? 'Suggestions'` fallback |
| `listitem` | `<li>` inside `<ul role="group">` | `<li>` has implicit `listitem` role; parent is `group` not `list` | Change `<ul>/<li>` → `<div>/<div>` |
| `aria-required-children` | `[role="listbox"]` or `[role="group"]` | Non-option DOM children (e.g. group label divs) inside listbox/group | Move all visual labels to CSS `::before` pseudo-element only |

### Inherited lessons chain

Each session builds on all prior sessions. The chain:

| Session | Key lesson added |
|---|---|
| **Dialog** | `queueMicrotask` for focus after animations; `triggerEventHandler` for OnPush/zoneless test events |
| **Drawer** | `as Type \| null` in casts to avoid `no-unnecessary-condition` on optional chains |
| **Select** | Targeted document-click listener via stored field; CSS `::before` group headers; raw chars → SVG icons |
| **AutoComplete** | `<ul role="group">` → `<div role="group">` (listitem axe rule); `role="listbox"` needs accessible name; `DebugElement.componentInstance` double-cast pattern; `?.textContent?.trim()` → `(x?.textContent ?? '').trim()`; axe diagnostic spec technique |

### Reference — the 6 phases in brief

| Phase | Focus |
|---|---|
| 1 — Architecture Review | Is the component fundamentally well-designed? SSR-safe? Signals-first? |
| 2 — DX Optimization | Reduce friction, improve naming, improve typing, improve autocomplete |
| **3 — Accessibility Audit** | **Full keyboard nav, ARIA correctness, focus management, reduced motion — run this first** |
| 4 — Performance Audit | Unnecessary renders, signal opportunities, memory, animation cost |
| 5 — Composability Audit | Content projection, directives, slots, headless patterns |
| 6 — Emotional Polish | Animation feel, interaction smoothness, perceived responsiveness, delight |

### Outcome (retroactive record)

**Final score: 8.2/10** — all 10 categories ≥ 8. Status: ✅ Done.

| Category | Score | Notes |
|---|---|------|
| API | 8 | Signal inputs/outputs, ControlValueAccessor, rich event surface |
| **A11y** | **9** | Full WCAG 2.1 AA combobox pattern, 52 a11y tests, 7/7 axe-core passes |
| Perf | 8 | OnPush + signals, virtual scroll, targeted click listener |
| Comp | 8 | 9 content projection slots (item, selectedItem, group, header, footer, empty, loading, dropdownIcon, removeTokenIcon) |
| Theme | 8 | CSS variables `--uilib-autocomplete-*`, three variants, size tokens |
| DX | 8 | Clean API, ControlValueAccessor, debounced completeMethod |
| Docs | 8 | README with all inputs/outputs/slots |
| Polish | 8 | Chip animations, keyboard focus indicators, SVG icons |
| Angular | 9 | ViewEncapsulation.None + OnPush + standalone, signal inputs/viewChild, no decorators |
| Feel | 8 | Multiple mode, virtual scroll, groups, full keyboard support |

**Tests after hardening:** 96/96 (44 unit + 52 a11y)

**Next queue item after AutoComplete:** ConfirmDialog (Tier 1, #6) — key a11y concern: `role=alertdialog`, default focus on confirm action button, Escape key dismissal.

