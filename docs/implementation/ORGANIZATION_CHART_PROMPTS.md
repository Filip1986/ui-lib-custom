# OrganizationChart — Agent Prompt Sequence

> Generated: 2026-04-21
> Component classification: **Data display / compound** (recursive tree structure)
> Complexity estimate: **6 prompts** (no CVA, no overlay, but recursive rendering adds complexity)

---

## Execution Order

| # | Phase | Can run after | Est. effort |
|---|---|---|---|
| 1 | Research & Gap Analysis | — | Small |
| 2 | API Design, Types & Scaffold | 1 | Small |
| 3 | Core Rendering (recursive tree + connectors) | 2 | Large |
| 4 | Interactions (selection + expand/collapse) | 3 | Medium |
| 5 | Styling (3 variants, CSS vars, animations) | 3 | Medium |
| 6 | Tests + Demo + Documentation | 4, 5 | Medium |

Prompts 4 and 5 can run in parallel after Prompt 3 completes.

---

## Prompt 1 — Research & Gap Analysis

### Context

You are building a new `OrganizationChart` component for the `ui-lib-custom` Angular component library. This component renders an interactive hierarchical tree of nodes — typically used to display org structures, reporting lines, or any parent-child hierarchy. You need to research the PrimeNG reference, understand the full API surface, and document every convention divergence before writing a single line of implementation code.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md` — component inventory and active work
2. `LIBRARY_CONVENTIONS.md` — all architectural rules (source of truth)
3. `COMPONENT_CREATION_GUIDE.md` — creation workflow

### Task

**Step 1 — Inspect PrimeNG source via `npm pack`** (never scrape the website):

```bash
workdir="$(mktemp -d)"
cd "$workdir"
npm pack primeng@19 --pack-destination .
tar xzf primeng-19.*.tgz
cat ./package/organizationchart/organizationchart.d.ts
cat ./package/fesm2022/primeng-organizationchart.mjs
# also check interface file if present:
cat ./package/organizationchart/organizationchart.interface.d.ts 2>/dev/null || echo "No interface file"
```

**Step 2 — Document the following from PrimeNG:**

- Full `@Input()` list with types and defaults
- Full `@Output()` list with event payload types
- The `TreeNode` / `OrganizationChartNode` interface (field names and types)
- How recursive rendering is achieved (recursive template, recursive component, or `*ngTemplateOutlet`)
- How the connector lines between nodes are drawn (CSS technique used)
- How selection state is managed across the tree
- How expand/collapse is handled (which field on the node, DOM approach)
- Which ARIA roles/attributes are used

**Step 3 — Produce a convention-divergence table** covering every place where our library's rules differ from PrimeNG's API:

| PrimeNG concept | Our equivalent | Reason |
|---|---|---|
| `@Input() value` | `input<OrganizationChartNode[]>('value')` | Signal inputs only |
| `@Input() selection` | `model<OrganizationChartNode \| OrganizationChartNode[] \| null>('selection')` | Two-way binding via `model()` |
| `@Output() selectionChange` | Handled automatically by `model()` | No separate EventEmitter |
| `@Output() onNodeSelect` | `output<OrganizationChartNodeSelectEvent>()` named `nodeSelect` | camelCase output names |
| `p-` CSS classes | `uilib-` CSS classes | Library prefix |
| Hardcoded hex/px | `--uilib-organization-chart-*` CSS variables | No raw values |
| TypeScript `enum` | `as const` + string union | Library convention |
| `@Input()` / `@Output()` decorators | `input()` / `model()` / `output()` signals | Library convention |
| `styleClass` | `styleClass` | Keep as-is (escape-hatch pattern) |

**Step 4 — Produce a recommended API surface** for our component:

Document the proposed inputs, model signals, outputs, and the `OrganizationChartNode` interface. The interface must use our naming conventions and support:
- `key` (string, unique node id)
- `label` (string, display text)
- `type` (string, optional, for template selection)
- `data` (unknown, optional, for consumer-supplied arbitrary data)
- `expanded` (boolean, optional, controls subtree visibility — note: mutable state lives on node objects just like PrimeNG)
- `selectable` (boolean, optional, per-node opt-out of selection)
- `styleClass` (string, optional)
- `children` (OrganizationChartNode[], optional)

**Step 5 — Classify the rendering approach** and document the recommendation.  
Angular does not support truly recursive templates natively. The cleanest approach is a **recursive child component** (`OrganizationChartNodeComponent`) that `ui-lib-organization-chart` instantiates. Document this recommendation and note any trade-offs.

**Step 6 — Research the WAI-ARIA tree pattern.** The correct ARIA pattern for a collapsible tree is:

- `role="tree"` on the root
- `role="treeitem"` on each node
- `aria-expanded` on nodes with children
- `aria-selected` on selectable nodes
- Keyboard: Arrow keys for navigation, Enter/Space for select/expand

Document the complete keyboard navigation spec before implementation.

### Constraints

- Do **not** write any TypeScript or SCSS yet — this is research only.
- Use `npm pack primeng@19` — never fetch the PrimeNG website.
- Do not skip the ARIA research step.

### Deliverable

A written analysis document (in your response) covering: PrimeNG API surface, convention-divergence table, proposed API surface (inputs/outputs/interface), rendering approach recommendation, and ARIA/keyboard spec. No files are created in this prompt.

Update `AI_AGENT_CONTEXT.md` → `## Active Session State` to reflect that OrganizationChart research is in progress.

---

## Prompt 2 — API Design, Types & Scaffold

### Context

Research from Prompt 1 is complete. You now have the proposed API surface documented. This prompt creates the full file scaffold for `OrganizationChart`: the types file, the barrel export, the secondary entry point wiring, and the component stubs — but does not implement rendering logic yet.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. Inspect an existing secondary entry point for the exact file pattern to follow:
   - `projects/ui-lib-custom/data-view/ng-package.json`
   - `projects/ui-lib-custom/data-view/package.json`
   - `projects/ui-lib-custom/data-view/public-api.ts`
   - `projects/ui-lib-custom/src/lib/data-view/index.ts`

### Task

**Step 1 — Create the types file** at `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.types.ts`:

```typescript
// OrganizationChartNode interface (use unknown for data field)
// OrganizationChartSelectionMode: 'single' | 'multiple' | null  (string union, NOT an enum)
// OrganizationChartVariant: 'material' | 'bootstrap' | 'minimal'
// OrganizationChartNodeSelectEvent { node: OrganizationChartNode }
// OrganizationChartNodeExpandEvent { node: OrganizationChartNode }
// All exported with explicit types; no `as const` needed for string unions
```

**Step 2 — Create stub component files:**

- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.ts` — stub with correct decorator metadata only (no logic yet):
  - `selector: 'ui-lib-organization-chart'`
  - `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush`, `standalone: true`
  - `host: { class: 'ui-lib-organization-chart' }`
  - Declare all inputs, model signals, and outputs with their types but no implementation
  - `templateUrl: './organization-chart.html'`
  - `styleUrl: './organization-chart.scss'`

- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.ts` — the recursive child component stub:
  - `selector: 'ui-lib-organization-chart-node'`
  - `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush`, `standalone: true`
  - `host: { class: 'ui-lib-organization-chart-node' }`
  - Declare inputs: `node`, `selectionMode`, `selection`, `nodeTemplate`
  - `templateUrl: './organization-chart-node.html'`
  - `styleUrl: './organization-chart-node.scss'` (can be empty for now)

- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.html` — minimal placeholder: `<ng-container />`
- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.html` — minimal placeholder: `<ng-container />`
- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.scss` — empty
- `projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.scss` — empty

**Step 3 — Create the barrel** at `projects/ui-lib-custom/src/lib/organization-chart/index.ts`:

Export the component, node component, and all types.

**Step 4 — Create the secondary entry point** under `projects/ui-lib-custom/organization-chart/`:

Exactly three files mirroring the `data-view` pattern:
- `ng-package.json` with `entryFile: ../src/lib/organization-chart/index.ts`
- `package.json` with `{ "name": "ui-lib-custom/organization-chart" }`
- `public-api.ts` re-exporting from `../src/lib/organization-chart/index`

**Step 5 — Update `projects/ui-lib-custom/package.json`:**

Add `./organization-chart` to both `exports` and `typesVersions` following the exact same pattern as `./data-view`.

**Step 6 — Add import regression test** to `projects/ui-lib-custom/test/entry-points.spec.ts`:

Add an import line and a test case that verifies `OrganizationChart` is exported from `ui-lib-custom/organization-chart`.

**Step 7 — Run build verification:**

```bash
npx.cmd ng build ui-lib-custom
npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache
```

Fix any build errors before proceeding.

### Constraints

- `ViewEncapsulation.None` and `ChangeDetectionStrategy.OnPush` on every component — no exceptions.
- Use `input()`, `model()`, `output()` — never `@Input()` / `@Output()` decorators.
- String union types for all public inputs — not constants objects, not enums.
- All methods and functions must have explicit return types.
- Do **not** add OrganizationChart to `projects/ui-lib-custom/src/public-api.ts` (secondary entry points are preferred).

### Deliverable

All files listed above exist, the build passes, and the entry-point regression test passes. Update `AI_AGENT_CONTEXT.md` with the scaffold status.

---

## Prompt 3 — Core Rendering (Recursive Tree + Connectors)

### Context

The scaffold from Prompt 2 is complete and the build passes. This prompt implements the core visual rendering: the recursive `OrganizationChartNodeComponent` that draws tree nodes and the CSS connector lines between them. No selection or expand/collapse interaction yet — just a static, fully-rendered tree.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.ts` (current stub)
4. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.ts` (current stub)
5. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.types.ts`

### Task

**Step 1 — Implement `OrganizationChartNodeComponent` template and logic** (`organization-chart-node.html` + `organization-chart-node.ts`):

The node component is responsible for rendering one level of the tree. Its template structure must be:

```
.uilib-org-chart-node-wrapper
  .uilib-org-chart-node-cell          ← the visible card/box
    [ng-content / custom template slot]
    .uilib-org-chart-node-label        ← fallback label if no custom template
  .uilib-org-chart-node-children-connector  ← vertical line down (only if has children)
  .uilib-org-chart-children-row             ← horizontal flex row of children
    @for (child of node().children; track child.key)
      .uilib-org-chart-child-wrapper         ← wraps connector-up + child node
        .uilib-org-chart-connector-up         ← vertical line up to sibling bar
        ui-lib-organization-chart-node [node]="child" ...  ← RECURSIVE
```

Key implementation requirements:
- Use `@if` and `@for` block syntax throughout — no `*ngIf`/`*ngFor`
- The recursive `<ui-lib-organization-chart-node>` self-closes (no projected content)
- Pass `selectionMode`, `selection`, and `nodeTemplate` inputs down to each recursive child
- `nodeTemplate` is an `InputSignal<TemplateRef<{ $implicit: OrganizationChartNode }> | null>` — used with `NgTemplateOutlet` when provided, falling back to the label
- The `node` input is `input.required<OrganizationChartNode>()`
- Import `NgTemplateOutlet` from `@angular/common`

**Step 2 — Implement `OrganizationChartComponent`** (`organization-chart.html` + `organization-chart.ts`):

The parent component:
- Accepts `value = input<OrganizationChartNode[]>([])` — the root-level nodes array
- Accepts `selectionMode = input<OrganizationChartSelectionMode>(null)`
- Accepts `selection = model<OrganizationChartNode | OrganizationChartNode[] | null>(null)`
- Accepts `variant = input<OrganizationChartVariant>('material')`
- Accepts `styleClass = input<string>('')`
- Has `nodeSelect = output<OrganizationChartNodeSelectEvent>()`, `nodeUnselect = output<OrganizationChartNodeSelectEvent>()`, `nodeExpand = output<OrganizationChartNodeExpandEvent>()`, `nodeCollapse = output<OrganizationChartNodeExpandEvent>()`
- Exposes a `@ContentChild(TemplateRef)` — no wait, use `contentChild(TemplateRef)` signal query — for the optional custom node template. Name it `nodeTemplate`.
- Host bindings: apply variant class (`uilib-variant-material` etc.), `styleClass()`, and a `role="tree"` ARIA attribute
- Template: renders `@for (root of value(); track root.key)` a `<ui-lib-organization-chart-node>` for each root node

**Step 3 — Connector line CSS architecture** (in `organization-chart.scss` and/or `organization-chart-node.scss`):

The standard approach for org chart connectors uses borders on wrapper elements:
- The **horizontal bar** across siblings is achieved via `::before`/`::after` pseudo-elements on the children row
- The **vertical lines** use `border-left` on wrapper cells plus fixed heights
- Use only `--uilib-organization-chart-*` CSS variables for all connector colors, widths, and spacing — no raw hex or px values
- Declare those variables with sensible defaults on the `:root` or component host

Define these CSS variables on the host (add to `design-tokens.ts` too):
```
--uilib-organization-chart-connector-color
--uilib-organization-chart-connector-width
--uilib-organization-chart-node-bg
--uilib-organization-chart-node-border-color
--uilib-organization-chart-node-border-radius
--uilib-organization-chart-node-padding
--uilib-organization-chart-node-min-width
--uilib-organization-chart-gap
```

**Step 4 — Run build verification:**

```bash
npx.cmd ng build ui-lib-custom
```

Fix any build errors. The demo app does not need to be wired up yet (it still has the placeholder).

### Constraints

- `ViewEncapsulation.None` on both components — mandatory.
- Use `@if` / `@for (x of y; track z)` — never `*ngIf`/`*ngFor`.
- No raw hex or px in SCSS — all values via CSS variables.
- All methods must have explicit return types.
- The recursive self-reference (`<ui-lib-organization-chart-node>` inside `organization-chart-node.html`) requires that `OrganizationChartNodeComponent` imports itself in its `imports: []` array.
- Use `NgTemplateOutlet` from `@angular/common` for custom template rendering.

### Deliverable

`ng build ui-lib-custom` passes. The tree renders nodes recursively with connector lines visible in the DOM. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 4 — Interactions (Selection + Expand/Collapse)

### Context

Static rendering from Prompt 3 is complete. This prompt adds the interactive behaviours: node selection (single and multiple mode), subtree expand/collapse toggling, and keyboard navigation.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.ts`
4. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart-node.ts`
5. `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.types.ts`
6. `projects/ui-lib-custom/src/lib/accordion/accordion.ts` — reference for keyboard handling patterns

### Task

**Step 1 — Selection logic in `OrganizationChartComponent`:**

Add two public methods that `OrganizationChartNodeComponent` will call via DI context injection (see Step 3):

```typescript
public handleNodeClick(node: OrganizationChartNode): void
public isNodeSelected(node: OrganizationChartNode): boolean
```

`handleNodeClick` must:
- Do nothing if `selectionMode()` is `null` or `node.selectable === false`
- In `'single'` mode: toggle (deselect if already selected, select otherwise); update `this.selection` model; emit `nodeSelect` or `nodeUnselect`
- In `'multiple'` mode: add/remove from the selection array; update `this.selection` model; emit accordingly

`isNodeSelected` must:
- Return `false` if `selectionMode()` is `null`
- In `'single'` mode: compare by `key`
- In `'multiple'` mode: check if the array includes the node by `key`

**Step 2 — Expand/collapse logic in `OrganizationChartComponent`:**

Add a public method:
```typescript
public handleNodeToggle(node: OrganizationChartNode): void
```

This mutates `node.expanded` (toggling between `true` and `false`) and emits `nodeExpand` or `nodeCollapse`. Note: PrimeNG mutates the node object directly for expand state — follow the same approach to keep the API familiar. Emit the appropriate output after mutation.

**Step 3 — DI context pattern for child-to-parent communication:**

Rather than threading event outputs through every level of the recursive tree, use Angular's DI to provide the parent `OrganizationChartComponent` to all descendant `OrganizationChartNodeComponent` instances:

In `OrganizationChartComponent`:
```typescript
providers: [{ provide: ORGANIZATION_CHART_CONTEXT, useExisting: OrganizationChart }]
```

Create `organization-chart-context.ts` with an `InjectionToken<OrganizationChartContext>` named `ORGANIZATION_CHART_CONTEXT`, where `OrganizationChartContext` is an interface exposing `handleNodeClick`, `handleNodeToggle`, `isNodeSelected`, `selectionMode`, and `selection`.

In `OrganizationChartNodeComponent`:
```typescript
private readonly chartContext = inject(ORGANIZATION_CHART_CONTEXT);
```

**Step 4 — Update `OrganizationChartNodeComponent` template:**

- Node cell: add `(click)="onNodeClick()"` and `(keydown.enter)="onNodeClick()"` and `(keydown.space)="onNodeClick()"`
- Conditionally apply `uilib-org-chart-node--selected` class based on `chartContext.isNodeSelected(node())`
- Conditionally apply `uilib-org-chart-node--selectable` class when `selectionMode()` is non-null and `node().selectable !== false`
- Add a collapse toggle button (only rendered when the node has children):
  ```html
  @if (node().children?.length) {
    <button
      class="uilib-org-chart-toggle"
      [attr.aria-expanded]="node().expanded !== false"
      [attr.aria-label]="node().expanded !== false ? 'Collapse' : 'Expand'"
      (click)="onToggleClick($event)"
      type="button">
      <!-- chevron icon via ng-content or inline SVG -->
    </button>
  }
  ```
- Wrap the children row in `@if (node().expanded !== false)` so collapsed subtrees are hidden

**Step 5 — Keyboard navigation on `OrganizationChartComponent`:**

Add a `(keydown)` handler on the host element implementing the WAI-ARIA tree keyboard spec:
- `ArrowDown` / `ArrowUp`: move focus between visible treeitem elements
- `ArrowRight`: expand a collapsed node (if it has children); move focus to first child if already expanded
- `ArrowLeft`: collapse an expanded node; move focus to parent if already collapsed
- `Home` / `End`: move focus to first/last visible node
- `Enter` / `Space`: select the focused node (calls `handleNodeClick`)

Use `querySelectorAll('[role="treeitem"]')` on the host element to get the navigable set. Manage focus via `.focus()` on the found elements.

**Step 6 — ARIA attributes:**

Ensure each rendered node cell has:
```html
role="treeitem"
[attr.aria-expanded]="hasChildren ? (node().expanded !== false) : null"
[attr.aria-selected]="selectionMode ? isSelected : null"
[attr.tabindex]="isFirstNode ? 0 : -1"
```

The root container (`OrganizationChartComponent` host) must have `role="tree"`.

**Step 7 — Run build + lint verification:**

```bash
npx.cmd ng build ui-lib-custom
npx.cmd eslint projects/ui-lib-custom/src/lib/organization-chart/
```

### Constraints

- Use DI context injection for child-to-parent communication — do not use `@Output()` event bubbling through multiple recursive levels.
- `node.expanded` is mutated directly (same pattern as PrimeNG) — this is intentional for API familiarity.
- All public methods must have explicit return types.
- No `@Input()` / `@Output()` decorators — signal inputs and outputs only.

### Deliverable

Selection and expand/collapse work. Keyboard navigation follows WAI-ARIA tree spec. Build and lint pass. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 5 — Styling (3 Variants, CSS Variables, Animations)

### Context

Core rendering and interactions from Prompts 3 and 4 are complete. This prompt implements the full SCSS styling for all three variants (`material`, `bootstrap`, `minimal`), maps all design tokens to CSS variables, and adds the expand/collapse animation.

> This prompt can run in parallel with Prompt 4 if desired — it depends only on Prompt 3.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. `projects/ui-lib-custom/src/lib/design-tokens.ts` — review existing tokens before adding new ones
4. `projects/ui-lib-custom/src/lib/accordion/accordion.scss` — reference for the 3-variant pattern and animation

### Task

**Step 1 — Extend `design-tokens.ts`:**

Add the following token group (only add tokens not already present):

```typescript
organizationChart: {
  connectorColor: 'var(--uilib-color-border)',
  connectorWidth: '1px',
  nodeBg: 'var(--uilib-surface-card)',
  nodeBorderColor: 'var(--uilib-color-border)',
  nodeBorderRadius: 'var(--uilib-radius-md)',
  nodePadding: 'var(--uilib-spacing-md)',
  nodeMinWidth: '120px',
  gap: 'var(--uilib-spacing-lg)',
  nodeSelectedBg: 'var(--uilib-color-primary-light)',
  nodeSelectedBorderColor: 'var(--uilib-color-primary)',
  nodeHoverBg: 'var(--uilib-surface-hover)',
  toggleBg: 'var(--uilib-surface-card)',
  toggleBorderColor: 'var(--uilib-color-border)',
  toggleColor: 'var(--uilib-color-text-secondary)',
}
```

**Step 2 — Expose as CSS variables** on the `ui-lib-organization-chart` host selector in `organization-chart.scss`:

```scss
.ui-lib-organization-chart {
  --uilib-organization-chart-connector-color: #{tokens.$organizationChart-connectorColor};
  // ... (one variable per token)
}
```

**Step 3 — Base structural styles** (layout, connector lines, node card):

- `.uilib-org-chart-node-wrapper` — `display: flex; flex-direction: column; align-items: center;`
- `.uilib-org-chart-node-cell` — card box: uses `--uilib-organization-chart-node-bg`, border, border-radius, padding, min-width, cursor pointer (when selectable)
- Connector lines: use `::before` / `::after` pseudo-elements on the children row and child wrappers — all widths/colors via CSS variables

**Step 4 — Material variant** (`.uilib-variant-material`):

- Elevated card appearance: `box-shadow` using `--uilib-shadow-sm`
- Subtle connector lines in `--uilib-color-border`
- Selected state: `--uilib-color-primary` border with `--uilib-color-primary-light` background
- Toggle button: rounded, outlined with `--uilib-color-border`

**Step 5 — Bootstrap variant** (`.uilib-variant-bootstrap`):

- Flat card with 1px solid border
- Bolder connectors
- Selected: Bootstrap-style `--uilib-color-primary` background with white text
- Toggle button: square corners

**Step 6 — Minimal variant** (`.uilib-variant-minimal`):

- No card border or shadow — just text with a subtle background on hover
- Connectors are thin dashed lines
- Selected: underline or left-border indicator only

**Step 7 — Expand/collapse animation:**

Use a CSS height transition on the children container. The pattern (from accordion) is three layers:
1. Clip wrapper: `overflow: hidden` — drives the `max-height` animation
2. Padding wrapper (if needed)
3. Content

Add `@keyframes` or a CSS transition on `max-height` from `0` to `auto` (use the grid-row trick if needed to avoid the `auto` height animation limitation).

Respect `prefers-reduced-motion`:
```scss
@media (prefers-reduced-motion: reduce) {
  .uilib-org-chart-children-row {
    transition: none;
  }
}
```

**Step 8 — Run build + SCSS budget check:**

```bash
npx.cmd ng build ui-lib-custom
npx.cmd ng build demo
```

No new SCSS budget warnings should be introduced. If budgets are exceeded, reduce by extracting repeated patterns into SCSS mixins.

### Constraints

- Zero raw hex or px values in SCSS — all via CSS variables.
- Variants are applied via host class (`uilib-variant-material` etc.) — no variant-specific component instances.
- `prefers-reduced-motion` must be respected.
- All three variants must be visually distinct.

### Deliverable

`ng build ui-lib-custom` and `ng build demo` both pass. Three variants are styled. Expand/collapse animates. No new budget warnings. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 6 — Tests, Demo & Documentation

### Context

Implementation and styling are complete. This prompt covers the full test suite, replaces the demo placeholder with a production-quality demo page, and writes the component reference doc.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. `projects/ui-lib-custom/src/lib/organization-chart/` — all source files
4. `projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts` — test pattern reference
5. `projects/demo/src/app/pages/data-view/` — demo page reference
6. `docs/reference/components/DATAVIEW.md` — doc format reference

### Task

**Part A — Unit Tests**

Create `projects/ui-lib-custom/src/lib/organization-chart/organization-chart.spec.ts`:

Test host setup:
```typescript
TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()],
  imports: [OrganizationChart, ...],
})
```

Required test cases:

1. **Rendering:**
   - Renders root nodes from `value` input
   - Renders nested children recursively
   - Renders custom `nodeTemplate` when provided
   - Renders fallback label when no template provided
   - Applies correct variant host class (`uilib-variant-material`, etc.)

2. **Expand/Collapse:**
   - Children are visible when `node.expanded` is `true` or `undefined`
   - Children are hidden when `node.expanded` is `false`
   - Clicking the toggle button calls `handleNodeToggle`
   - `nodeExpand` output emits with the correct node
   - `nodeCollapse` output emits with the correct node

3. **Selection — single mode:**
   - Clicking a node selects it (updates `selection` model)
   - `nodeSelect` output emits
   - Clicking the same node deselects it
   - `nodeUnselect` output emits
   - Clicking a different node replaces the selection

4. **Selection — multiple mode:**
   - Clicking adds to the selection array
   - Clicking a selected node removes it
   - `selection` model updates correctly

5. **Selection — null mode:**
   - Clicking a node does nothing
   - `uilib-org-chart-node--selectable` class is absent

6. **Selectable override:**
   - Nodes with `selectable: false` cannot be selected

7. **ARIA:**
   - Root has `role="tree"`
   - Nodes have `role="treeitem"`
   - `aria-expanded` is correct for expanded/collapsed nodes
   - `aria-selected` reflects selection state

8. **Keyboard navigation:**
   - `ArrowDown` moves focus to the next visible node
   - `ArrowUp` moves focus to the previous visible node
   - `Enter` / `Space` selects the focused node

**Part B — Demo Page**

Replace the placeholder in `projects/demo/src/app/pages/organization-chart/`:

The demo must include these scenarios (use realistic fictional org data):

1. **Basic org chart** — 3-level hierarchy, `variant="material"`, no selection
2. **Collapsible** — deep hierarchy, nodes start expanded, show toggle buttons
3. **Single selection** — `selectionMode="single"`, bound `[(selection)]`
4. **Multiple selection** — `selectionMode="multiple"`, bound `[(selection)]`, show selected node list
5. **Custom node template** — use `ng-template #node let-node` to render avatar + name + title
6. **Bootstrap variant** — same data, `variant="bootstrap"`
7. **Minimal variant** — same data, `variant="minimal"`
8. **Large tree** — 4-level, 20+ nodes total, tests scroll/overflow

Remove the `badge: 'TODO'` from the sidebar entry for `organization-chart` in `projects/demo/src/app/layout/sidebar/sidebar.component.ts`.

**Part C — Documentation**

Create `docs/reference/components/ORGANIZATION_CHART.md` following the exact structure of `DATAVIEW.md`:

Sections required:
- Overview (what it is, when to use it)
- Features list
- Basic usage example
- API tables (Inputs, Outputs, `OrganizationChartNode` interface)
- Custom node templates
- Selection usage examples (single + multiple)
- Theming tokens table (`--uilib-organization-chart-*`)
- Accessibility notes (ARIA roles, keyboard spec)
- Known limitations

Update `docs/reference/components/README.md` to add OrganizationChart to the component index and quick-reference table.

**Part D — Final verification sweep**

Run all verification commands in sequence:

```bash
npx.cmd ng build ui-lib-custom
npx.cmd jest organization-chart --coverage --runInBand --no-cache
npx.cmd eslint projects/ui-lib-custom/src/lib/organization-chart/
npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache
npx.cmd ng build demo
```

After all pass, start the demo server and probe the route:
```bash
npx.cmd ng serve demo --no-open &
# wait for ready
curl -I http://localhost:4200/organization-chart
```

Confirm the following manually (or via DOM assertions in tests):
- [ ] `ViewEncapsulation.None` + `OnPush` + standalone on both components
- [ ] Signal inputs/outputs only — no `@Input()` / `@Output()` decorators
- [ ] `as const` objects used; no TypeScript enums
- [ ] All methods have explicit return types
- [ ] Angular block syntax throughout (`@if` / `@for`)
- [ ] All CSS variables prefixed `--uilib-organization-chart-*`
- [ ] Three variants styled and functional
- [ ] No cross-entry-point relative imports
- [ ] Secondary entry point building and exporting correctly
- [ ] JSDoc on all exported symbols

### Constraints

- Test host components must use `provideZonelessChangeDetection()` + `ChangeDetectionStrategy.OnPush`.
- The demo must use only `ui-lib-*` components — no PrimeNG or Angular Material.
- Coverage must include happy path + edge cases for all interactions.

### Deliverable

All verification commands pass. Demo page is production-quality. Documentation is complete. `AI_AGENT_CONTEXT.md` updated with OrganizationChart marked ✅ complete and a full handoff block appended to `## Recent Handoffs`.

---

## Notes for the Agent

### On recursive components in Angular

`OrganizationChartNodeComponent` must import itself in its own `imports: []` array to enable recursive rendering. This is a standard Angular pattern for self-referential components. Example:

```typescript
@Component({
  selector: 'ui-lib-organization-chart-node',
  standalone: true,
  imports: [NgTemplateOutlet, OrganizationChartNodeComponent], // ← self-import
  ...
})
export class OrganizationChartNodeComponent { ... }
```

### On `node.expanded` mutation

PrimeNG mutates `node.expanded` directly on the node object. We follow the same pattern intentionally — it keeps the API familiar and avoids needing to maintain a separate expansion-state map. When `handleNodeToggle` is called, set `node.expanded = !node.expanded` and then trigger change detection (since `OnPush` won't detect mutations on an object reference). Use `ChangeDetectorRef.markForCheck()` or a `WritableSignal<number>` version counter to force re-render.

### On the connector lines

The cleanest CSS approach is:
- Each node wrapper is a flex column
- The horizontal bar connecting siblings is drawn via `::before` on the children row (a `border-top` spanning from first child center to last child center)
- The vertical drops from the horizontal bar to each child are `::before` pseudo-elements on each child wrapper (`border-left`, fixed height)
- The vertical rise from the parent node down to the horizontal bar is a pseudo-element on the children connector div

All these borders use `--uilib-organization-chart-connector-color` and `--uilib-organization-chart-connector-width`.

### On Windows shell commands

Run all terminal commands from `bash.exe` using `npx.cmd` and `npm.cmd` — not bare `npx`/`npm`, which may fail due to PowerShell `.ps1` shim restrictions. Record any failures and workarounds in the session handoff.
