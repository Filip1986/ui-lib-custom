import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

// Rules disabled globally across the sweep:
//   color-contrast       — intentionally deferred; theming work is ongoing
//   aria-required-children — false positive for role="menu" + role="none" li wrapper pattern;
//                            axe-core checks immediate children of role="menu" but per WAI-ARIA
//                            spec, role="none" presentational wrappers are transparent to the
//                            accessibility tree. All our menu components follow this pattern.
const GLOBAL_DISABLED_RULES: readonly string[] = [
  'color-contrast',
  'aria-required-children',
] as const;

// Every navigable (non-redirect) demo route derived from projects/demo/src/app/app.routes.ts.
// Excludes: '' → /shadows, '**' → /shadows, 'inputs' → /input-text, 'layouts' → /layouts/semantic-spacing
// The 'password' route appears twice in app.routes.ts — included once here.
const DEMO_ROUTES: readonly string[] = [
  // Static components
  '/home',
  '/buttons',
  '/cards',
  '/badges',
  '/shadows',
  '/themes',
  '/input-text',
  '/select',
  '/checkbox',
  '/tabs',
  '/select-buttons',
  '/dark-mode',
  '/scoped-theming',
  '/accessibility',
  '/project-starter',
  // Layout sub-routes
  '/layouts/semantic-spacing',
  '/layouts/stack',
  '/layouts/inline',
  '/layouts/grid',
  '/layouts/container',
  '/layouts/composition',
  '/layouts/design-tokens',
  '/layouts/themed-layouts',
  '/layouts/examples',
  // Lazy-loaded component pages
  '/accordion',
  '/animated-on-scroll',
  '/autocomplete',
  '/auto-focus',
  '/avatar',
  '/bind',
  '/block-ui',
  '/bottom-sheet',
  '/breadcrumb',
  '/carousel',
  '/cascade-select',
  '/chart',
  '/chip',
  '/class-names',
  '/color-picker',
  '/confirm-dialog',
  '/confirm-popup',
  '/context-menu',
  '/data-view',
  '/date-picker',
  '/dialog',
  '/divider',
  '/dock',
  '/drawer',
  '/dynamic-dialog',
  '/editor',
  '/fieldset',
  '/float-label',
  '/fluid',
  '/focus-trap',
  '/gallery',
  '/icon-field',
  '/icons',
  '/image',
  '/image-compare',
  '/inplace',
  '/input-group',
  '/input-mask',
  '/input-number',
  '/input-otp',
  '/key-filter',
  '/knob',
  '/listbox',
  '/mega-menu',
  '/menu',
  '/menubar',
  '/message',
  '/meter-group',
  '/order-list',
  '/organization-chart',
  '/paginator',
  '/panel',
  '/panel-menu',
  '/password',
  '/pick-list',
  '/popover',
  '/progress-bar',
  '/progress-spinner',
  '/radio-button',
  '/rating',
  '/ripple',
  '/scroll-panel',
  '/scroll-top',
  '/scroller',
  '/skeleton',
  '/slider',
  '/speed-dial',
  '/split-button',
  '/splitter',
  '/stepper',
  '/style-class',
  '/table',
  '/tag',
  '/templates/starter-template',
  '/terminal',
  '/textarea',
  '/tiered-menu',
  '/timeline',
  '/toast',
  '/toggle-button',
  '/toggle-switch',
  '/toolbar',
  '/tooltip',
  '/tree',
  '/tree-select',
  '/tree-table',
  '/upload',
] as const;

async function runAxeSweep(page: Page, route: string): Promise<void> {
  await page.goto(route);
  await page.waitForLoadState('networkidle');

  const results: { violations: unknown[] } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules([...GLOBAL_DISABLED_RULES])
    .analyze();

  if (results.violations.length > 0) {
    const formatted: string = JSON.stringify(results.violations, null, 2);
    await test.info().attach('axe-violations.json', {
      body: formatted,
      contentType: 'application/json',
    });
  }

  expect(results.violations, `Axe violations found on ${route}`).toEqual([]);
}

test.describe('Full-page axe-core sweep — all demo routes', (): void => {
  for (const route of DEMO_ROUTES) {
    test(`${route} — zero axe violations`, async ({ page }: { page: Page }): Promise<void> => {
      await runAxeSweep(page, route);
    });
  }
});
