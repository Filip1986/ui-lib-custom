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

