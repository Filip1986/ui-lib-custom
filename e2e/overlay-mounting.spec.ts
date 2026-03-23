import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

interface OverlayMountCheckArgs {
  panelSelector: string;
  clippingCardSelector: string;
}

interface PanelParentCheckArgs {
  panelSelector: string;
}

async function expectPanelMountedOutsideClippingCard(
  page: Page,
  panelSelector: string,
  clippingCardSelector: string
): Promise<void> {
  const mountedToBody: boolean = await page.evaluate(
    (args: PanelParentCheckArgs): boolean => {
      const panel: Element | null = document.querySelector(args.panelSelector);
      return panel?.parentElement === document.body;
    },
    { panelSelector }
  );
  expect(mountedToBody).toBe(true);

  const panelInsideClippingCard: boolean = await page.evaluate(
    (args: OverlayMountCheckArgs): boolean => {
      const panel: Element | null = document.querySelector(args.panelSelector);
      const clippingCard: Element | null = document.querySelector(args.clippingCardSelector);
      if (!panel || !clippingCard) {
        return true;
      }
      return clippingCard.contains(panel);
    },
    { panelSelector, clippingCardSelector }
  );
  expect(panelInsideClippingCard).toBe(false);
}

test.describe('Overlay Mounting Regressions', (): void => {
  test('autocomplete clipping demo mounts panel outside overflow-hidden card', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/autocomplete');

    const clippingCardSelector: string = 'section#clipping .clipping-card';
    const input: Locator = page.locator(
      `${clippingCardSelector} ui-lib-autocomplete .ui-autocomplete-input`
    );

    await input.click();
    await input.press('ArrowDown');

    const panelSelector: string = 'body > .ui-autocomplete-panel';
    await expect(page.locator(panelSelector).first()).toBeVisible();

    await expectPanelMountedOutsideClippingCard(page, panelSelector, clippingCardSelector);
  });

  test('cascade-select clipping demo mounts panel outside overflow-hidden card', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/cascade-select');

    const clippingCardSelector: string = 'section#clipping .clipping-card';
    const trigger: Locator = page.locator(
      `${clippingCardSelector} ui-lib-cascade-select .ui-lib-cascade-select__trigger`
    );

    await trigger.click();

    const panelSelector: string = 'body > .ui-lib-cascade-select__panel';
    await expect(page.locator(panelSelector).first()).toBeVisible();

    await expectPanelMountedOutsideClippingCard(page, panelSelector, clippingCardSelector);
  });

  test('color-picker clipping demo mounts panel outside overflow-hidden card', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/color-picker');

    const clippingCardSelector: string = 'section#clipping .clipping-card';
    const trigger: Locator = page.locator(
      `${clippingCardSelector} ui-lib-color-picker .ui-lib-colorpicker__trigger`
    );

    await trigger.click();

    const panelSelector: string = 'body > .ui-lib-colorpicker__panel';
    await expect(page.locator(panelSelector).first()).toBeVisible();

    await expectPanelMountedOutsideClippingCard(page, panelSelector, clippingCardSelector);
  });
});
