# Scripts

## Tree-shaking Verification

`verify-tree-shaking.js` builds the minimal app with isolated secondary entry point imports and inspects `stats.json` to verify that unrelated library folders are not pulled in.

### Run

```powershell
npm run verify:tree-shaking
```

### Dry run

```powershell
npm run verify:tree-shaking:dry
```

### Notes

- The script temporarily overwrites `projects/minimal/src/app/app.ts` and `app.html`, then restores them.
- Use `--keep-temp` to keep the last test state.

## Coverage Summary

`coverage-summary.js` reads Istanbul coverage output and enforces a threshold across lines, statements, functions, and branches.

### Run coverage + summary

```powershell
npm run test:coverage
npm run coverage:summary
```

### JSON output

```powershell
node scripts/coverage-summary.js --json
```

## Competitive Benchmarks

Support tooling for `docs/COMPETITIVE_BENCHMARKS.md` — extracts competitor API surfaces from their
shipped `.d.ts` so benchmark rows are built from ground truth, not memory. Shared parsing lives in
`lib/ng-surface.mjs`. Generated artifacts land in `docs/_generated/` (scaffolds are gitignored;
surface dumps + coverage + metrics are committed as dated evidence).

```powershell
npm run competitive:primeng          # PrimeNG surface only → primeng-api-surface.{json,md}
npm run competitive:primeng:check    # CI freshness guard — non-zero exit if upstream surface drifted
npm run build; npm run competitive:surfaces   # ui-lib + PrimeNG + Material surfaces, per-component
                                              # diff scaffolds, and the component coverage report
npm run build; npm run competitive:metrics    # per-component --uilib-* token count + public `any` leakage
```

The `:surfaces` and `:metrics` runs read ui-lib from its build output — run `npm run build` first.
