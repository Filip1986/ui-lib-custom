# Accessibility Testing Guide

## Quick Start

```bash
npm run test:a11y:all
npm run test:a11y
npm run test:a11y:e2e
```

## Writing Accessibility Tests

### Unit Tests with axe-core

```typescript
import { checkA11y } from '../../test/a11y-utils';

describe('MyComponent Accessibility', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    // Set up test bed
  });

  it('should have no violations', async () => {
    await checkA11y(fixture);
  });

  it('should have no violations in open state', async () => {
    fixture.componentInstance.isOpen = true;
    fixture.detectChanges();

    await checkA11y(fixture);
  });
});
```

### E2E Tests with Playwright

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page should be accessible', async ({ page }) => {
  await page.goto('/my-page');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Manual Testing

### Screen Reader Testing

#### NVDA (Windows)
1. Download from https://www.nvaccess.org/
2. Start NVDA (Ctrl+Alt+N)
3. Navigate with Tab and arrow keys
4. Listen to announcements

#### VoiceOver (macOS)
1. Enable: Cmd+F5
2. Navigate: Ctrl+Option+Arrow keys
3. Interact: Ctrl+Option+Space

### Browser DevTools

#### Chrome Accessibility Panel
1. Open DevTools (F12)
2. Go to "Accessibility" tab
3. Inspect accessibility tree
4. Check computed properties

#### Firefox Accessibility Inspector
1. Open DevTools
2. Click "Accessibility" panel
3. Enable accessibility features
4. Review issues

## CI Integration

Tests run automatically on:
- Every push to main/develop
- Every pull request

Results are posted as PR comments.

