import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page should have no violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('buttons page should have no violations', async ({ page }) => {
    await page.goto('/buttons');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.third-party-widget')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('forms page should have no violations', async ({ page }) => {
    await page.goto('/inputs');

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('select component should have no violations when open', async ({ page }) => {
    await page.goto('/select');

    await page.click('ui-lib-select');
    await page.waitForSelector('[role="listbox"]');

    const results = await new AxeBuilder({ page }).include('ui-lib-select').analyze();

    expect(results.violations).toEqual([]);
  });

  test('tabs should be keyboard navigable', async ({ page }) => {
    await page.goto('/tabs');

    await page.keyboard.press('Tab');
    const firstTab = page.locator('[role="tab"]').first();
    await expect(firstTab).toBeFocused();

    await page.keyboard.press('ArrowRight');
    const secondTab = page.locator('[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('modal focus trap should work', async ({ page }) => {
    await page.goto('/dialogs');

    await page.click('[data-open-modal]');
    await page.waitForSelector('[role="dialog"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    await expect(page.locator('[role="dialog"]')).toContainElement(focusedElement);

    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
