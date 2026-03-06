import type { ComponentFixture } from '@angular/core/testing';

/**
 * Result returned by createTestComponent helpers.
 */
export type TestComponentResult<T> = {
  fixture: ComponentFixture<T>;
  instance: T;
};
