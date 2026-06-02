import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

async function assertNoViolations(results: { violations: unknown[] }): Promise<void> {
  const violations: unknown[] = results.violations;
  if (violations.length > 0) {
    const formatted: string = JSON.stringify(violations, null, 2);
    await test.info().attach('axe-violations.json', {
      body: formatted,
      contentType: 'application/json',
    });
  }
  expect(violations).toEqual([]);
}

test.describe('Accessibility', (): void => {
  test('home page should have no violations', async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('/');

    const results: { violations: unknown[] } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    await assertNoViolations(results);
  });

  test('buttons page should have no violations', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/buttons');

    const results: { violations: unknown[] } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.third-party-widget')
      .disableRules(['color-contrast'])
      .analyze();

    await assertNoViolations(results);
  });

  test('forms page should have no violations', async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('/inputs');

    const results: { violations: unknown[] } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    await assertNoViolations(results);
  });

  test('select component should have no violations when open', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/select');

    await page.click('ui-lib-select');
    await page.waitForSelector('[role="listbox"]');

    const results: { violations: unknown[] } = await new AxeBuilder({ page })
      .include('ui-lib-select')
      .disableRules(['color-contrast'])
      .analyze();

    await assertNoViolations(results);
  });

  test('tabs should be keyboard navigable', async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('/tabs');

    const firstTab: Locator = page.locator('[role="tab"]').first();
    await firstTab.focus();
    await expect(firstTab).toBeFocused();

    await page.keyboard.press('ArrowRight');
    const secondTab: Locator = page.locator('[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  // FIXME: Same dialog-opening blocker as a11y-interactions.spec.ts — see that file for details.
  // The dialog panel never renders in the e2e environment after signal mutation.
  test.fixme('modal focus trap should work', async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('/dialog');

    // The first demo button on the dialog page opens a basic modal dialog.
    const modalTrigger: Locator = page.locator('[aria-controls="dialog-basic-content"]');

    // Open the dialog via Angular's dev-tools API (available in ng serve dev mode).
    // Direct signal mutation + applyChanges is more reliable than simulated clicks
    // in the e2e environment where zoneless CD propagation can be non-deterministic.
    // Wait for the routed component to be present before querying via ng.getComponent
    await page.waitForSelector('app-dialog-demo');
    await page.evaluate((): void => {
      type NgComp = { basicVisible?: { set: (v: boolean) => void } };
      type NgApi = { getComponent: (el: Element) => NgComp | null };
      const ng: NgApi | undefined = (window as unknown as { ng?: NgApi }).ng;
      const demoEl: Element | null = document.querySelector('app-dialog-demo');
      if (demoEl && ng) {
        const comp: NgComp | null = ng.getComponent(demoEl);
        comp?.basicVisible?.set(true);
      }
    });
    // Wait for Angular's reactive scheduler to detect the signal change and re-render
    await expect(modalTrigger).toHaveAttribute('aria-expanded', 'true');
    await page.waitForSelector('ui-lib-dialog .ui-lib-dialog-panel');

    // Tab through focusable elements — every one must stay inside the dialog.
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const dialog: Locator = page.locator('ui-lib-dialog .ui-lib-dialog-panel');
    const focusedElement: Locator = dialog.locator(':focus');
    await expect(focusedElement).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
