# Version Management Guide

## Quick Reference

### Where to Update Version Information

**Always edit:** `projects/ui-lib-custom/package.json`  
**Never edit:** `dist/ui-lib-custom/package.json` (auto-generated on build)

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

Edit `projects/ui-lib-custom/package.json`:

```json
{
  "name": "ui-lib-custom",
  "version": "1.0.1",  // ← Update this
  // ... rest of config
}
```

### 2. Build the Library

```bash
cd ui-lib-custom
ng build ui-lib-custom
```

### 3. Publish to npm

```bash
cd dist/ui-lib-custom
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
# From the root of ui-lib-custom project
ng build ui-lib-custom

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
ng build ui-lib-custom
cd dist/ui-lib-custom
npm publish --access public
```

## Version Checklist

Before publishing a new version:

- [ ] Update version in `projects/ui-lib-custom/package.json`
- [ ] Update CHANGELOG.md with changes (if you have one)
- [ ] Run tests: `ng test ui-lib-custom`
- [ ] Build the library: `ng build ui-lib-custom`
- [ ] Verify the build output in `dist/ui-lib-custom`
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

All package metadata is configured in `projects/ui-lib-custom/package.json`:

```json
{
  "name": "ui-lib-custom",
  "version": "1.0.0",
  "description": "A flexible Angular UI component library",
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "keywords": ["angular", "components", "ui"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ui-lib-custom.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/ui-lib-custom/issues"
  },
  "homepage": "https://github.com/yourusername/ui-lib-custom#readme"
}
```

This metadata will automatically be included in the built package.

## Common Version Management Tasks

### Check Current Published Version
```bash
npm view ui-lib-custom version
```

### List All Published Versions
```bash
npm view ui-lib-custom versions
```

### Check Latest Tag
```bash
npm view ui-lib-custom dist-tags
```

### Update a Distribution Tag
```bash
# Point 'latest' tag to a specific version
npm dist-tag add ui-lib-custom@1.0.1 latest

# Add a 'stable' tag
npm dist-tag add ui-lib-custom@1.0.0 stable
```
