# RUNBOOK — ui-lib-custom

Day-to-day operational guide for developers working on the `ui-lib-custom` Angular component library.

---

## 1. Daily Development Workflow

### Start Storybook (primary dev environment)

```bash
npm run storybook
# Opens at http://localhost:6006
```

### Start Demo Application

```bash
npm run serve:demo
# Opens at http://localhost:4201
```

### Run Tests in Watch Mode

```bash
npm run test:watch           # unit tests in watch mode
npm run test:a11y:watch      # a11y unit tests in watch mode
```

### Run TypeScript Type Check

```bash
npm run typecheck
# Checks: tsconfig.json, lib, spec, demo, demo-spec configs
```

---

## 2. Adding a New Component

See `COMPONENT_CREATION_GUIDE.md` for full details. Summary:

```bash
# 1. Create the component directory
mkdir projects/ui-lib-custom/src/lib/<name>

# 2. Create required files
touch projects/ui-lib-custom/src/lib/<name>/<name>.ts
touch projects/ui-lib-custom/src/lib/<name>/<name>.html
touch projects/ui-lib-custom/src/lib/<name>/<name>.scss
touch projects/ui-lib-custom/src/lib/<name>/<name>.spec.ts
touch projects/ui-lib-custom/src/lib/<name>/<name>.stories.ts
touch projects/ui-lib-custom/src/lib/<name>/index.ts

# 3. Add to public-api.ts
echo "export * from './lib/<name>';" >> projects/ui-lib-custom/src/public-api.ts

# 4. Verify tree-shaking after building
npm run build && npm run verify:tree-shaking
```

**Checklist for every new component:**

- [ ] `ViewEncapsulation.None` + `OnPush` + standalone
- [ ] `input()` / `output()` (not `@Input()` / `@Output()`)
- [ ] Design tokens only — no hardcoded colours
- [ ] `jest-axe` assertion in spec
- [ ] Storybook story with all variants
- [ ] Added to `public-api.ts`

---

## 3. Testing

### Unit Tests

```bash
npm test                          # run once
npm run test:watch                # watch mode
npm run test:coverage             # with coverage report (threshold: 90%)
```

Coverage report: `coverage/lcov-report/index.html`

### A11y Unit Tests

```bash
npm run test:a11y                 # jest-axe tests (*.a11y.spec.ts)
npm run test:a11y:watch           # watch mode
```

### Playwright E2E A11y Tests

```bash
npm run test:a11y:e2e             # auto-starts demo server
npm run test:a11y:e2e:sweep       # full sweep across all demo pages
npm run test:a11y:all             # unit + e2e + sweep
npm run test:a11y:report          # generate HTML report
```

### Coverage Summary

```bash
npm run test:coverage && npm run coverage:summary
```

---

## 4. Building

### Build the Library

```bash
npm run build
# Output: dist/ui-lib-custom/
```

### Verify Bundle Size

```bash
npm run bundlesize
# Checks against budgets in bundlesize config
```

### Verify Tree-Shaking

```bash
npm run verify:tree-shaking
# Modifies minimal app temporarily; reverts automatically

npm run verify:tree-shaking:dry
# Dry run — no file changes
```

---

## 5. Local Publish Testing

### Method 1: npm pack

```bash
npm run build
cd dist/ui-lib-custom
npm pack
# Creates ui-lib-custom-X.Y.Z.tgz

# In a test project:
npm install /path/to/ui-lib-custom-X.Y.Z.tgz
```

### Method 2: Verdaccio (local npm registry)

```bash
# Start verdaccio
npx verdaccio

# Publish to local registry
npm run build
cd dist/ui-lib-custom
npm publish --registry http://localhost:4873

# Install from local registry in test project
npm install ui-lib-custom --registry http://localhost:4873
```

---

## 6. Release Process

See `SEMVER.md` for the full guide. Quick reference:

```bash
# 1. Full quality check
npm run check

# 2. Verify tree-shaking
npm run verify:tree-shaking

# 3. Check bundle size
npm run bundlesize

# 4. Update CHANGELOG.md

# 5. Bump version
npm version patch|minor|major

# 6. Build
npm run build

# 7. Commit and tag
git add CHANGELOG.md package.json
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z && git push && git push --tags

# 8. Publish
cd dist/ui-lib-custom && npm publish
```

---

## 7. Debugging Common Issues

### Secondary entry point not found after adding new entry

```bash
# Rebuild the library
npm run build

# Check that ng-package.json exists for the new entry
ls projects/ui-lib-custom/<entry-name>/ng-package.json

# Check public-api.ts exports the new entry
grep "<entry-name>" projects/ui-lib-custom/src/public-api.ts
```

### Storybook failing to start

```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook

# Restart
npm run storybook

# Check for Angular version mismatch
npm list @angular/core @storybook/angular
```

### jest-axe violations with false positives

If a violation is a known false positive (e.g. axe can't detect dynamically-added ARIA):

```typescript
// Suppress with a specific rule exclusion — document the reason
const results = await axe(fixture.nativeElement, {
  rules: { 'rule-id': { enabled: false } },
});
// REASON: [explain why this is a false positive]
expect(results).toHaveNoViolations();
```

Never suppress violations without commenting the reason.

### Bundle size regression

```bash
# Build and explore the bundle
npm run build:demo
npx source-map-explorer dist/demo/browser/*.js

# Check for accidental cross-entry-point imports
npm run verify:tree-shaking:dry
```

### TypeScript errors after a dependency update

```bash
# Run full typecheck to see all errors
npm run typecheck

# Check if Angular version mismatch
npm list @angular/core

# If tsconfig needs updating for new Angular version
ng update @angular/core @angular/cli @angular/cdk
```

---

## 8. Useful Commands Reference

```bash
npm run lint           # lint all files
npm run lint:fix       # auto-fix lint issues
npm run lint:ci        # lint with zero warnings (CI mode)
npm run format         # format all files with Prettier
npm run format:check   # check formatting only
npm run knip           # find dead code and unused exports
npm run check          # full quality gate: lint:ci + typecheck + test
npm run health         # run health check script (if configured)
```
