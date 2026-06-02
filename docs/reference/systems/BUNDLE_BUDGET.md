# Bundle Budget

> **Source of truth:** `docs/reference/bundle-sizes.json`
> **Snapshot script:** `npm run bundlesize:snapshot`
> **CI check script:** `npm run bundlesize:check`

## What is tracked

Each secondary entry point in `dist/ui-lib-custom/fesm2022/` is measured independently. Two numbers are captured per entry:

| Field        | Description                                            |
| ------------ | ------------------------------------------------------ |
| `raw`        | Uncompressed byte count of the `.mjs` bundle           |
| `gzip`       | Gzip-compressed size at level 6 (default `zlib` level) |
| `measuredAt` | ISO 8601 timestamp of the last snapshot                |

Consumers typically receive the **gzip** number — that is the primary budget figure. The raw number is retained for ratio analysis and for detecting generated-code bloat before compression.

## Budget rules

A CI run fails if **both** of these conditions are true for the same entry point:

| Condition           | Threshold                   |
| ------------------- | --------------------------- |
| Absolute raw growth | > **1 024 B** (1 KB)        |
| Relative raw growth | > **5 %** from the baseline |

A single breach is not enough to fail — both thresholds must be exceeded. This allows small incremental improvements without false positives while still catching significant regressions.

## Updating the baseline

When a deliberate size increase is accepted (new feature, new export), update the baseline:

```bash
ng build ui-lib-custom
npm run bundlesize:snapshot
git add docs/reference/bundle-sizes.json
git commit -m "chore(perf): update bundle-size baseline — <reason>"
```

The snapshot file is committed and tracked in git. CI reads the baseline from `HEAD` via `git show HEAD:docs/reference/bundle-sizes.json`.

## Current snapshot (top 20 by gzip)

| Entry point      | Raw (B) | Gzip (B) |
| ---------------- | ------- | -------- |
| date-picker      | 187 191 | 28 496   |
| table            | 140 851 | 22 049   |
| autocomplete     | 120 355 | 15 660   |
| virtual-scroller | 81 885  | 14 250   |
| pick-list        | 116 612 | 14 244   |
| theme            | 77 262  | 13 904   |
| tree-table       | 89 904  | 12 811   |
| order-list       | 77 896  | 12 625   |
| cascade-select   | 87 954  | 12 247   |
| upload           | 81 758  | 11 773   |
| tree             | 66 244  | 11 651   |
| button           | 82 486  | 11 518   |
| carousel         | 72 369  | 11 287   |
| galleria         | 84 523  | 10 961   |
| tabs             | 76 601  | 10 797   |
| listbox          | 70 208  | 10 630   |
| color-picker     | 69 473  | 10 339   |
| input-number     | 69 885  | 9 487    |
| input-mask       | 52 251  | 9 183    |
| dialog           | 56 051  | 9 140    |

Full snapshot: [`bundle-sizes.json`](../bundle-sizes.json)

## Target budgets (guidance)

These are not enforced by the current CI threshold but serve as long-term design targets:

| Component tier         | Gzip target |
| ---------------------- | ----------- |
| Utility / directive    | < 2 KB      |
| Simple display         | < 5 KB      |
| Form input             | < 12 KB     |
| Composite / overlay    | < 16 KB     |
| Complex data component | < 30 KB     |

When a component significantly exceeds its tier budget, investigate:

1. Are heavy dependencies (e.g. chart libraries, date libraries) tree-shaken correctly?
2. Are template strings, inline SVGs, or enum tables that could be lazy-loaded present?
3. Does `@defer` reduce the eager bundle for off-screen panels?

## Related

- [PERFORMANCE.md](PERFORMANCE.md) — general performance guidelines
- [`scripts/snapshot-bundle-sizes.mjs`](../../../scripts/snapshot-bundle-sizes.mjs)
- [`scripts/check-bundle-budget.mjs`](../../../scripts/check-bundle-budget.mjs)
- [`docs/reference/bundle-sizes.json`](../bundle-sizes.json)
