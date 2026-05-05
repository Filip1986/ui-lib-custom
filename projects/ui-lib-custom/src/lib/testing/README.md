# testing

**Selector:** utility — test helpers and mock services
**Package:** `ui-lib-custom/testing`
**Content projection:** no — none

> This entry point is for unit tests only — never import it in production code. `MockThemeConfigService` is not `providedIn: 'root'`; it must be provided explicitly in `TestBed`.

## Exports

| Name | Kind | Notes |
|------|------|-------|
| `MockThemeConfigService` | service | Lightweight test double for `ThemeConfigService`; exposes `variant` signal and `setVariant()` |
| `createTestComponent<T>` | function | Configures `TestBed`, creates a fixture, and applies inputs in one call |
| `TestComponentResult<T>` | type | `{ fixture: ComponentFixture<T>; instance: T }` |

## `MockThemeConfigService` API

| Member | Type | Notes |
|--------|------|-------|
| `variant` | `Signal<ThemeVariant>` | Read-only signal; starts as `'material'` |
| `setVariant(variant)` | `void` | Updates the variant for the current test |

## `createTestComponent` signature

```typescript
createTestComponent<T>(component: Type<T>, inputs?: Partial<T>): Promise<TestComponentResult<T>>
```

Automatically imports `NoopAnimationsModule` and provides `MockThemeConfigService` in place of `ThemeConfigService`.

## Usage

```typescript
import { createTestComponent } from 'ui-lib-custom/testing';

const { fixture, instance } = await createTestComponent(MyComponent, { disabled: true });
```
