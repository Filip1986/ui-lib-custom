import { ComponentFixture } from '@angular/core/testing';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export interface A11yTestOptions {
  rules?: Record<string, { enabled: boolean }>;
  runOnly?: string[] | { type: 'tag'; values: string[] };
  exclude?: string[];
}

/**
 * Run axe accessibility checks on a component fixture
 */
export async function checkA11y(
  fixture: ComponentFixture<unknown>,
  options: A11yTestOptions = {}
): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();

  const element = fixture.nativeElement as HTMLElement;
  const results = await axe(element, {
    rules: options.rules,
    runOnly: options.runOnly,
    exclude: options.exclude,
  });

  expect(results).toHaveNoViolations();
}

/**
 * Get axe results for custom assertions
 */
export async function getA11yResults(
  fixture: ComponentFixture<unknown>,
  options: A11yTestOptions = {}
) {
  fixture.detectChanges();
  await fixture.whenStable();

  return axe(fixture.nativeElement, {
    rules: options.rules,
    runOnly: options.runOnly,
    exclude: options.exclude,
  });
}

/**
 * Common rule configurations
 */
export const A11Y_RULES = {
  skipColorContrast: {
    'color-contrast': { enabled: false },
  },
  criticalOnly: {
    runOnly: { type: 'tag', values: ['critical', 'serious'] },
  },
  ariaOnly: {
    runOnly: { type: 'tag', values: ['aria'] },
  },
};
