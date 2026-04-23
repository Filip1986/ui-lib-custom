# OrganizationChart

A hierarchical tree chart for visualising organisational structures. Supports collapsible subtrees, single and multiple node selection, typed custom node templates, and three design variants.

---

## Overview

`OrganizationChart` renders a top-down tree from a flat-root `OrganizationChartNode[]`. Key features:

- Arbitrary tree depth via a recursive internal component
- Optional collapsible subtrees with expand/collapse toggle buttons
- Single and multiple node selection with two-way `[(selection)]` binding
- Named `ng-template` slots — route different templates to different node types via `type`
- Three theme variants (`material`, `bootstrap`, `minimal`)
- WAI-ARIA `role="tree"` / `role="treeitem"` structure with keyboard navigation (Arrow keys, Home, End, Enter, Space)
- `prefers-reduced-motion` support

---

## Import

```ts
import {
  OrganizationChart,
  OrgChartNodeTemplateDirective,
} from 'ui-lib-custom/organization-chart';

// Types (import type — not included in runtime bundle)
import type {
  OrganizationChartNode,
  OrganizationChartSelectionMode,
  OrganizationChartVariant,
  OrganizationChartNodeSelectEvent,
  OrganizationChartNodeExpandEvent,
} from 'ui-lib-custom/organization-chart';
```

---

## Basic Usage

```html
<ui-lib-organization-chart [value]="nodes" />
```

```ts
nodes: OrganizationChartNode[] = [
  {
    key: 'ceo',
    label: 'CEO',
    expanded: true,
    children: [
      { key: 'cto', label: 'CTO' },
      { key: 'cfo', label: 'CFO' },
    ],
  },
];
```

---

## Collapsible Subtrees

```html
<ui-lib-organization-chart
  [value]="nodes"
  [collapsible]="true"
  (nodeExpand)="onExpand($event)"
  (nodeCollapse)="onCollapse($event)"
/>
```

Each node with children shows a toggle button. `node.expanded` is mutated directly on click (PrimeNG-compatible API) and a `nodeExpand` or `nodeCollapse` output fires.

---

## Selection

### Single

```html
<ui-lib-organization-chart
  [value]="nodes"
  selectionMode="single"
  [(selection)]="selectedNode"
/>
```

`selection` is `OrganizationChartNode | null`. Clicking a selected node deselects it.

### Multiple

```html
<ui-lib-organization-chart
  [value]="nodes"
  selectionMode="multiple"
  [(selection)]="selectedNodes"
/>
```

`selection` is `OrganizationChartNode[]`. Each click toggles the clicked node in the array.

### Opting out per node

Set `selectable: false` on any node to exclude it from click interactions regardless of `selectionMode`.

---

## Custom Node Templates

### Default template (applies to all nodes)

```html
<ui-lib-organization-chart [value]="nodes">
  <ng-template uiOrgChartNode let-node>
    <strong>{{ node.label }}</strong>
  </ng-template>
</ui-lib-organization-chart>
```

### Typed templates (applies only to nodes where `node.type` matches)

```html
<ui-lib-organization-chart [value]="nodes">
  <!-- Applied when node.type === 'manager' -->
  <ng-template uiOrgChartNode type="manager" let-node>
    <span class="manager-badge">{{ node.label }}</span>
  </ng-template>

  <!-- Fallback for all other nodes -->
  <ng-template uiOrgChartNode let-node>
    <span>{{ node.label }}</span>
  </ng-template>
</ui-lib-organization-chart>
```

The `$implicit` context variable is the full `OrganizationChartNode` object, including the `data` field for any arbitrary payload.

---

## Variants

```html
<!-- Material (default) — elevated card nodes with box-shadow -->
<ui-lib-organization-chart [value]="nodes" variant="material" />

<!-- Bootstrap — flat nodes with border -->
<ui-lib-organization-chart [value]="nodes" variant="bootstrap" />

<!-- Minimal — transparent nodes, dashed connector lines -->
<ui-lib-organization-chart [value]="nodes" variant="minimal" />
```

When `variant` is omitted (or set to `null`), the chart falls back to the global variant set in `ThemeConfigService`.

---

## API Reference

### `OrganizationChart` Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `OrganizationChartNode[]` | `[]` | Root-level nodes of the tree. |
| `selectionMode` | `'single' \| 'multiple' \| null` | `null` | How nodes respond to clicks. `null` disables selection. |
| `collapsible` | `boolean` | `false` | Shows a toggle button on nodes with children. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design variant. Falls back to `ThemeConfigService` when `null`. |
| `styleClass` | `string` | `''` | Extra CSS class applied to the host element. |

### `OrganizationChart` Two-way Binding

| Binding | Type | Description |
|---|---|---|
| `[(selection)]` | `OrganizationChartNode \| OrganizationChartNode[] \| null` | Currently selected node(s). Type depends on `selectionMode`. |

### `OrganizationChart` Outputs

| Output | Payload | Description |
|---|---|---|
| `(nodeSelect)` | `OrganizationChartNodeSelectEvent` | Emitted when a node is selected. |
| `(nodeUnselect)` | `OrganizationChartNodeSelectEvent` | Emitted when a node is unselected. |
| `(nodeExpand)` | `OrganizationChartNodeExpandEvent` | Emitted when a node's subtree is expanded. |
| `(nodeCollapse)` | `OrganizationChartNodeExpandEvent` | Emitted when a node's subtree is collapsed. |

### `OrgChartNodeTemplateDirective` Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'default'` | Matches nodes where `node.type === type`. Omit for the fallback template. |

---

## Data Model

### `OrganizationChartNode`

| Property | Type | Required | Description |
|---|---|---|---|
| `key` | `string` | ✅ | Unique identifier used for tracking and selection. |
| `label` | `string` | — | Display text shown in the default node template. |
| `type` | `string` | — | Routes the node to a matching `uiOrgChartNode` template. |
| `data` | `unknown` | — | Arbitrary payload available in custom templates. |
| `expanded` | `boolean` | — | `true` shows children on initial render. Defaults to `true`. |
| `selectable` | `boolean` | — | `false` prevents the node from being selected. Defaults to `true`. |
| `styleClass` | `string` | — | Extra CSS class applied to the node cell element. |
| `children` | `OrganizationChartNode[]` | — | Child nodes. |

### `OrganizationChartNodeSelectEvent`

| Property | Type | Description |
|---|---|---|
| `originalEvent` | `MouseEvent` | The browser click event. |
| `node` | `OrganizationChartNode` | The node that was selected or unselected. |

### `OrganizationChartNodeExpandEvent`

| Property | Type | Description |
|---|---|---|
| `originalEvent` | `MouseEvent` | The browser click event on the toggle button. |
| `node` | `OrganizationChartNode` | The node whose subtree was toggled. |

---

## CSS Variables

All variables are scoped to `.ui-lib-organization-chart` and can be overridden globally or per-instance.

| Variable | Default (material) | Description |
|---|---|---|
| `--uilib-org-chart-node-bg` | `#ffffff` | Node cell background. |
| `--uilib-org-chart-node-color` | `#212529` | Node cell text colour. |
| `--uilib-org-chart-node-border` | `1px solid #dee2e6` | Node cell border. |
| `--uilib-org-chart-node-radius` | `8px` | Node cell border-radius. |
| `--uilib-org-chart-node-shadow` | `0 2px 8px rgba(0,0,0,.10)` | Node cell box-shadow. |
| `--uilib-org-chart-node-padding` | `0.75rem 1.25rem` | Node cell padding. |
| `--uilib-org-chart-node-bg-hover` | `#f8f9fa` | Node background on hover (selectable nodes). |
| `--uilib-org-chart-node-bg-selected` | `#e8eaff` | Node background when selected. |
| `--uilib-org-chart-node-color-selected` | `#4338ca` | Node text colour when selected. |
| `--uilib-org-chart-connector-color` | `#adb5bd` | Connector line colour. |
| `--uilib-org-chart-connector-width` | `1px` | Connector line thickness. |
| `--uilib-org-chart-connector-height` | `1.5rem` | Vertical connector segment height. |
| `--uilib-org-chart-gap` | `1.5rem` | Horizontal gap between sibling nodes. |
| `--uilib-org-chart-toggle-size` | `1.25rem` | Toggle button diameter. |
| `--uilib-org-chart-toggle-bg` | `#6c757d` | Toggle button background. |
| `--uilib-org-chart-toggle-color` | `#ffffff` | Toggle button icon colour. |
| `--uilib-org-chart-transition` | `all .2s ease` | Node and connector transition. |

---

## Accessibility

- Root element carries `role="tree"`.
- Every node cell carries `role="treeitem"`.
- Parent nodes set `aria-expanded="true"` / `"false"`.
- Leaf nodes omit `aria-expanded`.
- `aria-selected` is present on every node when `selectionMode` is non-null.
- Focus management: root-level nodes have `tabindex="0"`, all descendants `tabindex="-1"`.
- Keyboard navigation on the chart host:
  - **Arrow Down / Up** — move focus to the next / previous visible node.
  - **Home / End** — move focus to the first / last visible node.
  - **Enter / Space** on a node cell — trigger selection.
  - **Enter / Space** on the toggle button — expand or collapse.

---

## Notes

- `node.expanded` is mutated in-place when a toggle is clicked (PrimeNG-compatible API). Use the `(nodeExpand)` / `(nodeCollapse)` outputs if you need to react to changes.
- Each node object **must** have a unique `key` — it is used as the `track` expression in `@for` and as the selection identity key.
- Passing a new array reference to `[value]` resets all expansion state unless the nodes themselves already carry `expanded` flags.
