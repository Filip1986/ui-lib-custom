import type { ComponentFixture } from '@angular/core/testing';
import { axe } from 'jest-axe';

interface A11yTestOptions {
  rules?: Record<string, { enabled: boolean }>;
  runOnly?: string[] | { type: 'tag'; values: string[] };
  exclude?: string[];
}

export const SKIP_COLOR_CONTRAST_RULES: Record<string, { enabled: boolean }> = {
  'color-contrast': { enabled: false },
};

/**
 * Run axe accessibility checks on a component fixture
 */
export async function checkA11y(
  fixture: ComponentFixture<unknown>,
  options: A11yTestOptions = {}
): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement as HTMLElement;
  const target: HTMLElement = options.exclude?.length
    ? sanitizeA11yTarget(element, options.exclude)
    : element;
  const axeOptions: Parameters<typeof axe>[1] = {};
  if (options.rules) {
    axeOptions.rules = options.rules;
  }
  if (options.runOnly) {
    axeOptions.runOnly = options.runOnly;
  }
  const results: Awaited<ReturnType<typeof axe>> = await axe(target, axeOptions);

  expect(results.violations.length).toBe(0);
}

function sanitizeA11yTarget(root: HTMLElement, excludeSelectors: string[]): HTMLElement {
  const clone: HTMLElement = root.cloneNode(true) as HTMLElement;
  excludeSelectors.forEach((selector: string): void => {
    clone.querySelectorAll(selector).forEach((node: Element): void => {
      node.remove();
    });
  });
  return clone;
}
