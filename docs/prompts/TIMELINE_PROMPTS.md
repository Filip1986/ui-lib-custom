# Timeline Component — Prompt Sequence

> Generated: 2026-04-24
> Component: `ui-lib-custom/timeline`
> Classification: **Data display** (no CVA, no overlay — read-only event list with content projection)
> Complexity tier: **5–7 prompts** (compound content-projection pattern, 3 variants, a11y)

---

## Execution Order & Rationale

| # | Phase | Depends on | Est. effort |
|---|---|---|---|
| 1 | Research & Gap Analysis | — | Small |
| 2 | API Design & Types | 1 | Small |
| 3 | Scaffold & Entry Point | 2 | Small |
| 4 | Core Implementation | 3 | Medium |
| 5 | Styling (3 variants + CSS vars) | 4 | Medium |
| 6 | Unit Tests | 4 (can run in parallel with 5) | Medium |
| 7 | Demo Page & Documentation | 5, 6 | Small |

Run prompts **strictly in order**. Prompts 5 and 6 may be sent to separate agent instances simultaneously once Prompt 4 is complete, then merge before Prompt 7.

---

## Prompt 1 — Research & Gap Analysis

### Context

You are working in the `ui-lib-custom` Angular component library (PrimeNG-inspired, tree-shakable, signal-based). You are about to implement a `Timeline` component. Before writing any code, you must research the PrimeNG reference implementation to understand the API surface and identify where our conventions diverge.

### References — read these first, in order

1. `AI_AGENT_CONTEXT.md` — component inventory and active state
2. `LIBRARY_CONVENTIONS.md` — all architectural rules (source of truth)
3. `COMPONENT_CREATION_GUIDE.md` — step-by-step implementation workflow

### Task

**1. Inspect PrimeNG source via `npm pack` (never scrape the website):**

```bash
workdir="$(mktemp -d)"
cd "$workdir"
npm pack primeng@19 --pack-destination .
tar xzf primeng-19.*.tgz

# API surface
cat ./package/timeline/timeline.d.ts

# Implementation details
cat ./package/fesm2022/primeng-timeline.mjs

# Interface types if present
cat ./package/timeline/timeline.interface.d.ts 2>/dev/null || echo "No interface file"
```

**2. Document the following from the source:**

- All `@Input()` properties: name, type, default value, and purpose
- All `@Output()` events: name, payload type, when fired
- Named template slots (`pTemplate` values) and what context object each receives
- The HTML structure PrimeNG renders (host element, wrapper divs, marker element, connector element)
- ARIA roles and attributes used (if any)
- How `layout` (vertical/horizontal) affects the DOM structure
- How `align` (left/right/alternate for vertical; top/bottom/alternate for horizontal) affects CSS classes

**3. For each PrimeNG input/output, document the mapping to our conventions:**

Use this table:

| PrimeNG | Type | Default | ui-lib-custom equivalent | Reason for change |
|---|---|---|---|---|
| `value` | `any[]` | `[]` | `value` — typed `input<TimelineItem[]>()` | Add `TimelineItem` interface |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | keep name, signal input | Signal only |
| `align` | `'left' \| 'right' \| 'alternate'` | `'left'` | keep name, signal input | Signal only |
| `styleClass` | `string` | `''` | `styleClass` | Escape-hatch, keep |
| `pTemplate="content"` | TemplateRef | — | `TimelineContentDirective` | Typed directive, no `pTemplate` |
| `pTemplate="opposite"` | TemplateRef | — | `TimelineOppositeDirective` | Typed directive |
| `pTemplate="marker"` | TemplateRef | — | `TimelineMarkerDirective` | Typed directive |
| `pTemplate="connector"` | TemplateRef | — | `TimelineConnectorDirective` | Typed directive |

Also add `variant: input<'material' \| 'bootstrap' \| 'minimal'>()` and `size: input<'sm' \| 'md' \| 'lg'>()` — these are our library-wide standard inputs not present in PrimeNG.

**4. Document the DOM structure you will build** (not PrimeNG's — ours):

```
<ui-lib-timeline>                          ← host, uilib-timeline-vertical/horizontal class
  <div class="uilib-timeline-event">       ← one per item
    <div class="uilib-timeline-event-opposite">   ← opposite-side content
    <div class="uilib-timeline-event-separator">  ← marker + connector
      <div class="uilib-timeline-event-marker">   ← circle dot or custom template
      <div class="uilib-timeline-event-connector">← line between events
    <div class="uilib-timeline-event-content">    ← main content
```

**5. ARIA research:**

Look up the WAI-ARIA patterns for a timeline/feed widget. Identify:
- Which ARIA role applies to the list (`role="list"`, `role="feed"`, or none?)
- Which ARIA role applies to each event item
- What `aria-label` or `aria-labelledby` approach to use when no visible heading exists

### Deliverable

A written research summary (in the chat or as a comment in a temporary notes file) covering:
- PrimeNG API surface mapped to our conventions
- DOM structure plan
- ARIA strategy
- Any surprises or edge cases worth noting

**Do not create any source files yet.** Update `AI_AGENT_CONTEXT.md` with a note that Timeline research is in progress.

---

## Prompt 2 — API Design & Types

### Context

You are implementing a `Timeline` component for `ui-lib-custom`. Research (Prompt 1) is complete. Now define all TypeScript types, interfaces, constants, and template directive signatures before touching the component class.

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md`
3. `COMPONENT_CREATION_GUIDE.md` — especially Step 2 (API Design Decisions) and Step 3 (File Structure)
4. `projects/ui-lib-custom/src/lib/tabs/` — reference for the template directive pattern (ContentChild queries)

### Task

Create exactly **two files** under `projects/ui-lib-custom/src/lib/timeline/`:

#### File 1: `timeline.types.ts`

Define and export the following — use `as const` objects + string union types, no TypeScript enums:

```typescript
// Public string union types (these are the public API — keep as union literals)
export type TimelineLayout = 'vertical' | 'horizontal';
export type TimelineAlign = 'left' | 'right' | 'alternate' | 'top' | 'bottom';
export type TimelineVariant = 'material' | 'bootstrap' | 'minimal';
export type TimelineSize = 'sm' | 'md' | 'lg';

// Internal constants (for class names, ARIA strings repeated >1 time)
export const TIMELINE_LAYOUTS = { Vertical: 'vertical', Horizontal: 'horizontal' } as const;
export const TIMELINE_ALIGNS = {
  Left: 'left', Right: 'right', Alternate: 'alternate',
  Top: 'top', Bottom: 'bottom'
} as const;

// Data interface — consumers pass an array of these
export interface TimelineItem {
  /** Unique identifier for the event. Used as the @for track key. */
  id?: string | number;
  // NOTE: The component is intentionally data-agnostic.
  // Consumers use template directives to render whatever they need.
  // This interface is intentionally minimal — it is an escape hatch for typed arrays.
  // Consumers who want typed data should extend this interface or use a generic approach.
  [key: string]: unknown;
}
```

**Important notes on `TimelineItem`:**
- The Timeline component is data-agnostic — it renders what the consumer's content templates produce.
- `TimelineItem` provides a typed placeholder. Consumers will typically use `interface MyEvent extends TimelineItem { title: string; date: string; }`.
- The `id` field is used only as the `@for` track key. If absent, `@for` can track by `$index`.

#### File 2: `timeline-template-directives.ts`

Define four `ContentChild`-compatible template directives. Follow the exact pattern used in the `tabs` or `organization-chart` entry points (read those files first to match the exact style):

```typescript
// Each directive wraps a TemplateRef so the parent can query it via ContentChild.
// Use inject(TemplateRef) — do not use constructor injection.
// Selector must be an attribute selector on ng-template: [uiLibTimelineContent]

@Directive({ selector: '[uiLibTimelineContent]', standalone: true })
export class TimelineContentDirective { ... }

@Directive({ selector: '[uiLibTimelineOpposite]', standalone: true })
export class TimelineOppositeDirective { ... }

@Directive({ selector: '[uiLibTimelineMarker]', standalone: true })
export class TimelineMarkerDirective { ... }

@Directive({ selector: '[uiLibTimelineConnector]', standalone: true })
export class TimelineConnectorDirective { ... }
```

Each directive exposes a `template` getter returning the injected `TemplateRef<TimelineTemplateContext>`.

Also define the template context type:

```typescript
export interface TimelineTemplateContext<T = TimelineItem> {
  $implicit: T;
  index: number;
}
```

### Constraints

- No `@Input()` / `@Output()` decorators — directives do not need inputs here (they are purely wrappers for TemplateRef)
- All exported symbols must have JSDoc descriptions
- Directives are standalone: `standalone: true`
- Use `inject(TemplateRef<TimelineTemplateContext>)` — do not use constructor parameter injection
- No `ViewEncapsulation` needed on directives (only on components)

### Deliverable

Two new files:
- `projects/ui-lib-custom/src/lib/timeline/timeline.types.ts`
- `projects/ui-lib-custom/src/lib/timeline/timeline-template-directives.ts`

**Do not create** the component, barrel, or entry point yet — that is Prompt 3.

Run lint on the two new files and fix all errors before finishing:
```bash
npx eslint projects/ui-lib-custom/src/lib/timeline/timeline.types.ts \
           projects/ui-lib-custom/src/lib/timeline/timeline-template-directives.ts \
           --max-warnings 0
```

Update `AI_AGENT_CONTEXT.md`: note that Timeline types and template directives are defined.

---

## Prompt 3 — Scaffold & Entry Point

### Context

You are implementing the `Timeline` component for `ui-lib-custom`. Types and template directives (Prompt 2) are complete. Now scaffold all remaining files, wire up the secondary entry point, and update the package exports. **No real implementation logic yet — just correct structure and empty/stub shells.**

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` — Entry Points & Tree-Shaking section
3. `COMPONENT_CREATION_GUIDE.md` — Step 3 (File & Entry Point Structure)
4. `projects/ui-lib-custom/paginator/` — reference for secondary entry point folder layout
5. `projects/ui-lib-custom/package.json` — to see the exports/typesVersions pattern to replicate

### Task

**1. Create the remaining source files** under `projects/ui-lib-custom/src/lib/timeline/`:

- `timeline.component.ts` — stub Angular component (selector `ui-lib-timeline`, `ViewEncapsulation.None`, `OnPush`, standalone, `templateUrl`/`styleUrl` pointing to siblings)
- `timeline.component.html` — minimal placeholder template: `<ng-container />` or a comment
- `timeline.component.scss` — empty file with a top comment: `// Timeline component styles`
- `timeline.component.spec.ts` — minimal stub with one smoke test: `it('creates the component', () => { expect(fixture.componentInstance).toBeTruthy(); })`
- `index.ts` — barrel that re-exports everything public from `timeline.types.ts`, `timeline-template-directives.ts`, and `timeline.component.ts`

**2. Create the secondary entry point folder** at `projects/ui-lib-custom/timeline/`:

- `ng-package.json`:
  ```json
  {
    "$schema": "../../../node_modules/ng-packagr/ng-package.schema.json",
    "lib": {
      "entryFile": "../src/lib/timeline/index.ts"
    }
  }
  ```
- `package.json`:
  ```json
  { "name": "ui-lib-custom/timeline" }
  ```
- `public-api.ts`:
  ```typescript
  export * from '../src/lib/timeline/index';
  ```

**3. Update `projects/ui-lib-custom/package.json`:**

Add to both `exports` and `typesVersions` following the exact same pattern as existing entries (e.g., `paginator`, `order-list`). The key must be `"./timeline"`.

**4. Add an import regression test** to `projects/ui-lib-custom/test/entry-points.spec.ts`:

```typescript
import type * as UiLibTimeline from 'ui-lib-custom/timeline';
```

And a corresponding test case in the describe block that verifies the import is defined.

### Constraints

- The stub component must already have `ViewEncapsulation.None` and `ChangeDetectionStrategy.OnPush` — do not leave these for a later prompt
- `public-api.ts` inside the secondary entry folder is a **thin re-export** only — no logic
- Do NOT add anything to the primary `src/public-api.ts` (secondary entry points stay separate)
- All new files written via Python byte writes to avoid CRLF corruption (see Terminal notes in `AI_AGENT_CONTEXT.md`)

### Verification

```bash
# 1. Build — must succeed with the stub component
ng build ui-lib-custom

# 2. Entry-point regression test
npx jest --testPathPatterns="entry-points" --no-cache

# 3. Lint the new files
npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0
```

### Deliverable

All files created, entry point wired, exports updated, entry-point spec passing. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 4 — Core Implementation

### Context

You are implementing the `Timeline` component for `ui-lib-custom`. The scaffold (Prompt 3) is complete — all files exist, the entry point builds, and the stub spec passes. Now implement the full component logic and template.

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` — Framework & Architecture, API Surface sections
3. `COMPONENT_CREATION_GUIDE.md` — Step 4 (Styling Architecture), Step 5 (Accessibility)
4. `projects/ui-lib-custom/src/lib/timeline/timeline.types.ts` — already written in Prompt 2
5. `projects/ui-lib-custom/src/lib/timeline/timeline-template-directives.ts` — already written in Prompt 2
6. `projects/ui-lib-custom/src/lib/tabs/tabs.component.ts` or `accordion/accordion.component.ts` — for ContentChild template query pattern reference

### Task

#### `timeline.component.ts` — Full implementation

**Decorator:**
```typescript
@Component({
  selector: 'ui-lib-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule], // add NgTemplateOutlet
  host: {
    'class': 'uilib-timeline',
    '[class.uilib-timeline-vertical]': 'isVertical()',
    '[class.uilib-timeline-horizontal]': '!isVertical()',
    '[class.uilib-timeline-align-left]': 'layout() === "vertical" && align() === "left"',
    '[class.uilib-timeline-align-right]': 'layout() === "vertical" && align() === "right"',
    '[class.uilib-timeline-align-alternate]': 'align() === "alternate"',
    '[class.uilib-timeline-align-top]': 'layout() === "horizontal" && align() === "top"',
    '[class.uilib-timeline-align-bottom]': 'layout() === "horizontal" && align() === "bottom"',
    '[class.uilib-timeline-sm]': 'size() === "sm"',
    '[class.uilib-timeline-md]': 'size() === "md"',
    '[class.uilib-timeline-lg]': 'size() === "lg"',
    '[class.uilib-variant-material]': 'variant() === "material"',
    '[class.uilib-variant-bootstrap]': 'variant() === "bootstrap"',
    '[class.uilib-variant-minimal]': 'variant() === "minimal"',
    '[attr.role]': '"list"',
  }
})
```

**Inputs (signal-based, all with explicit types and defaults):**

```typescript
/** The array of event objects to render. */
readonly value = input<TimelineItem[]>([]);

/** Orientation of the timeline. */
readonly layout = input<TimelineLayout>('vertical');

/**
 * Alignment of event content relative to the axis.
 * Vertical layout: 'left' | 'right' | 'alternate'
 * Horizontal layout: 'top' | 'bottom' | 'alternate'
 */
readonly align = input<TimelineAlign>('left');

/** Visual variant matching the host project's design system. */
readonly variant = input<TimelineVariant>('material');

/** Size token controlling spacing and marker size. */
readonly size = input<TimelineSize>('md');

/** Additional CSS class(es) applied to the host element. */
readonly styleClass = input<string>('');
```

**ContentChild queries** (for optional template override):

```typescript
@ContentChild(TimelineContentDirective)
protected readonly contentDirective: TimelineContentDirective | undefined;

@ContentChild(TimelineOppositeDirective)
protected readonly oppositeDirective: TimelineOppositeDirective | undefined;

@ContentChild(TimelineMarkerDirective)
protected readonly markerDirective: TimelineMarkerDirective | undefined;

@ContentChild(TimelineConnectorDirective)
protected readonly connectorDirective: TimelineConnectorDirective | undefined;
```

**Computed helpers:**

```typescript
protected readonly isVertical = computed<boolean>((): boolean =>
  this.layout() === 'vertical'
);
```

**No methods needed** beyond the computed. The template handles all rendering.

#### `timeline.component.html` — Template

The template must:
- Use `@for (item of value(); track item['id'] ?? $index)` to iterate events — use `$index` as the fallback track value
- Each event is a `<li role="listitem" class="uilib-timeline-event">` (list semantics)
- Each event renders four sub-elements: `opposite`, `separator` (contains `marker` + `connector`), `content`
- Use `<ng-container *ngTemplateOutlet="...">` for all four optional template slots
- Provide fallback content for all four slots when no directive is supplied:
  - Default `marker`: a `<span class="uilib-timeline-event-marker-dot"></span>`
  - Default `connector`: a `<span class="uilib-timeline-event-connector-line"></span>` (omit on the last item)
  - Default `content` and `opposite`: empty `<div>` (consumer fills these)
- The last item must have `[class.uilib-timeline-event-last]="$last"` so the connector line can be hidden via CSS

**Template context object** passed to all `ngTemplateOutlet` calls:
```typescript
{ $implicit: item, index: $index }
```

**Structural example** (exact class names matter for Prompt 5):
```html
<li role="listitem" class="uilib-timeline-event" [class.uilib-timeline-event-last]="$last">
  <!-- Opposite side (left in left-align layout) -->
  <div class="uilib-timeline-event-opposite">
    <ng-container *ngTemplateOutlet="oppositeTemplate; context: { $implicit: item, index: $index }" />
  </div>

  <!-- Separator: marker dot + connector line -->
  <div class="uilib-timeline-event-separator">
    <div class="uilib-timeline-event-marker">
      <ng-container *ngTemplateOutlet="markerTemplate; context: { $implicit: item, index: $index }" />
    </div>
    @if (!$last) {
      <div class="uilib-timeline-event-connector">
        <ng-container *ngTemplateOutlet="connectorTemplate; context: { $implicit: item, index: $index }" />
      </div>
    }
  </div>

  <!-- Main content (right in left-align layout) -->
  <div class="uilib-timeline-event-content">
    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: item, index: $index }" />
  </div>
</li>
```

Wire `oppositeTemplate`, `markerTemplate`, `connectorTemplate`, and `contentTemplate` as `@let` template variables (Angular 21 `@let`) that resolve to either the directive's template or a `#defaultX` reference template.

The host element (`<ui-lib-timeline>`) renders as an `<ol>` or `<ul>` with `role="list"` by setting `host: { '[attr.role]': '"list"' }`. Actually, to make it semantic, change the host element to emit as a `<ol>` list — but since Angular does not support changing the host tag, instead wrap the entire list inside a `<ol>` or `<ul>` inside the template and remove `role="list"` from host. Use:

```html
<!-- timeline.component.html — outermost element -->
<ol class="uilib-timeline-list" [class]="styleClass()">
  @for (item of value(); track trackItem(item, $index)) {
    <li ...> ... </li>
  }
</ol>
```

And keep the host binding classes on the `ui-lib-timeline` host element itself.

Add a `trackItem` method:
```typescript
protected trackItem(item: TimelineItem, index: number): string | number {
  return (item['id'] as string | number | undefined) ?? index;
}
```

### Constraints

- `ViewEncapsulation.None` — already in stub, verify it stays
- All `computed()` calls must have explicit type annotations: `computed<boolean>((): boolean => ...)`
- All class methods must have explicit return types
- Angular block syntax only (`@for`, `@if`, `@let`) — no `*ngIf` / `*ngFor`
- `NgTemplateOutlet` must be imported and listed in `imports`
- No raw DOM manipulation

### Verification

```bash
# Lint first
npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0

# Then build
ng build ui-lib-custom
```

Fix all lint errors before running the build.

### Deliverable

`timeline.component.ts` and `timeline.component.html` fully implemented. Lint clean. Build passing. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 5 — Styling (3 Variants + CSS Variables)

### Context

You are implementing the `Timeline` component for `ui-lib-custom`. Core implementation (Prompt 4) is complete. Now write all SCSS: CSS variable declarations, the base structural layout for both orientations/alignments, and the three design variants (material, bootstrap, minimal).

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` — Styling & Theming section, CSS Custom Properties Naming Convention
3. `projects/ui-lib-custom/src/lib/design-tokens.ts` — check what spacing/radius/shadow/color tokens exist before inventing new values
4. `projects/ui-lib-custom/src/lib/accordion/accordion.component.scss` — reference for SCSS structure with CSS variables + 3 variants
5. `projects/ui-lib-custom/src/lib/timeline/timeline.component.html` — review the class names you need to style

### Task

#### CSS variable declarations (on the `:host` or `.uilib-timeline` scope)

Define these variables (with fallback to design token vars wherever a token exists):

```scss
// Marker
--uilib-timeline-marker-size
--uilib-timeline-marker-border-width
--uilib-timeline-marker-border-color
--uilib-timeline-marker-bg
--uilib-timeline-marker-shadow

// Connector
--uilib-timeline-connector-size        // line thickness
--uilib-timeline-connector-color
--uilib-timeline-connector-length      // min-height (vertical) or min-width (horizontal)

// Event spacing
--uilib-timeline-event-spacing         // gap between events
--uilib-timeline-event-content-padding

// Size multipliers (applied per .uilib-timeline-sm/md/lg)
--uilib-timeline-marker-size-sm
--uilib-timeline-marker-size-md
--uilib-timeline-marker-size-lg
```

#### Base structural styles (variant-independent)

**Vertical layout** (`.uilib-timeline.uilib-timeline-vertical`):
- The `<ol>` inside is `display: flex; flex-direction: column`
- Each `.uilib-timeline-event` is `display: grid; grid-template-columns: 1fr auto 1fr` (opposite | separator | content)
- For `.uilib-timeline-align-left`: opposite column collapses (`grid-template-columns: 0 auto 1fr`)
- For `.uilib-timeline-align-right`: content column collapses
- For `.uilib-timeline-align-alternate`: events alternate which side has content using `:nth-child(even)` selector
- `.uilib-timeline-event-separator` is `display: flex; flex-direction: column; align-items: center`
- `.uilib-timeline-event-connector` grows to fill remaining separator space (use `flex: 1`)

**Horizontal layout** (`.uilib-timeline.uilib-timeline-horizontal`):
- The `<ol>` is `display: flex; flex-direction: row`
- Each `.uilib-timeline-event` is `display: flex; flex-direction: column`
- Separator is `display: flex; flex-direction: row; align-items: center`
- Alignment (`top`/`bottom`/`alternate`) controls whether content/opposite appear above or below

#### Marker & connector defaults

```scss
.uilib-timeline-event-marker-dot {
  width: var(--uilib-timeline-marker-size);
  height: var(--uilib-timeline-marker-size);
  border-radius: 50%;
  background: var(--uilib-timeline-marker-bg);
  border: var(--uilib-timeline-marker-border-width) solid var(--uilib-timeline-marker-border-color);
  box-shadow: var(--uilib-timeline-marker-shadow);
}

.uilib-timeline-event-connector-line {
  flex: 1;
  // vertical: width = connector-size, height auto
  // horizontal: height = connector-size, width auto
  background: var(--uilib-timeline-connector-color);
}
```

#### Size tokens

```scss
.uilib-timeline-sm {
  --uilib-timeline-marker-size: var(--uilib-timeline-marker-size-sm, 0.75rem);
  --uilib-timeline-event-spacing: calc(var(--uilib-spacing-3, 0.75rem));
}
.uilib-timeline-md { /* default */ }
.uilib-timeline-lg {
  --uilib-timeline-marker-size: var(--uilib-timeline-marker-size-lg, 1.25rem);
  --uilib-timeline-event-spacing: calc(var(--uilib-spacing-6, 1.5rem));
}
```

#### Three variant blocks

**Material variant** (`.uilib-variant-material`):
- Marker: filled circle with primary color background, no border, subtle shadow
- Connector: thin solid line using surface/border color
- Content area: no border, subtle spacing

**Bootstrap variant** (`.uilib-variant-bootstrap`):
- Marker: hollow circle with border (`--uilib-color-primary` or `#0d6efd`-family token), white background
- Connector: thin dashed or dotted line
- Content area: matches Bootstrap's muted secondary styling

**Minimal variant** (`.uilib-variant-minimal`):
- Marker: very small filled dot, neutral gray
- Connector: thin solid line, lighter gray
- No shadows, no backgrounds — pure flat structure

#### Dark mode

All color variables must degrade gracefully when `[data-theme="dark"]` is applied on an ancestor. Use `var(--uilib-color-*)` tokens exclusively — do not hardcode hex. If the design token already has a dark-mode counterpart, use it via CSS variable inheritance.

### Constraints

- **Zero raw hex or px values** — every value must reference a `--uilib-*` CSS variable or a `design-tokens.ts` token
- If a token is missing from `design-tokens.ts`, add it there first, then use it
- Do not use `::ng-deep` — `ViewEncapsulation.None` is already set; all selectors work without it
- CSS budgets: keep total compiled SCSS size reasonable (PrimeNG reference for scope)

### Verification

```bash
npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0
ng build ui-lib-custom
```

### Deliverable

`timeline.component.scss` complete with all variant styles and CSS variables. Build passing. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 6 — Unit Tests

### Context

You are implementing the `Timeline` component for `ui-lib-custom`. Core implementation (Prompt 4) is complete (and ideally Prompt 5 too, but tests do not depend on final styling). Write the full unit test suite.

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` — Testing & Quality section
3. `COMPONENT_CREATION_GUIDE.md` — Step 6 (Testing Strategy) and Step 8 (Common lint failures)
4. `projects/ui-lib-custom/src/lib/timeline/timeline.component.ts` — the implementation under test
5. `projects/ui-lib-custom/src/lib/paginator/paginator.component.spec.ts` or `projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts` — reference for data-display component test patterns
6. `jest.config.ts` — runner configuration

### Task

Write `projects/ui-lib-custom/src/lib/timeline/timeline.component.spec.ts`. It must cover:

**Setup:**
- One `TestBed` configuration with `provideZonelessChangeDetection()` and `ChangeDetectionStrategy.OnPush`
- A typed helper: `function queryElement<T extends HTMLElement>(selector: string): T { ... }` to avoid `nativeElement as any` lint errors

**Test groups:**

1. **Creation** — `it('creates the component')` smoke test

2. **Default state** — verifies without configuration:
   - Host element has class `uilib-timeline`, `uilib-timeline-vertical`, `uilib-variant-material`, `uilib-timeline-md`
   - No event items rendered when `value` is empty

3. **`value` input** — renders correct number of `<li>` elements, tracks correctly

4. **`layout` input:**
   - `'vertical'` → host has `uilib-timeline-vertical`, not `uilib-timeline-horizontal`
   - `'horizontal'` → host has `uilib-timeline-horizontal`, not `uilib-timeline-vertical`

5. **`align` input:**
   - Each valid align value adds the correct host class
   - Verify at least `left`, `right`, `alternate`, `top`, `bottom`

6. **`variant` input:**
   - Each of `material`, `bootstrap`, `minimal` adds the correct `uilib-variant-*` class

7. **`size` input:**
   - `sm`, `md`, `lg` add `uilib-timeline-sm`, `uilib-timeline-md`, `uilib-timeline-lg` respectively

8. **`styleClass` input:**
   - Custom class string is added to the inner `<ol>` or wherever `styleClass()` is applied in the template

9. **Content template directives:**
   - Create a `TestHostComponent` that uses `<ng-template uiLibTimelineContent let-item>` and verify the template is rendered for each event
   - Repeat for `uiLibTimelineOpposite`
   - Repeat for `uiLibTimelineMarker`

10. **Default marker fallback:**
    - When no `uiLibTimelineMarker` directive is provided, the default `.uilib-timeline-event-marker-dot` element renders

11. **Connector last-item handling:**
    - The connector element is NOT rendered for the last item in the list

12. **Track function:**
    - When items have an `id` field, the track function returns it
    - When items have no `id`, the track function returns the index

13. **Accessibility:**
    - Host or inner list has `role="list"`
    - Each event item has `role="listitem"`

### Lint constraints (prevent common failures)

- Every `const` in test files must have an explicit type: `const element: HTMLElement = ...`
- Cast `nativeElement`: `(fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(...)`
- Every arrow function in `.map()` / `.filter()` must have explicit return type
- Every `@ContentChild` host component's methods must have explicit return type
- Use `import type` for any import used only as a type

### Verification

```bash
# Lint first
npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0

# Run tests
npx jest --testPathPatterns="timeline" --no-cache
```

All tests must pass. Lint must be clean. No skipped tests.

### Deliverable

`timeline.component.spec.ts` complete with all groups passing. Update `AI_AGENT_CONTEXT.md`.

---

## Prompt 7 — Demo Page & Documentation

### Context

You are implementing the `Timeline` component for `ui-lib-custom`. Implementation (Prompt 4), styling (Prompt 5), and tests (Prompt 6) are complete. Create the demo page in the demo app and write the reference documentation.

### References — read these first

1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` — Documentation & Demos section
3. `COMPONENT_CREATION_GUIDE.md` — Step 7 (Prompt Sequence) for deliverable structure
4. `projects/demo/src/app/pages/data-view/` — reference for a comparable data-display demo page
5. `projects/demo/src/app/layout/sidebar/sidebar.component.ts` — to add the Timeline route entry
6. `docs/reference/components/DATAVIEW.md` — reference for documentation structure

### Task

#### 1. Demo page — `projects/demo/src/app/pages/timeline/`

Create three files: `timeline-demo.component.ts`, `timeline-demo.component.html`, `timeline-demo.component.scss`.

The demo page must showcase **at least 7 distinct scenarios**, each in its own `<section>`:

| Section | What it demonstrates |
|---|---|
| Basic vertical | Default `layout="vertical"` with `align="left"`, 4–5 events, text-only content |
| Alignment variants | Side-by-side: `align="left"`, `align="right"`, `align="alternate"` (use tabs or flex columns) |
| Horizontal layout | `layout="horizontal"` with `align="top"` and `align="bottom"` examples |
| Custom marker | `uiLibTimelineMarker` directive rendering an icon or colored badge instead of default dot |
| Opposite content | `uiLibTimelineOpposite` showing a date/label on the opposite side |
| Three variants | `material`, `bootstrap`, `minimal` side-by-side |
| Size tokens | `sm`, `md`, `lg` rendered together |

All demo data must be typed interfaces defined in the component TypeScript file (no `any`).

**Dogfood rule:** Use `ui-lib-*` components wherever possible for labels, badges, cards wrapping events — never reach for PrimeNG or Angular Material.

#### 2. Register the route

Add `Timeline` to the demo sidebar/router. Look at `sidebar.component.ts` and the app routes to find the correct place. Follow the existing pattern exactly.

#### 3. Reference documentation — `docs/reference/components/TIMELINE.md`

Write a complete reference doc following the structure of `docs/reference/components/DATAVIEW.md`. Include:

- **Overview** paragraph (what the component is, when to use it)
- **API** table: all inputs with type, default, description
- **Template Directives** table: each directive, its selector, context type
- **Usage examples**: at least 3 code snippets (basic, with custom templates, horizontal)
- **Theming** section: all `--uilib-timeline-*` CSS variables with descriptions
- **Accessibility** section: ARIA roles, keyboard behavior (if any), screen reader notes
- **Variants & Sizes** section: brief description of material/bootstrap/minimal behavior

#### 4. Update `docs/reference/components/README.md`

Add a row for Timeline to the component index table.

### Verification

```bash
# Lint demo page
npx eslint projects/demo/src/app/pages/timeline/ --max-warnings 0

# Build demo app
ng build demo --configuration=development

# Optionally serve and visually verify
ng serve demo
```

### Final checklist before marking complete

- [ ] `ViewEncapsulation.None` + `OnPush` on the library component
- [ ] Signal inputs/outputs only
- [ ] `as const` objects, no enums; string union public types
- [ ] All methods have explicit return types
- [ ] Angular block syntax throughout
- [ ] CSS variables prefixed `--uilib-timeline-*`
- [ ] Three variants: `material`, `bootstrap`, `minimal`
- [ ] Size tokens: `sm` / `md` / `lg`
- [ ] Secondary entry point wired and build passing
- [ ] `npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0` passes
- [ ] Unit tests pass with zoneless change detection
- [ ] Accessibility: ARIA roles verified in tests
- [ ] Demo page created with 7 sections, route verified
- [ ] `AI_AGENT_CONTEXT.md` updated with Timeline → ✅ complete

### Deliverable

- `projects/demo/src/app/pages/timeline/` (3 files)
- `docs/reference/components/TIMELINE.md`
- `docs/reference/components/README.md` updated
- `AI_AGENT_CONTEXT.md` updated: Timeline marked ✅ complete, handoff block appended

---

## Quick Reference — Files Created by End of All Prompts

```
projects/ui-lib-custom/src/lib/timeline/
├── index.ts
├── timeline.component.ts
├── timeline.component.html
├── timeline.component.scss
├── timeline.component.spec.ts
├── timeline.types.ts
└── timeline-template-directives.ts

projects/ui-lib-custom/timeline/
├── ng-package.json
├── package.json
└── public-api.ts

projects/demo/src/app/pages/timeline/
├── timeline-demo.component.ts
├── timeline-demo.component.html
└── timeline-demo.component.scss

docs/reference/components/TIMELINE.md      ← new
docs/reference/components/README.md        ← updated
projects/ui-lib-custom/package.json        ← updated (exports + typesVersions)
projects/ui-lib-custom/test/entry-points.spec.ts  ← updated
AI_AGENT_CONTEXT.md                        ← updated after every prompt
```
