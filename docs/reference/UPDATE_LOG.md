# Update Log - January 22, 2026

## Major Version Updates

This document tracks the upgrade to the latest versions of Angular and PrimeNG.

## Updated Packages

### Angular Framework
- **@angular/core**: 20.3.16 → **21.1.1** ✅
- **@angular/common**: 20.3.16 → **21.1.1** ✅
- **@angular/compiler**: 20.3.16 → **21.1.1** ✅
- **@angular/forms**: 20.3.16 → **21.1.1** ✅
- **@angular/platform-browser**: 20.3.16 → **21.1.1** ✅
- **@angular/router**: 20.3.16 → **21.1.1** ✅

### Angular DevTools
- **@angular/cli**: 20.3.15 → **21.1.1** ✅
- **@angular/build**: 20.3.15 → **21.1.1** ✅
- **@angular/compiler-cli**: 20.3.16 → **21.1.1** ✅
- **ng-packagr**: 20.3.2 → **21.1.0** ✅

### TypeScript
- **typescript**: 5.8.3 → **5.9.3** ✅
  - Required for Angular 21 (needs TypeScript 5.9+)

### PrimeNG (Already Latest)
- **primeng**: 21.0.4 ✅ (already latest)
- **primeicons**: 7.0.0 ✅ (already latest)

### Testing Tools
- **jasmine-core**: 5.8.0 → **6.0.1** ✅
- **@types/jasmine**: 5.1.15 → **6.0.0** ✅

## Configuration Updates

### Library Package.json (`projects/ui-components/package.json`)

Updated peer dependencies to reflect new versions:

```json
{
  "peerDependencies": {
    "@angular/common": "^21.0.0 || ^22.0.0",
    "@angular/core": "^21.0.0 || ^22.0.0",
    "primeng": "^21.0.0",
    "primeicons": "^7.0.0"
  }
}
```

### Code Improvements

Fixed deprecated Sass syntax in `button.scss`:
- Changed `if()` function to `@if/@else` directive to address deprecation warning

## Documentation Updates

Updated the following files to reflect new versions:

1. **projects/ui-components/README.md**
   - Updated Angular CLI version reference
   - Added requirements section with version constraints

2. **docs/guides/PRIMENG_INTEGRATION.md**
   - Updated version information
   - Removed legacy-peer-deps references (no longer needed)
   - Updated compatibility matrix

## Build Verification

✅ Library builds successfully with Angular 21
✅ No TypeScript errors
✅ No compilation errors
✅ Zero vulnerabilities in npm audit

## Breaking Changes

### Angular 21 Changes
- TypeScript 5.9+ is now required
- Some deprecated APIs may have been removed (review Angular changelog if issues arise)

### For Consuming Applications

Applications using this library must now use:
- **Angular 21.x or 22.x**
- **PrimeNG 21.x**
- **PrimeIcons 7.x**
- **TypeScript 5.9+**

## Migration Guide for Consumers

If you're upgrading an existing application that uses this library:

### 1. Update Your Application to Angular 21

```bash
# Commit your changes first
git add .
git commit -m "Pre-upgrade checkpoint"

# Update Angular
ng update @angular/core@21 @angular/cli@21
```

### 2. Update TypeScript

```bash
npm install typescript@5.9
```

### 3. Update PrimeNG

```bash
npm install primeng@21 primeicons@7
```

### 4. Update the UI Library

```bash
npm install @filip86/ui-components@latest
```

### 5. Test Your Application

```bash
# Build
ng build

# Run tests
ng test

# Serve and manually test
ng serve
```

## Known Issues

- None at this time

## References

- [Angular 21 Release Notes](https://angular.dev/update-guide)
- [PrimeNG 21 Documentation](https://primeng.org/)
- [TypeScript 5.9 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)

## Next Steps

1. Test the library thoroughly in demo applications
2. Update any integration examples
3. Consider creating a migration guide for users
4. Publish the updated library to npm
5. Update any CI/CD pipelines to use Node.js 18+ (recommended for Angular 21)

## Rollback Plan

If issues arise, you can rollback by:

```bash
git checkout HEAD~1 package.json package-lock.json
npm install
```

Or manually revert to previous versions:

```bash
npm install @angular/core@20 @angular/cli@20 typescript@5.8
```
