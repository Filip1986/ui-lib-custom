# Version Management Guide

## Quick Reference

### Where to Update Version Information

**Always edit:** `projects/ui-components/package.json`  
**Never edit:** `dist/ui-components/package.json` (auto-generated on build)

### Version Numbering (Semantic Versioning)

Follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR** (1.x.x): Breaking changes, incompatible API changes
- **MINOR** (x.1.x): New features, backwards-compatible
- **PATCH** (x.x.1): Bug fixes, backwards-compatible

Examples:
- `1.0.0` → Initial stable release
- `1.0.1` → Bug fix
- `1.1.0` → New component added
- `2.0.0` → Breaking API changes

## Publishing a New Version

### 1. Update Version in Source

Edit `projects/ui-components/package.json`:

```json
{
  "name": "@filip86/ui-components",
  "version": "1.0.1",  // ← Update this
  // ... rest of config
}
```

### 2. Build the Library

```bash
cd ui-lib2
ng build ui-components
```

### 3. Publish to npm

```bash
cd dist/ui-components
npm publish --access public
```

Or with 2FA:
```bash
npm publish --access public --otp=123456
```

### 4. Tag the Release in Git (Optional but Recommended)

```bash
git tag v1.0.1
git push origin v1.0.1
```

## Pre-release Versions

For beta/alpha releases, use pre-release tags:

```json
{
  "version": "1.1.0-beta.1"
}
```

Publish with tag:
```bash
npm publish --access public --tag beta
```

Users can install with:
```bash
npm install @filip86/ui-components@beta
```

## Automated Version Bumping

Use npm version commands to automatically update version and create git tags:

```bash
# From the root of ui-lib2 project
cd projects/ui-components

# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.1 → 1.1.0)
npm version minor

# Major release (1.1.0 → 2.0.0)
npm version major

# Pre-release (1.1.0 → 1.1.1-0)
npm version prerelease

# Specific version
npm version 1.2.3
```

Then build and publish:
```bash
cd ../..
ng build ui-components
cd dist/ui-components
npm publish --access public
```

## Version Checklist

Before publishing a new version:

- [ ] Update version in `projects/ui-components/package.json`
- [ ] Update CHANGELOG.md with changes (if you have one)
- [ ] Run tests: `ng test ui-components`
- [ ] Build the library: `ng build ui-components`
- [ ] Verify the build output in `dist/ui-components`
- [ ] Publish: `npm publish --access public`
- [ ] Create git tag for the version
- [ ] Push tag to repository

## Rollback a Published Version

If you need to unpublish a version (within 72 hours):

```bash
npm unpublish @filip86/ui-components@1.0.1
```

⚠️ **Warning:** Unpublishing is discouraged. Instead, publish a new patch version with fixes.

To deprecate a version:
```bash
npm deprecate @filip86/ui-components@1.0.1 "This version has critical bugs. Please upgrade to 1.0.2"
```

## Package Metadata Configuration

All package metadata is configured in `projects/ui-components/package.json`:

```json
{
  "name": "@filip86/ui-components",
  "version": "1.0.0",
  "description": "A flexible Angular UI component library",
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "keywords": ["angular", "components", "ui"],
  "repository": {
    "type": "git",
    "url": "https://github.com/filip86/ui-lib2.git"
  },
  "bugs": {
    "url": "https://github.com/filip86/ui-lib2/issues"
  },
  "homepage": "https://github.com/filip86/ui-lib2#readme"
}
```

This metadata will automatically be included in the built package.

## Common Version Management Tasks

### Check Current Published Version
```bash
npm view @filip86/ui-components version
```

### List All Published Versions
```bash
npm view @filip86/ui-components versions
```

### Check Latest Tag
```bash
npm view @filip86/ui-components dist-tags
```

### Update a Distribution Tag
```bash
# Point 'latest' tag to a specific version
npm dist-tag add @filip86/ui-components@1.0.1 latest

# Add a 'stable' tag
npm dist-tag add @filip86/ui-components@1.0.0 stable
```
