# Tree

A hierarchical data display component with expand/collapse, three selection modes, built-in filtering, custom node templates, and full three-variant theming.

---

## Overview

`Tree` renders a nested list of `TreeNode` items. Each node can be expanded or collapsed independently, selected via click or checkbox, and filtered with a built-in search input. Custom templates let you swap the default label rendering for any markup on a per-type basis.

**Entry point:** `ui-lib-custom/tree`

**Selector:** `ui-lib-tree`

---

## Import

```typescript
import { Tree, TreeNodeTemplateDirective } from 'ui-lib-custom/tree';
import type { TreeNode, TreeSelectionMode, TreeVariant, TreeSize, TreeFilterMode } from 'ui-lib-custom/tree';
```

---

## Basic Usage

```html
<ui-lib-tree [value]="nodes" />
```

```typescript
nodes: TreeNode[] = [
  {
    key: 'root',
    label: 'Documents',
    children: [
      { key: 'child-1', label: 'Resume.docx' },
      { key: 'child-2', label: 'Cover Letter.docx' },
    ],
  },
];
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `TreeNode[]` | `[]` | Root-level nodes of the tree |
| `selectionMode` | `TreeSelectionMode \| null` | `null` | How nodes respond to clicks — `null` disables selection |
| `variant` | `TreeVariant \| null` | `null` | Design variant. Falls back to `ThemeConfigService` when `null` |
| `size` | `TreeSize` | `'md'` | Row size — `'sm'`, `'md'`, or `'lg'` |
| `filter` | `boolean` | `false` | When `true`, renders a filter input above the tree |
| `filterBy` | `string` | `'label'` | The `TreeNode` property used when matching filter text |
| `filterMode` | `TreeFilterMode` | `'lenient'` | `'lenient'`: shows a node if it or any descendant matches; `'strict'`: shows only exact-match nodes |
| `filterPlaceholder` | `string` | `'Search...'` | Placeholder text for the filter input |
| `styleClass` | `string` | `''` | Extra CSS class applied to the host element |

### Model (two-way binding)

| Model | Type | Description |
|-------|------|-------------|
| `selection` | `TreeNode \| TreeNode[] \| null` | Currently selected node(s). Use `[(selection)]` for two-way binding. A single `TreeNode` in `single` mode; `TreeNode[]` in `multiple` and `checkbox` modes |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `nodeSelect` | `TreeNodeSelectEvent` | Emitted when a node is selected |
| `nodeUnselect` | `TreeNodeSelectEvent` | Emitted when a node is unselected |
| `nodeExpand` | `TreeNodeExpandEvent` | Emitted when a node's subtree is expanded |
| `nodeCollapse` | `TreeNodeCollapseEvent` | Emitted when a node's subtree is collapsed |

---

## TreeNode Interface

```typescript
interface TreeNode {
  key: string;            // Required. Unique identifier used for selection and tracking
  label?: string;         // Display text rendered in the node row
  data?: unknown;         // Arbitrary consumer data attached to the node
  type?: string;          // Template type — maps to a uiTreeNode directive with matching type
  icon?: string;          // CSS class for the node icon (collapsed state)
  expandedIcon?: string;  // CSS class when the node is expanded (overrides icon)
  collapsedIcon?: string; // CSS class when the node is collapsed (overrides icon)
  expanded?: boolean;     // true = subtree visible, false = collapsed (default: expanded)
  leaf?: boolean;         // When true, no expand/collapse toggle is shown
  selectable?: boolean;   // When false, node cannot be selected (default: true)
  styleClass?: string;    // Extra CSS class applied to the node row element
  children?: TreeNode[];  // Child nodes rendered beneath this node
  partialSelected?: boolean; // Internal: managed by Tree in checkbox mode
}
```

---

## Event Types

```typescript
interface TreeNodeSelectEvent {
  originalEvent: Event;
  node: TreeNode;
}

interface TreeNodeExpandEvent {
  originalEvent: MouseEvent;
  node: TreeNode;
}

interface TreeNodeCollapseEvent {
  originalEvent: MouseEvent;
  node: TreeNode;
}
```

---

## Selection Modes

### No Selection (default)

```html
<ui-lib-tree [value]="nodes" />
```

Nodes are not interactive beyond expand/collapse.

### Single Selection

```html
<ui-lib-tree
  [value]="nodes"
  selectionMode="single"
  [(selection)]="selectedNode"
  (nodeSelect)="onSelect($event)"
  (nodeUnselect)="onUnselect($event)"
/>
```

```typescript
selectedNode: TreeNode | null = null;

onSelect(event: TreeNodeSelectEvent): void {
  console.log('Selected:', event.node.label);
}
```

### Multiple Selection

Click to select; Ctrl+Click (or Cmd+Click) to add/remove from selection.

```html
<ui-lib-tree
  [value]="nodes"
  selectionMode="multiple"
  [(selection)]="selectedNodes"
/>
```

```typescript
selectedNodes: TreeNode[] = [];
```

### Checkbox Selection

Each node renders a checkbox. Selecting a node cascades down to all descendants and updates `partialSelected` for ancestor nodes where only some children are selected.

```html
<ui-lib-tree
  [value]="nodes"
  selectionMode="checkbox"
  [(selection)]="checkedNodes"
/>
```

```typescript
checkedNodes: TreeNode[] = [];
```

---

## Filtering

Enable the built-in filter input by setting `filter="true"`. The `filterBy` property names the field to match against (defaults to `'label'`). Use `filterMode` to control whether ancestor nodes are shown for matching descendants.

```html
<ui-lib-tree
  [value]="nodes"
  [filter]="true"
  filterBy="label"
  filterMode="lenient"
  filterPlaceholder="Search..."
/>
```

**`lenient` mode** (default): a node is visible if it or any of its descendants match the filter text. This keeps ancestor context visible.

**`strict` mode**: only nodes whose own label (or `filterBy` field) matches are shown. Ancestors without a direct match are hidden.

---

## Custom Node Templates

Use `ng-template` with the `uiTreeNode` directive to replace the default label rendering. The `uiTreeNodeType` input maps a template to nodes whose `type` property matches. The `'default'` type is used as a fallback for all nodes without an explicit type.

```html
<ui-lib-tree [value]="nodes">
  <!-- Default template applied to all nodes without a type -->
  <ng-template uiTreeNode let-node>
    <span class="custom-label">{{ node.label }}</span>
  </ng-template>

  <!-- Type-specific template -->
  <ng-template uiTreeNode uiTreeNodeType="file" let-node>
    <span class="file-icon">📄</span>
    <span>{{ node.label }}</span>
  </ng-template>

  <ng-template uiTreeNode uiTreeNodeType="folder" let-node>
    <span class="folder-icon">📁</span>
    <strong>{{ node.label }}</strong>
  </ng-template>
</ui-lib-tree>
```

```typescript
nodes: TreeNode[] = [
  {
    key: 'docs',
    label: 'Documents',
    type: 'folder',
    children: [
      { key: 'resume', label: 'Resume.docx', type: 'file' },
    ],
  },
];
```

---

## Variants

```html
<!-- Material (default via ThemeConfigService) -->
<ui-lib-tree [value]="nodes" variant="material" />

<!-- Bootstrap -->
<ui-lib-tree [value]="nodes" variant="bootstrap" />

<!-- Minimal -->
<ui-lib-tree [value]="nodes" variant="minimal" />
```

---

## Sizes

```html
<ui-lib-tree [value]="nodes" size="sm" />
<ui-lib-tree [value]="nodes" size="md" />
<ui-lib-tree [value]="nodes" size="lg" />
```

---

## Keyboard Navigation

When focus is inside the tree, the following keyboard interactions apply:

| Key | Action |
|-----|--------|
| `ArrowDown` | Move focus to the next visible node |
| `ArrowUp` | Move focus to the previous visible node |
| `ArrowRight` | Expand the focused node (if collapsed) |
| `ArrowLeft` | Collapse the focused node (if expanded) |
| `Home` | Move focus to the first node |
| `End` | Move focus to the last visible node |
| `Enter` / `Space` | Select the focused node |

---

## CSS Variables (Theming)

All visual properties are exposed as CSS variables, scoped to the `ui-lib-tree` host element.

```css
/* Typography */
--uilib-tree-font-size: 0.875rem;
--uilib-tree-font-weight: 400;

/* Node row */
--uilib-tree-node-padding: 0.375rem 0.5rem;
--uilib-tree-node-border-radius: 4px;
--uilib-tree-node-gap: 0.375rem;

/* Colors */
--uilib-tree-node-bg: transparent;
--uilib-tree-node-color: inherit;
--uilib-tree-node-bg-hover: rgba(0, 0, 0, 0.04);
--uilib-tree-node-color-hover: inherit;
--uilib-tree-node-bg-selected: var(--uilib-color-primary-light, #e3f2fd);
--uilib-tree-node-color-selected: var(--uilib-color-primary, #1976d2);

/* Toggle button */
--uilib-tree-toggle-size: 1.25rem;
--uilib-tree-toggle-color: var(--uilib-color-secondary, #6c757d);
--uilib-tree-toggle-color-hover: var(--uilib-color-primary, #1976d2);

/* Checkbox */
--uilib-tree-checkbox-size: 1rem;
--uilib-tree-checkbox-border: 2px solid var(--uilib-color-border, #ced4da);
--uilib-tree-checkbox-bg-checked: var(--uilib-color-primary, #1976d2);
--uilib-tree-checkbox-color-checked: #fff;

/* Filter input */
--uilib-tree-filter-padding: 0.375rem 0.75rem;
--uilib-tree-filter-border: 1px solid var(--uilib-color-border, #ced4da);
--uilib-tree-filter-border-radius: 4px;
--uilib-tree-filter-mb: 0.5rem;

/* Indentation */
--uilib-tree-indent: 1.25rem;
```

### Overriding Tokens

```css
/* In your application or component styles */
ui-lib-tree {
  --uilib-tree-node-bg-selected: #e8f5e9;
  --uilib-tree-node-color-selected: #2e7d32;
  --uilib-tree-indent: 1.5rem;
}
```

---

## Accessibility

- The host element carries `role="tree"`.
- Each node list renders as `role="group"` (nested `<ul>`).
- Node rows carry `role="treeitem"` with `aria-expanded` (when applicable), `aria-selected` (single/multiple mode), and `aria-checked` + `aria-selected` (checkbox mode, reflecting partial state via `aria-checked="mixed"`).
- Full keyboard navigation via ArrowUp/Down/Left/Right, Home, and End.
- Filter input includes an `aria-label` ("Filter tree nodes").
- Expand/collapse toggle buttons include `aria-label` ("Collapse"/"Expand").

---

## Architecture Notes

- `Tree` implements the `TreeContext` interface and provides itself via `TREE_CONTEXT` injection token. This avoids prop-drilling through recursive `TreeNodeComponent` trees.
- `TreeNodeComponent` is a recursive standalone component — it imports itself in its own `imports` array, which Angular supports for recursive rendering without `forwardRef`.
- Checkbox cascade: toggling a parent checks/unchecks all descendants and recalculates `partialSelected` on all ancestors via `updatePartialStates`.
- Filter keys are computed as a `Signal<Set<string> | null>` — `null` when no filter text is present (fast-path).

---

## Secondary Entry Point

```
projects/ui-lib-custom/tree/
├── ng-package.json    # entryFile → src/lib/tree/index.ts
├── package.json       # { "name": "ui-lib-custom/tree" }
└── public-api.ts      # re-exports from index
```

---

## Public API (index.ts exports)

| Export | Kind |
|--------|------|
| `Tree` | Component |
| `TreeNodeComponent` | Component (internal recursive node) |
| `TreeNodeTemplateDirective` | Directive |
| `TREE_CONTEXT` | InjectionToken |
| `TreeContext` | Interface |
| `TreeNode` | Interface |
| `TreeSelectionMode` | Type alias |
| `TreeVariant` | Type alias |
| `TreeSize` | Type alias |
| `TreeFilterMode` | Type alias |
| `TreeNodeSelectEvent` | Interface |
| `TreeNodeExpandEvent` | Interface |
| `TreeNodeCollapseEvent` | Interface |

---

## Source

`projects/ui-lib-custom/src/lib/tree/`
