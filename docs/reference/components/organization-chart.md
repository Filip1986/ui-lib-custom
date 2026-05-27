# Organization Chart

**Selector:** `ui-lib-organization-chart`
**Entry point:** `import { OrganizationChart } from 'ui-lib-custom/organization-chart'`

---

## Overview

OrganizationChart renders an interactive hierarchical tree of nodes. Supports single/multiple selection, collapsible subtrees, custom node templates per node type, and three design variants.

## API

### Inputs

| Name          | Type                      | Default          | Description                                                               |
| ------------- | ------------------------- | ---------------- | ------------------------------------------------------------------------- |
| `ariaLabel`   | `string`                  | `'Organization'` | Accessible label for the tree. Applied to the root tree element.          |
| `collapsible` | `boolean`                 | `false`          | When `true`, nodes with children render an expand/collapse toggle button. |
| `styleClass`  | `string`                  | `''`             | Extra CSS class applied to the host element.                              |
| `value`       | `OrganizationChartNode[]` | `[]`             | Root-level nodes of the tree.                                             |

### Outputs

_none_

## Content Projection

| Selector         | Notes |
| ---------------- | ----- |
| `[listFallback]` | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                               |
| ------------------------------------------------------------------------------ |
| ArrowDown should move focus to next visible node                               |
| ArrowLeft should collapse an expanded branch                                   |
| ArrowLeft should move focus to parent when branch is collapsed or leaf         |
| ArrowRight should expand a collapsed branch                                    |
| ArrowRight should move focus to the first child when already expanded          |
| ArrowUp should move focus to previous visible node                             |
| End should move focus to last visible node                                     |
| Enter should select the focused node in single mode                            |
| Home should move focus to first visible node                                   |
| Space should select the focused node in single mode                            |
| applies variant host class                                                     |
| leaf nodes do not have aria-expanded                                           |
| node cells do not have selectable class when selectionMode is null             |
| node cells have role=                                                          |
| nodes have aria-selected when selectionMode is single                          |
| nodes have aria-selected=null when selectionMode is null                       |
| nodes with children have aria-expanded                                         |
| nodes with selectable=false cannot be selected                                 |
| nodes with selectable=false do not get selectable CSS class                    |
| root list element has role=                                                    |
| should expose aria-expanded true/false for branch nodes and omit it for leaves |
| should expose aria-label on the root tree                                      |
| should expose aria-selected only when selection mode is active                 |
| should hide toggle icon glyphs from screen readers                             |
| should mark down connectors as aria-hidden                                     |
| should mark up connectors as aria-hidden                                       |
| should pass axe checks in default state                                        |
| should pass axe checks when a node is selected                                 |
| should pass axe checks when branch nodes are expanded                          |
| should render nested child containers as role=                                 |
| should render role=                                                            |
| should set aria-level on root and nested nodes                                 |
| should set aria-posinset for sibling order                                     |
| should set aria-setsize on root nodes                                          |
| should set role=                                                               |
| type-ahead should move focus to next matching label                            |
| updates variant host class when variant input changes                          |

## Usage Examples

```html
<!-- read-only chart -->
<ui-lib-organization-chart [value]="nodes">
  <ng-template uiOrgChartNode let-node>
    <strong>{{ node.label }}</strong>
  </ng-template>
</ui-lib-organization-chart>

<!-- selectable with type-specific templates -->
<ui-lib-organization-chart [value]="nodes" selectionMode="single" [(selection)]="selected" [collapsible]="true">
  <ng-template uiOrgChartNode type="manager" let-node>{{ node.label }} (Mgr)</ng-template>
  <ng-template uiOrgChartNode let-node>{{ node.label }}</ng-template>
</ui-lib-organization-chart>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#organization-chart)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/organization-chart/README.md)

