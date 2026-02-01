# Icon System

The UI Library provides a unified icon system built on Ng Icons, supporting multiple icon libraries with seamless variant integration.

## Overview

- **100,000+ icons** available across multiple icon sets
- **Semantic naming** – use consistent names like `close`, `search`, `success`
- **Variant-aware** – components pick the library that matches their variant
- **Tree-shakable** – only registered icons are bundled

## Quick Start

### 1) Setup in your app
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideUiLibIcons } from 'ui-lib-custom';

export const appConfig: ApplicationConfig = {
  providers: [
    provideUiLibIcons({
      defaultLibrary: 'lucide', // or 'material', 'bootstrap'
    }),
  ],
};
```

### 2) Use icons
```html
<!-- Semantic icon (recommended) -->
<ui-lib-icon name="search" />

<!-- With size -->
<ui-lib-icon name="settings" size="lg" />

<!-- With color -->
<ui-lib-icon name="success" color="var(--uilib-color-success)" />
```

## Semantic Icons Reference

Semantic names stay consistent; the underlying icon adjusts by variant.

| Semantic | Material* | Bootstrap* | Lucide |
|----------|-----------|------------|--------|
| close | lucideBadgeX | lucideBadgeX | lucideBadgeX |
| menu | lucideAlignJustify | lucideAlignJustify | lucideAlignJustify |
| search | lucideAtSign | lucideAtSign | lucideAtSign |
| settings | lucideBadge | lucideBadge | lucideBadge |
| add | lucideBadgePlus | lucideBadgePlus | lucideBadgePlus |
| remove | lucideBadgeMinus | lucideBadgeMinus | lucideBadgeMinus |
| edit | lucideBarChart | lucideBarChart | lucideBarChart |
| delete | lucideBan | lucideBan | lucideBan |
| save | lucideAward | lucideAward | lucideAward |
| refresh | lucideArrowsUpFromLine | lucideArrowsUpFromLine | lucideArrowsUpFromLine |
| download | lucideArrowUpSquare | lucideArrowUpSquare | lucideArrowUpSquare |
| upload | lucideArrowUp | lucideArrowUp | lucideArrowUp |
| share | lucideArrowUpRight | lucideArrowUpRight | lucideArrowUpRight |
| home | lucideBadge | lucideBadge | lucideBadge |
| user | lucideBadgeInfo | lucideBadgeInfo | lucideBadgeInfo |
| bell | lucideBellElectric | lucideBellElectric | lucideBellElectric |
| success | lucideBadgeCheck | lucideBadgeCheck | lucideBadgeCheck |
| error | lucideBadgeX | lucideBadgeX | lucideBadgeX |
| warning | lucideAlertTriangle | lucideAlertTriangle | lucideAlertTriangle |
| info | lucideBadgeInfo | lucideBadgeInfo | lucideBadgeInfo |
| eye | lucideBadgeInfo | lucideBadgeInfo | lucideBadgeInfo |

> *Material and Bootstrap presets currently alias the Lucide set for availability; swap in set-specific mappings when those icon sets are curated.

> Full mapping lives in `projects/ui-lib-custom/src/lib/icon/icon.semantics.ts` and the preset files under `projects/ui-lib-custom/src/lib/icon/presets/`.

## Icon Sizes

| Size | Value | Use Case |
|------|-------|----------|
| xs | 12px | Inline text, badges |
| sm | 16px | Small buttons, inputs |
| md | 20px | Default, buttons |
| lg | 24px | Headers, emphasis |
| xl | 32px | Hero sections |
| 2xl | 40px | Large displays |

## Using with Components

### Button with Icon
```html
<ui-lib-button icon="download" iconPosition="left">Download</ui-lib-button>
<ui-lib-button icon="arrow-right" iconPosition="right">Next</ui-lib-button>
<ui-lib-icon-button icon="settings" ariaLabel="Settings" />
```

### Card with Icon
```html
<ui-lib-card headerIcon="user" [closable]="true">
  <div card-header>User Profile</div>
  Content here...
</ui-lib-card>
```

### Alert with Automatic Icons
```html
<ui-lib-alert severity="success">Operation completed!</ui-lib-alert>
<ui-lib-alert severity="error" [dismissible]="true">An error occurred.</ui-lib-alert>
```

## Adding Custom Icons

### Register additional icons
```typescript
import { provideIcons } from '@ng-icons/core';
import { myCustomIcon } from './my-icons';

@Component({
  providers: [provideIcons({ myCustomIcon })],
})
export class FeatureComponent {}
```

### Use raw SVG
```html
<ui-lib-icon [svg]="customSvgString" />
```

## Theming Icons

Icons inherit `currentColor` by default. Override with CSS variables:
```scss
:root {
  --uilib-icon-color: var(--uilib-color-primary);
}

.my-component {
  --uilib-icon-color: var(--uilib-color-success);
}
```

## API Reference (summary)

| API | Location |
|-----|----------|
| Icon component | `projects/ui-lib-custom/src/lib/icon/icon.ts` |
| IconButton component | `projects/ui-lib-custom/src/lib/icon-button/icon-button.ts` |
| IconService | `projects/ui-lib-custom/src/lib/icon/icon.service.ts` |
| Presets & mappings | `projects/ui-lib-custom/src/lib/icon/presets/` |
