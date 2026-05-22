# Semantic Versioning Guide — ui-lib-custom

This document defines what constitutes a MAJOR, MINOR, or PATCH change for `ui-lib-custom`.
Follow this guide when preparing releases and writing commit messages.

---

## Version Change Categories

### MAJOR (Breaking — requires migration guide)

A MAJOR bump is required when consumers must change their code to continue using the library.

| Change | Example |
|--------|---------|
| Removing a component | Delete `ButtonComponent` |
| Removing a secondary entry point | Remove `ui-lib-custom/charts` |
| Renaming a component selector | `uilib-button` → `lib-button` |
| Removing a public `input()` | Remove `disabled` input from Button |
| Renaming a public `input()` or `output()` | `size` → `variant` |
| Changing an `input()` type in a breaking way | `string` → `'sm' \| 'md' \| 'lg'` |
| Changing required peer dependency range | `>=18` → `>=20` (drops Angular 18/19) |
| Removing a CSS custom property (`--uilib-*`) | Remove `--uilib-color-primary` |
| Renaming a CSS custom property | `--uilib-btn-bg` → `--uilib-button-background` |
| Changing `ViewEncapsulation` strategy | `None` → `Emulated` |
| Removing from `public-api.ts` barrel | Any previously exported symbol |

**Required actions:**
1. Use `BREAKING CHANGE:` footer in the commit message
2. Write a migration guide section in `CHANGELOG.md`
3. Bump major version in `package.json`

### MINOR (Non-breaking addition)

A MINOR bump is required when new capabilities are added without breaking existing code.

| Change | Example |
|--------|---------|
| Adding a new component | New `TooltipComponent` |
| Adding a new optional `input()` with a default | `size = input<'sm' \| 'md'>('md')` |
| Adding a new secondary entry point | New `ui-lib-custom/charts` |
| Adding a new CSS custom property | New `--uilib-spinner-color` |
| Adding a new Storybook story | Story for existing component |
| Adding a new `output()` | New `dismissed = output<void>()` on Dialog |
| Adding a new exported utility type | New `ButtonVariant` type export |

**Required actions:**
1. Bump minor version; reset patch to 0
2. Add to `CHANGELOG.md` under `## Added`

### PATCH (Non-breaking fix)

A PATCH bump is for fixes that don't change the public API.

| Change | Example |
|--------|---------|
| Bug fix in component behaviour | Fix dropdown not closing on Escape |
| Accessibility improvement | Fix missing `aria-label` |
| CSS fix that doesn't change public API | Fix border radius on Button |
| Performance improvement | Reduce re-renders in DataTable |
| Documentation improvement | Fix JSDoc typo |
| Internal refactor | Extract helper function (no API change) |
| Dependency patch/minor update | Jest 29.x → 30.x |

**Required actions:**
1. Bump patch version
2. Add to `CHANGELOG.md` under `## Fixed` or `## Changed`

---

## Commit Type → Semver Impact

| Commit Type | Semver Impact | Notes |
|-------------|---------------|-------|
| `feat` | MINOR | New feature or component |
| `fix` | PATCH | Bug fix |
| `perf` | PATCH | Performance improvement |
| `refactor` | PATCH | Internal change, no API diff |
| `a11y` | PATCH | Accessibility improvement |
| `docs` | none | No release |
| `chore` | none | No release |
| `ci` | none | No release |
| `BREAKING CHANGE` footer | MAJOR | Any type with breaking footer |

---

## Release Process

### Dry Run

```bash
# See what would happen without making changes
npm run build
npm pack --dry-run
```

### Pre-Release Checklist

Before bumping the version:
- [ ] `npm run check` passes (lint:ci + typecheck + test)
- [ ] `npm run verify:tree-shaking` passes
- [ ] `npm run bundlesize` is within budget
- [ ] `CHANGELOG.md` updated for this version
- [ ] Migration guide written if MAJOR bump
- [ ] All new components have Storybook stories
- [ ] All new components have jest-axe tests

### Manual Release Steps

```bash
# 1. Ensure clean working tree on main
git checkout main && git pull && git status

# 2. Update CHANGELOG.md
# Add version header: ## [X.Y.Z] - YYYY-MM-DD

# 3. Bump version in package.json
npm version patch    # or minor or major

# 4. Build the library
npm run build

# 5. Verify tree-shaking
npm run verify:tree-shaking

# 6. Run full test suite
npm run check

# 7. Commit and tag
git add CHANGELOG.md package.json
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z

# 8. Push with tags
git push && git push --tags

# 9. Publish (from dist)
cd dist/ui-lib-custom && npm publish
```

---

## CHANGELOG Format

```markdown
## [X.Y.Z] - YYYY-MM-DD

### BREAKING CHANGES
- Remove `deprecated-component` (migration: use `new-component` instead)

### Added
- New `TooltipComponent` in `ui-lib-custom` entry point

### Fixed
- Button: fix focus ring not visible in high-contrast mode

### Changed
- Dialog: improve animation timing

### Deprecated
- `OldComponent`: use `NewComponent` instead — will be removed in X+1.0.0
```

