# Migration Guide: Secondary Entry Points

This guide explains how to move from primary barrel imports to secondary entry points for better tree-shaking.

## Why migrate

- Smaller bundles when importing only what you use.
- Clearer dependency boundaries between features.

## Quick migration steps

1. Update imports to secondary entry points.
2. Verify the app builds with your preferred bundler.
3. Keep primary barrel imports only for legacy or convenience.

## Import examples

Recommended:

```typescript
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
```

Alternative (primary barrel):

```typescript
import { Button, Card } from 'ui-lib-custom';
```

## Entry points

- `ui-lib-custom/accordion`
- `ui-lib-custom/badge`
- `ui-lib-custom/button`
- `ui-lib-custom/card`
- `ui-lib-custom/checkbox`
- `ui-lib-custom/core`
- `ui-lib-custom/icon`
- `ui-lib-custom/input`
- `ui-lib-custom/layout`
- `ui-lib-custom/select`
- `ui-lib-custom/select-button`
- `ui-lib-custom/tabs`
- `ui-lib-custom/theme`
- `ui-lib-custom/tokens`

## Notes

- Theme JSON presets are packaged as assets and are not exported from the theme entry point.
- Internal library code should continue importing via relative `src/lib/...` paths.

## Verification checklist

- Build your app and verify only the required entry points are bundled.
- Run unit tests and any integration tests that import the library.

