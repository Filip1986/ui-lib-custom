## What

<!-- A concise description of the change -->

## Why

<!-- The motivation / problem being solved -->

## Type of Change

- [ ] feat: new component or feature
- [ ] fix: bug fix
- [ ] docs: documentation only
- [ ] refactor: code change that neither fixes a bug nor adds a feature
- [ ] perf: performance improvement
- [ ] a11y: accessibility improvement
- [ ] chore: build process, tooling, dependencies
- [ ] ci: CI/CD changes
- [ ] release: version bump

## Pre-Merge Checklist

- [ ] `npm run format:check` passes (also enforced in CI `lint` job)
- [ ] `npm run lint:ci` passes (0 warnings)
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes with coverage ≥ 90%
- [ ] `npm run build` succeeds (library builds)
- [ ] `npm run verify:tree-shaking` passes (if exporting new symbols)
- [ ] `npm run bundlesize` is within budget
- [ ] jest-axe test added/updated for any component changes
- [ ] Storybook story added/updated for any component changes
- [ ] Public API (`public-api.ts`) updated if adding new exports
- [ ] CHANGELOG.md updated if this is a releasable change
- [ ] No `console.log` left in code
- [ ] Commits follow conventional commit format

## Screenshots / Evidence

<!-- If UI change, include before/after screenshots or Storybook link -->

## A11y Notes

<!-- Describe ARIA roles, keyboard interactions, screen-reader behaviour -->
