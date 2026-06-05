# SenseDataGrid Research

> Date: 2026-06-05
> Scope: Competitive analysis and architecture plan for graduating `SenseDataGrid` to `@artificialsenselabs/enterprise`.

---

## 1) Component Selection: `SenseDataGrid`

`SenseDataGrid` is the clearest first enterprise component for these reasons:

- It is already central to the public `@artificialsenselabs/enterprise` positioning ("enterprise data grid + primitives").
- It is the flagship monetized component category across the market.
- Current implementation depth is high (`data-grid.component.ts` ~1,249 LOC plus typed models/tests/docs), so the next step is graduation and hardening, not greenfield build.

---

## 2) Competitive Landscape (Pricing + Feature Shape)

### AG Grid (dominant paid incumbent)

- Approx pricing: $1,500+ per developer per year for Enterprise tier.
- Community/free baseline includes: sort, filter, pagination, virtualization, column resize/reorder, CSV export, row selection, keyboard navigation.
- Paid Enterprise adds: row grouping/aggregation, Excel export, range selection, master-detail, tree data, server-side row model, advanced column menu/side panels, advanced filtering UI, status bar, chart integration.
- DX gap/opportunity for us: Angular integration is powerful but config-heavy (`columnDefs`/callbacks) and less template-native than Angular-first `ng-template` slots.

### TanStack Table v8 (headless)

- Pricing: free.
- Strength: very powerful table logic layer.
- Weakness: no UI batteries included; teams build and maintain rendering, a11y details, and styling themselves.
- Opportunity: teams that want production UI fast usually prefer an opinionated, integrated enterprise grid.

### PrimeNG `p-table`

- Pricing: MIT/free.
- Strong parity baseline: virtual scroll, frozen columns, column resize/reorder, lazy load, editing, selection, filters.
- Opportunity: Angular modernity (signal-native patterns and zoneless-first posture) can be a durable differentiator.

### Kendo UI for Angular

- Approx pricing: ~$1,300 per developer per year.
- Enterprise capabilities include: batch editing, Excel/PDF export, column chooser, state persistence, advanced filter builder, locked columns, grouping, aggregation.
- Opportunity: simplify DX and reduce bundle/operational complexity while matching key enterprise workflows.

### DevExtreme

- Approx pricing: ~$595 to $1,800 per developer per year (package-dependent).
- Very broad capability set: band columns, summaries, conditional formatting, adaptive columns, infinite + virtual scroll, PDF export, focus row, batch editing.
- Opportunity: Angular-native ergonomics, smaller integration surface, and modern Angular architecture.

---

## 3) Gap Analysis: Current `ui-lib-custom` DataGrid vs Paid Tiers

### Current parity position

The current DataGrid already covers the practical "free-tier baseline" seen across AG Grid Community and PrimeNG table usage:

- Virtual scroll
- Frozen/pinned columns
- Column resize and reorder
- Multi-sort
- Global + per-column filtering
- Selection modes
- Cell/row editing
- Server-side lazy load
- Pagination
- Full keyboard + WAI-ARIA support
- Signal-native and zoneless-friendly implementation posture

### Highest-value enterprise gaps

| Enterprise capability                    | Market paid tiers | Our v0.1.0 | Our v0.2.0+ |
| ---------------------------------------- | ----------------- | ---------- | ----------- |
| Column visibility panel (column chooser) | Common            | Build      | -           |
| CSV export                               | Common            | Build      | -           |
| State persistence                        | Common            | Build      | -           |
| Excel `.xlsx` export                     | Common            | Defer      | v0.2.0      |
| Row grouping + aggregation               | Common            | Defer      | v0.2.0      |
| Advanced filter builder UI               | Common            | Defer      | v0.2.0      |
| Master-detail rows                       | Common            | Defer      | v0.3.0      |
| Tree data                                | Common            | Defer      | v0.3.0      |

---

## 4) v0.1.0 Architecture Plan (Enterprise Graduation)

### Scope for v0.1.0

Build three enterprise features on top of the existing DataGrid base:

1. **Column Visibility Panel**
   - Toolbar entry opens a chooser panel/dropdown.
   - Per-column show/hide toggles.
   - "Reset columns" action to restore default visibility.

2. **CSV Export**
   - Toolbar "Export" action.
   - Pure TypeScript/JS implementation (no required heavy export dependency).
   - Exports current sorted/filtered view and supports custom file name.

3. **State Persistence**
   - Optional `stateKey` input.
   - Persist sort state, visible columns, column widths, and pagination.
   - Rehydrate state on init.

### Why this v0.1.0 slice

- It closes the most common paid-enterprise buying triggers quickly.
- It avoids deep complexity jumps (grouping/tree/master-detail) in the first graduation step.
- It produces marketable enterprise value while keeping delivery risk bounded.

---

## 5) Proposed Release Sequencing

- **v0.1.0:** Column chooser + CSV export + state persistence
- **v0.2.0:** Excel export + grouping/aggregation + advanced filter builder
- **v0.3.0:** Master-detail + tree data

This sequence prioritizes fastest path to enterprise value, then deeper analytical/hierarchical workflows.
