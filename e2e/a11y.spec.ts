import { test, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

  test('modal focus trap should work', async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('/dialogs');

    const modalTrigger: Locator = page.locator('[data-open-modal]');
    const hasTrigger: boolean = (await modalTrigger.count()) > 0;
    test.skip(!hasTrigger, 'Dialog demo not available on this page.');

    await modalTrigger.click();
    await page.waitForSelector('[role="dialog"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const dialog: Locator = page.locator('[role="dialog"]');
    const focusedElement: Locator = dialog.locator(':focus');
    await expect(focusedElement).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
